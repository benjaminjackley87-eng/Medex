import { useMemo, useEffect } from 'react';
import { Examination, ExamSystem } from '../types';
import { EXAMINATIONS } from '../constants';
import { storage } from '../services/storageService';
import { getClosestMatch } from '../utils/stringUtils';
import { useAppStore } from '../store/useAppStore';

export function useExaminations() {
  const searchQuery = useAppStore((state) => state.searchQuery);
  const selectedSystem = useAppStore((state) => state.selectedSystem);
  const setSelectedSystem = useAppStore((state) => state.setSelectedSystem);
  const selectedExam = useAppStore((state) => state.selectedExam);
  const setSelectedExam = useAppStore((state) => state.setSelectedExam);
  const expandedSystems = useAppStore((state) => state.expandedSystems);
  const setExpandedSystems = useAppStore((state) => state.setExpandedSystems);
  const downloadedExams = useAppStore((state) => state.downloadedExams);
  const setDownloadedExams = useAppStore((state) => state.setDownloadedExams);
  const downloadedIds = useAppStore((state) => state.downloadedIds);

  // We can keep didYouMean as a local state inside the hook if it's only derived from searchQuery
  // or we can just derive it directly without useState
  const { groupedExams, newDidYouMean } = useMemo(() => {
    const groups: Record<string, Examination[]> = {};
    let filtered = EXAMINATIONS;
    let newDidYouMean = null;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.shortDescription?.toLowerCase().includes(q) ||
          e.system?.toLowerCase().includes(q) ||
          e.keywords?.some((k) => k.toLowerCase().includes(q)) ||
          (e.differentialDiagnoses || []).some((dd) => dd.condition.toLowerCase().includes(q))
      );

      if (filtered.length === 0 && searchQuery.trim().length > 2) {
        const allCandidates: string[] = [];
        EXAMINATIONS.forEach((e) => {
          if (e.name) allCandidates.push(e.name);
          if (e.system) allCandidates.push(e.system);
          if (e.keywords) allCandidates.push(...e.keywords);
          e.differentialDiagnoses?.forEach((dd) => allCandidates.push(dd.condition));
        });
        newDidYouMean = getClosestMatch(searchQuery.trim(), Array.from(new Set(allCandidates)));
      }
    }

    filtered.forEach((exam) => {
      const stored = downloadedExams.find((d) => d.id === exam.id);
      const examToUse = stored || exam;

      if (!groups[examToUse.system]) groups[examToUse.system] = [];
      groups[examToUse.system].push(examToUse);
    });

    Object.keys(groups).forEach((system) => {
      groups[system].sort((a, b) => a.name.localeCompare(b.name));
    });

    const sortedGroups: Record<string, Examination[]> = {};
    const systemOrder = Object.values(ExamSystem) as string[];
    systemOrder.forEach((system) => {
      if (groups[system]) {
        sortedGroups[system] = groups[system];
      }
    });
    Object.keys(groups).forEach((system) => {
      if (!sortedGroups[system]) {
        sortedGroups[system] = groups[system];
      }
    });

    return { groupedExams: sortedGroups, newDidYouMean };
  }, [searchQuery, downloadedExams]);

  const displayGroups = useMemo(() => {
    if (selectedSystem) {
      return { [selectedSystem]: groupedExams[selectedSystem] || [] };
    }
    return groupedExams;
  }, [selectedSystem, groupedExams]);

  const handleSelectExam = async (exam: Examination) => {
    const stored = await storage.getExamination(exam.id);
    setSelectedExam(stored || exam);
  };

  const toggleSystemExpansion = (system: string) => {
    setExpandedSystems((prev) => {
      const next = new Set(prev);
      if (next.has(system)) next.delete(system);
      else next.add(system);
      return next;
    });
  };

  const memoizedDownloadedExams = useMemo(() => {
    return downloadedExams.filter(
      (e) =>
        !searchQuery ||
        e.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.system?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [downloadedExams, searchQuery]);

  return {
    selectedSystem,
    setSelectedSystem,
    selectedExam,
    setSelectedExam,
    displayGroups,
    expandedSystems,
    toggleSystemExpansion,
    handleSelectExam,
    downloadedExams: memoizedDownloadedExams,
    examinations: EXAMINATIONS,
    didYouMean: newDidYouMean
  };
}
