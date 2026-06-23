import React from 'react';
import { Lightbulb, ArrowRight, BrainCircuit, Quote, Star } from 'lucide-react';
import { AppView } from '../../types';

interface DashboardActionCardsProps {
  stats: {
    total: number;
    toReview: number;
    inProgress: number;
  };
  onNavigate: (view: AppView) => void;
  quotes: string[];
}

export const DashboardActionCards: React.FC<DashboardActionCardsProps> = ({ stats, onNavigate, quotes }) => {
  return (
    <div className="lg:col-span-1 flex flex-col gap-6">
      <div
        className="bg-blue-900/60 border border-blue-500/20 text-white rounded-[32px] p-8 shadow-lg shadow-blue-950/40 relative overflow-hidden flex-1 flex flex-col justify-center group cursor-pointer hover:bg-blue-900 transition-colors"
        onClick={() => onNavigate('library')}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-950/40/10 blur-2xl rounded-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <Lightbulb className="w-5 h-5 text-blue-300" />
          <h2 className="text-lg font-black uppercase tracking-tight">Suggested Action</h2>
        </div>
        <p className="text-sm font-medium text-blue-200 relative z-10 leading-relaxed mb-6">
          {stats.total === 0
            ? 'Welcome to MedEx! Start by exploring the clinical repository and downloading examination protocols.'
            : stats.toReview > 0
              ? `You have ${stats.toReview} protocol${stats.toReview === 1 ? '' : 's'} to review. Keeping up with reviews ensures long-term retention.`
              : stats.inProgress > 0
                ? `You have ${stats.inProgress} protocol${stats.inProgress === 1 ? '' : 's'} in progress. Keep up the good work and master them today!`
                : "Great job! You've mastered all your downloaded protocols. Explore the repository for more."}
        </p>
        <div className="mt-auto w-full py-3 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-750 transition-colors relative z-10 shadow-sm border border-blue-500/20">
          {stats.total === 0 ? 'Open Repository' : 'Go to Repository'}{' '}
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div
        className="bg-indigo-950/60 border border-indigo-500/20 text-white rounded-[32px] p-8 shadow-lg shadow-indigo-955/40 relative overflow-hidden flex-1 flex flex-col justify-center group cursor-pointer hover:bg-indigo-900 transition-colors"
        onClick={() => onNavigate('diagnosticReasoning')}
      >
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-950/40/10 blur-3xl rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <BrainCircuit className="w-5 h-5 text-indigo-300" />
          <h2 className="text-lg font-black uppercase tracking-tight">Daily Challenge</h2>
        </div>
        <p className="text-sm font-medium text-indigo-200 relative z-10 leading-relaxed mb-6">
          Test your diagnostic skills with today's clinical synthesis challenge. Formulate
          differentials based on complex presentations.
        </p>
        <div className="mt-auto w-full py-3 bg-slate-950/40/20 hover:bg-slate-950/40/30 text-white rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors relative z-10 backdrop-blur-sm">
          Start Challenge{' '}
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Quote of the Day Card */}
      <div className="bg-amber-950/30 border border-amber-500/10 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
        <Quote className="absolute -bottom-4 -right-4 w-24 h-24 text-amber-500/10 -rotate-12 pointer-events-none" />
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <Star className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-black text-white uppercase tracking-tight">
            Quote of the Day
          </h2>
        </div>
        <p className="text-sm font-medium text-amber-100/80 italic leading-relaxed relative z-10">
          "{quotes[0].split(' - ')[0]}"
        </p>
        <p className="text-[10px] font-black text-amber-400/70 uppercase tracking-widest mt-4 relative z-10">
          — {quotes[0].split(' - ')[1]}
        </p>
      </div>
    </div>
  );
};
