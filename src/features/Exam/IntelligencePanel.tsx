import React from 'react';
import { Zap, BrainCircuit, Microscope, Plus, Trash2 } from 'lucide-react';
import { Examination } from '../../types';

interface IntelligencePanelProps {
  exam: Examination;
  isEditMode: boolean;
  updateGeneralField: (field: keyof Examination, value: any) => void;
}

const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  exam,
  isEditMode,
  updateGeneralField
}) => {
  return (
    <div className="animate-in slide-in-from-bottom-6 duration-700 space-y-16">
      {/* Red Flags Section */}
      <section className="p-10 bg-rose-900 text-white rounded-[50px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-950/40/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-400" />
            🚨 Critical Red Flags
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {(exam.redFlags || [])
                .slice(0, Math.ceil((exam.redFlags?.length || 0) / 2))
                .map((flag, i) => (
                  <li key={i} className="flex items-center gap-3 text-[12px] font-bold">
                    <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                    {flag}
                  </li>
                ))}
            </ul>
            <ul className="space-y-4">
              {(exam.redFlags || [])
                .slice(Math.ceil(((exam.redFlags || [])?.length || 0) / 2))
                .map((flag, i) => (
                  <li key={i} className="flex items-center gap-3 text-[12px] font-bold">
                    <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                    {flag}
                  </li>
                ))}
            </ul>
            {(!exam.redFlags || (exam.redFlags || []).length === 0) && (
              <p className="col-span-full text-white/40 text-xs font-bold uppercase tracking-widest">
                No critical red flags documented.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Differential Diagnoses Section */}
      <section className="space-y-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
          <BrainCircuit className="w-5 h-5 text-rose-600" />
          🧠 Differential Diagnoses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(exam.differentialDiagnoses || []).map((dd, i) => (
            <div
              key={i}
              className="group relative p-6 bg-slate-950/20 rounded-3xl border border-white/5 hover:border-rose-200 transition-all"
            >
              <h4 className="text-sm font-black text-white mb-2 uppercase tracking-tight">
                {dd.condition}
              </h4>
              <p className="text-[12px] leading-relaxed text-slate-400 font-medium">
                {dd.explanation}
              </p>
            </div>
          ))}
          {(!exam.differentialDiagnoses || (exam.differentialDiagnoses || []).length === 0) && (
            <p className="col-span-full text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
              No differential data synthesized yet.
            </p>
          )}
        </div>
      </section>

      {/* Worked Cases */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
            <Microscope className="w-5 h-5 text-emerald-600" />
            🧪 Worked Cases
          </h3>
          {isEditMode && (
            <button
              onClick={() => {
                const title = prompt('Case Title:');
                const description = prompt('Description:');
                const analysis = prompt('Analysis:');
                if (title && description && analysis)
                  updateGeneralField('workedCases', [
                    ...(exam.workedCases || []),
                    { title, description, analysis }
                  ]);
              }}
              className="p-2 bg-amber-100 text-amber-400 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 text-[10px] font-black uppercase"
            >
              <Plus className="w-4 h-4" /> Add Case
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(exam.workedCases || []).map((c, i) => (
            <div
              key={i}
              className="group relative p-8 bg-slate-950/40 border border-white/5 rounded-[40px] shadow-sm flex flex-col"
            >
              {isEditMode && (
                <button
                  onClick={() =>
                    updateGeneralField(
                      'workedCases',
                      exam.workedCases?.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-4 right-4 p-1.5 bg-slate-950/40 text-slate-400 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-4 tracking-widest">
                {c.title}
              </p>
              <div className="bg-slate-950/20 p-4 rounded-2xl mb-4 border border-white/5">
                <p className="text-[11px] font-medium text-slate-400 italic leading-relaxed">
                  {c.description}
                </p>
              </div>
              <p className="text-[12px] font-bold text-white leading-relaxed mt-auto">
                {c.analysis}
              </p>
            </div>
          ))}
          {(!exam.workedCases || (exam.workedCases || []).length === 0) && (
            <p className="col-span-full text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
              No worked cases documented yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default IntelligencePanel;
