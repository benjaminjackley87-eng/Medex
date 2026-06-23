import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExaminations } from './useExaminations';
import { useAppStore } from '../store/useAppStore';
import { storage } from '../services/storageService';
import { ExamSystem, Examination } from '../types';

vi.mock('../services/storageService', () => ({
  storage: {
    getExamination: vi.fn()
  }
}));

describe('useExaminations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.setState({
      searchQuery: '',
      selectedSystem: null,
      selectedExam: null,
      expandedSystems: new Set(),
      downloadedExams: [],
      downloadedIds: new Set()
    });
  });

  it('groups examinations by system by default', () => {
    const { result } = renderHook(() => useExaminations());
    expect(result.current.displayGroups).toHaveProperty('Cardiovascular');
    expect(result.current.displayGroups).toHaveProperty(ExamSystem.RESPIRATORY);
    expect(result.current.examinations.length).toBeGreaterThan(0);
  });

  it('filters examinations based on searchQuery', () => {
    useAppStore.setState({ searchQuery: 'cardiovascular' });
    const { result } = renderHook(() => useExaminations());

    // It should contain the Cardiovascular exam
    expect(Object.keys(result.current.displayGroups).length).toBeGreaterThan(0);
    const hasCV = Object.values(result.current.displayGroups).some((group) =>
      group.some((exam) => exam.system.toLowerCase().includes('cardiovascular'))
    );
    expect(hasCV).toBe(true);
  });

  it('provides a didYouMean suggestion for bad searches', () => {
    useAppStore.setState({ searchQuery: 'cardiovasclar' }); // typo
    const { result } = renderHook(() => useExaminations());

    expect(result.current.didYouMean).toBeTruthy(); // Should match 'Cardiovascular'
  });

  it('toggles expanded systems', () => {
    const { result } = renderHook(() => useExaminations());

    act(() => {
      result.current.toggleSystemExpansion('Cardiovascular');
    });
    expect(result.current.expandedSystems.has('Cardiovascular')).toBe(true);

    act(() => {
      result.current.toggleSystemExpansion('Cardiovascular');
    });
    expect(result.current.expandedSystems.has('Cardiovascular')).toBe(false);
  });

  it('fetches offline exam from storage when selected', async () => {
    const mockExam = { id: 'exam-cv', name: 'Cardiovascular' };
    vi.mocked(storage.getExamination).mockResolvedValueOnce({ ...mockExam, isDownloaded: true } as unknown as Examination);
    
    const { result } = renderHook(() => useExaminations());

    await act(async () => {
      await result.current.handleSelectExam(mockExam as unknown as Examination);
    });

    expect(storage.getExamination).toHaveBeenCalledWith('exam-cv');
    expect(useAppStore.getState().selectedExam?.isDownloaded).toBe(true);
  });

  it('filters displayGroups by selectedSystem if one is set', () => {
    useAppStore.setState({ selectedSystem: ExamSystem.RESPIRATORY });
    const { result } = renderHook(() => useExaminations());

    expect(Object.keys(result.current.displayGroups)).toEqual([ExamSystem.RESPIRATORY]);
  });
});
