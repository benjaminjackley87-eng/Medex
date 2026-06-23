import React from 'react';
import { Search } from 'lucide-react';
import { DermTerm } from './DermTerm';

interface DermatologySidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  didYouMean: string | null;
  filteredTerms: DermTerm[];
  selectedTerm: DermTerm | null;
  handleSelectTerm: (term: DermTerm) => void;
}

export const DermatologySidebar: React.FC<DermatologySidebarProps> = ({
  searchQuery,
  setSearchQuery,
  didYouMean,
  filteredTerms,
  selectedTerm,
  handleSelectTerm
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
        <input
          type="text"
          placeholder="SEARCH MORPHOLOGY..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-white/5 rounded-2xl text-[11px] font-black tracking-widest text-slate-200 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none uppercase"
        />
      </div>

      {didYouMean && (
        <div className="flex justify-start">
          <button
            onClick={() => setSearchQuery(didYouMean)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-950/40 hover:bg-orange-900/40 text-orange-450 border border-orange-500/20 rounded-xl transition-all shadow-sm w-full cursor-pointer"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 shrink-0">
              Did you mean
            </span>
            <span className="text-xs font-bold border-b border-orange-600 border-dashed truncate">
              {didYouMean}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 shrink-0">
              ?
            </span>
          </button>
        </div>
      )}

      <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden shadow-sm max-h-[600px] overflow-y-auto custom-scrollbar">
        {filteredTerms.map((t) => (
          <button
            key={t.term}
            onClick={() => handleSelectTerm(t)}
            className={`w-full text-left px-6 py-4 border-b border-white/5 last:border-0 transition-all flex items-center justify-between group cursor-pointer ${
              selectedTerm?.term === t.term
                ? 'bg-orange-950/30 text-orange-400'
                : 'hover:bg-slate-800/40 text-slate-400'
            }`}
          >
            <span className="text-xs font-black uppercase tracking-widest">{t.term}</span>
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all ${selectedTerm?.term === t.term ? 'bg-orange-500 scale-125' : 'bg-slate-800 group-hover:bg-orange-500/60'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
