import React from 'react';
import { Command } from 'lucide-react';

interface ViewResultProps {
  view: {
    id: string;
    label: string;
    icon: React.ReactNode;
  };
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const ViewResult: React.FC<ViewResultProps> = ({ view, isSelected, onClick, onMouseEnter }) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
        isSelected
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isSelected
              ? 'bg-slate-950/40/20'
              : 'bg-slate-800 border border-slate-700/50 text-slate-400'
          }`}
        >
          {view.icon}
        </div>
        <span className="font-bold text-sm tracking-tight">{view.label}</span>
      </div>
      {isSelected && <Command className="w-3.5 h-3.5 opacity-60" />}
    </button>
  );
};

export default ViewResult;
