import React, { useState } from 'react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);

  const bmi = weight / (height / 100) ** 2;

  const getInterpretation = () => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-amber-600' };
    if (bmi < 25) return { label: 'Normal Weight', color: 'text-emerald-600' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600' };
    return { label: 'Obese', color: 'text-rose-600' };
  };

  const interpretation = getInterpretation();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 font-bold text-slate-350 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-center">
        <div className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          Body Mass Index (BMI)
        </div>
        <div className="text-7xl font-black text-white mb-4">{bmi.toFixed(1)}</div>
        <div className={`text-lg font-bold ${interpretation.color}`}>{interpretation.label}</div>
      </div>
    </div>
  );
};
