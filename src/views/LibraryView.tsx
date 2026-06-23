import React, { useState } from 'react';
import {
  GraduationCap,
  ChevronDown,
  PackageCheck,
  Zap,
  LayoutGrid,
  Search as SearchIcon,
  Microscope,
  Activity,
  Pill,
  Layers,
  Terminal
} from 'lucide-react';
import { Examination, ExamSystem, AppView } from '../types';
import SystemSection from '../components/SystemSection';
import ExaminationCard from '../components/ExaminationCard';
import Tooltip from '../components/Tooltip';
import { SYSTEM_THEMES } from '../theme';

interface LibraryViewProps {
  displayGroups: Record<string, Examination[]>;
  expandedSystems: Set<string>;
  toggleSystemExpansion: (system: string) => void;
  onSelectExam: (exam: Examination) => void;
  onSyncExam: (examId: string) => void;
  onNavigateToView: (view: AppView) => void;
  downloadedIds: Set<string>;
  syncingIds: Set<string>;
  downloadedExams: Examination[];
  isSearching?: boolean;
  didYouMean?: string | null;
  onDidYouMeanClick?: (term: string) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({
  displayGroups,
  expandedSystems,
  toggleSystemExpansion,
  onSelectExam,
  onSyncExam,
  onNavigateToView,
  downloadedIds,
  syncingIds,
  downloadedExams,
  isSearching,
  didYouMean,
  onDidYouMeanClick
}) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 md:px-10 pb-32">
      <header className="mb-16 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-450">
                  MedEx Nexus
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white">
                  High-Fidelity Clinical Repository
                </p>
              </div>
            </div>

            <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-black text-white tracking-tighter leading-[0.85] uppercase font-display">
              Master the <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-violet-400">
                Clinical Art
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-xl font-semibold leading-relaxed">
              Experience evidence-based diagnostics with synthesized matrices powered by deep
              medical reasoning and high-fidelity visual stigmata.
            </p>
          </div>

          <div className="lg:w-80 shrink-0 space-y-6">
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  System Status
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-950/200 animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-450 uppercase">Online</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-2xl font-black text-white">248</span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Protocols
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-black text-blue-400">1,024</span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Active Nodes
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src="/assets/placeholders/avatar.svg"
                    className="w-8 h-8 rounded-full border-2 border-slate-950 shadow-sm"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-400">
                <span className="text-white font-black">+1.2k</span> clinicians active
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN REPOSITORY --- */}
      <div className="space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
            Clinical Knowledge Base
          </h2>
        </div>

        {didYouMean && onDidYouMeanClick && (
          <div className="mb-8 flex justify-start">
            <button
              onClick={() => onDidYouMeanClick(didYouMean)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-950/20 hover:bg-blue-100 text-blue-600 rounded-2xl transition-all shadow-sm"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                Did you mean
              </span>
              <span className="text-sm font-bold border-b border-blue-600 border-dashed">
                {didYouMean}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                ?
              </span>
            </button>
          </div>
        )}

        {Object.entries(displayGroups || {}).map(([system, exams]) => (
          <SystemSection
            key={system}
            system={system}
            exams={exams}
            isExpanded={expandedSystems.has(system)}
            onToggle={toggleSystemExpansion}
            onSelectExam={onSelectExam}
            onSyncExam={onSyncExam}
            downloadedIds={downloadedIds}
            syncingIds={syncingIds}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryView;
