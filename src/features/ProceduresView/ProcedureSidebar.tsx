import React from 'react';
import { Wrench, ChevronRight, Trash2 } from 'lucide-react';
import { Procedure } from '../../data/collections/proceduresData';

interface ProcedureSidebarProps {
  procedures: Procedure[];
  activeProc: string | null;
  setActiveProc: (id: string | null) => void;
  filteredProcs: Procedure[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  didYouMean?: string | null;
  isEditMode?: boolean;
  removeProc: (id: string, e: React.MouseEvent) => void;
}

export const ProcedureSidebar: React.FC<ProcedureSidebarProps> = ({
  activeProc,
  setActiveProc,
  filteredProcs,
  searchQuery,
  setSearchQuery,
  didYouMean,
  isEditMode,
  removeProc
}) => {
  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-slate-550 group-focus-within:text-rose-450 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search procedures..."
          className="w-full bg-slate-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-rose-500/30 focus:ring-4 focus:ring-rose-500/5 transition-all text-white"
        />
      </div>

      {didYouMean && (
        <div className="flex justify-start">
          <button
            onClick={() => setSearchQuery(didYouMean)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-955/20 hover:bg-rose-900/50 text-rose-400 rounded-xl transition-all shadow-sm w-full border border-rose-500/10 cursor-pointer"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 shrink-0">
              Did you mean
            </span>
            <span className="text-xs font-bold border-b border-rose-600 border-dashed truncate">
              {didYouMean}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 shrink-0">
              ?
            </span>
          </button>
        </div>
      )}

      <div className="space-y-2">
        {filteredProcs.map((proc) => (
          <div key={proc.id} className="relative group/item">
            <button
              onClick={() => setActiveProc(proc.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left cursor-pointer ${
                activeProc === proc.id
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-955/50 border border-rose-500/30'
                  : 'bg-slate-900 border border-white/5 text-slate-350 hover:border-white/10 hover:bg-slate-900/80'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeProc === proc.id
                    ? 'bg-slate-950/40/20'
                    : 'bg-slate-950 text-rose-400 border border-white/5'
                }`}
              >
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-black uppercase tracking-tight">{proc.name}</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest opacity-60`}>
                  {proc.category}
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${activeProc === proc.id ? 'rotate-90' : ''}`}
              />
            </button>
            {isEditMode && (
              <button
                onClick={(e) => removeProc(proc.id, e)}
                className="absolute -top-2 -right-2 p-1.5 bg-slate-950 text-slate-400 hover:text-rose-400 rounded-full shadow-md border border-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity z-10 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
