import React from 'react';
import { LineChart, Image as ImageIcon } from 'lucide-react';
import { DIAGRAM_SIMULATORS } from './registry';
import { formatKeyToTitle } from '../../utils/latexTextParser';

interface InteractiveDiagramProps {
  conceptId: string;
  conceptName: string;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({
  conceptId,
  conceptName
}) => {
  const simulator = DIAGRAM_SIMULATORS[conceptId];

  const info = simulator
    ? {
        title: simulator.title,
        type: simulator.type,
        description: simulator.description,
        Component: simulator.Component,
        checklist: simulator.checklist
      }
    : {
        title: `Recommended Diagram: ${formatKeyToTitle(conceptName)}`,
        type: 'Visual Aid Placeholder',
        description: `A dedicated layout box reserved for physiological charts, clinical pathways, or anatomic schematics corresponding to: "${formatKeyToTitle(conceptName)}".`,
        Component: null,
        checklist: [
          'Key annotations matching the first-principles description',
          'Interactive overlays showing compensatory shifts',
          'Reference indicators of normal clinical values'
        ]
      };

  return (
    <div className="bg-[#12161E]/80 border border-white/5 rounded-2xl p-5 space-y-4 hover:border-white/10 transition-all mt-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-blue-400" />
          <h4 className="text-xs font-black text-white uppercase tracking-wider">{info.title}</h4>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-blue-950/200/10 border border-blue-500/20 text-blue-400">
          {info.type}
        </span>
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{info.description}</p>

      {info.Component ? (
        React.createElement(info.Component)
      ) : (
        <div className="h-32 bg-slate-950/20 border border-dashed border-slate-800/80 rounded-xl flex flex-col items-center justify-center text-center p-4">
          <ImageIcon className="w-8 h-8 text-slate-400 mb-2 animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            Visual Diagram / Graph Box
          </span>
          <span className="text-[9px] text-slate-400 font-mono mt-1">{conceptId}.png</span>
        </div>
      )}

      <div className="space-y-1.5">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
          Core Annotations Checklist:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {info.checklist.map((point, index) => (
            <div key={index} className="flex gap-2 items-start text-[10px] text-slate-400">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-950/200 mt-1.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
