import React, { useState, useEffect } from 'react';
import { Command, X, Keyboard, HelpCircle } from 'lucide-react';

export const KeyboardShortcutsOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?') {
        // Toggle if not focusing an input
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
          return;
        }
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['⌘', 'K'], desc: 'Open Command Palette' },
    { keys: ['?'], desc: 'Toggle keyboard shortcut help overlay' },
    { keys: ['Esc'], desc: 'Close modals, drawers, or current exam view' }
  ];

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-sm rounded-[32px] border border-white/10 shadow-2xl p-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-950/200/5 blur-[80px] rounded-full pointer-events-none" />

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-950/40 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
            <Keyboard className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black text-white uppercase tracking-wider">
            Keyboard Shortcuts
          </h3>
        </div>

        <div className="space-y-4">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0"
            >
              <span className="text-[11px] font-bold text-slate-400">{s.desc}</span>
              <div className="flex items-center gap-1 shrink-0">
                {s.keys.map((k, ki) => (
                  <kbd
                    key={ki}
                    className="px-2 py-1 bg-slate-950 border border-white/10 rounded-md text-[9px] font-black text-slate-300 shadow-sm uppercase"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-[9px] text-center text-slate-400 font-bold">
          Press <span className="text-blue-400">?</span> or{' '}
          <span className="text-blue-400">Esc</span> to dismiss this help card.
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsOverlay;
