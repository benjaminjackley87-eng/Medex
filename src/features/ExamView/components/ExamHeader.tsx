import React from 'react';
import { Examination } from '../../../types';

interface ExamHeaderProps {
  exam: Examination;
  progress: number;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({ exam, progress }) => {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-950/200/5 rounded-full blur-3xl pointer-events-none" />
      <div>
        <h2 className="text-lg font-black text-white uppercase tracking-wider mb-1">{exam.name}</h2>
        <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
          "{exam.shortDescription}"
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-3">
        <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/5 flex flex-col items-center">
          <span className="text-xs font-black text-indigo-400">{exam.steps.length}</span>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
            Steps
          </span>
        </div>
        <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/5 flex flex-col items-center">
          <span className="text-xs font-black text-emerald-400">{progress}%</span>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
            Mastery
          </span>
        </div>
      </div>
    </div>
  );
};
