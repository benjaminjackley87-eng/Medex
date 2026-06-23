import React, { useMemo } from 'react';
import { Examination, LearningStatus, ExamSystem, AppView, StudyProgress } from '../types';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Target,
  Award,
  ChevronRight,
  ArrowRight,
  Activity as ActivityIcon,
  Calendar,
  Zap,
  Star,
  Quote,
  Lightbulb,
  ListChecks,
  Stethoscope,
  Microscope,
  Activity,
  Pill,
  BrainCircuit,
  Play,
  Search,
  Calculator,
  ShieldCheck,
  Layers,
  Skull,
  Wrench,
  Trophy
} from 'lucide-react';
import { SYSTEM_THEMES, DEFAULT_STYLE } from '../theme';

interface DashboardViewProps {
  downloadedExams?: Examination[];
  studyProgress?: StudyProgress[];
  onSelectExam?: (exam: Examination) => void;
  onNavigate?: (view: AppView) => void;
  onOpenCommandPalette?: () => void;
}

import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

const DashboardView: React.FC<DashboardViewProps> = (props) => {
  const store = useAppStore();
  const reactNavigate = useNavigate();

  const downloadedExams = props.downloadedExams ?? store.downloadedExams;
  const studyProgress = props.studyProgress ?? store.studyProgress;
  const onNavigate = props.onNavigate ?? ((view: string) => {
    const routeMap: Record<string, string> = {
      diagnosticReasoning: 'search',
      investigationsHub: 'calculators',
      studyHub: 'search',
      acuteInterventions: 'procedures',
      therapeuticsTox: 'therapeutics'
    };
    reactNavigate(`/${routeMap[view] || view}`);
  });
  const onSelectExam = props.onSelectExam ?? ((exam: Examination) => {
    store.setSelectedExam(exam);
    reactNavigate(`/exam/${exam.id}`);
  });
  const onOpenCommandPalette = props.onOpenCommandPalette;

  const stats = useMemo(() => {
    const total = downloadedExams.length;
    const learned = downloadedExams.filter(
      (e) => e.learningStatus === LearningStatus.LEARNED
    ).length;
    const inProgress = downloadedExams.filter(
      (e) => e.learningStatus === LearningStatus.IN_PROGRESS
    ).length;
    const toReview = downloadedExams.filter(
      (e) => e.learningStatus === LearningStatus.TO_REVIEW || !e.learningStatus
    ).length;

    const systemProgress = Object.values(ExamSystem)
      .map((system) => {
        const exams = downloadedExams.filter((e) => e.system === system);
        if (exams.length === 0) return null;
        const learnedCount = exams.filter(
          (e) => e.learningStatus === LearningStatus.LEARNED
        ).length;
        return {
          system,
          total: exams.length,
          learned: learnedCount,
          percentage: Math.round((learnedCount / exams.length) * 100)
        };
      })
      .filter(Boolean);

    return { total, learned, inProgress, toReview, systemProgress };
  }, [downloadedExams]);

  const recentActivity = useMemo(() => {
    return downloadedExams.slice(0, 4).map((exam, idx) => ({
      id: exam.id,
      type: idx % 2 === 0 ? 'completion' : 'sync',
      title: idx % 2 === 0 ? `Mastered ${exam.name}` : `Synced ${exam.name}`,
      time: `${idx + 1}h ago`,
      system: exam.system,
      exam
    }));
  }, [downloadedExams]);

  const quotes = [
    'The good physician treats the disease; the great physician treats the patient who has the disease. - William Osler',
    'Listen to your patient, he is telling you the diagnosis. - William Osler',
    'Medicine is a science of uncertainty and an art of probability. - William Osler'
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 text-slate-100">
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

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-950/60 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/10">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Total Exams
            </p>
            <p className="text-3xl font-black text-white">{stats.total}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 text-emerald-450 flex items-center justify-center shrink-0 border border-emerald-500/10">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-1">
              Mastered
            </p>
            <p className="text-3xl font-black text-white">{stats.learned}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-950/60 text-amber-450 flex items-center justify-center shrink-0 border border-amber-500/10">
            <ActivityIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-1">
              In Progress
            </p>
            <p className="text-3xl font-black text-white">{stats.inProgress}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-white/5 rounded-[32px] p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-950/60 text-rose-450 flex items-center justify-center shrink-0 border border-rose-500/10">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-1">
              To Review
            </p>
            <p className="text-3xl font-black text-white">{stats.toReview}</p>
          </div>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links - Spans 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-950/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight mb-1">
                  <Zap className="w-6 h-6 text-rose-500" />
                  Clinical Tools
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Quick Access Modules
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
              {[
                {
                  label: 'System Exams',
                  desc: 'Protocol Library',
                  icon: <Stethoscope className="w-6 h-6" />,
                  view: 'library' as AppView,
                  color: 'text-blue-400',
                  bg: 'bg-blue-950/40',
                  hoverBg: 'hover:bg-blue-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-blue-950'
                },
                {
                  label: 'Differentials',
                  desc: 'Diagnostic Synthesis',
                  icon: <BrainCircuit className="w-6 h-6" />,
                  view: 'diagnosticReasoning' as AppView,
                  color: 'text-indigo-400',
                  bg: 'bg-indigo-950/40',
                  hoverBg: 'hover:bg-indigo-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-indigo-950'
                },
                {
                  label: 'Calculators',
                  desc: 'Clinical Scores',
                  icon: <Calculator className="w-6 h-6" />,
                  view: 'investigationsHub' as AppView,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-950/40',
                  hoverBg: 'hover:bg-emerald-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-emerald-950'
                },
                {
                  label: 'Study Hub',
                  desc: 'RGA MCQ Prep',
                  icon: <GraduationCap className="w-6 h-6" />,
                  view: 'studyHub' as AppView,
                  color: 'text-indigo-400',
                  bg: 'bg-indigo-950/40',
                  hoverBg: 'hover:bg-indigo-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-indigo-950'
                },
                {
                  label: 'Procedures',
                  desc: 'Bedside Skills',
                  icon: <Wrench className="w-6 h-6" />,
                  view: 'acuteInterventions' as AppView,
                  color: 'text-rose-400',
                  bg: 'bg-rose-950/40',
                  hoverBg: 'hover:bg-rose-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-rose-950'
                },
                {
                  label: 'ECG Library',
                  desc: 'Rhythm Analysis',
                  icon: <Activity className="w-6 h-6" />,
                  view: 'investigationsHub' as AppView,
                  color: 'text-rose-400',
                  bg: 'bg-rose-950/40',
                  hoverBg: 'hover:bg-rose-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-rose-950'
                },
                {
                  label: 'Radiology',
                  desc: 'Imaging Gallery',
                  icon: <Layers className="w-6 h-6" />,
                  view: 'investigationsHub' as AppView,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-950/40',
                  hoverBg: 'hover:bg-emerald-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-emerald-950'
                },
                {
                  label: 'Investigations',
                  desc: 'Lab & Imaging',
                  icon: <Microscope className="w-6 h-6" />,
                  view: 'investigationsHub' as AppView,
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-950/40',
                  hoverBg: 'hover:bg-cyan-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-cyan-950'
                },
                {
                  label: 'Therapeutics',
                  desc: 'Live Protocols',
                  icon: <ShieldCheck className="w-6 h-6" />,
                  view: 'therapeuticsTox' as AppView,
                  color: 'text-amber-400',
                  bg: 'bg-amber-950/40',
                  hoverBg: 'hover:bg-amber-600',
                  hoverText: 'group-hover:text-white',
                  border: 'border-amber-950'
                }
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(link.view)}
                  className={`flex flex-col items-start gap-4 p-5 rounded-[24px] border ${link.border} ${link.hoverBg} transition-all duration-300 group bg-slate-950 hover:shadow-xl hover:-translate-y-1`}
                >
                  <div
                    className={`p-3.5 rounded-2xl ${link.bg} ${link.color} ${link.hoverText} group-hover:bg-slate-950/40/20 transition-colors duration-300 border border-white/5`}
                  >
                    {link.icon}
                  </div>
                  <div className="text-left mt-1">
                    <span
                      className={`block text-xs font-black text-slate-200 uppercase tracking-tight mb-0.5 group-hover:text-white transition-colors duration-300`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`block text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white/70 transition-colors duration-300`}
                    >
                      {link.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Action & Quote & Daily Challenge */}
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

        {/* Activity Feed */}
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
                const theme = SYSTEM_THEMES[activity.system] || DEFAULT_STYLE;
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

        {/* OSCE Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* OSCE Progress Card */}
          <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
                <Target className="w-5 h-5 text-rose-400" />
                OSCE Progress
              </h2>
            </div>
            <div className="space-y-4">
              {stats.systemProgress.length > 0 ? (
                stats.systemProgress.map((item: any) => (
                  <div
                    key={item.system}
                    className="flex flex-col gap-2 p-4 bg-slate-950/50 rounded-2xl border border-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
                        {item.system}
                      </span>
                      <span className="text-[11px] font-black text-slate-200">
                        {item.learned} / {item.total}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-950/200 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-950/40 rounded-3xl border border-white/5 border-dashed">
                  <p className="text-slate-400 text-sm font-medium">
                    Download examinations to see stats.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Study Mastery Card */}
          <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-tight">
                <Trophy className="w-5 h-5 text-indigo-400" />
                Study Mastery
              </h2>
              <button
                onClick={() => onNavigate('studyHub')}
                className="text-[10px] font-black text-slate-400 hover:text-indigo-400 uppercase tracking-widest transition-colors"
              >
                Study Hub
              </button>
            </div>
            <div className="space-y-4">
              {studyProgress.length > 0 ? (
                studyProgress.slice(0, 4).map((item) => (
                  <div
                    key={item.topic}
                    className="flex flex-col gap-2 p-4 bg-slate-950/50 rounded-2xl border border-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[150px]">
                        {item.topic}
                      </span>
                      <span className="text-[11px] font-black text-indigo-400">
                        {item.masteryLevel}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-950/200 rounded-full transition-all"
                        style={{ width: `${item.masteryLevel}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-950/40 rounded-3xl border border-white/5 border-dashed">
                  <p className="text-slate-400 text-sm font-medium">
                    Start studying in the Study Hub to see progress.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
