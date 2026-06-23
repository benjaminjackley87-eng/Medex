import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const SpirometryGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Algorithm */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              Spirometry & PFTs
            </h3>
            <p className="text-slate-400 font-medium mt-1">Pulmonary Function Guide • v0.4 Draft</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Respiratory
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Physiology
            </span>
          </div>
        </div>

        <div className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl">
          <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
            <span className="text-white not-italic font-black uppercase mr-2">Disclaimer:</span>
            Spirometry is effort-dependent. Results must be validated for quality (start, end, and
            reproducibility) before interpretation.
          </p>
        </div>

        <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            The 3-Step Interpretation Algorithm
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                s: '1. FEV1/FVC Ratio',
                d: 'Is it < 0.7 (or < LLN)? If yes → Obstructive. If no → Step 2.',
                c: 'text-emerald-600'
              },
              {
                s: '2. FVC (Volume)',
                d: 'Is FVC < 80% predicted? If yes → Suggests Restrictive pattern.',
                c: 'text-emerald-600'
              },
              {
                s: '3. Reversibility',
                d: 'FEV1 increase > 12% AND > 200ml after bronchodilator?',
                c: 'text-emerald-600'
              }
            ].map((step) => (
              <div
                key={step.s}
                onClick={() => onInvestigationClick(step.s, 'Spirometry')}
                className="space-y-2 cursor-pointer hover:bg-slate-950/40/50 p-2 rounded-xl transition-colors group"
              >
                <p
                  className={`text-[10px] font-black uppercase tracking-widest ${step.c} flex items-center justify-between`}
                >
                  {step.s}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[12px] font-bold text-white leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Aids: Flow-Volume Loops & Lung Volumes */}
      <div className="space-y-12">
        <div className="space-y-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            📈 Flow-Volume Loop Visualizer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="relative aspect-square bg-slate-950/20 rounded-3xl border border-white/5 p-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Axes */}
                <line x1="10" y1="50" x2="95" y2="50" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="10" y1="5" x2="10" y2="95" stroke="#cbd5e1" strokeWidth="1" />
                <text x="90" y="55" fontSize="4" className="fill-slate-400 font-bold">
                  Vol
                </text>
                <text
                  x="5"
                  y="10"
                  fontSize="4"
                  className="fill-slate-400 font-bold"
                  transform="rotate(-90 5,10)"
                >
                  Flow
                </text>

                {/* Normal Loop (Dashed) */}
                <path
                  d="M10 50 Q40 5 80 50 L10 50"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="2"
                />

                {/* Obstructive Loop (Scooped) */}
                <path
                  d="M10 50 Q30 15 60 50 Q35 55 10 50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />
              </svg>
              <p className="text-[10px] font-black text-blue-600 uppercase mt-4 text-center tracking-widest">
                Obstructive (Scooped)
              </p>
            </div>

            <div className="relative aspect-square bg-slate-950/20 rounded-3xl border border-white/5 p-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Axes */}
                <line x1="10" y1="50" x2="95" y2="50" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="10" y1="5" x2="10" y2="95" stroke="#cbd5e1" strokeWidth="1" />

                {/* Normal Loop (Dashed) */}
                <path
                  d="M10 50 Q40 5 80 50 L10 50"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="2"
                />

                {/* Restrictive Loop (Small) */}
                <path
                  d="M10 50 Q25 25 40 50 L10 50"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
              </svg>
              <p className="text-[10px] font-black text-emerald-600 uppercase mt-4 text-center tracking-widest">
                Restrictive (Witch's Hat)
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  Key Parameters
                </h4>
                <ul className="text-[11px] font-medium text-slate-400 space-y-2">
                  <li>
                    <span className="font-black text-white">FEV1:</span> Vol exhaled in 1st second.
                  </li>
                  <li>
                    <span className="font-black text-white">FVC:</span> Total vol exhaled.
                  </li>
                  <li>
                    <span className="font-black text-white">DLCO:</span> Gas exchange capacity.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Static Lung Volumes Section */}
        <div className="space-y-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            🫁 Static Lung Volumes & Capacities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="p-10 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-950/200/5 blur-[100px] rounded-full"></div>
              <div className="relative z-10">
                <svg viewBox="0 0 400 250" className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="140" x2="380" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="180" x2="380" y2="180" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="230" x2="380" y2="230" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y-Axis */}
                  <line x1="40" y1="10" x2="40" y2="240" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="10" y="25" fontSize="8" className="fill-slate-400 font-bold">
                    6.0L
                  </text>
                  <text x="10" y="145" fontSize="8" className="fill-slate-400 font-bold">
                    3.0L
                  </text>
                  <text x="10" y="185" fontSize="8" className="fill-slate-400 font-bold">
                    2.5L
                  </text>
                  <text x="10" y="235" fontSize="8" className="fill-slate-400 font-bold">
                    0L
                  </text>

                  {/* Spirogram Trace */}
                  <path
                    d="M40 160 Q50 140 60 160 T80 160 T100 160 L130 20 Q150 20 170 230 Q190 230 210 160 T230 160 T250 160"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Volume Labels (Brackets) */}
                  {/* IRV */}
                  <line x1="300" y1="20" x2="310" y2="20" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="300" y1="140" x2="310" y2="140" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="305" y1="20" x2="305" y2="140" stroke="#94a3b8" strokeWidth="1" />
                  <text
                    x="315"
                    y="85"
                    fontSize="7"
                    className="fill-slate-500 font-black uppercase tracking-tighter"
                  >
                    IRV
                  </text>

                  {/* TV */}
                  <line x1="300" y1="140" x2="310" y2="140" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="300" y1="180" x2="310" y2="180" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="305" y1="140" x2="305" y2="180" stroke="#94a3b8" strokeWidth="1" />
                  <text
                    x="315"
                    y="165"
                    fontSize="7"
                    className="fill-slate-500 font-black uppercase tracking-tighter"
                  >
                    TV
                  </text>

                  {/* ERV */}
                  <line x1="300" y1="180" x2="310" y2="180" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="300" y1="230" x2="310" y2="230" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="305" y1="180" x2="305" y2="230" stroke="#94a3b8" strokeWidth="1" />
                  <text
                    x="315"
                    y="210"
                    fontSize="7"
                    className="fill-slate-500 font-black uppercase tracking-tighter"
                  >
                    ERV
                  </text>

                  {/* RV (Dashed area below ERV) */}
                  <rect x="40" y="230" width="340" height="10" fill="#f1f5f9" fillOpacity="0.5" />
                  <text x="45" y="245" fontSize="6" className="fill-slate-400 italic">
                    Residual Volume (RV) - Cannot be measured by simple spirometry
                  </text>

                  {/* Capacities (Left Side) */}
                  {/* Vital Capacity */}
                  <line x1="350" y1="20" x2="360" y2="20" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="350" y1="230" x2="360" y2="230" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="355" y1="20" x2="355" y2="230" stroke="#0f172a" strokeWidth="1.5" />
                  <text
                    x="362"
                    y="130"
                    fontSize="8"
                    className="fill-slate-900 font-black uppercase tracking-widest"
                    transform="rotate(90 362,130)"
                  >
                    Vital Capacity
                  </text>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-950/20 rounded-3xl border border-white/5">
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-4">
                  Volumes (The Parts)
                </h4>
                <div className="space-y-4">
                  {[
                    { l: 'TV', n: 'Tidal Volume', d: 'Normal quiet breathing (~500mL).' },
                    { l: 'IRV', n: 'Inspiratory Reserve', d: 'Max air inhaled after normal TV.' },
                    { l: 'ERV', n: 'Expiratory Reserve', d: 'Max air exhaled after normal TV.' },
                    { l: 'RV', n: 'Residual Volume', d: 'Air left after max exhalation.' }
                  ].map((v) => (
                    <div key={v.l} className="group cursor-help">
                      <p className="text-[10px] font-black text-blue-600 uppercase mb-1">
                        {v.l}: {v.n}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium leading-tight">{v.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-emerald-950/20 rounded-3xl border border-emerald-950/30">
                <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                  Capacities (The Sums)
                </h4>
                <div className="space-y-4">
                  {[
                    { l: 'VC', n: 'Vital Capacity', d: 'TV + IRV + ERV (Max usable air).' },
                    { l: 'IC', n: 'Inspiratory Capacity', d: 'TV + IRV.' },
                    {
                      l: 'FRC',
                      n: 'Func. Residual Cap.',
                      d: 'ERV + RV (Air left after normal breath).'
                    },
                    { l: 'TLC', n: 'Total Lung Capacity', d: 'The sum of all volumes.' }
                  ].map((c) => (
                    <div key={c.l} className="group cursor-help">
                      <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">
                        {c.l}: {c.n}
                      </p>
                      <p className="text-[11px] text-emerald-900/60 font-medium leading-tight">
                        {c.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Physiology Buckets */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧠 Physiology Buckets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6">
              A) Obstructive Pattern
            </h4>
            <p className="text-[12px] font-bold text-white mb-4">
              Ratio &lt; 0.7. Airway narrowing / collapse.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Reversible</p>
                <p className="text-[11px] font-medium text-slate-400">Asthma (Classic).</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Irreversible</p>
                <p className="text-[11px] font-medium text-slate-400">
                  COPD, Bronchiectasis, Bronchiolitis obliterans.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-6">
              B) Restrictive Pattern
            </h4>
            <p className="text-[12px] font-bold text-white mb-4">
              FVC &lt; 80% (with normal ratio). Reduced lung volume.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Intrinsic (Parenchymal)
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  ILD, Fibrosis, Sarcoidosis, Pneumonitis.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Extrinsic (Extra-parenchymal)
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Obesity, Kyphoscoliosis, Neuromuscular weakness, Pleural effusion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧩 Pattern Recognition (Classic PFTs)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { t: 'Asthma', d: 'Obstructive pattern with significant reversibility (>12% FEV1).' },
            {
              t: 'COPD',
              d: 'Obstructive pattern, minimal reversibility, often low DLCO (emphysema).'
            },
            {
              t: 'ILD / Fibrosis',
              d: 'Restrictive pattern with low DLCO and high FEV1/FVC ratio.'
            },
            { t: 'Neuromuscular', d: 'Restrictive pattern with normal DLCO and low MIP/MEP.' },
            {
              t: 'Upper Airway Obs',
              d: 'Flattening of inspiratory or expiratory limb (Stridor context).'
            },
            { t: 'Obesity', d: 'Mild restrictive pattern, normal DLCO, reduced ERV.' }
          ].map((pattern) => (
            <div
              key={pattern.t}
              onClick={() => onInvestigationClick(pattern.t, 'Spirometry')}
              className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl shadow-sm cursor-pointer hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 flex items-center justify-between">
                {pattern.t}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-[12px] font-bold text-white leading-relaxed">{pattern.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div className="p-10 bg-rose-900 text-white rounded-[50px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-950/40/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-400" />
            🚨 Spirometry Red Flags (Immediate Action)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                'FEV1 < 30% Predicted → Very severe obstruction',
                'Sudden drop in FVC → Acute neuromuscular failure risk',
                'Flattened loop + Stridor → Impending airway obstruction',
                'DLCO < 40% Predicted → Severe gas exchange impairment'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                'Hypoxaemia at rest with normal spirometry → Think PE/Shunt',
                'Rapidly declining FVC in GBS/Myasthenia → ICU referral',
                'Severe obstruction + Hypercapnia → Type 2 Resp Failure',
                'Inability to complete test due to distress → Clinical emergency'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Worked Cases */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧪 Worked Cases (PFT Analysis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: 'Case 1: The Smoker',
              d: 'FEV1/FVC 0.55, FEV1 45% pred, FVC 85% pred. Post-BD FEV1 +5%.',
              a: 'Diagnosis: Moderate-Severe COPD (Irreversible obstruction).'
            },
            {
              t: 'Case 2: The Breathless Runner',
              d: 'FEV1/FVC 0.65, FEV1 75% pred. Post-BD FEV1 +18% (400ml).',
              a: 'Diagnosis: Asthma (Reversible obstruction).'
            },
            {
              t: 'Case 3: The Dry Cough',
              d: 'FEV1/FVC 0.85, FEV1 60% pred, FVC 55% pred, DLCO 40% pred.',
              a: 'Diagnosis: Restrictive Lung Disease (likely ILD/Fibrosis).'
            }
          ].map((c) => (
            <div
              key={c.t}
              onClick={() => onInvestigationClick(c.t, 'Spirometry')}
              className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm flex flex-col cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-4 tracking-widest flex items-center justify-between">
                {c.t}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <div className="bg-slate-950/20 p-4 rounded-2xl mb-4 border border-white/5">
                <p className="text-[11px] font-medium text-slate-400 italic leading-relaxed">
                  {c.d}
                </p>
              </div>
              <p className="text-[12px] font-bold text-white leading-relaxed mt-auto">{c.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* One-Pager Summary */}
      <div className="p-12 bg-slate-950/20 border border-white/5 rounded-[60px]">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-10 text-center">
          🧾 Spirometry One-Pager (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Algorithm</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Ratio &lt; 0.7? (Obs) → FVC &lt; 80%? (Rest) → Reversibility? (Asthma).
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Key Values</p>
            <ul className="text-[11px] font-bold text-slate-400 space-y-1">
              <li>FEV1/FVC: &gt; 0.7</li>
              <li>FVC: &gt; 80% pred</li>
              <li>DLCO: &gt; 80% pred</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Red Flags</p>
            <ul className="text-[11px] font-bold text-rose-600 space-y-1">
              <li>FEV1 &lt; 30%</li>
              <li>Stridor / Flat Loop</li>
              <li>Rapid FVC drop</li>
              <li>Severe DLCO loss</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Effort is everything. Always check the loop shape first.
            </p>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="pt-12 border-t border-white/5">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
          📚 References (Vancouver Style)
        </h4>
        <ul className="space-y-2 text-[10px] text-slate-400 font-medium leading-relaxed">
          <li>
            1. Graham BL, et al. Standardization of Spirometry 2019 Update. Am J Respir Crit Care
            Med. 2019;200(8):e70-e88.
          </li>
          <li>
            2. Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and
            Prevention. 2023.
          </li>
          <li>
            3. Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy for
            Diagnosis, Management and Prevention of COPD. 2023.
          </li>
          <li>
            4. Pellegrino R, et al. Interpretative strategies for lung function tests. Eur Respir J.
            2005;26(5):948-68.
          </li>
        </ul>
      </div>
    </div>
  );
};
