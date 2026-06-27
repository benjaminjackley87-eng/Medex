import React from 'react';
import { Pill, Clock } from 'lucide-react';
import { DrugInfo } from '../../../types';

interface DrugHeaderCardProps {
  drug: DrugInfo;
}

export const DrugHeaderCard: React.FC<DrugHeaderCardProps> = ({ drug }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-[56px] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 group">
      <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Pill className="w-[400px] h-[400px] rotate-[30deg]" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-6 mb-8 text-white/80">
          <span className="bg-indigo-950/200 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20">
            {drug.therapeuticClass}
          </span>
          {drug.retrievedAt && (
            <span className="text-indigo-200/60 text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4" /> Updated{' '}
              {new Date(drug.retrievedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <h2 className="text-7xl font-black mb-8 tracking-tighter leading-none">
          {drug.name}
        </h2>

        {drug.tradeNames?.length > 0 && (
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-black uppercase tracking-widest text-indigo-300">
              Trade Names:
            </span>
            {drug.tradeNames.map((tn, i) => (
              <span
                key={i}
                className="bg-slate-950/40/15 backdrop-blur-md px-5 py-2 rounded-2xl text-sm font-black border border-white/10 hover:bg-slate-950/40/20 transition-colors cursor-default"
              >
                {tn}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
