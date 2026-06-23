import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Layers,
  Activity,
  Sparkles,
  ChevronRight,
  Info,
  Network,
  Search,
  GitMerge,
  ArrowRight,
  HelpCircle,
  Link2,
  GitCommit
} from 'lucide-react';
import { loadAllAppliedAnatomyModules } from '../../data/collections/appliedAnatomyLoader';
import { ORGAN_SYSTEMS, Layer } from './config';
import { InteractiveDiagram } from './InteractiveDiagram';
import {
  formatKeyToTitle,
  parseContentText,
  formatDescriptionParagraphs
} from '../../utils/latexTextParser';
import { graphQueryEngine } from '../../services/graphQueryEngine';

interface SciencesExplorerProps {
  onBack?: () => void;
}

export const SciencesExplorer: React.FC<SciencesExplorerProps> = ({ onBack }) => {
  const [activeSystemId, setActiveSystemId] = useState<string>('cvs');
  const [activeLayer, setActiveLayer] = useState<Layer>(3);

  // Graph state variables
  const [graphSearchQuery, setGraphSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('phys_cvs_01');
  const [pathTargetId, setPathTargetId] = useState<string>('');
  const [calculatedPath, setCalculatedPath] = useState<any[] | null>(null);

  // Memoized search results from query engine
  const searchResults = useMemo(() => {
    if (!graphSearchQuery) return [];
    return graphQueryEngine.searchNodes(graphSearchQuery);
  }, [graphSearchQuery]);

  // Load all JSON modules eager GLOB
  const allModules = useMemo(() => loadAllAppliedAnatomyModules(), []);

  // Selected system configurations
  const activeSystem = useMemo(() => {
    return ORGAN_SYSTEMS.find((sys) => sys.id === activeSystemId) || ORGAN_SYSTEMS[0];
  }, [activeSystemId]);

  // Load and filter modules for active system and active layer
  const activeModules = useMemo(() => {
    if (activeLayer === 4) return [];
    const targetIds = activeSystem.layers[activeLayer as 1 | 2 | 3];
    return allModules.filter((mod) => targetIds.includes(mod.moduleId));
  }, [allModules, activeSystem, activeLayer]);

  return (
    <div className="flex flex-col h-full bg-[#0F1115] text-slate-100 font-sans overflow-hidden">
      {/* Top Header */}
      <header className="shrink-0 p-6 border-b border-white/5 bg-[#14181F]/80 backdrop-blur-xl z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white uppercase">
              Sciences Explorer
            </h1>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
              Organ Systems Relational Database
            </p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-950/40/5 transition-all text-slate-300 hover:text-white"
          >
            Back
          </button>
        )}
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Systems Selector */}
        <aside className="w-64 border-r border-white/5 bg-[#11141A] flex flex-col shrink-0 overflow-y-auto custom-scrollbar p-4 space-y-1">
          <div className="px-3 mb-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Systems
          </div>
          {ORGAN_SYSTEMS.map((sys) => {
            const isActive = sys.id === activeSystemId;
            return (
              <button
                key={sys.id}
                onClick={() => setActiveSystemId(sys.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all text-left group relative ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/10'
                    : 'text-slate-400 hover:bg-slate-950/40/[0.02] hover:text-slate-200'
                }`}
              >
                <div
                  className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`}
                >
                  {sys.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest truncate">
                  {sys.name}
                </span>
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-slate-950/40 animate-pulse" />
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Panel Area */}
        <section className="flex-1 flex flex-col overflow-hidden bg-[#0F1115]/50">
          {/* Top Layer Tabs */}
          {/* Top Layer Tabs */}
          <div className="shrink-0 p-4 border-b border-white/5 bg-[#11141B] flex gap-2">
            {(
              [
                {
                  level: 1,
                  label: 'Layer 1: Anatomy & Histology',
                  icon: <BookOpen className="w-4 h-4" />
                },
                {
                  level: 2,
                  label: 'Layer 2: Cellular & Biophysical',
                  icon: <Sparkles className="w-4 h-4" />
                },
                {
                  level: 3,
                  label: 'Layer 3: Integrative Physiology',
                  icon: <Activity className="w-4 h-4" />
                },
                {
                  level: 4,
                  label: 'Clinical Relations Graph',
                  icon: <Network className="w-4 h-4" />
                }
              ] as const
            ).map((tab) => {
              const isActive = activeLayer === tab.level;
              return (
                <button
                  key={tab.level}
                  onClick={() => setActiveLayer(tab.level)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-inner'
                      : 'border-white/5 bg-[#141820]/40 text-slate-400 hover:border-white/10 hover:text-slate-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeLayer === 4 ? (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6 min-h-0">
              {/* Left Column: Search & Path Discovery */}
              <div className="flex-1 lg:w-1/2 flex flex-col bg-[#12161E]/40 border border-white/5 rounded-2xl overflow-hidden min-h-0">
                <div className="p-5 border-b border-white/5 bg-[#141820]/40 space-y-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-400" /> Graph Node Search & Path Traversal
                  </h3>

                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search nodes (e.g. PR Interval, Parietal, Shivering, Telangiectasia...)"
                      value={graphSearchQuery}
                      onChange={(e) => setGraphSearchQuery(e.target.value)}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                    />
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  </div>

                  {/* Suggestions list */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Quick Searches:
                    </span>
                    {['PR Interval', 'Telangiectasia', 'Parietal cell', 'Shivering', 'Stewart'].map(
                      (sug) => (
                        <button
                          key={sug}
                          onClick={() => {
                            setGraphSearchQuery(sug);
                            const matching = graphQueryEngine.searchNodes(sug);
                            if (matching.length > 0) {
                              setSelectedNodeId(matching[0].id);
                            }
                          }}
                          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-950/40/5 border border-white/5 text-slate-400 hover:text-white hover:bg-blue-600/10 transition-all"
                        >
                          {sug}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Search Results list */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-2">
                  {searchResults.length > 0 ? (
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                        Search Results ({searchResults.length})
                      </div>
                      {searchResults.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => {
                            setSelectedNodeId(node.id);
                            // Clear path targets when moving nodes
                            setCalculatedPath(null);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                            selectedNodeId === node.id
                              ? 'bg-blue-600/10 border-blue-500/30 text-white'
                              : 'bg-slate-900/10 border-white/5 hover:bg-slate-950/40/[0.02] text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wide">
                              {node.name}
                            </div>
                            <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                              {node.id}
                            </div>
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-950/40 border border-white/10 text-slate-400">
                            {node.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : graphSearchQuery ? (
                    <div className="text-center py-10 text-slate-400 text-xs">
                      No nodes matched your query.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                        All Graph Nodes (Preview)
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {graphQueryEngine
                          .searchNodes('')
                          .slice(0, 15)
                          .map((node) => (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNodeId(node.id)}
                              className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-slate-900/10 hover:bg-slate-950/40/[0.02] text-left transition-all text-slate-300"
                            >
                              <div>
                                <div className="text-xs font-bold uppercase tracking-wide">
                                  {node.name}
                                </div>
                                <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                                  {node.id}
                                </div>
                              </div>
                              <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-950/40 border border-white/10 text-slate-400">
                                {node.type}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Path Finder Section */}
                <div className="p-5 border-t border-white/5 bg-[#141820]/30 space-y-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <GitMerge className="w-4 h-4 text-emerald-400" /> Shortest Path Finder
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Find and traverse the shortest logical path between the current inspected node
                    and any other node in the database.
                  </p>

                  <div className="flex gap-2">
                    <select
                      value={pathTargetId}
                      onChange={(e) => setPathTargetId(e.target.value)}
                      className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                    >
                      <option value="">-- Choose Target Node --</option>
                      {graphQueryEngine.searchNodes('').map(
                        (node) =>
                          node.id !== selectedNodeId && (
                            <option key={node.id} value={node.id}>
                              [{node.type}] {node.name}
                            </option>
                          )
                      )}
                    </select>

                    <button
                      onClick={() => {
                        if (selectedNodeId && pathTargetId) {
                          const path = graphQueryEngine.findPath(selectedNodeId, pathTargetId);
                          setCalculatedPath(path);
                        }
                      }}
                      disabled={!pathTargetId}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-950/200 disabled:opacity-40 disabled:hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                      Find Path
                    </button>
                  </div>

                  {calculatedPath && (
                    <div className="bg-slate-950/50 border border-emerald-500/20 p-4 rounded-xl space-y-3">
                      <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                        Calculated Shortest Path
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {calculatedPath.map((pathNode, idx) => (
                          <React.Fragment key={pathNode.id}>
                            {idx > 0 && (
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            )}
                            <button
                              onClick={() => setSelectedNodeId(pathNode.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-blue-500/40 text-[10px] font-bold text-slate-200 text-left transition-all"
                            >
                              <div className="truncate max-w-[120px]">{pathNode.name}</div>
                              <span className="text-[7px] font-black text-slate-400 uppercase block tracking-wider mt-0.5">
                                {pathNode.type}
                              </span>
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Node Inspector & Cascades */}
              <div className="flex-1 lg:w-1/2 flex flex-col bg-[#12161E]/40 border border-white/5 rounded-2xl overflow-hidden min-h-0">
                {selectedNodeId ? (
                  (() => {
                    const node = graphQueryEngine.getNode(selectedNodeId);
                    if (!node)
                      return (
                        <div className="p-5 text-center text-xs text-slate-400">
                          Node not found.
                        </div>
                      );

                    const neighbors = graphQueryEngine.getNeighbors(selectedNodeId);
                    const cascades = graphQueryEngine.findConnectedEntities(
                      selectedNodeId,
                      'CLINICAL_SCENARIO',
                      3
                    );
                    const physiologicalRelations = graphQueryEngine.findConnectedEntities(
                      selectedNodeId,
                      'CONCEPT',
                      3
                    );

                    return (
                      <div className="flex flex-col h-full min-h-0">
                        {/* Header Details */}
                        <div className="p-6 border-b border-white/5 bg-[#141820]/40 relative overflow-hidden shrink-0">
                          <div className={`absolute top-0 left-0 bottom-0 w-1 bg-blue-950/200`} />
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-2 py-0.5 bg-blue-950/200/10 border border-blue-500/20 rounded">
                              {node.type}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400">
                              Layer {node.layer} • {node.id}
                            </span>
                          </div>
                          <h2 className="text-base font-black text-white uppercase tracking-wide mt-2">
                            {node.name}
                          </h2>
                          <div className="text-[10px] text-slate-400 font-medium mt-1">
                            Belongs to module:{' '}
                            <span className="text-slate-300 font-bold">{node.moduleId}</span>
                          </div>
                        </div>

                        {/* Inspector Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                          {/* Direct Neighbors */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                              <Link2 className="w-4 h-4 text-slate-400" /> Direct Relationships (
                              {neighbors.length})
                            </h4>
                            {neighbors.length > 0 ? (
                              <div className="grid grid-cols-1 gap-2">
                                {neighbors.map((edge, i) => {
                                  const targetNode = graphQueryEngine.getNode(edge.target);
                                  return (
                                    <div
                                      key={i}
                                      className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-xl bg-slate-950/20 border border-slate-800/80 gap-3"
                                    >
                                      <div className="space-y-1">
                                        <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest px-1.5 py-0.5 bg-emerald-950/200/10 border border-emerald-500/20 rounded mr-2">
                                          {edge.relationship}
                                        </span>
                                        {edge.description && (
                                          <span className="text-[10px] text-slate-400 italic">
                                            "{edge.description}"
                                          </span>
                                        )}
                                      </div>

                                      {targetNode && (
                                        <button
                                          onClick={() => setSelectedNodeId(targetNode.id)}
                                          className="flex items-center gap-2 text-left bg-slate-900 border border-white/5 hover:border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 transition-all shrink-0 max-w-[200px] truncate"
                                        >
                                          <div className="truncate">
                                            <div className="truncate font-semibold">
                                              {targetNode.name}
                                            </div>
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block mt-0.5">
                                              {targetNode.type}
                                            </span>
                                          </div>
                                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-400">
                                No direct outgoing relationships defined.
                              </div>
                            )}
                          </div>

                          {/* Cascades: Clinical Scenarios (Transitive / Multi-hop) */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                                <GitCommit className="w-4 h-4" /> Multi-hop Clinical Scenarios /
                                Differentials
                              </h4>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">
                                Up to 3 hops
                              </span>
                            </div>
                            {cascades.length > 0 ? (
                              <div className="grid grid-cols-1 gap-2.5">
                                {cascades.map((cascade, i) => (
                                  <div
                                    key={i}
                                    className="p-4 rounded-xl bg-rose-950/5 border border-rose-500/10 space-y-2"
                                  >
                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={() => setSelectedNodeId(cascade.node.id)}
                                        className="text-xs font-bold text-rose-400 uppercase hover:underline text-left"
                                      >
                                        {cascade.node.name}
                                      </button>
                                      <span className="text-[8px] font-mono text-slate-400">
                                        {cascade.node.id}
                                      </span>
                                    </div>

                                    {/* Relationship path tracing */}
                                    <div className="text-[10px] text-slate-400 flex flex-wrap items-center gap-1">
                                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                                        Path:
                                      </span>
                                      {cascade.relationshipPath.map((step, idx) => (
                                        <React.Fragment key={idx}>
                                          {idx > 0 && <span className="text-slate-400">→</span>}
                                          <span className="bg-slate-950/40 px-2 py-0.5 rounded text-slate-300 font-mono text-[9px] border border-white/5">
                                            {step}
                                          </span>
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-400">
                                No connected clinical scenarios found within 3 logical hops.
                              </div>
                            )}
                          </div>

                          {/* Cascades: Physiological Concepts (Transitive / Multi-hop) */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Activity className="w-4 h-4" /> Multi-hop Physiological Concepts
                              </h4>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">
                                Up to 3 hops
                              </span>
                            </div>
                            {physiologicalRelations.length > 0 ? (
                              <div className="grid grid-cols-1 gap-2.5">
                                {physiologicalRelations.map((cascade, i) => (
                                  <div
                                    key={i}
                                    className="p-4 rounded-xl bg-blue-950/5 border border-blue-500/10 space-y-2"
                                  >
                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={() => setSelectedNodeId(cascade.node.id)}
                                        className="text-xs font-bold text-blue-400 uppercase hover:underline text-left"
                                      >
                                        {cascade.node.name}
                                      </button>
                                      <span className="text-[8px] font-mono text-slate-400">
                                        {cascade.node.id}
                                      </span>
                                    </div>

                                    {/* Relationship path tracing */}
                                    <div className="text-[10px] text-slate-400 flex flex-wrap items-center gap-1">
                                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                                        Path:
                                      </span>
                                      {cascade.relationshipPath.map((step, idx) => (
                                        <React.Fragment key={idx}>
                                          {idx > 0 && <span className="text-slate-400">→</span>}
                                          <span className="bg-slate-950/40 px-2 py-0.5 rounded text-slate-300 font-mono text-[9px] border border-white/5">
                                            {step}
                                          </span>
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-400">
                                No connected physiological concepts found within 3 logical hops.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <HelpCircle className="w-12 h-12 text-slate-350 mb-2" />
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      No Node Selected
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      Select any node from the left search panel to inspect its relational
                      attributes and cascades.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {activeModules.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <Info className="w-12 h-12 text-slate-350" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      No Active Module Found
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm">
                      There is no dedicated module loaded for {activeSystem.name} under Layer{' '}
                      {activeLayer} in the current directory.
                    </p>
                  </div>
                </div>
              ) : (
                activeModules.map((module) => (
                  <div key={module.moduleId} className="space-y-6">
                    {/* Module Header Title */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/80 to-[#12161E]/80 border border-white/5 relative overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${activeSystem.color}`}
                      />
                      <h2 className="text-sm font-black text-white uppercase tracking-wider">
                        {module.moduleTitle}
                      </h2>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {module.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-slate-950/40/5 border border-white/5 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Render Structures if Layer 1 */}
                    {activeLayer === 1 && module.structures && (
                      <div className="grid grid-cols-1 gap-6">
                        {module.structures.map((struc) => (
                          <div
                            key={struc.structureId}
                            className="bg-[#12161E]/40 border border-white/5 rounded-2xl p-6 space-y-6 hover:border-white/10 transition-all"
                          >
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                              <h3 className="text-base font-black text-white uppercase tracking-wide">
                                {struc.anatomicalName}
                              </h3>
                              <span className="text-[9px] font-mono text-slate-400 uppercase">
                                {struc.structureId}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Landmarks & Relations */}
                              {struc.surfaceLandmarksAndRelations && (
                                <div className="space-y-3">
                                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                    <ChevronRight className="w-3.5 h-3.5" /> Relations & Landmarks
                                  </h4>
                                  <div className="bg-slate-950/20 border border-slate-800/80 p-4 rounded-xl space-y-2">
                                    {Object.entries(struc.surfaceLandmarksAndRelations).map(
                                      ([key, val]) => (
                                        <div key={key} className="text-xs">
                                          <span className="font-bold text-white uppercase mr-1.5 text-[10px]">
                                            {key}:
                                          </span>
                                          <span className="text-slate-300">
                                            {parseContentText(val)}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Macroanatomy */}
                              {struc.macroAnatomy && (
                                <div className="space-y-3">
                                  <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                                    <ChevronRight className="w-3.5 h-3.5" /> Macroanatomy
                                  </h4>
                                  <div className="bg-slate-950/20 border border-slate-800/80 p-4 rounded-xl">
                                    {formatDescriptionParagraphs(
                                      struc.macroAnatomy.description,
                                      `${struc.structureId}-macro`
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Histology & Microanatomy */}
                              {struc.microAnatomyAndHistology && (
                                <div className="space-y-3">
                                  <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                    <ChevronRight className="w-3.5 h-3.5" /> Microanatomy &
                                    Histology
                                  </h4>
                                  <div className="bg-slate-950/20 border border-slate-800/80 p-4 rounded-xl space-y-2">
                                    {Object.entries(struc.microAnatomyAndHistology).map(
                                      ([key, val]) => (
                                        <div key={key} className="text-xs">
                                          <span className="font-bold text-white uppercase mr-1.5 text-[10px]">
                                            {key}:
                                          </span>
                                          <span className="text-slate-300">
                                            {parseContentText(val)}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Innervation & Blood Supply */}
                              <div className="space-y-3">
                                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                                  <ChevronRight className="w-3.5 h-3.5" /> Supply & Innervation
                                </h4>
                                <div className="bg-slate-950/20 border border-slate-800/80 p-4 rounded-xl space-y-3">
                                  {struc.bloodSupply &&
                                    Object.entries(struc.bloodSupply).map(([key, val]) => (
                                      <div key={key} className="text-xs">
                                        <span className="font-bold text-white uppercase mr-1.5 text-[10px]">
                                          Blood:
                                        </span>
                                        <span className="text-slate-300">
                                          {parseContentText(val)}
                                        </span>
                                      </div>
                                    ))}
                                  {struc.innervation &&
                                    Object.entries(struc.innervation).map(([key, val]) => (
                                      <div
                                        key={key}
                                        className="text-xs border-t border-slate-800/80 pt-2"
                                      >
                                        <span className="font-bold text-white uppercase mr-1.5 text-[10px]">
                                          Nerve:
                                        </span>
                                        <span className="text-slate-300">
                                          {parseContentText(val)}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>

                            {/* Clinical Correlations */}
                            {struc.clinicalAndAnaestheticCorrelations &&
                              struc.clinicalAndAnaestheticCorrelations.length > 0 && (
                                <div className="space-y-3 pt-4 border-t border-white/5">
                                  <h4 className="text-xs font-black text-rose-400 uppercase tracking-wider">
                                    Clinical & Anaesthetic Correlations
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {struc.clinicalAndAnaestheticCorrelations.map((cc, i) => (
                                      <div
                                        key={i}
                                        className="bg-rose-950/10 border border-rose-500/10 p-5 rounded-2xl space-y-2"
                                      >
                                        <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                                          {cc.scenario}
                                        </h5>
                                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                          {parseContentText(cc.anatomicalBasis)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render Concepts if Layer 2 or 3 */}
                    {activeLayer > 1 && module.concepts && (
                      <div className="grid grid-cols-1 gap-6">
                        {module.concepts.map((concept) => (
                          <div
                            key={concept.conceptId}
                            className="bg-[#12161E]/40 border border-white/5 rounded-2xl p-6 space-y-6 hover:border-white/10 transition-all"
                          >
                            {/* Concept Title */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                              <h3 className="text-base font-black text-white uppercase tracking-wide">
                                {concept.conceptName}
                              </h3>
                              <span className="text-[9px] font-mono text-slate-400 uppercase">
                                {concept.conceptId}
                              </span>
                            </div>

                            {/* Rote Data Box */}
                            {concept.roteData && (
                              <div className="space-y-3">
                                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                                  Key Parameters & Rote Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {Object.entries(concept.roteData).map(([key, val]) => {
                                    if (val && typeof val === 'object') {
                                      return (
                                        <div
                                          key={key}
                                          className="bg-slate-950/20 border border-slate-800/80 p-4 rounded-xl space-y-2"
                                        >
                                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1.5 mb-1.5">
                                            {formatKeyToTitle(key)}
                                          </div>
                                          {Object.entries(val).map(([subKey, subVal]) => (
                                            <div key={subKey} className="text-xs">
                                              <span className="font-bold text-white uppercase mr-1.5 text-[9px]">
                                                {formatKeyToTitle(subKey)}:
                                              </span>
                                              <span className="text-slate-300">
                                                {parseContentText(String(subVal))}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      );
                                    }
                                    return (
                                      <div
                                        key={key}
                                        className="bg-slate-950/20 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between"
                                      >
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                          {formatKeyToTitle(key)}
                                        </span>
                                        <span className="text-xs text-slate-200 leading-relaxed font-medium">
                                          {parseContentText(String(val))}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* First Principles Mechanics */}
                            {concept.firstPrinciplesMechanics && (
                              <div className="space-y-3">
                                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                                  First-Principles Biophysical Mechanics
                                </h4>
                                <div className="bg-slate-950/15 border border-slate-800/40 p-5 rounded-2xl">
                                  {typeof concept.firstPrinciplesMechanics === 'string' ? (
                                    formatDescriptionParagraphs(
                                      concept.firstPrinciplesMechanics,
                                      `${concept.conceptId}-mech`
                                    )
                                  ) : (
                                    <div className="space-y-4">
                                      {Object.entries(concept.firstPrinciplesMechanics).map(
                                        ([stepKey, stepVal]) => (
                                          <div
                                            key={stepKey}
                                            className="bg-slate-900/30 border border-slate-800/50 p-4 rounded-xl space-y-1"
                                          >
                                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                                              {formatKeyToTitle(stepKey)}
                                            </h5>
                                            <div className="text-xs text-slate-300 leading-relaxed">
                                              {parseContentText(stepVal)}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Diagram / Graph Overlay Component */}
                            <InteractiveDiagram
                              conceptId={concept.conceptId}
                              conceptName={concept.conceptName}
                            />

                            {/* Clinical correlations */}
                            {concept.clinicalAndAnaestheticCorrelations &&
                              concept.clinicalAndAnaestheticCorrelations.length > 0 && (
                                <div className="space-y-3 pt-4 border-t border-white/5">
                                  <h4 className="text-xs font-black text-rose-400 uppercase tracking-wider">
                                    Clinical & Anaesthetic Correlations
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {concept.clinicalAndAnaestheticCorrelations.map((cc, i) => (
                                      <div
                                        key={i}
                                        className="bg-rose-950/10 border border-rose-500/10 p-5 rounded-2xl space-y-2"
                                      >
                                        <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                                          {cc.scenario}
                                        </h5>
                                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                          {parseContentText(cc.anatomicalBasis)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default SciencesExplorer;
