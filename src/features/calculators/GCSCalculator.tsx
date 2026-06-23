import React, { useState } from 'react';

export const GCSCalculator: React.FC = () => {
  const [eyes, setEyes] = useState(4);
  const [verbal, setVerbal] = useState(5);
  const [motor, setMotor] = useState(6);

  const total = eyes + verbal + motor;

  const getInterpretation = () => {
    if (total >= 13) return { label: 'Mild Brain Injury', color: 'text-emerald-600' };
    if (total >= 9) return { label: 'Moderate Brain Injury', color: 'text-amber-600' };
    return { label: 'Severe Brain Injury (GCS < 8 = Intubate)', color: 'text-rose-600' };
  };

  const interpretation = getInterpretation();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Eye Opening (E)
          </label>
          <select
            value={eyes}
            onChange={(e) => setEyes(Number(e.target.value))}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 font-bold text-slate-350 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          >
            <option value={4}>4 - Spontaneous</option>
            <option value={3}>3 - To Sound</option>
            <option value={2}>2 - To Pressure</option>
            <option value={1}>1 - None</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Verbal Response (V)
          </label>
          <select
            value={verbal}
            onChange={(e) => setVerbal(Number(e.target.value))}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 font-bold text-slate-350 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          >
            <option value={5}>5 - Oriented</option>
            <option value={4}>4 - Confused</option>
            <option value={3}>3 - Inappropriate Words</option>
            <option value={2}>2 - Incomprehensible Sounds</option>
            <option value={1}>1 - None</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Motor Response (M)
          </label>
          <select
            value={motor}
            onChange={(e) => setMotor(Number(e.target.value))}
            className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 font-bold text-slate-350 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          >
            <option value={6}>6 - Obeys Commands</option>
            <option value={5}>5 - Localizes Pain</option>
            <option value={4}>4 - Normal Flexion (Withdrawal)</option>
            <option value={3}>3 - Abnormal Flexion (Decorticate)</option>
            <option value={2}>2 - Extension (Decerebrate)</option>
            <option value={1}>1 - None</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-center">
        <div className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          Total GCS Score
        </div>
        <div className="text-7xl font-black text-white mb-4">{total}</div>
        <div className={`text-lg font-bold ${interpretation.color}`}>{interpretation.label}</div>
      </div>
    </div>
  );
};
