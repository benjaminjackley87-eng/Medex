import React, { useState } from 'react';
import {
  Search,
  Pill,
  Bug,
  Loader2,
  AlertCircle,
  ChevronRight,
  Info,
  ShieldCheck,
  ShieldAlert,
  Microscope,
  Activity,
  Stethoscope,
  Plus,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';
import { AntibioticInfo, PathogenInfo, InteractionResult } from '../types';
import {
  ANTIBIOTIC_CATEGORIES,
  ANTIBIOGRAM_PATHOGENS,
  ANTIBIOGRAM_ANTIBIOTICS,
  ANTIBIOGRAM_COVERAGE
} from '../data/collections/antibiotics';

const gemini = geminiService;

const AntibiogramTable: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const pathogens = ANTIBIOGRAM_PATHOGENS;
  const antibiotics = ANTIBIOGRAM_ANTIBIOTICS;
  const coverage = ANTIBIOGRAM_COVERAGE;

  const filterOptions = [
    'All',
    'Gram-positive cocci',
    'Gram-negative cocci',
    'Gram-positive bacilli',
    'Gram-negative bacilli',
    'Atypical',
    'Spirochete'
  ];

  const filteredPathogens =
    filterType === 'All' ? pathogens : pathogens.filter((p) => p.microscopy.includes(filterType));

  const getCellColor = (val: number) => {
    if (val === 3) return 'bg-emerald-650 text-white';
    if (val === 2) return 'bg-emerald-950/45 text-emerald-400 border border-emerald-500/10';
    if (val === 1) return 'bg-amber-950/45 text-amber-400 border border-amber-500/10';
    return 'bg-rose-950/20 text-rose-450/40 border border-rose-500/5';
  };

  const getCellLabel = (val: number) => {
    if (val === 3) return '●';
    if (val === 2) return '●';
    if (val === 1) return '◐';
    return '○';
  };

  return (
    <div className="bg-slate-900 rounded-[40px] border border-white/5 shadow-xl overflow-hidden">
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between bg-slate-950/20 gap-6">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">
            Empiric Antibiogram
          </h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Common ED & GP Pathogens vs. Antibiotics
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">
              Filter:
            </span>
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  filterType === opt
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-950/50'
                    : 'bg-slate-950 text-slate-400 border-white/5 hover:border-indigo-500/30 hover:text-indigo-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex gap-4 justify-end">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-950/200" />
              <span className="text-[10px] font-black uppercase text-slate-550">Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-950/200" />
              <span className="text-[10px] font-black uppercase text-slate-550">Partial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-950/200/40" />
              <span className="text-[10px] font-black uppercase text-slate-550">None</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-slate-950 p-4 text-left border-b border-r border-white/5 min-w-[180px]">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Pathogen
                </span>
              </th>
              {antibiotics.map((abx) => (
                <th
                  key={abx.short}
                  className="p-4 border-b border-white/5 bg-slate-900 min-w-[80px]"
                >
                  <div className="text-[10px] font-black uppercase text-slate-300 tracking-tighter whitespace-nowrap rotate-[-45deg] py-4">
                    {abx.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPathogens.map((pathogen) => (
              <tr key={pathogen.name} className="hover:bg-slate-950/40/[0.02] transition-colors">
                <td className="sticky left-0 z-10 bg-slate-900 border-r border-b border-white/5 p-4 font-bold text-slate-300 text-sm whitespace-nowrap">
                  <div className="flex flex-col">
                    <span
                      className={
                        pathogen.type === 'Atypical' ||
                        pathogen.type === 'Anaerobe' ||
                        pathogen.type === 'Spirochete'
                          ? 'italic'
                          : ''
                      }
                    >
                      {pathogen.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">
                      {pathogen.microscopy}
                    </span>
                  </div>
                </td>
                {coverage[pathogen.name].map((val, idx) => (
                  <td
                    key={idx}
                    className={`border-b border-white/5 p-0 text-center transition-all`}
                  >
                    <div
                      className={`w-full h-12 flex items-center justify-center text-lg ${getCellColor(val)}`}
                    >
                      {getCellLabel(val)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {filteredPathogens.length === 0 && (
              <tr>
                <td
                  colSpan={antibiotics.length + 1}
                  className="p-12 text-center text-slate-400 font-bold uppercase text-xs tracking-widest"
                >
                  No pathogens found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-slate-900 text-white/50 text-[10px] font-medium leading-relaxed">
        <p className="flex items-center gap-2 mb-2 text-white/80 font-black uppercase tracking-widest">
          <Info className="w-3 h-3" /> Clinical Note
        </p>
        This table is a simplified educational summary of typical coverage patterns. Local
        resistance patterns (e.g., MRSA, ESBL, VRE) vary significantly. Always consult local
        hospital antibiograms and current eTG guidelines for definitive therapy.
      </div>
    </div>
  );
};

export const PharmacologyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'antibiotics' | 'pathogens' | 'antibiogram' | 'interactions'
  >('antibiotics');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [abxInfo, setAbxInfo] = useState<AntibioticInfo | null>(null);
  const [pathogenInfo, setPathogenInfo] = useState<PathogenInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Interaction Checker State
  const [medications, setMedications] = useState<string[]>([]);
  const [medInput, setMedInput] = useState('');
  const [interactionResult, setInteractionResult] = useState<InteractionResult | null>(null);
  const [checkingInteractions, setCheckingInteractions] = useState(false);

  const handleAddMedication = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (medInput.trim() && !medications.includes(medInput.trim())) {
      setMedications([...medications, medInput.trim()]);
      setMedInput('');
    }
  };

  const handleRemoveMedication = (med: string) => {
    setMedications(medications.filter((m) => m !== med));
  };

  const handleCheckInteractions = async () => {
    if (medications.length < 2) {
      setError('Please add at least two medications to check for interactions.');
      return;
    }

    setCheckingInteractions(true);
    setError(null);
    try {
      const result = await gemini.checkMedicationInteractions(medications);
      setInteractionResult(result);
    } catch (err) {
      setError('Failed to check interactions. Please try again.');
      console.error(err);
    } finally {
      setCheckingInteractions(false);
    }
  };

  const handleSearch = async (searchQuery: string, e?: React.FormEvent) => {
    e?.preventDefault();
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'antibiotics') {
        const result = await gemini.getAntibioticInfo(finalQuery);
        setAbxInfo(result);
        setPathogenInfo(null);
      } else {
        const result = await gemini.getPathogenInfo(finalQuery);
        setPathogenInfo(result);
        setAbxInfo(null);
      }
    } catch (err) {
      setError('Failed to fetch information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setQuery(category);
    handleSearch(category);
  };

  const resetView = () => {
    setAbxInfo(null);
    setPathogenInfo(null);
    setInteractionResult(null);
    setQuery('');
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/40 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
          <Pill className="w-4 h-4" /> Microbiology & Antibiotics Guide
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          Clinical <span className="text-indigo-400">Pharmacology</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
          Educational resource for junior doctors to master antibiotic spectrums and pathogen
          classifications.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-950/80 p-1.5 rounded-2xl mb-12 w-fit mx-auto border border-white/5">
        <button
          onClick={() => {
            setActiveTab('antibiotics');
            resetView();
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'antibiotics'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Pill className="w-4 h-4" /> Antibiotics
        </button>
        <button
          onClick={() => {
            setActiveTab('pathogens');
            resetView();
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'pathogens'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bug className="w-4 h-4" /> Pathogens
        </button>
        <button
          onClick={() => {
            setActiveTab('antibiogram');
            resetView();
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'antibiogram'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" /> Antibiogram
        </button>
        <button
          onClick={() => {
            setActiveTab('interactions');
            resetView();
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'interactions'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4" /> Interactions
        </button>
      </div>

      {/* Search Bar (Hidden for Antibiogram and Interactions) */}
      {activeTab !== 'antibiogram' && activeTab !== 'interactions' && (
        <div className="mb-12">
          <form onSubmit={(e) => handleSearch(query, e)} className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                activeTab === 'antibiotics'
                  ? 'Search antibiotic (e.g., Meropenem, Ceftriaxone)...'
                  : 'Search pathogen (e.g., S. aureus, E. coli, Mycoplasma)...'
              }
              className="w-full bg-slate-900 border-2 border-white/5 rounded-[32px] py-6 pl-16 pr-32 text-xl font-medium focus:outline-none focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm text-white"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-3 bottom-3 px-8 bg-slate-950 text-white rounded-[24px] font-bold text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:hover:bg-slate-950 flex items-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Explore'}
            </button>
          </form>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 text-center"
          >
            <div className="w-20 h-20 bg-indigo-950/40 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-indigo-500/10">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest">
              Analyzing Data...
            </h3>
            <p className="text-slate-400 font-medium mt-2">
              Fetching educational insights from clinical databases.
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 bg-red-950/20 border border-red-500/15 rounded-[40px] text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-200">{error}</h3>
            <button
              onClick={resetView}
              className="mt-6 px-6 py-2 bg-red-900/35 border border-red-500/20 text-red-300 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-900/60 transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        ) : abxInfo ? (
          <motion.div
            key="abx-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <button
              onClick={resetView}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Categories
            </button>
            {/* Abx Header */}
            <div className="bg-slate-900 p-10 rounded-[48px] border border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">{abxInfo.name}</h2>
                  <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    {abxInfo.class}
                  </p>
                </div>
                <div
                  className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 ${
                    abxInfo.mechanism === 'Bactericidal'
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {abxInfo.mechanism === 'Bactericidal' ? (
                    <ShieldCheck className="w-4 h-4" />
                  ) : (
                    <ShieldAlert className="w-4 h-4" />
                  )}
                  {abxInfo.mechanism}
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed italic mb-6">
                {abxInfo.spectrum}
              </p>

              {abxInfo.stewardshipNote && (
                <div className="bg-rose-950/20 border border-rose-500/10 rounded-2xl p-6 flex items-start gap-4">
                  <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-rose-400 tracking-widest mb-1">
                      Antimicrobial Stewardship Note
                    </h4>
                    <p className="text-rose-250 font-bold text-sm leading-relaxed">
                      {abxInfo.stewardshipNote}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Coverage Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/40 p-8 rounded-[40px] border border-white/5">
                <h3 className="text-[11px] font-black uppercase text-slate-450 mb-6 tracking-widest flex items-center gap-2">
                  <Bug className="w-4 h-4" /> Gram-Positive Coverage
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed">
                  {abxInfo.gramPositiveCoverage}
                </p>
              </div>
              <div className="bg-slate-900/40 p-8 rounded-[40px] border border-white/5">
                <h3 className="text-[11px] font-black uppercase text-slate-450 mb-6 tracking-widest flex items-center gap-2">
                  <Bug className="w-4 h-4" /> Gram-Negative Coverage
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed">
                  {abxInfo.gramNegativeCoverage}
                </p>
              </div>
              <div className="bg-indigo-950/20 p-8 rounded-[40px] border border-indigo-500/15">
                <h3 className="text-[11px] font-black uppercase text-indigo-400 mb-6 tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4" /> Atypical Coverage
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed">
                  {abxInfo.atypicalCoverage}
                </p>
              </div>
              <div className="bg-amber-950/20 p-8 rounded-[40px] border border-amber-500/15">
                <h3 className="text-[11px] font-black uppercase text-amber-400 mb-6 tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4" /> Anaerobic Coverage
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed">
                  {abxInfo.anaerobicCoverage}
                </p>
              </div>
            </div>

            {/* Indications */}
            <div className="bg-slate-900 p-8 rounded-[40px] border border-white/5 shadow-sm">
              <h3 className="text-[11px] font-black uppercase text-slate-455 mb-6 tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> Common Clinical Indications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {abxInfo.commonIndications.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-slate-950/40 border border-white/5 rounded-2xl text-slate-300 font-medium"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : pathogenInfo ? (
          <motion.div
            key="pathogen-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <button
              onClick={resetView}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Search
            </button>
            {/* Pathogen Header */}
            <div className="bg-slate-900 p-10 rounded-[48px] border border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2 italic">
                    {pathogenInfo.name}
                  </h2>
                  <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    {pathogenInfo.classification}
                  </p>
                </div>
                <div className="w-16 h-16 bg-indigo-950/40 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                  <Microscope className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {pathogenInfo.characteristics}
              </p>

              {pathogenInfo.relatedOrganisms && pathogenInfo.relatedOrganisms.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase text-slate-450 mb-4 tracking-widest">
                    Common Species / Organisms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pathogenInfo.relatedOrganisms.map((org, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(org)}
                        className="px-4 py-2 bg-slate-950 hover:bg-indigo-950/40 text-slate-300 hover:text-indigo-455 rounded-xl text-sm font-bold border border-white/5 hover:border-indigo-500/20 transition-all cursor-pointer"
                      >
                        {org}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Infections */}
              <div className="bg-slate-900/40 p-8 rounded-[40px] border border-white/5">
                <h3 className="text-[11px] font-black uppercase text-slate-455 mb-6 tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Common Infections
                </h3>
                <ul className="space-y-4">
                  {pathogenInfo.commonInfections.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-350 font-medium">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-950/200 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Typical Abx */}
              <div className="bg-indigo-950/20 p-8 rounded-[40px] border border-indigo-500/15">
                <h3 className="text-[11px] font-black uppercase text-indigo-400 mb-6 tracking-widest flex items-center gap-2">
                  <Pill className="w-4 h-4" /> Typical Antibiotics
                </h3>
                <ul className="space-y-4">
                  {pathogenInfo.typicalAntibiotics.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-350 font-medium">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-550 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'interactions' ? (
          <motion.div
            key="interactions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-slate-900 p-8 rounded-[40px] border border-white/5 shadow-sm">
              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                Interaction Checker
              </h2>
              <p className="text-slate-450 font-medium mb-8">
                Add medications to check for interactions, synergisms, and contraindications.
              </p>

              <form onSubmit={handleAddMedication} className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={medInput}
                  onChange={(e) => setMedInput(e.target.value)}
                  placeholder="Enter medication name (e.g., Furosemide)"
                  className="flex-1 bg-slate-950 border-2 border-white/5 rounded-2xl py-4 px-6 text-lg font-medium focus:outline-none focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 text-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!medInput.trim()}
                  className="px-8 bg-indigo-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-indigo-750 transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-5 h-5" /> Add
                </button>
              </form>

              {medications.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {medications.map((med, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-indigo-950/40 text-indigo-400 px-4 py-2 rounded-xl border border-indigo-500/20"
                    >
                      <Pill className="w-4 h-4" />
                      <span className="font-bold">{med}</span>
                      <button
                        onClick={() => handleRemoveMedication(med)}
                        className="p-1 hover:bg-indigo-900/55 rounded-lg transition-colors ml-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleCheckInteractions}
                disabled={medications.length < 2 || checkingInteractions}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 disabled:hover:bg-slate-900 flex items-center justify-center gap-3"
              >
                {checkingInteractions ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Interactions...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-5 h-5" /> Check Interactions
                  </>
                )}
              </button>
            </div>

            {interactionResult && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-indigo-950/20 p-8 rounded-[32px] border border-indigo-500/15">
                  <h3 className="text-[11px] font-black uppercase text-indigo-400 mb-4 tracking-widest flex items-center gap-2">
                    <Info className="w-4 h-4" /> Clinical Summary
                  </h3>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    {interactionResult.summary}
                  </p>
                </div>

                {interactionResult.contraindications.length === 0 &&
                  interactionResult.interactions.length === 0 &&
                  interactionResult.synergisms.length === 0 && (
                    <div className="bg-slate-900/40 p-8 rounded-[32px] border border-white/5 text-center">
                      <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                      <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-1">
                        No Major Interactions Detected
                      </h3>
                      <p className="text-slate-400 font-medium text-sm">
                        No significant interactions, synergisms, or contraindications were found for
                        this combination. However, always exercise clinical judgment.
                      </p>
                    </div>
                  )}

                {interactionResult.contraindications.length > 0 && (
                  <div className="bg-rose-950/20 p-8 rounded-[32px] border border-rose-500/15">
                    <h3 className="text-[11px] font-black uppercase text-rose-450 mb-6 tracking-widest flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" /> Absolute Contraindications
                    </h3>
                    <div className="space-y-4">
                      {interactionResult.contraindications.map((ci, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-900 p-6 rounded-2xl border border-rose-500/10 shadow-sm"
                        >
                          <div className="flex gap-2 mb-3">
                            {ci.drugs.map((drug, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-3 py-1 bg-rose-900/40 text-rose-400 rounded-lg text-xs font-bold border border-rose-500/10"
                              >
                                {drug}
                              </span>
                            ))}
                          </div>
                          <p className="text-slate-350 font-medium">{ci.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {interactionResult.interactions.length > 0 && (
                  <div className="bg-amber-950/20 p-8 rounded-[32px] border border-amber-500/15">
                    <h3 className="text-[11px] font-black uppercase text-amber-450 mb-6 tracking-widest flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Known Interactions
                    </h3>
                    <div className="space-y-4">
                      {interactionResult.interactions.map((interaction, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-900 p-6 rounded-2xl border border-amber-500/10 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-2">
                              {interaction.drugs.map((drug, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="px-3 py-1 bg-amber-900/40 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/10"
                                >
                                  {drug}
                                </span>
                              ))}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                interaction.severity === 'high'
                                  ? 'bg-rose-950 text-rose-400 border border-rose-500/20'
                                  : interaction.severity === 'moderate'
                                    ? 'bg-amber-950 text-amber-400 border border-amber-500/20'
                                    : 'bg-blue-950 text-blue-400 border border-blue-500/20'
                              }`}
                            >
                              {interaction.severity} Risk
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                Effect
                              </span>
                              <p className="text-slate-300 font-medium text-sm">
                                {interaction.description}
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                Mechanism
                              </span>
                              <p className="text-slate-400 text-sm">{interaction.mechanism}</p>
                            </div>
                            <div className="bg-amber-955/20 p-4 rounded-xl border border-amber-500/15 mt-4">
                              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-1">
                                Management
                              </span>
                              <p className="text-amber-300 font-medium text-sm">
                                {interaction.management}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {interactionResult.synergisms.length > 0 && (
                  <div className="bg-emerald-950/20 p-8 rounded-[32px] border border-emerald-500/15">
                    <h3 className="text-[11px] font-black uppercase text-emerald-450 mb-6 tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Synergistic Effects
                    </h3>
                    <div className="space-y-4">
                      {interactionResult.synergisms.map((syn, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-900 p-6 rounded-2xl border border-emerald-500/10 shadow-sm"
                        >
                          <div className="flex gap-2 mb-3">
                            {syn.drugs.map((drug, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-3 py-1 bg-emerald-900/40 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/10"
                              >
                                {drug}
                              </span>
                            ))}
                          </div>
                          <p className="text-slate-300 font-medium">{syn.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : activeTab === 'antibiogram' ? (
          <motion.div
            key="antibiogram"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AntibiogramTable />
          </motion.div>
        ) : activeTab === 'antibiotics' ? (
          <motion.div
            key="abx-categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ANTIBIOTIC_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group bg-slate-900 p-8 rounded-[40px] border border-white/5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/20 transition-all text-left flex flex-col h-full cursor-pointer"
                >
                  <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-indigo-950/40 transition-colors border border-white/5">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-indigo-400 font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    Explore Class <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pathogen-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <div className="w-20 h-20 bg-slate-900 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-white/5">
              <Bug className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-450 uppercase tracking-widest">
              Pathogen Database
            </h3>
            <p className="text-slate-400 font-medium mt-2 mb-12">
              Search for a specific pathogen to see its classification and treatment.
            </p>

            <div className="max-w-4xl mx-auto space-y-12">
              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">
                  Quick Search Morphology
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Gram Positive Cocci', 'Gram Negative Bacilli', 'Anaerobes', 'Atypicals'].map(
                    (morph) => (
                      <button
                        key={morph}
                        onClick={() => handleSearch(morph)}
                        className="p-4 bg-slate-900 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-950/40 transition-all cursor-pointer"
                      >
                        {morph}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">
                  Common Pathogens
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    'S. aureus',
                    'S. pyogenes',
                    'S. pneumoniae',
                    'E. coli',
                    'Klebsiella',
                    'Pseudomonas',
                    'H. influenzae',
                    'Legionella'
                  ].map((pathogen) => (
                    <button
                      key={pathogen}
                      onClick={() => handleSearch(pathogen)}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-950/40 text-slate-350 hover:text-indigo-455 rounded-xl text-xs font-bold border border-white/5 hover:border-indigo-500/20 transition-all cursor-pointer"
                    >
                      {pathogen}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PharmacologyView;
