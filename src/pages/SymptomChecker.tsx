import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { Activity, Loader2, Zap, ArrowRight, ClipboardList, Stethoscope } from 'lucide-react';
import { EXAMINATIONS } from '../constants';
import { Examination } from '../types';

interface SymptomCheckerProps {
  onSelectExam: (exam: Examination) => void;
}

import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
const SymptomChecker: React.FC<Partial<SymptomCheckerProps>> = (props) => {
  const store = useAppStore();
  const reactNavigate = useNavigate();
  const onSelectExam =
    props.onSelectExam ??
    ((exam: any) => {
      store.setSelectedExam(exam);
      reactNavigate('/exam/' + exam.id);
    });

  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    suggestedExams: { id: string; name: string; reason: string }[];
    explanation: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gemini = new GeminiService();

  const handleAnalyze = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const analysis = await gemini.suggestExaminationsForSymptoms(symptoms);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze symptoms. Please try again or refine your symptom description.');
    } finally {
      setLoading(false);
    }
  };

  const handleExamClick = (suggestedId: string) => {
    // Try to find the exam in EXAMINATIONS by an exact or partial id match
    const foundExam = EXAMINATIONS.find(
      (e) => e.id === suggestedId || e.id.includes(suggestedId) || suggestedId.includes(e.id)
    );

    if (foundExam) {
      onSelectExam(foundExam);
    } else {
      // If we don't have exactly that ID, try finding by name
      const foundByName = EXAMINATIONS.find(
        (e) =>
          e.name.toLowerCase().includes(suggestedId.toLowerCase()) ||
          suggestedId.toLowerCase().includes(e.name.toLowerCase())
      );
      if (foundByName) {
        onSelectExam(foundByName);
      } else {
        alert(
          'This specific examination protocol is not currently in the library, or the ID did not match.'
        );
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              Symptom Checker
            </h1>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Clinical Reasoning & Triage
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-400 max-w-xl font-semibold leading-relaxed">
          Input a list of patient symptoms to generate evidence-based suggestions for physical
          examinations to perform. Our clinical reasoning engine will map symptoms to the
          appropriate systemic assessments.
        </p>
      </header>

      <form onSubmit={handleAnalyze} className="relative mb-12">
        <div className="relative group">
          <ClipboardList className="absolute left-6 top-6 w-5 h-5 text-slate-450 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. 45yo male with 3 days of shortness of breath, bilateral ankle swelling, and orthopnea..."
            rows={4}
            className="w-full pl-16 pr-6 py-6 bg-slate-900 border-2 border-white/5 rounded-[32px] text-base font-bold text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <SparklesIcon /> Analyze Symptoms
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-6 bg-red-950/40 border border-red-500/25 rounded-3xl text-red-400 text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
          <Zap className="w-4 h-4" />
          {error}
        </div>
      )}

      {loading && !result && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-955 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] animate-pulse">
            Running Clinical Algorithms...
          </p>
        </div>
      )}

      {result && (
        <div className="space-y-8 animate-in zoom-in-95 duration-700">
          <div className="bg-slate-900/60 p-8 rounded-[40px] border-2 border-white/5 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <h2 className="text-xl font-black text-white tracking-tight mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-500" />
              Clinical Reasoning Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-semibold">
              {result.explanation}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
              Suggested Examinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.suggestedExams.map((exam, i) => (
                <button
                  key={i}
                  onClick={() => handleExamClick(exam.id)}
                  className="flex flex-col text-left p-6 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase">
                      {exam.name}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-405 font-semibold opacity-85 leading-relaxed">
                    {exam.reason}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default SymptomChecker;
