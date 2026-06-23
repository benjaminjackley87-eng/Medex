import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import {
  ClinicalCorrelation,
  DifferentialSynthesis,
  PatientContext,
  ClarifyingQuestion,
  ClarifyingResponse
} from '../types';
import {
  Search,
  Loader2,
  Zap,
  Sparkles,
  Lock,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  ToggleLeft as Toggle,
  ToggleRight,
  AlertTriangle,
  Activity,
  Plus,
  X,
  Stethoscope,
  Clock,
  Settings,
  BrainCircuit,
  MessageSquarePlus,
  Users,
  ChevronUp,
  ChevronDown,
  History,
  User,
  Scale,
  Globe,
  Cigarette,
  Wine,
  Pill
} from 'lucide-react';
import ImageModal from '../components/common/ImageModal';

import { CorrelationTab } from '../features/ClinicalCorrelationView/CorrelationTab';
import { SynthesisTab } from '../features/ClinicalCorrelationView/SynthesisTab';

interface ClinicalCorrelationViewProps {
  onNavigateToInvestigations?: (query: string) => void;
  onNavigateToGlossary?: (term: string) => void;
}

const ClinicalCorrelationView: React.FC<ClinicalCorrelationViewProps> = ({
  onNavigateToInvestigations,
  onNavigateToGlossary
}) => {
  const [query, setQuery] = useState('');
  const [findings, setFindings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [correlation, setCorrelation] = useState<ClinicalCorrelation | null>(null);
  const [synthesis, setSynthesis] = useState<DifferentialSynthesis | null>(null);
  const [clarifyingQuestions, setClarifyingQuestions] = useState<ClarifyingQuestion[]>([]);
  const [clarifyingResponses, setClarifyingResponses] = useState<ClarifyingResponse[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isRefined, setIsRefined] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProMode, setIsProMode] = useState(false);
  const [mode, setMode] = useState<'correlation' | 'synthesis'>('correlation');
  const [showKeyGate, setShowKeyGate] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);
  const [showContext, setShowContext] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({ update_interval_hours: '24', sync_mode: 'automatic' });
  const [patientContext, setPatientContext] = useState<PatientContext>({
    pmhx: '',
    age: '',
    height: '',
    weight: '',
    ethnicity: '',
    smoker: false,
    alcohol: '',
    otherDrugs: '',
    recentPresentations: ''
  });

  const gemini = new GeminiService();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (e) {
        console.error('Failed to fetch settings', e);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdateSettings = async (newSettings: any) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, ...newSettings }));
      }
    } catch (e) {
      console.error('Failed to update settings', e);
    }
  };

  const handleOpenKeySelector = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    setShowKeyGate(false);
    setIsProMode(true);
  };

  const handleAddFinding = () => {
    if (query.trim() && !findings.includes(query.trim())) {
      setFindings([...findings, query.trim()]);
      setQuery('');
    }
  };

  const handleRemoveFinding = (index: number) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  const handleSearch = async (
    e?: React.FormEvent,
    forceRefresh: boolean = false,
    responses?: ClarifyingResponse[]
  ) => {
    e?.preventDefault();

    if (mode === 'correlation') {
      if (!query.trim()) return;
      setLoading(true);
      setError(null);
      try {
        if (isProMode) {
          // @ts-ignore
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            setShowKeyGate(true);
            setLoading(false);
            return;
          }
        }
        const result = await gemini.getClinicalCorrelation(
          query,
          'advanced clinical diagnostics',
          isProMode,
          forceRefresh
        );
        setCorrelation(result);
      } catch (err: any) {
        setError('Analysis failed. Please try a common medical sign.');
      } finally {
        setLoading(false);
      }
    } else {
      const currentFindings = findings.length > 0 ? findings : query.trim() ? [query.trim()] : [];
      if (currentFindings.length === 0) return;

      setLoading(true);
      setError(null);
      try {
        const result = await gemini.synthesizeDifferentials(
          currentFindings,
          patientContext,
          isProMode,
          forceRefresh,
          responses
        );
        setSynthesis(result);
        setIsRefined(!!responses);
        if (query.trim() && !findings.includes(query.trim())) {
          setFindings([...findings, query.trim()]);
          setQuery('');
        }
        // Clear questions when a new synthesis is generated
        if (!responses) {
          setClarifyingQuestions([]);
          setClarifyingResponses([]);
        }
      } catch (err: any) {
        setError('Synthesis failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGenerateClarifyingQuestions = async () => {
    if (!synthesis) return;
    setIsGeneratingQuestions(true);
    setError(null);
    try {
      const currentFindings = findings;
      const currentDifferentials = synthesis.differentials.map((d) => d.condition);
      const questions = await gemini.getClarifyingQuestions(
        currentFindings,
        currentDifferentials,
        patientContext
      );
      setClarifyingQuestions(questions);
      setClarifyingResponses(questions.map((q) => ({ questionId: q.id, response: '' })));
    } catch (err: any) {
      setError('Failed to generate clarifying questions.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleResponseChange = (questionId: string, value: string) => {
    setClarifyingResponses((prev) =>
      prev.map((r) => (r.questionId === questionId ? { ...r, response: value } : r))
    );
  };

  const handleSubmitResponses = () => {
    handleSearch(undefined, true, clarifyingResponses);
  };

  if (showKeyGate) {
    return (
      <div className="max-w-xl mx-auto py-20 px-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8 p-10 bg-slate-900 rounded-[50px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Lock className="w-24 h-24 rotate-12 text-blue-500" />
          </div>
          <div className="relative z-10 text-left">
            <div className="w-20 h-20 bg-blue-600 rounded-[28px] flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/40">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
              Advanced Visual Synthesis
            </h2>
            <p className="text-sm text-slate-400 mb-10 font-medium leading-relaxed">
              Pathophysiological diagrams, cardiac loops, and anatomical visuals require a
              professional API tier with Imagen 4.0 capabilities.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleOpenKeySelector}
                className="w-full py-5 bg-slate-950/40 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-950/20 transition-all shadow-xl"
              >
                Connect Pro Pipeline <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="https://ai.google.dev/gemini-api/docs/billing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                <CreditCard className="w-3.5 h-3.5" /> Billing Console
              </a>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setShowKeyGate(false);
            setIsProMode(false);
          }}
          className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-400 transition-colors tracking-widest"
        >
          Stay in Standard Knowledge Mode
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-10 animate-in slide-in-from-bottom-6 duration-700 pb-40">
      <header className="mb-16 flex items-start justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`p-4 ${mode === 'correlation' ? 'bg-rose-600' : 'bg-indigo-600'} text-white rounded-[24px] shadow-2xl transition-colors`}
            >
              {mode === 'correlation' ? (
                <Zap className="w-7 h-7" />
              ) : (
                <Stethoscope className="w-7 h-7" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-none mb-1">
                {mode === 'correlation' ? 'Correlation Matrix' : 'Differential Synthesis'}
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                {mode === 'correlation'
                  ? 'Fellowship-Grade Pathophysiology'
                  : 'Multi-Finding Diagnostic Reasoning'}
              </p>
            </div>
          </div>

          <div className="flex bg-slate-900/40 p-1.5 rounded-2xl mb-8 w-fit border border-white/5">
            <button
              onClick={() => {
                setMode('correlation');
                setCorrelation(null);
                setSynthesis(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${mode === 'correlation' ? 'bg-rose-600 text-white shadow-sm border border-rose-500/20' : 'text-slate-400 hover:text-slate-300'}`}
            >
              <Zap className="w-4 h-4" /> Sign Correlation
            </button>
            <button
              onClick={() => {
                setMode('synthesis');
                setCorrelation(null);
                setSynthesis(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${mode === 'synthesis' ? 'bg-indigo-600 text-white shadow-sm border border-indigo-500/20' : 'text-slate-400 hover:text-slate-300'}`}
            >
              <BrainCircuit className="w-4 h-4" /> Differential Synthesis
            </button>
          </div>

          <p className="text-base text-slate-400 font-semibold leading-[1.8]">
            {mode === 'correlation'
              ? 'Input a medical sign to initiate deep reasoning across anatomical, circulatory, and functional domains.'
              : 'Enter a range of clinical findings to generate a prioritized differential diagnosis list with likelihood ratios.'}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${showSettings ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800 hover:text-white'}`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-[20px] border border-white/5 shadow-sm">
              <span
                className={`text-[9px] font-black uppercase tracking-widest ${isProMode ? 'text-blue-400' : 'text-slate-400'}`}
              >
                MedEx Pro
              </span>
              <button
                onClick={() => setIsProMode(!isProMode)}
                className={`transition-all duration-300 hover:scale-110 cursor-pointer ${isProMode ? 'text-blue-500' : 'text-slate-400'}`}
              >
                {isProMode ? <ToggleRight className="w-7 h-7" /> : <Toggle className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {showSettings && (
            <div className="absolute top-24 right-10 z-50 w-72 bg-slate-900 rounded-[32px] border border-white/5 shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-300">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">
                Managed Database Settings
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400">
                    Sync Strategy
                  </label>
                  <select
                    value={settings.sync_mode}
                    onChange={(e) => handleUpdateSettings({ sync_mode: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-[11px] font-bold outline-none text-slate-200"
                  >
                    <option value="automatic">Automatic (Interval)</option>
                    <option value="manual">Manual Only</option>
                    <option value="none">Cache Only (Offline)</option>
                  </select>
                </div>
                {settings.sync_mode === 'automatic' && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400">
                      Update Interval (Hours)
                    </label>
                    <input
                      type="number"
                      value={settings.update_interval_hours}
                      onChange={(e) =>
                        handleUpdateSettings({ update_interval_hours: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-[11px] font-bold outline-none text-slate-200"
                    />
                  </div>
                )}
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[8px] text-slate-400 font-medium leading-relaxed">
                    All downloaded data is stored in a managed SQLite database in the root directory
                    to reduce latency and API costs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isProMode && (
            <span className="flex items-center gap-2 text-[8px] font-black text-blue-400 uppercase tracking-widest animate-pulse">
              <Sparkles className="w-3 h-3" /> Synthesis Active
            </span>
          )}
        </div>
      </header>

      <div className="mb-16">
        {mode === 'synthesis' && (
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setShowContext(!showContext)}
              className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-400 transition-colors tracking-widest mb-4 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              Patient Context (Optional)
              {showContext ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>

            {showContext && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-slate-900/60 rounded-[32px] border border-white/5 animate-in slide-in-from-top-4 duration-300">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <User className="w-3 h-3" /> Age
                  </label>
                  <input
                    type="text"
                    value={patientContext.age}
                    onChange={(e) => setPatientContext({ ...patientContext, age: e.target.value })}
                    placeholder="e.g. 65"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <Scale className="w-3 h-3" /> Height / Weight
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={patientContext.height}
                      onChange={(e) =>
                        setPatientContext({ ...patientContext, height: e.target.value })
                      }
                      placeholder="H (cm)"
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 text-slate-100"
                    />
                    <input
                      type="text"
                      value={patientContext.weight}
                      onChange={(e) =>
                        setPatientContext({ ...patientContext, weight: e.target.value })
                      }
                      placeholder="W (kg)"
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 text-slate-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <Globe className="w-3 h-3" /> Ethnicity
                  </label>
                  <input
                    type="text"
                    value={patientContext.ethnicity}
                    onChange={(e) =>
                      setPatientContext({ ...patientContext, ethnicity: e.target.value })
                    }
                    placeholder="e.g. Caucasian"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 text-slate-100"
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-3 space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <History className="w-3 h-3" /> Past Medical History (PMHx)
                  </label>
                  <textarea
                    value={patientContext.pmhx}
                    onChange={(e) => setPatientContext({ ...patientContext, pmhx: e.target.value })}
                    placeholder="e.g. T2DM, Hypertension, Previous MI..."
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 h-20 resize-none text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <Cigarette className="w-3 h-3" /> Smoker
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPatientContext({ ...patientContext, smoker: true })}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all cursor-pointer ${patientContext.smoker ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-950 text-slate-400 border-white/5'}`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setPatientContext({ ...patientContext, smoker: false })}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase border transition-all cursor-pointer ${!patientContext.smoker ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-950 text-slate-400 border-white/5'}`}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <Wine className="w-3 h-3" /> Alcohol (ETOH)
                  </label>
                  <input
                    type="text"
                    value={patientContext.alcohol}
                    onChange={(e) =>
                      setPatientContext({ ...patientContext, alcohol: e.target.value })
                    }
                    placeholder="e.g. 14 units/week"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <Pill className="w-3 h-3" /> Other Drugs
                  </label>
                  <input
                    type="text"
                    value={patientContext.otherDrugs}
                    onChange={(e) =>
                      setPatientContext({ ...patientContext, otherDrugs: e.target.value })
                    }
                    placeholder="e.g. Recreational use"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 text-slate-100"
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-3 space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <Clock className="w-3 h-3" /> Recent Presentations
                  </label>
                  <input
                    type="text"
                    value={patientContext.recentPresentations}
                    onChange={(e) =>
                      setPatientContext({ ...patientContext, recentPresentations: e.target.value })
                    }
                    placeholder="e.g. Similar episode 2 weeks ago, resolved spontaneously"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-indigo-500 text-slate-100"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'synthesis' && findings.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {(findings || []).map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-950/40 text-indigo-400 rounded-xl border border-indigo-500/20 text-[11px] font-black uppercase"
              >
                {f}
                <button
                  onClick={() => handleRemoveFinding(i)}
                  className="hover:text-indigo-300 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSearch} className="relative group">
          <Search
            className={`absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-450 group-focus-within:${mode === 'correlation' ? 'text-rose-455' : 'text-indigo-455'} transition-all pointer-events-none`}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === 'correlation'
                ? "e.g. Corrigan's Pulse, Kussmaul Sign..."
                : 'Add finding (e.g. Clubbing, Splenomegaly)...'
            }
            className={`w-full pl-20 pr-44 py-8 bg-slate-900 border-2 border-white/5 rounded-[40px] text-lg font-bold text-slate-100 focus:ring-8 focus:ring-${mode === 'correlation' ? 'rose' : 'indigo'}-500/5 focus:border-${mode === 'correlation' ? 'rose' : 'indigo'}-500 transition-all outline-none`}
          />
          <div className="absolute right-4 top-4 bottom-4 flex gap-2">
            {mode === 'synthesis' && (
              <button
                type="button"
                onClick={handleAddFinding}
                className="px-6 bg-slate-950 border border-white/5 text-slate-400 rounded-[28px] text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
            <button
              type="submit"
              disabled={loading || (mode === 'synthesis' && findings.length === 0 && !query.trim())}
              className={`px-10 ${mode === 'correlation' ? 'bg-rose-600' : 'bg-indigo-600'} text-white rounded-[28px] text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 shadow-lg cursor-pointer`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === 'correlation' ? (
                'Map Mechanisms'
              ) : (
                'Synthesize'
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-8 bg-red-950/40 border-2 border-red-500/20 rounded-[32px] text-red-400 text-[12px] font-black uppercase tracking-widest flex items-center gap-4 animate-in shake duration-500">
          <AlertTriangle className="w-6 h-6" />
          {error}
        </div>
      )}

      {loading && !correlation && !synthesis && (
        <div className="flex flex-col items-center justify-center py-24 space-y-6">
          <div className="relative">
            <div className={`w-20 h-20 border-4 border-rose-955 rounded-full`}></div>
            <div
              className={`w-20 h-20 border-4 border-rose-600 border-t-transparent rounded-full animate-spin absolute top-0`}
            ></div>
            <Activity className="w-8 h-8 text-rose-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] mb-2">
              Neural Mapping Phase
            </p>
            <p className="text-[9px] font-bold text-slate-400 italic">
              Synthesizing multi-modal medical diagrams...
            </p>
          </div>
        </div>
      )}

      {correlation && mode === 'correlation' && (
        <CorrelationTab
          correlation={correlation}
          loading={loading}
          isProMode={isProMode}
          handleSearch={handleSearch}
          setCorrelation={setCorrelation}
          setQuery={setQuery}
          setEnlargedImage={setEnlargedImage}
          onNavigateToGlossary={onNavigateToGlossary}
        />
      )}

      {synthesis && mode === 'synthesis' && (
        <SynthesisTab
          synthesis={synthesis}
          loading={loading}
          isRefined={isRefined}
          isProMode={isProMode}
          clarifyingQuestions={clarifyingQuestions}
          clarifyingResponses={clarifyingResponses}
          isGeneratingQuestions={isGeneratingQuestions}
          findings={findings}
          patientContext={patientContext}
          handleSearch={handleSearch}
          handleGenerateClarifyingQuestions={handleGenerateClarifyingQuestions}
          handleResponseChange={handleResponseChange}
          handleSubmitResponses={handleSubmitResponses}
          setSynthesis={setSynthesis}
          setFindings={setFindings}
          setQuery={setQuery}
          setClarifyingQuestions={setClarifyingQuestions}
          setClarifyingResponses={setClarifyingResponses}
          setPatientContext={setPatientContext}
          setShowContext={setShowContext}
          onNavigateToInvestigations={onNavigateToInvestigations}
        />
      )}

      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
};

export default ClinicalCorrelationView;
