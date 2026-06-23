import React from 'react';
import {
  Sparkles,
  Clock,
  Globe,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  BrainCircuit,
  MessageSquarePlus,
  Loader2,
  CheckCircle2,
  ListRestart,
  BookOpen,
  Plus,
  X,
  Microscope,
  ArrowRight,
  History
} from 'lucide-react';
import {
  DifferentialSynthesis,
  ClarifyingQuestion,
  ClarifyingResponse,
  PatientContext,
  DifferentialItem
} from '../../types';

interface SynthesisTabProps {
  synthesis: DifferentialSynthesis;
  loading: boolean;
  isRefined: boolean;
  isProMode: boolean;
  clarifyingQuestions: ClarifyingQuestion[];
  clarifyingResponses: ClarifyingResponse[];
  isGeneratingQuestions: boolean;
  findings: string[];
  patientContext: PatientContext;
  handleSearch: (
    e?: React.FormEvent,
    forceRefresh?: boolean,
    responses?: ClarifyingResponse[]
  ) => Promise<void>;
  handleGenerateClarifyingQuestions: () => Promise<void>;
  handleResponseChange: (questionId: string, value: string) => void;
  handleSubmitResponses: () => void;
  setSynthesis: (synthesis: DifferentialSynthesis | null) => void;
  setFindings: (findings: string[]) => void;
  setQuery: (query: string) => void;
  setClarifyingQuestions: (questions: ClarifyingQuestion[]) => void;
  setClarifyingResponses: (responses: ClarifyingResponse[]) => void;
  setPatientContext: (ctx: PatientContext) => void;
  setShowContext: (show: boolean) => void;
  onNavigateToInvestigations?: (query: string) => void;
}

