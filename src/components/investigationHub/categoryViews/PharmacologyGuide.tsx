import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ANTIBIOGRAM_PATHOGENS,
  ANTIBIOGRAM_ANTIBIOTICS,
  ANTIBIOGRAM_COVERAGE
} from '../../../data/collections/antibiotics';

interface CategoryGuideProps {
  onInvestigationClick: (testName: string, context?: string) => void;
  onEnlargeImage?: (src: string, alt: string) => void;
}

export const PharmacologyGuide: React.FC<CategoryGuideProps> = ({ onInvestigationClick }) => {
  const [biogramFilter, setBiogramFilter] = useState<string>('All');

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
              Clinical Pharmacology
            </h3>
            <p className="text-slate-400 font-medium mt-1">
              Antibiotic Stewardship & Biogram • ED/GP Focus
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-950/30">
              Infectious Disease
            </span>
            <span className="px-3 py-1 bg-blue-950/20 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-950/30">
              Stewardship
            </span>
          </div>
        </div>

        {/* Interactive Abx Category Cards */}
        <div className="space-y-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            💊 Antibiotic Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t: 'Penicillins',
                d: 'Cell wall synthesis inhibitors. Amoxicillin, Flucloxacillin, Tazocin.',
                c: 'bg-emerald-950/20 text-emerald-400'
              },
              {
                t: 'Cephalosporins',
                d: 'Broad spectrum cell wall inhibitors. Cephalexin (1st), Ceftriaxone (3rd).',
                c: 'bg-blue-950/20 text-blue-400'
              },
              {
                t: 'Macrolides',
                d: 'Protein synthesis (50S). Azithromycin, Roxithromycin. QT prolongation risk.',
                c: 'bg-amber-950/20 text-amber-400'
              },
              {
                t: 'Quinolones',
                d: 'DNA gyrase inhibitors. Ciprofloxacin, Moxifloxacin. Tendon risk.',
                c: 'bg-rose-950/20 text-rose-455'
              },
              {
                t: 'Tetracyclines',
                d: 'Protein synthesis (30S). Doxycycline. Atypical coverage.',
                c: 'bg-indigo-950/20 text-indigo-400'
              },
              {
                t: 'Aminoglycosides',
                d: 'Bactericidal 30S inhibitors. Gentamicin. Ototoxicity/Nephrotoxicity.',
                c: 'bg-slate-900 text-slate-350'
              },
              {
                t: 'Glycopeptides',
                d: 'Cell wall (D-Ala-D-Ala). Vancomycin. MRSA coverage.',
                c: 'bg-purple-950/20 text-purple-400'
              },
              {
                t: 'Nitroimidazoles',
                d: 'DNA damage. Metronidazole. Anaerobic coverage.',
                c: 'bg-orange-950/20 text-orange-400'
              }
            ].map((abx) => (
              <div
                key={abx.t}
                onClick={() => onInvestigationClick(abx.t, 'Pharmacology')}
                className={`p-6 rounded-[32px] border border-transparent hover:border-white/5 transition-all cursor-pointer group ${abx.c}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-widest">{abx.t}</p>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[12px] font-bold leading-relaxed opacity-80">{abx.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biogram Table */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            📊 ED/GP Biogram (Common Pathogens vs Abx)
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">
              Filter:
            </span>
            {['All', 'Gram-positive cocci', 'Gram-negative bacilli', 'Atypical'].map((opt) => (
              <button
                key={opt}
                onClick={() => setBiogramFilter(opt)}
                className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  biogramFilter === opt
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto rounded-[40px] border border-white/5 shadow-sm bg-slate-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/20 border-b border-white/5">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest sticky left-0 bg-slate-950/20 z-10">
                  Pathogen
                </th>
                {ANTIBIOGRAM_ANTIBIOTICS.slice(0, 6).map((abx) => (
                  <th
                    key={abx.short}
                    className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    {abx.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ANTIBIOGRAM_PATHOGENS.filter(
                (p) => biogramFilter === 'All' || p.microscopy.includes(biogramFilter)
              ).map((pathogen, idx) => (
                <tr key={idx} className="hover:bg-slate-950/20 transition-colors">
                  <td className="p-6 text-[12px] font-black text-white sticky left-0 bg-slate-950/40 group-hover:bg-slate-950/20 z-10 border-r border-slate-50">
                    <div className="flex flex-col">
                      <span
                        className={
                          pathogen.type === 'Atypical' || pathogen.type === 'Anaerobe'
                            ? 'italic'
                            : ''
                        }
                      >
                        {pathogen.name}
                      </span>
                      <span className="text-[8px] uppercase tracking-tighter text-slate-400">
                        {pathogen.microscopy}
                      </span>
                    </div>
                  </td>
                  {ANTIBIOGRAM_COVERAGE[pathogen.name].slice(0, 6).map((val, vIdx) => (
                    <td
                      key={vIdx}
                      className={`p-6 text-[12px] font-bold ${val === 3 ? 'text-emerald-600' : val === 2 ? 'text-emerald-500/70' : val === 1 ? 'text-amber-500' : 'text-slate-300'}`}
                    >
                      {val === 3 ? '+++' : val === 2 ? '++' : val === 1 ? '+' : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] font-bold text-slate-400 italic px-6">
          Legend: +++ Excellent, ++ Good, + Moderate, - Poor/No coverage. Check local antibiograms
          for regional resistance patterns.
        </p>
      </div>

      {/* Resistance Mechanisms */}
      <div className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">
          🛡️ High-Yield Resistance Mechanisms (ESBL, AmpC, Carbapenemases)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl">
            <h4 className="text-[11px] font-black text-rose-455 uppercase tracking-widest mb-3">
              1. ESBL (Extended-Spectrum Beta-Lactamases)
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed space-y-2">
              • **Mechanism:** Plasmid-mediated enzymes that hydrolyze 1st-4th generation
              cephalosporins, penicillins, and aztreonam.
              <br />
              • **Key Organisms:** *E. coli*, *Klebsiella pneumoniae*, *Proteus mirabilis*.
              <br />
              • **Inhibitors:** Susceptible to beta-lactamase inhibitors (e.g. clavulanate,
              tazobactam, avibactam) in vitro, but Carbapenems (Meropenem) remain gold standard for
              systemic infections.
              <br />• **Stewardship:** Pip/Taz (Tazocin) should be avoided for high-inoculum ESBL
              infections (e.g. bacteremia) despite in vitro susceptibility.
            </p>
          </div>

          <div className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl">
            <h4 className="text-[11px] font-black text-rose-455 uppercase tracking-widest mb-3">
              2. AmpC Beta-Lactamases
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed space-y-2">
              • **Mechanism:** Chromosomally-mediated, inducible beta-lactamases. Hydrolyze
              penicillins, 1st-3rd generation cephalosporins, and monobactams.
              <br />
              • **Key Organisms (ESCAPPM):** *Enterobacter*, *Serratia*, *Citrobacter*, *Aeromonas*,
              *Proteus (vulgaris)*, *Providencia*, *Morganella*.
              <br />
              • **Inhibitors:** Resistant to standard inhibitors (clavulanate, tazobactam). Falsely
              test susceptible to ceftriaxone initially, but rapidly select for resistance on
              therapy.
              <br />• **Stewardship:** Cefepime (4th gen Cephalosporin) or Carbapenems are treatment
              of choice; Cefepime resists AmpC hydrolysis.
            </p>
          </div>

          <div className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl">
            <h4 className="text-[11px] font-black text-rose-455 uppercase tracking-widest mb-3">
              3. Carbapenemases (CPE/CRE)
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed space-y-2">
              • **Mechanism:** Enzymes that degrade almost all beta-lactams, including carbapenems.
              Classified by Ambler classes:
              <br />
              &nbsp;&nbsp;- *Class A:* KPC (K. pneumoniae Carbapenemase)
              <br />
              &nbsp;&nbsp;- *Class B (Metallo-beta-lactamases):* NDM, VIM, IMP. Require zinc;
              resistant to all beta-lactams EXCEPT Aztreonam.
              <br />
              &nbsp;&nbsp;- *Class D:* OXA-48-like enzymes.
              <br />• **Stewardship:** Requires advanced therapies (e.g., Ceftazidime-Avibactam for
              KPC/OXA-48; Aztreonam-Avibactam for MBLs) and strict isolation.
            </p>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="pt-16 border-t border-white/5">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          📚 References & Standards
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="text-[11px] font-bold text-slate-400">Therapeutic Guidelines (eTG)</span>
          <span className="text-[11px] font-bold text-slate-400">
            AMH (Australian Medicines Handbook)
          </span>
          <span className="text-[11px] font-bold text-slate-400">ASAP Guidelines</span>
        </div>
      </div>
    </div>
  );
};
