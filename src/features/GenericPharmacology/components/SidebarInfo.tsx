import React from 'react';
import { BookOpen, ShieldAlert, Info } from 'lucide-react';
import { DrugInfo } from '../../../types';

interface SidebarInfoProps {
  drug: DrugInfo;
}

export const SidebarInfo: React.FC<SidebarInfoProps> = ({ drug }) => {
  return (
    <div className="space-y-8">
      {/* Indications */}
      <section className="bg-slate-950/40 border border-white/5 rounded-[48px] p-8 shadow-sm overflow-hidden group">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
          <BookOpen className="w-5 h-5" /> Main Indications
        </h3>
        <ul className="space-y-5">
          {(drug.indications || []).map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2.5 shrink-0 shadow-sm shadow-indigo-950/40" />
              <span className="text-slate-300 text-base font-bold leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contraindications - Bold Red */}
      <section className="bg-rose-950/20 border-2 border-rose-950/30 rounded-[48px] p-8 shadow-md overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
          <ShieldAlert className="w-24 h-24" />
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-rose-500 mb-8 flex items-center gap-3 relative z-10">
          <ShieldAlert className="w-5 h-5" /> CRITICAL CONTRAINDICATIONS
        </h3>
        <ul className="space-y-5 relative z-10">
          {(drug.contraindications || []).map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 bg-slate-950/40/40 p-4 rounded-2xl border border-rose-200/50"
            >
              <div className="w-2 h-2 rounded-full bg-rose-950/200 mt-2.5 shrink-0" />
              <span className="text-rose-900 text-base font-black leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Adverse Effects */}
      <section className="bg-slate-950/40 border border-white/5 rounded-[48px] p-8 shadow-sm overflow-hidden">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
          <Info className="w-5 h-5" /> ADVERSE REACTION PROFILE
        </h3>
        <ul className="space-y-5">
          {(drug.adverseEffects || []).map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-slate-200 mt-2.5 shrink-0" />
              <span className="text-slate-400 text-base font-bold leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-indigo-900 rounded-[40px] p-10 border border-indigo-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent" />
        <p className="text-xs text-indigo-200 leading-relaxed text-center font-black uppercase tracking-widest relative z-10">
          Educational Resource Only. Verify all dosing against current Queensland Health
          medication charts and local protocols.
        </p>
      </div>
    </div>
  );
};
