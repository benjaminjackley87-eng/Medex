import React from 'react';
import { ImageIcon, Camera, Sparkles } from 'lucide-react';
import MedImage from '../../components/common/MedImage';

interface ExamStepVisualProps {
  /** Step title for display and alt text */
  stepName: string;
  /** Step sequence number (1-based) */
  stepNumber: number;
  /** Exam category or body system — drives the placeholder accent colour */
  category?: string;
  /** Hex/URL of the actual step image, if available */
  imageUrl?: string;
  /** Local IndexedDB key for the step image, if available */
  localImageUrl?: string;
  /** Called when user clicks the "Generate Visual" button */
  onGenerate?: () => void;
  /** Called when user clicks the enlarge icon */
  onEnlarge?: (src: string, alt: string) => void;
  /** Compact mode — used inline on step cards (smaller) */
  compact?: boolean;
}

/**
 * ExamStepVisual Component
 * Renders either a real examination step image (via MedImage) or a stylised
 * illustrated placeholder when no image is available.
 *
 * Design:
 * - Placeholder: dark gradient with step number badge, step name, and optional CTA
 * - Real image: MedImage with enlarge capability
 * - Compact mode: used as a thumbnail within ExamStepCard
 * - Full mode: used in the Visual Storyboard tab (ExamVisualsTab)
 */
export const ExamStepVisual: React.FC<ExamStepVisualProps> = ({
  stepName,
  stepNumber,
  category,
  imageUrl,
  localImageUrl,
  onGenerate,
  onEnlarge,
  compact = false
}) => {
  const hasImage = !!(imageUrl || localImageUrl);

  if (hasImage) {
    return (
      <MedImage
        src={!localImageUrl ? imageUrl : undefined}
        localId={localImageUrl}
        alt={stepName}
        label="Step Visual"
        onEnlarge={onEnlarge ? (src, alt) => onEnlarge(src, alt) : undefined}
        isEditMode={false}
        config={{ size: compact ? 'sm' : 'md', position: 'right' }}
      />
    );
  }

  /* ─── Placeholder ─── */
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-white/5
        bg-linear-to-br from-slate-800/80 to-slate-900/80
        flex flex-col items-center justify-center group
        ${compact ? 'w-28 h-20 shrink-0' : 'w-full aspect-video'}
      `}
    >
      {/* Subtle animated shimmer */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

      {/* Step number badge */}
      <div
        className={`
          font-black text-slate-400 tracking-wider select-none
          ${compact ? 'text-[28px] leading-none mb-1' : 'text-[64px] leading-none mb-3'}
        `}
      >
        {String(stepNumber).padStart(2, '0')}
      </div>

      {!compact && (
        <>
          {/* Step name */}
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4 mb-4 line-clamp-2">
            {stepName}
          </p>

          {/* Generate CTA */}
          {onGenerate && (
            <button
              onClick={onGenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/20 hover:border-indigo-400/40 rounded-xl text-[9px] font-black text-indigo-300 uppercase tracking-widest transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              Generate Visual
            </button>
          )}
        </>
      )}

      {compact && <Camera className="w-3.5 h-3.5 text-slate-400 mt-0.5" />}
    </div>
  );
};

export default ExamStepVisual;
