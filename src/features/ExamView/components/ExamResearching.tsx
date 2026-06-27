import React from 'react';
import { Activity } from 'lucide-react';

export const ExamResearching: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-20 bg-slate-950 text-slate-100">
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-white/10 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
        <Activity className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-micro text-slate-400 tracking-[0.3em] mb-2">Synthesizing Protocol</p>
      <p className="text-[11px] font-bold text-slate-400 italic">
        Consulting evidence-based medical literature...
      </p>
    </div>
  );
};
