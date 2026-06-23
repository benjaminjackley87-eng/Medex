import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExamEditor } from './useExamEditor';
import { storage } from '../services/storageService';
import { Examination } from '../types';

vi.mock('../services/storageService', () => ({
  storage: {
    saveExamination: vi.fn()
  }
}));

describe('useExamEditor', () => {
  const initialExam: Examination = {
    id: 'exam-1',
    name: 'Cardiovascular',
    system: 'Cardiovascular',
    shortDescription: 'CV Exam',
    keywords: [],
    steps: [
      {
        id: 'step-1',
        title: 'Inspection',
        description: 'Look at the patient',
        category: 'General'
      },
      { id: 'step-2', title: 'Palpation', description: 'Palpate chest', category: 'Chest' }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with the provided exam and isDirty is false', () => {
    const { result } = renderHook(() => useExamEditor(initialExam));
    expect(result.current.exam).toEqual(initialExam);
    expect(result.current.isDirty).toBe(false);
  });

  it('updates a general field and sets isDirty to true', () => {
    const { result } = renderHook(() => useExamEditor(initialExam));

    act(() => {
      result.current.updateGeneralField('name', 'Updated CV Exam');
    });

    expect(result.current.exam.name).toBe('Updated CV Exam');
    expect(result.current.isDirty).toBe(true);
  });

  it('updates a step field', () => {
    const { result } = renderHook(() => useExamEditor(initialExam));

    act(() => {
      result.current.updateStepField('step-1', 'title', 'New Inspection Title');
    });

    expect(result.current.exam.steps[0].title).toBe('New Inspection Title');
    expect(result.current.isDirty).toBe(true);
  });

  it('adds a new step', () => {
    const { result } = renderHook(() => useExamEditor(initialExam));

    act(() => {
      result.current.addStep('Auscultation');
    });

    expect(result.current.exam.steps).toHaveLength(3);
    expect(result.current.exam.steps[2].category).toBe('Auscultation');
    expect(result.current.isDirty).toBe(true);
  });

  it('removes a step', () => {
    const { result } = renderHook(() => useExamEditor(initialExam));

    act(() => {
      result.current.removeStep('step-1');
    });

    expect(result.current.exam.steps).toHaveLength(1);
    expect(result.current.exam.steps[0].id).toBe('step-2');
  });

  it('moves a step up or down', () => {
    const { result } = renderHook(() => useExamEditor(initialExam));

    act(() => {
      // move step-2 up
      result.current.moveStep(1, 'up');
    });

    expect(result.current.exam.steps[0].id).toBe('step-2');
    expect(result.current.exam.steps[1].id).toBe('step-1');

    act(() => {
      // move step-2 down
      result.current.moveStep(0, 'down');
    });

    expect(result.current.exam.steps[0].id).toBe('step-1');
  });

  it('adds and removes a finding to a step', () => {
    const { result } = renderHook(() => useExamEditor(initialExam));

    act(() => {
      result.current.addFinding('step-1', 'Murmur detected');
    });

    expect(result.current.exam.steps[0].positiveFindings).toHaveLength(1);
    expect(result.current.exam.steps[0].positiveFindings![0].description).toBe('Murmur detected');

    act(() => {
      result.current.removeFinding('step-1', 0);
    });

    expect(result.current.exam.steps[0].positiveFindings).toHaveLength(0);
  });

  it('saves the exam via storageService', async () => {
    vi.mocked(storage.saveExamination).mockResolvedValueOnce(undefined);
    const mockOnUpdate = vi.fn();

    const { result } = renderHook(() => useExamEditor(initialExam, mockOnUpdate));

    act(() => {
      result.current.updateGeneralField('name', 'Changed Name');
    });

    let saveResult;
    await act(async () => {
      saveResult = await result.current.handleSave();
    });

    expect(saveResult).toBe(true);
    expect(storage.saveExamination).toHaveBeenCalledTimes(1);
    expect(storage.saveExamination).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Changed Name',
        isDownloaded: true
      })
    );
    expect(mockOnUpdate).toHaveBeenCalled();
    expect(result.current.isDirty).toBe(false);
  });
});
