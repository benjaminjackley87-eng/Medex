import React from 'react';
import { PhysiologyBucket } from '../../types';

interface PhysiologyDetailProps {
  bucket: PhysiologyBucket | undefined;
}

export const PhysiologyDetail: React.FC<PhysiologyDetailProps> = ({ bucket }) => {
  if (!bucket) return null;

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-1">
          Physiological Sub-Matrix
        </span>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">{bucket.title}</h3>
      </div>

      <div className="space-y-4">
        {bucket.content.map((item, i) => (
          <div
            key={i}
            className="bg-slate-950/40/5 border border-white/5 rounded-2xl p-5 hover:border-emerald-500/20 transition-all"
          >
            <span className="text-[10px] font-black text-emerald-400 block mb-2 uppercase tracking-wide">
              {item.label}
            </span>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
