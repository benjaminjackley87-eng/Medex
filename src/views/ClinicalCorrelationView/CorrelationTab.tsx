import React from 'react';
import {
  Zap,
  Clock,
  RefreshCw,
  Activity,
  Waves,
  HeartPulse,
  Microscope,
  BookOpen,
  Info,
  Share2,
  ListRestart,
  Layers
} from 'lucide-react';
import MedImage from '../../components/common/MedImage';
import GlossaryLink from '../../components/GlossaryLink';
import { ClinicalCorrelation } from '../../types';

interface CorrelationTabProps {
  correlation: ClinicalCorrelation;
  loading: boolean;
  isProMode: boolean;
  handleSearch: (e?: React.FormEvent, forceRefresh?: boolean) => Promise<void>;
  setCorrelation: (correlation: ClinicalCorrelation | null) => void;
  setQuery: (query: string) => void;
  setEnlargedImage: (img: { src: string; alt: string } | null) => void;
  onNavigateToGlossary?: (term: string) => void;
}

export const CorrelationTab: React.FC<CorrelationTabProps> = ({
  correlation,
  loading,
  isProMode,
  handleSearch,
  setCorrelation,
  setQuery,
  setEnlargedImage,
  onNavigateToGlossary
}) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-1000">
      <div className="bg-slate-950/40 p-12 rounded-[60px] border-2 border-rose-950/30 shadow-2xl shadow-rose-950/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-3 h-full bg-rose-600" />

        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-rose-600 text-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-rose-500/30">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-4xl font-black text-white tracking-tighter mb-1">
                {correlation.sign}
              </h3>
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-black uppercase tracking-widest text-rose-600">
                  Synthesis Case Record
                </p>
                {isProMode && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-blue-200">
                    Elite Tier
                  </span>
                )}
                {correlation.retrievedAt && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-slate-400 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/5">
                    <Clock className="w-2.5 h-2.5" />
                    Cached: {new Date(correlation.retrievedAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => handleSearch(e, true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-white/5"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Live
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16">
          <section className="animate-in fade-in duration-1000">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-6 bg-rose-950/200 rounded-full" />
              <h5 className="text-[11px] font-black uppercase text-slate-300 tracking-widest">
                Core Clinical Sign
              </h5>
            </div>
            <MedImage
              src={correlation.imageUrl}
              alt={correlation.sign}
              label="Primary Clinical"
              fallbackIcon={<Activity />}
              onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
            />
          </section>

          {(correlation.needsCirculationDiagram ||
            correlation.needsPVLoopDiagram ||
            correlation.needsAnatomyDiagram) && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-white/5">
              {correlation.needsCirculationDiagram && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Waves className="w-4 h-4 text-blue-500" />
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Circulation
                    </h6>
                  </div>
                  <MedImage
                    src={correlation.circulationImageUrl}
                    alt="Circulation Diagram"
                    label={correlation.circulationSide || 'Systemic'}
                    fallbackIcon={<Waves />}
                    onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                  />
                </div>
              )}
              {correlation.needsPVLoopDiagram && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Cardiac Loop
                    </h6>
                  </div>
                  <MedImage
                    src={correlation.pvLoopImageUrl}
                    alt="PV Loop Diagram"
                    label="Pressure-Volume"
                    fallbackIcon={<HeartPulse />}
                    onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                  />
                </div>
              )}
              {correlation.needsAnatomyDiagram && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Anatomy
                    </h6>
                  </div>
                  <MedImage
                    src={correlation.anatomyImageUrl}
                    alt="Anatomical Diagram"
                    label="Surgical Anatomy"
                    fallbackIcon={<Microscope />}
                    onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                  />
                </div>
              )}
            </section>
          )}

          <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 pt-8 border-t border-white/5">
            <div className="lg:col-span-3">
              <h5 className="text-[11px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Pathophysiological Mechanism
              </h5>
              <div className="text-base leading-[2] text-slate-350 font-medium bg-slate-950/20/50 p-8 rounded-[40px] border border-white/5 italic relative">
                <Info className="absolute top-6 right-6 w-5 h-5 text-slate-200" />
                {onNavigateToGlossary ? (
                  <GlossaryLink
                    text={correlation.pathophysiology}
                    onNavigate={onNavigateToGlossary}
                  />
                ) : (
                  correlation.pathophysiology
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-10">
              <section>
                <h5 className="text-[11px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Differentials
                </h5>
                <ul className="space-y-4">
                  {(correlation.causes || []).map((cause, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-[13px] text-slate-350 font-bold group/cause"
                    >
                      <div className="w-2 h-2 rounded-full bg-rose-950/200 shadow-lg shadow-rose-200 group-hover/cause:scale-150 transition-transform" />
                      {cause}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-rose-950/20/40 p-10 rounded-[40px] border border-rose-950/30">
                <h5 className="text-[10px] font-black uppercase text-rose-600 mb-4 tracking-widest">
                  Clinical Significance
                </h5>
                <p className="text-[14px] leading-relaxed text-slate-300 font-black italic">
                  "
                  {onNavigateToGlossary ? (
                    <GlossaryLink
                      text={correlation.clinicalSignificance}
                      onNavigate={onNavigateToGlossary}
                    />
                  ) : (
                    correlation.clinicalSignificance
                  )}
                  "
                </p>
              </section>
            </div>
          </section>
        </div>
      </div>

      <div className="p-10 text-center flex justify-center gap-4">
        <button
          onClick={() => {
            setCorrelation(null);
            setQuery('');
          }}
          className="px-10 py-4 bg-slate-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl"
        >
          <ListRestart className="w-4 h-4" /> New Correlation
        </button>
        <button className="px-10 py-4 bg-slate-950/40 border-2 border-white/5 text-slate-400 rounded-[24px] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-950/20 transition-all">
          Share Matrix <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
