import React from 'react';
import { Clock, Sparkles, Send, RefreshCw, RotateCcw } from 'lucide-react';
import { Examination } from '../../types';

interface StepsDetailProps {
  exam: Examination;
  progress: number;
  checkedSteps: Set<string>;
  refinementPrompt: string;
  setRefinementPrompt: (prompt: string) => void;
  isRefining: boolean;
  handleRefine: () => void;
  showUndo: boolean;
  handleUndoRefine: () => void;
}

export const StepsDetail: React.FC<StepsDetailProps> = ({
  exam,
  progress,
  checkedSteps,
  refinementPrompt,
  setRefinementPrompt,
  isRefining,
  handleRefine,
  showUndo,
  handleUndoRefine
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">
          Dossier Highlights
        </span>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">{exam.name}</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">
            Estimated Time
          </span>
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-450" />
            <span>12-15 Min</span>
          </div>
        </div>
        {exam.referenceStandard && (
          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">
              Reference Level
            </span>
            <span
              className="text-xs font-black text-indigo-400 truncate"
              title={exam.referenceStandard}
            >
              {exam.referenceStandard}
            </span>
          </div>
        )}
      </div>

      <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
            OSCE Progress
          </span>
          <span className="text-xs font-black text-emerald-450">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-emerald-500 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] font-black text-slate-550 uppercase tracking-widest">
          <span>{checkedSteps.size} Checked</span>
          <span>{exam.steps.length - checkedSteps.size} Left</span>
        </div>
      </div>

      <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
            AI Protocol Refinement
          </span>
        </div>
        <p className="text-[9px] font-medium text-slate-400 leading-relaxed">
          Ask AI to add details, pathophysiology, or specific stigmata findings to this protocol.
        </p>
        <textarea
          value={refinementPrompt}
          onChange={(e) => setRefinementPrompt(e.target.value)}
          placeholder="e.g. Add details for auscultatory zones..."
          className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs outline-none focus:border-indigo-500 min-h-[90px] resize-none text-slate-350 placeholder:text-slate-400"
          disabled={isRefining}
        />
        <button
          onClick={handleRefine}
          disabled={isRefining || !refinementPrompt.trim()}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40 transition-all"
        >
          {isRefining ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          Refine Protocol
        </button>
        {showUndo && (
          <button
            onClick={handleUndoRefine}
            className="w-full py-2 bg-amber-950/40 border border-amber-500/20 text-amber-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-900/40 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Undo Refinement
          </button>
        )}
      </div>
    </div>
  );
};
