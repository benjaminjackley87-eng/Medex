import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Search,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  Heart,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
  Loader2,
  PlusCircle
} from 'lucide-react';

import { ECGPattern } from '../types';
import { storage } from '../services/storageService';
import { GeminiService } from '../services/geminiService';
import { useClinicalSearch } from '../hooks/useClinicalSearch';
import MedImage from '../components/common/MedImage';
import ImageModal from '../components/common/ImageModal';

const gemini = new GeminiService();

const DEFAULT_PATTERNS: ECGPattern[] = [
  {
    id: 'stemi',
    name: 'STEMI',
    category: 'Ischemia',
    description: 'ST-segment elevation myocardial infarction indicating acute transmural ischemia.',
    criteria: [
      'New ST elevation at the J point in at least 2 contiguous leads',
      '≥ 2 mm in men ≥ 40 yr, ≥ 2.5 mm in men < 40 yr, or ≥ 1.5 mm in women in V2-V3',
      '≥ 1 mm in all other leads'
    ],
    clinicalSignificance:
      'Acute coronary occlusion requiring immediate reperfusion (PCI or thrombolysis).',
    management: [
      'Aspirin 300mg',
      'Clopidogrel/Ticagrelor',
      'Heparin/Enoxaparin',
      'Immediate Cardiology consult for PCI'
    ]
  },
  {
    id: 'lbbb',
    name: 'Left Bundle Branch Block',
    category: 'Conduction',
    description: 'Delayed activation of the left ventricle.',
    criteria: [
      'QRS duration > 120 ms',
      'Dominant S wave in V1',
      'Broad monophasic R wave in lateral leads (I, aVL, V5-V6)',
      'Absence of Q waves in lateral leads'
    ],
    clinicalSignificance:
      'Can mask STEMI. New LBBB with chest pain is treated as STEMI equivalent.',
    management: [
      'Assess for underlying heart disease',
      'Compare with old ECG',
      'Sgarbossa criteria if ischemia suspected'
    ]
  },
  {
    id: 'hyperkalemia',
    name: 'Hyperkalemia',
    category: 'Metabolic',
    description: 'ECG changes associated with elevated serum potassium.',
    criteria: [
      'Peaked T waves (narrow-based, "tented")',
      'P wave flattening/loss',
      'PR prolongation',
      'QRS widening',
      'Sine wave pattern (pre-arrest)'
    ],
    clinicalSignificance: 'Medical emergency. Risk of ventricular fibrillation and asystole.',
    management: [
      'Calcium gluconate/chloride (stabilize membrane)',
      'Insulin/Dextrose',
      'Salbutamol',
      'Resonium/Dialysis'
    ]
  },
  {
    id: 'afib',
    name: 'Atrial Fibrillation',
    category: 'Arrhythmia',
    description: 'Irregularly irregular rhythm with absent P waves.',
    criteria: [
      'Irregularly irregular ventricular rhythm',
      'No discernible P waves',
      'Fibrillatory waves (f-waves) may be present'
    ],
    clinicalSignificance: 'Risk of thromboembolism (stroke) and heart failure.',
    management: [
      'Rate control (Beta-blockers/CCB)',
      'Rhythm control (Amiodarone/DCCV)',
      'Anticoagulation (CHA2DS2-VASc)'
    ]
  }
];

