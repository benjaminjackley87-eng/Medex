import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Microscope,
  Search,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Eye,
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';

import { RadiologyFinding } from '../types';
import { storage } from '../services/storageService';
import { useClinicalSearch } from '../hooks/useClinicalSearch';
import MedImage from '../components/common/MedImage';
import ImageModal from '../components/ImageModal';

const DEFAULT_FINDINGS: RadiologyFinding[] = [
  {
    id: 'pneumothorax',
    name: 'Pneumothorax',
    modality: 'CXR',
    category: 'Chest',
    description: 'Presence of air in the pleural space.',
    keySigns: [
      'Visible visceral pleural line',
      'Absence of lung markings peripheral to the line',
      'Deep sulcus sign (on supine film)',
      'Mediastinal shift (if tension)'
    ],
    clinicalSignificance: 'Can lead to tension pneumothorax and cardiovascular collapse.',
    management: [
      'Needle decompression (if tension)',
      'Chest tube insertion',
      'Observation (if small/stable)'
    ]
  },
  {
    id: 'bowel-obstruction',
    name: 'Small Bowel Obstruction',
    modality: 'AXR',
    category: 'Abdomen',
    description: 'Mechanical or functional blockage of the small intestine.',
    keySigns: [
      'Dilated small bowel loops (> 3cm)',
      'Valvulae conniventes (crossing the full width)',
      'Central location of loops',
      'String of pearls sign (air-fluid levels)'
    ],
    clinicalSignificance: 'Risk of ischemia, perforation, and sepsis.',
    management: ['NBM (Nil By Mouth)', 'NG tube decompression', 'IV fluids', 'Surgical consult']
  },
  {
    id: 'ich',
    name: 'Intracranial Hemorrhage',
    modality: 'CT',
    category: 'Neuro',
    description: 'Bleeding within the skull vault.',
    keySigns: [
      'Hyperdense (bright) area on non-contrast CT',
      'Mass effect (midline shift)',
      'Ventricular effacement',
      'Blood in ventricles (IVH)'
    ],
    clinicalSignificance: 'Life-threatening emergency. Risk of herniation.',
    management: ['ABCDE', 'BP control', 'Neurosurgical consult', 'Reverse anticoagulation']
  }
];

export const RadiologyView: React.FC = () => {
  const [activeFinding, setActiveFinding] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customFindings, setCustomFindings] = useState<RadiologyFinding[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  React.useEffect(() => {
    const loadCustom = async () => {
      const saved = await storage.getAllRadiologyFindings();
      setCustomFindings(saved);
    };
    loadCustom();
  }, []);

  const allFindings = useMemo(() => {
    return [...DEFAULT_FINDINGS, ...customFindings];
  }, [customFindings]);

  const { results: filteredFindings, didYouMean } = useClinicalSearch(allFindings, searchQuery, [
    'name',
    'modality',
    'category'
  ]);

  const selectedFinding = useMemo(() => {
    return allFindings.find((f) => f.id === activeFinding);
  }, [activeFinding, allFindings]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/40 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
          <Eye className="w-4 h-4" /> Radiology Gallery
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          Imaging <span className="text-indigo-455">Interpretation</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl font-medium">
          A systematic guide to interpreting common radiological findings across multiple
          modalities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search findings..."
              className="w-full bg-slate-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all text-white"
            />
          </div>

          {didYouMean && (
            <div className="flex justify-start">
              <button
                onClick={() => setSearchQuery(didYouMean)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-400 rounded-xl transition-all shadow-sm w-full border border-indigo-500/10 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 shrink-0">
                  Did you mean
                </span>
                <span className="text-xs font-bold border-b border-indigo-655 border-dashed truncate">
                  {didYouMean}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-550 shrink-0">
                  ?
                </span>
              </button>
            </div>
          )}

          <div className="space-y-2">
            {filteredFindings.map((finding) => (
              <button
                key={finding.id}
                onClick={() => setActiveFinding(finding.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left cursor-pointer ${
                  activeFinding === finding.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50 border border-indigo-500/30'
                    : 'bg-slate-900 border border-white/5 text-slate-350 hover:border-white/10 hover:bg-slate-900/80'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activeFinding === finding.id
                      ? 'bg-slate-950/40/20'
                      : 'bg-slate-950 text-indigo-400 border border-white/5'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black uppercase tracking-tight">{finding.name}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest opacity-60`}>
                    {finding.modality} • {finding.category}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${activeFinding === finding.id ? 'rotate-90' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Finding Display */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedFinding ? (
              <motion.div
                key={selectedFinding.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Header Card */}
                <div className="bg-slate-900 rounded-[40px] border border-white/5 shadow-sm p-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-950 rounded-3xl flex items-center justify-center border border-white/5">
                        <Layers className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                          {selectedFinding.name}
                        </h2>
                        <p className="text-slate-400 font-medium">{selectedFinding.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {selectedFinding.modality}
                      </div>
                      <div className="px-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {selectedFinding.category}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {selectedFinding.imageUrl && (
                      <div className="mb-8 rounded-2xl overflow-hidden border border-white/5 bg-slate-955/20">
                        <MedImage
                          src={selectedFinding.imageUrl}
                          alt={selectedFinding.name}
                          label="Radiology Reference"
                          className="w-full h-auto"
                          onEnlarge={() =>
                            setEnlargedImage({
                              src: selectedFinding.imageUrl!,
                              alt: selectedFinding.name
                            })
                          }
                        />
                        <div className="p-3 bg-slate-950 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest border-t border-white/5">
                          Clinical Imaging Reference
                        </div>
                      </div>
                    )}
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" /> Key Radiological Signs
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedFinding.keySigns.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 bg-slate-955/40 rounded-2xl border border-white/5 text-sm font-bold text-slate-300 flex items-center gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Significance & Management */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-950/50 border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" /> Clinical Significance
                    </h3>
                    <p className="text-sm font-medium text-slate-350 leading-relaxed">
                      {selectedFinding.clinicalSignificance}
                    </p>
                  </div>
                  <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-950/50 border border-indigo-500/20">
                    <h3 className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-6 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-white" /> Management Steps
                    </h3>
                    <ul className="space-y-3">
                      {selectedFinding.management.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Reference Note */}
                <div className="p-6 bg-slate-955/40 rounded-3xl border border-white/5 flex items-start gap-4">
                  <AlertTriangle className="w-5 h-5 text-slate-400 mt-0.5" />
                  <p className="text-xs text-slate-455 font-medium leading-relaxed">
                    Radiology interpretation should be correlated with clinical findings. Always
                    compare with previous imaging if available.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] bg-slate-900/20 rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-slate-905/60 border border-white/5 rounded-3xl flex items-center justify-center shadow-sm mb-6">
                  <Layers className="w-10 h-10 text-slate-550" />
                </div>
                <h3 className="text-xl font-black text-slate-350 tracking-tight mb-2 uppercase">
                  Select a Finding
                </h3>
                <p className="text-slate-400 text-sm max-w-xs font-medium">
                  Choose a radiological finding from the gallery to view key signs and management
                  protocols.
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

export default RadiologyView;
