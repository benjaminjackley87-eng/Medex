import React from 'react';
import {
  Zap,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  Layers
} from 'lucide-react';
import { ExamStep, ManeuverType } from '../../types';
import MedImage from '../../components/common/MedImage';
import GlossaryLink from '../../components/GlossaryLink';

interface ExamStepCardProps {
  step: ExamStep;
  globalIndex: number;
  isChecked: boolean;
  isEditMode: boolean;
  isChecklistMode: boolean;
  style: any;
  newFindingText: string;
  onToggleCheck: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdateField: (field: keyof ExamStep, value: any) => void;
  onRemove: () => void;
  onAddFinding: (finding: string) => void;
  onRemoveFinding: (index: number) => void;
  onNewFindingChange: (text: string) => void;
  onFetchCorrelation: (sign: string) => void;
  onEnlargeImage: (src: string, alt: string) => void;
  onImageUpload: () => void;
  onImageGenerate: () => void;
  onNavigateToGlossary?: (term: string) => void;
}

const ExamStepCard: React.FC<ExamStepCardProps> = ({
  step,
  globalIndex,
  isChecked,
  isEditMode,
  isChecklistMode,
  style,
  newFindingText,
  onToggleCheck,
  onMoveUp,
  onMoveDown,
  onUpdateField,
  onRemove,
  onAddFinding,
  onRemoveFinding,
  onNewFindingChange,
  onFetchCorrelation,
  onEnlargeImage,
  onImageUpload,
  onImageGenerate,
  onNavigateToGlossary
}) => {
  const imageCfg = step.imageConfig || { size: 'md', position: 'right' };
  const hasImage = !!(step.imageUrl || step.localImageUrl);

  return (
    <div
      className={`p-8 transition-all flex items-start gap-8 ${isChecked ? 'bg-emerald-950/20/30' : ''} ${isEditMode ? 'hover:bg-amber-950/20/10' : ''}`}
    >
      {isChecklistMode ? (
        <button
          onClick={onToggleCheck}
          className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shrink-0 ${isChecked ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-slate-950/40 border-white/5'}`}
        >
          {isChecked && <CheckCircle2 className="w-6 h-6" />}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          {isEditMode ? (
            <>
              <button
                onClick={onMoveUp}
                className="p-1 hover:bg-slate-900 rounded text-slate-300 hover:text-blue-500"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <div className={`w-3 h-3 rounded-full shrink-0 ${style.secondary} opacity-40`} />
              <button
                onClick={onMoveDown}
                className="p-1 hover:bg-slate-900 rounded text-slate-300 hover:text-blue-500"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className={`w-3 h-3 rounded-full mt-4 shrink-0 ${style.secondary} opacity-40`} />
          )}
        </div>
      )}

      <div className="flex-1">
        <div
          className={`flex flex-col ${imageCfg.position === 'top' ? 'flex-col' : imageCfg.position === 'left' ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row'} gap-10`}
        >
          <div className="flex-1">
            {isEditMode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => onUpdateField('title', e.target.value)}
                      className="w-full bg-amber-950/20 border-b border-amber-300 text-base font-black outline-none focus:ring-1 focus:ring-amber-400 p-1"
                    />
                    <select
                      value={step.maneuverType || ManeuverType.OTHER}
                      onChange={(e) => onUpdateField('maneuverType', e.target.value)}
                      className="text-[9px] font-black uppercase tracking-widest bg-slate-950/40 border border-white/5 rounded px-2 py-1 outline-none"
                    >
                      {Object.values(ManeuverType).map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={onRemove}
                    className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={step.description}
                  onChange={(e) => onUpdateField('description', e.target.value)}
                  className="w-full min-h-[60px] p-3 bg-amber-950/20/30 border border-amber-200 rounded-xl text-[13px] leading-relaxed outline-none focus:ring-1 focus:ring-amber-400"
                />

                <div className="flex items-center gap-3 p-3 bg-slate-950/20 rounded-xl border border-white/5">
                  <ImageIcon className="w-4 h-4 text-slate-400" />
                  <input
                    placeholder="Step Image Prompt (e.g. detailed diagram...)"
                    className="bg-transparent text-[10px] font-bold outline-none flex-1"
                    value={step.imagePrompt || ''}
                    onChange={(e) => onUpdateField('imagePrompt', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  {step.maneuverType && (
                    <span className="px-2 py-0.5 bg-slate-900 text-[8px] font-black uppercase tracking-widest text-slate-400 rounded">
                      {step.maneuverType}
                    </span>
                  )}
                  <h4 className="text-base font-black text-white">{step.title}</h4>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-400 font-medium mb-6">
                  {onNavigateToGlossary ? (
                    <GlossaryLink text={step.description} onNavigate={onNavigateToGlossary} />
                  ) : (
                    step.description
                  )}
                </p>
              </>
            )}

            <div className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-500">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    Pathological Signs
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(step.positiveFindings || []).map((f, i) => (
                    <div key={i} className="flex items-center">
                      <button
                        onClick={() => onFetchCorrelation(f.description)}
                        className="group/sign flex items-center gap-3 px-4 py-2.5 bg-rose-950/20 border border-rose-950/30 rounded-l-2xl hover:bg-rose-600 hover:text-white transition-all text-left"
                      >
                        <Zap className="w-3 h-3 group-hover/sign:text-white" />
                        <span className="text-[10px] font-black uppercase italic leading-none">
                          {f.description}
                        </span>
                      </button>
                      {isEditMode && (
                        <button
                          onClick={() => onRemoveFinding(i)}
                          className="px-2 py-2.5 bg-rose-100 text-rose-600 border border-l-0 border-rose-200 rounded-r-2xl hover:bg-rose-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditMode && (
                    <form
                      className="flex items-center"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newFindingText) {
                          onAddFinding(newFindingText);
                          onNewFindingChange('');
                        }
                      }}
                    >
                      <input
                        className="px-4 py-2 bg-amber-950/20 border border-amber-200 rounded-l-2xl text-[10px] font-bold outline-none w-32 focus:ring-1 focus:ring-amber-400"
                        placeholder="Add sign..."
                        value={newFindingText}
                        onChange={(e) => onNewFindingChange(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="px-3 py-2.5 bg-amber-600 text-white rounded-r-2xl"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {(hasImage || isEditMode) && (
            <div className={`${imageCfg.position === 'top' ? 'w-full' : 'shrink-0'}`}>
              <MedImage
                src={!step.localImageUrl ? step.imageUrl : undefined}
                localId={step.localImageUrl}
                alt={step.title}
                label="Protocol Reference"
                fallbackIcon={<Layers />}
                onEnlarge={onEnlargeImage}
                isEditMode={isEditMode}
                config={imageCfg}
                onUpdateConfig={(cfg) => onUpdateField('imageConfig', cfg)}
                onDelete={() => {
                  onUpdateField('localImageUrl', undefined);
                  onUpdateField('imageUrl', undefined);
                }}
                onUpload={onImageUpload}
                onGenerate={onImageGenerate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamStepCard;
