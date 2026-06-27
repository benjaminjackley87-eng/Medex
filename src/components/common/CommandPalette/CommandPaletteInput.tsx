import React, { RefObject } from 'react';
import { Search } from 'lucide-react';

interface CommandPaletteInputProps {
  inputRef: RefObject<HTMLInputElement>;
  query: string;
  onQueryChange: (query: string) => void;
}

const CommandPaletteInput: React.FC<CommandPaletteInputProps> = ({
  inputRef,
  query,
  onQueryChange
}) => {
  return (
    <div className="p-6 border-b border-slate-800 flex items-center gap-4 bg-slate-950/50">
      <Search className="w-5 h-5 text-slate-400" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search pages, protocols, or foundational sciences (e.g. AcetylCoa)..."
        className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-100 placeholder:text-slate-400"
      />
      <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded-lg border border-slate-700">
        <span className="text-[10px] font-black text-slate-400 uppercase">ESC</span>
      </div>
    </div>
  );
};

export default CommandPaletteInput;
