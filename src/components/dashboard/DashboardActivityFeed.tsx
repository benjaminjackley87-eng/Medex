import React from 'react';
import { Activity as ActivityIcon, Star, Zap, ChevronRight } from 'lucide-react';
import { AppView, Examination } from '../../types';
import { SYSTEM_THEMES, DEFAULT_STYLE } from '../../theme';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  time: string;
  system: string;
  exam: Examination;
}

interface DashboardActivityFeedProps {
  recentActivity: ActivityItem[];
  onSelectExam: (exam: Examination) => void;
  onNavigate: (view: AppView) => void;
}

export const DashboardActivityFeed: React.FC<DashboardActivityFeedProps> = ({
  recentActivity,
  onSelectExam,
  onNavigate
}) => {
  return (
    <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-[32px] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
          <ActivityIcon className="w-5 h-5 text-emerald-400" />
          Recent Activity
        </h2>
        <button
          onClick={() => onNavigate('library')}
          className="text-[10px] font-black text-slate-400 hover:text-blue-400 uppercase tracking-widest transition-colors"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recentActivity.length > 0 ? (
          recentActivity.map((activity) => {
            const theme =
              SYSTEM_THEMES[activity.system as keyof typeof SYSTEM_THEMES] || DEFAULT_STYLE;
            return (
              <div
                key={activity.id}
                className="p-4 flex items-center justify-between bg-slate-950/60 rounded-2xl hover:bg-slate-800/60 transition-colors group cursor-pointer border border-white/5 hover:border-white/10"
                onClick={() => onSelectExam(activity.exam)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.bg} ${theme.text} shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {activity.type === 'completion' ? (
                      <Star className="w-4 h-4" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-200 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                      {activity.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {activity.system} • {activity.time}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            );
          })
        ) : (
          <div className="col-span-2 p-12 text-center bg-slate-950/40 rounded-3xl border border-white/5 border-dashed">
            <p className="text-slate-400 font-bold text-sm">No recent activity recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
};
