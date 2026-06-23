import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Trophy,
  Target,
  Clock,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Brain,
  Stethoscope,
  Activity,
  Zap,
  Loader2,
  ArrowLeft,
  RefreshCcw,
  GraduationCap
} from 'lucide-react';
import { MCQQuestion, StudyProgress, ExamSession } from '../types';
import { geminiService } from '../services/geminiService';
import { storage } from '../services/storageService';
import SuiteLayout, { SuiteTab } from '../components/ui/SuiteLayout';
import GlowContainer from '../components/ui/GlowContainer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const RGA_TOPICS = [
  {
    id: 'phys',
    name: 'Applied Physiology',
    icon: <Activity className="w-4 h-4" />,
    color: 'bg-blue-600'
  },
  {
    id: 'pharm',
    name: 'Clinical Pharmacology',
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-amber-600'
  },
  {
    id: 'equip',
    name: 'Equipment & Monitoring',
    icon: <Stethoscope className="w-4 h-4" />,
    color: 'bg-emerald-600'
  },
  {
    id: 'regional',
    name: 'Regional Anaesthesia',
    icon: <Target className="w-4 h-4" />,
    color: 'bg-purple-600'
  },
  {
    id: 'obs',
    name: 'Obstetric Anaesthesia',
    icon: <Brain className="w-4 h-4" />,
    color: 'bg-rose-600'
  },
  {
    id: 'paeds',
    name: 'Paediatric Anaesthesia',
    icon: <Target className="w-4 h-4" />,
    color: 'bg-indigo-600'
  },
  {
    id: 'crit',
    name: 'Critical Care & Resus',
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-red-600'
  },
  {
    id: 'pain',
    name: 'Pain Management',
    icon: <Activity className="w-4 h-4" />,
    color: 'bg-orange-600'
  }
];

