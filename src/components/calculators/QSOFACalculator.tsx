import React, { useState } from 'react';

export const QSOFACalculator: React.FC = () => {
  const [criteria, setCriteria] = useState({
    alteredMental: false,
    respRate: false,
    systolicBP: false
  });

  const score = Object.values(criteria).filter(Boolean).length;

  const getRisk = () => {
    if (score >= 2)
      return { label: 'High Risk of Poor Outcome (Sepsis Suspected)', color: 'text-rose-600' };
    return { label: 'Low Risk', color: 'text-emerald-600' };
  };

  const risk = getRisk();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-3">
        {[
          {
            key: 'alteredMental',
            label: 'Altered Mental Status (GCS < 15)',
            detail: 'New onset confusion or disorientation'
          },
          { key: 'respRate', label: 'Respiratory Rate ≥ 22 /min', detail: 'Tachypnoea' },
          { key: 'systolicBP', label: 'Systolic BP ≤ 100 mmHg', detail: 'Hypotension' }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setCriteria((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
            className={`flex flex-col items-start p-6 rounded-2xl border-2 transition-all text-left ${
              criteria[item.key as keyof typeof criteria]
                ? 'bg-rose-950/20 border-rose-200 text-rose-900 shadow-sm'
                : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/5'
            }`}
          >
            <span className="font-black text-lg mb-1">{item.label}</span>
            <span className="text-xs font-medium opacity-60">{item.detail}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-center">
        <div className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          qSOFA Score
        </div>
        <div className="text-7xl font-black text-white mb-4">{score}</div>
        <div className={`text-lg font-bold ${risk.color}`}>{risk.label}</div>
      </div>
    </div>
  );
};
