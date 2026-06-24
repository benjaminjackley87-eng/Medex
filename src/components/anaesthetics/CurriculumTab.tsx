import React from 'react';
import { motion } from 'motion/react';
import { FileText, Activity, Pill, Sparkles } from 'lucide-react';

export const CurriculumTab: React.FC = () => {
  return (
    <motion.div
      key="curriculum"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="bg-slate-950/40 rounded-[40px] border border-white/5 shadow-xl p-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-indigo-950/20 rounded-3xl flex items-center justify-center text-indigo-600">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              ANZCA Primary Syllabus
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Core Learning Objectives & Mastery Goals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-black text-rose-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Physiology Objectives
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Cellular Physiology',
                    desc: 'Transport mechanisms, resting membrane potential, and cellular signaling.'
                  },
                  {
                    title: 'Cardiovascular',
                    desc: "Cardiac cycle, regulation of CO, Starling's Law, and microcirculation."
                  },
                  {
                    title: 'Respiratory',
                    desc: 'Mechanics of breathing, V/Q matching, gas transport, and control of breathing.'
                  },
                  {
                    title: 'Renal',
                    desc: 'GFR, tubular function, acid-base balance, and electrolyte regulation.'
                  },
                  {
                    title: 'Neurophysiology',
                    desc: 'CSF, cerebral blood flow, ANS, and pain pathways.'
                  },
                  {
                    title: 'Hepatic & GI',
                    desc: 'Liver function, metabolism, and gastric emptying.'
                  }
                ].map((obj, i) => (
                  <div
                    key={i}
                    className="p-5 bg-slate-950/20 rounded-2xl border border-white/5 hover:border-rose-200 transition-colors group"
                  >
                    <h4 className="text-xs font-black text-white mb-1 group-hover:text-rose-600 transition-colors">
                      {obj.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      {obj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Pill className="w-4 h-4" /> Pharmacology Objectives
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'General Principles',
                    desc: 'PK/PD models, receptor theory, and potency vs efficacy.'
                  },
                  {
                    title: 'Induction Agents',
                    desc: 'Propofol, Thiopentone, Ketamine: mechanisms and clinical effects.'
                  },
                  {
                    title: 'Inhalational Agents',
                    desc: 'MAC, uptake/distribution, and organ-specific toxicity.'
                  },
                  {
                    title: 'Muscle Relaxants',
                    desc: 'Neuromuscular blockade mechanisms and reversal (Sugammadex).'
                  },
                  {
                    title: 'Analgesics',
                    desc: 'Opioids, NSAIDs, and multimodal analgesia principles.'
                  },
                  {
                    title: 'Local Anaesthetics',
                    desc: 'Mechanism of action, LAST, and specific agent profiles.'
                  }
                ].map((obj, i) => (
                  <div
                    key={i}
                    className="p-5 bg-slate-950/20 rounded-2xl border border-white/5 hover:border-indigo-200 transition-colors group"
                  >
                    <h4 className="text-xs font-black text-white mb-1 group-hover:text-indigo-600 transition-colors">
                      {obj.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      {obj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-amber-950/20 rounded-[32px] border border-amber-950/30">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Mastery Tip: The "Why"
          </h3>
          <p className="text-xs text-amber-800 font-medium leading-relaxed">
            ANZCA examiners look for more than just facts. Focus on the **mechanisms** and
            **relationships**. For every physiological change, ask: *What is the stimulus? What is
            the sensor? What is the effector?* This "control loop" thinking is key to passing the
            primary.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
