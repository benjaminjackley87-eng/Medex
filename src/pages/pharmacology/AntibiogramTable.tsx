import React, { useState } from 'react';
import { Info } from 'lucide-react';
import {
  ANTIBIOGRAM_PATHOGENS,
  ANTIBIOGRAM_ANTIBIOTICS,
  ANTIBIOGRAM_COVERAGE
} from '../../data/collections/antibiotics';

export const AntibiogramTable: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const pathogens = ANTIBIOGRAM_PATHOGENS;
  const antibiotics = ANTIBIOGRAM_ANTIBIOTICS;
  const coverage = ANTIBIOGRAM_COVERAGE;

  const filterOptions = [
    'All',
    'Gram-positive cocci',
    'Gram-negative cocci',
    'Gram-positive bacilli',
    'Gram-negative bacilli',
    'Atypical',
    'Spirochete'
  ];

  const filteredPathogens =
    filterType === 'All' ? pathogens : pathogens.filter((p) => p.microscopy.includes(filterType));

  const getCellColor = (val: number) => {
    if (val === 3) return 'bg-emerald-650 text-white';
    if (val === 2) return 'bg-emerald-950/45 text-emerald-400 border border-emerald-500/10';
    if (val === 1) return 'bg-amber-950/45 text-amber-400 border border-amber-500/10';
    return 'bg-rose-950/20 text-rose-450/40 border border-rose-500/5';
  };

  const getCellLabel = (val: number) => {
    if (val === 3) return '●';
    if (val === 2) return '●';
    if (val === 1) return '◐';
    return '○';
  };

  return (
    <div className="bg-slate-900 rounded-[40px] border border-white/5 shadow-xl overflow-hidden">
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between bg-slate-950/20 gap-6">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">
            Empiric Antibiogram
          </h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Common ED & GP Pathogens vs. Antibiotics
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">
              Filter:
            </span>
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  filterType === opt
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-950/50'
                    : 'bg-slate-950 text-slate-400 border-white/5 hover:border-indigo-500/30 hover:text-indigo-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex gap-4 justify-end">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-950/200" />
              <span className="text-[10px] font-black uppercase text-slate-550">Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-950/200" />
              <span className="text-[10px] font-black uppercase text-slate-550">Partial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-950/200/40" />
              <span className="text-[10px] font-black uppercase text-slate-550">None</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-slate-950 p-4 text-left border-b border-r border-white/5 min-w-[180px]">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Pathogen
                </span>
              </th>
              {antibiotics.map((abx) => (
                <th
                  key={abx.short}
                  className="p-4 border-b border-white/5 bg-slate-900 min-w-[80px]"
                >
                  <div className="text-[10px] font-black uppercase text-slate-300 tracking-tighter whitespace-nowrap rotate-[-45deg] py-4">
                    {abx.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPathogens.map((pathogen) => (
              <tr key={pathogen.name} className="hover:bg-slate-950/40/[0.02] transition-colors">
                <td className="sticky left-0 z-10 bg-slate-900 border-r border-b border-white/5 p-4 font-bold text-slate-300 text-sm whitespace-nowrap">
                  <div className="flex flex-col">
                    <span
                      className={
                        pathogen.type === 'Atypical' ||
                        pathogen.type === 'Anaerobe' ||
                        pathogen.type === 'Spirochete'
                          ? 'italic'
                          : ''
                      }
                    >
                      {pathogen.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">
                      {pathogen.microscopy}
                    </span>
                  </div>
                </td>
                {coverage[pathogen.name].map((val, idx) => (
                  <td
                    key={idx}
                    className={`border-b border-white/5 p-0 text-center transition-all`}
                  >
                    <div
                      className={`w-full h-12 flex items-center justify-center text-lg ${getCellColor(val)}`}
                    >
                      {getCellLabel(val)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {filteredPathogens.length === 0 && (
              <tr>
                <td
                  colSpan={antibiotics.length + 1}
                  className="p-12 text-center text-slate-400 font-bold uppercase text-xs tracking-widest"
                >
                  No pathogens found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-slate-900 text-white/50 text-[10px] font-medium leading-relaxed">
        <p className="flex items-center gap-2 mb-2 text-white/80 font-black uppercase tracking-widest">
          <Info className="w-3 h-3" /> Clinical Note
        </p>
        This table is a simplified educational summary of typical coverage patterns. Local
        resistance patterns (e.g., MRSA, ESBL, VRE) vary significantly. Always consult local
        hospital antibiograms and current eTG guidelines for definitive therapy.
      </div>
    </div>
  );
};
