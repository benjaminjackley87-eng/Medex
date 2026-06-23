import React, { useState } from 'react';

export const OHDCPlusSimulator: React.FC = () => {
  const [shift, setShift] = useState<'normal' | 'left' | 'right'>('normal');

  const paths = {
    normal: 'M 40,140 Q 90,135 130,80 T 220,25',
    left: 'M 40,140 Q 75,115 110,60 T 220,20',
    right: 'M 40,140 Q 110,150 150,105 T 220,30'
  };

  return (
    <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-4">
      <div className="flex flex-wrap gap-1.5 justify-center">
        {(['left', 'normal', 'right'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setShift(s)}
            className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border ${
              shift === s
                ? s === 'left'
                  ? 'bg-sky-500 text-white border-sky-400'
                  : s === 'right'
                    ? 'bg-amber-950/200 text-white border-amber-400'
                    : 'bg-slate-700 text-white border-slate-600'
                : 'bg-slate-950/40/5 border-white/5 text-slate-400 hover:bg-slate-950/40/10 hover:text-white'
            }`}
          >
            {s === 'normal' ? 'Normal' : `${s.toUpperCase()} SHIFT`}
          </button>
        ))}
      </div>
      <div className="relative h-44 bg-slate-900/40 rounded-xl flex items-center justify-center border border-white/5 p-2">
        <svg viewBox="0 0 260 170" className="w-full h-full text-slate-400">
          <line x1="40" y1="20" x2="40" y2="140" stroke="#1e293b" strokeWidth="1" />
          <line x1="40" y1="140" x2="240" y2="140" stroke="#1e293b" strokeWidth="1" />

          <text x="35" y="15" fill="#64748b" fontSize="7" textAnchor="end">
            SaO2 (%)
          </text>
          <text x="235" y="152" fill="#64748b" fontSize="7" textAnchor="end">
            PO2 (mmHg)
          </text>

          <line
            x1="40"
            y1="80"
            x2="220"
            y2="80"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          <text x="45" y="76" fill="#64748b" fontSize="6">
            50% Saturation
          </text>

          <path
            d={paths[shift]}
            fill="none"
            stroke={shift === 'left' ? '#0ea5e9' : shift === 'right' ? '#f59e0b' : '#94a3b8'}
            strokeWidth="2.5"
            className="transition-all duration-500"
          />

          {shift === 'normal' && (
            <>
              <circle cx="125" cy="80" r="3.5" fill="#3b82f6" />
              <text x="130" y="86" fill="#3b82f6" fontSize="6" fontWeight="bold">
                P50 = 26.8
              </text>
            </>
          )}
          {shift === 'left' && (
            <>
              <circle cx="100" cy="80" r="3.5" fill="#0ea5e9" />
              <text x="105" y="74" fill="#0ea5e9" fontSize="6" fontWeight="bold">
                P50 Decreased
              </text>
            </>
          )}
          {shift === 'right' && (
            <>
              <circle cx="140" cy="80" r="3.5" fill="#f59e0b" />
              <text x="145" y="86" fill="#f59e0b" fontSize="6" fontWeight="bold">
                P50 Increased
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
};
