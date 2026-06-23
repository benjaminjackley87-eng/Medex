import React, { useState } from 'react';
import {
  Search,
  ShieldAlert,
  ExternalLink,
  BookOpen,
  Activity,
  Info,
  Loader2,
  AlertCircle,
  ChevronRight,
  Clock,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GeminiService } from '../services/geminiService';
import { TherapeuticGuidance } from '../types';

const gemini = new GeminiService();

export const TherapeuticNavigator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guidance, setGuidance] = useState<TherapeuticGuidance | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent, forceRefresh: boolean = false) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await gemini.getTherapeuticGuidance(
        query,
        forceRefresh,
        referenceUrl || undefined
      );
      setGuidance(result);
    } catch (err) {
      setError('Failed to fetch therapeutic guidelines. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-950/40 text-amber-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/20">
          <Activity className="w-4 h-4" /> Live Therapeutic Navigator
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          Management <span className="text-amber-500">Protocols</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
          Real-time therapeutic guidance grounded in local Queensland and Australian protocols.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12 space-y-4">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-amber-400 transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search condition (e.g., Sepsis, Community Acquired Pneumonia, ACS)..."
            className="w-full bg-slate-900 border-2 border-white/5 rounded-[32px] py-6 pl-16 pr-32 text-xl font-medium focus:outline-none focus:border-amber-500/30 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-sm text-white"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-3 top-3 bottom-3 px-8 bg-slate-950 text-white border border-white/10 rounded-[24px] font-bold text-sm uppercase tracking-widest hover:bg-amber-600 transition-all disabled:opacity-50 disabled:hover:bg-slate-950 flex items-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
          </button>
        </form>

        <div className="flex justify-center">
          <button
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-amber-400 transition-colors tracking-widest cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {showUrlInput ? 'Hide Reference URL' : 'Attach Reference Pathway (URL)'}
          </button>
        </div>

        <AnimatePresence>
          {showUrlInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-slate-900/60 rounded-[24px] border border-white/5">
                <label className="block text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">
                  Reference Pathway URL (PDF or Webpage)
                </label>
                <input
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://www.health.qld.gov.au/.../pathway.pdf"
                  className="w-full bg-slate-950 border border-white/5 text-white rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-amber-500"
                />
                <p className="text-[8px] text-slate-400 mt-2 font-medium">
                  The AI will use this document as the primary source of truth for management steps.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer - ALWAYS VISIBLE */}
      <div className="mb-12 bg-slate-900 text-white p-8 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldAlert className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-amber-500">
              Critical Clinical Disclaimer
            </h2>
          </div>
          <p className="text-slate-300 leading-relaxed font-medium">
            This tool uses AI to synthesize management protocols from live web sources. It is
            intended as a<span className="text-white font-bold"> decision-support aid only</span>.
            Guidelines change rapidly. Always verify dosages and protocols against official hospital
            sources (eTG, CHRISP, local formulary) before clinical application. The author accepts
            no liability for clinical decisions made using this tool.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 text-center"
          >
            <div className="w-20 h-20 bg-amber-950/40 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-amber-500/10">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest">
              Searching Guidelines...
            </h3>
            <p className="text-slate-400 font-medium mt-2">
              Querying Queensland Health and Australian protocols.
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 bg-red-950/20 border border-red-500/15 rounded-[40px] text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-200">{error}</h3>
            <button
              onClick={() => handleSearch()}
              className="mt-4 px-6 py-2 bg-red-900/35 border border-red-500/20 text-red-300 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-red-900/60 transition-colors cursor-pointer"
            >
              Retry Search
            </button>
          </motion.div>
        ) : guidance ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Condition Header */}
            <div className="bg-slate-900 p-10 rounded-[48px] border border-white/5 shadow-sm relative group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1">
                  {guidance.retrievedAt && (
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <Clock className="w-3 h-3" /> Retrieved:{' '}
                      {new Date(guidance.retrievedAt).toLocaleString()}
                    </div>
                  )}
                  {guidance.referenceUrl && (
                    <div className="flex items-center gap-2 text-[9px] font-black text-amber-500 uppercase tracking-widest">
                      <ShieldAlert className="w-3 h-3" /> Grounded in Reference Pathway
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleSearch(undefined, true)}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-950 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-950/60 hover:text-amber-400 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 border border-white/5 cursor-pointer"
                  title="Force re-acquisition from live sources"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh Live
                </button>
              </div>
              <h2 className="text-3xl font-black text-white mb-4">{guidance.condition}</h2>
              <p className="text-slate-300 text-lg leading-relaxed italic">{guidance.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Line */}
              <div className="bg-emerald-950/20 p-8 rounded-[40px] border border-emerald-500/15">
                <h3 className="text-[11px] font-black uppercase text-emerald-400 mb-6 tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4" /> First-Line Management
                </h3>
                <ul className="space-y-4">
                  {guidance.firstLine.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 font-medium">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-950/200 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Second Line */}
              <div className="bg-amber-950/20 p-8 rounded-[40px] border border-amber-500/15">
                <h3 className="text-[11px] font-black uppercase text-amber-400 mb-6 tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4" /> Alternative / 2nd Line
                </h3>
                <ul className="space-y-4">
                  {guidance.secondLine.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-300 font-medium">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-950/200 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* TNQ Specifics */}
            <div className="bg-indigo-950/20 p-8 rounded-[40px] border border-indigo-500/15">
              <h3 className="text-[11px] font-black uppercase text-indigo-400 mb-4 tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> TNQ Regional Considerations
              </h3>
              <p className="text-slate-300 font-medium leading-relaxed">{guidance.tnqSpecifics}</p>
            </div>

            {/* Monitoring */}
            <div className="bg-slate-900 p-8 rounded-[40px] border border-white/5 shadow-sm">
              <h3 className="text-[11px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> Monitoring & Follow-up
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guidance.monitoring.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-slate-950/40 border border-white/5 rounded-2xl text-slate-300 font-medium"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Sources - HYPERLINKS */}
            <div className="bg-slate-950/40 p-8 rounded-[40px] border border-white/5">
              <h3 className="text-[11px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Verified Sources & References
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guidance.sources.map((source, i) => (
                  <a
                    key={i}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 bg-amber-950/45 rounded-lg flex items-center justify-center shrink-0 border border-amber-500/10">
                        <ExternalLink className="w-4 h-4 text-amber-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-300 truncate group-hover:text-amber-400 transition-colors">
                        {source.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-900/60 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-white/5">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">
              Ready to Navigate
            </h3>
            <p className="text-slate-400 font-medium mt-2">
              Enter a condition to retrieve the latest management protocols.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
