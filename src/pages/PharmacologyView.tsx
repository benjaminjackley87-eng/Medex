import React, { useState } from 'react';
import {
  Search,
  Pill,
  Bug,
  Loader2,
  AlertCircle,
  ChevronRight,
  Activity,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';
import { AntibioticInfo, PathogenInfo } from '../types';
import { ANTIBIOTIC_CATEGORIES } from '../data/collections/antibiotics';
import { AntibiogramTable } from './pharmacology/AntibiogramTable';
import { InteractionChecker } from './pharmacology/InteractionChecker';
import { AntibioticDetail } from './pharmacology/AntibioticDetail';
import { PathogenDetail } from './pharmacology/PathogenDetail';

const gemini = geminiService;

export const PharmacologyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'antibiotics' | 'pathogens' | 'antibiogram' | 'interactions'
  >('antibiotics');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [abxInfo, setAbxInfo] = useState<AntibioticInfo | null>(null);
  const [pathogenInfo, setPathogenInfo] = useState<PathogenInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          <AntibioticDetail abxInfo={abxInfo} resetView={resetView} />
        ) : pathogenInfo ? (
          <PathogenDetail
            pathogenInfo={pathogenInfo}
            resetView={resetView}
            handleSearch={handleSearch}
          />
        ) : activeTab === 'interactions' ? (
          <InteractionChecker setError={setError} />
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
