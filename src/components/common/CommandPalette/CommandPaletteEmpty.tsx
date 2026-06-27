import React from 'react';
import { Search } from 'lucide-react';

interface CommandPaletteEmptyProps {
  query: string;
}

const CommandPaletteEmpty: React.FC<CommandPaletteEmptyProps> = ({ query }) => {
  return (
    <div className="py-12 text-center">
      <div className="w-16 h-16 bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <p className="text-slate-400 font-bold text-sm">No results found for "{query}"</p>
    </div>
  );
};

export default CommandPaletteEmpty;
