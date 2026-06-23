import React from 'react';
import { Plus, Sparkles, Send, RotateCcw, RefreshCw } from 'lucide-react';
import { Examination, ExamStep } from '../../types';
import { ExamStepCard } from './ExamStepCard';

interface ExamStepsTabProps {
  exam: Examination;
  theme: any;
  isEditMode?: boolean;
  progress: number;
  checkedSteps: Set<string>;
  setCheckedSteps: React.Dispatch<React.SetStateAction<Set<string>>>;
  categorizedSteps: Record<string, { steps: ExamStep[]; indices: number[] }>;
  refinementPrompt: string;
  setRefinementPrompt: (val: string) => void;
  isRefining: boolean;
  showUndo: boolean;
  handleRefine: () => Promise<void>;
  handleUndoRefine: () => void;
  addStep: (cat: string) => void;
  removeStep: (id: string) => void;
  moveStep: (index: number, direction: 'up' | 'down') => void;
  updateStepField: (id: string, field: keyof ExamStep, value: any) => void;
  updateGeneralField: (field: keyof Examination, value: any) => void;
  handleImageUpload: (stepId: string | 'header') => Promise<void>;
  handleImageGenerate: (stepId: string | 'header') => Promise<void>;
  setEnlargedImage: (img: { src: string; alt: string } | null) => void;
  fetchClinicalCorrelation: (sign: string) => Promise<void>;
  onNavigateToGlossary?: (term: string) => void;
  newFindingText: Record<string, string>;
  setNewFindingText: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  newNormalText: Record<string, string>;
  setNewNormalText: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  newPathoFinding: Record<string, string>;
  setNewPathoFinding: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  newPathoMechanism: Record<string, string>;
  setNewPathoMechanism: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  newPearlText: Record<string, string>;
  setNewPearlText: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  hideAside?: boolean;
}

/**
 * ExamStepsTab Component
 * Renders the checklist of examination steps grouped by category.
 * Includes a collapsible sidebar for navigation, progress tracking, and AI refinement.
 * Fully dark-themed to match WorkspaceLayout.
 */
export const ExamStepsTab: React.FC<ExamStepsTabProps> = ({
  exam,
  theme,
  isEditMode,
  progress,
  checkedSteps,
  setCheckedSteps,
  categorizedSteps,
  refinementPrompt,
  setRefinementPrompt,
  isRefining,
  showUndo,
  handleRefine,
  handleUndoRefine,
  addStep,
  removeStep,
  moveStep,
  updateStepField,
  updateGeneralField,
  handleImageUpload,
  handleImageGenerate,
  setEnlargedImage,
  fetchClinicalCorrelation,
  onNavigateToGlossary,
  newFindingText,
  setNewFindingText,
  newNormalText,
  setNewNormalText,
  newPathoFinding,
  setNewPathoFinding,
  newPathoMechanism,
  setNewPathoMechanism,
  newPearlText,
  setNewPearlText,
  hideAside
}) => {
  return (
    <div className={hideAside ? 'space-y-16' : 'flex flex-col lg:flex-row gap-12'}>
      {/* ── Sidebar Navigation (Column aside) ── */}
      {!hideAside && (
        <aside className="lg:w-56 shrink-0">
          <div className="sticky top-40 space-y-6">
            {/* Category Quick-Nav */}
            <div>
              <p className="text-[9px] font-black text-slate-400 tracking-[0.3em] mb-3 uppercase">
                Navigation
              </p>
              <div className="space-y-1">
                {Object.keys(categorizedSteps).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      const el = document.getElementById(`cat-${cat}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/60 text-left group transition-all"
                  >
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors">
                      {cat}
                    </span>
                    <span className="text-[9px] font-black text-slate-400 group-hover:text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-white/5 transition-colors">
                      {categorizedSteps[cat].steps.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Refinement Panel (Edit Mode) */}
            {isEditMode && (
              <div className="space-y-4">
                <button
                  onClick={() => addStep('General')}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-slate-400 hover:border-indigo-500/40 hover:text-indigo-400 hover:bg-indigo-950/10 transition-all flex flex-col items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Add Step</span>
                </button>

                {/* AI Refinement Box */}
                <div className="p-5 bg-indigo-950/30 rounded-2xl border border-indigo-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">
                      AI Refinement
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-indigo-300/60 mb-4 leading-relaxed">
                    Request specific updates or more detail for any section.
                  </p>
                  <div className="relative">
                    <textarea
                      value={refinementPrompt}
                      onChange={(e) => setRefinementPrompt(e.target.value)}
                      placeholder="e.g. Add more detail to the auscultation section..."
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3 text-[11px] font-medium text-slate-300 outline-none focus:border-indigo-500/50 min-h-[80px] resize-none placeholder:text-slate-400"
                      disabled={isRefining}
                    />
                    <button
                      onClick={handleRefine}
                      disabled={isRefining || !refinementPrompt.trim()}
                      className={`absolute bottom-2 right-2 p-2 rounded-lg transition-all ${
                        isRefining || !refinementPrompt.trim()
                          ? 'bg-slate-900 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-950/200 cursor-pointer'
                      }`}
                    >
                      {isRefining ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {showUndo && (
                    <button
                      onClick={handleUndoRefine}
                      className="mt-3 w-full py-2 bg-amber-950/40 border border-amber-500/20 text-amber-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-950/60 transition-all animate-in fade-in slide-in-from-top-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Undo AI Refinement
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* OSCE Progress Card */}
            <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
              <p className="text-[9px] font-black text-slate-400 tracking-[0.3em] mb-4 uppercase">
                OSCE Progress
              </p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-black text-white">{progress}%</span>
                <span className="text-[10px] font-bold text-slate-400">
                  {checkedSteps.size}/{exam.steps.length}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-950/40/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-950/200 transition-all duration-1000 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* ── Main Steps Feed ── */}
      <div className={hideAside ? 'space-y-16' : 'flex-1 space-y-16'}>
        {Object.entries(categorizedSteps).map(([category, groupData]) => {
          const group = groupData as { steps: ExamStep[]; indices: number[] };
          return (
            <section key={category} id={`cat-${category}`} className="scroll-mt-40">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {/* Coloured accent bar */}
                  <div className={`w-1.5 h-8 rounded-full ${theme.secondary}`} />
                  <h3 className="text-xl font-black text-slate-100 tracking-tight uppercase">
                    {category}
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                {group.steps.map((step, sIdx) => {
                  const globalIndex = group.indices[sIdx];
                  const isChecked = checkedSteps.has(step.id);
                  return (
                    <ExamStepCard
                      key={step.id}
                      step={step}
                      globalIndex={globalIndex}
                      isChecked={isChecked}
                      isEditMode={isEditMode}
                      theme={theme}
                      updateStepField={updateStepField}
                      setCheckedSteps={setCheckedSteps}
                      moveStep={moveStep}
                      removeStep={removeStep}
                      handleImageUpload={handleImageUpload}
                      handleImageGenerate={handleImageGenerate}
                      setEnlargedImage={setEnlargedImage}
                      fetchClinicalCorrelation={fetchClinicalCorrelation}
                      onNavigateToGlossary={onNavigateToGlossary}
                      newFindingText={newFindingText}
                      setNewFindingText={setNewFindingText}
                      newNormalText={newNormalText}
                      setNewNormalText={setNewNormalText}
                      newPathoFinding={newPathoFinding}
                      setNewPathoFinding={setNewPathoFinding}
                      newPathoMechanism={newPathoMechanism}
                      setNewPathoMechanism={setNewPathoMechanism}
                      newPearlText={newPearlText}
                      setNewPearlText={setNewPearlText}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
