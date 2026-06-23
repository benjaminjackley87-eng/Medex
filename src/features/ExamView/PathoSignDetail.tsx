import React from 'react';
import { X } from 'lucide-react';
import { ClinicalCorrelation } from '../../types';

interface PathoSignDetailProps {
  selectedPathoSign: string;
  setSelectedPathoSign: (sign: string | null) => void;
  loadingPathoData: boolean;
  pathoSignData: ClinicalCorrelation | null;
}

export const PathoSignDetail: React.FC<PathoSignDetailProps> = ({
  selectedPathoSign,
  setSelectedPathoSign,
  loadingPathoData,
  pathoSignData
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest">
          {selectedPathoSign}
        </h3>
        <button
          onClick={() => setSelectedPathoSign(null)}
          className="p-1 hover:bg-slate-950/40/5 rounded-lg text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {loadingPathoData ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
          <span className="text-[9px] font-black uppercase text-slate-400">
            Querying Diagnostics...
          </span>
        </div>
      ) : pathoSignData ? (
        <div className="space-y-6 text-slate-300">
          <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-5">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 block mb-2">
              Pathophysiology
            </span>
            <p className="text-xs font-bold leading-relaxed">{pathoSignData.pathophysiology}</p>
          </div>

          <div className="space-y-3">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
              Common Causes
            </span>
            <ul className="space-y-2">
              {pathoSignData.causes.map((cause, i) => (
                <li
                  key={i}
                  className="bg-slate-950/40/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-950/200" />
                  {cause}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/40/5 border border-white/5 rounded-2xl p-5">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              Clinical Significance
            </span>
            <p className="text-xs font-semibold leading-relaxed">
              {pathoSignData.clinicalSignificance}
            </p>
          </div>

          {pathoSignData.affectedAnatomy && (
            <div className="bg-indigo-950/20 border border-indigo-500/10 rounded-2xl p-5">
              <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400 block mb-2">
                Anatomical Focus
              </span>
              <p className="text-xs font-bold leading-relaxed">
                {pathoSignData.affectedAnatomy}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">
          Failed to retrieve clinical correlation.
        </p>
      )}
    </div>
  );
};
