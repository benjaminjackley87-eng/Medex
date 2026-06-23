import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Examination } from '../../types';

interface MainClinicalTabContentProps {
  exam: Examination;
  selectedDifferentialIndex: number | null;
  setSelectedDifferentialIndex: (index: number) => void;
}

export const MainClinicalTabContent: React.FC<MainClinicalTabContentProps> = ({
  exam,
  selectedDifferentialIndex,
  setSelectedDifferentialIndex
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-rose-950/15 border border-rose-500/20 rounded-3xl p-6">
        <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> Critical Red Flags
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          {exam.redFlags?.map((flag, idx) => (
            <li
              key={idx}
              className="bg-slate-900/40 border border-white/5 rounded-xl px-4 py-3 text-xs font-semibold flex items-center gap-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-rose-950/200 shrink-0" />
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
          Differential Diagnoses
        </span>
        <div className="grid grid-cols-1 gap-3">
          {exam.differentialDiagnoses?.map((dd, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDifferentialIndex(idx)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                selectedDifferentialIndex === idx
                  ? 'bg-rose-950/10 border-rose-500/40 shadow-lg shadow-rose-900/20'
                  : 'bg-slate-900/60 border-white/5 hover:border-white/10'
              }`}
            >
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">
                {dd.condition}
              </h4>
              <p className="text-[10px] font-semibold text-slate-400 leading-relaxed line-clamp-2">
                {dd.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
