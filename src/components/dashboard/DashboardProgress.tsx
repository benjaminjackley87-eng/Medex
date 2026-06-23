import React from 'react';
import { Target, Trophy } from 'lucide-react';
import { AppView, StudyProgress } from '../../types';

interface SystemProgressItem {
  system: string;
  total: number;
  learned: number;
  percentage: number;
}

interface DashboardProgressProps {
  systemProgress: SystemProgressItem[];
  studyProgress: StudyProgress[];
  onNavigate: (view: AppView) => void;
}

export const DashboardProgress: React.FC<DashboardProgressProps> = ({
  systemProgress,
  studyProgress,
  onNavigate
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* OSCE Progress Card */}
      <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
            <Target className="w-5 h-5 text-rose-400" />
            OSCE Progress
          </h2>
        </div>
        <div className="space-y-4">
          {systemProgress.length > 0 ? (
            systemProgress.map((item) => (
              <div
                key={item.system}
                className="flex flex-col gap-2 p-4 bg-slate-950/50 rounded-2xl border border-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
                    {item.system}
                  </span>
                  <span className="text-[11px] font-black text-slate-200">
                    {item.learned} / {item.total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-950/200 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-slate-950/40 rounded-3xl border border-white/5 border-dashed">
              <p className="text-slate-400 text-sm font-medium">
                Download examinations to see stats.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Study Mastery Card */}
      <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
            <Trophy className="w-5 h-5 text-indigo-400" />
            Study Mastery
          </h2>
          <button
            onClick={() => onNavigate('studyHub')}
            className="text-[10px] font-black text-slate-400 hover:text-indigo-400 uppercase tracking-widest transition-colors"
          >
            Study Hub
          </button>
        </div>
        <div className="space-y-4">
          {studyProgress.length > 0 ? (
            studyProgress.slice(0, 4).map((item) => (
              <div
                key={item.topic}
                className="flex flex-col gap-2 p-4 bg-slate-950/50 rounded-2xl border border-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[150px]">
                    {item.topic}
                  </span>
                  <span className="text-[11px] font-black text-indigo-400">
                    {item.masteryLevel}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-950/200 rounded-full transition-all"
                    style={{ width: `${item.masteryLevel}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-slate-950/40 rounded-3xl border border-white/5 border-dashed">
              <p className="text-slate-400 text-sm font-medium">
                Start studying in the Study Hub to see progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
