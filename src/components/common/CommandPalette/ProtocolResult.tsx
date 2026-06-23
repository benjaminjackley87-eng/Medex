import React from 'react';
import { BookOpen, Command } from 'lucide-react';

interface ProtocolResultProps {
  exam: {
    id: string;
    name: string;
    system: string;
  };
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const ProtocolResult: React.FC<ProtocolResultProps> = ({
  exam,
  isSelected,
  onClick,
  onMouseEnter,
}) => {
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
          <BookOpen className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className="font-bold text-sm tracking-tight block">
            {exam.name}
          </span>
          <span
            className={`text-[10px] font-medium block ${
              isSelected ? 'text-white/60' : 'text-slate-400'
            }`}
          >
            {exam.system}
          </span>
        </div>
      </div>
      {isSelected && <Command className="w-3.5 h-3.5 opacity-60" />}
    </button>
  );
};

export default ProtocolResult;
