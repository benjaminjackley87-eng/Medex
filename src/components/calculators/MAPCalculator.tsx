import React, { useState, useEffect } from 'react';

export const MAPCalculator: React.FC = () => {
  const [sbp, setSbp] = useState<string>('');
  const [dbp, setDbp] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const s = parseFloat(sbp);
    const d = parseFloat(dbp);
    if (!isNaN(s) && !isNaN(d)) {
      setResult((s + 2 * d) / 3);
    } else {
      setResult(null);
    }
  }, [sbp, dbp]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Systolic BP (mmHg)
          </label>
          <input
            type="number"
            value={sbp}
            onChange={(e) => setSbp(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 120"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Diastolic BP (mmHg)
          </label>
          <input
            type="number"
            value={dbp}
            onChange={(e) => setDbp(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 80"
          />
        </div>
      </div>

      {result !== null && (
        <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-950/40 animate-in zoom-in-95 duration-300">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            Mean Arterial Pressure
          </div>
          <div className="text-5xl font-black mb-2">
            {result.toFixed(1)} <span className="text-xl opacity-60">mmHg</span>
          </div>
          <div className="text-sm font-medium opacity-90">
            {result < 65
              ? 'Low (Typically < 65 mmHg suggests inadequate organ perfusion)'
              : 'Normal Range'}
          </div>
        </div>
      )}
    </div>
  );
};
