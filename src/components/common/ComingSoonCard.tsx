import React from 'react';
import { Sparkles, Construction } from 'lucide-react';

interface ComingSoonCardProps {
  title: string;
  description?: string;
  category?: string;
}

export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({
  title,
  description = 'Our clinical editors are compiling content for this section.',
  category = 'Coming Soon'
}) => {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-slate-950/40 p-8 flex flex-col items-center justify-center text-center group min-h-[300px]">
      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-950/200/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-14 h-14 bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-6 h-6" />
      </div>

      <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">
        {category}
      </div>

      <h3 className="text-lg font-black text-white uppercase tracking-wider mb-3">{title}</h3>

      <p className="text-xs font-bold text-slate-400 max-w-sm leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/60 border border-indigo-500/20 rounded-xl text-[9px] font-black text-indigo-300 uppercase tracking-widest">
        <Sparkles className="w-3 h-3 animate-pulse" />
        Under Construction
      </div>
    </div>
  );
};

export default ComingSoonCard;
