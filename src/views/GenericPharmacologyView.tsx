import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Pill,
  Activity,
  Info,
  AlertTriangle,
  ShieldAlert,
  BookOpen,
  ChevronRight,
  Loader2,
  Thermometer,
  FlaskConical,
  Beaker,
  Baby,
  Clock,
  Zap
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { DrugInfo, DrugMapping, DosageInfo } from '../types';

export const GenericPharmacologyView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'drug' | 'condition'>('drug');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null);
  const [suggestedDrugs, setSuggestedDrugs] = useState<DrugMapping[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setSelectedDrug(null);
    setSuggestedDrugs([]);

    try {
      if (searchType === 'drug') {
        const info = await geminiService.getDrugInfo(searchQuery);
        setSelectedDrug(info);
      } else {
        const mappings = await geminiService.getDrugsForCondition(searchQuery);
        setSuggestedDrugs(mappings);
      }

      // Add to recent searches
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s.toLowerCase() !== searchQuery.toLowerCase());
        return [searchQuery, ...filtered].slice(0, 5);
      });
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to retrieve pharmacology data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestedDrug = async (drugName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const info = await geminiService.getDrugInfo(drugName);
      setSelectedDrug(info);
      setSearchType('drug');
      setSearchQuery(drugName);
    } catch (err) {
      setError('Failed to load drug detailed information.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      {/* Hero Search Section */}
      <div className="bg-slate-950/40 border-b border-white/5 pt-16 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-indigo-600 p-4 rounded-3xl shadow-lg shadow-indigo-950/40">
              <Pill className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
            Generic Pharmacology Hub
          </h1>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Access comprehensive drug monographs and evidence-based therapeutic guidelines tailored
            for TNQ clinicians.
          </p>

          <div className="flex justify-center gap-2 mb-10 p-1.5 bg-slate-950/40 backdrop-blur-sm rounded-2xl w-fit mx-auto border border-white/5">
            <button
              onClick={() => setSearchType('drug')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                searchType === 'drug'
                  ? 'bg-slate-950/40 text-indigo-600 shadow-md shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-350'
              }`}
            >
              Drug Reference
            </button>
            <button
              onClick={() => setSearchType('condition')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                searchType === 'condition'
                  ? 'bg-slate-950/40 text-indigo-600 shadow-md shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-350'
              }`}
            >
              Therapeutic Choice
            </button>
          </div>

          <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchType === 'drug'
                  ? 'Search generic name, trade name or class...'
                  : 'Search condition (e.g. Sepsis, Atrial Fibrillation)...'
              }
              className="w-full bg-slate-950/40 border-2 border-white/5 rounded-[40px] py-8 pl-18 pr-40 text-2xl font-semibold focus:outline-none focus:border-indigo-500/50 focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-xl shadow-slate-950/50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-4 top-4 bottom-4 px-10 bg-indigo-600 text-white rounded-[32px] font-black text-sm hover:bg-indigo-700 disabled:bg-slate-300 transition-all flex items-center gap-2 shadow-lg shadow-indigo-950/40"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEARCH HUB'}
            </button>
          </form>

          {recentSearches?.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="text-sm font-black text-slate-400 uppercase tracking-widest self-center mr-2">
                Recent:
              </span>
              {recentSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(s);
                    handleSearch();
                  }}
                  className="text-sm font-bold text-slate-400 bg-slate-950/40 border border-white/5 px-5 py-2 rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-rose-950/20 border-2 border-rose-950/30 p-8 rounded-[32px] flex items-center gap-6 text-rose-455 shadow-lg shadow-rose-100"
            >
              <div className="bg-rose-100 p-3 rounded-2xl">
                <AlertTriangle className="w-8 h-8 shrink-0" />
              </div>
              <p className="font-bold text-lg">{error}</p>
            </motion.div>
          )}

          {isLoading && !selectedDrug && suggestedDrugs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-slate-400"
            >
              <div className="relative mb-8">
                <Loader2 className="w-16 h-16 animate-spin text-indigo-500" />
                <Pill className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xl font-bold text-slate-400 tracking-tight">
                Retrieving pharmacology data from QLD Health & AMH...
              </p>
            </motion.div>
          )}

          {suggestedDrugs?.length > 0 && !selectedDrug && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <h2 className="text-3xl font-black text-white flex items-center gap-4">
                <div className="bg-emerald-100 p-2 rounded-xl">
                  <Activity className="w-8 h-8 text-emerald-600" />
                </div>
                Therapeutic Guidelines: {searchQuery}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(suggestedDrugs || []).map((mapping, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-slate-950/40 border border-white/5 rounded-[40px] p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                    onClick={() => handleSelectSuggestedDrug(mapping.drug_name)}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${
                          mapping.line_of_treatment === '1st line'
                            ? 'bg-emerald-100 text-emerald-400'
                            : mapping.line_of_treatment === '2nd line'
                              ? 'bg-amber-100 text-amber-400'
                              : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {mapping.line_of_treatment}
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-indigo-600 transition-colors">
                      {mapping.drug_name}
                    </h3>
                    <p className="text-sm text-slate-400 font-bold mb-6 tracking-wide">
                      {mapping.therapeutic_class}
                    </p>
                    {mapping.note && (
                      <div className="relative pt-6 border-t border-white/5">
                        <p className="text-sm text-slate-400 leading-relaxed italic font-medium">
                          {mapping.note}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedDrug && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              {/* Drug Header Card */}
              <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-[56px] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 group">
                <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Pill className="w-[400px] h-[400px] rotate-[30deg]" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-white/80">
                    <span className="bg-indigo-950/200 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20">
                      {selectedDrug.therapeuticClass}
                    </span>
                    {selectedDrug.retrievedAt && (
                      <span className="text-indigo-200/60 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Updated{' '}
                        {new Date(selectedDrug.retrievedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h2 className="text-7xl font-black mb-8 tracking-tighter leading-none">
                    {selectedDrug.name}
                  </h2>

                  {selectedDrug.tradeNames?.length > 0 && (
                    <div className="flex flex-wrap gap-4 items-center">
                      <span className="text-sm font-black uppercase tracking-widest text-indigo-300">
                        Trade Names:
                      </span>
                      {selectedDrug.tradeNames.map((tn, i) => (
                        <span
                          key={i}
                          className="bg-slate-950/40/15 backdrop-blur-md px-5 py-2 rounded-2xl text-sm font-black border border-white/10 hover:bg-slate-950/40/20 transition-colors cursor-default"
                        >
                          {tn}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Dynamics & Mechanism */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Pharmacology Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-slate-950/40 border-2 border-white/5 rounded-[48px] p-10 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-950/20 rounded-bl-[80px] -mr-8 -mt-8 -z-0 transition-transform group-hover:scale-110" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="bg-amber-100 p-3 rounded-2xl">
                            <FlaskConical className="w-8 h-8 text-amber-600" />
                          </div>
                          <h3 className="text-2xl font-black text-white tracking-tight">
                            Pharmacokinetics
                          </h3>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                          {selectedDrug.pharmacokinetics}
                        </p>
                      </div>
                    </section>

                    <section className="bg-slate-950/40 border-2 border-white/5 rounded-[48px] p-10 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-950/20 rounded-bl-[80px] -mr-8 -mt-8 -z-0 transition-transform group-hover:scale-110" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="bg-blue-100 p-3 rounded-2xl">
                            <Beaker className="w-8 h-8 text-blue-600" />
                          </div>
                          <h3 className="text-2xl font-black text-white tracking-tight">
                            Pharmacodynamics
                          </h3>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                          {selectedDrug.pharmacodynamics}
                        </p>
                      </div>
                    </section>
                  </div>

                  <section className="bg-slate-950/40 border-2 border-white/5 rounded-[48px] p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-purple-950/20 rounded-bl-[120px] -mr-12 -mt-12 -z-0 transition-transform group-hover:scale-110" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-purple-100 p-3 rounded-2xl">
                          <Zap className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tight">
                          Mechanism of Action
                        </h3>
                      </div>
                      <p className="text-slate-400 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                        {selectedDrug.mechanismOfAction}
                      </p>
                    </div>
                  </section>

                  {/* Dosages Section - Enhanced Polish */}
                  <section className="bg-slate-950/40 border-2 border-white/5 rounded-[56px] p-12 shadow-md relative overflow-hidden">
                    <div className="flex justify-between items-center mb-12">
                      <div className="flex items-center gap-5">
                        <div className="bg-rose-100 p-4 rounded-[24px]">
                          <Thermometer className="w-10 h-10 text-rose-600" />
                        </div>
                        <h3 className="text-4xl font-black text-white tracking-tighter">
                          Clinical Dosaging
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-10">
                      {(selectedDrug.dosages || []).map((dose, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          className="bg-slate-950/20 border border-white/5 rounded-[40px] p-10 relative group"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                            <div className="space-y-1">
                              <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em]">
                                Indication
                              </span>
                              <h4 className="text-2xl font-black text-white group-hover:text-indigo-600 transition-colors">
                                {dose.indication}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="bg-slate-950/40 px-5 py-2.5 rounded-2xl border border-white/5 text-xs font-black text-slate-400 shadow-sm">
                                {dose.route}
                              </span>
                              <span className="bg-slate-950/40 px-5 py-2.5 rounded-2xl border border-white/5 text-xs font-black text-slate-400 shadow-sm">
                                {dose.frequency}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 shadow-sm">
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-3">
                                Adult Dosage
                              </span>
                              <p className="text-white font-black text-lg leading-relaxed">
                                {dose.adultDose}
                              </p>
                            </div>
                            {dose.paediatricDose && (
                              <div className="bg-cyan-50 border border-cyan-100 rounded-3xl p-6 shadow-sm">
                                <span className="text-[10px] font-black uppercase text-cyan-600 tracking-[0.2em] block mb-3">
                                  Paediatric Dosage
                                </span>
                                <p className="text-cyan-900 font-black text-lg leading-relaxed">
                                  {dose.paediatricDose}
                                </p>
                              </div>
                            )}
                          </div>

                          {dose.notes && (
                            <div className="mt-8 pt-8 border-t border-white/5/60 flex items-start gap-3">
                              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                              <p className="text-base text-slate-400 font-bold leading-relaxed italic">
                                {dose.notes}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {selectedDrug.paediatricDosages && (
                      <div className="mt-12 bg-indigo-950/20 border-2 border-indigo-950/30 rounded-[40px] p-10 flex items-start gap-8 shadow-inner">
                        <div className="bg-slate-950/40 p-4 rounded-3xl shadow-md">
                          <Baby className="w-10 h-10 text-indigo-600 shrink-0" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em] mb-4">
                            QLD Health Paediatric Notes
                          </h4>
                          <p className="text-indigo-900 text-lg font-bold leading-relaxed whitespace-pre-wrap">
                            {selectedDrug.paediatricDosages}
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                </div>

                {/* Right Column: Sidebar Info */}
                <div className="space-y-8">
                  {/* Indications */}
                  <section className="bg-slate-950/40 border border-white/5 rounded-[48px] p-8 shadow-sm overflow-hidden group">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                      <BookOpen className="w-5 h-5" /> Main Indications
                    </h3>
                    <ul className="space-y-5">
                      {(selectedDrug.indications || []).map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2.5 shrink-0 shadow-sm shadow-indigo-950/40" />
                          <span className="text-slate-300 text-base font-bold leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Contraindications - Bold Red */}
                  <section className="bg-rose-950/20 border-2 border-rose-950/30 rounded-[48px] p-8 shadow-md overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                      <ShieldAlert className="w-24 h-24" />
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-rose-500 mb-8 flex items-center gap-3 relative z-10">
                      <ShieldAlert className="w-5 h-5" /> CRITICAL CONTRAINDICATIONS
                    </h3>
                    <ul className="space-y-5 relative z-10">
                      {(selectedDrug.contraindications || []).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 bg-slate-950/40/40 p-4 rounded-2xl border border-rose-200/50"
                        >
                          <div className="w-2 h-2 rounded-full bg-rose-950/200 mt-2.5 shrink-0" />
                          <span className="text-rose-900 text-base font-black leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Adverse Effects */}
                  <section className="bg-slate-950/40 border border-white/5 rounded-[48px] p-8 shadow-sm overflow-hidden">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                      <Info className="w-5 h-5" /> ADVERSE REACTION PROFILE
                    </h3>
                    <ul className="space-y-5">
                      {(selectedDrug.adverseEffects || []).map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-slate-200 mt-2.5 shrink-0" />
                          <span className="text-slate-400 text-base font-bold leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="bg-indigo-900 rounded-[40px] p-10 border border-indigo-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent" />
                    <p className="text-xs text-indigo-200 leading-relaxed text-center font-black uppercase tracking-widest relative z-10">
                      Educational Resource Only. Verify all dosing against current Queensland Health
                      medication charts and local protocols.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!selectedDrug && suggestedDrugs.length === 0 && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 flex flex-col items-center text-slate-300"
            >
              <div className="bg-slate-900 p-8 rounded-full mb-8">
                <Search className="w-20 h-20 opacity-20" />
              </div>
              <p className="text-2xl font-black text-slate-400 tracking-tight">
                Enter a drug or condition to begin
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GenericPharmacologyView;
