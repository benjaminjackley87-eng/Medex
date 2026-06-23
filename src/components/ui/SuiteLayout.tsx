import React, { useState, useCallback } from 'react';
import { useColumnWidths } from '../../hooks/useColumnWidths';
import { ChevronLeft, ChevronRight, Menu, Info, ArrowLeft } from 'lucide-react';

export interface SuiteTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SuiteLayoutProps {
  /** Page title (e.g., "Investigations Hub") */
  title: string;
  /** Active category breadcrumb (e.g., "Diagnostics") */
  category?: string;
  /** Active tab ID */
  activeTab: string;
  /** List of tabs available for this suite */
  tabs: SuiteTab[];
  /** Handler when tab changes */
  onSelectTab: (tabId: string) => void;
  /** Handler to navigate back to the main dashboard */
  onBack: () => void;
  /** Accent gradient theme class for header icons or text */
  themeClass?: string;

  /** COLUMN 1 content (e.g., sub-categories list) */
  sidebarContent: React.ReactNode;
  /** Title/label for Column 1 */
  sidebarTitle?: string;
  /** Icon for Column 1 title */
  sidebarIcon?: React.ComponentType<{ className?: string }>;

  /** COLUMN 2 content (e.g., central bento grid or checklist) */
  children: React.ReactNode;

  /** COLUMN 3 content (e.g., drilled-down details or drug monographs) */
  detailContent: React.ReactNode;
  /** Title/label for Column 3 */
  detailTitle?: string;
  /** Icon for Column 3 title */
  detailIcon?: React.ComponentType<{ className?: string }>;
  /** Optional loading state for details drawer */
  isDetailLoading?: boolean;
}

/**
 * SuiteLayout Component
 * Standardizes the 3-column workspace shell with collapsible and resizable drawers.
 */
export const SuiteLayout: React.FC<SuiteLayoutProps> = ({
  title,
  category,
  activeTab,
  tabs,
  onSelectTab,
  onBack,
  themeClass = 'from-blue-500 to-indigo-900',
  sidebarContent,
  sidebarTitle = 'Categories',
  sidebarIcon: SidebarIcon = Menu,
  children,
  detailContent,
  detailTitle = 'Analysis',
  detailIcon: DetailIcon = Info,
  isDetailLoading = false
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [detailCollapsed, setDetailCollapsed] = useState(false);

  // Persisted resizable column widths (localStorage-backed via useColumnWidths)
  const { sidebarWidth, setSidebarWidth, detailWidth, setDetailWidth } = useColumnWidths(
    'suiteLayout',
    { sidebar: 240, detail: 384 }
  );

  // Resize handler for Column 1 (Left Sidebar)
  const handleSidebarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = sidebarWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newWidth = Math.max(160, Math.min(480, startWidth + (moveEvent.clientX - startX)));
        setSidebarWidth(newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [sidebarWidth]
  );

  // Resize handler for Column 3 (Right Detail Panel)
  const handleDetailMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = detailWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        // Dragging left increases the width, so subtract clientX delta
        const newWidth = Math.max(280, Math.min(600, startWidth - (moveEvent.clientX - startX)));
        setDetailWidth(newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [detailWidth]
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 font-sans text-slate-100 relative">
      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 relative">
        {/* TOP CONTEXT HEADER BAR */}
        <header className="h-14 border-b border-white/5 px-6 flex items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                <span>{category || 'Suites'}</span>
                <span>/</span>
                <span className="text-indigo-400">
                  {tabs.find((t) => t.id === activeTab)?.label || activeTab}
                </span>
              </div>
              <h1 className="text-xs font-black text-white uppercase tracking-wider truncate">
                {title}
              </h1>
            </div>
          </div>

          {/* Context Tab Nav Bar */}
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
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-350'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-black uppercase tracking-wider hidden sm:block">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* THREE-COLUMN CONTENT REGION */}
        <div className="flex-1 flex overflow-hidden min-h-0 relative">
          {/* COLUMN 1: Collapsible & Resizable Sidebar */}
          {!sidebarCollapsed ? (
            <aside
              style={{ width: sidebarWidth }}
              className="border-r border-white/5 bg-slate-950/20 flex flex-col shrink-0 relative"
            >
              <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <SidebarIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    {sidebarTitle}
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">{sidebarContent}</div>

              {/* Drag handle for resizing Left Sidebar */}
              <div
                onMouseDown={handleSidebarMouseDown}
                className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-indigo-950/200/40 active:bg-indigo-950/200 transition-colors z-20"
                title="Drag to resize sidebar"
              />

              {/* Collapse Switch */}
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-8 bg-slate-900 border border-white/5 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-350 z-10 shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
            </aside>
          ) : (
            <div className="w-6 border-r border-white/5 bg-slate-950/20 flex flex-col items-center justify-center shrink-0">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-full h-full flex items-center justify-center hover:bg-slate-950/40/[0.02] text-slate-650 hover:text-slate-300 cursor-pointer"
                title="Expand Navigation"
              >
                <SidebarIcon className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          )}

          {/* COLUMN 2: Primary Content Area */}
          <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar p-6 bg-slate-950/10">
            {children}
          </main>

          {/* COLUMN 3: Collapsible & Resizable Details Panel */}
          {!detailCollapsed ? (
            <aside
              style={{ width: detailWidth }}
              className="border-l border-white/5 bg-slate-900/95 backdrop-blur-md flex flex-col shrink-0 relative"
            >
              {/* Drag handle for resizing Right Detail Panel */}
              <div
                onMouseDown={handleDetailMouseDown}
                className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-indigo-950/200/40 active:bg-indigo-950/200 transition-colors z-20"
                title="Drag to resize drawer"
              />

              {/* Collapse Switch */}
              <button
                onClick={() => setDetailCollapsed(true)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-8 bg-slate-900 border border-white/5 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-350 z-10 shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>

              <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <DetailIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    {detailTitle}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative">
                {isDetailLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-xs gap-2 z-20">
                    <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                      Querying Medical Engine...
                    </span>
                  </div>
                )}
                <div className="space-y-4 animate-in fade-in duration-200 text-slate-300">
                  {detailContent}
                </div>
              </div>
            </aside>
          ) : (
            <div className="w-6 border-l border-white/5 bg-slate-950/20 flex flex-col items-center justify-center shrink-0">
              <button
                onClick={() => setDetailCollapsed(false)}
                className="w-full h-full flex items-center justify-center hover:bg-slate-950/40/[0.02] text-slate-655 hover:text-slate-300 cursor-pointer"
                title="Expand Detail Drawer"
              >
                <DetailIcon className="w-3.5 h-3.5 -rotate-90" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuiteLayout;
