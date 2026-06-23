import React from 'react';
import { Zap, ArrowRight, BrainCircuit } from 'lucide-react';
import MedImage from '../../../components/common/MedImage';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const CTGGuide: React.FC<CategoryGuideProps> = ({
  onInvestigationClick,
  onEnlargeImage
}) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Algorithm */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              CTG Interpretation
            </h3>
            <p className="text-slate-400 font-medium mt-1">
              Intrapartum Fetal Monitoring • v0.4 Draft
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Obstetrics
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Fetal Medicine
            </span>
          </div>
        </div>

        <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            The DR C BRAVADO Approach
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                s: 'DR: Define Risk',
                d: 'Maternal/Fetal risk factors (e.g., Pre-eclampsia, IUGR).',
                c: 'text-emerald-600'
              },
              {
                s: 'C: Contractions',
                d: 'Frequency (per 10m), Duration, Resting tone.',
                c: 'text-emerald-600'
              },
              {
                s: 'BRA: Baseline Rate',
                d: 'Normal: 110-160 bpm. Brady (<110) or Tachy (>160).',
                c: 'text-emerald-600'
              },
              {
                s: 'V: Variability',
                d: 'Normal: 6-25 bpm. Reduced (<5) for >40m is concerning.',
                c: 'text-emerald-600'
              },
              {
                s: 'A: Accelerations',
                d: 'Transient increases (>15 bpm for >15s). Reassuring.',
                c: 'text-emerald-600'
              },
              {
                s: 'D: Decelerations',
                d: 'Early (Head), Variable (Cord), Late (Placental).',
                c: 'text-rose-600'
              },
              {
                s: 'O: Overall Impression',
                d: 'Normal, Suspicious, or Pathological.',
                c: 'text-emerald-600'
              }
            ].map((step) => (
              <div
                key={step.s}
                onClick={() => onInvestigationClick(step.s, 'CTG')}
                className="space-y-2 cursor-pointer hover:opacity-70 transition-opacity group"
              >
                <p
                  className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-between ${step.c}`}
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

      {/* Physiology Buckets */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧠 Physiology Buckets (Fetal Reserve)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6">
              A) Autonomic Control
            </h4>
            <div className="space-y-4">
              <div
                onClick={() =>
                  onInvestigationClick('Parasympathetic (Vagus) Control', 'CTG Physiology')
                }
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center justify-between">
                  Parasympathetic (Vagus)
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Slows heart rate. Responsible for beat-to-beat variability.
                </p>
              </div>
              <div
                onClick={() => onInvestigationClick('Sympathetic Control', 'CTG Physiology')}
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center justify-between">
                  Sympathetic
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Increases heart rate. Dominant during fetal stress or activity.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-6">
              B) Chemoreceptor Response
            </h4>
            <div className="space-y-4">
              <div
                onClick={() =>
                  onInvestigationClick('Late Decelerations Physiology', 'CTG Physiology')
                }
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center justify-between">
                  Late Decelerations
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Triggered by hypoxaemia sensing in the carotid bodies during contractions.
                </p>
              </div>
              <div
                onClick={() =>
                  onInvestigationClick('Sinusoidal Pattern Physiology', 'CTG Physiology')
                }
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center justify-between">
                  Sinusoidal Pattern
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Loss of autonomic control. Severe fetal anaemia or terminal hypoxia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Trace: Variable Decelerations */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          📈 Visual Trace Library
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Normal Trace */}
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">
                A) Normal (Reassuring) Trace
              </h4>
              <span className="px-2 py-0.5 bg-emerald-950/20 text-emerald-400 text-[8px] font-black uppercase rounded-full">
                Normal
              </span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="h-32 relative bg-slate-950/20 rounded-2xl border border-white/5 p-4">
                <svg viewBox="0 0 200 60" className="w-full h-full">
                  <path
                    d="M0 25 Q5 23 10 27 T20 25 T30 28 T40 25 T50 23 T60 27 T70 25 T80 28 T90 25 T100 23 T110 27 T120 25 T130 28 T140 25 T150 23 T160 27 T170 25 T180 28 T190 25 T200 23"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="0.8"
                  />
                  {/* Accelerations */}
                  <path d="M40 25 Q45 5 50 25" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M140 25 Q145 5 150 25" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  <line
                    x1="0"
                    y1="10"
                    x2="200"
                    y2="10"
                    stroke="#cbd5e1"
                    strokeDasharray="2 2"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="0"
                    y1="30"
                    x2="200"
                    y2="30"
                    stroke="#cbd5e1"
                    strokeDasharray="2 2"
                    strokeWidth="0.5"
                  />
                  <text x="2" y="8" fontSize="4" className="fill-slate-400 font-bold">
                    160
                  </text>
                  <text x="2" y="28" fontSize="4" className="fill-slate-400 font-bold">
                    110
                  </text>
                </svg>
              </div>
              <div className="h-12 relative bg-slate-950/20 rounded-xl border border-white/5 p-2">
                <svg viewBox="0 0 200 30" className="w-full h-full">
                  <path
                    d="M0 28 Q40 28 50 15 Q60 28 100 28 Q140 28 150 15 Q160 28 200 28"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
              Baseline 140 bpm, normal variability (6-25 bpm), and presence of accelerations. No
              decelerations.
            </p>
          </div>

          {/* Late Decelerations */}
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm hover:border-rose-500/30 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-rose-600 uppercase tracking-widest">
                B) Late Decelerations
              </h4>
              <span className="px-2 py-0.5 bg-rose-950/20 text-rose-455 text-[8px] font-black uppercase rounded-full">
                Pathological
              </span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="h-32 relative bg-slate-950/20 rounded-2xl border border-white/5 p-4">
                <svg viewBox="0 0 200 60" className="w-full h-full">
                  <path
                    d="M0 20 Q5 19 10 21 T20 20 T30 22 T40 20 T50 21 T60 40 T70 40 T80 20 T90 21 T100 20 T110 21 T120 20 T130 21 T140 20 T150 21 T160 40 T170 40 T180 20 T190 21 T200 20"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="0.8"
                  />
                  <line
                    x1="0"
                    y1="10"
                    x2="200"
                    y2="10"
                    stroke="#cbd5e1"
                    strokeDasharray="2 2"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="0"
                    y1="30"
                    x2="200"
                    y2="30"
                    stroke="#cbd5e1"
                    strokeDasharray="2 2"
                    strokeWidth="0.5"
                  />
                  <text x="2" y="8" fontSize="4" className="fill-slate-400 font-bold">
                    160
                  </text>
                  <text x="2" y="28" fontSize="4" className="fill-slate-400 font-bold">
                    110
                  </text>
                </svg>
              </div>
              <div className="h-12 relative bg-slate-950/20 rounded-xl border border-white/5 p-2">
                <svg viewBox="0 0 200 30" className="w-full h-full">
                  <path
                    d="M0 28 Q30 28 40 10 Q50 28 100 28 Q130 28 140 10 Q150 28 200 28"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
              Decelerations start after the peak of the contraction and return to baseline after the
              contraction has finished.
            </p>
          </div>

          {/* Variable Decelerations */}
          <div className="p-8 bg-slate-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-950/200/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 space-y-6">
              <h4 className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">
                C) Variable Decelerations
              </h4>
              <div className="space-y-4">
                {/* FHR Panel */}
                <div className="h-32 relative border-b border-white/10">
                  <svg viewBox="0 0 200 60" className="w-full h-full">
                    <path
                      d="M0 20 Q10 18 20 22 T40 20 T60 25 T80 20 L90 50 L100 20 T120 22 T140 20 T160 25 T180 20 T200 22"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="10"
                      x2="200"
                      y2="10"
                      stroke="white"
                      strokeOpacity="0.1"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="30"
                      x2="200"
                      y2="30"
                      stroke="white"
                      strokeOpacity="0.1"
                      strokeWidth="0.5"
                    />
                    <text x="2" y="8" fontSize="3" fill="white" fillOpacity="0.5">
                      160 bpm
                    </text>
                    <text x="2" y="28" fontSize="3" fill="white" fillOpacity="0.5">
                      110 bpm
                    </text>
                  </svg>
                </div>
                {/* Contractions Panel */}
                <div className="h-16 relative">
                  <svg viewBox="0 0 200 30" className="w-full h-full">
                    <path
                      d="M0 28 Q40 28 50 10 Q60 28 100 28 Q140 28 150 10 Q160 28 200 28"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1"
                    />
                    <text x="2" y="8" fontSize="3" fill="white" fillOpacity="0.5">
                      Contractions
                    </text>
                  </svg>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic leading-relaxed">
                Abrupt drop in FHR (V-shape) often unrelated to contractions, suggesting cord
                compression.
              </p>
            </div>
          </div>

          {/* Sinusoidal Pattern */}
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm hover:border-amber-500/30 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-amber-600 uppercase tracking-widest">
                D) Sinusoidal Pattern
              </h4>
              <span className="px-2 py-0.5 bg-amber-950/20 text-amber-400 text-[8px] font-black uppercase rounded-full">
                Critical
              </span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="h-32 relative bg-slate-950/20 rounded-2xl border border-white/5 p-4">
                <svg viewBox="0 0 200 60" className="w-full h-full">
                  <path
                    d="M0 30 Q10 10 20 30 T40 30 T60 30 T80 30 T100 30 T120 30 T140 30 T160 30 T180 30 T200 30"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="10"
                    x2="200"
                    y2="10"
                    stroke="#cbd5e1"
                    strokeDasharray="2 2"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="0"
                    y1="30"
                    x2="200"
                    y2="30"
                    stroke="#cbd5e1"
                    strokeDasharray="2 2"
                    strokeWidth="0.5"
                  />
                  <text x="2" y="8" fontSize="4" className="fill-slate-400 font-bold">
                    160
                  </text>
                  <text x="2" y="28" fontSize="4" className="fill-slate-400 font-bold">
                    110
                  </text>
                </svg>
              </div>
              <div className="h-12 relative bg-slate-950/20 rounded-xl border border-white/5 p-2">
                <svg viewBox="0 0 200 30" className="w-full h-full">
                  <path d="M0 28 Q100 28 200 28" fill="none" stroke="#3b82f6" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
              Smooth, sine-wave like pattern. Frequency 3-5 cycles/min. Associated with severe fetal
              anaemia.
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Context Images */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          📸 Clinical Context Gallery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-sm">
              <MedImage
                src="/assets/placeholders/ctg-monitor.svg"
                alt="CTG Monitor"
                label="CTG Monitor"
                className="w-full h-full"
                onEnlarge={onEnlargeImage}
              />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase text-center">
              CTG Monitoring Setup
            </p>
          </div>
          <div className="space-y-3">
            <div className="aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-sm">
              <MedImage
                src="/assets/placeholders/fetal-ultrasound.svg"
                alt="Fetal Ultrasound"
                label="Fetal Ultrasound"
                className="w-full h-full"
                onEnlarge={onEnlargeImage}
              />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase text-center">
              Fetal Wellbeing Assessment
            </p>
          </div>
          <div className="space-y-3">
            <div className="aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-sm">
              <MedImage
                src="/assets/placeholders/labor-ward.svg"
                alt="Labor Ward"
                label="Labor Ward"
                className="w-full h-full"
                onEnlarge={onEnlargeImage}
              />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase text-center">
              Intrapartum Care Environment
            </p>
          </div>
        </div>
      </div>

      {/* Red Flags */}
      <div className="p-10 bg-rose-900 text-white rounded-[50px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-950/40/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-400" />
            🚨 CTG Red Flags (Immediate Review)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                'Baseline Bradycardia < 100 bpm → Acute hypoxia risk',
                'Sinusoidal Pattern → Fetal anaemia / Severe hypoxia',
                'Absent Variability (< 3 bpm) → Fetal acidosis risk',
                'Recurrent Late Decelerations → Chronic insufficiency'
              ].map((flag) => (
                <li
                  key={flag}
                  onClick={() => onInvestigationClick(flag, 'CTG Red Flags')}
                  className="flex items-center gap-3 text-[12px] font-bold cursor-pointer hover:text-rose-200 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-125 transition-transform" />
                  {flag}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                'Prolonged Deceleration > 3 mins → Emergency delivery?',
                'Baseline Tachycardia > 160 bpm → Maternal fever / Sepsis',
                'Hyperstimulation (> 5 contractions in 10m) → Stop Oxytocin',
                'Atypical Variables (Shoulders, slow recovery) → Concerning'
              ].map((flag) => (
                <li
                  key={flag}
                  onClick={() => onInvestigationClick(flag, 'CTG Red Flags')}
                  className="flex items-center gap-3 text-[12px] font-bold cursor-pointer hover:text-rose-200 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-125 transition-transform" />
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
          🧪 Worked Cases (Visual Analysis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: 'Case 1: Reassuring Trace',
              d: 'Baseline 140, Variability 15, 2 Accelerations in 20m, No Decelerations.',
              a: 'Impression: Normal CTG. Continue routine monitoring.',
              img: '/assets/placeholders/ctg-case.svg'
            },
            {
              t: 'Case 2: Concerning Variables',
              d: 'Baseline 150, Variability 10, Recurrent Variable Decelerations with slow recovery.',
              a: 'Impression: Suspicious. Change maternal position, consider IV fluids / Scalp pH.',
              img: '/assets/placeholders/ctg-case.svg'
            },
            {
              t: 'Case 3: Pathological Trace',
              d: 'Baseline 170 (Tachy), Absent Variability, Recurrent Late Decelerations.',
              a: 'Impression: Pathological. Urgent obstetric review, likely Category 1 CS.',
              img: '/assets/placeholders/ctg-case.svg'
            }
          ].map((c) => (
            <div
              key={c.t}
              onClick={() => onInvestigationClick(c.t, 'CTG')}
              className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm flex flex-col cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-4 tracking-widest flex items-center justify-between">
                {c.t}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-white/5">
                <MedImage
                  src={c.img}
                  alt={c.t}
                  label="Investigation View"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  onEnlarge={onEnlargeImage}
                />
              </div>
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
          🧾 CTG One-Pager (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">DR C BRAVADO</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Define Risk, Contractions, Baseline, Variability, Accels, Decels, Overall.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Normal Values</p>
            <ul className="text-[11px] font-bold text-slate-400 space-y-1">
              <li>Rate: 110-160 bpm</li>
              <li>Variability: 6-25 bpm</li>
              <li>Accels: Present</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Red Flags</p>
            <ul className="text-[11px] font-bold text-rose-600 space-y-1">
              <li>Sinusoidal Pattern</li>
              <li>Absent Variability</li>
              <li>Recurrent Lates</li>
              <li>Bradycardia</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Always interpret CTG in context of maternal health and labor progress.
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
          <li>1. NICE Guidelines. Intrapartum care (NG121). 2022.</li>
          <li>2. RANZCOG. Intrapartum Fetal Surveillance Clinical Guideline. 4th ed. 2019.</li>
          <li>
            3. FIGO Guidelines on Intrapartum Fetal Monitoring. Int J Gynaecol Obstet.
            2015;131(1):3-30.
          </li>
        </ul>
      </div>
    </div>
  );
};
