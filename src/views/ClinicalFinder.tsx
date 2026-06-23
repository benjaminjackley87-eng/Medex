import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { ClinicalCondition } from '../types';
import {
  Search,
  Loader2,
  Zap,
  Microscope,
  ChevronRight,
  Sparkles,
  ListRestart,
  ExternalLink
} from 'lucide-react';
import Tooltip from '../components/Tooltip';
import GlossaryLink from '../components/GlossaryLink';

interface ClinicalFinderProps {
  onNavigateToGlossary?: (term: string) => void;
}

const ClinicalFinder: React.FC<ClinicalFinderProps> = ({ onNavigateToGlossary }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState<ClinicalCondition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gemini = new GeminiService();

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await gemini.getFindingsForCondition(query);
      setCondition(result);
    } catch (err) {
      setError('Condition analysis failed. Please try a common clinical term.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-500/30">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              Clinical Finder
            </h1>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Findings Correlation Matrix
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-400 max-w-xl font-semibold leading-relaxed">
          Select a condition or pathology to reveal its characteristic physical examination
          findings. Findings are linked to deep academic pathophysiology sources (CICM/ANZCA
          standard).
        </p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-12 group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-450 group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Mitral Stenosis, Chronic Liver Disease, Grave's Disease..."
          className="w-full pl-16 pr-40 py-6 bg-slate-900/60 border-2 border-white/5 rounded-[32px] text-base font-bold text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-550 transition-all outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-3 top-3 bottom-3 px-8 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze'}
        </button>
      </form>

      {error && (
        <div className="p-6 bg-red-950/40 border border-red-500/25 rounded-3xl text-red-400 text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
          <Zap className="w-4 h-4" />
          {error}
        </div>
      )}

      {loading && !condition && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-950/40 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] animate-pulse">
            Deep Mapping Condition Stigmata...
          </p>
        </div>
      )}

      {condition && (
        <div className="space-y-8 animate-in zoom-in-95 duration-700">
          <div className="bg-slate-900/60 p-8 rounded-[40px] border-2 border-white/5 shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
            <div className="flex items-center gap-3 mb-6 text-indigo-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Clinical Profile
              </span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-4">
              {condition.name}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-semibold">
              {onNavigateToGlossary ? (
                <GlossaryLink text={condition.description} onNavigate={onNavigateToGlossary} />
              ) : (
                condition.description
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from(
              new Set((condition.findings || []).map((f) => f.category || 'General'))
            ).map((cat, catIdx) => (
              <div
                key={`${cat}-${catIdx}`}
                className="p-6 bg-slate-900/40 rounded-[32px] border border-white/5 group hover:border-indigo-500/30 transition-colors"
              >
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-indigo-950/200/60 rounded-full" />
                  {cat}
                </h3>
                <div className="space-y-4">
                  {(condition.findings || [])
                    .filter((f) => (f.category || 'General') === cat)
                    .map((f, i) => (
                      <div key={`${cat}-${f.sign}-${i}`} className="flex gap-4 group/item">
                        <div className="shrink-0 mt-1">
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-450 group-hover/item:translate-x-1 transition-transform" />
                        </div>
                        <div>
                          {f.link ? (
                            <a
                              href={f.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link"
                            >
                              <p className="text-[12px] font-black text-white mb-1 group-hover/link:text-indigo-400 transition-colors flex items-center gap-2">
                                {onNavigateToGlossary ? (
                                  <GlossaryLink text={f.sign} onNavigate={onNavigateToGlossary} />
                                ) : (
                                  f.sign
                                )}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                              </p>
                            </a>
                          ) : (
                            <p className="text-[12px] font-black text-white mb-1">
                              {onNavigateToGlossary ? (
                                <GlossaryLink text={f.sign} onNavigate={onNavigateToGlossary} />
                              ) : (
                                f.sign
                              )}
                            </p>
                          )}
                          <p className="text-[10px] text-slate-405 leading-relaxed font-semibold opacity-85">
                            {onNavigateToGlossary ? (
                              <GlossaryLink
                                text={f.significance}
                                onNavigate={onNavigateToGlossary}
                              />
                            ) : (
                              f.significance
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-10 text-center">
            <button
              onClick={() => setCondition(null)}
              className="px-8 py-3 bg-slate-900 text-slate-400 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <ListRestart className="w-4 h-4" /> Reset Finder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalFinder;
