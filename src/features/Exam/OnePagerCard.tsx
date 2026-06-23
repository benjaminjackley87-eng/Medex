import React from 'react';
import { Edit3, Plus, X } from 'lucide-react';
import { Examination } from '../../types';

interface OnePagerCardProps {
  exam: Examination;
  isEditMode: boolean;
  updateGeneralField: (field: keyof Examination, value: Examination[keyof Examination]) => void;
}

const OnePagerCard: React.FC<OnePagerCardProps> = ({ exam, isEditMode, updateGeneralField }) => {
  return (
    <div className="animate-in slide-in-from-bottom-6 duration-700">
      <div className="p-12 bg-slate-950/20 border border-white/5 rounded-[60px]">
        <div className="flex items-center justify-between mb-10">
          <div className="flex-1" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest text-center">
            🧾 {exam.name} One-Pager (Printable)
          </h3>
          <div className="flex-1 flex justify-end">
            {isEditMode && (
              <button
                onClick={() => {
                  const basics = prompt('Basics:', exam.onePager?.basics);
                  const goldenRules = prompt('Golden Rules:', exam.onePager?.goldenRules);
                  if (basics && goldenRules) {
                    updateGeneralField('onePager', {
                      ...(exam.onePager || { normalValues: [], redFlags: [] }),
                      basics,
                      goldenRules
                    });
                  }
                }}
                className="p-2 bg-amber-100 text-amber-400 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-[10px] font-black uppercase"
              >
                <Edit3 className="w-4 h-4" /> Edit One-Pager
              </button>
            )}
          </div>
        </div>
        {exam.onePager ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase mb-4">The Basics</p>
              <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
                {exam.onePager.basics}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase">Normal Findings</p>
                {isEditMode && (
                  <button
                    onClick={() => {
                      const val = prompt('Add normal finding:');
                      if (val)
                        updateGeneralField('onePager', {
                          ...exam.onePager!,
                          normalValues: [...exam.onePager!.normalValues, val]
                        });
                    }}
                    className="text-amber-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
              <ul className="text-[11px] font-bold text-slate-400 space-y-1">
                {(exam.onePager?.normalValues || []).map((v, i) => (
                  <li key={i} className="flex items-center justify-between group/v">
                    {v}
                    {isEditMode && (
                      <button
                        onClick={() =>
                          updateGeneralField('onePager', {
                            ...exam.onePager!,
                            normalValues: (exam.onePager?.normalValues || []).filter(
                              (_, idx) => idx !== i
                            )
                          })
                        }
                        className="opacity-0 group-hover/v:opacity-100 text-red-400"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase">Red Flags</p>
                {isEditMode && (
                  <button
                    onClick={() => {
                      const val = prompt('Add red flag:');
                      if (val)
                        updateGeneralField('onePager', {
                          ...exam.onePager!,
                          redFlags: [...exam.onePager!.redFlags, val]
                        });
                    }}
                    className="text-amber-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
              <ul className="text-[11px] font-bold text-rose-600 space-y-1">
                {(exam.onePager?.redFlags || []).map((f, i) => (
                  <li key={i} className="flex items-center justify-between group/f">
                    {f}
                    {isEditMode && (
                      <button
                        onClick={() =>
                          updateGeneralField('onePager', {
                            ...exam.onePager!,
                            redFlags: (exam.onePager?.redFlags || []).filter((_, idx) => idx !== i)
                          })
                        }
                        className="opacity-0 group-hover/f:opacity-100 text-red-400"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
              <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
                {exam.onePager.goldenRules}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-12">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              No one-pager summary synthesized yet.
            </p>
            {isEditMode && (
              <button
                onClick={() =>
                  updateGeneralField('onePager', {
                    basics: '...',
                    normalValues: [],
                    redFlags: [],
                    goldenRules: '...'
                  })
                }
                className="px-6 py-2 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase"
              >
                Initialize One-Pager
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnePagerCard;
