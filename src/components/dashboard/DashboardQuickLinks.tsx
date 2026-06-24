import React from 'react';
import { AppView } from '../../types';
import {
  Zap,
  Stethoscope,
  BrainCircuit,
  Calculator,
  GraduationCap,
  Wrench,
  Activity,
  Layers,
  Microscope,
  ShieldCheck
} from 'lucide-react';

interface DashboardQuickLinksProps {
  onNavigate: (view: AppView) => void;
}

const QUICK_LINKS = [
  {
    label: 'System Exams',
    desc: 'Protocol Library',
    icon: <Stethoscope className="w-6 h-6" />,
    view: 'library' as AppView,
    color: 'text-blue-400',
    bg: 'bg-blue-950/40',
    hoverBg: 'hover:bg-blue-600',
    hoverText: 'group-hover:text-white',
    border: 'border-blue-950'
  },
  {
    label: 'Differentials',
    desc: 'Diagnostic Synthesis',
    icon: <BrainCircuit className="w-6 h-6" />,
    view: 'diagnosticReasoning' as AppView,
    color: 'text-indigo-400',
    bg: 'bg-indigo-950/40',
    hoverBg: 'hover:bg-indigo-600',
    hoverText: 'group-hover:text-white',
    border: 'border-indigo-950'
  },
  {
    label: 'Calculators',
    desc: 'Clinical Scores',
    icon: <Calculator className="w-6 h-6" />,
    view: 'investigationsHub' as AppView,
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
    hoverBg: 'hover:bg-emerald-600',
    hoverText: 'group-hover:text-white',
    border: 'border-emerald-950'
  },
  {
    label: 'Study Hub',
    desc: 'RGA MCQ Prep',
    icon: <GraduationCap className="w-6 h-6" />,
    view: 'studyHub' as AppView,
    color: 'text-indigo-400',
    bg: 'bg-indigo-950/40',
    hoverBg: 'hover:bg-indigo-600',
    hoverText: 'group-hover:text-white',
    border: 'border-indigo-950'
  },
  {
    label: 'Procedures',
    desc: 'Bedside Skills',
    icon: <Wrench className="w-6 h-6" />,
    view: 'acuteInterventions' as AppView,
    color: 'text-rose-400',
    bg: 'bg-rose-950/40',
    hoverBg: 'hover:bg-rose-600',
    hoverText: 'group-hover:text-white',
    border: 'border-rose-950'
  },
  {
    label: 'ECG Library',
    desc: 'Rhythm Analysis',
    icon: <Activity className="w-6 h-6" />,
    view: 'investigationsHub' as AppView,
    color: 'text-rose-400',
    bg: 'bg-rose-950/40',
    hoverBg: 'hover:bg-rose-600',
    hoverText: 'group-hover:text-white',
    border: 'border-rose-950'
  },
  {
    label: 'Radiology',
    desc: 'Imaging Gallery',
    icon: <Layers className="w-6 h-6" />,
    view: 'investigationsHub' as AppView,
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
    hoverBg: 'hover:bg-emerald-600',
    hoverText: 'group-hover:text-white',
    border: 'border-emerald-950'
  },
  {
    label: 'Investigations',
    desc: 'Lab & Imaging',
    icon: <Microscope className="w-6 h-6" />,
    view: 'investigationsHub' as AppView,
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/40',
    hoverBg: 'hover:bg-cyan-600',
    hoverText: 'group-hover:text-white',
    border: 'border-cyan-950'
  },
  {
    label: 'Therapeutics',
    desc: 'Live Protocols',
    icon: <ShieldCheck className="w-6 h-6" />,
    view: 'therapeuticsTox' as AppView,
    color: 'text-amber-400',
    bg: 'bg-amber-950/40',
    hoverBg: 'hover:bg-amber-600',
    hoverText: 'group-hover:text-white',
    border: 'border-amber-950'
  }
];

export const DashboardQuickLinks: React.FC<DashboardQuickLinksProps> = React.memo(
  ({ onNavigate }) => {
    return (
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-white/5 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-950/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight mb-1">
                <Zap className="w-6 h-6 text-rose-500" />
                Clinical Tools
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Quick Access Modules
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
            {QUICK_LINKS.map((link, i) => (
              <button
                key={i}
                onClick={() => onNavigate(link.view)}
                className={`flex flex-col items-start gap-4 p-5 rounded-[24px] border ${link.border} ${link.hoverBg} transition-all duration-300 group bg-slate-950 hover:shadow-xl hover:-translate-y-1`}
              >
                <div
                  className={`p-3.5 rounded-2xl ${link.bg} ${link.color} ${link.hoverText} group-hover:bg-slate-950/40/20 transition-colors duration-300 border border-white/5`}
                >
                  {link.icon}
                </div>
                <div className="text-left mt-1">
                  <span
                    className={`block text-xs font-black text-slate-200 uppercase tracking-tight mb-0.5 group-hover:text-white transition-colors duration-300`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`block text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white/70 transition-colors duration-300`}
                  >
                    {link.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

// Added display name for React DevTools since component is wrapped in React.memo
DashboardQuickLinks.displayName = 'DashboardQuickLinks';
