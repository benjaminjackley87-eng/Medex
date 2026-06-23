import React from 'react';
import { Play, Layout, ImageIcon, Plus } from 'lucide-react';
import { VisualAid } from '../../types';

interface VisualAidsProps {
  visualAids: VisualAid[];
  isEditMode: boolean;
  onAddVisualAid: (type: 'diagram' | 'video', description: string) => void;
  onEnlargeImage: (src: string, alt: string) => void;
}

const VisualAids: React.FC<VisualAidsProps> = ({
  visualAids,
  isEditMode,
  onAddVisualAid,
  onEnlargeImage
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(visualAids || []).map((aid, idx) => (
          <div
            key={idx}
            className="bg-slate-950/40 rounded-[32px] border border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
              {aid.type === 'video' ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <Play className="w-12 h-12 text-white relative z-20 group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-4 left-6 z-20">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-blue-600 px-2 py-1 rounded-md">
                      Demonstration
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <Layout className="w-12 h-12 text-slate-350" />
                </div>
              )}
              {aid.source && (
                <img
                  src={aid.source}
                  alt={aid.description}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                  onClick={() => onEnlargeImage(aid.source!, aid.description)}
                />
              )}
            </div>
            <div className="p-6">
              <h4 className="text-sm font-black text-white mb-2 uppercase tracking-tight">
                {aid.type === 'diagram' ? 'Anatomical Diagram' : 'Clinical Technique'}
              </h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {aid.description}
              </p>
            </div>
          </div>
        ))}

        {(visualAids || []).length === 0 && (
          <div className="col-span-full p-20 bg-slate-950/20 rounded-[40px] border-2 border-dashed border-white/5 text-center">
            <div className="w-16 h-16 bg-slate-950/40 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-black text-white mb-2">No Visual Aids Found</h3>
            <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto">
              We are currently synthesizing high-quality diagrams and video demonstrations for this
              protocol.
            </p>
          </div>
        )}
      </div>

      {isEditMode && (
        <button
          onClick={() => onAddVisualAid('diagram', 'New visual aid description')}
          className="mt-8 w-full py-4 border-2 border-dashed border-white/5 rounded-[24px] text-[10px] font-black uppercase text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Visual Aid
        </button>
      )}
    </div>
  );
};

export default VisualAids;
