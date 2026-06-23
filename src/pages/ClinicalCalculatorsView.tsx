import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  Search,
  Activity,
  Brain,
  Wind,
  AlertTriangle,
  Info,
  ChevronRight,
  Scale,
  Droplets,
  Heart
} from 'lucide-react';

// Import modular calculators
import { GCSCalculator } from '../features/calculators/GCSCalculator';
import { WellsPECalculator } from '../features/calculators/WellsPECalculator';
import { QSOFACalculator } from '../features/calculators/QSOFACalculator';
import { useClinicalSearch } from '../hooks/useClinicalSearch';
import { BMICalculator } from '../features/calculators/BMICalculator';
import { CreatinineClearanceCalculator } from '../features/calculators/CreatinineClearanceCalculator';
import { CHADSVAScCalculator } from '../features/calculators/CHADSVAScCalculator';
import { MAPCalculator } from '../features/calculators/MAPCalculator';
import { CorrectedCalciumCalculator } from '../features/calculators/CorrectedCalciumCalculator';
import { AnionGapCalculator } from '../features/calculators/AnionGapCalculator';
import { AlveolarGasCalculator } from '../features/calculators/AlveolarGasCalculator';

interface CalculatorItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  component: React.FC;
}

const CALCULATORS: CalculatorItem[] = [
  {
    id: 'gcs',
    name: 'Glasgow Coma Scale',
    category: 'Neurology',
    description: 'Assess level of consciousness in trauma and acute illness.',
    icon: Brain,
    component: GCSCalculator
  },
  {
    id: 'wells-pe',
    name: 'Wells Score (PE)',
    category: 'Respiratory',
    description: 'Clinical probability of Pulmonary Embolism.',
    icon: Wind,
    component: WellsPECalculator
  },
  {
    id: 'alveolar-gas',
    name: 'Alveolar Gas Equation',
    category: 'Respiratory',
    description: 'Calculate alveolar oxygen tension (PAO2) and A-a gradient.',
    icon: Wind,
    component: AlveolarGasCalculator
  },
  {
    id: 'qsofa',
    name: 'qSOFA Score',
    category: 'Critical Care',
    description: 'Quick Sequential Organ Failure Assessment for sepsis risk.',
    icon: AlertTriangle,
    component: QSOFACalculator
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'General',
    description: 'Body Mass Index calculation for nutritional assessment.',
    icon: Scale,
    component: BMICalculator
  },
  {
    id: 'crcl',
    name: 'Creatinine Clearance',
    category: 'Renal',
    description: 'Cockcroft-Gault equation for estimating GFR.',
    icon: Droplets,
    component: CreatinineClearanceCalculator
  },
  {
    id: 'chads-vasc',
    name: 'CHA₂DS₂-VASc',
    category: 'Cardiology',
    description: 'Stroke risk assessment in Atrial Fibrillation.',
    icon: Heart,
    component: CHADSVAScCalculator
  },
  {
    id: 'map',
    name: 'Mean Arterial Pressure',
    category: 'Cardiology',
    description: 'Calculate average arterial pressure during a single cardiac cycle.',
    icon: Activity,
    component: MAPCalculator
  },
  {
    id: 'corrected-ca',
    name: 'Corrected Calcium',
    category: 'Biochemistry',
    description: 'Adjust total calcium for albumin concentration.',
    icon: Droplets,
    component: CorrectedCalciumCalculator
  },
  {
    id: 'anion-gap',
    name: 'Anion Gap',
    category: 'Biochemistry',
    description: 'Calculate the difference between measured cations and anions.',
    icon: Activity,
    component: AnionGapCalculator
  }
];

export const ClinicalCalculatorsView: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { results: filteredCalcs, didYouMean } = useClinicalSearch(CALCULATORS, searchQuery, [
    'name',
    'category'
  ]);

  const SelectedCalc = useMemo(() => {
    return CALCULATORS.find((c) => c.id === activeCalc)?.component || null;
  }, [activeCalc]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-950/30">
          <Calculator className="w-4 h-4" /> Clinical Tools
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          Clinical <span className="text-indigo-600">Calculators</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl font-medium">
          Validated clinical scoring systems and decision rules for rapid bedside assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculators..."
              className="w-full bg-slate-950/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>

          {didYouMean && (
            <div className="flex justify-start">
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

          <div className="space-y-2">
            {filteredCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalc(calc.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${
                  activeCalc === calc.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/40'
                    : 'bg-slate-950/40 border border-white/5 text-slate-400 hover:border-white/5'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activeCalc === calc.id
                      ? 'bg-slate-950/40/20'
                      : 'bg-indigo-950/20 text-indigo-600'
                  }`}
                >
                  <calc.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black uppercase tracking-tight">{calc.name}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest opacity-60`}>
                    {calc.category}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${activeCalc === calc.id ? 'rotate-90' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Display */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeCalc ? (
              <motion.div
                key={activeCalc}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-950/40 rounded-[40px] border border-white/5 shadow-sm p-10"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-indigo-950/20 rounded-3xl flex items-center justify-center">
                    {(() => {
                      const Icon = CALCULATORS.find((c) => c.id === activeCalc)?.icon || Calculator;
                      return <Icon className="w-8 h-8 text-indigo-600" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                      {CALCULATORS.find((c) => c.id === activeCalc)?.name}
                    </h2>
                    <p className="text-slate-400 font-medium">
                      {CALCULATORS.find((c) => c.id === activeCalc)?.description}
                    </p>
                  </div>
                </div>

                {SelectedCalc && <SelectedCalc />}

                <div className="mt-10 p-6 bg-slate-950/20 rounded-2xl border border-white/5 flex items-start gap-4">
                  <Info className="w-5 h-5 text-slate-400 mt-0.5" />
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    This calculator is for educational purposes only. Clinical decisions should be
                    based on comprehensive patient assessment and local guidelines.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] bg-slate-950/20 rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-slate-950/40 rounded-3xl flex items-center justify-center shadow-sm mb-6">
                  <Calculator className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-tight mb-2">
                  Select a Calculator
                </h3>
                <p className="text-slate-400 text-sm max-w-xs font-medium">
                  Choose a clinical tool from the list to begin your assessment.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCalculatorsView;
