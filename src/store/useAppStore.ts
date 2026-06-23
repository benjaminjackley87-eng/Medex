import { create } from 'zustand';
import { AppTheme, StudyProgress, ExamSystem, Examination } from '../types';

import { DEFAULT_THEME } from '../constants';

interface AppState {
  // Theme & Globals
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean | ((prev: boolean) => boolean)) => void;
  isDevMode: boolean;
  setIsDevMode: (mode: boolean | ((prev: boolean) => boolean)) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  studyProgress: StudyProgress[];
  setStudyProgress: (progress: StudyProgress[]) => void;

  // Search & Navigation
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  investigationSearchQuery: string;
  setInvestigationSearchQuery: (query: string) => void;
  glossaryTerm: string | undefined;
  setGlossaryTerm: (term: string | undefined) => void;

  // Exam Selection & State
  selectedSystem: ExamSystem | null;
  setSelectedSystem: (system: ExamSystem | null) => void;
  selectedExam: Examination | null;
  setSelectedExam: (exam: Examination | null) => void;
  expandedSystems: Set<string>;
  setExpandedSystems: (systems: Set<string> | ((prev: Set<string>) => Set<string>)) => void;

  // Downloads
  downloadedIds: Set<string>;
  setDownloadedIds: (ids: Set<string>) => void;
  syncingIds: Set<string>;
  setSyncingIds: (ids: Set<string>) => void;
  downloadedExams: Examination[];
  setDownloadedExams: (exams: Examination[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Defaults
  theme: DEFAULT_THEME,
  setTheme: (theme) => set({ theme }),
  isEditMode: false,
  setIsEditMode: (mode) =>
    set((state) => ({ isEditMode: typeof mode === 'function' ? mode(state.isEditMode) : mode })),
  isDevMode: false,
  setIsDevMode: (mode) =>
    set((state) => ({ isDevMode: typeof mode === 'function' ? mode(state.isDevMode) : mode })),
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: (collapsed) =>
    set((state) => ({
      isSidebarCollapsed:
        typeof collapsed === 'function' ? collapsed(state.isSidebarCollapsed) : collapsed
    })),
  studyProgress: [],
  setStudyProgress: (studyProgress) => set({ studyProgress }),

  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  investigationSearchQuery: '',
  setInvestigationSearchQuery: (investigationSearchQuery) => set({ investigationSearchQuery }),
  glossaryTerm: undefined,
  setGlossaryTerm: (glossaryTerm) => set({ glossaryTerm }),

  selectedSystem: null,
  setSelectedSystem: (selectedSystem) => set({ selectedSystem }),
  selectedExam: null,
  setSelectedExam: (selectedExam) => set({ selectedExam }),
  expandedSystems: new Set([ExamSystem.CARDIOVASCULAR]),
  setExpandedSystems: (systems) =>
    set((state) => ({
      expandedSystems: typeof systems === 'function' ? systems(state.expandedSystems) : systems
    })),

  downloadedIds: new Set(),
  setDownloadedIds: (downloadedIds) => set({ downloadedIds }),
  syncingIds: new Set(),
  setSyncingIds: (syncingIds) => set({ syncingIds }),
  downloadedExams: [],
  setDownloadedExams: (downloadedExams) => set({ downloadedExams })
}));
