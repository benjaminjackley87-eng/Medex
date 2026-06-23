import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Calendar,
  Calculator,
  Info,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Baby,
  User,
  Stethoscope,
  Syringe,
  History,
  RefreshCw,
  Search
} from 'lucide-react';
import { useClinicalSearch } from '../hooks/useClinicalSearch';

interface Vaccine {
  name: string;
  disease: string;
  doses: number[]; // months
}

const NIP_SCHEDULE = [
  { age: 'Birth', months: 0, vaccines: ['Hepatitis B'] },
  {
    age: '2 months',
    months: 2,
    vaccines: ['DTPa-hepB-IPV-Hib', 'Rotavirus', 'Pneumococcal (13vPCV)'],
    indigenousVaccines: ['Meningococcal B']
  },
  {
    age: '4 months',
    months: 4,
    vaccines: ['DTPa-hepB-IPV-Hib', 'Rotavirus', 'Pneumococcal (13vPCV)'],
    indigenousVaccines: ['Meningococcal B']
  },
  {
    age: '6 months',
    months: 6,
    vaccines: ['DTPa-hepB-IPV-Hib', 'Pneumococcal (13vPCV)'],
    indigenousVaccines: ['Influenza (Annual)']
  },
  {
    age: '12 months',
    months: 12,
    vaccines: ['Meningococcal ACWY', 'MMR', 'Pneumococcal (13vPCV)'],
    indigenousVaccines: ['Meningococcal B', 'Hepatitis A']
  },
  {
    age: '18 months',
    months: 18,
    vaccines: ['MMRV', 'DTPa', 'Hib'],
    indigenousVaccines: ['Hepatitis A']
  },
  {
    age: '4 years',
    months: 48,
    vaccines: ['DTPa-IPV'],
    indigenousVaccines: ['Influenza (Annual)']
  },
  {
    age: '12-13 years',
    months: 144,
    vaccines: ['HPV', 'dTpa'],
    indigenousVaccines: ['Influenza (Annual)']
  },
  {
    age: '50 years+',
    months: 600,
    vaccines: [],
    indigenousVaccines: ['Pneumococcal (23vPPV)', 'Influenza (Annual)']
  },
  {
    age: '65 years+',
    months: 780,
    vaccines: ['Pneumococcal (13vPCV)', 'Shingles (Shingrix)'],
    indigenousVaccines: ['Influenza (Annual)']
  }
];

const VACCINE_DETAILS: Record<string, string> = {
  'Hepatitis B': 'Protects against Hepatitis B virus which causes liver damage.',
  'DTPa-hepB-IPV-Hib':
    'Combination vaccine for Diphtheria, Tetanus, Pertussis, Hep B, Polio, and Hib.',
  Rotavirus: 'Oral vaccine against severe gastroenteritis caused by rotavirus.',
  'Pneumococcal (13vPCV)':
    'Protects against 13 strains of pneumococcal bacteria (pneumonia, meningitis).',
  'Meningococcal ACWY': 'Protects against four strains of meningococcal disease.',
  MMR: 'Measles, Mumps, and Rubella.',
  MMRV: 'Measles, Mumps, Rubella, and Varicella (Chickenpox).',
  DTPa: 'Diphtheria, Tetanus, and acellular Pertussis (Whooping Cough).',
  Hib: 'Haemophilus influenzae type b.',
  'DTPa-IPV': 'Diphtheria, Tetanus, Pertussis, and Polio.',
  HPV: 'Human Papillomavirus (prevents cervical and other cancers).',
  dTpa: 'Reduced dose Diphtheria, Tetanus, and acellular Pertussis (booster).',
  'Shingles (Shingrix)': 'Protects against herpes zoster (shingles).',
  'Meningococcal B':
    'Protects against strain B of meningococcal disease. Recommended for Indigenous infants.',
  'Hepatitis A':
    'Protects against Hepatitis A. Recommended for Indigenous children in high-risk areas.',
  'Influenza (Annual)':
    'Annual flu vaccine recommended for all Indigenous Australians from 6 months of age.',
  'Pneumococcal (23vPPV)': 'Booster protection against 23 strains of pneumococcal disease.'
};

