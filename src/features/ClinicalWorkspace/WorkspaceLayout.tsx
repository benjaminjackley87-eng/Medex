import React, { useState, useCallback } from 'react';
import { useColumnWidths } from '../../hooks/useColumnWidths';
import {
  History,
  ChevronRight,
  ChevronLeft,
  Info,
  Heart,
  Wind,
  Droplets,
  Brain,
  GitBranch,
  Flame,
  Syringe,
  Dumbbell,
  Baby,
  Sparkles,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { ExamSystem } from '../../types';
import { SYSTEM_THEMES, DEFAULT_STYLE } from '../../theme';
import { HistoryItem } from '../../hooks/useClinicalHistory';
import Tooltip from '../../components/common/Tooltip';

const getSystemIcon = (system: ExamSystem) => {
  switch (system) {
    case ExamSystem.CARDIOVASCULAR:
      return Heart;
    case ExamSystem.RESPIRATORY:
      return Wind;
    case ExamSystem.GENITOURINARY:
      return Droplets;
    case ExamSystem.NEUROLOGICAL:
      return Brain;
    case ExamSystem.GASTROINTESTINAL:
      return GitBranch;
    case ExamSystem.ENDOCRINE:
      return Flame;
    case ExamSystem.HAEMATOLOGICAL:
      return Syringe;
    case ExamSystem.RHEUMATOLOGICAL:
      return Dumbbell;
    case ExamSystem.PAEDIATRIC:
      return Baby;
    default:
      return Compass;
  }
};

import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

interface WorkspaceLayoutProps {
  activeSystem?: ExamSystem;
  onSelectSystem?: (system: ExamSystem) => void;
  activeExamName?: string;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  tabs?: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  history?: HistoryItem[];
  onClearHistory?: () => void;
  onSelectHistoryItem?: (item: HistoryItem) => void;
  onBackToLibrary?: () => void;
  children?: React.ReactNode;
  detailContent?: React.ReactNode;
  isDetailLoading?: boolean;
}

/**
 * WorkspaceLayout Component
 * Serves as the main layout engine for OSCE protocol checklists with collapsible and resizable columns.
 */
export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = (props) => {
  const navigate = useNavigate();
  const store = useAppStore();

  const activeSystem = props.activeSystem ?? store.selectedSystem ?? ExamSystem.CARDIOVASCULAR;
  const onSelectSystem =
    props.onSelectSystem ?? ((sys: ExamSystem) => store.setSelectedSystem(sys));
  const activeExamName = props.activeExamName ?? store.selectedExam?.name ?? '';
  const activeTab = props.activeTab ?? '';
  const onSelectTab = props.onSelectTab ?? (() => {});
  const tabs = props.tabs ?? [];
  const history = props.history ?? [];
  const onClearHistory = props.onClearHistory ?? (() => {});
  const onSelectHistoryItem = props.onSelectHistoryItem ?? (() => {});
  const onBackToLibrary = props.onBackToLibrary ?? (() => navigate('/library'));
  const children = props.children;
  const detailContent = props.detailContent;
  const isDetailLoading = props.isDetailLoading ?? false;

  const [col1Collapsed, setCol1Collapsed] = useState(false);
  const [col3Collapsed, setCol3Collapsed] = useState(false);

  // Persisted resizable column widths (localStorage-backed via useColumnWidths)
  const {
    sidebarWidth: col1Width,
    setSidebarWidth: setCol1Width,
    detailWidth: col3Width,
    setDetailWidth: setCol3Width
  } = useColumnWidths('workspaceLayout', { sidebar: 240, detail: 384 });

  // Resize handler for Column 1 (Left History/Timeline panel)
  const handleCol1MouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = col1Width;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newWidth = Math.max(160, Math.min(480, startWidth + (moveEvent.clientX - startX)));
        setCol1Width(newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [col1Width]
  );

  // Resize handler for Column 3 (Right Analysis Drawer)
  const handleCol3MouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = col3Width;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newWidth = Math.max(280, Math.min(600, startWidth - (moveEvent.clientX - startX)));
        setCol3Width(newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [col3Width]
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 font-sans text-slate-100 relative">
      {/* 1. FAR LEFT: Icon-Only Organ Switcher Dock (64px wide) */}
      <aside className="w-16 border-r border-white/5 bg-slate-900 flex flex-col items-center py-4 justify-between shrink-0 z-30">
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Back to Library Button */}
          <Tooltip content="Return to Library" position="right">
            <button
              onClick={onBackToLibrary}
              className="w-10 h-10 rounded-xl bg-slate-950 border border-white/5 hover:border-indigo-500/50 hover:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Tooltip>

          <div className="w-8 h-px bg-slate-950/40/5" />

          {/* Organ Systems Dock */}
          <div className="flex flex-col gap-3 w-full items-center overflow-y-auto max-h-[60vh] scrollbar-hide py-1">
            {Object.values(ExamSystem).map((sys) => {
              const Icon = getSystemIcon(sys);
              const isActive = sys === activeSystem;

              return (
                <Tooltip key={sys} content={sys} position="right">
                  <button
                    onClick={() => onSelectSystem(sys)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative group cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/20'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />

                    {/* Tiny dot indicator for active organ */}
                    {isActive && (
                      <div className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-slate-950/40 animate-pulse" />
                    )}
                  </button>
                </Tooltip>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-8 h-px bg-slate-950/40/5" />
          <Tooltip content="System Info" position="right">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400">
              <Compass className="w-4 h-4" />
            </div>
          </Tooltip>
        </div>
      </aside>

      {/* Main Workspace Area (Consisting of Top Header + 3 Columns) */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 relative">
        {/* 2. TOP CONTEXT HEADER BAR */}
        <header className="h-14 border-b border-white/5 px-6 flex items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={onBackToLibrary}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">
                <span>{activeSystem}</span>
                <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                <span className="text-indigo-400">{activeExamName}</span>
              </div>
              <h1 className="text-xs font-black text-white uppercase tracking-wider truncate mt-0.5">
                {activeExamName}
              </h1>
            </div>
          </div>

          {/* Context Tab Selector */}
          <nav className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-white/5 shrink-0">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-300 cursor-pointer ${
                    isTabActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-350'
                  }`}
                >
                  <TabIcon className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-wider hidden sm:block">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* 3. THREE-COLUMN WORKSPACE GRID */}
        <div className="flex-1 flex overflow-hidden min-h-0 relative">
          {/* COLUMN 1: Collapsible & Resizable Clinical History & Timeline */}
          {!col1Collapsed ? (
            <div
              style={{ width: col1Width }}
              className="border-r border-white/5 bg-slate-950/20 flex flex-col shrink-0 relative"
            >
              <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <History className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider">Timeline</span>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="text-[8px] font-black uppercase tracking-widest text-slate-550 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                {history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-4 text-center text-slate-655">
                    <History className="w-6 h-6 opacity-20 mb-1.5" />
                    <p className="text-[8px] font-black uppercase tracking-wider">Empty Trail</p>
                    <p className="text-[7.5px] font-medium leading-relaxed mt-0.5 opacity-80">
                      Traversed signs and steps populate here.
                    </p>
                  </div>
                ) : (
                  <div className="relative pl-2.5 border-l border-indigo-500/10 space-y-4">
                    {history.map((item, idx) => {
                      const isLast = idx === history.length - 1;
                      return (
                        <div key={item.id} className="relative group/item">
                          <div
                            className={`absolute -left-[14px] top-1 w-1.5 h-1.5 rounded-full border border-slate-900 transition-all ${
                              isLast
                                ? 'bg-indigo-400 scale-125'
                                : 'bg-slate-800 group-hover/item:bg-indigo-950/200'
                            }`}
                          />

                          <button
                            onClick={() => onSelectHistoryItem(item)}
                            className="w-full text-left bg-slate-900/30 hover:bg-slate-900 border border-white/5 rounded-lg p-2.5 hover:border-indigo-500/30 transition-all cursor-pointer"
                          >
                            <span
                              className={`text-[7px] font-black uppercase tracking-widest block mb-0.5 ${
                                item.type === 'finding'
                                  ? 'text-rose-450'
                                  : item.type === 'physiology'
                                    ? 'text-emerald-450'
                                    : item.type === 'procedure'
                                      ? 'text-amber-450'
                                      : 'text-indigo-455'
                              }`}
                            >
                              {item.type}
                            </span>
                            <span className="text-[9px] font-bold text-slate-300 leading-tight block truncate">
                              {item.label}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drag handle for Left Column */}
              <div
                onMouseDown={handleCol1MouseDown}
                className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-indigo-950/200/40 active:bg-indigo-950/200 transition-colors z-20"
                title="Drag to resize timeline"
              />

              {/* Collapse Button Left Column */}
              <button
                onClick={() => setCol1Collapsed(true)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-8 bg-slate-900 border border-white/5 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-350 z-10 shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-6 border-r border-white/5 bg-slate-950/20 flex flex-col items-center justify-center shrink-0">
              <button
                onClick={() => setCol1Collapsed(false)}
                className="w-full h-full flex items-center justify-center hover:bg-slate-950/40/[0.02] text-slate-655 hover:text-slate-300 cursor-pointer"
                title="Expand Timeline"
              >
                <History className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          )}

          {/* COLUMN 2: High-Yield Revisor Column (Core summaries, checklist) */}
          <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar p-6 bg-slate-950/10">
            <div className="max-w-3xl mx-auto space-y-6">{children}</div>
          </main>

          {/* COLUMN 3: Collapsible & Resizable Drilled-Down Detail Panel */}
          {!col3Collapsed ? (
            <div
              style={{ width: col3Width }}
              className="border-l border-white/5 bg-slate-900/95 backdrop-blur-md flex flex-col shrink-0 relative"
            >
              {/* Drag handle for Right Column */}
              <div
                onMouseDown={handleCol3MouseDown}
                className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-indigo-950/200/40 active:bg-indigo-950/200 transition-colors z-20"
                title="Drag to resize analysis drawer"
              />

              {/* Collapse Button Right Column */}
              <button
                onClick={() => setCol3Collapsed(true)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-8 bg-slate-900 border border-white/5 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-300 z-10 shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>

              <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    Analysis Drawer
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative text-slate-300">
                {isDetailLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-xs gap-2">
                    <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                      Querying Medical Engine...
                    </span>
                  </div>
                ) : null}

                {detailContent ? (
                  <div className="space-y-4 animate-in fade-in duration-200">{detailContent}</div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-4 text-center text-slate-655">
                    <Info className="w-6 h-6 opacity-20 mb-1.5" />
                    <p className="text-[8px] font-black uppercase tracking-wider">
                      Select Node for Analysis
                    </p>
                    <p className="text-[7.5px] font-medium leading-relaxed mt-0.5 opacity-80">
                      Click checklist items or clinical signs to view pathophysiological stigmata,
                      simulators, and evidence-based journals.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-6 border-l border-white/5 bg-slate-950/20 flex flex-col items-center justify-center shrink-0">
              <button
                onClick={() => setCol3Collapsed(false)}
                className="w-full h-full flex items-center justify-center hover:bg-slate-950/40/[0.02] text-slate-655 hover:text-slate-300 cursor-pointer"
                title="Expand Analysis Drawer"
              >
                <Sparkles className="w-3.5 h-3.5 -rotate-90" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