export const SynthesisTab: React.FC<SynthesisTabProps> = ({
  synthesis,
  loading,
  isRefined,
  isProMode,
  clarifyingQuestions,
  clarifyingResponses,
  isGeneratingQuestions,
  findings,
  patientContext,
  handleSearch,
  handleGenerateClarifyingQuestions,
  handleResponseChange,
  handleSubmitResponses,
  setSynthesis,
  setFindings,
  setQuery,
  setClarifyingQuestions,
  setClarifyingResponses,
  setPatientContext,
  setShowContext,
  onNavigateToInvestigations
}) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-1000">
      {/* Synthesis Summary & Regional Context */}
      <div className="space-y-6">
        {synthesis.summary && synthesis.summary !== 'No summary provided.' && (
          <div className="bg-indigo-950/20 border border-indigo-950/30 p-8 rounded-[40px] relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Synthesis Summary
                {isRefined && (
                  <span className="ml-2 px-2 py-0.5 bg-indigo-600 text-white rounded text-[8px] font-black uppercase tracking-widest">
                    Refined
                  </span>
                )}
              </h3>
              {synthesis.retrievedAt && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-100/50 text-indigo-500 rounded-lg text-[8px] font-black uppercase tracking-widest border border-indigo-200/50">
                  <Clock className="w-2.5 h-2.5" />
                  Cached: {new Date(synthesis.retrievedAt).toLocaleString()}
                </div>
              )}
            </div>
            <p className="text-lg text-slate-300 font-medium leading-relaxed italic">
              {synthesis.summary}
            </p>
          </div>
        )}

        {synthesis.tnqContext &&
          synthesis.tnqContext !==
            'No specific regional context identified for this presentation.' && (
            <div className="bg-emerald-950/20 border border-emerald-950/30 p-8 rounded-[40px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Tropical North Queensland (TNQ) Considerations
                </h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-emerald-200">
                  Regional Context
                </span>
              </div>
              <p className="text-sm text-slate-350 font-medium leading-relaxed">
                {synthesis.tnqContext}
              </p>
            </div>
          )}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Critical Differentials */}
        {synthesis.differentials.filter((d) => d.isCritical).length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-rose-600" />
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Critical Differentials (Must Not Miss)
                </h2>
              </div>
              <button
                onClick={() => handleSearch(undefined, true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Force Refresh
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {synthesis.differentials
                .filter((d) => d.isCritical)
                .map((diff, i) => (
                  <DifferentialCard
                    key={i}
                    diff={diff}
                    isCritical
                    onNavigateToInvestigations={onNavigateToInvestigations}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Top Differentials */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Top Differential Diagnoses
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {synthesis.differentials
              .filter((d) => !d.isCritical)
              .map((diff, i) => (
                <DifferentialCard
                  key={i}
                  diff={diff}
                  onNavigateToInvestigations={onNavigateToInvestigations}
                />
              ))}
          </div>
        </section>
      </div>

      {/* Narrowing Differential Section */}
      {synthesis.differentials.length > 0 && (
        <div className="pt-12 border-t border-white/5">
          {!clarifyingQuestions.length && !isGeneratingQuestions ? (
            <div className="bg-indigo-900 rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <BrainCircuit className="w-32 h-32 text-indigo-400" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                  Narrow Differential
                </h3>
                <p className="text-indigo-200 text-sm font-medium mb-8 max-w-lg mx-auto leading-relaxed">
                  Generate high-yield clarifying questions to differentiate between the top
                  conditions and refine the diagnostic synthesis.
                </p>
                <button
                  onClick={handleGenerateClarifyingQuestions}
                  className="px-10 py-5 bg-slate-950/40 text-indigo-900 rounded-[24px] text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-950/20 transition-all mx-auto shadow-xl"
                >
                  <MessageSquarePlus className="w-5 h-5" /> Generate Clarifying Questions
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/40 border-2 border-indigo-950/30 rounded-[60px] p-12 shadow-2xl shadow-indigo-950/40">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquarePlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      Clarifying Assessment
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Targeted History & Physical Exam
                    </p>
                  </div>
                </div>
                {isGeneratingQuestions && (
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                )}
              </div>

              {clarifyingQuestions.length > 0 && (
                <div className="space-y-10">
                  {clarifyingQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="space-y-4 animate-in slide-in-from-left-4 duration-500"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-950/20 text-indigo-600 text-xs font-black shrink-0 mt-1">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-300 mb-2">{q.question}</h4>
                          <p className="text-[10px] text-slate-400 font-medium italic mb-4">
                            Rationale: {q.rationale}
                          </p>

                          {q.type === 'boolean' && (
                            <div className="flex gap-3">
                              {['Yes', 'No', 'Unknown'].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleResponseChange(q.id, option)}
                                  className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${clarifyingResponses.find((r) => r.questionId === q.id)?.response === option ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-indigo-300'}`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}

                          {q.type === 'choice' && q.options && (
                            <div className="flex flex-wrap gap-3">
                              {q.options.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleResponseChange(q.id, option)}
                                  className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${clarifyingResponses.find((r) => r.questionId === q.id)?.response === option ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-indigo-300'}`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}

                          {q.type === 'text' && (
                            <input
                              type="text"
                              value={
                                clarifyingResponses.find((r) => r.questionId === q.id)?.response ||
                                ''
                              }
                              onChange={(e) => handleResponseChange(q.id, e.target.value)}
                              placeholder="Enter clinical finding..."
                              className="w-full bg-slate-950/20 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-8 border-t border-white/5 flex justify-end">
                    <button
                      onClick={handleSubmitResponses}
                      disabled={loading || clarifyingResponses.some((r) => !r.response)}
                      className="px-12 py-5 bg-indigo-600 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                      Refine Synthesis
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {synthesis.differentials.length === 0 && (
        <div className="p-20 text-center bg-slate-950/20 rounded-[60px] border-2 border-dashed border-white/5">
          <div className="w-20 h-20 bg-slate-950/40 rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertCircle className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">
            No Differentials Synthesized
          </h3>
          <p className="text-sm text-slate-400 font-medium mt-2">
            Try adding more specific clinical findings or context.
          </p>
        </div>
      )}

      <div className="p-10 text-center flex justify-center gap-4">
        <button
          onClick={() => {
            setSynthesis(null);
            setFindings([]);
            setQuery('');
            setClarifyingQuestions([]);
            setClarifyingResponses([]);
            setPatientContext({
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
            setShowContext(false);
          }}
          className="px-10 py-4 bg-slate-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl"
        >
          <ListRestart className="w-4 h-4" /> New Synthesis
        </button>
      </div>
    </div>
  );
};

const DifferentialCard: React.FC<{
  diff: DifferentialItem;
  isCritical?: boolean;
  onNavigateToInvestigations?: (query: string) => void;
}> = ({ diff, isCritical, onNavigateToInvestigations }) => (
  <div
    className={`bg-slate-950/40 p-8 rounded-[40px] border-2 ${isCritical ? 'border-rose-950/30 shadow-rose-950/40' : 'border-white/5 shadow-slate-950/40'} shadow-2xl relative overflow-hidden group`}
  >
    <div
      className={`absolute top-0 left-0 w-2 h-full ${isCritical ? 'bg-rose-600' : 'bg-indigo-600'}`}
    />

    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-black text-white tracking-tight">{diff.condition}</h3>
          {isCritical && (
            <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-rose-200">
              Critical
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> Likelihood:{' '}
            <span className="text-white">{diff.likelihood}</span>
          </span>
          {diff.scientificReference && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> {diff.scientificReference}
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="mb-8 p-6 bg-slate-950/20/50 rounded-3xl border border-white/5 italic text-sm text-slate-400 leading-relaxed">
      {diff.reasoning}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <section>
          <h5 className="text-[10px] font-black uppercase text-emerald-600 mb-4 tracking-widest flex items-center gap-2">
            <Plus className="w-3 h-3" /> Supporting Findings
          </h5>
          <ul className="space-y-2">
            {(diff.supportingFindings || []).map((f: string, i: number) => (
              <li key={i} className="text-[12px] text-slate-400 font-medium flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h5 className="text-[10px] font-black uppercase text-rose-600 mb-4 tracking-widest flex items-center gap-2">
            <X className="w-3 h-3" /> Conflicting Findings
          </h5>
          <ul className="space-y-2">
            {(diff.conflictingFindings || []).map((f: string, i: number) => (
              <li key={i} className="text-[12px] text-slate-400 font-medium flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="space-y-8 bg-slate-950/20 p-8 rounded-[32px] border border-white/5">
        <section>
          <h5 className="text-[10px] font-black uppercase text-indigo-600 mb-4 tracking-widest flex items-center gap-2">
            <Microscope className="w-3 h-3" /> Investigations
          </h5>
          <ul className="space-y-2">
            {(diff.investigations || []).map((f: string, i: number) => (
              <li key={i} className="text-[12px] text-slate-350 font-bold flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-indigo-400 shrink-0" />
                <button
                  onClick={() => onNavigateToInvestigations?.(f)}
                  className="text-left hover:text-indigo-600 hover:underline transition-all"
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h5 className="text-[10px] font-black uppercase text-indigo-600 mb-4 tracking-widest flex items-center gap-2">
            <History className="w-3 h-3" /> Differentiation Questions
          </h5>
          <ul className="space-y-2">
            {(diff.differentiationQuestions || []).map((f: string, i: number) => (
              <li key={i} className="text-[12px] text-slate-350 font-bold flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-indigo-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  </div>
);
