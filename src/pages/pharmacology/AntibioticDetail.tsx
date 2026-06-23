import React from 'react';
import { ChevronRight, ShieldCheck, ShieldAlert, Bug, Info, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { AntibioticInfo } from '../../types';

interface AntibioticDetailProps {
  abxInfo: AntibioticInfo;
  resetView: () => void;
}

export const AntibioticDetail: React.FC<AntibioticDetailProps> = ({ abxInfo, resetView }) => {
  return (
    <motion.div
      key="abx-result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <button
        onClick={resetView}
        className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Categories
      </button>
      {/* Abx Header */}
      <div className="bg-slate-900 p-10 rounded-[48px] border border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">{abxInfo.name}</h2>
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">
              {abxInfo.class}
            </p>
          </div>
          <div
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 ${
              abxInfo.mechanism === 'Bactericidal'
                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
            }`}
          >
            {abxInfo.mechanism === 'Bactericidal' ? (
              <ShieldCheck className="w-4 h-4" />
            ) : (
              <ShieldAlert className="w-4 h-4" />
            )}
            {abxInfo.mechanism}
          </div>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed italic mb-6">
          {abxInfo.spectrum}
        </p>

        {abxInfo.stewardshipNote && (
          <div className="bg-rose-950/20 border border-rose-500/10 rounded-2xl p-6 flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-black uppercase text-rose-400 tracking-widest mb-1">
                Antimicrobial Stewardship Note
              </h4>
              <p className="text-rose-250 font-bold text-sm leading-relaxed">
                {abxInfo.stewardshipNote}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Coverage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 p-8 rounded-[40px] border border-white/5">
          <h3 className="text-[11px] font-black uppercase text-slate-450 mb-6 tracking-widest flex items-center gap-2">
            <Bug className="w-4 h-4" /> Gram-Positive Coverage
          </h3>
          <p className="text-slate-300 font-medium leading-relaxed">
            {abxInfo.gramPositiveCoverage}
          </p>
        </div>
        <div className="bg-slate-900/40 p-8 rounded-[40px] border border-white/5">
          <h3 className="text-[11px] font-black uppercase text-slate-450 mb-6 tracking-widest flex items-center gap-2">
            <Bug className="w-4 h-4" /> Gram-Negative Coverage
          </h3>
          <p className="text-slate-300 font-medium leading-relaxed">
            {abxInfo.gramNegativeCoverage}
          </p>
        </div>
        <div className="bg-indigo-950/20 p-8 rounded-[40px] border border-indigo-500/15">
          <h3 className="text-[11px] font-black uppercase text-indigo-400 mb-6 tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4" /> Atypical Coverage
          </h3>
          <p className="text-slate-300 font-medium leading-relaxed">
            {abxInfo.atypicalCoverage}
          </p>
        </div>
        <div className="bg-amber-950/20 p-8 rounded-[40px] border border-amber-500/15">
          <h3 className="text-[11px] font-black uppercase text-amber-400 mb-6 tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4" /> Anaerobic Coverage
          </h3>
          <p className="text-slate-300 font-medium leading-relaxed">
            {abxInfo.anaerobicCoverage}
          </p>
        </div>
      </div>

      {/* Indications */}
      <div className="bg-slate-900 p-8 rounded-[40px] border border-white/5 shadow-sm">
        <h3 className="text-[11px] font-black uppercase text-slate-455 mb-6 tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4" /> Common Clinical Indications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {abxInfo.commonIndications.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-slate-950/40 border border-white/5 rounded-2xl text-slate-300 font-medium"
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