const StudyHubView: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'session' | 'results'>('dashboard');
  const [progress, setProgress] = useState<StudyProgress[]>([]);
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'practice' | 'mock'>('practice');

  useEffect(() => {
    loadStudyData();
  }, []);

  const loadStudyData = async () => {
    const [savedProgress, savedSessions] = await Promise.all([
      storage.getAllStudyProgress(),
      storage.getAllExamSessions()
    ]);
    setProgress(savedProgress);
    setSessions(savedSessions);
  };

  const startSession = async (topic: string, type: 'practice' | 'mock' = 'practice') => {
    setLoading(true);
    setSelectedTopic(topic);
    setSessionType(type);
    try {
      const count = type === 'mock' ? 10 : 5;
      const questions = await geminiService.generateMCQs(topic, count);
      const newSession: ExamSession = {
        id: Math.random().toString(36).substr(2, 9),
        startTime: Date.now(),
        questions,
        userAnswers: [],
        score: 0,
        isCompleted: false
      };
      setCurrentSession(newSession);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setShowExplanation(false);
      setView('session');
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setView('session');
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    if (sessionType === 'practice') {
      setShowExplanation(true);
    }

    if (currentSession) {
      const isCorrect =
        optionIndex === currentSession.questions[currentQuestionIndex].correctOptionIndex;
      const updatedAnswers = [...currentSession.userAnswers, optionIndex];
      const updatedScore = isCorrect ? currentSession.score + 1 : currentSession.score;

      setCurrentSession({
        ...currentSession,
        userAnswers: updatedAnswers,
        score: updatedScore
      });

      if (sessionType === 'mock') {
        setTimeout(() => {
          if (currentQuestionIndex < currentSession.questions.length - 1) {
            nextQuestion();
          } else {
            setShowExplanation(true);
          }
        }, 1000);
      }
    }
  };

  const nextQuestion = () => {
    if (!currentSession) return;

    if (currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      completeSession();
    }
  };

  const completeSession = async () => {
    if (!currentSession || !selectedTopic) return;

    const completedSession = {
      ...currentSession,
      endTime: Date.now(),
      isCompleted: true
    };

    await storage.saveExamSession(completedSession);

    const existingProgress = progress.find((p) => p.topic === selectedTopic) || {
      topic: selectedTopic,
      questionsAttempted: 0,
      correctAnswers: 0,
      lastStudiedAt: 0,
      masteryLevel: 0
    };

    const updatedProgress: StudyProgress = {
      ...existingProgress,
      questionsAttempted: existingProgress.questionsAttempted + completedSession.questions.length,
      correctAnswers: existingProgress.correctAnswers + completedSession.score,
      lastStudiedAt: Date.now(),
      masteryLevel: Math.round(
        ((existingProgress.correctAnswers + completedSession.score) /
          (existingProgress.questionsAttempted + completedSession.questions.length)) *
          100
      )
    };

    await storage.saveStudyProgress(updatedProgress);
    await loadStudyData();
    setView('results');
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Overview stats cards */}
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

      {/* Progress Charts */}
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

      {/* Curriculum Topics Grid */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Topics Catalog
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RGA_TOPICS.map((topic) => {
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

  const renderSession = () => {
    if (!currentSession) return null;
    const question = currentSession.questions[currentQuestionIndex];

    return (
      <div className="max-w-3xl mx-auto py-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setView('dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-black uppercase text-[9px] tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel Session
          </button>
          <div className="flex items-center gap-4">
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
              Question {currentQuestionIndex + 1} / {currentSession.questions.length}
            </div>
            <div className="w-24 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-indigo-950/200 transition-all duration-500"
                style={{
                  width: `${((currentQuestionIndex + 1) / currentSession.questions.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2.5 py-1 bg-indigo-950/50 text-indigo-400 border border-indigo-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest">
              {question.category}
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${
                question.difficulty === 'Easy'
                  ? 'bg-emerald-950/50 border-emerald-500/20 text-emerald-400'
                  : question.difficulty === 'Medium'
                    ? 'bg-amber-955/50 border-amber-500/20 text-amber-400'
                    : 'bg-rose-95/-50 border-rose-500/20 text-rose-400'
              }`}
            >
              {question.difficulty}
            </span>
          </div>

          <h3 className="text-base font-black text-white leading-relaxed mb-8">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctOptionIndex;
              const showResult = selectedOption !== null;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group cursor-pointer ${
                    isSelected && isCorrect
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                      : isSelected && !isCorrect
                        ? 'border-rose-500 bg-rose-950/20 text-rose-300'
                        : showResult && isCorrect
                          ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                          : 'border-white/5 bg-slate-950/40 text-slate-300 hover:border-indigo-500/40 hover:bg-slate-900'
                  }`}
                >
                  <span className="font-bold text-xs">{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 pt-8 border-t border-white/5"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[9px] tracking-widest mb-3">
                  <AlertCircle className="w-3.5 h-3.5" /> Clinical Explanation
                </div>
                <p className="text-slate-300 font-medium leading-relaxed text-xs">
                  {question.explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {currentQuestionIndex === currentSession.questions.length - 1
                    ? 'Complete Session'
                    : 'Next Question'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const renderResults = () => {
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

  const renderSidebar = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[9px]">
            Select Focus Topic
          </h3>
          <div className="space-y-1">
            {RGA_TOPICS.map((topic) => {
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

  const renderDetail = () => {
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

  const suiteTabs: SuiteTab[] = [{ id: 'dashboard', label: 'Study Console', icon: GraduationCap }];

  return (
    <GlowContainer theme="indigo" containerClass="w-full h-full max-w-none p-0">
      <SuiteLayout
        title="Study Hub"
        category="Preparation"
        activeTab="dashboard"
        tabs={suiteTabs}
        onSelectTab={() => {}}
        onBack={() => window.location.reload()}
        themeClass="from-indigo-600 to-purple-850"
        sidebarTitle="Topics Catalogs"
        sidebarIcon={BookOpen}
        sidebarContent={renderSidebar()}
        detailTitle="Study Dashboard"
        detailIcon={Trophy}
        detailContent={renderDetail()}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <div className="text-center">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">
                Generating Practice Exam
              </h4>
              <p className="text-slate-400 text-[9px] mt-1">
                Curating questions from the RGA curriculum database
              </p>
            </div>
          </div>
        ) : (
          <>
            {view === 'dashboard' && renderDashboard()}
            {view === 'session' && renderSession()}
            {view === 'results' && renderResults()}
          </>
        )}
      </SuiteLayout>
    </GlowContainer>
  );
};

export default StudyHubView;
