import React from 'react';
import { StudyProgress } from '../../../types';

interface RGATopic {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface StudySidebarProps {
  rgaTopics: RGATopic[];
  progress: StudyProgress[];
  selectedTopic: string | null;
  view: 'dashboard' | 'session' | 'results';
  startSession: (topic: string, type?: 'practice' | 'mock') => void;
}

const StudySidebar: React.FC<StudySidebarProps> = ({
  rgaTopics,
  progress,
  selectedTopic,
  view,
  startSession
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[9px]">
          Select Focus Topic
        </h3>
        <div className="space-y-1">
          {rgaTopics.map((topic) => {
            const topicProgress = progress.find((p) => p.topic === topic.name);
            return (
              <button
                key={topic.id}
                onClick={() => {
                  if (view === 'dashboard') {
                    startSession(topic.name, 'practice');
                  }
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                  selectedTopic === topic.name
                    ? 'text-indigo-400 bg-indigo-950/200/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/40/[0.02]'
                }`}
              >
                <span className="truncate">{topic.name}</span>
                <span className="text-[9px] text-slate-400 font-medium shrink-0 ml-2">
                  {topicProgress?.masteryLevel || 0}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudySidebar;
