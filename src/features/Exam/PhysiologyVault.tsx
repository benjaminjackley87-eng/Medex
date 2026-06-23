import React from 'react';
import { BrainCircuit, Layers, Plus, Trash2, X } from 'lucide-react';
import { Examination } from '../../types';

interface PhysiologyVaultProps {
  exam: Examination;
  isEditMode: boolean;
  updateGeneralField: (field: keyof Examination, value: Examination[keyof Examination]) => void;
}

const PhysiologyVault: React.FC<PhysiologyVaultProps> = ({
  exam,
  isEditMode,
  updateGeneralField
}) => {
  return (
    <div className="animate-in slide-in-from-bottom-6 duration-700 space-y-16">
      {/* Physiology Buckets */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
            <BrainCircuit className="w-5 h-5 text-blue-600" />
            🧠 Physiology Buckets
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
              className="p-2 bg-amber-100 text-amber-400 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-[10px] font-black uppercase"
            >
              <Plus className="w-4 h-4" /> Add Bucket
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(exam.physiologyBuckets || []).map((bucket, i) => (
            <div
              key={i}
              className="group relative p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm"
            >
              {isEditMode && (
                <button
                  onClick={() =>
                    updateGeneralField(
                      'physiologyBuckets',
                      exam.physiologyBuckets?.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-4 right-4 p-1.5 bg-slate-950/40 text-slate-400 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <h4
                className={`text-[11px] font-black uppercase tracking-widest mb-6 ${bucket.color || 'text-blue-600'}`}
              >
                {bucket.title}
              </h4>
              <div className="space-y-4">
                {(bucket.content || []).map((item, j) => (
                  <div key={j} className="group/item relative">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400">{item.description}</p>
                    {isEditMode && (
                      <button
                        onClick={() => {
                          const newBuckets = [...(exam.physiologyBuckets || [])];
                          newBuckets[i].content = newBuckets[i].content.filter(
                            (_, idx) => idx !== j
                          );
                          updateGeneralField('physiologyBuckets', newBuckets);
                        }}
                        className="absolute top-0 right-0 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100"
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
                    className="w-full py-2 border border-dashed border-amber-200 rounded-xl text-amber-600 text-[9px] font-black uppercase hover:bg-amber-950/20"
                  >
                    + Add Item
                  </button>
                )}
              </div>
            </div>
          ))}
          {(!exam.physiologyBuckets || (exam.physiologyBuckets || []).length === 0) && (
            <p className="col-span-full text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
              No physiology data synthesized yet.
            </p>
          )}
        </div>
      </section>

      {/* Pattern Recognition */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
            <Layers className="w-5 h-5 text-emerald-600" />
            🧩 Pattern Recognition
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
              className="p-2 bg-amber-100 text-amber-400 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-[10px] font-black uppercase"
            >
              <Plus className="w-4 h-4" /> Add Pattern
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(exam.patternRecognition || []).map((pattern, i) => (
            <div
              key={i}
              className="group relative p-6 bg-slate-950/40 border border-white/5 rounded-3xl shadow-sm"
            >
              {isEditMode && (
                <button
                  onClick={() =>
                    updateGeneralField(
                      'patternRecognition',
                      exam.patternRecognition?.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-4 right-4 p-1.5 bg-slate-950/40 text-slate-400 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <p
                className={`text-[10px] font-black uppercase mb-2 ${pattern.color || 'text-emerald-600'}`}
              >
                {pattern.title}
              </p>
              <p className="text-[12px] font-bold text-white leading-relaxed">
                {pattern.description}
              </p>
            </div>
          ))}
          {(!exam.patternRecognition || (exam.patternRecognition || []).length === 0) && (
            <p className="col-span-full text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
              No pattern recognition data synthesized yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PhysiologyVault;
