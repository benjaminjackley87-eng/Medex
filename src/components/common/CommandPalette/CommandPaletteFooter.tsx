import React from 'react';

const CommandPaletteFooter: React.FC = () => {
  return (
    <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 shadow-sm">
            <span className="text-[9px] font-black text-slate-400">↑↓</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Navigate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 shadow-sm">
            <span className="text-[9px] font-black text-slate-400">↵</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Select / Open</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          MedEx Nexus v4
        </span>
      </div>
    </div>
  );
};

export default CommandPaletteFooter;
