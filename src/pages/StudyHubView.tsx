import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Trophy,
  Target,
  Brain,
  Stethoscope,
  Activity,
  Zap,
  Loader2,
  GraduationCap
} from 'lucide-react';
import { StudyProgress, ExamSession } from '../types';
import { geminiService } from '../services/geminiService';
import { storage } from '../services/storageService';
import SuiteLayout, { SuiteTab } from '../components/ui/SuiteLayout';
import DashboardView from './StudyHub/components/DashboardView';
import SessionView from './StudyHub/components/SessionView';
import ResultsView from './StudyHub/components/ResultsView';
import GlowContainer from '../components/ui/GlowContainer';

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

const generateSessionId = () => Math.random().toString(36).substr(2, 9);
const getCurrentTimestamp = () => Date.now();

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

  const loadStudyData = async () => {
    const [savedProgress, savedSessions] = await Promise.all([
      storage.getAllStudyProgress(),
      storage.getAllExamSessions()
    ]);
    setProgress(savedProgress);
    setSessions(savedSessions);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStudyData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const startSession = async (topic: string, type: 'practice' | 'mock' = 'practice') => {
    setLoading(true);
    setSelectedTopic(topic);
    setSessionType(type);
    try {
      const count = type === 'mock' ? 10 : 5;
      const questions = await geminiService.generateMCQs(topic, count);
      const newSession: ExamSession = {
        id: generateSessionId(),
        startTime: getCurrentTimestamp(),
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
      endTime: getCurrentTimestamp(),
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
      lastStudiedAt: getCurrentTimestamp(),
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
            {view === 'dashboard' && (
              <DashboardView
                progress={progress}
                sessions={sessions}
                rgaTopics={RGA_TOPICS}
                startSession={startSession}
              />
            )}
            {view === 'session' && (
              <SessionView
                currentSession={currentSession}
                currentQuestionIndex={currentQuestionIndex}
                selectedOption={selectedOption}
                showExplanation={showExplanation}
                setView={setView}
                handleAnswer={handleAnswer}
                nextQuestion={nextQuestion}
              />
            )}
            {view === 'results' && (
              <ResultsView
                currentSession={currentSession}
                selectedTopic={selectedTopic}
                setView={setView}
                startSession={startSession}
              />
            )}
          </>
        )}
      </SuiteLayout>
    </GlowContainer>
  );
};

export default StudyHubView;
