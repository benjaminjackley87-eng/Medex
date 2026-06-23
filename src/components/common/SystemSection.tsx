import React, { memo } from 'react';
import { ChevronDown, Zap, CheckCircle2 } from 'lucide-react';
import { Examination } from '../../types';
import { SYSTEM_THEMES, DEFAULT_STYLE } from '../../theme';
import ExaminationCard from './ExaminationCard';
import Tooltip from './Tooltip';

interface SystemSectionProps {
  system: string;
  exams: Examination[];
  isExpanded: boolean;
  onToggle: (system: string) => void;
  onSelectExam: (exam: Examination) => void;
  onSyncExam: (examId: string) => void;
  downloadedIds: Set<string>;
  syncingIds: Set<string>;
}

const SystemSection: React.FC<SystemSectionProps> = memo(
  ({
    system,
    exams,
    isExpanded,
    onToggle,
    onSelectExam,
    onSyncExam,
    downloadedIds,
    syncingIds
  }) => {
    const style = SYSTEM_THEMES[system] || DEFAULT_STYLE;
    const downloadedCount = (exams || []).filter((e) => downloadedIds.has(e.id)).length;

    return (
      <div className="group/system animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button
          onClick={() => onToggle(system)}
          className={`w-full flex items-center justify-between p-6 rounded-[32px] transition-all duration-700 border-2 backdrop-blur-xl group/btn overflow-hidden relative ${
            isExpanded
              ? `${style.activeBg} ${style.border} ${style.glow} mb-8 scale-[1.01] shadow-2xl z-10`
              : `bg-slate-900/40 border-white/5 hover:bg-slate-900/80 hover:border-slate-800 shadow-sm ${style.shadow}`
          }`}
        >
          {/* Background Accent Glow on Hover */}
          <div
            className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[60px] opacity-0 transition-all duration-700 group-hover/btn:opacity-10 ${isExpanded ? 'bg-blue-950/200' : 'bg-slate-400'}`}
          />

          <div className="flex items-center gap-5 relative z-10">
            <div
              className={`p-4 rounded-2xl transition-all duration-700 shadow-xl border ${
                isExpanded
                  ? `${style.text} bg-slate-950 border-white/10 scale-110 rotate-3`
                  : `bg-slate-950 border-white/5 ${style.text} group-hover/btn:scale-105 group-hover/btn:-rotate-2`
              }`}
            >
              {style.icon}
            </div>
            <div className="text-left">
              <h3
                className={`font-black tracking-tight text-xl transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-slate-200'}`}
              >
                {system}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${isExpanded ? 'text-slate-300' : 'text-slate-550'}`}
                >
                  {(exams || []).length} Protocols
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-950/40 rounded-full border border-white/5">
                  <CheckCircle2
                    className={`w-3 h-3 ${downloadedCount === (exams || []).length ? 'text-emerald-400' : 'text-slate-400'}`}
                  />
                  <span className="text-[8px] font-black text-slate-400">
                    {downloadedCount} / {(exams || []).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 w-12 h-12 rounded-full flex items-center justify-center border ${
              isExpanded
                ? `rotate-180 bg-slate-950 text-white border-white/10 shadow-xl`
                : 'bg-slate-950/50 text-slate-400 border-white/5 group-hover/btn:text-slate-250 group-hover/btn:bg-slate-900'
            }`}
          >
            <ChevronDown className="w-6 h-6" />
          </div>
        </button>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-6 ml-8 pb-10 animate-in zoom-in-95 duration-500 border-l-2 border-white/5">
            {(exams || []).map((exam) => (
              <ExaminationCard
                key={exam.id}
                exam={exam}
                onSelect={onSelectExam}
                onSync={onSyncExam}
                isDownloaded={downloadedIds.has(exam.id)}
                isSyncing={syncingIds.has(exam.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default SystemSection;
