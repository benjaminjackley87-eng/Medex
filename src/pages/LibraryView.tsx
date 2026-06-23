import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Examination } from '../types';
import SystemSection from '../components/common/SystemSection';
import { useExaminations } from '../hooks/useExaminations';
import { useAppStore } from '../store/useAppStore';
import { useDownloadStatus } from '../hooks/useDownloadStatus';

const LibraryView: React.FC = () => {
  const navigate = useNavigate();
  const { displayGroups, expandedSystems, toggleSystemExpansion, downloadedExams, didYouMean } =
    useExaminations();
  const store = useAppStore();
  const { startDownload } = useDownloadStatus();

  const downloadedIds = store.downloadedIds;
  const syncingIds = store.syncingIds;

  const handleSelectExam = (exam: Examination) => {
    store.setSelectedExam(exam);
    navigate(`/exam/${exam.id}`);
  };

  const handleSyncExam = (examId: string) => {
    startDownload(examId);
  };

  const handleDidYouMeanClick = (term: string) => {
    store.setSearchQuery(term);
  };

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
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400">
                  MedEx Nexus
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white">
                  High-Fidelity Clinical Repository
                </p>
              </div>
            </div>

            <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-black text-white tracking-tighter leading-[0.85] uppercase">
              Master the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                Clinical Art
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-xl font-semibold leading-relaxed">
              Evidence-based diagnostics with synthesized matrices powered by deep medical reasoning
              and high-fidelity clinical examination protocols.
            </p>
          </div>

          <div className="lg:w-80 shrink-0 space-y-6">
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  System Status
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-400 uppercase">Online</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-2xl font-black text-white">
                    {Object.values(displayGroups).flat().length}
                  </span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Protocols
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-black text-blue-400">{downloadedExams.length}</span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Downloaded
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
            Clinical Knowledge Base
          </h2>
        </div>

        {didYouMean && (
          <div className="mb-8 flex justify-start">
            <button
              onClick={() => handleDidYouMeanClick(didYouMean)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-950/20 hover:bg-blue-950/40 text-blue-400 rounded-2xl transition-all border border-blue-500/20"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Did you mean</span>
              <span className="text-sm font-bold border-b border-blue-400 border-dashed">
                {didYouMean}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">?</span>
            </button>
          </div>
        )}

        {Object.keys(displayGroups).length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
              No protocols found
            </p>
            <p className="text-xs text-slate-600">Try adjusting your search query</p>
          </div>
        ) : (
          Object.entries(displayGroups).map(([system, exams]) => (
            <SystemSection
              key={system}
              system={system}
              exams={exams}
              isExpanded={expandedSystems.has(system)}
              onToggle={toggleSystemExpansion}
              onSelectExam={handleSelectExam}
              onSyncExam={handleSyncExam}
              downloadedIds={downloadedIds}
              syncingIds={syncingIds}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LibraryView;
