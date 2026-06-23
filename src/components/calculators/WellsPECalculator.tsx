import React, { useState, useMemo } from 'react';

export const WellsPECalculator: React.FC = () => {
  const [criteria, setCriteria] = useState({
    clinicalSigns: false, // 3.0
    alternativeLessLikely: false, // 3.0
    heartRate: false, // 1.5
    immobilization: false, // 1.5
    previousPE: false, // 1.5
    hemoptysis: false, // 1.0
    malignancy: false // 1.0
  });

  const score = useMemo(() => {
    let s = 0;
    if (criteria.clinicalSigns) s += 3.0;
    if (criteria.alternativeLessLikely) s += 3.0;
    if (criteria.heartRate) s += 1.5;
    if (criteria.immobilization) s += 1.5;
    if (criteria.previousPE) s += 1.5;
    if (criteria.hemoptysis) s += 1.0;
    if (criteria.malignancy) s += 1.0;
    return s;
  }, [criteria]);

  const getRisk = () => {
    if (score > 6) return { label: 'High Probability (65%)', color: 'text-rose-600' };
    if (score >= 2) return { label: 'Moderate Probability (30%)', color: 'text-amber-600' };
    return { label: 'Low Probability (10%)', color: 'text-emerald-600' };
  };

  const risk = getRisk();

  const toggle = (key: keyof typeof criteria) => {
    setCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-3">
        {[
          { key: 'clinicalSigns', label: 'Clinical signs/symptoms of DVT', points: 3.0 },
          {
            key: 'alternativeLessLikely',
            label: 'PE is #1 diagnosis or equally likely',
            points: 3.0
          },
          { key: 'heartRate', label: 'Heart rate > 100 bpm', points: 1.5 },
          {
            key: 'immobilization',
            label: 'Immobilization (≥3 days) or surgery (last 4 weeks)',
            points: 1.5
          },
          { key: 'previousPE', label: 'Previous PE or DVT', points: 1.5 },
          { key: 'hemoptysis', label: 'Hemoptysis', points: 1.0 },
          { key: 'malignancy', label: 'Malignancy (treatment within last 6 months)', points: 1.0 }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => toggle(item.key as any)}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              criteria[item.key as keyof typeof criteria]
                ? 'bg-indigo-950/20 border-indigo-200 text-indigo-900 shadow-sm'
                : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/5'
            }`}
          >
            <span className="font-bold text-sm">{item.label}</span>
            <span
              className={`text-xs font-black px-2 py-1 rounded-lg ${
                criteria[item.key as keyof typeof criteria] ? 'bg-indigo-200' : 'bg-slate-900'
              }`}
            >
              +{item.points}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-center">
        <div className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          Wells Score for PE
        </div>
        <div className="text-7xl font-black text-white mb-4">{score}</div>
        <div className={`text-lg font-bold ${risk.color}`}>{risk.label}</div>
      </div>
    </div>
  );
};
