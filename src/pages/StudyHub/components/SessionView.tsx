import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { ExamSession } from '../../../types';

interface SessionViewProps {
  currentSession: ExamSession | null;
  currentQuestionIndex: number;
  selectedOption: number | null;
  showExplanation: boolean;
  setView: (view: 'dashboard' | 'session' | 'results') => void;
  handleAnswer: (optionIndex: number) => void;
  nextQuestion: () => void;
}

const SessionView: React.FC<SessionViewProps> = ({
  currentSession,
  currentQuestionIndex,
  selectedOption,
  showExplanation,
  setView,
  handleAnswer,
  nextQuestion
}) => {
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
                {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
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

export default SessionView;
