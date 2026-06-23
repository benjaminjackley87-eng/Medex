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
  ArrowLeft,
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
  Wind,
  Brain,
  Ruler,
  Box,
  FileText,
  Lightbulb,
  Baby,
  Users,
  Heart,
  UserPlus,
  Scale
} from 'lucide-react';
import { useClinicalSearch } from '../hooks/useClinicalSearch';
import {
  INDUCTION_AGENTS,
  MUSCLE_RELAXANTS,
  EMERGENCY_DRUGS
} from '../data/collections/anaesthesia';
import { AnaesthesiaDrug } from '../types';
import { geminiService } from '../services/geminiService';
import { storage } from '../services/storageService';

type MainTab = 'physiology' | 'pharmacology' | 'airway' | 'mnemonics' | 'procedures' | 'curriculum';
type PhysCategory = 'normal' | 'populations' | 'anaesthesia';

const AnaestheticsCCView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('pharmacology');

  // Physiology State
  const [activePhysCategory, setActivePhysCategory] = useState<PhysCategory>('normal');
  const [selectedPhysTopic, setSelectedPhysTopic] = useState<string | null>(null);
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

  const mainTabs = [
    { id: 'physiology', name: 'Physiology', icon: <Activity className="w-5 h-5" /> },
    { id: 'pharmacology', name: 'Pharmacology', icon: <Pill className="w-5 h-5" /> },
    { id: 'airway', name: 'Airway & Sizing', icon: <Wind className="w-5 h-5" /> },
    { id: 'mnemonics', name: 'Mnemonics', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'procedures', name: 'Procedures', icon: <Zap className="w-5 h-5" /> },
    { id: 'curriculum', name: 'Curriculum', icon: <FileText className="w-5 h-5" /> }
  ];

  const physCategories = [
    { id: 'normal', name: 'Normal Physiology', icon: <Heart className="w-4 h-4" /> },
    { id: 'populations', name: 'Special Populations', icon: <Users className="w-4 h-4" /> },
    { id: 'anaesthesia', name: 'Anaesthetic Alterations', icon: <Zap className="w-4 h-4" /> }
  ];

  const physTopics = {
    normal: [
      { id: 'cvs', name: 'Cardiovascular', icon: <Heart className="w-4 h-4" /> },
      { id: 'resp', name: 'Respiratory', icon: <Wind className="w-4 h-4" /> },
      { id: 'renal', name: 'Renal', icon: <Droplets className="w-4 h-4" /> },
      { id: 'neuro', name: 'Neurological', icon: <Brain className="w-4 h-4" /> },
      { id: 'hepatic', name: 'Hepatic', icon: <Activity className="w-4 h-4" /> }
    ],
    populations: [
      { id: 'paediatric', name: 'Very Young (Paediatric)', icon: <Baby className="w-4 h-4" /> },
      { id: 'geriatric', name: 'Very Old (Geriatric)', icon: <Users className="w-4 h-4" /> },
      { id: 'obese', name: 'Obese', icon: <Scale className="w-4 h-4" /> },
      { id: 'pregnant', name: 'Pregnant', icon: <UserPlus className="w-4 h-4" /> }
    ],
    anaesthesia: [
      { id: 'cvs_anaesth', name: 'CVS under Anaesthesia', icon: <Zap className="w-4 h-4" /> },
      { id: 'resp_anaesth', name: 'Resp under Anaesthesia', icon: <Zap className="w-4 h-4" /> },
      { id: 'neuro_anaesth', name: 'Neuro under Anaesthesia', icon: <Zap className="w-4 h-4" /> },
      {
        id: 'pop_anaesth',
        name: 'Populations under Anaesthesia',
        icon: <Zap className="w-4 h-4" />
      }
    ]
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Anaesthetics <span className="text-rose-600">& CC</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg max-w-2xl">
            Specialized high-acuity protocols, pharmacology, and clinical mastery.
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-white/5 pb-6">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as MainTab)}
            className={`px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105'
                : 'bg-slate-950/40 text-slate-400 hover:bg-slate-950/20 border border-white/5'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'pharmacology' ? (
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
        ) : activeTab === 'physiology' ? (
          <motion.div
            key="physiology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Physiology Sub-Navigation */}
            <div className="flex flex-wrap gap-3 bg-slate-950/20 p-2 rounded-[24px] border border-white/5">
              {physCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActivePhysCategory(cat.id as PhysCategory);
                    setSelectedPhysTopic(null);
                  }}
                  className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                    activePhysCategory === cat.id
                      ? 'bg-slate-950/40 text-rose-600 shadow-sm border border-white/5'
                      : 'text-slate-400 hover:text-slate-400'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Topic List */}
              <div className="lg:col-span-1 space-y-2">
                {physTopics[activePhysCategory].map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedPhysTopic(topic.id)}
                    className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                      selectedPhysTopic === topic.id
                        ? 'bg-rose-950/20 border-rose-200 text-rose-455 shadow-sm'
                        : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-rose-950/30 hover:text-rose-600'
                    }`}
                  >
                    {topic.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest truncate">
                      {topic.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Topic Detail */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {selectedPhysTopic ? (
                    <motion.div
                      key={selectedPhysTopic}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-slate-950/40 rounded-[40px] border border-white/5 shadow-xl p-10 min-h-[400px]"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-rose-950/20 rounded-2xl flex items-center justify-center text-rose-600">
                          {physTopics[activePhysCategory].find((t) => t.id === selectedPhysTopic)
                            ?.icon || <Activity className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                            {
                              physTopics[activePhysCategory].find((t) => t.id === selectedPhysTopic)
                                ?.name
                            }
                          </h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            ANZCA Primary Focus Module
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-950/20 rounded-3xl border border-white/5">
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                            <Info className="w-3 h-3" /> Core Concepts
                          </h4>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed">
                            Detailed physiological principles for{' '}
                            {physTopics[activePhysCategory]
                              .find((t) => t.id === selectedPhysTopic)
                              ?.name.toLowerCase()}{' '}
                            are being integrated.
                          </p>
                        </div>
                        <div className="p-6 bg-rose-950/20/50 rounded-3xl border border-rose-950/30">
                          <h4 className="text-[10px] font-black uppercase text-rose-600 tracking-widest mb-4 flex items-center gap-2">
                            <Zap className="w-3 h-3" /> Exam High-Yield
                          </h4>
                          <ul className="space-y-2">
                            {[
                              'Key equations',
                              'Pressure-Volume relationships',
                              'Regulatory mechanisms'
                            ].map((item, i) => (
                              <li
                                key={i}
                                className="text-[11px] text-rose-900 font-bold flex items-center gap-2"
                              >
                                <div className="w-1 h-1 rounded-full bg-rose-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-32 text-center bg-slate-950/20 rounded-[40px] border-2 border-dashed border-white/5">
                      <Activity className="w-12 h-12 text-slate-300 mb-6" />
                      <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">
                        Select a Topic
                      </h3>
                      <p className="text-slate-400 font-medium mt-2">
                        Choose a physiological system or population group to begin.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'curriculum' ? (
          <motion.div
            key="curriculum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-slate-950/40 rounded-[40px] border border-white/5 shadow-xl p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-indigo-950/20 rounded-3xl flex items-center justify-center text-indigo-600">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                    ANZCA Primary Syllabus
                  </h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Core Learning Objectives & Mastery Goals
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-black text-rose-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Physiology Objectives
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Cellular Physiology',
                          desc: 'Transport mechanisms, resting membrane potential, and cellular signaling.'
                        },
                        {
                          title: 'Cardiovascular',
                          desc: "Cardiac cycle, regulation of CO, Starling's Law, and microcirculation."
                        },
                        {
                          title: 'Respiratory',
                          desc: 'Mechanics of breathing, V/Q matching, gas transport, and control of breathing.'
                        },
                        {
                          title: 'Renal',
                          desc: 'GFR, tubular function, acid-base balance, and electrolyte regulation.'
                        },
                        {
                          title: 'Neurophysiology',
                          desc: 'CSF, cerebral blood flow, ANS, and pain pathways.'
                        },
                        {
                          title: 'Hepatic & GI',
                          desc: 'Liver function, metabolism, and gastric emptying.'
                        }
                      ].map((obj, i) => (
                        <div
                          key={i}
                          className="p-5 bg-slate-950/20 rounded-2xl border border-white/5 hover:border-rose-200 transition-colors group"
                        >
                          <h4 className="text-xs font-black text-white mb-1 group-hover:text-rose-600 transition-colors">
                            {obj.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                            {obj.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <Pill className="w-4 h-4" /> Pharmacology Objectives
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'General Principles',
                          desc: 'PK/PD models, receptor theory, and potency vs efficacy.'
                        },
                        {
                          title: 'Induction Agents',
                          desc: 'Propofol, Thiopentone, Ketamine: mechanisms and clinical effects.'
                        },
                        {
                          title: 'Inhalational Agents',
                          desc: 'MAC, uptake/distribution, and organ-specific toxicity.'
                        },
                        {
                          title: 'Muscle Relaxants',
                          desc: 'Neuromuscular blockade mechanisms and reversal (Sugammadex).'
                        },
                        {
                          title: 'Analgesics',
                          desc: 'Opioids, NSAIDs, and multimodal analgesia principles.'
                        },
                        {
                          title: 'Local Anaesthetics',
                          desc: 'Mechanism of action, LAST, and specific agent profiles.'
                        }
                      ].map((obj, i) => (
                        <div
                          key={i}
                          className="p-5 bg-slate-950/20 rounded-2xl border border-white/5 hover:border-indigo-200 transition-colors group"
                        >
                          <h4 className="text-xs font-black text-white mb-1 group-hover:text-indigo-600 transition-colors">
                            {obj.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                            {obj.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-amber-950/20 rounded-[32px] border border-amber-950/30">
                <h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Mastery Tip: The "Why"
                </h3>
                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                  ANZCA examiners look for more than just facts. Focus on the **mechanisms** and
                  **relationships**. For every physiological change, ask: *What is the stimulus?
                  What is the sensor? What is the effector?* This "control loop" thinking is key to
                  passing the primary.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-950/40 rounded-[48px] border border-white/5 shadow-xl p-10 min-h-[500px] flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 bg-rose-950/20 rounded-[40px] flex items-center justify-center mb-8">
              {mainTabs.find((t) => t.id === activeTab)?.icon}
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">
              {mainTabs.find((t) => t.id === activeTab)?.name} Module
            </h2>
            <p className="text-slate-400 max-w-lg font-medium text-lg">
              This specialized section is being populated with advanced {activeTab} data and
              clinical protocols.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left">
              {activeTab === 'airway' && (
                <>
                  <div className="p-8 bg-slate-950/20 rounded-[32px] border border-white/5">
                    <Ruler className="w-8 h-8 text-rose-500 mb-6" />
                    <h4 className="font-black uppercase text-sm mb-3">ETT Sizing (Paediatric)</h4>
                    <div className="space-y-2">
                      <p className="text-xs text-slate-400 font-bold flex justify-between">
                        <span>Uncuffed:</span> <span className="text-rose-600">(Age/4) + 4</span>
                      </p>
                      <p className="text-xs text-slate-400 font-bold flex justify-between">
                        <span>Cuffed:</span> <span className="text-rose-600">(Age/4) + 3.5</span>
                      </p>
                    </div>
                  </div>
                  <div className="p-8 bg-slate-950/20 rounded-[32px] border border-white/5">
                    <Box className="w-8 h-8 text-rose-500 mb-6" />
                    <h4 className="font-black uppercase text-sm mb-3">Mallampati Score</h4>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed">
                      Class I-IV visualization of soft palate, fauces, uvula, and pillars.
                    </p>
                  </div>
                </>
              )}
              {activeTab === 'mnemonics' && (
                <div className="p-8 bg-slate-950/20 rounded-[32px] border border-white/5">
                  <Lightbulb className="w-8 h-8 text-amber-500 mb-6" />
                  <h4 className="font-black uppercase text-sm mb-4">LEMON (Airway)</h4>
                  <ul className="space-y-2">
                    {[
                      'L: Look externally',
                      'E: Evaluate 3-3-2',
                      'M: Mallampati',
                      'O: Obstruction',
                      'N: Neck mobility'
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-[11px] text-slate-400 font-bold flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnaestheticsCCView;
