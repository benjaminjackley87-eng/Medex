import React from 'react';
import { FileText, BrainCircuit, ArrowRight } from 'lucide-react';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const PreventiveGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              GP Guidelines (Red & Green Books)
            </h3>
            <p className="text-slate-400 font-medium mt-1">
              Preventive Health & Immunisation • RACGP Standards
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Primary Care
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Preventive
            </span>
          </div>
        </div>

        {/* The Red Book & Companion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 bg-emerald-950/20 border border-emerald-950/30 rounded-[40px]">
            <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              The Red Book: Preventive Activities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  s: 'Cardiovascular Risk',
                  d: 'Absolute CV Risk assessment every 2y for 45-74y.',
                  c: 'text-emerald-600'
                },
                {
                  s: 'Diabetes Screening',
                  d: 'AUSDRISK score every 3y from 40y.',
                  c: 'text-emerald-600'
                },
                {
                  s: 'Cancer Screening',
                  d: 'Cervical (5y), Breast (2y), Bowel (2y).',
                  c: 'text-emerald-600'
                },
                {
                  s: 'Bone Health',
                  d: 'Osteoporosis risk assessment from 50y.',
                  c: 'text-emerald-600'
                },
                {
                  s: 'Mental Health',
                  d: 'Screening for depression/anxiety.',
                  c: 'text-emerald-600'
                },
                {
                  s: 'Lifestyle (SNAP)',
                  d: 'Smoking, Nutrition, Alcohol, Physical Activity.',
                  c: 'text-emerald-600'
                }
              ].map((step) => (
                <div
                  key={step.s}
                  onClick={() => onInvestigationClick(step.s, 'Red Book')}
                  className="space-y-1 cursor-pointer hover:opacity-70 transition-opacity group"
                >
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-between ${step.c}`}
                  >
                    {step.s}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] font-bold text-white leading-tight">{step.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-blue-950/20 border border-blue-950/30 rounded-[40px]">
            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              The National Guide (ATSI Companion)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  s: 'Early CV Risk',
                  d: 'Assessment from 30y (or earlier if risk factors).',
                  c: 'text-blue-600'
                },
                {
                  s: 'Kidney Health',
                  d: 'Annual eGFR and ACR from 18y for high risk.',
                  c: 'text-blue-600'
                },
                {
                  s: 'Rheumatic Heart',
                  d: 'Screening and secondary prophylaxis guidelines.',
                  c: 'text-blue-600'
                },
                {
                  s: 'Ear Health',
                  d: 'Regular otoscopy and hearing checks in children.',
                  c: 'text-blue-600'
                },
                {
                  s: 'STI Screening',
                  d: 'Annual screening for asymptomatic 15-29y.',
                  c: 'text-blue-600'
                },
                {
                  s: 'Social/Emotional',
                  d: 'Holistic wellbeing and cultural safety focus.',
                  c: 'text-blue-600'
                }
              ].map((step) => (
                <div
                  key={step.s}
                  onClick={() => onInvestigationClick(step.s, 'National Guide')}
                  className="space-y-1 cursor-pointer hover:opacity-70 transition-opacity group"
                >
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-between ${step.c}`}
                  >
                    {step.s}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] font-bold text-white leading-tight">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Green Book (Immunisation) */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          💉 The Green Book: Immunisation Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6">
              A) Childhood Schedule
            </h4>
            <div className="space-y-4">
              {[
                {
                  t: '6 Weeks / 4 Months / 6 Months',
                  d: '6-in-1 (DTPa-hepB-IPV-Hib), Rotavirus, Pneumococcal.'
                },
                { t: '12 Months', d: 'MMR, Meningococcal ACWY, Pneumococcal booster.' },
                { t: '18 Months', d: 'MMRV, DTPa, Hib.' },
                { t: '4 Years', d: 'DTPa-IPV (Booster).' }
              ].map((item) => (
                <div
                  key={item.t}
                  onClick={() => onInvestigationClick(item.t, 'Green Book')}
                  className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center justify-between">
                    {item.t}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] font-medium text-slate-400">{item.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm">
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-6">
              B) Adult & Special Groups
            </h4>
            <div className="space-y-4">
              {[
                { t: 'Pregnancy', d: 'Influenza (any stage), Pertussis (20-32 weeks).' },
                {
                  t: 'Older Adults (65y+)',
                  d: 'Influenza (annual), Pneumococcal, Shingles (70y+).'
                },
                { t: 'ATSI Patients', d: 'Additional Pneumococcal, Hep A, Influenza triggers.' },
                { t: 'Healthcare Workers', d: 'Hep B, MMR, Pertussis, Varicella, Influenza.' }
              ].map((item) => (
                <div
                  key={item.t}
                  onClick={() => onInvestigationClick(item.t, 'Green Book')}
                  className="cursor-pointer hover:bg-slate-950/20 p-2 rounded-xl transition-colors group"
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center justify-between">
                    {item.t}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] font-medium text-slate-400">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="pt-16 border-t border-white/5">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          📚 References & Standards
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="text-[11px] font-bold text-slate-400">RACGP Red Book (9th Edition)</span>
          <span className="text-[11px] font-bold text-slate-400">
            Australian Immunisation Handbook (Green Book)
          </span>
          <span className="text-[11px] font-bold text-slate-400">
            National Preventive Health Strategy
          </span>
        </div>
      </div>
    </div>
  );
};
