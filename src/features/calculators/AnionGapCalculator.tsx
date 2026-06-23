import React, { useState } from 'react';

export const AnionGapCalculator: React.FC = () => {
  const [na, setNa] = useState<string>('');
  const [cl, setCl] = useState<string>('');
  const [hco3, setHco3] = useState<string>('');

  const result = (() => {
    const n = parseFloat(na);
    const c = parseFloat(cl);
    const h = parseFloat(hco3);
    if (!isNaN(n) && !isNaN(c) && !isNaN(h)) {
      return n - (c + h);
    }
    return null;
  })();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Sodium (Na+)
          </label>
          <input
            type="number"
            value={na}
            onChange={(e) => setNa(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 140"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Chloride (Cl-)
          </label>
          <input
            type="number"
            value={cl}
            onChange={(e) => setCl(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 100"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Bicarbonate (HCO3-)
          </label>
          <input
            type="number"
            value={hco3}
            onChange={(e) => setHco3(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 24"
          />
        </div>
      </div>

      {result !== null && (
        <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-950/40 animate-in zoom-in-95 duration-300">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            Anion Gap
          </div>
          <div className="text-5xl font-black mb-2">
            {result.toFixed(1)} <span className="text-xl opacity-60">mEq/L</span>
          </div>
          <div className="text-sm font-medium opacity-90">
            {result > 12 ? 'High Anion Gap (Normal range: 8-12 mEq/L)' : 'Normal Range'}
          </div>
        </div>
      )}
    </div>
  );
};
