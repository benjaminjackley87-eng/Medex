import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import LibraryView from './LibraryView';
import { ExamSystem } from '../types';

// Mock hooks so LibraryView can render in isolation without real store/router context
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

vi.mock('../hooks/useExaminations', () => ({
  useExaminations: () => ({
    displayGroups: {
      Cardiovascular: [{ id: 'exam1', name: 'Cardio Exam', system: 'Cardiovascular' }]
    },
    expandedSystems: new Set(['Cardiovascular']),
    toggleSystemExpansion: vi.fn(),
    downloadedExams: [],
    didYouMean: null
  })
}));

vi.mock('../store/useAppStore', () => ({
  useAppStore: () => ({
    downloadedIds: new Set<string>(),
    syncingIds: new Set<string>(),
    setSelectedExam: vi.fn(),
    setSearchQuery: vi.fn()
  })
}));

vi.mock('../hooks/useDownloadStatus', () => ({
  useDownloadStatus: () => ({
    startDownload: vi.fn()
  })
}));

vi.mock('../components/common/SystemSection', () => ({
  default: ({
    system,
    isExpanded,
    onToggle
  }: {
    system: ExamSystem;
    isExpanded: boolean;
    onToggle: (sys: ExamSystem) => void;
  }) => (
    <div data-testid="system-section" onClick={() => onToggle(system)}>
      System: {system} {isExpanded ? 'Expanded' : 'Collapsed'}
    </div>
  )
}));

describe('LibraryView', () => {
  it('renders header text', () => {
    const { getByText } = render(<LibraryView />);
    expect(getByText('MedEx Nexus')).toBeInTheDocument();
  });

  it('renders system sections', () => {
    const { getByTestId } = render(<LibraryView />);
    expect(getByTestId('system-section')).toBeInTheDocument();
  });
});
