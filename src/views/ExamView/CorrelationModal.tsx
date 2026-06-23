import React from 'react';
import {
  X,
  Zap,
  Loader2,
  Microscope,
  Activity,
  BookOpen,
  GraduationCap,
  Waves,
  HeartPulse,
  Layers
} from 'lucide-react';
import { ClinicalCorrelation } from '../../types';
import MedImage from '../../components/common/MedImage';

interface CorrelationModalProps {
  sign: string;
  data: ClinicalCorrelation | null;
  loading: boolean;
  onClose: () => void;
  onEnlarge: (src: string, alt: string) => void;
}

const CorrelationModal: React.FC<CorrelationModalProps> = ({
  sign,
  data,
  loading,
  onClose,
  onEnlarge
}) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-full bg-slate-950/40 shadow-2xl rounded-[40px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <header className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-950/20 sticky top-0 backdrop-blur-md z-20">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-rose-600 text-white rounded-[20px] flex items-center justify-center shadow-2xl shadow-rose-200">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">{sign}</h3>
              <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">
                Clinical Matrix Synthesis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-900 rounded-2xl text-slate-400 transition-all hover:scale-110 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12 custom-scrollbar">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-6">
              <Loader2 className="w-10 h-10 text-rose-600 animate-spin" />
              <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">
                Synthesizing Reasoning...
              </p>
            </div>
          ) : data ? (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MedImage
                  src={data.imageUrl}
                  alt={data.sign}
                  label="Primary Stigmata"
                  fallbackIcon={<Activity />}
                  onEnlarge={onEnlarge}
                />
                <div className="bg-slate-950/20 p-8 rounded-[40px] border border-white/5 flex flex-col justify-center">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Key Differentials
                  </h4>
                  <ul className="space-y-3">
                    {(Array.isArray(data.causes) ? data.causes : []).map((c, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-sm text-slate-350 font-black"
                      >
                        <div className="w-2 h-2 rounded-full bg-rose-950/200 shadow-lg shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <section className="bg-slate-950/40 p-10 rounded-[48px] border-2 border-white/5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-rose-600" />
                <h4 className="text-xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-rose-600" /> Pathophysiology
                </h4>
                <p className="text-base leading-[2] text-slate-350 font-medium italic">
                  {data.pathophysiology}
                </p>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CorrelationModal;
