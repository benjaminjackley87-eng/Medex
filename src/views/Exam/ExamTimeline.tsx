import React from 'react';
import { Plus, Layers } from 'lucide-react';
import { ExamStep, ManeuverType } from '../../types';
import ExamStepCard from './ExamStepCard';

interface ExamTimelineProps {
  categorizedSteps: Record<string, { steps: ExamStep[]; indices: number[] }>;
  style: any;
  isEditMode: boolean;
  isChecklistMode: boolean;
  checkedSteps: Set<string>;
  onToggleCheck: (stepId: string) => void;
  updateStepField: (stepId: string, field: keyof ExamStep, value: any) => void;
  addStep: (category: string) => void;
  removeStep: (stepId: string) => void;
  moveStep: (index: number, direction: 'up' | 'down') => void;
  addFinding: (stepId: string, description: string) => void;
  removeFinding: (stepId: string, findingIndex: number) => void;
  newFindingText: Record<string, string>;
  setNewFindingText: (val: Record<string, string>) => void;
  onFetchCorrelation: (sign: string) => void;
  onEnlargeImage: (src: string, alt: string) => void;
  handleImageUpload: (stepId: string) => void;
  handleImageGenerate: (stepId: string) => void;
  onNavigateToGlossary?: (term: string) => void;
}

const ExamTimeline: React.FC<ExamTimelineProps> = ({
  categorizedSteps,
  style,
  isEditMode,
  isChecklistMode,
  checkedSteps,
  onToggleCheck,
  updateStepField,
  addStep,
  removeStep,
  moveStep,
  addFinding,
  removeFinding,
  newFindingText,
  setNewFindingText,
  onFetchCorrelation,
  onEnlargeImage,
  handleImageUpload,
  handleImageGenerate,
  onNavigateToGlossary
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Sticky Table of Contents */}
      <div className="hidden lg:block sticky top-24 w-64 shrink-0">
        <div className="p-6 bg-slate-950/20 rounded-[32px] border border-white/5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
            <Layers className="w-3 h-3" /> Navigation
          </h4>
          <nav className="space-y-1">
            {Object.keys(categorizedSteps).map((category) => (
              <button
                key={category}
                onClick={() => {
                  const id = `category-${category.replace(/\s+/g, '-').toLowerCase()}`;
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-slate-950/40 hover:shadow-sm rounded-xl transition-all"
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 space-y-12 w-full">
        {Object.entries(categorizedSteps).map(([category, groupData], catIdx) => {
          const group = groupData as { steps: ExamStep[]; indices: number[] };
          const categoryId = `category-${category.replace(/\s+/g, '-').toLowerCase()}`;
          return (
            <div
              id={categoryId}
              key={category}
              className="animate-in fade-in scroll-mt-32"
              style={{ animationDelay: `${catIdx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-8 rounded-full ${style.secondary}`} />
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                    {isEditMode ? (
                      <input
                        className="bg-amber-950/20 border-b-2 border-amber-300 focus:ring-0 outline-none p-1 rounded min-w-[240px]"
                        value={category}
                        onChange={(e) => {
                          const newCat = e.target.value;
                          group.steps.forEach((s) => updateStepField(s.id, 'category', newCat));
                        }}
                      />
                    ) : (
                      category
                    )}
                  </h3>
                </div>
                {isEditMode && (
                  <button
                    onClick={() => addStep(category)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Plus className="w-4 h-4" /> Add Protocol Step
                  </button>
                )}
              </div>

              <div className="bg-slate-950/40 rounded-[40px] border border-white/5 shadow-sm overflow-hidden divide-y divide-slate-50">
                {group.steps.map((step, sIdx) => (
                  <ExamStepCard
                    key={step.id}
                    step={step}
                    globalIndex={group.indices[sIdx]}
                    isChecked={checkedSteps.has(step.id)}
                    isEditMode={isEditMode}
                    isChecklistMode={isChecklistMode}
                    style={style}
                    newFindingText={newFindingText[step.id] || ''}
                    onToggleCheck={() => onToggleCheck(step.id)}
                    onMoveUp={() => moveStep(group.indices[sIdx], 'up')}
                    onMoveDown={() => moveStep(group.indices[sIdx], 'down')}
                    onUpdateField={(field, val) => updateStepField(step.id, field, val)}
                    onRemove={() => removeStep(step.id)}
                    onAddFinding={(finding) => addFinding(step.id, finding)}
                    onRemoveFinding={(idx) => removeFinding(step.id, idx)}
                    onNewFindingChange={(text) =>
                      setNewFindingText({ ...newFindingText, [step.id]: text })
                    }
                    onFetchCorrelation={onFetchCorrelation}
                    onEnlargeImage={onEnlargeImage}
                    onImageUpload={() => handleImageUpload(step.id)}
                    onImageGenerate={() => handleImageGenerate(step.id)}
                    onNavigateToGlossary={onNavigateToGlossary}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {isEditMode && (
          <button
            onClick={() => addStep('New Section')}
            className="w-full py-10 border-2 border-dashed border-amber-200 rounded-[40px] text-amber-600 font-black uppercase text-[12px] tracking-widest hover:bg-amber-950/20 transition-all flex flex-col items-center gap-3"
          >
            <Plus className="w-8 h-8" /> Add New Examination Section
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamTimeline;
