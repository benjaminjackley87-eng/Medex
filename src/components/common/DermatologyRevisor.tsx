import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Image as ImageIcon,
  RefreshCw,
  ArrowLeft,
  Info,
  BookOpen
} from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { useClinicalSearch } from '../../hooks/useClinicalSearch';
import MedImage from './MedImage';
import ImageModal from './ImageModal';
import { motion, AnimatePresence } from 'motion/react';

const DERM_TERMS = [
  {
    term: 'Macule',
    definition:
      'A flat, circumscribed area of skin discoloration < 1cm in diameter, without any change in texture or thickness.'
  },
  {
    term: 'Patch',
    definition:
      'A flat, non-palpable area of skin discoloration > 1cm in diameter (essentially a large macule).'
  },
  { term: 'Papule', definition: 'A small, solid, elevated lesion < 1cm in diameter.' },
  {
    term: 'Plaque',
    definition:
      'A broad, flat-topped, elevated lesion > 1cm in diameter, often formed by the confluence of papules.'
  },
  {
    term: 'Nodule',
    definition:
      'A solid, elevated lesion > 1cm in diameter, often deeper in the dermis than a papule.'
  },
  { term: 'Vesicle', definition: 'A small, fluid-filled blister < 1cm in diameter.' },
  { term: 'Bulla', definition: 'A large, fluid-filled blister > 1cm in diameter.' },
  {
    term: 'Pustule',
    definition: 'A small, circumscribed elevation of the skin containing purulent material (pus).'
  },
  {
    term: 'Wheal',
    definition:
      'An evanescent, edematous, circumscribed elevation of the skin, often with a central pallor and erythematous rim (e.g., hives).'
  },
  {
    term: 'Scale',
    definition: 'Visible fragments of the stratum corneum as it is shed from the skin surface.'
  },
  {
    term: 'Crust',
    definition: 'Dried exudate (serum, blood, or pus) on the skin surface; "scab".'
  },
  { term: 'Erosion', definition: 'A partial loss of the epidermis that heals without scarring.' },
  {
    term: 'Ulcer',
    definition:
      'A full-thickness loss of the epidermis and at least part of the dermis; heals with scarring.'
  },
  {
    term: 'Lichenification',
    definition:
      'Thickening of the epidermis with accentuation of normal skin markings, usually due to chronic rubbing or scratching.'
  },
  { term: 'Excoriation', definition: 'A linear or punctate erosion caused by scratching.' },
  {
    term: 'Atrophy',
    definition:
      'Thinning of the epidermis, dermis, or subcutaneous fat, often resulting in a translucent or depressed appearance.'
  },
  {
    term: 'Telangiectasia',
    definition:
      'Permanent dilation of small blood vessels (capillaries, arterioles, or venules) near the skin surface.'
  },
  {
    term: 'Purpura',
    definition:
      'Discoloration of the skin or mucous membranes due to hemorrhage from small blood vessels; does not blanch on pressure.'
  }
];

const gemini = new GeminiService();

