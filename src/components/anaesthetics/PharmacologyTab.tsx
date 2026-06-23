import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Activity,
  Stethoscope,
  ShieldAlert,
  Info,
  ChevronRight,
  Search,
  Pill,
  AlertCircle,
  Clock,
  Dna,
  Plus,
  Loader2,
  Sparkles,
  Thermometer,
  Droplets,
  RotateCcw,
  Syringe,
} from 'lucide-react';
import { useClinicalSearch } from '../../hooks/useClinicalSearch';
import { INDUCTION_AGENTS, MUSCLE_RELAXANTS, EMERGENCY_DRUGS } from '../../data/collections/anaesthesia';
import { AnaesthesiaDrug } from '../../types';
import { geminiService } from '../../services/geminiService';
import { storage } from '../../services/storageService';

export const PharmacologyTab: React.FC = () => {
  const [selectedDrug, setSelectedDrug] = useState<AnaesthesiaDrug | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDrugCategory, setActiveDrugCategory] = useState<string>('induction');
  const [customDrugs, setCustomDrugs] = useState<AnaesthesiaDrug[]>([]);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadCustomDrugs = async () => {
      try {
        const drugs = await storage.getAnaesthesiaDrugs();
        if (active) {
          setCustomDrugs(drugs);
        }
      } catch (e) {
        console.error('Failed to load custom drugs:', e);
      }
    };
    loadCustomDrugs();
    return () => {
      active = false;
    };
  }, []);

  const allDrugs = [
    ...INDUCTION_AGENTS.map((d) => ({ ...d, category: 'induction' })),
    ...MUSCLE_RELAXANTS.map((d) => ({ ...d, category: 'relaxants' })),
    ...EMERGENCY_DRUGS.map((d) => ({ ...d, category: 'emergency' })),
    ...customDrugs
  ];

  const standardDrugCategories = [
    { id: 'induction', name: 'Induction Agents', icon: <Zap className="w-5 h-5" /> },
    { id: 'relaxants', name: 'Muscle Relaxants', icon: <Dna className="w-5 h-5" /> },
    { id: 'emergency', name: 'Emergency Drugs', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'analgesics', name: 'Analgesics', icon: <Thermometer className="w-5 h-5" /> },
    { id: 'local_anaesthetics', name: 'Local Anaesthetics', icon: <Syringe className="w-5 h-5" /> },
    { id: 'antiemetics', name: 'Antiemetics', icon: <Droplets className="w-5 h-5" /> },
    { id: 'reversal', name: 'Reversal Agents', icon: <RotateCcw className="w-5 h-5" /> },
    { id: 'other', name: 'Other / Custom', icon: <Plus className="w-5 h-5" /> }
  ];

  const groupedDrugs = allDrugs.reduce(
    (acc, drug) => {
      const cat = (drug.category || 'other').toLowerCase().trim();
      if (!acc[cat]) acc[cat] = [];
      if (!acc[cat].find((d) => d.name === drug.name)) {
        acc[cat].push(drug);
      }
      return acc;
    },
    {} as Record<string, AnaesthesiaDrug[]>
  );

  const drugCategories = [
    ...standardDrugCategories.map((cat) => ({
      ...cat,
      drugs: groupedDrugs[cat.id] || []
    })),
    ...Object.keys(groupedDrugs)
      .filter((id) => !standardDrugCategories.find((sc) => sc.id === id))
      .map((id) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' '),
        icon: <Pill className="w-5 h-5" />,
        drugs: groupedDrugs[id] || []
      }))
  ].filter(
    (cat) =>
      cat.drugs.length > 0 ||
      [
        'induction',
        'relaxants',
        'emergency',
        'analgesics',
        'local_anaesthetics',
        'antiemetics',
        'reversal',
        'other'
      ].includes(cat.id)
  );

  const { results: filteredDrugs, didYouMean } = useClinicalSearch(
    drugCategories.find((c) => c.id === activeDrugCategory)?.drugs || [],
    searchQuery,
    ['name', 'class']
  );

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearchingAI(true);
    setError(null);
    try {
      const drug = await geminiService.generateAnaesthesiaDrug(searchQuery);
      if (drug && drug.name) {
        await storage.saveAnaesthesiaDrug(drug);
        setCustomDrugs((prev) => [...prev.filter((d) => d.name !== drug.name), drug]);
        setSelectedDrug(drug);
        if (drug.category) {
          setActiveDrugCategory(drug.category.toLowerCase().trim());
        } else {
          setActiveDrugCategory('other');
        }
      } else {
        setError('Could not find detailed information for this drug.');
      }
    } catch (e) {
      console.error('AI Drug Search failed:', e);
      setError('Failed to fetch drug information. Please try again.');
    } finally {
      setIsSearchingAI(false);
    }
  };

  return (
          <motion.div
            key="pharmacology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Search & Categories */}
            <div className="space-y-8">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                  placeholder="Search anaesthetic drugs, classes, or indications..."
                  className="w-full bg-slate-950/40 border-2 border-white/5 rounded-[32px] py-6 pl-16 pr-40 text-xl font-medium focus:outline-none focus:border-rose-500/30 focus:ring-4 focus:ring-rose-500/5 transition-all shadow-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery.trim() && (
                    <button
                      onClick={handleAISearch}
                      disabled={isSearchingAI}
                      className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-rose-900/20"
                    >
                      {isSearchingAI ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      <span>Search AI</span>
                    </button>
                  )}
                </div>
              </div>

              {didYouMean && (
                <div className="flex justify-start">
                  <button
                    onClick={() => setSearchQuery(didYouMean)}
                    className="flex items-center gap-2 px-6 py-3 bg-rose-950/20 hover:bg-rose-100 text-rose-600 rounded-2xl transition-all shadow-sm w-full md:w-auto"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 shrink-0">
                      Did you mean
                    </span>
                    <span className="text-sm font-bold border-b border-rose-600 border-dashed truncate">
                      {didYouMean}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 shrink-0">
                      ?
                    </span>
                  </button>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 p-4 bg-rose-950/20 border border-rose-950/30 rounded-2xl text-rose-455 text-sm font-bold">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {drugCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveDrugCategory(cat.id);
                      setSelectedDrug(null);
                    }}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border-2 ${
                      activeDrugCategory === cat.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20'
                        : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-rose-200 hover:text-rose-600'
                    }`}
                  >
                    <span
                      className={activeDrugCategory === cat.id ? 'text-rose-400' : 'text-slate-300'}
                    >
                      {cat.icon}
                    </span>
                    {cat.name}
                    {cat.drugs.length > 0 && (
                      <span
                        className={`ml-1 px-2 py-0.5 rounded-lg text-[9px] ${
                          activeDrugCategory === cat.id
                            ? 'bg-rose-950/200 text-white'
                            : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {cat.drugs.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Drug List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                    {drugCategories.find((c) => c.id === activeDrugCategory)?.name}
                  </h3>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[9px] font-black uppercase text-rose-600 hover:text-rose-455 tracking-widest"
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {filteredDrugs.length > 0 ? (
                    filteredDrugs.map((drug) => (
                      <button
                        key={drug.name}
                        onClick={() => setSelectedDrug(drug)}
                        className={`w-full p-6 rounded-3xl border transition-all text-left group ${
                          selectedDrug?.name === drug.name
                            ? 'bg-rose-950/20 border-rose-200 shadow-md'
                            : 'bg-slate-950/40 border-white/5 hover:border-rose-200 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4
                            className={`font-black uppercase tracking-tight ${selectedDrug?.name === drug.name ? 'text-rose-455' : 'text-white'}`}
                          >
                            {drug.name}
                          </h4>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${selectedDrug?.name === drug.name ? 'text-rose-400 translate-x-1' : 'text-slate-300'}`}
                          />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {drug.class}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="py-12 px-6 text-center bg-slate-950/20 rounded-3xl border-2 border-dashed border-white/5">
                      <Pill className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        No drugs found
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Drug Detail */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {selectedDrug ? (
                    <motion.div
                      key={selectedDrug.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-slate-950/40 rounded-[48px] border border-white/5 shadow-xl p-10 space-y-10"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-4xl font-black text-white mb-2">
                            {selectedDrug.name}
                          </h2>
                          <p className="text-rose-600 font-black uppercase tracking-[0.2em] text-xs">
                            {selectedDrug.class}
                          </p>
                        </div>
                        <div className="w-16 h-16 bg-rose-950/20 rounded-3xl flex items-center justify-center">
                          <Pill className="w-8 h-8 text-rose-600" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                              <Activity className="w-3 h-3" /> Mechanism of Action
                            </h4>
                            <p className="text-slate-350 font-medium leading-relaxed">
                              {selectedDrug.mechanism}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                              <Clock className="w-3 h-3" /> Standard Dosing
                            </h4>
                            <p className="text-white font-black text-lg">{selectedDrug.dose}</p>
                          </div>
                        </div>

                        <div className="bg-rose-950/20/50 p-8 rounded-[32px] border border-rose-950/30">
                          <h4 className="text-[10px] font-black uppercase text-rose-600 tracking-widest mb-4 flex items-center gap-2">
                            <ShieldAlert className="w-3 h-3" /> Contraindications
                          </h4>
                          <ul className="space-y-3">
                            {selectedDrug.contraindications.map((item, i) => (
                              <li key={i} className="flex gap-3 text-rose-900 font-bold text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
                            Clinical Pearls
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedDrug.pearls.map((pearl, i) => (
                              <div
                                key={i}
                                className="flex gap-4 p-4 bg-slate-950/20 rounded-2xl border border-white/5"
                              >
                                <Info className="w-5 h-5 text-indigo-500 shrink-0" />
                                <p className="text-sm font-bold text-slate-350">{pearl}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
                            Side Effects
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedDrug.sideEffects.map((effect, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-slate-950/40 border border-white/5 rounded-xl text-xs font-bold text-slate-400 shadow-sm"
                              >
                                {effect}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-32 text-center bg-slate-950/20 rounded-[48px] border-2 border-dashed border-white/5">
                      <div className="w-20 h-20 bg-slate-950/40 rounded-[32px] flex items-center justify-center shadow-sm mb-6">
                        <Stethoscope className="w-10 h-10 text-slate-300" />
                      </div>
                      <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">
                        Select a Medication
                      </h3>
                      <p className="text-slate-400 font-medium mt-2">
                        Choose a drug from the directory to see detailed clinical data.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
  );
};
