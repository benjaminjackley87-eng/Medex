import React, { useState } from 'react';

export const PVLoopSimulator: React.FC = () => {
  const [mode, setMode] = useState<'normal' | 'preload' | 'afterload' | 'inotropy'>('normal');

  const paths = {
    normal: {
      loop: 'M 80,140 C 80,140 180,135 180,130 L 180,70 Q 150,60 110,65 L 110,140',
      espvr: 'M 30,150 L 170,30',
      edpvr: 'M 40,145 Q 120,140 190,130'
    },
    preload: {
      loop: 'M 80,140 C 80,140 220,134 220,128 L 220,68 Q 180,55 110,62 L 110,140',
      espvr: 'M 30,150 L 170,30',
      edpvr: 'M 40,145 Q 120,140 230,126'
    },
    afterload: {
      loop: 'M 90,140 C 90,140 180,135 180,126 L 180,40 Q 160,30 135,32 L 135,140',
      espvr: 'M 30,150 L 170,30',
      edpvr: 'M 40,145 Q 120,140 190,130'
    },
    inotropy: {
      loop: 'M 70,140 C 70,140 180,136 180,130 L 180,65 Q 140,55 90,58 L 90,140',
      espvr: 'M 30,150 L 190,10',
      edpvr: 'M 40,145 Q 120,140 190,130'
    }
  };

  return (
    <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-4">
      <div className="flex flex-wrap gap-1.5 justify-center">
        {(['normal', 'preload', 'afterload', 'inotropy'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border ${
              mode === m
                ? 'bg-rose-950/200 text-white border-rose-400 shadow-md shadow-rose-950/50'
                : 'bg-slate-950/40/5 border-white/5 text-slate-400 hover:bg-slate-950/40/10 hover:text-white'
            }`}
          >
            {m === 'normal' ? 'Normal' : `+ ${m}`}
          </button>
        ))}
      </div>
      <div className="relative h-44 bg-slate-900/40 rounded-xl flex items-center justify-center border border-white/5 p-2">
        <svg viewBox="0 0 260 170" className="w-full h-full text-slate-400">
          <line x1="40" y1="20" x2="40" y2="140" stroke="#1e293b" strokeWidth="1" />
          <line x1="40" y1="140" x2="240" y2="140" stroke="#1e293b" strokeWidth="1" />

          <text x="35" y="15" fill="#64748b" fontSize="7" textAnchor="end">
            Pressure
          </text>
          <text x="235" y="152" fill="#64748b" fontSize="7" textAnchor="end">
            Volume
          </text>

          <path d={paths[mode].espvr} stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3,3" />
          <text x="135" y="45" fill="#e11d48" fontSize="6" transform="rotate(-36, 135, 45)">
            ESPVR
          </text>

          <path d={paths[mode].edpvr} stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3,3" />
          <text x="185" y="125" fill="#3b82f6" fontSize="6">
            EDPVR
          </text>

          <path
            d={paths[mode].loop}
            fill="rgba(244, 63, 94, 0.08)"
            stroke="#f43f5e"
            strokeWidth="2"
            className="transition-all duration-500"
          />

          <text x="110" y="152" fill="#94a3b8" fontSize="6" textAnchor="middle">
            ESV
          </text>
          <text x="180" y="152" fill="#94a3b8" fontSize="6" textAnchor="middle">
            EDV
          </text>
        </svg>
      </div>
    </div>
  );
};