const ImmunisationView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'calculator'>('schedule');
  const [ageMonths, setAgeMonths] = useState<number>(0);
  const [givenVaccines, setGivenVaccines] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isIndigenous, setIsIndigenous] = useState(false);

  const { results: filteredSchedule, didYouMean } = useClinicalSearch(
    useMemo(
      () =>
        NIP_SCHEDULE.map((item) => ({
          ...item,
          // Create a single searchable string of all vaccines for easier filtering
          combinedVaccinesStr: isIndigenous
            ? [...item.vaccines, ...(item.indigenousVaccines || [])].join(' ')
            : item.vaccines.join(' '),
          combinedVaccines: isIndigenous
            ? [...item.vaccines, ...(item.indigenousVaccines || [])]
            : item.vaccines
        })).filter((item) => item.combinedVaccines.length > 0),
      [isIndigenous]
    ),
    searchQuery,
    ['age', 'combinedVaccinesStr']
  );

  const catchUpDoses = useMemo(() => {
    const due: { age: string; vaccine: string }[] = [];
    NIP_SCHEDULE.forEach((item) => {
      if (ageMonths >= item.months) {
        const vaccines = isIndigenous
          ? [...item.vaccines, ...(item.indigenousVaccines || [])]
          : item.vaccines;

        vaccines.forEach((v) => {
          if (!givenVaccines.includes(`${item.months}-${v}`)) {
            due.push({ age: item.age, vaccine: v });
          }
        });
      }
    });
    return due;
  }, [ageMonths, givenVaccines, isIndigenous]);

  const toggleVaccine = (months: number, vaccine: string) => {
    const key = `${months}-${vaccine}`;
    setGivenVaccines((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key]
    );
  };

  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      {/* Header */}
      <header className="bg-slate-950/40 border-b border-white/5 sticky top-0 z-30 px-8 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-950/40">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Immunisation Hub</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Australian NIP Schedule & Catch-up
              </p>
            </div>
          </div>

          <nav className="flex bg-slate-900 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'schedule'
                  ? 'bg-slate-950/40 text-indigo-600 shadow-sm'
                  : 'text-slate-400 hover:text-slate-400'
              }`}
            >
              <Calendar className="w-4 h-4" />
              NIP Schedule
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'calculator'
                  ? 'bg-slate-950/40 text-indigo-600 shadow-sm'
                  : 'text-slate-400 hover:text-slate-400'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Catch-up Calculator
            </button>
          </nav>

          <div className="flex items-center gap-3 bg-slate-950/20 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Indigenous Status
            </span>
            <button
              onClick={() => setIsIndigenous(!isIndigenous)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isIndigenous ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-slate-950/40 rounded-full transition-transform ${isIndigenous ? 'translate-x-6' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'schedule' ? (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Search & Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search vaccines or age groups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium text-slate-350 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                  {didYouMean && (
                    <div className="mt-2 flex justify-start">
                      <button
                        onClick={() => setSearchQuery(didYouMean)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-950/20 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all shadow-sm w-full"
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 shrink-0">
                          Did you mean
                        </span>
                        <span className="text-xs font-bold border-b border-indigo-600 border-dashed truncate">
                          {didYouMean}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 shrink-0">
                          ?
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="bg-indigo-950/20 border border-indigo-950/30 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-indigo-900 leading-relaxed">
                    The National Immunisation Program (NIP) Schedule lists the vaccines given free
                    to people in Australia.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-6 relative before:absolute before:left-[27px] before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-200">
                {filteredSchedule.map((item, idx) => (
                  <motion.div
                    key={item.age}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-0 top-0 w-14 h-14 bg-slate-950/40 border-4 border-slate-50 rounded-full flex items-center justify-center shadow-sm z-10">
                      {item.months === 0 ? (
                        <Baby className="w-6 h-6 text-indigo-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-indigo-600" />
                      )}
                    </div>

                    <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-black text-white tracking-tight">{item.age}</h3>
                        <span className="px-4 py-1.5 bg-indigo-950/20 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {item.combinedVaccines.length} Vaccines
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.combinedVaccines.map((v) => (
                          <div
                            key={v}
                            className="group p-4 bg-slate-950/20 rounded-2xl border border-white/5 hover:border-indigo-200 hover:bg-indigo-950/20/30 transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-slate-950/40 rounded-xl flex items-center justify-center shadow-sm group-hover:text-indigo-600 transition-colors">
                                <Syringe className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm font-bold text-slate-300">{v}</h4>
                                  {item.indigenousVaccines?.includes(v) && (
                                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-400 rounded text-[8px] font-black uppercase tracking-tighter">
                                      Indigenous Only
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                  {VACCINE_DETAILS[v] ||
                                    'Protects against specific infectious diseases.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Input Section */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    Patient Details
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        Current Age (Months)
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="240"
                          value={ageMonths}
                          onChange={(e) => setAgeMonths(parseInt(e.target.value))}
                          className="flex-1 accent-indigo-600"
                        />
                        <div className="w-20 text-center py-2 bg-indigo-950/20 rounded-xl text-indigo-600 font-black text-sm">
                          {ageMonths}m
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-[10px] font-bold text-slate-400">Birth</span>
                        <span className="text-[10px] font-bold text-slate-400">20 Years</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                        Vaccines Already Given
                      </label>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {NIP_SCHEDULE.filter((item) => item.months <= ageMonths).map((item) => {
                          const vaccines = isIndigenous
                            ? [...item.vaccines, ...(item.indigenousVaccines || [])]
                            : item.vaccines;

                          if (vaccines.length === 0) return null;

                          return (
                            <div key={item.age} className="space-y-2">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {item.age}
                              </p>
                              {vaccines.map((v) => (
                                <button
                                  key={`${item.months}-${v}`}
                                  onClick={() => toggleVaccine(item.months, v)}
                                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                                    givenVaccines.includes(`${item.months}-${v}`)
                                      ? 'bg-emerald-950/20 border-emerald-200 text-emerald-400'
                                      : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-indigo-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold">{v}</span>
                                    {item.indigenousVaccines?.includes(v) && (
                                      <span className="px-1 py-0.5 bg-amber-100 text-amber-600 rounded text-[7px] font-black uppercase tracking-tighter">
                                        Indigenous
                                      </span>
                                    )}
                                  </div>
                                  {givenVaccines.includes(`${item.months}-${v}`) ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-white/5" />
                                  )}
                                </button>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-950/20 border border-amber-950/30 rounded-3xl p-6 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-amber-900 mb-1">Clinical Disclaimer</h4>
                    <p className="text-[11px] text-amber-800/70 leading-relaxed font-medium">
                      This calculator provides a general guide based on the NIP schedule. Complex
                      catch-up scenarios (e.g. medically at-risk, overseas history) require
                      consultation with the Australian Immunisation Handbook.
                    </p>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-7 space-y-8">
                <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 shadow-sm min-h-[400px]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <History className="w-5 h-5 text-indigo-600" />
                      Catch-up Requirements
                    </h3>
                    <button
                      onClick={() => {
                        setGivenVaccines([]);
                        setAgeMonths(0);
                      }}
                      className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-950/20 px-3 py-1.5 rounded-lg transition-all"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reset
                    </button>
                  </div>

                  {catchUpDoses.length > 0 ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-rose-950/20 border border-rose-950/30 rounded-2xl flex items-center gap-3 mb-6">
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                        <span className="text-[11px] font-bold text-rose-900">
                          {catchUpDoses.length} doses are currently overdue or missing.
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {catchUpDoses.map((dose, i) => (
                          <motion.div
                            key={`${dose.age}-${dose.vaccine}-${i}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center justify-between p-4 bg-slate-950/20 rounded-2xl border border-white/5"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-slate-950/40 rounded-xl flex items-center justify-center shadow-sm">
                                <Syringe className="w-5 h-5 text-rose-500" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-300">{dose.vaccine}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  Due at {dose.age}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 bg-emerald-950/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h4 className="text-lg font-black text-white mb-2">Up to Date</h4>
                      <p className="text-sm text-slate-400 font-medium max-w-xs">
                        Based on the information provided, this patient is up to date with the NIP
                        schedule for their age.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Stethoscope className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-lg font-black tracking-tight">Next Steps</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Verify immunisation history on the Australian Immunisation Register (AIR).',
                      'Consult the Australian Immunisation Handbook for specific catch-up intervals.',
                      'Consider seasonal influenza vaccine (not included in catch-up logic).',
                      'Check for state-specific programs (e.g. Meningococcal B in some states).'
                    ].map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[11px] font-medium text-slate-400 leading-relaxed"
                      >
                        <div className="w-5 h-5 rounded-full bg-slate-950/40/10 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ImmunisationView;
