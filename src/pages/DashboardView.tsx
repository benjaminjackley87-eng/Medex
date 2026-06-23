import React, { useMemo } from 'react';
import { Examination, LearningStatus, ExamSystem, AppView, StudyProgress } from '../types';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { DashboardQuickLinks } from '../components/dashboard/DashboardQuickLinks';
import { DashboardActionCards } from '../components/dashboard/DashboardActionCards';
import { DashboardActivityFeed } from '../components/dashboard/DashboardActivityFeed';
import { DashboardProgress } from '../components/dashboard/DashboardProgress';

interface DashboardViewProps {
  downloadedExams?: Examination[];
  studyProgress?: StudyProgress[];
  onSelectExam?: (exam: Examination) => void;
  onNavigate?: (view: AppView) => void;
  onOpenCommandPalette?: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = (props) => {
  const store = useAppStore();
  const reactNavigate = useNavigate();

  const downloadedExams = props.downloadedExams ?? store.downloadedExams;
  const studyProgress = props.studyProgress ?? store.studyProgress;
  const onNavigate =
    props.onNavigate ??
    ((view: string) => {
      const routeMap: Record<string, string> = {
        diagnosticReasoning: 'search',
        investigationsHub: 'calculators',
        studyHub: 'search',
        acuteInterventions: 'procedures',
        therapeuticsTox: 'therapeutics'
      };
      reactNavigate(`/${routeMap[view] || view}`);
    });
  const onSelectExam =
    props.onSelectExam ??
    ((exam: Examination) => {
      store.setSelectedExam(exam);
      reactNavigate(`/exam/${exam.id}`);
    });
  const onOpenCommandPalette = props.onOpenCommandPalette;

  const stats = useMemo(() => {
    const total = downloadedExams.length;
    const learned = downloadedExams.filter(
      (e) => e.learningStatus === LearningStatus.LEARNED
    ).length;
    const inProgress = downloadedExams.filter(
      (e) => e.learningStatus === LearningStatus.IN_PROGRESS
    ).length;
    const toReview = downloadedExams.filter(
      (e) => e.learningStatus === LearningStatus.TO_REVIEW || !e.learningStatus
    ).length;

    const systemProgress = Object.values(ExamSystem)
      .map((system) => {
        const exams = downloadedExams.filter((e) => e.system === system);
        if (exams.length === 0) return null;
        const learnedCount = exams.filter(
          (e) => e.learningStatus === LearningStatus.LEARNED
        ).length;
        return {
          system,
          total: exams.length,
          learned: learnedCount,
          percentage: Math.round((learnedCount / exams.length) * 100)
        };
      })
      .filter(
        (
          item
        ): item is { system: ExamSystem; total: number; learned: number; percentage: number } =>
          item !== null
      );

    return { total, learned, inProgress, toReview, systemProgress };
  }, [downloadedExams]);

  const recentActivity = useMemo(() => {
    return downloadedExams.slice(0, 4).map((exam, idx) => ({
      id: exam.id,
      type: idx % 2 === 0 ? 'completion' : 'sync',
      title: idx % 2 === 0 ? `Mastered ${exam.name}` : `Synced ${exam.name}`,
      time: `${idx + 1}h ago`,
      system: exam.system,
      exam
    }));
  }, [downloadedExams]);

  const quotes = [
    'The good physician treats the disease; the great physician treats the patient who has the disease. - William Osler',
    'Listen to your patient, he is telling you the diagnosis. - William Osler',
    'Medicine is a science of uncertainty and an art of probability. - William Osler'
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 text-slate-100">
      <DashboardHeader onNavigate={onNavigate} onOpenCommandPalette={onOpenCommandPalette} />

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardQuickLinks onNavigate={onNavigate} />

        <DashboardActionCards stats={stats} onNavigate={onNavigate} quotes={quotes} />

        <DashboardActivityFeed
          recentActivity={recentActivity}
          onSelectExam={onSelectExam}
          onNavigate={onNavigate}
        />

        <DashboardProgress
          systemProgress={stats.systemProgress}
          studyProgress={studyProgress}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default DashboardView;
