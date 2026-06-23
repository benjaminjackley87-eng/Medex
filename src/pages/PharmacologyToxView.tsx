import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Pill,
  ShieldCheck,
  AlertCircle,
  Info,
  Syringe,
  Search,
  Skull,
  Activity
} from 'lucide-react';
import { ATODS_DATA, AGITATION_MANAGEMENT, TOXIDROMES_DATA } from '../data/collections/pharmacologyTox';
import { ClinicalCard } from '../components/ui/ClinicalCard';
import { useClinicalSearch } from '../hooks/useClinicalSearch';

type PharmacologyToxTab = 'atods' | 'toxidromes' | 'agitation';

export const PharmacologyToxView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PharmacologyToxTab>('atods');
  const [searchQuery, setSearchQuery] = useState('');

  const { results: filteredATODs, didYouMean: didYouMeanATODs } = useClinicalSearch(
    ATODS_DATA,
    searchQuery,
    ['category', 'substances']
  );

  const { results: filteredAgitation, didYouMean: didYouMeanAgitation } = useClinicalSearch(
    AGITATION_MANAGEMENT,
    searchQuery,
    ['class', 'medications']
  );

  const { results: filteredToxidromes, didYouMean: didYouMeanToxidromes } = useClinicalSearch(
    TOXIDROMES_DATA,
    searchQuery,
    ['name', 'features']
  );

  const didYouMean = didYouMeanATODs || didYouMeanAgitation || didYouMeanToxidromes;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/40 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
          <Skull className="w-4 h-4" /> Pillar 2: Pharmacopoeia & Tox
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          Pharmacology & <span className="text-indigo-455">Toxicology</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl font-medium">
          Comprehensive reference for illicit substances, toxidromes, and acute agitation
          management.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-950/80 p-1.5 rounded-2xl mb-12 w-fit border border-white/5">
        <button
          onClick={() => setActiveTab('atods')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'atods'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Pill className="w-4 h-4" /> ATODs
        </button>
        <button
          onClick={() => setActiveTab('toxidromes')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'toxidromes'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Skull className="w-4 h-4" /> Toxidromes
        </button>
        <button
          onClick={() => setActiveTab('agitation')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'agitation'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertCircle className="w-4 h-4" /> Agitation
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-12 relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="w-6 h-6 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search protocols, substances, or features..."
          className="w-full bg-slate-900 border-2 border-white/5 rounded-[32px] py-6 pl-16 pr-8 text-xl font-medium focus:outline-none focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm text-white"
        />
      </div>

      {didYouMean && (
        <div className="max-w-4xl mx-auto mb-8 flex justify-center">
          <button
            onClick={() => setSearchQuery(didYouMean)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-400 rounded-2xl transition-all shadow-sm border border-indigo-500/15 cursor-pointer"
          >
            <span className="text-xs font-black uppercase tracking-widest text-indigo-500">
              Did you mean
            </span>
            <span className="text-sm font-bold border-b border-indigo-400 border-dashed">
              {didYouMean}
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-indigo-500">?</span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === 'atods' && (
          <motion.div
            key="atods"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-8"
          >
            {filteredATODs.map((item, idx) => (
              <ClinicalCard
                key={idx}
                title={item.category}
                subtitle={item.substances}
                icon={Pill}
                details={[
                  { label: 'Presentation', content: item.presentation, icon: Activity },
                  {
                    label: 'Acute Management',
                    content: item.management,
                    icon: ShieldCheck,
                    labelColorClass: 'text-indigo-400'
                  },
                  {
                    label: 'Withdrawal Protocol',
                    content: item.withdrawal,
                    icon: AlertCircle,
                    labelColorClass: 'text-amber-450'
                  }
                ]}
              />
            ))}
          </motion.div>
        )}

        {activeTab === 'toxidromes' && (
          <motion.div
            key="toxidromes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-8"
          >
            {filteredToxidromes.map((item, idx) => (
              <ClinicalCard
                key={idx}
                title={item.name}
                icon={Skull}
                headerColorClass="bg-slate-950/40"
                gridCols={3}
                details={[
                  { label: 'Classic Features', content: item.features, icon: Activity },
                  {
                    label: 'Common Causes',
                    content: item.causes,
                    icon: Pill,
                    labelColorClass: 'text-blue-400'
                  },
                  {
                    label: 'Stepwise Examination',
                    content: item.examination,
                    icon: Search,
                    labelColorClass: 'text-amber-450'
                  },
                  {
                    label: 'Typical Findings',
                    content: item.findings,
                    icon: Info,
                    labelColorClass: 'text-indigo-400'
                  },
                  {
                    label: 'Investigations',
                    content: item.investigations,
                    icon: Activity,
                    labelColorClass: 'text-purple-400'
                  },
                  {
                    label: 'Management',
                    content: item.management,
                    icon: ShieldCheck,
                    labelColorClass: 'text-emerald-450'
                  }
                ]}
              />
            ))}
          </motion.div>
        )}

        {activeTab === 'agitation' && (
          <motion.div
            key="agitation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-8"
          >
            {filteredAgitation.map((item, idx) => (
              <ClinicalCard
                key={idx}
                title={item.class}
                subtitle={item.medications}
                icon={AlertCircle}
                headerColorClass="bg-rose-950/20"
                gridCols={4}
                details={[
                  { label: 'Indications', content: item.indications, icon: Info },
                  {
                    label: 'Typical Dosage',
                    content: item.dosage,
                    icon: Syringe,
                    labelColorClass: 'text-blue-400',
                    colorClass: 'text-slate-100 font-bold'
                  },
                  {
                    label: 'Benefits (Pros)',
                    content: item.pros,
                    icon: ShieldCheck,
                    labelColorClass: 'text-emerald-450'
                  },
                  {
                    label: 'Risks (Cons)',
                    content: item.cons,
                    icon: AlertCircle,
                    labelColorClass: 'text-rose-455'
                  }
                ]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Disclaimer */}
      <div className="mt-16 p-8 bg-slate-950 rounded-[32px] text-white/50 text-[10px] font-medium leading-relaxed border border-white/5">
        <p className="flex items-center gap-2 mb-2 text-white/80 font-black uppercase tracking-widest">
          <Info className="w-3 h-3" /> Clinical Decision Support Disclaimer
        </p>
        These protocols are for educational purposes and junior doctor decision support. They
        represent common Australian clinical practice (eTG, CHRISP). Always verify dosages and
        management plans with senior clinicians and current local hospital guidelines before
        application.
      </div>
    </div>
  );
};

export default PharmacologyToxView;
