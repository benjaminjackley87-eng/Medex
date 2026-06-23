import React from 'react';
import { BookOpen, CheckCircle2, Activity as ActivityIcon, AlertCircle } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    total: number;
    learned: number;
    inProgress: number;
    toReview: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-blue-950/60 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/10">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Total Exams
          </p>
          <p className="text-3xl font-black text-white">{stats.total}</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 text-emerald-450 flex items-center justify-center shrink-0 border border-emerald-500/10">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-1">
            Mastered
          </p>
          <p className="text-3xl font-black text-white">{stats.learned}</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-950/60 text-amber-450 flex items-center justify-center shrink-0 border border-amber-500/10">
          <ActivityIcon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-1">
            In Progress
          </p>
          <p className="text-3xl font-black text-white">{stats.inProgress}</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-rose-950/60 text-rose-450 flex items-center justify-center shrink-0 border border-rose-500/10">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-1">
            To Review
          </p>
          <p className="text-3xl font-black text-white">{stats.toReview}</p>
        </div>
      </div>
    </div>
  );
};
