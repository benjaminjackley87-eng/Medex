import React, { useState } from 'react';

export const CreatinineClearanceCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(60);
  const [weight, setWeight] = useState<number>(70);
  const [creatinine, setCreatinine] = useState<number>(100);
  const [isFemale, setIsFemale] = useState<boolean>(false);

  // Cockcroft-Gault Equation
  // CrCl = ((140 - age) * weight) / (72 * creatinine) [* 0.85 if female]
  // creatinine in mg/dL. If in umol/L, divide by 88.4
  const crCl = (((140 - age) * weight) / (0.814 * creatinine)) * (isFemale ? 0.85 : 1.0);

  const getInterpretation = () => {
    if (crCl < 15) return { label: 'Kidney Failure (Stage 5)', color: 'text-rose-600' };
    if (crCl < 30) return { label: 'Severe Decrease (Stage 4)', color: 'text-rose-500' };
    if (crCl < 60) return { label: 'Moderate Decrease (Stage 3)', color: 'text-amber-600' };
    if (crCl < 90) return { label: 'Mild Decrease (Stage 2)', color: 'text-amber-500' };
    return { label: 'Normal (Stage 1)', color: 'text-emerald-600' };
  };

  const interpretation = getInterpretation();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Age (years)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 font-bold text-slate-350 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 font-bold text-slate-350 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Serum Creatinine (µmol/L)
          </label>
          <input
            type="number"
            value={creatinine}
            onChange={(e) => setCreatinine(Number(e.target.value))}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 font-bold text-slate-350 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Sex
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFemale(false)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isFemale ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
            >
              Male
            </button>
            <button
              onClick={() => setIsFemale(true)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${isFemale ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
            >
              Female
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-center">
        <div className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          Estimated CrCl (Cockcroft-Gault)
        </div>
        <div className="text-7xl font-black text-white mb-4">{crCl.toFixed(1)}</div>
        <div className="text-white/30 text-xs mb-4">mL/min</div>
        <div className={`text-lg font-bold ${interpretation.color}`}>{interpretation.label}</div>
      </div>
    </div>
  );
};
