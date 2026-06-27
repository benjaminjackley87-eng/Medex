import React from 'react';
import { motion } from 'motion/react';
import { Pill, Search, Loader2 } from 'lucide-react';

interface HeroSearchSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  searchType: 'drug' | 'condition';
  setSearchType: (val: 'drug' | 'condition') => void;
  isLoading: boolean;
  handleSearch: (e?: React.FormEvent) => void;
  recentSearches: string[];
}

export const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  isLoading,
  handleSearch,
  recentSearches
}) => {
  return (
    <div className="bg-slate-950/40 border-b border-white/5 pt-16 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-indigo-600 p-4 rounded-3xl shadow-lg shadow-indigo-950/40">
            <Pill className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
          Generic Pharmacology Hub
        </h1>
        <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Access comprehensive drug monographs and evidence-based therapeutic guidelines tailored
          for TNQ clinicians.
        </p>

        <div className="flex justify-center gap-2 mb-10 p-1.5 bg-slate-950/40 backdrop-blur-sm rounded-2xl w-fit mx-auto border border-white/5">
          <button
            onClick={() => setSearchType('drug')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              searchType === 'drug'
                ? 'bg-slate-950/40 text-indigo-600 shadow-md shadow-indigo-950/40'
                : 'text-slate-400 hover:text-slate-350'
            }`}
          >
            Drug Reference
          </button>
          <button
            onClick={() => setSearchType('condition')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              searchType === 'condition'
                ? 'bg-slate-950/40 text-indigo-600 shadow-md shadow-indigo-950/40'
                : 'text-slate-400 hover:text-slate-350'
            }`}
          >
            Therapeutic Choice
          </button>
        </div>

        <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchType === 'drug'
                ? 'Search generic name, trade name or class...'
                : 'Search condition (e.g. Sepsis, Atrial Fibrillation)...'
            }
            className="w-full bg-slate-950/40 border-2 border-white/5 rounded-[40px] py-8 pl-18 pr-40 text-2xl font-semibold focus:outline-none focus:border-indigo-500/50 focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-xl shadow-slate-950/50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-4 top-4 bottom-4 px-10 bg-indigo-600 text-white rounded-[32px] font-black text-sm hover:bg-indigo-700 disabled:bg-slate-300 transition-all flex items-center gap-2 shadow-lg shadow-indigo-950/40"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEARCH HUB'}
          </button>
        </form>

        {recentSearches?.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest self-center mr-2">
              Recent:
            </span>
            {recentSearches.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(s);
                  handleSearch();
                }}
                className="text-sm font-bold text-slate-400 bg-slate-950/40 border border-white/5 px-5 py-2 rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
