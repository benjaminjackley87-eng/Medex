import React, { useMemo } from 'react';
import { Activity, Search, ShieldCheck } from 'lucide-react';
import { Examination, ExamSystem, AppView } from '../types';
import ExaminationCard from '../components/common/ExaminationCard';

interface MSKExaminationListViewProps {
  examinations: Examination[];
  onSelectExam: (exam: Examination) => void;
  onSyncExam: (examId: string) => void;
  downloadedIds: Set<string>;
  syncingIds: Set<string>;
}

const MSKExaminationListView: React.FC<MSKExaminationListViewProps> = ({
  examinations,
  onSelectExam,
  onSyncExam,
  downloadedIds,
  syncingIds
}) => {
  const mskExams = useMemo(() => {
    return examinations.filter(
      (e) =>
        e.id.startsWith('msk-') ||
        e.system === ExamSystem.RHEUMATOLOGICAL ||
        e.keywords.some((k) => k.toLowerCase().includes('musculoskeletal'))
    );
  }, [examinations]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 md:px-10 pb-32">
      <header className="mb-16 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-xl shadow-amber-500/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-600">
                  Specialized Module
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white">
                  Individualised MSK Examinations
                </p>
              </div>
            </div>

            <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-black text-white tracking-tighter leading-[0.85] uppercase font-display">
              Precision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600">
                Orthopaedics
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-xl font-medium leading-relaxed">
              Targeted musculoskeletal protocols focusing on specialized provocative tests,
              ligamentous integrity, and regional anatomy.
            </p>
          </div>

          <div className="lg:w-80 shrink-0 space-y-6">
            <div className="p-6 bg-amber-950/20 border border-amber-950/30 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  Pathology Focus
                </span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  <span className="text-[9px] font-black text-amber-600 uppercase">Validated</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Ligamentous Stability Tests
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Miniscal Integrity Gates
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Provocative Impingement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mskExams.map((exam) => (
          <ExaminationCard
            key={exam.id}
            exam={exam}
            onSelect={() => onSelectExam(exam)}
            onSync={() => onSyncExam(exam.id)}
            isDownloaded={downloadedIds.has(exam.id)}
            isSyncing={syncingIds.has(exam.id)}
          />
        ))}
      </div>

      {mskExams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 opacity-20">
          <Search className="w-16 h-16 mb-4" />
          <p className="text-xl font-black uppercase tracking-widest">No MSK Modules Found</p>
        </div>
      )}
    </div>
  );
};

export default MSKExaminationListView;