export const ECGView: React.FC = () => {
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customPatterns, setCustomPatterns] = useState<ECGPattern[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);
  const [isFetchingAI, setIsFetchingAI] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  React.useEffect(() => {
    const loadCustom = async () => {
      const saved = await storage.getAllECGPatterns();
      setCustomPatterns(saved);
    };
    loadCustom();
  }, []);

  const allPatterns = useMemo(() => {
    return [...DEFAULT_PATTERNS, ...customPatterns];
  }, [customPatterns]);

  const { results: filteredPatterns, didYouMean } = useClinicalSearch(allPatterns, searchQuery, [
    'name',
    'category'
  ]);

  const selectedPattern = useMemo(() => {
    return allPatterns.find((p) => p.id === activePattern);
  }, [activePattern, allPatterns]);

  const handleAIFetch = async () => {
    if (!searchQuery.trim()) return;

    setIsFetchingAI(true);
    setFetchError(null);
    try {
      const pattern = await gemini.generateECGPattern(searchQuery);

      // Save to storage
      await storage.saveECGPattern(pattern);

      // Update local state
      setCustomPatterns((prev) => {
        const exists = prev.find((p) => p.id === pattern.id);
        if (exists) return prev.map((p) => (p.id === pattern.id ? pattern : p));
        return [...prev, pattern];
      });

      setActivePattern(pattern.id);
      setSearchQuery('');
    } catch (err: unknown) {
      console.error('AI Fetch Error:', err);
      setFetchError(
        'Failed to fetch pattern details from AI. Please try a more specific clinical term.'
      );
    } finally {
      setIsFetchingAI(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-950/20 text-rose-455 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-rose-950/30">
          <Activity className="w-4 h-4" /> ECG Library
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          ECG <span className="text-rose-600">Interpretation</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl font-medium">
          A comprehensive guide to identifying and managing critical ECG patterns and arrhythmias.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patterns..."
              className="w-full bg-slate-950/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-rose-500/30 focus:ring-4 focus:ring-rose-500/5 transition-all"
            />
          </div>

          {didYouMean && (
            <div className="flex justify-start">
              <button
                onClick={() => setSearchQuery(didYouMean)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-950/20 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-sm w-full"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 shrink-0">
                  Did you mean
                </span>
                <span className="text-xs font-bold border-b border-rose-600 border-dashed truncate">
                  {didYouMean}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 shrink-0">
                  ?
                </span>
              </button>
            </div>
          )}

          <div className="space-y-2">
            {filteredPatterns.length > 0
              ? filteredPatterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => setActivePattern(pattern.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${
                      activePattern === pattern.id
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-200'
                        : 'bg-slate-950/40 border border-white/5 text-slate-400 hover:border-white/5'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activePattern === pattern.id
                          ? 'bg-slate-950/40/20'
                          : 'bg-rose-950/20 text-rose-600'
                      }`}
                    >
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-black uppercase tracking-tight">
                        {pattern.name}
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest opacity-60`}>
                        {pattern.category}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${activePattern === pattern.id ? 'rotate-90' : ''}`}
                    />
                  </button>
                ))
              : searchQuery.trim() && (
                  <div className="p-8 bg-slate-950/20 rounded-[32px] border-2 border-dashed border-white/5 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-12 h-12 bg-slate-950/40 rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-4 text-slate-300">
                      <Search className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">
                      Pattern Not Found
                    </h4>
                    <p className="text-xs text-slate-400 font-bold mb-6">
                      We couldn't find "{searchQuery}" in our local library.
                    </p>

                    <button
                      onClick={handleAIFetch}
                      disabled={isFetchingAI}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50"
                    >
                      {isFetchingAI ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Scanning Medical Databases...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          Fetch from MedEx AI
                        </>
                      )}
                    </button>
                  </div>
                )}

            {fetchError && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-100 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {fetchError}
              </div>
            )}

            {/* AI Download Option if query is present but results found (for updating/downloading variants) */}
            {searchQuery.trim() && filteredPatterns.length > 0 && !isFetchingAI && (
              <button
                onClick={handleAIFetch}
                className="w-full py-3 mt-4 bg-slate-950/20 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-white/5 hover:bg-slate-900 transition-all italic"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500/50" />
                Didn't find what you need? Ask AI to search
              </button>
            )}
          </div>
        </div>

        {/* Pattern Display */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedPattern ? (
              <motion.div
                key={selectedPattern.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-8"
              >
                {/* Header Card */}
                <div className="bg-slate-950/40 rounded-[40px] border border-white/5 shadow-sm p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-950/20 rounded-full -mr-16 -mt-16 blur-2xl opacity-50" />
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-rose-950/20 rounded-3xl flex items-center justify-center">
                        <Heart className="w-8 h-8 text-rose-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                          {selectedPattern.name}
                        </h2>
                        <p className="text-slate-400 font-medium">{selectedPattern.description}</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {selectedPattern.category}
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    {selectedPattern.imageUrl && (
                      <div className="mb-8 rounded-2xl overflow-hidden border border-white/5 bg-slate-950/20">
                        <MedImage
                          src={selectedPattern.imageUrl}
                          alt={selectedPattern.name}
                          label="ECG Trace"
                          className="w-full h-auto"
                          onEnlarge={() =>
                            setEnlargedImage({
                              src: selectedPattern.imageUrl!,
                              alt: selectedPattern.name
                            })
                          }
                        />
                        <div className="p-3 bg-slate-900 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">
                          Clinical Reference Trace
                        </div>
                      </div>
                    )}
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" /> Diagnostic Criteria
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedPattern.criteria.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 bg-slate-950/20 rounded-2xl border border-white/5 text-sm font-bold text-slate-350 flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-lg bg-slate-950/40 flex items-center justify-center text-xs font-black text-slate-400 shrink-0 shadow-sm">
                            {i + 1}
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Significance & Management */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-950/50">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" /> Clinical Significance
                    </h3>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                      {selectedPattern.clinicalSignificance}
                    </p>
                  </div>
                  <div className="bg-rose-600 rounded-[32px] p-8 text-white shadow-xl shadow-rose-200">
                    <h3 className="text-xs font-black uppercase tracking-widest text-rose-200 mb-6 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-white" /> Acute Management
                    </h3>
                    <ul className="space-y-3">
                      {selectedPattern.management.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4 text-rose-300 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Reference Note */}
                <div className="p-6 bg-amber-950/20 rounded-3xl border border-amber-950/30 flex items-start gap-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    ECG interpretation should always be performed in the context of the clinical
                    presentation. If in doubt, seek senior review or Cardiology consultation.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] bg-slate-950/20 rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-slate-950/40 rounded-3xl flex items-center justify-center shadow-sm mb-6">
                  <Activity className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-tight mb-2">
                  Select a Pattern
                </h3>
                <p className="text-slate-400 text-sm max-w-xs font-medium">
                  Choose an ECG pattern from the library to view diagnostic criteria and management
                  steps.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
};

const ShieldAlert = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export default ECGView;
