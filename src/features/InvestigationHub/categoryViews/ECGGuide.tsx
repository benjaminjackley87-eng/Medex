import React from 'react';
import { Zap, Info, ArrowRight, Activity } from 'lucide-react';
import MedImage from '../../../components/common/MedImage';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const ECGGuide: React.FC<CategoryGuideProps> = ({
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
              ECG Interpretation
            </h3>
            <p className="text-slate-400 font-medium mt-1">Electrophysiology Guide • v0.4 Draft</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Cardiology
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Physiology
            </span>
          </div>
        </div>

        <div className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl">
          <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
            <span className="text-white not-italic font-black uppercase mr-2">Disclaimer:</span>
            The ECG is a snapshot in time. Serial ECGs are mandatory if clinical suspicion of ACS
            remains. Always compare with prior tracings to identify new changes.
          </p>
        </div>

        {/* Waveform Morphology & Intervals */}
        <div className="space-y-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            📈 Waveform Morphology & Intervals
          </h3>
          <div className="bg-slate-950/40 border-2 border-white/5 rounded-[48px] p-8 md:p-12 shadow-sm overflow-hidden group">
            <div className="max-w-4xl mx-auto mb-12">
              <MedImage
                src="https://litfl.com/wp-content/uploads/2018/10/ECG-intervals-and-segments-diagram-LITFL.png"
                alt="ECG Waveform Intervals and Segments Diagram identifying P, QRS, T, U waves and PR, ST, QT, RR intervals"
                label="Waveform Diagram"
                config={{ size: 'full', position: 'top' }}
                className="w-full rounded-[32px] border border-white/5 shadow-xl"
                onEnlarge={onEnlargeImage}
              />
              <div className="mt-4 flex items-center gap-2 justify-center">
                <span className="text-[10px] font-bold text-slate-400 italic">
                  Source: Life in the Fast Lane (LITFL) • Standard Grid: 25mm/sec
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  l: 'P Wave',
                  d: 'Atrial depolarisation. Normal: < 120ms duration, < 2.5mm height.',
                  c: 'emerald'
                },
                {
                  l: 'PR Interval',
                  d: 'AV nodal conduction time. Normal: 120-200ms (3-5 small squares).',
                  c: 'blue'
                },
                {
                  l: 'QRS Complex',
                  d: 'Ventricular depolarisation. Normal: < 120ms (< 3 small squares).',
                  c: 'slate'
                },
                {
                  l: 'ST Segment',
                  d: 'Initial ventricular repolarisation phase. Should be isoelectric/flat.',
                  c: 'rose'
                },
                {
                  l: 'T Wave',
                  d: 'Ventricular repolarisation. Asymmetric; tall peaked in early ischaemia/high K+.',
                  c: 'amber'
                },
                {
                  l: 'QT Interval',
                  d: 'Total ventricular activity. Duration varies with rate (calculate QTc).',
                  c: 'purple'
                },
                {
                  l: 'J Point',
                  d: 'The junction where QRS ends and ST segment begins.',
                  c: 'indigo'
                },
                {
                  l: 'U Wave',
                  d: 'Late repolarisation (Purkinje). May be prominent in hypokalaemia.',
                  c: 'teal'
                },
                {
                  l: 'RR Interval',
                  d: 'Determines heart rate and rhythm regularity (R-R distance).',
                  c: 'rose'
                }
              ].map((item) => (
                <div
                  key={item.l}
                  className="p-6 bg-slate-950/20 border border-white/5 rounded-3xl hover:bg-slate-950/40 hover:border-emerald-500/20 hover:shadow-md transition-all"
                >
                  <h4
                    className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-${item.c}-600`}
                  >
                    {item.l}
                  </h4>
                  <p className="text-[13px] font-bold text-white leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Algorithm (The Rule of 6)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                s: '1. Rate',
                d: '300 / large squares between R waves. Tachy (>100) or Brady (<60).',
                c: 'text-emerald-600'
              },
              {
                s: '2. Rhythm',
                d: 'P-wave before every QRS? Regular or Irregular? (Check Lead II).',
                c: 'text-emerald-600'
              },
              {
                s: '3. Axis',
                d: 'Leads I & aVF. Normal, LAD (I+, aVF-), or RAD (I-, aVF+).',
                c: 'text-emerald-600'
              },
              {
                s: '4. Intervals',
                d: 'PR (120-200ms), QRS (<120ms), QTc (<440ms ♂ / <460ms ♀).',
                c: 'text-emerald-600'
              },
              {
                s: '5. Ischaemia',
                d: 'ST elevation/depression, T-wave inversion, Pathological Q-waves.',
                c: 'text-rose-600'
              },
              {
                s: '6. Hypertrophy',
                d: 'LVH (S in V1 + R in V5/V6 > 35mm). RVH (R > S in V1).',
                c: 'text-emerald-600'
              }
            ].map((step) => (
              <div
                key={step.s}
                onClick={() => onInvestigationClick(step.s, 'ECG')}
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

      {/* Physiology & Conduction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            ⚡ Conduction & Vectors
          </h4>
          <div className="space-y-4">
            {[
              { l: 'SA Node', d: 'Primary pacemaker (60-100 bpm). Located in RA.' },
              {
                l: 'AV Node',
                d: 'Gatekeeper. Delays signal (PR interval) for ventricular filling.'
              },
              {
                l: 'His-Purkinje',
                d: 'Rapid conduction via Bundle Branches to ventricular myocytes.'
              },
              {
                l: 'Vectors',
                d: 'Depolarisation towards a lead = Positive deflection (Upward wave).'
              }
            ].map((item) => (
              <div key={item.l} className="flex gap-4 group">
                <span className="w-20 text-[11px] font-black text-white shrink-0 group-hover:text-emerald-600 transition-colors">
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
              { t: 'Lead Reversal', d: 'Negative P & QRS in Lead I (mimics dextrocardia).' },
              { t: 'LBBB', d: 'Makes ST-segment interpretation difficult (use Sgarbossa).' },
              { t: 'Early Repol', d: 'Benign ST elevation in young patients (J-point notch).' },
              { t: 'Artifact', d: 'Tremor or loose leads mimicking VT or AF.' }
            ].map((caveat) => (
              <div key={caveat.t} className="flex gap-4">
                <span className="text-[10px] font-black text-rose-600 uppercase w-24 shrink-0">
                  {caveat.t}
                </span>
                <p className="text-[11px] font-bold text-rose-900/70">{caveat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Criteria */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          📏 Core Diagnostic Criteria
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-6">
              LVH (Sokolow-Lyon)
            </h4>
            <p className="text-[12px] font-bold text-white mb-4">S in V1 + R in V5 or V6 ≥ 35 mm</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Commonly associated with ST-T "strain" pattern (asymmetric T-wave inversion) in
              lateral leads.
            </p>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6">
              Sgarbossa (MI in LBBB)
            </h4>
            <ul className="text-[11px] font-medium text-slate-400 space-y-2">
              <li>• Concordant ST elevation ≥ 1mm (5 pts)</li>
              <li>• Concordant ST depression in V1-V3 ≥ 1mm (3 pts)</li>
              <li>• Discordant ST elevation ≥ 5mm (2 pts)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🧩 Pattern Recognition (LITFL Library Favorites)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              t: 'Wellens Syndrome',
              d: 'Deeply inverted or biphasic T-waves in V2-V3 (Critical LAD stenosis).'
            },
            {
              t: 'Brugada Pattern',
              d: 'Coved ST elevation + T-wave inversion in V1-V2 (Sudden cardiac death risk).'
            },
            {
              t: 'De Winter’s T',
              d: 'Upsloping ST depression + tall symmetric T-waves (Proximal LAD occlusion).'
            },
            {
              t: 'S1Q3T3',
              d: 'Deep S in I, Q in III, Inverted T in III (Sign of Right Heart Strain/PE).'
            },
            { t: 'Osborn Wave', d: 'J-point elevation / "hump" at end of QRS (Hypothermia).' },
            {
              t: 'Hyperkalaemia',
              d: 'Peaked T-waves → PR prolongation → Widened QRS → Sine wave.'
            },
            {
              t: 'Wandering Pacemaker',
              d: 'Irregular rhythm with ≥ 3 different P-wave morphologies.'
            },
            {
              t: 'Lown-Ganong-Levine',
              d: 'Short PR interval with normal QRS (Accessory pathway).'
            },
            {
              t: 'Ashman Phenomenon',
              d: 'Aberrant conduction following a long R-R interval then short R-R.'
            }
          ].map((pattern) => (
            <div
              key={pattern.t}
              onClick={() => onInvestigationClick(pattern.t)}
              className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl shadow-sm cursor-pointer hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black text-emerald-600 uppercase">{pattern.t}</p>
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
            🚨 ECG Red Flags (Immediate Action)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                'ST Elevation (STEMI) → Activate Cath Lab',
                'Ventricular Tachycardia (Wide complex, regular, fast)',
                '3rd Degree (Complete) Heart Block → Pacing required',
                'Torsades de Pointes (Polymorphic VT + Long QTc)'
              ].map((flag) => (
                <li key={flag} className="flex items-center gap-3 text-[12px] font-bold">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                'New LBBB in setting of chest pain → STEMI equivalent',
                'Bifascicular Block + Syncope → Impending complete block',
                'Hyperkalaemia Sine Wave → Immediate Calcium Gluconate',
                'Posterior MI (ST depression V1-V3) → Do posterior leads (V7-V9)'
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
          🧪 Worked Cases (ECG Analysis)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: 'Case 1: Chest Pain',
              d: 'ECG: Hyperacute T-waves in V1-V4, followed by 2mm ST elevation in V2-V4.',
              a: 'Diagnosis: Acute Anterior STEMI (LAD Occlusion). Activate Cath Lab.'
            },
            {
              t: 'Case 2: Syncope',
              d: 'ECG: Prolonged QT interval (QTc 520ms) with episodic polymorphic VT.',
              a: 'Diagnosis: Long QT Syndrome with Torsades de Pointes.'
            },
            {
              t: 'Case 3: Palpitations',
              d: 'ECG: Irregularly irregular rhythm, absent P-waves, variable ventricular rate.',
              a: 'Diagnosis: Atrial Fibrillation. Rate control and anticoagulate based on CHADS2.'
            }
          ].map((c) => (
            <div
              key={c.t}
              onClick={() => onInvestigationClick(c.t, 'ECG')}
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
          🧾 ECG One-Pager (Printable)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Algorithm</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Rate → Rhythm → Axis → Intervals → Ischaemia → Hypertrophy.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Standard Speeds</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              25mm/s: 1 small square = 40ms, 1 large square = 200ms.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Red Flags</p>
            <ul className="text-[11px] font-bold text-rose-600 space-y-1">
              <li>STEMI</li>
              <li>VT / VF</li>
              <li>3rd Degree Block</li>
              <li>Torsades</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Golden Rules</p>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
              Always compare with the old ECG. Treat the patient, not the trace.
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
            1. Goldberger AL, et al. Goldberger's Clinical Electrocardiography: A Simplified
            Approach. 9th ed. Elsevier; 2017.
          </li>
          <li>2. Life in the Fast Lane (LITFL). ECG Library. [Online].</li>
          <li>
            3. Sgarbossa EB, et al. Electrocardiographic diagnosis of acute myocardial infarction in
            the presence of left bundle-branch block. NEJM. 1996;334:481-487.
          </li>
          <li>
            4. Wellens HJ, et al. The value of the electrocardiogram in the differential diagnosis
            of a tachycardia with a widened QRS complex. Am J Med. 1978;64:27-33.
          </li>
        </ul>
      </div>
    </div>
  );
};
