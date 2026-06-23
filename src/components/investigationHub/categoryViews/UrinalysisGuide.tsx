import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const UrinalysisGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Algorithm */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              Urinalysis
            </h3>
            <p className="text-slate-400 font-medium mt-1">
              Dipstick & Microscopy Guide • v0.4 Draft
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Renal
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Urology
            </span>
          </div>
        </div>

        <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Systematic Dipstick Review
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                s: '1. Infection Markers',
                d: 'Leukocytes & Nitrites. (Nitrites highly specific for Enterobacteriaceae).',
                c: 'text-emerald-600'
              },
              {
                s: '2. Blood & Protein',
                d: 'Haematuria (Stones/Cancer/GN) & Proteinuria (Nephrotic/Pre-eclampsia).',
                c: 'text-emerald-600'
              },
              {
                s: '3. Metabolic',
                d: 'Glucose & Ketones (Diabetes/DKA/Starvation). Bilirubin (Obstruction).',
                c: 'text-emerald-600'
              }
            ].map((step) => (
              <div
                key={step.s}
                onClick={() => onInvestigationClick(step.s, 'Urinalysis')}
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

      {/* Physiology Buckets */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧠 Physiology Buckets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6">
              A) Glomerular Integrity
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Proteinuria</p>
                <p className="text-[11px] font-medium text-slate-400">
                  Leaky basement membrane. Think Nephrotic Syndrome or Pre-eclampsia.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Haematuria</p>
                <p className="text-[11px] font-medium text-slate-400">
                  Glomerular (dysmorphic RBCs) vs Non-glomerular (stones/cancer).
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-6">
              B) Tubular &amp; Metabolic
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Glycosuria</p>
                <p className="text-[11px] font-medium text-slate-400">
                  Exceeding renal threshold (DM) or tubular defect (Fanconi).
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Specific Gravity
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Reflects concentration. High (Dehydration), Low (Diabetes Insipidus).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧩 Pattern Recognition (Microscopy Casts)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              t: 'Red Cell Casts',
              d: 'Glomerulonephritis / Nephritic Syndrome (Active sediment).'
            },
            { t: 'White Cell Casts', d: 'Acute Pyelonephritis or Tubulointerstitial Nephritis.' },
            { t: 'Granular Casts', d: 'Acute Tubular Necrosis (ATN) - "Muddy brown" casts.' },
            {
              t: 'Hyaline Casts',
              d: 'Nonspecific. Can be normal, or seen in dehydration/exercise.'
            }
          ].map((pattern) => (
            <div
              key={pattern.t}
              onClick={() => onInvestigationClick(pattern.t, 'Urinalysis')}
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
            🚨 Urinalysis Red Flags
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                'Gross / Visible Haematuria in > 40y → Urgent cystoscopy (rule out malignancy)',
                'Glucose + Ketones 3+ → Impending DKA / HHS risk',
                'Protein 3+ in Pregnancy → Pre-eclampsia assessment',
                'Red Cell Casts + rising Creatinine → Rapidly Progressive GN'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                'Waxy / Broad Casts → Chronic Kidney Disease',
                'Positive Nitrites in Pregnancy → Treat even if asymptomatic',
                'Heavy Proteinuria in child → Nephrotic Syndrome (Steroids)',
                'Sterile Pyuria (Leuks but no growth) → Think TB / Stones / Partially treated UTI'
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
          🧪 Worked Cases (Urinalysis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: 'Case 1: The Dysuric Patient',
              d: 'Leuks 3+, Nitrites Pos, Blood 1+. Patient has frequency and suprapubic pain.',
              a: 'Diagnosis: Acute Cystitis (UTI). Start empirical antibiotics.'
            },
            {
              t: 'Case 2: The Swollen Ankles',
              d: 'Protein 4+, Blood Neg, Glucose Neg. BP 110/70. Low Serum Albumin.',
              a: 'Diagnosis: Likely Nephrotic Syndrome. Needs 24h protein / ACR.'
            },
            {
              t: 'Case 3: The Tea-Colored Urine',
              d: 'Blood 3+, Protein 2+. Microscopy: Red Cell Casts and Dysmorphic RBCs.',
              a: 'Diagnosis: Acute Glomerulonephritis (Nephritic Syndrome).'
            }
          ].map((c) => (
            <div
              key={c.t}
              onClick={() => onInvestigationClick(c.t, 'Urinalysis')}
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
          🧾 Urinalysis One-Pager (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Dipstick Basics</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Leuks/Nitrites (UTI), Blood/Protein (Renal), Glucose/Ketones (Metabolic).
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Casts Guide</p>
            <ul className="text-[11px] font-bold text-slate-400 space-y-1">
              <li>RBC Casts: GN</li>
              <li>WBC Casts: Pyelonephritis</li>
              <li>Granular: ATN</li>
              <li>Hyaline: Normal/Dehydration</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Red Flags</p>
            <ul className="text-[11px] font-bold text-rose-600 space-y-1">
              <li>Visible Haematuria &gt; 40y</li>
              <li>Pregnancy + Proteinuria</li>
              <li>DKA (Glu + Ket)</li>
              <li>Red Cell Casts</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Always correlate with microscopy. Dipstick is a screening tool, not a diagnosis.
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
            1. Simerville JA, et al. Urinalysis: A Comprehensive Review. Am Fam Physician.
            2005;71(6):1153-1162.
          </li>
          <li>
            2. NICE Guidelines. Urinary tract infection (lower): antimicrobial prescribing (NG109).
          </li>
          <li>3. KDIGO Clinical Practice Guideline for Glomerular Diseases. 2021.</li>
        </ul>
      </div>
    </div>
  );
};
