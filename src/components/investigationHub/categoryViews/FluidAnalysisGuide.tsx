import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const FluidAnalysisGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Algorithm */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              Fluid Analysis
            </h3>
            <p className="text-slate-400 font-medium mt-1">
              Pleural, Ascitic & CSF Guide • v0.4 Draft
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Biochem
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Micro
            </span>
          </div>
        </div>

        <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Pleural Fluid: Light's Criteria (Sensitivity ~98%, Specificity ~83%)
          </h4>
          <p className="text-[12px] text-emerald-300/80 mb-6 font-medium italic">
            Exudate if ANY of the following are true. *Note: In patients on diuretics, Light's
            criteria may falsely classify transudates as exudates (up to 20% of cases). In these
            patients, if the serum-to-fluid albumin gradient is &gt; 12 g/L or protein gradient is
            &gt; 31 g/L, the fluid is likely a transudate.*
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                s: '1. Protein Ratio',
                d: 'Fluid Protein / Serum Protein > 0.5 (LR+ ~5.8, LR- ~0.04)',
                c: 'text-emerald-400'
              },
              {
                s: '2. LDH Ratio',
                d: 'Fluid LDH / Serum LDH > 0.6 (LR+ ~5.1, LR- ~0.05)',
                c: 'text-emerald-400'
              },
              {
                s: '3. LDH Absolute',
                d: 'Fluid LDH > 2/3 upper limit of normal serum LDH (LR+ ~4.9, LR- ~0.08)',
                c: 'text-emerald-400'
              }
            ].map((step) => (
              <div
                key={step.s}
                onClick={() => onInvestigationClick(step.s, 'Fluid Analysis')}
                className="p-4 bg-slate-950/40 border border-emerald-950/30 rounded-2xl cursor-pointer hover:border-emerald-500 hover:shadow-sm transition-all group"
              >
                <p
                  className={`text-[10px] font-black uppercase tracking-widest ${step.c} mb-2 flex items-center justify-between`}
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
          🧠 Physiology Buckets (Fluid Types)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-4">
              A) Ascitic Fluid (SAAG) (Sensitivity ~97% for Portal HTN)
            </h4>
            <p className="text-[12px] font-black text-white mb-4">
              SAAG = Serum Albumin - Ascitic Albumin
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase mb-1">
                  High SAAG (≥ 11 g/L)
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Portal Hypertension: Cirrhosis, Heart Failure, Budd-Chiari, Constrictive
                  Pericarditis. *If serum albumin is &lt; 11 g/L, SAAG is unreliable; use Ascitic
                  Fluid Total Protein (AFTP) instead (AFTP &gt; 25 g/L suggests cardiac failure or
                  peritoneal disease).*
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase mb-1">
                  Low SAAG (&lt; 11 g/L)
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Non-Portal HTN: Peritoneal Carcinomatosis, TB Peritonitis, Nephrotic Syndrome,
                  Pancreatitis, Biliary Leak.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-4">
              B) CSF Analysis
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase mb-1">
                  Bacterial Meningitis (CSF/Serum Glucose &lt; 0.4: Sens ~80%, Spec ~98%)
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  High Opening Pressure (&gt; 20-25 cmH2O), Polymorphonuclear (PMN) Leukocytosis
                  (&gt; 1000/mcL), Low Glucose (&lt; 2.2 mmol/L), High Protein (&gt; 2.2 g/L).
                  Lactate &gt; 4.0 mmol/L is highly predictive (Sens ~88%, Spec ~96%).
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase mb-1">
                  Viral / Aseptic Meningitis
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  Normal/Slightly Elevated Opening Pressure, Lymphocytic Pleocytosis (&lt; 500/mcL),
                  Normal Glucose, Normal/Slightly High Protein.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧩 Pattern Recognition (Fluid Findings)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { t: 'Chylothorax', d: 'Milky pleural fluid with Triglycerides > 1.2 mmol/L.' },
            { t: 'Empyema', d: 'Pus-like pleural fluid, pH < 7.2, Low Glucose, High LDH.' },
            { t: 'SBP', d: 'Ascitic Neutrophils > 250 cells/mm³. Needs urgent antibiotics.' },
            { t: 'Xanthochromia', d: 'Yellow CSF (bilirubin) suggesting Subarachnoid Hemorrhage.' },
            { t: 'Pancreatic Ascites', d: 'High Ascitic Amylase (> 1000 U/L).' },
            { t: 'TB Pleurisy', d: 'Exudative fluid with high Lymphocytes and high ADA.' }
          ].map((pattern) => (
            <div
              key={pattern.t}
              onClick={() => onInvestigationClick(pattern.t, 'Fluid Analysis')}
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
            🚨 Fluid Red Flags (Immediate Action)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                'CSF: Gram stain positive for organisms → Immediate IV Abx',
                'Ascites: Neutrophils > 250 (SBP) → Start Cefotaxime',
                'Pleural: pH < 7.2 (Empyema) → Needs Chest Drain',
                'CSF: High opening pressure + papilloedema → Risk of herniation'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                'Pleural: Grossly bloody fluid → Think Malignancy / PE / Trauma',
                'Ascites: Low glucose / High LDH → Think Secondary Peritonitis',
                'CSF: Low glucose + High protein → Bacterial or TB Meningitis',
                'Fluid: Malignant cells on cytology → Oncology referral'
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

      {/* One-Pager Summary */}
      <div className="p-12 bg-slate-950/20 border border-white/5 rounded-[60px]">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-10 text-center">
          🧾 Fluid One-Pager (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Light's Criteria</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Protein &gt; 0.5, LDH &gt; 0.6, or LDH &gt; 2/3 ULN = Exudate.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">SAAG (Ascites)</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              ≥ 11: Portal HTN. &lt; 11: Non-portal (Malignancy/TB).
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">CSF Basics</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Bacterial: Neutrophils/Low Glu. Viral: Lymphs/Normal Glu.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Always send for Culture, Cytology, and Biochem simultaneously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
