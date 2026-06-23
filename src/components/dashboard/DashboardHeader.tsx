import React from 'react';
import { Play, Search } from 'lucide-react';
import { AppView } from '../../types';

interface DashboardHeaderProps {
  onNavigate: (view: AppView) => void;
  onOpenCommandPalette?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onNavigate,
  onOpenCommandPalette
}) => {
  return (
    <>
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase mb-2">
            Welcome Back, Doctor
          </h1>
          <p className="text-slate-400 font-medium">
            Here's your clinical knowledge overview for today.
          </p>
        </div>
        <button
          onClick={() => onNavigate('library')}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
        >
          <Play className="w-4 h-4" /> Resume Learning
        </button>
      </header>

      {/* Global Search Bar */}
      <div className="mb-10">
        <button
          onClick={onOpenCommandPalette}
          className="w-full bg-slate-900 border-2 border-white/5 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all rounded-[32px] p-6 flex items-center justify-between group relative overflow-hidden text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-blue-950 text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-white/5">
              <Search className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">
                Global Search
              </h3>
              <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                Search conditions, exams, medications, and clinical tools...
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest shadow-sm group-hover:bg-slate-900 group-hover:border-blue-500/30 transition-colors">
              <span className="text-sm">⌘</span> K
            </kbd>
          </div>
        </button>
      </div>
    </>
  );
};
