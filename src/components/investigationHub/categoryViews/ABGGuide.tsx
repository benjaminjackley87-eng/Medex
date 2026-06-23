import React from 'react';
import { Zap, Info, ArrowRight, BrainCircuit } from 'lucide-react';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const ABGGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Algorithm */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              ABG & Acid–Base
            </h3>
            <p className="text-slate-400 font-medium mt-1">Algorithm + Physiology • v0.3 Draft</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-teal-950/20 text-teal-400 text-[10px] font-black uppercase rounded-full border border-teal-950/30">
              Core Lab
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Cardiorespiratory
            </span>
          </div>
        </div>

        <div className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl">
          <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
            <span className="text-white not-italic font-black uppercase mr-2">Disclaimer:</span>
            This guide interprets results deliberately in isolation to teach mechanisms and
            patterns. Real-world decisions require clinical context, local protocols, and senior
            review for red-flag findings.
          </p>
        </div>

        <div className="p-8 bg-teal-950/20 border border-teal-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-teal-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Algorithm (Bedside Use)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                s: '1. Validate',
                d: 'VBG vs ABG? FiO2? Recent vent changes? Delay/Bubbles?',
                c: 'text-teal-600'
              },
              {
                s: '2. pH First',
                d: 'Acidaemia (<7.35) or Alkalaemia (>7.45)?',
                c: 'text-teal-600'
              },
              {
                s: '3. Primary',
                d: 'pH low: Met Acid (HCO3 ↓) or Resp Acid (CO2 ↑)? pH high: Met Alk (HCO3 ↑) or Resp Alk (CO2 ↓)?',
                c: 'text-teal-600'
              },
              {
                s: '4. Compensation',
                d: 'Expected vs Measured? If ≠, mixed disorder exists.',
                c: 'text-teal-600'
              },
              {
                s: '5. Anion Gap',
                d: 'Calculate AG for all metabolic acidosis.',
                c: 'text-teal-600'
              },
              { s: '6. Delta-Delta', d: 'Calculate Δ-Δ if AG is high.', c: 'text-teal-600' },
              {
                s: '7. Oxygenation',
                d: 'PaO2, SaO2, A-a gradient, P/F ratio.',
                c: 'text-teal-600'
              },
              {
                s: '8. Red Flags',
                d: 'pH ≤7.20, Lactate ≥4, CO2 narcosis, Toxic suspicion.',
                c: 'text-rose-600'
              }
            ].map((step) => (
              <div
                key={step.s}
                onClick={() => onInvestigationClick(step.s, 'ABG')}
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

      {/* Physiology & Caveats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            🧪 What the ABG Measures
          </h4>
          <div className="space-y-4">
            {[
              {
                l: 'pH',
                d: 'Net H+ balance; reflects interaction of CO2 (lungs) and HCO3 (kidneys + buffers).'
              },
              {
                l: 'PaCO2',
                d: 'Alveolar ventilation (↑ when hypoventilating; ↓ with hyperventilation).'
              },
              { l: 'HCO3', d: 'Renal bicarbonate + buffering; changes slower than PaCO2.' },
              { l: 'PaO2', d: 'Oxygenation (alveolar O2, V/Q matching, diffusion, FiO2).' },
              {
                l: 'SaO2',
                d: 'Hb O2 saturation; shifts with temp, pH (Bohr effect), 2,3-DPG, COHb/MetHb.'
              },
              {
                l: 'Lactate',
                d: 'Marker of anaerobic metabolism, adrenergic drive, or impaired clearance.'
              }
            ].map((item) => (
              <div key={item.l} className="flex gap-4 group">
                <span className="w-16 text-[11px] font-black text-white shrink-0 group-hover:text-teal-600 transition-colors">
                  {item.l}
                </span>
                <p className="text-[12px] text-slate-400 font-medium leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-950/20 p-8 rounded-[40px] border border-rose-950/30">
          <h4 className="text-[11px] font-black text-rose-455 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Analytical Caveats (⚠️)
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {[
              { t: 'Air Bubbles', d: '↓PaCO2, ↑PaO2 (if low baseline), artefacts in pH.' },
              { t: 'Delay', d: '↑PaCO2, ↓pH due to ongoing metabolism.' },
              { t: 'Venous Sample', d: 'Falsely high PaCO2, low PaO2 (if sampled as arterial).' },
              {
                t: 'O2 Changes',
                d: 'Misinterpretation of oxygenation and A-a gradient if source changes not recorded.'
              }
            ].map((caveat) => (
              <div key={caveat.t} className="flex gap-4">
                <span className="text-[10px] font-black text-rose-600 uppercase w-20 shrink-0">
                  {caveat.t}
                </span>
                <p className="text-[11px] font-bold text-rose-900/70">{caveat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Formulae */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🔢 Core Formulae (with Worked Examples)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AG & Delta-Delta */}
          <div className="space-y-4">
            <div className="p-6 bg-purple-950/20 border border-purple-950/30 rounded-3xl">
              <p className="text-[10px] font-black text-purple-300 uppercase mb-3">
                1) Anion Gap & Delta-Delta
              </p>
              <div className="space-y-2 text-[13px] font-black text-purple-200">
                <p>AG = Na - (Cl + HCO3)</p>
                <p className="text-[11px] text-purple-300/80">
                  Corrected AG = AG + 2.5 × (40 - Albumin)
                </p>
                <div className="h-px bg-purple-900/50 my-2" />
                <p>Δ-Δ = (AG_meas - 12) - (24 - HCO3_meas)</p>
                <div className="text-[11px] text-purple-300/70 space-y-1 font-medium italic">
                  <p>≈ 0: Pure HAGMA</p>
                  <p>Positive (&gt; 0): +Met Alk or Chronic Resp Acidosis</p>
                  <p>Negative (&lt; 0): +NAGMA</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                Example (Metabolic Acidosis)
              </p>
              <p className="text-[11px] font-medium text-slate-400 font-mono">
                Na 140, Cl 105, HCO3 12, Alb 30
              </p>
              <p className="text-[11px] font-black text-white mt-1">
                AG 23 → Corrected AG 25.5 (HAGMA) → Δ-Δ = (25.5-12) - (24-12) = 1.5 (Concomitant
                Metabolic Alkalosis)
              </p>
            </div>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <div className="p-6 bg-purple-950/20 border border-purple-950/30 rounded-3xl">
              <p className="text-[10px] font-black text-purple-300 uppercase mb-3">
                2) Compensation (Expected Values)
              </p>
              <div className="space-y-2 text-[12px] font-black text-purple-200">
                <p>Met Acidosis (Winter): 1.5 × HCO3 + 8 (±2)</p>
                <p>Met Alkalosis: 0.7 × (HCO3 - 24) + 40 (±5)</p>
                <p>Acute Resp Acid: HCO3 ↑1 per 10 ↑PaCO2</p>
                <p>Chronic Resp Acid: HCO3 ↑3.5-4 per 10 ↑PaCO2</p>
                <p>Acute Resp Alk: HCO3 ↓2 per 10 ↓PaCO2</p>
                <p>Chronic Resp Alk: HCO3 ↓5 per 10 ↓PaCO2</p>
              </div>
            </div>
            <div className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                Example (Met Acidosis)
              </p>
              <p className="text-[11px] font-medium text-slate-400 font-mono">
                pH 7.25, HCO3 15, PaCO2 28
              </p>
              <p className="text-[11px] font-black text-white mt-1">
                Exp PaCO2 30.5 ± 2 → 28 is appropriate respiratory compensation.
              </p>
            </div>
          </div>

          {/* A-a & P/F */}
          <div className="space-y-4 md:col-span-2">
            <div className="p-6 bg-purple-950/20 border border-purple-950/30 rounded-3xl">
              <p className="text-[10px] font-black text-purple-300 uppercase mb-3">
                3) Oxygenation (A-a & P/F)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[12px] font-black text-purple-200">
                <div className="space-y-2">
                  <p>A-a Gradient = PAO2 - PaO2</p>
                  <p className="text-[11px] text-purple-300/80 italic leading-relaxed font-mono">
                    PAO2 = FiO2 × (Patm - PH2O) - (PaCO2 / R)
                    <br />
                    At sea level: FiO2 0.21, Patm 760, PH2O 47 mmHg, R=0.8
                  </p>
                  <p className="text-[11px] text-purple-300/70 italic">
                    Normal: (Age/4) + 4. Elevated suggests V/Q shunt, mismatch, or diffusion defect.
                  </p>
                </div>
                <div className="space-y-2">
                  <p>P/F Ratio = PaO2 / FiO2</p>
                  <p className="text-[11px] text-purple-300/80 italic">
                    **Berlin Criteria for ARDS** (requires PEEP or CPAP ≥ 5 cmH2O):
                    <br />
                    • **Mild:** 200 &lt; P/F ≤ 300 mmHg
                    <br />
                    • **Moderate:** 100 &lt; P/F ≤ 200 mmHg
                    <br />
                    • **Severe:** P/F ≤ 100 mmHg
                    <br />
                    *Also requires bilateral opacities on imaging not fully explained by
                    effusion/collapse, and non-cardiogenic edema source.*
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Physiology Buckets */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧠 Physiology Buckets by Primary Disorder
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-rose-600 uppercase tracking-widest mb-6">
              A) Metabolic Acidosis
            </h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  High AG (HAGMA)
                </p>
                <ul className="text-[11px] font-medium text-slate-400 space-y-1">
                  <li>• ↑ Acid Production: Lactate, ketoacids, toxins</li>
                  <li>• ↓ Acid Excretion: Advanced renal failure</li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  Normal AG (NAGMA)
                </p>
                <ul className="text-[11px] font-medium text-slate-400 space-y-1">
                  <li>• GI HCO3 Loss: Diarrhoea, fistulae</li>
                  <li>• Renal HCO3 Loss: RTA (1, 2, 4)</li>
                  <li>• Dilutional: Large saline loads</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6">
              B) Metabolic Alkalosis
            </h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  Chloride-Responsive (UCl &lt;20)
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  Vomiting, NG suction, post-hypercapnia, early diuretics.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  Chloride-Resistant (UCl ≥20)
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  Conn’s/Cushing’s, severe K+/Mg2+ deficiency, chronic diuretics.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-6">
              C) Respiratory Acidosis
            </h4>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
              Hypoventilation: CNS depression (sedatives), neuromuscular (GBS, myasthenia), airway
              (COPD, asthma), chest wall restriction.
            </p>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-amber-600 uppercase tracking-widest mb-6">
              D) Respiratory Alkalosis
            </h4>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
              Hyperventilation: anxiety/pain, hypoxaemia (PE, pneumonia), pregnancy, sepsis, liver
              failure, early salicylates.
            </p>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧩 Pattern Recognition (Classic Mixed Disorders)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              t: 'DKA',
              d: 'HAGMA + Respiratory Alkalosis (if sepsis) or NAGMA (if saline resuscitation).'
            },
            {
              t: 'COPD Exacerbation',
              d: 'Respiratory Acidosis ± Metabolic Alkalosis (from diuretics or compensation).'
            },
            { t: 'Salicylate Toxicity', d: 'Mixed Respiratory Alkalosis + HAGMA (classic).' },
            { t: 'Massive Diarrhoea', d: 'NAGMA + Hypokalaemia.' },
            { t: 'Post-Hypercapnic', d: 'Met Alkalosis after ventilating chronic retainers.' }
          ].map((pattern) => (
            <div
              key={pattern.t}
              onClick={() => onInvestigationClick(pattern.t, 'ABG')}
              className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <p className="text-[10px] font-black text-blue-600 uppercase mb-2 flex items-center justify-between">
                {pattern.t}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-[12px] font-bold text-white leading-relaxed">{pattern.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags & Pitfalls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="p-10 bg-rose-900 text-white rounded-[50px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-950/40/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-400" />
              🚨 Do-Not-Miss (Escalation Triggers)
            </h4>
            <ul className="space-y-4">
              {[
                'pH ≤7.20 or ≥7.60 → Urgent senior review',
                'Lactate ≥4 mmol/L or rising → Resuscitation pathway',
                'PaCO2 rising with drowsiness (CO2 narcosis) → Ventilatory support',
                'Toxic alcohol/salicylate suspicion → Poison centre',
                'Severe hyperkalaemia with acidosis → Cardiac monitoring',
                'Rapidly worsening ABG despite therapy → ICU/Anaesthetics'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-10 bg-slate-900 text-white rounded-[50px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-950/200/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2 text-blue-400">
              <BrainCircuit className="w-4 h-4" />
              ⚠️ Common Pitfalls
            </h4>
            <ul className="space-y-4">
              {[
                '“Normal lactate” early in shock → Trends matter',
                'Overcalling compensation → Think mixed disorder',
                'Treating numbers rather than physiology',
                'Ignoring albumin correction for anion gap',
                'Assuming all alkalosis is vomiting/diuretics',
                'Assuming all acid-base issues are isolated'
              ].map((pitfall) => (
                <li
                  key={pitfall}
                  className="flex items-center gap-3 text-[12px] font-bold text-slate-300"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  {pitfall}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What To Do Next */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          📌 What To Do Next (Minimalist, Context-Agnostic)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">
              Confirm & Monitor
            </p>
            <p className="text-[12px] font-medium text-slate-400 leading-relaxed mb-4">
              Confirm sample type, O2 delivery/FiO2, delay/air bubbles. Consider repeat ABG/VBG.
            </p>
            <div className="p-4 bg-slate-950/20 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                Imaging & Monitoring
              </p>
              <p className="text-[11px] font-bold text-slate-350">
                CXR (Ventilation/Aspiration), Capnography where applicable.
              </p>
            </div>
            <p className="text-[11px] font-black text-rose-600 uppercase mt-6 flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Escalate: Any red-flag criteria or clinical discordance.
            </p>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">
              Targeted Labs
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-rose-600 uppercase mb-1">HAGMA</p>
                <p className="text-[11px] font-medium text-slate-400">
                  Lactate, ketones, osmolar gap, toxicology (salicylate, ethanol, methanol proxy),
                  renal panel.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1">NAGMA</p>
                <p className="text-[11px] font-medium text-slate-400">
                  Urine anion gap or ammonium proxy, urine chloride, UECs (K+).
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Alkalosis</p>
                <p className="text-[11px] font-medium text-slate-400">
                  Urine chloride, K+/Mg2+, renin/aldosterone if persistent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Worked Cases */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧪 Worked Cases (Bedside Practice)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: 'Case 1: Pure HAGMA (DKA)',
              d: 'pH 7.18, PaCO2 28, HCO3 10, Na 134, Cl 98, Alb 40.',
              a: 'AG 26. Winter’s Exp PaCO2 23 ± 2. Measured 28 (mild resp acidosis). Pure HAGMA (Δ–Δ = 0).'
            },
            {
              t: 'Case 2: NAGMA (Diarrhoea)',
              d: 'pH 7.32, PaCO2 34, HCO3 17, Na 140, Cl 113.',
              a: 'AG 10 (Normal). Hyperchloraemic acidosis. Check UAG: Neg → GI loss; Pos → RTA.'
            },
            {
              t: 'Case 3: Mixed (Salicylates)',
              d: 'pH 7.45, PaCO2 18, HCO3 12, Na 140, Cl 100.',
              a: 'AG 28 (High). Resp alkalosis + HAGMA. Classic salicylate pattern.'
            }
          ].map((c) => (
            <div
              key={c.t}
              onClick={() => onInvestigationClick(c.t, 'ABG')}
              className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm flex flex-col cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group"
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
          🧾 One-Pager Summary (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Algorithm</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              pH → Primary → Compensation → AG → Δ–Δ → Oxygenation → Red Flags.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Key Formulae</p>
            <ul className="text-[11px] font-bold text-slate-400 space-y-1">
              <li>Winter: (1.5×HCO3 + 8)</li>
              <li>AG: Na - (Cl + HCO3)</li>
              <li>A-a: PAO2 - PaO2</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Red Flags</p>
            <ul className="text-[11px] font-bold text-rose-600 space-y-1">
              <li>pH ≤7.20</li>
              <li>Lactate ≥4</li>
              <li>CO2 Narcosis</li>
              <li>Toxic Suspicion</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Next Steps</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Confirm sample, targeted labs (Ketones, Osm Gap, Tox), CXR, Capnography.
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
          <li>1. RCPA Manual. Acid–base interpretation and ABG overview. [Online].</li>
          <li>2. Therapeutic Guidelines (Australia). Emergency and toxicology sections.</li>
          <li>
            3. Adrogue HJ, Madias NE. Management of life-threatening acid-base disorders. N Engl J
            Med. 1998;338(1):26–34.
          </li>
          <li>4. Kellum JA. Disorders of acid-base balance. Crit Care Med. 2007;35(11):2630–6.</li>
          <li>
            5. Anderson LE, Henrich WL. Alkalemia-associated morbidity and mortality. Am J Med.
            1987;82(6):1034–8.
          </li>
          <li>6. Gennari FJ. Acid-base disorders. N Engl J Med. 2015;372(19):1859–63.</li>
          <li>
            7. Berend K, de Vries APJ, Gans ROB. Physiological approach to assessment of acid–base
            disturbances. N Engl J Med. 2014;371:1434–45.
          </li>
          <li>8. The ARDS Definition Task Force. Berlin definition. JAMA. 2012;307(23):2526–33.</li>
        </ul>
      </div>
    </div>
  );
};
