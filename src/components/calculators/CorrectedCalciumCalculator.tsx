import React, { useState, useEffect } from 'react';

export const CorrectedCalciumCalculator: React.FC = () => {
  const [calcium, setCalcium] = useState<string>('');
  const [albumin, setAlbumin] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const ca = parseFloat(calcium);
    const alb = parseFloat(albumin);
    if (!isNaN(ca) && !isNaN(alb)) {
      setResult(ca + 0.02 * (40 - alb));
    } else {
      setResult(null);
    }
  }, [calcium, albumin]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Total Calcium (mmol/L)
          </label>
          <input
            type="number"
            value={calcium}
            onChange={(e) => setCalcium(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 2.2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Albumin (g/L)
          </label>
          <input
            type="number"
            value={albumin}
            onChange={(e) => setAlbumin(e.target.value)}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-4 text-lg font-black focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. 40"
          />
        </div>
      </div>

      {result !== null && (
        <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-950/40 animate-in zoom-in-95 duration-300">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            Corrected Calcium
          </div>
          <div className="text-5xl font-black mb-2">
            {result.toFixed(2)} <span className="text-xl opacity-60">mmol/L</span>
          </div>
          <div className="text-sm font-medium opacity-90">
            {result < 2.1
              ? 'Hypocalcaemia'
              : result > 2.6
                ? 'Hypercalcaemia'
                : 'Normal Range (2.1-2.6 mmol/L)'}
          </div>
        </div>
      )}
    </div>
  );
};
