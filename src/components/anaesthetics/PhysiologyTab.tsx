import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Zap,
  Info,
  Heart,
  Users,
  Wind,
  Droplets,
  Brain,
  Baby,
  UserPlus,
  Scale
} from 'lucide-react';

type PhysCategory = 'normal' | 'populations' | 'anaesthesia';

export const PhysiologyTab: React.FC = () => {
  const [activePhysCategory, setActivePhysCategory] = useState<PhysCategory>('normal');
  const [selectedPhysTopic, setSelectedPhysTopic] = useState<string | null>(null);

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
                      {physTopics[activePhysCategory].find((t) => t.id === selectedPhysTopic)?.name}
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
  );
};
