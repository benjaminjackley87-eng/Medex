import React from 'react';
import { BrainCircuit, Plus, Trash2, X, Layers, Zap } from 'lucide-react';
import { Examination } from '../../types';

interface ExamPhysiologyTabProps {
  exam: Examination;
  isEditMode?: boolean;
  updateGeneralField: (field: keyof Examination, value: Examination[keyof Examination]) => void;
}

/**
 * ExamPhysiologyTab Component
 * Displays physiology buckets and pattern recognition data for an exam.
 * Dark-themed to match the WorkspaceLayout. Each bucket card has a coloured
 * left-border accent for quick visual differentiation.
 */
export const ExamPhysiologyTab: React.FC<ExamPhysiologyTabProps> = ({
  exam,
  isEditMode,
  updateGeneralField
}) => {
  // Colour accent per bucket index — cycles through a palette
  const BUCKET_ACCENTS = [
    { border: 'border-l-blue-500', label: 'text-blue-400', bg: 'bg-blue-950/20' },
    { border: 'border-l-emerald-500', label: 'text-emerald-400', bg: 'bg-emerald-950/20' },
    { border: 'border-l-rose-500', label: 'text-rose-400', bg: 'bg-rose-950/20' },
    { border: 'border-l-amber-500', label: 'text-amber-400', bg: 'bg-amber-950/20' },
    { border: 'border-l-violet-500', label: 'text-violet-400', bg: 'bg-violet-950/20' },
    { border: 'border-l-cyan-500', label: 'text-cyan-400', bg: 'bg-cyan-950/20' }
  ];

  return (
    <div className="animate-in slide-in-from-bottom-6 duration-700 space-y-16">
      {/* ── Physiology Buckets ── */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest flex items-center gap-3">
            <BrainCircuit className="w-5 h-5 text-blue-400" />
            Physiology Buckets
          </h3>
          {isEditMode && (
            <button
              onClick={() => {
                const title = prompt('Bucket Title:');
                if (title)
                  updateGeneralField('physiologyBuckets', [
                    ...(exam.physiologyBuckets || []),
                    { title, content: [] }
                  ]);
              }}
              className="p-2 bg-indigo-950/60 border border-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-900 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" /> Add Bucket
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(exam.physiologyBuckets || []).map((bucket, i) => {
            const accent = BUCKET_ACCENTS[i % BUCKET_ACCENTS.length];
            return (
              <div
                key={i}
                className={`group relative p-6 bg-slate-900 border border-white/5 border-l-4 ${accent.border} rounded-[24px] shadow-sm transition-all hover:bg-slate-900/80`}
              >
                {isEditMode && (
                  <button
                    onClick={() =>
                      updateGeneralField(
                        'physiologyBuckets',
                        exam.physiologyBuckets?.filter((_, idx) => idx !== i)
                      )
                    }
                    className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <h4
                  className={`text-[11px] font-black uppercase tracking-widest mb-5 ${bucket.color || accent.label}`}
                >
                  {bucket.title}
                </h4>
                <div className="space-y-3">
                  {(bucket.content || []).map((item, j) => (
                    <div
                      key={j}
                      className={`group/item relative p-3 ${accent.bg} rounded-xl border border-white/5`}
                    >
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="text-[11px] font-medium text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                      {isEditMode && (
                        <button
                          onClick={() => {
                            const newBuckets = [...(exam.physiologyBuckets || [])];
                            newBuckets[i].content = newBuckets[i].content.filter(
                              (_, idx) => idx !== j
                            );
                            updateGeneralField('physiologyBuckets', newBuckets);
                          }}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-400 opacity-0 group-hover/item:opacity-100 transition-all"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditMode && (
                    <button
                      onClick={() => {
                        const label = prompt('Label:');
                        const description = prompt('Description:');
                        if (label && description) {
                          const newBuckets = [...(exam.physiologyBuckets || [])];
                          newBuckets[i].content.push({ label, description });
                          updateGeneralField('physiologyBuckets', newBuckets);
                        }
                      }}
                      className="w-full py-2 border border-dashed border-white/10 rounded-xl text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 text-[9px] font-black uppercase tracking-wider transition-all"
                    >
                      + Add Item
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {(!exam.physiologyBuckets || exam.physiologyBuckets.length === 0) && (
            <p className="col-span-full text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
              No physiology data synthesized yet.
            </p>
          )}
        </div>
      </section>

      {/* ── Pattern Recognition ── */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest flex items-center gap-3">
            <Layers className="w-5 h-5 text-emerald-400" />
            Pattern Recognition
          </h3>
          {isEditMode && (
            <button
              onClick={() => {
                const title = prompt('Pattern Title:');
                const description = prompt('Description:');
                if (title && description)
                  updateGeneralField('patternRecognition', [
                    ...(exam.patternRecognition || []),
                    { title, description }
                  ]);
              }}
              className="p-2 bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" /> Add Pattern
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(exam.patternRecognition || []).map((pattern, i) => (
            <div
              key={i}
              className="group relative p-5 bg-slate-900 border border-white/5 rounded-2xl shadow-sm hover:border-white/10 transition-all"
            >
              {isEditMode && (
                <button
                  onClick={() =>
                    updateGeneralField(
                      'patternRecognition',
                      exam.patternRecognition?.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <p
                  className={`text-[10px] font-black uppercase tracking-widest ${pattern.color || 'text-emerald-400'}`}
                >
                  {pattern.title}
                </p>
              </div>
              <p className="text-[12px] font-bold text-slate-300 leading-relaxed">
                {pattern.description}
              </p>
            </div>
          ))}

          {(!exam.patternRecognition || exam.patternRecognition.length === 0) && (
            <p className="col-span-full text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
              No pattern recognition data synthesized yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
