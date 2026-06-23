import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Image as ImageIcon, RefreshCw, Info, BookOpen } from 'lucide-react';
import MedImage from './MedImage';
import { DermTerm } from './DermTerm';

interface DermatologyDetailsProps {
  selectedTerm: DermTerm | null;
  isLoadingImage: boolean;
  illustration: string | null;
  setEnlargedImage: (image: { src: string; alt: string } | null) => void;
}

export const DermatologyDetails: React.FC<DermatologyDetailsProps> = ({
  selectedTerm,
  isLoadingImage,
  illustration,
  setEnlargedImage
}) => {
  return (
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
                  Visualizing these terms helps bridge the gap between textbook definitions and
                  clinical presentation.
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
  );
};
