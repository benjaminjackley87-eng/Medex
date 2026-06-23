import GRAPH_DATA from '../data/graph_index.json';

export interface GraphNode {
  id: string;
  name: string;
  type: string;
  layer: number;
  moduleId: string;
}

export interface GraphEdge {
  target: string;
  relationship: string;
  description: string;
}

export interface GraphIndex {
  nodes: Record<string, GraphNode>;
  adjacencyList: Record<string, GraphEdge[]>;
}

// Cast imported JSON data to structural type
const graph = GRAPH_DATA as unknown as GraphIndex;

export const graphQueryEngine = {
  /**
   * Get node details by ID
   */
  getNode(id: string): GraphNode | undefined {
    return graph.nodes[id];
  },

  /**
   * Get all outgoing edges from a node
   */
  getNeighbors(id: string): GraphEdge[] {
    return graph.adjacencyList[id] || [];
  },

  /**
   * Search for nodes matching a query (name or type)
   */
  searchNodes(query: string): GraphNode[] {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return Object.values(graph.nodes).filter(
      (node) =>
        node.name.toLowerCase().includes(lowerQuery) || node.id.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Find paths between two entities (BFS shortest path)
   */
  findPath(startId: string, endId: string, maxHops = 4): GraphNode[] | null {
    if (startId === endId) return [graph.nodes[startId]];

    const queue: Array<{ currentId: string; path: string[] }> = [
      { currentId: startId, path: [startId] }
    ];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { currentId, path } = queue.shift()!;

      if (currentId === endId) {
        return path.map((id) => graph.nodes[id]).filter(Boolean);
      }

      if (visited.has(currentId) || path.length > maxHops) continue;
      visited.add(currentId);

      const neighbors = graph.adjacencyList[currentId] || [];
      for (const edge of neighbors) {
        if (!visited.has(edge.target)) {
          queue.push({
            currentId: edge.target,
            path: [...path, edge.target]
          });
        }
      }
    }

    return null;
  },

  /**
   * Perform N-hop BFS to retrieve connected nodes of a specific type (e.g. all drugs affecting a parameter)
   */
  findConnectedEntities(
    startId: string,
    targetType: string,
    maxHops = 3
  ): Array<{ node: GraphNode; relationshipPath: string[] }> {
    const results: Array<{ node: GraphNode; relationshipPath: string[] }> = [];
    const visited = new Set<string>();

    // Queue stores current node, current hop count, and the accumulated relationship description path
    const queue: Array<{ currentId: string; hop: number; path: string[] }> = [
      { currentId: startId, hop: 0, path: [] }
    ];

    while (queue.length > 0) {
      const { currentId, hop, path } = queue.shift()!;

      if (visited.has(currentId) || hop > maxHops) continue;
      visited.add(currentId);

      const node = graph.nodes[currentId];
      if (node && node.type === targetType && currentId !== startId) {
        results.push({ node, relationshipPath: path });
      }

      const neighbors = graph.adjacencyList[currentId] || [];
      for (const edge of neighbors) {
        if (!visited.has(edge.target)) {
          queue.push({
            currentId: edge.target,
            hop: hop + 1,
            path: [...path, `${edge.relationship} (${edge.description || 'direct link'})`]
          });
        }
      }
    }

    return results;
  },

  /**
   * Get all clinical scenarios/differentials connected to a symptom or anatomical site
   */
  getClinicalDifferentials(id: string): GraphNode[] {
    const neighbors = this.getNeighbors(id);
    return neighbors
      .filter(
        (edge) =>
          edge.relationship === 'CLINICAL_CORRELATION' || edge.relationship === 'PATHOLOGY_OF'
      )
      .map((edge) => graph.nodes[edge.target])
      .filter(Boolean);
  }
};
