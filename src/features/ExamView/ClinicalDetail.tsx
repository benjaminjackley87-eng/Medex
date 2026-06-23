import React from 'react';
import { DifferentialDiagnosis } from '../../types';

interface ClinicalDetailProps {
  diff: DifferentialDiagnosis | undefined;
}

export const ClinicalDetail: React.FC<ClinicalDetailProps> = ({ diff }) => {
  if (!diff) return null;

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block mb-1">
          Diagnostic Detail
        </span>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          {diff.condition}
        </h3>
      </div>

      <div className="bg-slate-950/40/5 border border-white/5 rounded-2xl p-5 leading-relaxed">
        <span className="text-[9px] font-black text-rose-400 uppercase tracking-wider block mb-2">
          Clinical Explanation
        </span>
        <p className="text-xs font-semibold text-slate-300">{diff.explanation}</p>
      </div>
    </div>
  );
};
