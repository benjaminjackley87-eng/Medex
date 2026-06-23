import React, { memo } from 'react';
import {
  ArrowRight,
  CloudDownload,
  RefreshCw,
  Sparkles,
  FolderOpen,
  Clock,
  ListChecks
} from 'lucide-react';
import { Examination } from '../types';
import { SYSTEM_THEMES, DEFAULT_STYLE } from '../theme';
import Tooltip from './Tooltip';

interface ExaminationCardProps {
  exam: Examination;
  onSelect: (exam: Examination) => void;
  onSync: (examId: string) => void;
  isDownloaded: boolean;
  isSyncing: boolean;
}

const ExaminationCard: React.FC<ExaminationCardProps> = memo(
  ({ exam, onSelect, onSync, isDownloaded, isSyncing }) => {
    const style = SYSTEM_THEMES[exam.system] || DEFAULT_STYLE;

    return (
      <div
        onClick={() => onSelect(exam)}
        className={`group/card p-6 rounded-[32px] border-2 transition-all duration-500 flex flex-col relative overflow-hidden cursor-pointer ${
          isDownloaded
            ? `bg-slate-900/50 border-emerald-500/20 shadow-xl shadow-emerald-500/5 hover:border-emerald-500 hover:shadow-emerald-500/10 hover:scale-[1.02]`
            : `bg-slate-900/50 border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02]`
        }`}
      >
        {/* Background Accent Glow */}
        <div
          className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[60px] opacity-0 transition-all duration-700 group-hover/card:opacity-20 ${isDownloaded ? 'bg-emerald-950/200' : 'bg-blue-950/200'}`}
        />

        <div className="flex items-start justify-between mb-6 relative z-10">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-sm ${
              isDownloaded
                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                : 'bg-slate-950 border border-white/5 text-slate-400 group-hover/card:bg-blue-950/40 group-hover/card:text-blue-400 group-hover/card:border-blue-500/20'
            }`}
          >
            {SYSTEM_THEMES[exam.system]?.icon || <FolderOpen className="w-6 h-6" />}
          </div>
          <div className="flex items-center gap-2">
            {isDownloaded ? (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20">
                <Sparkles className="w-2.5 h-2.5" /> Stored
              </div>
            ) : isSyncing ? (
              <div className="flex items-center gap-2 text-blue-400 px-3 py-1 bg-blue-950/40 rounded-full border border-blue-500/20 animate-pulse">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                <span className="text-[7px] font-black uppercase tracking-widest">Syncing</span>
              </div>
            ) : (
              exam.isDraft && (
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-950/40 text-indigo-400 rounded-full border border-indigo-500/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span className="text-[7px] font-black uppercase tracking-widest">Draft</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="relative z-10 mb-4">
          <h4 className="text-xl font-black text-white group-hover/card:text-blue-400 transition-colors duration-300 tracking-tight leading-tight mb-2 font-display uppercase">
            {exam.name}
          </h4>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <ListChecks className="w-3.5 h-3.5" />{' '}
              {(exam.steps || []).length > 0 ? `${(exam.steps || []).length} Steps` : 'Auto-Gen'}
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />{' '}
              {Math.max(5, Math.floor((exam.steps || []).length * 0.5))} Min
            </span>
          </div>
        </div>

        <p className="text-[12px] text-slate-405 mb-8 line-clamp-2 leading-relaxed font-semibold opacity-85 group-hover/card:opacity-100 transition-opacity flex-1">
          {exam.shortDescription}
        </p>

        <div className={`flex items-center justify-between mt-auto pt-6 border-t border-white/5`}>
          <span
            className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-500 ${isDownloaded ? 'text-emerald-400' : 'text-slate-400 group-hover/card:text-blue-400 group-hover/card:gap-4'}`}
          >
            Open Dossier <ArrowRight className="w-4 h-4" />
          </span>
          {!isDownloaded && !isSyncing && (
            <Tooltip content="Cache Protocol">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSync(exam.id);
                }}
                className="p-3 text-slate-400 hover:text-blue-450 hover:bg-blue-950/40 border border-white/5 hover:border-blue-500/20 rounded-xl transition-all shadow-sm bg-slate-950 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <CloudDownload className="w-5 h-5" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
);

export default ExaminationCard;