const DermatologyRevisor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<(typeof DERM_TERMS)[0] | null>(null);
  const [illustration, setIllustration] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  const { results: filteredTerms, didYouMean } = useClinicalSearch(DERM_TERMS, searchQuery, [
    'term',
    'definition'
  ]);

  const handleSelectTerm = async (termObj: (typeof DERM_TERMS)[0]) => {
    setSelectedTerm(termObj);
    setIllustration(null);
    setIsLoadingImage(true);

    try {
      const img = await gemini.generateIllustration(
        `Dermatological morphology: ${termObj.term}. ${termObj.definition}. Clear medical diagram style.`,
        false
      );
      setIllustration(img || null);
    } catch (error) {
      console.error('Failed to load illustration:', error);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <div className="p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="p-3 rounded-2xl bg-slate-900 border border-white/5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white uppercase">
                Derm Morphology Revisor
              </h1>
              <p className="text-slate-400 font-medium mt-1">
                Master the visual language of dermatology with DermNet-aligned terminology.
              </p>
            </div>
          </div>
          <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-900/40 border border-orange-400/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Term List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
              <input
                type="text"
                placeholder="SEARCH MORPHOLOGY..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-white/5 rounded-2xl text-[11px] font-black tracking-widest text-slate-200 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none uppercase"
              />
            </div>

            {didYouMean && (
              <div className="flex justify-start">
                <button
                  onClick={() => setSearchQuery(didYouMean)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-950/40 hover:bg-orange-900/40 text-orange-450 border border-orange-500/20 rounded-xl transition-all shadow-sm w-full cursor-pointer"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 shrink-0">
                    Did you mean
                  </span>
                  <span className="text-xs font-bold border-b border-orange-600 border-dashed truncate">
                    {didYouMean}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 shrink-0">
                    ?
                  </span>
                </button>
              </div>
            )}

            <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden shadow-sm max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredTerms.map((t, idx) => (
                <button
                  key={t.term}
                  onClick={() => handleSelectTerm(t)}
                  className={`w-full text-left px-6 py-4 border-b border-white/5 last:border-0 transition-all flex items-center justify-between group cursor-pointer ${
                    selectedTerm?.term === t.term
                      ? 'bg-orange-950/30 text-orange-400'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest">{t.term}</span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all ${selectedTerm?.term === t.term ? 'bg-orange-500 scale-125' : 'bg-slate-800 group-hover:bg-orange-500/60'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content: Details & Illustration */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedTerm ? (
                <motion.div
                  key={selectedTerm.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-orange-950/40 text-orange-450 border border-orange-500/20 text-[10px] font-black uppercase tracking-widest rounded-lg">
                          Primary Morphology
                        </span>
                        <div className="h-px flex-1 bg-slate-950/40/5" />
                      </div>

                      <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">
                        {selectedTerm.term}
                      </h2>

                      <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center shrink-0 border border-white/5">
                          <Info className="w-6 h-6 text-orange-400" />
                        </div>
                        <p className="text-xl text-slate-300 leading-relaxed font-medium">
                          {selectedTerm.definition}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[2.5rem] aspect-video relative overflow-hidden shadow-2xl group">
                    {isLoadingImage ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
                        <RefreshCw className="w-10 h-10 animate-spin text-orange-500" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                          Synthesizing Illustration...
                        </p>
                      </div>
                    ) : illustration ? (
                      <>
                        <MedImage
                          src={illustration}
                          alt={selectedTerm.term}
                          label="Dermatology Synthesis"
                          onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                          config={{ size: 'full', position: 'top' }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none">
                          <div className="flex items-center gap-3 text-white/60 mb-2">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              AI-Generated Clinical Schematic
                            </span>
                          </div>
                          <p className="text-white/40 text-[9px] font-medium leading-relaxed max-w-md">
                            This illustration represents the typical morphological features of a{' '}
                            {selectedTerm.term.toLowerCase()} for educational purposes.
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-4">
                        <ImageIcon className="w-12 h-12 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Select a term to generate visual aid
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-orange-950/20 border border-orange-500/10 rounded-3xl">
                      <div className="flex items-center gap-3 mb-3">
                        <BookOpen className="w-4 h-4 text-orange-450" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                          DermNet Reference
                        </span>
                      </div>
                      <p className="text-xs text-orange-200/70 leading-relaxed">
                        Morphological descriptions are aligned with the international standard for
                        dermatological terminology.
                      </p>
                    </div>
                    <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl">
                      <div className="flex items-center gap-3 mb-3">
                        <RefreshCw className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Interactive Learning
                        </span>
                      </div>
                      <p className="text-xs text-slate-350 leading-relaxed">
                        Visualizing these terms helps bridge the gap between textbook definitions
                        and clinical presentation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20">
                  <div className="w-24 h-24 bg-slate-900/60 rounded-[2rem] flex items-center justify-center mb-6 border border-white/5">
                    <Layers className="w-10 h-10 opacity-20 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-slate-200">
                    Select a term to begin
                  </h3>
                  <p className="text-sm font-medium mt-2 text-slate-400">
                    Explore the visual language of clinical dermatology.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
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

export default DermatologyRevisor;
