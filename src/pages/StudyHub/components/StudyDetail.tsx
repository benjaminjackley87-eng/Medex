import React from 'react';
import { Trophy } from 'lucide-react';
import { StudyProgress } from '../../../types';

interface StudyDetailProps {
  progress: StudyProgress[];
}

const StudyDetail: React.FC<StudyDetailProps> = ({ progress }) => {
  return (
    <div className="space-y-6 text-slate-400 text-xs font-medium leading-relaxed">
      <div className="p-4 bg-indigo-950/20 border border-indigo-500/10 rounded-2xl">
        <h4 className="font-black text-slate-200 uppercase tracking-widest text-[9px] mb-1.5 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-indigo-400" /> Study Stats
        </h4>
        <div className="space-y-3 mt-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Total Score:</span>
            <span className="font-black text-white">
              {progress.reduce((acc, p) => acc + p.correctAnswers, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Attempted:</span>
            <span className="font-black text-white">
              {progress.reduce((acc, p) => acc + p.questionsAttempted, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Average Accuracy:</span>
            <span className="font-black text-white">
              {progress.reduce((acc, p) => acc + p.questionsAttempted, 0) > 0
                ? `${Math.round((progress.reduce((acc, p) => acc + p.correctAnswers, 0) / progress.reduce((acc, p) => acc + p.questionsAttempted, 0)) * 100)}%`
                : '0%'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDetail;
