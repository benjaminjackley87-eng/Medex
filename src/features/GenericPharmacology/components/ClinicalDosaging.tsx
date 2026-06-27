import React from 'react';
import { motion } from 'motion/react';
import { Thermometer, Info, Baby } from 'lucide-react';
import { DrugInfo } from '../../../types';

interface ClinicalDosagingProps {
  drug: DrugInfo;
}

export const ClinicalDosaging: React.FC<ClinicalDosagingProps> = ({ drug }) => {
  return (
    <section className="bg-slate-950/40 border-2 border-white/5 rounded-[56px] p-12 shadow-md relative overflow-hidden">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-5">
          <div className="bg-rose-100 p-4 rounded-[24px]">
            <Thermometer className="w-10 h-10 text-rose-600" />
          </div>
          <h3 className="text-4xl font-black text-white tracking-tighter">
            Clinical Dosaging
          </h3>
        </div>
      </div>

      <div className="space-y-10">
        {(drug.dosages || []).map((dose, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            className="bg-slate-950/20 border border-white/5 rounded-[40px] p-10 relative group"
          >
            <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em]">
                  Indication
                </span>
                <h4 className="text-2xl font-black text-white group-hover:text-indigo-600 transition-colors">
                  {dose.indication}
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-950/40 px-5 py-2.5 rounded-2xl border border-white/5 text-xs font-black text-slate-400 shadow-sm">
                  {dose.route}
                </span>
                <span className="bg-slate-950/40 px-5 py-2.5 rounded-2xl border border-white/5 text-xs font-black text-slate-400 shadow-sm">
                  {dose.frequency}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 shadow-sm">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-3">
                  Adult Dosage
                </span>
                <p className="text-white font-black text-lg leading-relaxed">
                  {dose.adultDose}
                </p>
              </div>
              {dose.paediatricDose && (
                <div className="bg-cyan-50 border border-cyan-100 rounded-3xl p-6 shadow-sm">
                  <span className="text-[10px] font-black uppercase text-cyan-600 tracking-[0.2em] block mb-3">
                    Paediatric Dosage
                  </span>
                  <p className="text-cyan-900 font-black text-lg leading-relaxed">
                    {dose.paediatricDose}
                  </p>
                </div>
              )}
            </div>

            {dose.notes && (
              <div className="mt-8 pt-8 border-t border-white/5/60 flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-base text-slate-400 font-bold leading-relaxed italic">
                  {dose.notes}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {drug.paediatricDosages && (
        <div className="mt-12 bg-indigo-950/20 border-2 border-indigo-950/30 rounded-[40px] p-10 flex items-start gap-8 shadow-inner">
          <div className="bg-slate-950/40 p-4 rounded-3xl shadow-md">
            <Baby className="w-10 h-10 text-indigo-600 shrink-0" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em] mb-4">
              QLD Health Paediatric Notes
            </h4>
            <p className="text-indigo-900 text-lg font-bold leading-relaxed whitespace-pre-wrap">
              {drug.paediatricDosages}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
