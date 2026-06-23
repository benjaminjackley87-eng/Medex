const fs = require('fs');
const path = require('path');

function compileGraph(inputDir, outPath) {
  const jsonDir = inputDir || path.join(__dirname, '..', 'data', 'applied_anatomy');
  const outputPath = outPath || path.join(__dirname, '..', 'data', 'graph_index.json');

  console.log('Compiling Knowledge Graph Index from:', jsonDir);

  const graph = {
    nodes: {},
    adjacencyList: {}
  };

  function addNode(id, name, type, layer, moduleId) {
    if (!id) return;
    graph.nodes[id] = {
      id,
      name,
      type,
      layer,
      moduleId
    };
  }

  function addEdge(source, target, relationship, description = '') {
    if (!source || !target) return;
    if (!graph.adjacencyList[source]) {
      graph.adjacencyList[source] = [];
    }

    // Prevent duplicate edges
    const exists = graph.adjacencyList[source].some(
      (edge) => edge.target === target && edge.relationship === relationship
    );

    if (!exists) {
      graph.adjacencyList[source].push({
        target,
        relationship,
        description
      });
    }
  }

  try {
    if (!fs.existsSync(jsonDir)) {
      throw new Error(`Input directory does not exist: ${jsonDir}`);
    }
    const files = fs.readdirSync(jsonDir);

    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      if (file === 'graph_index.json') continue;

      const filePath = path.join(jsonDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);

      const moduleId = data.moduleId;
      const moduleTitle = data.moduleTitle;

      // Infer Layer from module ID prefix
      let layer = 1;
      if (moduleId && moduleId.startsWith('cell_')) layer = 2;
      if (moduleId && moduleId.startsWith('phys_')) layer = 3;

      // 1. Add Module Node
      addNode(moduleId, moduleTitle, 'MODULE', layer, moduleId);

      // 2. Add Structures (Layer 1)
      if (data.structures) {
        for (const struct of data.structures) {
          addNode(struct.structureId, struct.anatomicalName, 'STRUCTURE', 1, moduleId);
          addEdge(moduleId, struct.structureId, 'CONTAINS_STRUCTURE');
          addEdge(struct.structureId, moduleId, 'BELONGS_TO_MODULE');

          // Add explicit clinical correlations as nodes
          if (struct.clinicalAndAnaestheticCorrelations) {
            for (const cc of struct.clinicalAndAnaestheticCorrelations) {
              const ccId = `cc_${struct.structureId}_${cc.scenario.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
              addNode(ccId, cc.scenario, 'CLINICAL_SCENARIO', 4, moduleId);
              addEdge(struct.structureId, ccId, 'CLINICAL_CORRELATION');
              addEdge(ccId, struct.structureId, 'PATHOLOGY_OF');
            }
          }
        }
      }

      // 3. Add Concepts (Layer 2 & 3)
      if (data.concepts) {
        for (const concept of data.concepts) {
          addNode(concept.conceptId, concept.conceptName, 'CONCEPT', layer, moduleId);
          addEdge(moduleId, concept.conceptId, 'CONTAINS_CONCEPT');
          addEdge(concept.conceptId, moduleId, 'BELONGS_TO_MODULE');

          // Add default edges from relatedStructures
          if (concept.relatedStructures) {
            for (const rel of concept.relatedStructures) {
              addEdge(
                concept.conceptId,
                rel.structureId,
                'RELEVANT_STRUCTURE',
                rel.relevanceContext
              );
              addEdge(rel.structureId, concept.conceptId, 'PHYSIOLOGY_OF', rel.relevanceContext);
            }
          }

          // Add explicit clinical correlations as nodes
          if (concept.clinicalAndAnaestheticCorrelations) {
            for (const cc of concept.clinicalAndAnaestheticCorrelations) {
              const ccId = `cc_${concept.conceptId}_${cc.scenario.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
              addNode(ccId, cc.scenario, 'CLINICAL_SCENARIO', 4, moduleId);
              addEdge(concept.conceptId, ccId, 'CLINICAL_CORRELATION');
              addEdge(ccId, concept.conceptId, 'PATHOLOGY_OF');
            }
          }

          // Add explicit JSON defined edges
          if (concept.edges) {
            for (const edge of concept.edges) {
              addEdge(concept.conceptId, edge.targetId, edge.relationship, edge.description);
            }
          }
        }
      }

      // 4. Add Cross-Reference Module Edges
      if (data.crossReferenceKeys) {
        for (const refKey of data.crossReferenceKeys) {
          addEdge(moduleId, refKey, 'CROSS_REFERENCE');
        }
      }
    }

    // 5. Post-Process to resolve broken/dangling targets (create placeholder nodes)
    for (const [sourceId, edges] of Object.entries(graph.adjacencyList)) {
      for (const edge of edges) {
        const targetId = edge.target;
        if (!graph.nodes[targetId]) {
          let type = 'EXTERNAL_REFERENCE';
          let name = targetId.replace(/^(struc_|cell_|phys_|pharm_|path_)/, '').replace(/_/g, ' ');
          name = name.charAt(0).toUpperCase() + name.slice(1);

          if (targetId.startsWith('struc_')) type = 'STRUCTURE';
          else if (targetId.startsWith('cell_')) type = 'CONCEPT';
          else if (targetId.startsWith('phys_')) type = 'CONCEPT';
          else if (targetId.startsWith('pharm_')) type = 'DRUG_PHARMACOLOGY';
          else if (targetId.startsWith('path_')) type = 'PATHOLOGY';

          addNode(targetId, name, type, 4, 'external_cross_reference');
        }
      }
    }

    // Save output index
    fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2), 'utf8');
    console.log(
      `Successfully compiled ${Object.keys(graph.nodes).length} nodes into ${outputPath}`
    );

    return graph;
  } catch (error) {
    console.error('Failed to compile knowledge graph index:', error);
    throw error;
  }
}

if (require.main === module) {
  compileGraph();
}

module.exports = { compileGraph };
