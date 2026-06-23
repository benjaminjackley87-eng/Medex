import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import LibraryView from '../views/LibraryView';

vi.mock('./SystemSection', () => ({
  default: ({ system, isExpanded, onToggle }: any) => (
    <div data-testid="system-section" onClick={() => onToggle(system)}>
      System: {system} {isExpanded ? 'Expanded' : 'Collapsed'}
    </div>
  )
}));

describe('LibraryView', () => {
  const defaultProps = {
    displayGroups: {
      Cardiovascular: [{ id: 'exam1', title: 'Cardio Exam' } as any]
    },
    expandedSystems: new Set(['Cardiovascular']),
    toggleSystemExpansion: vi.fn(),
    onSelectExam: vi.fn(),
    onSyncExam: vi.fn(),
    onNavigateToView: vi.fn(),
    downloadedIds: new Set<string>(),
    syncingIds: new Set<string>(),
    downloadedExams: []
  };

  it('renders header text', () => {
    const { getByText } = render(<LibraryView {...defaultProps} />);
    expect(getByText('MedEx Nexus')).toBeInTheDocument();
    expect(getByText('Clinical Art')).toBeInTheDocument();
  });

  it('renders system sections', () => {
    const { getByTestId, getByText } = render(<LibraryView {...defaultProps} />);
    expect(getByTestId('system-section')).toBeInTheDocument();
    expect(getByText('System: Cardiovascular Expanded')).toBeInTheDocument();
  });

  it('calls toggleSystemExpansion when a section is clicked', () => {
    const toggleMock = vi.fn();
    const { getByTestId } = render(<LibraryView {...defaultProps} toggleSystemExpansion={toggleMock} />);
    
    fireEvent.click(getByTestId('system-section'));
    expect(toggleMock).toHaveBeenCalledWith('Cardiovascular');
  });

  it('renders Did You Mean suggestion if provided', () => {
    const onDidYouMeanClickMock = vi.fn();
    const { getByText } = render(
      <LibraryView 
        {...defaultProps} 
        didYouMean="Respiratory"
        onDidYouMeanClick={onDidYouMeanClickMock}
      />
    );
    
    const suggestion = getByText('Respiratory');
    expect(suggestion).toBeInTheDocument();
    
    fireEvent.click(suggestion);
    expect(onDidYouMeanClickMock).toHaveBeenCalledWith('Respiratory');
  });
});
