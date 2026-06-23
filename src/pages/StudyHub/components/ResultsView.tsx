import React from 'react';
import { Trophy, RefreshCcw } from 'lucide-react';
import { ExamSession } from '../../../types';

interface ResultsViewProps {
  currentSession: ExamSession | null;
  selectedTopic: string | null;
  setView: (view: 'dashboard' | 'session' | 'results') => void;
  startSession: (topic: string, type?: 'practice' | 'mock') => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  currentSession,
  selectedTopic,
  setView,
  startSession
}) => {
  if (!currentSession) return null;
  const percentage = Math.round((currentSession.score / currentSession.questions.length) * 100);

  return (
    <div className="max-w-md mx-auto py-12 text-center animate-in zoom-in duration-500">
      <div className="w-20 h-20 bg-indigo-950/40 text-indigo-400 border border-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Trophy className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-black text-white mb-2">Session Complete!</h2>
      <p className="text-slate-400 font-medium text-xs mb-8">
        RGA curriculum questions completed successfully.
      </p>

      <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              Score
            </div>
            <div className="text-3xl font-black text-indigo-400">
              {currentSession.score}/{currentSession.questions.length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              Accuracy
            </div>
            <div className="text-3xl font-black text-indigo-400">{percentage}%</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setView('dashboard')}
          className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
        >
          Dashboard
        </button>
        <button
          onClick={() => selectedTopic && startSession(selectedTopic)}
          className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
