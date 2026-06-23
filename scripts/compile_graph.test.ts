import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import { compileGraph } from './compile_graph.cjs';

describe('compileGraph', () => {
  const testDir = path.join(__dirname, 'test_data');
  const testOutputFile = path.join(__dirname, 'test_output.json');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }

    // Create a mock JSON file simulating a module
    const mockModule = {
      moduleId: 'anat_test_01',
      moduleTitle: 'Test Anatomy',
      structures: [
        {
          structureId: 'struc_test_heart',
          anatomicalName: 'Heart',
          clinicalAndAnaestheticCorrelations: [{ scenario: 'Heart Failure' }]
        }
      ],
      concepts: [
        {
          conceptId: 'phys_test_co',
          conceptName: 'Cardiac Output',
          relatedStructures: [{ structureId: 'struc_test_heart', relevanceContext: 'Pumps' }],
          edges: [
            {
              targetId: 'phys_external_01',
              relationship: 'DEPENDS_ON',
              description: 'External edge'
            }
          ]
        }
      ],
      crossReferenceKeys: ['pharm_test_inotropes']
    };

    fs.writeFileSync(path.join(testDir, 'anat_test_01.json'), JSON.stringify(mockModule, null, 2));
  });

  afterAll(() => {
    // Cleanup
    if (fs.existsSync(path.join(testDir, 'anat_test_01.json'))) {
      fs.unlinkSync(path.join(testDir, 'anat_test_01.json'));
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
    if (fs.existsSync(testOutputFile)) {
      fs.unlinkSync(testOutputFile);
    }
  });

  it('should successfully compile the graph from JSON files', () => {
    const graph = compileGraph(testDir, testOutputFile);

    expect(graph).toBeDefined();
    expect(graph.nodes['anat_test_01']).toBeDefined();
    expect(graph.nodes['struc_test_heart']).toBeDefined();
    expect(graph.nodes['phys_test_co']).toBeDefined();

    // Verify auto-generated clinical scenario node
    expect(graph.nodes['cc_struc_test_heart_heart_failure']).toBeDefined();

    // Verify external reference node was generated
    expect(graph.nodes['phys_external_01']).toBeDefined();
    expect(graph.nodes['phys_external_01'].type).toBe('CONCEPT');
    expect(graph.nodes['pharm_test_inotropes']).toBeDefined();
    expect(graph.nodes['pharm_test_inotropes'].type).toBe('DRUG_PHARMACOLOGY');

    // Verify adjacency list
    const heartEdges = graph.adjacencyList['struc_test_heart'];
    expect(heartEdges).toBeDefined();
    // Heart belongs to module, and is pathology of Heart Failure
    expect(
      heartEdges.some(
        (e: any) => e.target === 'anat_test_01' && e.relationship === 'BELONGS_TO_MODULE'
      )
    ).toBe(true);

    const outputExists = fs.existsSync(testOutputFile);
    expect(outputExists).toBe(true);
  });
});
