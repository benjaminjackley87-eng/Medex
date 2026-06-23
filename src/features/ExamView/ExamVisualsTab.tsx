import React from 'react';
import { Camera, ChevronRight } from 'lucide-react';
import { Examination } from '../../types';
import { ExamStepVisual } from './ExamStepVisual';

interface ExamVisualsTabProps {
  exam: Examination;
  setEnlargedImage: (img: { src: string; alt: string } | null) => void;
  handleImageGenerate?: (stepId: string | 'header') => Promise<void>;
}

/**
 * ExamVisualsTab Component
 * Renders a sequential illustrated storyboard of every examination step.
 * Each "frame" shows: step number badge, visual placeholder or real image,
 * step name, category label, and key description.
 *
 * When no image is available, ExamStepVisual renders a stylised placeholder
 * with a "Generate Visual" CTA that integrates with handleImageGenerate.
 */
export const ExamVisualsTab: React.FC<ExamVisualsTabProps> = ({
  exam,
  setEnlargedImage,
  handleImageGenerate
}) => {
  const steps = exam.steps || [];

  if (steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Camera className="w-8 h-8 text-slate-350" />
        </div>
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
          No Steps Found
        </h3>
        <p className="text-xs text-slate-400 font-medium max-w-xs">
          Add examination steps first — they will automatically appear here as a visual storyboard.
        </p>
      </div>
    );
  }

  // Group steps by category to render section dividers in the storyboard
  const grouped = steps.reduce<Record<string, typeof steps>>((acc, step) => {
    const cat = step.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(step);
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
      {Object.entries(grouped).map(([category, catSteps]) => (
        <section key={category}>
          {/* Category Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-6 rounded-full bg-indigo-950/200" />
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">
              {category}
            </h3>
            <div className="flex-1 h-px bg-slate-950/40/5" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              {catSteps.length} step{catSteps.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Storyboard Grid — 3 columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {catSteps.map((step, idx) => {
              // Derive 1-based global step index
              const globalIdx = steps.findIndex((s) => s.id === step.id) + 1;
              return (
                <div
                  key={step.id}
                  className="group bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:bg-slate-900/80 transition-all duration-300"
                >
                  {/* Visual Area */}
                  <div className="relative">
                    <ExamStepVisual
                      stepName={step.title}
                      stepNumber={globalIdx}
                      category={step.category}
                      imageUrl={step.imageUrl}
                      localImageUrl={step.localImageUrl}
                      onGenerate={
                        handleImageGenerate ? () => handleImageGenerate(step.id) : undefined
                      }
                      onEnlarge={
                        setEnlargedImage ? (src, alt) => setEnlargedImage({ src, alt }) : undefined
                      }
                      compact={false}
                    />

                    {/* Step number badge overlay (top-left) */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-slate-950/80 backdrop-blur-sm border border-white/10 rounded-lg">
                      <span className="text-[9px] font-black text-slate-400 tracking-wider">
                        STEP {String(globalIdx).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Step Info Footer */}
                  <div className="p-4">
                    <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">
                      {step.category || 'General'}
                    </p>
                    <h4 className="text-sm font-black text-white mb-1.5 group-hover:text-indigo-300 transition-colors leading-tight">
                      {step.title}
                    </h4>
                    {step.description && (
                      <p className="text-[11px] font-medium text-slate-400 leading-relaxed line-clamp-2">
                        {step.description}
                      </p>
                    )}

                    {/* Findings summary chips */}
                    {((step.positiveFindings?.length ?? 0) > 0 ||
                      (step.negativeFindings?.length ?? 0) > 0) && (
                      <div className="flex items-center gap-2 mt-3">
                        {(step.positiveFindings?.length ?? 0) > 0 && (
                          <span className="px-2 py-0.5 bg-rose-950/40 border border-rose-500/20 rounded-md text-[9px] font-black text-rose-400 uppercase tracking-wider">
                            {step.positiveFindings!.length} Finding
                            {step.positiveFindings!.length !== 1 ? 's' : ''}
                          </span>
                        )}
                        {(step.negativeFindings?.length ?? 0) > 0 && (
                          <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/20 rounded-md text-[9px] font-black text-emerald-400 uppercase tracking-wider">
                            {step.negativeFindings!.length} Normal
                          </span>
                        )}
                        {(step.clinicalPearls?.length ?? 0) > 0 && (
                          <span className="px-2 py-0.5 bg-amber-950/40 border border-amber-500/20 rounded-md text-[9px] font-black text-amber-400 uppercase tracking-wider">
                            {step.clinicalPearls!.length} Pearl
                            {step.clinicalPearls!.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flow connector between categories */}
          {Object.keys(grouped).indexOf(category) < Object.keys(grouped).length - 1 && (
            <div className="flex items-center justify-center mt-10">
              <div className="flex items-center gap-2 text-slate-350">
                <div className="w-8 h-px bg-slate-950/40/5" />
                <ChevronRight className="w-4 h-4" />
                <div className="w-8 h-px bg-slate-950/40/5" />
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};
