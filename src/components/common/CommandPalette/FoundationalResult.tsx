import React from 'react';
import { Activity, BookOpen, ChevronRight, Layers, Zap } from 'lucide-react';
import { SearchDocument } from '../../../services/localSearchService';

interface FoundationalResultProps {
  doc: SearchDocument;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const FoundationalResult: React.FC<FoundationalResultProps> = ({
  doc,
  isSelected,
  onClick,
  onMouseEnter,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
        isSelected
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            isSelected
              ? 'bg-slate-950/40/20'
              : 'bg-slate-800 border border-slate-700/50 text-slate-400'
          }`}
        >
          {doc.type === 'concept' ? (
            <Activity className="w-4 h-4 text-indigo-400" />
          ) : doc.type === 'structure' ? (
            <Layers className="w-4 h-4 text-emerald-400" />
          ) : doc.type === 'correlation' ? (
            <Zap className="w-4 h-4 text-rose-400" />
          ) : (
            <BookOpen className="w-4 h-4 text-blue-400" />
          )}
        </div>
        <div className="overflow-hidden">
          <span className="font-bold text-sm tracking-tight block truncate">
            {doc.title}
          </span>
          <span
            className={`text-[10px] font-medium block truncate ${
              isSelected ? 'text-white/60' : 'text-slate-400'
            }`}
          >
            {doc.subtitle}
          </span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
    </button>
  );
};

export default FoundationalResult;
