import React from 'react';
import { Zap, Info, ArrowRight } from 'lucide-react';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const LabsGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Algorithm */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              Laboratory Medicine
            </h3>
            <p className="text-slate-400 font-medium mt-1">
              Biochemistry & Haematology Guide • v0.4 Draft
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Biochem
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Haem
            </span>
          </div>
        </div>

        <div className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl">
          <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
            <span className="text-white not-italic font-black uppercase mr-2">Disclaimer:</span>
            Reference ranges vary by laboratory. Always interpret results in the context of the
            patient's clinical state and baseline values.
          </p>
        </div>

        <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Systematic Lab Review
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                s: '1. FBC',
                d: 'Hb (Anaemia), WCC (Infection/Inflam), Plt (Consumption).',
                c: 'text-emerald-600'
              },
              {
                s: '2. UEC',
                d: 'Na/K (Electrolytes), Cr/Urea (Renal function/AKI).',
                c: 'text-emerald-600'
              },
              {
                s: '3. LFT',
                d: 'ALT/AST (Hepatocellular), ALP/GGT (Cholestatic).',
                c: 'text-emerald-600'
              },
              {
                s: '4. Inflam',
                d: 'CRP/ESR (Acute phase response). Procalcitonin (Sepsis).',
                c: 'text-emerald-600'
              }
            ].map((step) => (
              <div
                key={step.s}
                onClick={() => onInvestigationClick(step.s, 'Laboratory Medicine')}
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

      {/* Core Formulae */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🔢 Core Lab Formulae
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            onClick={() => onInvestigationClick('Corrected Calcium Formula', 'Laboratory Medicine')}
            className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-6 flex items-center justify-between">
              Corrected Calcium
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-[12px] font-black text-white mb-4">
              Ca_corr = Ca_meas + 0.02 × (40 - Albumin)
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              Essential for interpreting calcium in hypoalbuminaemia (e.g., chronic disease,
              malnutrition).
            </p>
          </div>

          <div
            onClick={() => onInvestigationClick('Osmolar Gap Formula', 'Laboratory Medicine')}
            className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center justify-between">
              Osmolar Gap
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-[12px] font-black text-white mb-4">
              Gap = Osm_meas - [2×Na + Urea + Glucose]
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              Gap &gt; 10 mOsm/kg suggests unmeasured osmol (e.g., Ethanol, Methanol, Ethylene
              Glycol).
            </p>
          </div>
        </div>
      </div>

      {/* Physiology Buckets */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧠 Physiology Buckets (Differential Diagnosis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-rose-600 uppercase tracking-widest mb-6">
              A) Anaemia (by MCV)
            </h4>
            <div className="space-y-6">
              <div
                onClick={() => onInvestigationClick('Microcytic Anaemia', 'Laboratory Medicine')}
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center justify-between">
                  Microcytic (&lt;80)
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  Iron deficiency (TICS: Toxins, Iron, Chronic, Sideroblastic), Thalassemia.
                </p>
              </div>
              <div
                onClick={() => onInvestigationClick('Normocytic Anaemia', 'Laboratory Medicine')}
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center justify-between">
                  Normocytic (80-100)
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  Acute blood loss, Chronic disease, Renal failure, Haemolysis.
                </p>
              </div>
              <div
                onClick={() => onInvestigationClick('Macrocytic Anaemia', 'Laboratory Medicine')}
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center justify-between">
                  Macrocytic (&gt;100)
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  B12/Folate deficiency, Alcohol, Liver disease, Hypothyroidism, MDS.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6">
              B) Hyponatraemia (by Vol Status)
            </h4>
            <div className="space-y-6">
              <div
                onClick={() =>
                  onInvestigationClick('Hypovolaemic Hyponatraemia', 'Laboratory Medicine')
                }
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center justify-between">
                  Hypovolaemic
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  Diuretics, Vomiting/Diarrhoea, Addison's, Burns.
                </p>
              </div>
              <div
                onClick={() =>
                  onInvestigationClick('Euvolaemic Hyponatraemia', 'Laboratory Medicine')
                }
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center justify-between">
                  Euvolaemic
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  SIADH, Hypothyroidism, Polydipsia, Beer Potomania.
                </p>
              </div>
              <div
                onClick={() =>
                  onInvestigationClick('Hypervolaemic Hyponatraemia', 'Laboratory Medicine')
                }
                className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center justify-between">
                  Hypervolaemic
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                  Heart Failure, Cirrhosis, Nephrotic Syndrome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧩 Pattern Recognition & Diagnostic Accuracy Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              t: 'High-Sensitivity Troponin T (hs-cTnT)',
              d: 'Rule-out of AMI at 0h/1h (cTnT below threshold): Sensitivity ~99% (LR- ~0.01). Rule-in (significant delta rise): Specificity ~95% (LR+ ~15).'
            },
            {
              t: 'D-Dimer (with Age-Adjustment)',
              d: 'Rule-out of PE/DVT: Sensitivity ~97% (LR- ~0.05), Specificity ~40%. Age-adjusted cut-off (Age × 10 mcg/L for >50 years old) increases specificity to ~60% without losing sensitivity.'
            },
            {
              t: 'Procalcitonin (Sepsis)',
              d: 'Marker for systemic bacterial infection: Sensitivity ~77%, Specificity ~79% (LR+ ~3.7, LR- ~0.29). Superior to CRP for differentiating bacterial vs. viral etiology.'
            },
            {
              t: 'NT-proBNP (Acute Heart Failure)',
              d: 'NT-proBNP < 300 pg/mL has negative predictive value ~98% to rule out acute heart failure (LR- ~0.06). Age-adjusted rule-in thresholds: >450 (<50 yrs), >900 (50-75 yrs), >1800 (>75 yrs).'
            },
            {
              t: 'Pre-Renal AKI vs. ATN',
              d: 'Urea:Creatinine ratio > 100:1 (in μmol/L) or FeNa < 1% (Sens ~90%, Spec ~95% in absence of diuretics) indicates pre-renal etiology. FeNa > 2% suggests ATN.'
            },
            {
              t: 'Tumour Lysis Syndrome (Cairo-Bishop)',
              d: 'Requires ≥2 of: Urate > 476 μmol/L, Potassium > 6.0 mmol/L, Phosphate > 1.45 mmol/L, Calcium < 1.75 mmol/L (or 25% change from baseline).'
            }
          ].map((pattern) => (
            <div
              key={pattern.t}
              onClick={() => onInvestigationClick(pattern.t, 'Laboratory Medicine')}
              className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl shadow-sm cursor-pointer hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              <p className="text-[10px] font-black text-emerald-400 uppercase mb-2 flex items-center justify-between">
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
            🚨 Critical Lab Red Flags (Immediate Escalation)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                'Potassium < 2.5 or > 6.5 mmol/L → Arrhythmia risk',
                'Sodium < 120 or > 160 mmol/L → Osmotic demyelination / seizures',
                'Platelets < 10 x10^9/L → Spontaneous haemorrhage risk',
                'Neutrophils < 0.5 x10^9/L → Neutropenic sepsis risk'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                'Calcium < 1.6 or > 3.5 mmol/L → Tetany or Cardiac arrest risk',
                'Troponin rising significantly → Acute Coronary Syndrome',
                'INR > 5.0 with bleeding → Reversal protocol (Vit K + Prothromplex)',
                'Glucose < 3.0 mmol/L → Hypoglycaemia (IV Dextrose)'
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
          🧪 Worked Cases (Lab Interpretation)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: 'Case 1: Weakness & Fatigue',
              d: 'FBC: Hb 72 g/L, MCV 68 fL. Ferritin 5 ug/L.',
              a: 'Diagnosis: Microcytic Anaemia secondary to severe Iron Deficiency.'
            },
            {
              t: 'Case 2: Confusion & Vomiting',
              d: 'UEC: Na 115 mmol/L, Osm_serum 240, Osm_urine 450, Na_urine 45.',
              a: 'Diagnosis: Euvolaemic Hyponatraemia secondary to SIADH.'
            },
            {
              t: 'Case 3: Jaundice & Abdominal Pain',
              d: 'LFT: Bilirubin 85 umol/L, ALT 45 U/L, ALP 620 U/L, GGT 480 U/L.',
              a: 'Diagnosis: Cholestatic jaundice (likely biliary tract obstruction).'
            }
          ].map((c) => (
            <div
              key={c.t}
              onClick={() => onInvestigationClick(c.t, 'Laboratory Medicine')}
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
          🧾 Labs One-Pager (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Algorithm</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              FBC → UEC → LFT → Inflammatory Markers. Compare with baseline.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">
              Corrected Calcium
            </p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Measured Ca + 0.02 * (40 - Albumin).
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Red Flags</p>
            <ul className="text-[11px] font-bold text-rose-600 space-y-1">
              <li>K+ &lt; 2.5 or &gt; 6.5</li>
              <li>Na+ &lt; 120 or &gt; 160</li>
              <li>Plt &lt; 10, Neut &lt; 0.5</li>
              <li>Ca2+ &lt; 1.6 or &gt; 3.5</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Treat the patient, not the numbers. A rapid trend is worse than a static abnormal.
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
            1. McPherson RA, Pincus MR. Henry's Clinical Diagnosis and Management by Laboratory
            Methods. 23rd ed. Elsevier; 2016.
          </li>
          <li>2. Royal College of Pathologists of Australasia (RCPA). RCPA Manual. [Online].</li>
          <li>
            3. Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of
            hyponatraemia. Eur J Endocrinol. 2014;170(3):G1-G38.
          </li>
        </ul>
      </div>
    </div>
  );
};
