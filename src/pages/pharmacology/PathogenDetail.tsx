import React from 'react';
import { ChevronRight, Microscope, Activity, Pill } from 'lucide-react';
import { motion } from 'motion/react';
import { PathogenInfo } from '../../types';

interface PathogenDetailProps {
  pathogenInfo: PathogenInfo;
  resetView: () => void;
  handleSearch: (query: string) => void;
}

export const PathogenDetail: React.FC<PathogenDetailProps> = ({
  pathogenInfo,
  resetView,
  handleSearch
}) => {
  return (
    <motion.div
      key="pathogen-result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <button
        onClick={resetView}
        className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Search
      </button>
      {/* Pathogen Header */}
      <div className="bg-slate-900 p-10 rounded-[48px] border border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white mb-2 italic">{pathogenInfo.name}</h2>
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">
              {pathogenInfo.classification}
            </p>
          </div>
          <div className="w-16 h-16 bg-indigo-950/40 rounded-2xl flex items-center justify-center border border-indigo-500/20">
            <Microscope className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed">{pathogenInfo.characteristics}</p>

        {pathogenInfo.relatedOrganisms && pathogenInfo.relatedOrganisms.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/5">
            <h4 className="text-[10px] font-black uppercase text-slate-450 mb-4 tracking-widest">
              Common Species / Organisms
            </h4>
            <div className="flex flex-wrap gap-2">
              {pathogenInfo.relatedOrganisms.map((org, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(org)}
                  className="px-4 py-2 bg-slate-950 hover:bg-indigo-950/40 text-slate-300 hover:text-indigo-455 rounded-xl text-sm font-bold border border-white/5 hover:border-indigo-500/20 transition-all cursor-pointer"
                >
                  {org}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Infections */}
        <div className="bg-slate-900/40 p-8 rounded-[40px] border border-white/5">
          <h3 className="text-[11px] font-black uppercase text-slate-455 mb-6 tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4" /> Common Infections
          </h3>
          <ul className="space-y-4">
            {pathogenInfo.commonInfections.map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-350 font-medium">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-950/200 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Typical Abx */}
        <div className="bg-indigo-950/20 p-8 rounded-[40px] border border-indigo-500/15">
          <h3 className="text-[11px] font-black uppercase text-indigo-400 mb-6 tracking-widest flex items-center gap-2">
            <Pill className="w-4 h-4" /> Typical Antibiotics
          </h3>
          <ul className="space-y-4">
            {pathogenInfo.typicalAntibiotics.map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-350 font-medium">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-550 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
