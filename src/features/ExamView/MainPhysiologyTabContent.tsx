import React from 'react';
import { Activity } from 'lucide-react';
import { Examination } from '../../types';

interface MainPhysiologyTabContentProps {
  exam: Examination;
  selectedPhysiologyBucket: number | null;
  setSelectedPhysiologyBucket: (index: number) => void;
  addToHistory: (type: 'finding' | 'exam' | 'physiology', label: string) => void;
}

export const MainPhysiologyTabContent: React.FC<MainPhysiologyTabContentProps> = ({
  exam,
  selectedPhysiologyBucket,
  setSelectedPhysiologyBucket,
  addToHistory
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" /> Physiological Mechanics
        </h3>
        <p className="text-xs font-semibold text-slate-400 leading-relaxed">
          Click any of the sub-systems below to open the deep-dive mechanical simulator,
          pressure-volume loop, or clinical values in the detail panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exam.physiologyBuckets?.map((bucket, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedPhysiologyBucket(idx);
              addToHistory('physiology', bucket.title);
            }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
              selectedPhysiologyBucket === idx
                ? 'bg-emerald-950/10 border-emerald-500/40 shadow-lg shadow-emerald-950/40'
                : 'bg-slate-900/60 border-white/5 hover:border-white/10'
            }`}
          >
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
              Sub-Matrix {idx + 1}
            </span>
            <h4 className="text-xs font-black text-white uppercase tracking-tight mt-1 mb-2">
              {bucket.title}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 truncate">
              {bucket.content.map((c) => c.label).join(' • ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
