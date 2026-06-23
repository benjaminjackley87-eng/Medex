import React, { useState, useMemo } from 'react';

export const CHADSVAScCalculator: React.FC = () => {
  const [criteria, setCriteria] = useState({
    congestiveHeartFailure: false, // 1
    hypertension: false, // 1
    age75: false, // 2
    diabetes: false, // 1
    stroke: false, // 2
    vascularDisease: false, // 1
    age65: false, // 1
    sexFemale: false // 1
  });

  const score = useMemo(() => {
    let s = 0;
    if (criteria.congestiveHeartFailure) s += 1;
    if (criteria.hypertension) s += 1;
    if (criteria.age75) s += 2;
    if (criteria.diabetes) s += 1;
    if (criteria.stroke) s += 2;
    if (criteria.vascularDisease) s += 1;
    if (criteria.age65 && !criteria.age75) s += 1; // Age 65-74
    if (criteria.sexFemale) s += 1;
    return s;
  }, [criteria]);

  const getRisk = () => {
    if (score >= 2) return { label: 'Oral Anticoagulation Recommended', color: 'text-rose-600' };
    if (score === 1) return { label: 'Consider Oral Anticoagulation', color: 'text-amber-600' };
    return { label: 'Low Risk', color: 'text-emerald-600' };
  };

  const risk = getRisk();

  const toggle = (key: keyof typeof criteria) => {
    setCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-3">
        {[
          { key: 'congestiveHeartFailure', label: 'Congestive Heart Failure', points: 1 },
          { key: 'hypertension', label: 'Hypertension', points: 1 },
          { key: 'age75', label: 'Age ≥ 75 years', points: 2 },
          { key: 'diabetes', label: 'Diabetes Mellitus', points: 1 },
          { key: 'stroke', label: 'Stroke / TIA / Thromboembolism', points: 2 },
          {
            key: 'vascularDisease',
            label: 'Vascular Disease (prior MI, PAD, or aortic plaque)',
            points: 1
          },
          { key: 'age65', label: 'Age 65 - 74 years', points: 1 },
          { key: 'sexFemale', label: 'Sex Category (Female)', points: 1 }
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
          CHA₂DS₂-VASc Score
        </div>
        <div className="text-7xl font-black text-white mb-4">{score}</div>
        <div className={`text-lg font-bold ${risk.color}`}>{risk.label}</div>
      </div>
    </div>
  );
};
