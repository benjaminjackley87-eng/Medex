const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'data', 'graph_index.json');

console.log('Checking Knowledge Graph integrity at:', indexPath);

if (!fs.existsSync(indexPath)) {
  console.error('Error: graph_index.json does not exist. Please run compile_graph first.');
  process.exit(1);
}

try {
  const content = fs.readFileSync(indexPath, 'utf8');
  const graph = JSON.parse(content);

  const nodes = graph.nodes || {};
  const adjacencyList = graph.adjacencyList || {};

  let danglingCount = 0;
  let totalEdges = 0;

  for (const [sourceId, edges] of Object.entries(adjacencyList)) {
    // Check if source node exists
    if (!nodes[sourceId]) {
      console.error(
        `❌ Source node "${sourceId}" has relationships but is not defined in the nodes list.`
      );
      danglingCount++;
    }

    for (const edge of edges) {
      totalEdges++;
      const targetId = edge.target;

      // Check if target node exists
      if (!nodes[targetId]) {
        console.error(
          `❌ Broken Reference: Node "${sourceId}" points to non-existent node "${targetId}" via "${edge.relationship}"`
        );
        danglingCount++;
      }
    }
  }

  console.log(`\nVerification Summary:`);
  console.log(`- Total Nodes: ${Object.keys(nodes).length}`);
  console.log(`- Total Edges: ${totalEdges}`);

  if (danglingCount > 0) {
    console.error(`\n❌ Failed: Found ${danglingCount} broken/dangling reference(s) in the graph.`);
    process.exit(1);
  } else {
    console.log(`\n🎉 Success: No broken or dangling node references found in the graph!`);
    process.exit(0);
  }
} catch (error) {
  console.error('Integrity check failed to execute:', error);
  process.exit(1);
}
