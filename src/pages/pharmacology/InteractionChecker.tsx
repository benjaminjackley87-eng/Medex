import React, { useState } from 'react';
import {
  Stethoscope,
  Plus,
  X,
  Loader2,
  Info,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  Pill
} from 'lucide-react';
import { motion } from 'motion/react';
import { InteractionResult } from '../../types';
import { geminiService } from '../../services/geminiService';

const gemini = geminiService;

interface InteractionCheckerProps {
  setError: (error: string | null) => void;
}

export const InteractionChecker: React.FC<InteractionCheckerProps> = ({ setError }) => {
  const [medications, setMedications] = useState<string[]>([]);
  const [medInput, setMedInput] = useState('');
  const [interactionResult, setInteractionResult] = useState<InteractionResult | null>(null);
  const [checkingInteractions, setCheckingInteractions] = useState(false);

  const handleAddMedication = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (medInput.trim() && !medications.includes(medInput.trim())) {
      setMedications([...medications, medInput.trim()]);
      setMedInput('');
    }
  };

  const handleRemoveMedication = (med: string) => {
    setMedications(medications.filter((m) => m !== med));
  };

  const handleCheckInteractions = async () => {
    if (medications.length < 2) {
      setError('Please add at least two medications to check for interactions.');
      return;
    }

    setCheckingInteractions(true);
    setError(null);
    try {
      const result = await gemini.checkMedicationInteractions(medications);
      setInteractionResult(result);
    } catch (err) {
      setError('Failed to check interactions. Please try again.');
      console.error(err);
    } finally {
      setCheckingInteractions(false);
    }
  };

  return (
    <motion.div
      key="interactions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-slate-900 p-8 rounded-[40px] border border-white/5 shadow-sm">
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Interaction Checker</h2>
        <p className="text-slate-450 font-medium mb-8">
          Add medications to check for interactions, synergisms, and contraindications.
        </p>

        <form onSubmit={handleAddMedication} className="flex gap-4 mb-6">
          <input
            type="text"
            value={medInput}
            onChange={(e) => setMedInput(e.target.value)}
            placeholder="Enter medication name (e.g., Furosemide)"
            className="flex-1 bg-slate-950 border-2 border-white/5 rounded-2xl py-4 px-6 text-lg font-medium focus:outline-none focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 text-white transition-all"
          />
          <button
            type="submit"
            disabled={!medInput.trim()}
            className="px-8 bg-indigo-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-indigo-750 transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5" /> Add
          </button>
        </form>

        {medications.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {medications.map((med, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-indigo-950/40 text-indigo-400 px-4 py-2 rounded-xl border border-indigo-500/20"
              >
                <Pill className="w-4 h-4" />
                <span className="font-bold">{med}</span>
                <button
                  onClick={() => handleRemoveMedication(med)}
                  className="p-1 hover:bg-indigo-900/55 rounded-lg transition-colors ml-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleCheckInteractions}
          disabled={medications.length < 2 || checkingInteractions}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 disabled:hover:bg-slate-900 flex items-center justify-center gap-3"
        >
          {checkingInteractions ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Interactions...
            </>
          ) : (
            <>
              <Stethoscope className="w-5 h-5" /> Check Interactions
            </>
          )}
        </button>
      </div>

      {interactionResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-indigo-950/20 p-8 rounded-[32px] border border-indigo-500/15">
            <h3 className="text-[11px] font-black uppercase text-indigo-400 mb-4 tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4" /> Clinical Summary
            </h3>
            <p className="text-slate-300 font-medium leading-relaxed">
              {interactionResult.summary}
            </p>
          </div>

          {interactionResult.contraindications.length === 0 &&
            interactionResult.interactions.length === 0 &&
            interactionResult.synergisms.length === 0 && (
              <div className="bg-slate-900/40 p-8 rounded-[32px] border border-white/5 text-center">
                <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-1">
                  No Major Interactions Detected
                </h3>
                <p className="text-slate-400 font-medium text-sm">
                  No significant interactions, synergisms, or contraindications were found for this
                  combination. However, always exercise clinical judgment.
                </p>
              </div>
            )}

          {interactionResult.contraindications.length > 0 && (
            <div className="bg-rose-950/20 p-8 rounded-[32px] border border-rose-500/15">
              <h3 className="text-[11px] font-black uppercase text-rose-450 mb-6 tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Absolute Contraindications
              </h3>
              <div className="space-y-4">
                {interactionResult.contraindications.map((ci, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 p-6 rounded-2xl border border-rose-500/10 shadow-sm"
                  >
                    <div className="flex gap-2 mb-3">
                      {ci.drugs.map((drug, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1 bg-rose-900/40 text-rose-400 rounded-lg text-xs font-bold border border-rose-500/10"
                        >
                          {drug}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-350 font-medium">{ci.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {interactionResult.interactions.length > 0 && (
            <div className="bg-amber-950/20 p-8 rounded-[32px] border border-amber-500/15">
              <h3 className="text-[11px] font-black uppercase text-amber-450 mb-6 tracking-widest flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Known Interactions
              </h3>
              <div className="space-y-4">
                {interactionResult.interactions.map((interaction, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 p-6 rounded-2xl border border-amber-500/10 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        {interaction.drugs.map((drug, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-3 py-1 bg-amber-900/40 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/10"
                          >
                            {drug}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          interaction.severity === 'high'
                            ? 'bg-rose-950 text-rose-400 border border-rose-500/20'
                            : interaction.severity === 'moderate'
                              ? 'bg-amber-950 text-amber-400 border border-amber-500/20'
                              : 'bg-blue-950 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {interaction.severity} Risk
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                          Effect
                        </span>
                        <p className="text-slate-300 font-medium text-sm">
                          {interaction.description}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                          Mechanism
                        </span>
                        <p className="text-slate-400 text-sm">{interaction.mechanism}</p>
                      </div>
                      <div className="bg-amber-955/20 p-4 rounded-xl border border-amber-500/15 mt-4">
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-1">
                          Management
                        </span>
                        <p className="text-amber-300 font-medium text-sm">
                          {interaction.management}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {interactionResult.synergisms.length > 0 && (
            <div className="bg-emerald-950/20 p-8 rounded-[32px] border border-emerald-500/15">
              <h3 className="text-[11px] font-black uppercase text-emerald-450 mb-6 tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Synergistic Effects
              </h3>
              <div className="space-y-4">
                {interactionResult.synergisms.map((syn, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 p-6 rounded-2xl border border-emerald-500/10 shadow-sm"
                  >
                    <div className="flex gap-2 mb-3">
                      {syn.drugs.map((drug, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1 bg-emerald-900/40 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/10"
                        >
                          {drug}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-300 font-medium">{syn.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
