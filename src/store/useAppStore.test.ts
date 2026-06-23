import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './useAppStore';
import { AppTheme, StudyProgress } from '../types';
import { DEFAULT_THEME } from '../constants';

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      theme: DEFAULT_THEME,
      isEditMode: false,
      isDevMode: false,
      isSidebarCollapsed: false,
      searchQuery: '',
      investigationSearchQuery: '',
      glossaryTerm: '',
      selectedExam: null,
      selectedSystem: null,
      studyProgress: []
    });
  });

  it('should initialize with default theme', () => {
    const state = useAppStore.getState();
    expect(state.theme).toEqual(DEFAULT_THEME);
  });

  it('should update theme correctly', () => {
    const newTheme: AppTheme = {
      ...DEFAULT_THEME,
      primaryColor: '#000000'
    };

    useAppStore.getState().setTheme(newTheme);
    expect(useAppStore.getState().theme.primaryColor).toBe('#000000');
  });

  it('should toggle edit mode', () => {
    expect(useAppStore.getState().isEditMode).toBe(false);

    useAppStore.getState().setIsEditMode(true);
    expect(useAppStore.getState().isEditMode).toBe(true);

    // Toggle using callback
    useAppStore.getState().setIsEditMode((prev) => !prev);
    expect(useAppStore.getState().isEditMode).toBe(false);
  });

  it('should correctly store study progress', () => {
    const mockProgress: StudyProgress[] = [
      { topic: 'exam-1', questionsAttempted: 10, correctAnswers: 8, lastStudiedAt: Date.now(), masteryLevel: 80 }
    ];

    useAppStore.getState().setStudyProgress(mockProgress);
    expect(useAppStore.getState().studyProgress.length).toBe(1);
    expect(useAppStore.getState().studyProgress[0].topic).toBe('exam-1');
  });
});
