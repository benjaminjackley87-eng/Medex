import React, { useState, useEffect } from 'react';
import { BrainCircuit, X, Loader2, RefreshCw } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { DiagnosisSuggestion, ExamSystem } from '../../types';

interface DifferentialPanelProps {
  findings: string[];
  system: ExamSystem;
  onClose: () => void;
  isOnline: boolean;
}

const DifferentialPanel: React.FC<DifferentialPanelProps> = ({
  findings,
  system,
  onClose,
  isOnline
}) => {
  const [differentials, setDifferentials] = useState<DiagnosisSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const gemini = new GeminiService();

  const generate = async () => {
    if ((findings || []).length === 0 || !isOnline) return;
    setLoading(true);
    try {
      const suggestions = await gemini.getDifferentialDiagnosis(findings, system);
      setDifferentials(suggestions);
    } catch (e) {
      console.error('Differential Analysis Error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generate();
  }, [(findings || []).length]); // Re-run if finding count changes substantially

  return (
    <div className="fixed right-6 top-24 bottom-24 w-80 bg-slate-950/40 shadow-2xl rounded-[32px] border border-blue-950/30 z-50 p-6 flex flex-col animate-in slide-in-from-right-10 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-black uppercase tracking-tight text-white">Differentials</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-950/20 rounded-lg text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-[9px] font-black uppercase text-slate-400 text-center">
              Correlating Findings...
            </p>
          </div>
        ) : (differentials || []).length > 0 ? (
          (differentials || []).map((d, i) => (
            <div
              key={i}
              className="p-4 bg-slate-950/20 rounded-2xl border border-white/5 group hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[11px] font-black text-white leading-tight">{d.condition}</h4>
                <span
                  className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                    d.probability === 'High'
                      ? 'bg-red-100 text-red-600'
                      : d.probability === 'Moderate'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {d.probability}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-3">{d.reasoning}</p>
              <div className="flex flex-wrap gap-1">
                {(d.keyFindings || []).map((f, fi) => (
                  <span
                    key={fi}
                    className="text-[7px] bg-slate-950/40 border border-white/5 px-1.5 py-0.5 rounded-md text-slate-400 font-bold"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 opacity-50">
            <BrainCircuit className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-[10px] font-bold text-slate-400">Select findings to analyze</p>
          </div>
        )}
      </div>

      <button
        onClick={generate}
        disabled={loading || (findings || []).length === 0}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        Refresh Analysis
      </button>
    </div>
  );
};

export default DifferentialPanel;
