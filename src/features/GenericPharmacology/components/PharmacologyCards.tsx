import React from 'react';
import { FlaskConical, Beaker, Zap } from 'lucide-react';
import { DrugInfo } from '../../../types';

interface PharmacologyCardsProps {
  drug: DrugInfo;
}

export const PharmacologyCards: React.FC<PharmacologyCardsProps> = ({ drug }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-slate-950/40 border-2 border-white/5 rounded-[48px] p-10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-950/20 rounded-bl-[80px] -mr-8 -mt-8 -z-0 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-amber-100 p-3 rounded-2xl">
                <FlaskConical className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Pharmacokinetics
              </h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium whitespace-pre-wrap">
              {drug.pharmacokinetics}
            </p>
          </div>
        </section>

        <section className="bg-slate-950/40 border-2 border-white/5 rounded-[48px] p-10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-950/20 rounded-bl-[80px] -mr-8 -mt-8 -z-0 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Beaker className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Pharmacodynamics
              </h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium whitespace-pre-wrap">
              {drug.pharmacodynamics}
            </p>
          </div>
        </section>
      </div>

      <section className="bg-slate-950/40 border-2 border-white/5 rounded-[48px] p-10 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-950/20 rounded-bl-[120px] -mr-12 -mt-12 -z-0 transition-transform group-hover:scale-110" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-100 p-3 rounded-2xl">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight">
              Mechanism of Action
            </h3>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed font-medium whitespace-pre-wrap">
            {drug.mechanismOfAction}
          </p>
        </div>
      </section>
    </>
  );
};
