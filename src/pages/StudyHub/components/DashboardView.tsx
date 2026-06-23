import React from 'react';
import { Trophy, Target, BarChart3, BookOpen } from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { StudyProgress, ExamSession } from '../../../types';

interface DashboardViewProps {
  progress: StudyProgress[];
  sessions: ExamSession[];
  rgaTopics: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
  }>;
  startSession: (topic: string, type?: 'practice' | 'mock') => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  sessions,
  rgaTopics,
  startSession
}) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-950/40 text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
            Total Correct
          </div>
          <div className="text-2xl font-black text-white">
            {progress.reduce((acc, p) => acc + p.correctAnswers, 0)}
          </div>
        </div>
      </div>
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
            Questions Attempted
          </div>
          <div className="text-2xl font-black text-white">
            {progress.reduce((acc, p) => acc + p.questionsAttempted, 0)}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
      <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 mb-6">
        <BarChart3 className="w-4 h-4" /> Mastery Performance Over Time
      </h3>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sessions.slice(-10).map((s) => ({
              name: new Date(s.startTime).toLocaleDateString(),
              score: (s.score / s.questions.length) * 100
            }))}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
              labelStyle={{ fontWeight: 800, color: '#94a3b8' }}
              itemStyle={{ fontWeight: 800, color: '#6366f1' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="space-y-6">
      <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
        <BookOpen className="w-4 h-4" /> Topics Catalog
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rgaTopics.map((topic) => {
          const topicProgress = progress.find((p) => p.topic === topic.name);
          return (
            <div
              key={topic.id}
              className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all text-left flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 ${topic.color} rounded-xl flex items-center justify-center text-white shrink-0`}
                  >
                    {topic.icon}
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    {topic.name}
                  </h4>
                </div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  {topicProgress?.masteryLevel || 0}% Mastery
                </span>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => startSession(topic.name, 'practice')}
                  className="flex-1 py-2.5 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Practice Mode
                </button>
                <button
                  onClick={() => startSession(topic.name, 'mock')}
                  className="flex-1 py-2.5 bg-rose-950/40 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Mock Exam
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default DashboardView;
