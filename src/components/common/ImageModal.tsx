import React, { useEffect } from 'react';
import { X, Search } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 pointer-events-none">
        <div className="absolute top-0 right-0 p-4 pointer-events-auto">
          <button
            onClick={onClose}
            className="p-4 bg-slate-950/40/10 hover:bg-slate-950/40/20 border border-white/10 backdrop-blur-md rounded-2xl text-white transition-all hover:scale-110 active:scale-95 group shadow-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative group/img pointer-events-auto">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[80vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl"
          />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </div>

        <div className="mt-8 px-8 py-4 bg-slate-950/40/10 border border-white/5 backdrop-blur-xl rounded-[24px] text-white flex flex-col items-center gap-2 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-blue-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{alt}</span>
          </div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Medical Synthesis Tier • 1080p Reference
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
