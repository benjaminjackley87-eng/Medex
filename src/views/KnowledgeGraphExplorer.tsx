import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import graphDataRaw from '../../data/graph_index';
import { motion } from 'framer-motion';

// Types
interface GraphNode {
  id: string;
  name: string;
  type: string;
  layer: number;
  moduleId: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  val?: number; // size
  color?: string;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  relationship: string;
}

export function KnowledgeGraphExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  // Parse and transform data safely
  const graphData = useMemo(() => {
    // 1. Map valid nodes
    const validNodesMap: Record<string, boolean> = {};
    const nodes: GraphNode[] = Object.values(graphDataRaw.nodes).map((n: any) => {
      validNodesMap[n.id] = true;
      return {
        ...n,
        val: n.type === 'MODULE' ? 15 : n.type === 'STRUCTURE' ? 8 : n.type === 'CONCEPT' ? 5 : 3
      };
    });

    // 2. Map valid links
    const links: GraphLink[] = [];
    Object.entries(graphDataRaw.adjacencyList).forEach(([source, targets]: [string, any]) => {
      if (!validNodesMap[source]) return;
      targets.forEach((t: any) => {
        if (!validNodesMap[t.target]) return; // CRITICAL: ForceGraph will crash if target doesn't exist
        links.push({
          source,
          target: t.target,
          relationship: t.relationship
        });
      });
    });

    // 3. Fix positions for MODULE nodes in a circle
    const modules = nodes.filter((n) => n.type === 'MODULE');
    const radius = 400; // Spread out modules
    modules.forEach((mod, i) => {
      const angle = (i / modules.length) * 2 * Math.PI;
      mod.fx = radius * Math.cos(angle);
      mod.fy = radius * Math.sin(angle);
    });

    return { nodes, links };
  }, []);

  // Handle Resize
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    observer.observe(containerRef.current);

    // Zoom to fit on mount
    setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(400, 50);
      }
    }, 500);

    return () => observer.disconnect();
  }, []);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);

    // Camera zoom and center
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 800);
      fgRef.current.zoom(5, 800);
    }
  }, []);

  // Custom Node Painting logic for LOD
  const paintNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      // LOD Visibility Culling
      // Scale 0.1 is very zoomed out. Scale > 5 is very zoomed in.
      if (globalScale < 0.8 && node.type !== 'MODULE') return;
      if (globalScale < 1.5 && (node.type === 'CLINICAL_SCENARIO' || node.type === 'CONCEPT'))
        return;
      if (globalScale < 2.5 && node.type === 'CLINICAL_SCENARIO') return;

      // Node coloring
      let color = '#94a3b8'; // default slate
      if (node.type === 'MODULE')
        color = '#6366f1'; // indigo
      else if (node.type === 'STRUCTURE')
        color = '#ec4899'; // pink
      else if (node.type === 'CONCEPT')
        color = '#14b8a6'; // teal
      else if (node.type === 'CLINICAL_SCENARIO')
        color = '#ef4444'; // red
      else if (node.type === 'EXTERNAL_REFERENCE') color = '#f59e0b'; // amber

      const size = node.val || 5;

      // Draw Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
      ctx.fillStyle = node.id === selectedNode?.id ? '#ffffff' : color;
      ctx.fill();

      // Draw Stroke
      if (node.id === selectedNode?.id || node.type === 'MODULE') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = node.type === 'MODULE' ? 2 / globalScale : 1 / globalScale;
        ctx.stroke();
      }

      // Text rendering LOD
      const showText =
        (node.type === 'MODULE' && globalScale > 0.4) ||
        (node.type === 'STRUCTURE' && globalScale > 1.8) ||
        (node.type === 'CONCEPT' && globalScale > 3.0) ||
        (node.type === 'CLINICAL_SCENARIO' && globalScale > 4.5);

      if (showText) {
        const label = node.name;
        const fontSize = node.type === 'MODULE' ? 14 / globalScale : 8 / globalScale;
        ctx.font = `${fontSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Paint text background for legibility
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);

        ctx.fillStyle = 'rgba(2, 6, 23, 0.7)';
        ctx.fillRect(
          node.x - bckgDimensions[0] / 2,
          node.y + size + 2 / globalScale - bckgDimensions[1] / 2,
          bckgDimensions[0],
          bckgDimensions[1]
        );

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(label, node.x, node.y + size + 2 / globalScale);
      }
    },
    [selectedNode]
  );

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden mesh-bg"
      ref={containerRef}
    >
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h1 className="text-3xl text-display mb-2">Knowledge Graph</h1>
        <p className="text-slate-400 max-w-md pointer-events-auto">
          Explore {graphData.nodes.length} interconnected clinical concepts, anatomical structures,
          and pathological scenarios. Pan and zoom to reveal granular details.
        </p>
      </div>

      <div className="graph-container flex-grow absolute inset-0 mix-blend-screen">
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeCanvasObject={paintNode}
          nodeRelSize={6}
          linkColor={(link: any) =>
            link.relationship === 'CONTAINS_STRUCTURE'
              ? 'rgba(99, 102, 241, 0.2)'
              : 'rgba(255,255,255,0.05)'
          }
          linkWidth={(link: any) => (link.relationship === 'CONTAINS_STRUCTURE' ? 1.5 : 0.5)}
          linkDirectionalParticles={0} // Disable for performance with large graphs
          onNodeClick={handleNodeClick}
          backgroundColor="transparent"
          d3AlphaDecay={0.05} // longer physics settling
          d3VelocityDecay={0.2} // more fluid, Neo4j Bloom style
          minZoom={0.2}
          maxZoom={10}
        />
      </div>

      {/* Side Panel UI */}
      {selectedNode && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="absolute right-6 top-6 bottom-6 w-80 glass-surface-dark rounded-3xl p-6 z-10 flex flex-col custom-scrollbar overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="pr-4">
              <div className="text-micro text-indigo-400 mb-2">
                {selectedNode.type.replace(/_/g, ' ')}
              </div>
              <h3 className="text-xl font-display font-bold leading-tight">{selectedNode.name}</h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="btn-icon bg-white/5 text-slate-400 hover:text-white shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-1">Module Identity</div>
              <div className="text-sm font-mono text-slate-200 truncate">
                {selectedNode.moduleId}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
              <div className="text-xs text-slate-400">System Layer</div>
              <div className="text-sm font-bold text-indigo-300">Layer {selectedNode.layer}</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-xs text-slate-400 mb-1">Database Hash ID</div>
              <div className="text-[10px] font-mono text-slate-500 break-all">
                {selectedNode.id}
              </div>
            </div>

            {/* Show connected edges summary */}
            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Network Statistics
              </div>
              <div className="text-sm text-slate-300">
                Connected Edges:{' '}
                {
                  graphData.links.filter(
                    (l) =>
                      (typeof l.source === 'object'
                        ? l.source.id === selectedNode.id
                        : l.source === selectedNode.id) ||
                      (typeof l.target === 'object'
                        ? l.target.id === selectedNode.id
                        : l.target === selectedNode.id)
                  ).length
                }
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
