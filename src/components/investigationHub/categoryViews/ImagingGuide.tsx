import React from 'react';
import { Zap, Info, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const ImagingGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Algorithm */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              Imaging Interpretation
            </h3>
            <p className="text-slate-400 font-medium mt-1">Systematic Analysis • v0.4 Draft</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Radiology
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Diagnostics
            </span>
          </div>
        </div>

        <div className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl">
          <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
            <span className="text-white not-italic font-black uppercase mr-2">Disclaimer:</span>
            Imaging must always be interpreted in clinical context. A "normal" report does not
            exclude pathology if clinical suspicion remains high. Always compare with prior imaging.
          </p>
        </div>

        <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Algorithm (The Pre-Read + Systematic Flow)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                s: '1. Context',
                d: 'Patient ID, Date/Time, Modality, Projection (AP/PA), Contrast?',
                c: 'text-emerald-600'
              },
              {
                s: '2. Adequacy',
                d: 'RIPE: Rotation, Inspiration, Penetration, Exposure.',
                c: 'text-emerald-600'
              },
              {
                s: '3. Systematic',
                d: 'ABCDE (CXR), ABcS (MSK), Blood Can Be Very Bad (CT Head).',
                c: 'text-emerald-600'
              },
              {
                s: '4. Comparison',
                d: 'Old films are the most valuable tool in radiology.',
                c: 'text-emerald-600'
              },
              {
                s: '5. Corners',
                d: 'Specifically look at the edges (apices, costophrenic angles).',
                c: 'text-emerald-600'
              },
              {
                s: '6. Hardware',
                d: 'Check position of tubes, lines, and pacemakers.',
                c: 'text-emerald-600'
              },
              {
                s: '7. Conclusion',
                d: 'Does the finding answer the clinical question?',
                c: 'text-emerald-600'
              },
              {
                s: '8. Red Flags',
                d: 'Tension, Aortic widening, Free air, Midline shift.',
                c: 'text-rose-600'
              }
            ].map((step) => (
              <div key={step.s} className="space-y-2">
                <p className={`text-[10px] font-black uppercase tracking-widest ${step.c}`}>
                  {step.s}
                </p>
                <p className="text-[12px] font-bold text-white leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Physiology & Physics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            ⚛️ Physics & Contrast Basics
          </h4>
          <div className="space-y-4">
            {[
              { l: 'Density', d: 'Air (black) → Fat → Water/Soft Tissue → Bone → Metal (white).' },
              {
                l: 'Hounsfield',
                d: 'CT units: Air -1000, Water 0, Bone +1000, Acute Blood +60-80.'
              },
              { l: 'Contrast', d: 'IV (vessels/organs), Oral (bowel), Rectal (distal colon).' },
              { l: 'Radiation', d: 'CXR (0.1 mSv) vs CT Chest (7-8 mSv) vs CT Aorta (15+ mSv).' }
            ].map((item) => (
              <div key={item.l} className="flex gap-4 group">
                <span className="w-16 text-[11px] font-black text-white shrink-0 group-hover:text-emerald-600 transition-colors">
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
            Common Pitfalls (⚠️)
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                t: 'Satisfaction',
                d: 'Stopping after finding one abnormality (e.g. ignoring the 2nd fracture).'
              },
              { t: 'AP vs PA', d: 'AP films falsely enlarge the heart (cardiomegaly mimic).' },
              { t: 'Rotation', d: 'Can mimic mediastinal shift or lung zone asymmetry.' },
              {
                t: 'Over-reliance',
                d: 'Treating the report rather than the patient’s clinical state.'
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

      {/* Core Modalities */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🖼️ Core Modalities (Systematic Approaches)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            onClick={() => onInvestigationClick('Chest X-Ray')}
            className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm cursor-pointer hover:border-emerald-500/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">
                A) Chest X-Ray (ABCDE)
              </h4>
              <ArrowRight className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="text-[11px] font-medium text-slate-400 space-y-3">
              <li>
                <span className="font-black text-white">Airway:</span> Trachea midline, carina,
                paratracheal stripes.
              </li>
              <li>
                <span className="font-black text-white">Breathing:</span> Lung zones, pleura,
                costophrenic angles.
              </li>
              <li>
                <span className="font-black text-white">Circulation:</span> Heart size (CTR
                &lt;0.5), aortic knuckle, hilum.
              </li>
              <li>
                <span className="font-black text-white">Diaphragm:</span> Flattening, free air,
                gastric bubble.
              </li>
              <li>
                <span className="font-black text-white">Everything Else:</span> Bones, soft tissues,
                tubes/lines.
              </li>
            </ul>
          </div>

          <div
            onClick={() => onInvestigationClick('CT Head')}
            className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm cursor-pointer hover:border-blue-500/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">
                B) CT Head (Blood Can Be Very Bad)
              </h4>
              <ArrowRight className="w-3 h-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="text-[11px] font-medium text-slate-400 space-y-3">
              <li>
                <span className="font-black text-white">Blood:</span> Acute (white), Subacute
                (grey), Chronic (black).
              </li>
              <li>
                <span className="font-black text-white">Cisterns:</span> Suprasellar, ambient,
                quadrigeminal.
              </li>
              <li>
                <span className="font-black text-white">Brain:</span> Sulci, grey-white
                differentiation, midline shift.
              </li>
              <li>
                <span className="font-black text-white">Ventricles:</span> Hydrocephalus,
                effacement.
              </li>
              <li>
                <span className="font-black text-white">Bone:</span> Fractures, sinus fluid levels.
              </li>
            </ul>
          </div>

          <div
            onClick={() => onInvestigationClick('MSK X-Ray')}
            className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm cursor-pointer hover:border-amber-500/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-amber-600 uppercase tracking-widest">
                C) MSK X-Ray (ABcS)
              </h4>
              <ArrowRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="text-[11px] font-medium text-slate-400 space-y-3">
              <li>
                <span className="font-black text-white">Alignment:</span> Joint spaces, anatomical
                lines.
              </li>
              <li>
                <span className="font-black text-white">Bone:</span> Cortical continuity, density,
                periosteal reaction.
              </li>
              <li>
                <span className="font-black text-white">Cartilage:</span> Joint narrowing,
                chondrocalcinosis.
              </li>
              <li>
                <span className="font-black text-white">Soft Tissues:</span> Swelling, effusions
                (sail sign), fat pads.
              </li>
            </ul>
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
              t: 'CT Head for Acute SAH',
              d: 'Non-contrast CT head within 6 hours of headache onset: Sensitivity ~98.5% (LR- ~0.015), Specificity ~100%. Drops to ~90% at 24 hours, necessitating lumbar puncture for xanthochromia if clinical suspicion is high.'
            },
            {
              t: 'CTPA for Pulmonary Embolism',
              d: 'CT Pulmonary Angiography (PIOPED II): Sensitivity ~83%, Specificity ~96% (LR+ ~20, LR- ~0.17). A negative CTPA combined with low clinical probability safely rules out PE.'
            },
            {
              t: 'CXR vs. US for Pneumothorax',
              d: 'Upright CXR: Sensitivity ~50%, Specificity ~99%. Supine CXR is extremely insensitive (~20%). Bedside Lung Ultrasound (seeking absence of lung sliding, B-lines, and presence of a lung point): Sensitivity ~90%, Specificity ~98%.'
            },
            {
              t: 'CXR for Pneumonia/Infiltrate',
              d: 'Detection of lobar or patchy consolidation: Sensitivity ~75-85% (decreased in early dehydration or neutropenia), Specificity ~85-90% (mimicked by atelectasis, hemorrhage, or ARDS).'
            },
            {
              t: 'CT Abdomen for Acute Appendicitis',
              d: 'Contrast-enhanced CT abdomen/pelvis: Sensitivity ~95%, Specificity ~95% (LR+ ~19, LR- ~0.05). Exceeds ultrasound (Sens ~85%, Spec ~90%, highly operator-dependent).'
            },
            {
              t: 'Rigler’s & Free Air (CXR)',
              d: "Erect CXR detecting pneumoperitoneum: Sensitivity ~80% for free air (can detect as little as 1 mL of air). Rigler's sign (air outlining both sides of bowel wall) is diagnostic of massive perforation."
            }
          ].map((pattern) => (
            <div
              key={pattern.t}
              onClick={() => onInvestigationClick(pattern.t)}
              className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl shadow-sm cursor-pointer hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black text-emerald-400 uppercase">{pattern.t}</p>
                <ArrowRight className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
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
            🚨 Radiology Red Flags (Immediate Escalation)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                'Tension Pneumothorax (Tracheal shift + Flattened diaphragm)',
                'Widened Mediastinum (>8cm on PA) → Aortic Dissection',
                'Free Air under Diaphragm → Bowel Perforation',
                'Midline Shift on CT Head → Mass effect / Herniation'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                'Epi/Subdural Haematoma → Neurosurgical emergency',
                'Large Pulmonary Embolism (Saddle) → Right heart strain',
                'Malpositioned ET Tube (Right mainstem or Oesophageal)',
                'Acute Limb Ischaemia (Absent flow on Doppler/CTA)'
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
          🧪 Worked Cases (Image Analysis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: 'Case 1: Dyspnoea & Fever',
              d: 'CXR: Right lower zone opacity obscuring the right hemidiaphragm.',
              a: 'Diagnosis: Right Lower Lobe Pneumonia (Positive Silhouette Sign).'
            },
            {
              t: 'Case 2: Sudden Pleuritic Pain',
              d: 'CXR: Visible visceral pleural line, absent lung markings peripherally.',
              a: 'Diagnosis: Pneumothorax. Check for tracheal shift (Tension).'
            },
            {
              t: 'Case 3: Trauma & Drowsiness',
              d: 'CT Head: Crescent-shaped hyperdensity crossing suture lines.',
              a: 'Diagnosis: Subdural Haematoma. Check for midline shift.'
            }
          ].map((c) => (
            <div
              key={c.t}
              onClick={() => onInvestigationClick(c.t, 'Imaging')}
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
          🧾 Radiology One-Pager (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Algorithm</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Context → RIPE → ABCDE/ABcS → Comparison → Corners → Hardware → Conclusion.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Densities</p>
            <ul className="text-[11px] font-bold text-slate-400 space-y-1">
              <li>Air: Black</li>
              <li>Fat: Dark Grey</li>
              <li>Fluid/Soft Tissue: Grey</li>
              <li>Bone/Metal: White</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Red Flags</p>
            <ul className="text-[11px] font-bold text-rose-600 space-y-1">
              <li>Tension PTX</li>
              <li>Free Air (Perforation)</li>
              <li>Midline Shift</li>
              <li>Aortic Widening</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Check the corners. One view is no view. Treat the patient, not the scan.
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
          <li>1. Herring W. Learning Radiology: Recognizing the Basics. 4th ed. Elsevier; 2019.</li>
          <li>2. Radiology Assistant. Systematic approach to CXR and CT Head. [Online].</li>
          <li>
            3. Fleischner Society. Guidelines for management of incidental pulmonary nodules.
            Radiology. 2017;284(1):228-243.
          </li>
          <li>4. NICE Guidelines. Head injury: assessment and early management (CG176).</li>
        </ul>
      </div>
    </div>
  );
};
