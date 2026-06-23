import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Pill,
  Wind,
  FileText,
  Lightbulb,
  Zap,
  Ruler,
  Box,
} from 'lucide-react';
import { PharmacologyTab } from '../components/anaesthetics/PharmacologyTab';
import { PhysiologyTab } from '../components/anaesthetics/PhysiologyTab';
import { CurriculumTab } from '../components/anaesthetics/CurriculumTab';

type MainTab = 'physiology' | 'pharmacology' | 'airway' | 'mnemonics' | 'procedures' | 'curriculum';

const AnaestheticsCCView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('pharmacology');

  const mainTabs = [
    { id: 'physiology', name: 'Physiology', icon: <Activity className="w-5 h-5" /> },
    { id: 'pharmacology', name: 'Pharmacology', icon: <Pill className="w-5 h-5" /> },
    { id: 'airway', name: 'Airway & Sizing', icon: <Wind className="w-5 h-5" /> },
    { id: 'mnemonics', name: 'Mnemonics', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'procedures', name: 'Procedures', icon: <Zap className="w-5 h-5" /> },
    { id: 'curriculum', name: 'Curriculum', icon: <FileText className="w-5 h-5" /> }
  ];

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
          <PharmacologyTab key="pharmacology" />
        ) : activeTab === 'physiology' ? (
          <PhysiologyTab key="physiology" />
        ) : activeTab === 'curriculum' ? (
          <CurriculumTab key="curriculum" />
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
