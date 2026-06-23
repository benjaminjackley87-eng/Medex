import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  AlertCircle,
  X,
  ShieldCheck,
  Activity,
  Lightbulb,
  ImageIcon,
  Play,
  CheckCircle2
} from 'lucide-react';
import { ExamStep } from '../../types';
import { SystemStyle } from '../../theme';
import MedImage from '../../components/common/MedImage';
import GlossaryLink from '../../components/common/GlossaryLink';
import ExamStepVisual from './ExamStepVisual';

interface ExamStepCardProps {
  step: ExamStep;
  globalIndex: number;
  isChecked: boolean;
  isEditMode?: boolean;
  theme: SystemStyle;
  updateStepField: (id: string, field: keyof ExamStep, value: ExamStep[keyof ExamStep]) => void;
  setCheckedSteps: React.Dispatch<React.SetStateAction<Set<string>>>;
  moveStep: (index: number, direction: 'up' | 'down') => void;
  removeStep: (id: string) => void;
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
}

export const ExamStepCard: React.FC<ExamStepCardProps> = ({
  step,
  globalIndex,
  isChecked,
  isEditMode,
  theme,
  updateStepField,
  setCheckedSteps,
  moveStep,
  removeStep,
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
  setNewPearlText
}) => {
  return (
    <div
      className={`group bg-slate-900/50 border border-white/5 p-6 rounded-3xl transition-all duration-500 ${
        isChecked
          ? 'ring-2 ring-emerald-500/50 bg-emerald-950/10'
          : 'hover:border-white/10 hover:bg-slate-900/60 hover:-translate-y-0.5'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Toggle Button */}
        <button
          onClick={() =>
            setCheckedSteps((p) => {
              const n = new Set(p);
              if (n.has(step.id)) n.delete(step.id);
              else n.add(step.id);
              return n;
            })
          }
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer ${
            isChecked
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20'
              : 'bg-slate-950 border-white/5 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400'
          }`}
        >
          <CheckCircle2
            className={`w-5 h-5 transition-transform duration-500 ${isChecked ? 'scale-100' : 'scale-0'}`}
          />
        </button>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase">
                Step {(globalIndex + 1).toString().padStart(2, '0')}
              </span>
              {isEditMode && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveStep(globalIndex, 'up')}
                    className="p-1 text-slate-655 hover:text-indigo-400"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveStep(globalIndex, 'down')}
                    className="p-1 text-slate-655 hover:text-indigo-400"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            {isEditMode && (
              <button
                onClick={() => removeStep(step.id)}
                className="p-1.5 text-slate-400 hover:text-rose-450 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {isEditMode ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                  Step Title
                </label>
                <input
                  value={step.title}
                  onChange={(e) => updateStepField(step.id, 'title', e.target.value)}
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs font-black outline-none focus:border-indigo-500 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                  Step Description
                </label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStepField(step.id, 'description', e.target.value)}
                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-300 outline-none focus:border-indigo-500 min-h-[80px]"
                />
              </div>
              <div className="mt-4">
                <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-2">
                  Step Visual Reference
                </p>
                <MedImage
                  src={
                    !step.localImageUrl
                      ? step.imageUrl || '/assets/placeholders/exam-step.svg'
                      : undefined
                  }
                  localId={step.localImageUrl}
                  alt={step.title}
                  label="Step Visual"
                  fallbackIcon={theme.icon}
                  onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                  isEditMode={isEditMode}
                  config={step.imageConfig || { size: 'md', position: 'right' }}
                  onUpdateConfig={(cfg) => updateStepField(step.id, 'imageConfig', cfg)}
                  onDelete={() => {
                    updateStepField(step.id, 'localImageUrl', undefined);
                    updateStepField(step.id, 'imageUrl', undefined);
                  }}
                  onUpload={() => handleImageUpload(step.id)}
                  onGenerate={() => handleImageGenerate(step.id)}
                  onReacquire={() => handleImageGenerate(step.id)}
                />
              </div>

              {/* Findings Editor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Positive Findings */}
                <div className="bg-rose-950/15 p-4 rounded-2xl border border-rose-500/10">
                  <h5 className="text-[9px] font-black uppercase text-rose-400 tracking-wider mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> Positive Findings
                    </span>
                  </h5>
                  <div className="space-y-2 mb-3">
                    {(step.positiveFindings || []).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          value={f.description}
                          onChange={(e) => {
                            const list = [...(step.positiveFindings || [])];
                            list[i] = { ...list[i], description: e.target.value };
                            updateStepField(step.id, 'positiveFindings', list);
                          }}
                          className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-indigo-500 text-white"
                        />
                        <button
                          onClick={() => {
                            const list = (step.positiveFindings || []).filter(
                              (_, idx) => idx !== i
                            );
                            updateStepField(step.id, 'positiveFindings', list);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-450 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      placeholder="Add positive finding..."
                      value={newFindingText[step.id] || ''}
                      onChange={(e) =>
                        setNewFindingText((prev) => ({ ...prev, [step.id]: e.target.value }))
                      }
                      className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-[10px] outline-none focus:border-indigo-500 text-white"
                    />
                    <button
                      onClick={() => {
                        if (newFindingText[step.id]?.trim()) {
                          const list = [...(step.positiveFindings || [])];
                          list.push({ description: newFindingText[step.id].trim() });
                          updateStepField(step.id, 'positiveFindings', list);
                          setNewFindingText((prev) => ({ ...prev, [step.id]: '' }));
                        }
                      }}
                      className="px-3 py-2 bg-rose-900 hover:bg-rose-850 text-rose-200 rounded-xl text-[9px] font-black uppercase tracking-wider"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Normal Findings */}
                <div className="bg-emerald-950/15 p-4 rounded-2xl border border-emerald-500/10">
                  <h5 className="text-[9px] font-black uppercase text-emerald-450 tracking-wider mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Normal Findings
                    </span>
                  </h5>
                  <div className="space-y-2 mb-3">
                    {(step.negativeFindings || []).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          value={f}
                          onChange={(e) => {
                            const list = [...(step.negativeFindings || [])];
                            list[i] = e.target.value;
                            updateStepField(step.id, 'negativeFindings', list);
                          }}
                          className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-indigo-500 text-white"
                        />
                        <button
                          onClick={() => {
                            const list = (step.negativeFindings || []).filter(
                              (_, idx) => idx !== i
                            );
                            updateStepField(step.id, 'negativeFindings', list);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-450 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      placeholder="Add normal finding..."
                      value={newNormalText[step.id] || ''}
                      onChange={(e) =>
                        setNewNormalText((prev) => ({ ...prev, [step.id]: e.target.value }))
                      }
                      className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-[10px] outline-none focus:border-indigo-500 text-white"
                    />
                    <button
                      onClick={() => {
                        if (newNormalText[step.id]?.trim()) {
                          const list = [...(step.negativeFindings || [])];
                          list.push(newNormalText[step.id].trim());
                          updateStepField(step.id, 'negativeFindings', list);
                          setNewNormalText((prev) => ({ ...prev, [step.id]: '' }));
                        }
                      }}
                      className="px-3 py-2 bg-emerald-900 hover:bg-emerald-850 text-emerald-250 rounded-xl text-[9px] font-black uppercase tracking-wider"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={`flex flex-col md:flex-row gap-6`}>
                {/* Inline step-level visual guide */}
                <div className="shrink-0">
                  <ExamStepVisual
                    stepName={step.title}
                    stepNumber={globalIndex + 1}
                    category={step.category}
                    imageUrl={step.imageUrl}
                    localImageUrl={step.localImageUrl}
                    onGenerate={() => handleImageGenerate(step.id)}
                    onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                    compact={true}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[12px] font-bold text-slate-400 leading-relaxed mb-4">
                    {onNavigateToGlossary ? (
                      <GlossaryLink text={step.description} onNavigate={onNavigateToGlossary} />
                    ) : (
                      step.description
                    )}
                  </p>
                </div>
              </div>

              {((step.positiveFindings && step.positiveFindings.length > 0) ||
                (step.negativeFindings && step.negativeFindings.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {step.positiveFindings && step.positiveFindings.length > 0 && (
                    <div className="bg-rose-950/10 p-4 rounded-2xl border border-rose-500/10">
                      <h5 className="text-[9px] font-black uppercase text-rose-455 tracking-wider mb-2.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Positive Findings
                      </h5>
                      <ul className="space-y-1.5">
                        {step.positiveFindings.map((f, i) => (
                          <li key={i} className="text-xs font-bold text-slate-300 flex items-start">
                            <button
                              onClick={() => fetchClinicalCorrelation(f.description)}
                              className="text-left hover:text-rose-400 hover:underline flex items-start gap-2 cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-950/200 mt-1.5 shrink-0" />
                              <span>{f.description}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {step.negativeFindings && step.negativeFindings.length > 0 && (
                    <div className="bg-emerald-950/10 p-4 rounded-2xl border border-emerald-500/10">
                      <h5 className="text-[9px] font-black uppercase text-emerald-455 tracking-wider mb-2.5 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Normal Findings
                      </h5>
                      <ul className="space-y-1.5">
                        {step.negativeFindings.map((f, i) => (
                          <li
                            key={i}
                            className="text-xs font-bold text-slate-350 flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-555 mt-1.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {Array.isArray(step.pathophysiology) && step.pathophysiology.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-[9px] font-black uppercase text-indigo-400 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Pathophysiology
                  </h5>
                  <div className="space-y-2">
                    {step.pathophysiology.map((patho, i) => (
                      <div
                        key={i}
                        className="bg-indigo-950/10 p-4 rounded-2xl border border-indigo-500/10"
                      >
                        <span className="text-xs font-black text-indigo-350 block mb-1">
                          {patho.finding}
                        </span>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed">
                          {patho.mechanism}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step.clinicalPearls && step.clinicalPearls.length > 0 && (
                <div className="bg-amber-955/10 p-4 rounded-2xl border border-amber-500/10 mt-4">
                  <h5 className="text-[9px] font-black uppercase text-amber-455 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> Clinical Pearls
                  </h5>
                  <ul className="space-y-1.5">
                    {step.clinicalPearls.map((pearl, i) => (
                      <li
                        key={i}
                        className="text-xs font-bold text-amber-300/90 flex items-start gap-2 leading-relaxed"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-950/200 mt-1.5 shrink-0" />
                        <span>{pearl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
