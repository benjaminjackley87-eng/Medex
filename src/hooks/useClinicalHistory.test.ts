import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClinicalHistory } from './useClinicalHistory';

describe('useClinicalHistory', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('initializes with empty history if sessionStorage is empty', () => {
    const { result } = renderHook(() => useClinicalHistory());
    expect(result.current.history).toEqual([]);
  });

  it('initializes from sessionStorage if available', () => {
    const mockHistory = [{ id: 'test-1', type: 'exam', label: 'Chest X-Ray', timestamp: 12345 }];
    sessionStorage.setItem('medex_clinical_history', JSON.stringify(mockHistory));
    
    const { result } = renderHook(() => useClinicalHistory());
    expect(result.current.history).toEqual(mockHistory);
  });

  it('adds an item to history', () => {
    const { result } = renderHook(() => useClinicalHistory());
    
    act(() => {
      result.current.addToHistory('system', 'Cardiovascular');
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].type).toBe('system');
    expect(result.current.history[0].label).toBe('Cardiovascular');
    
    const saved = JSON.parse(sessionStorage.getItem('medex_clinical_history') || '[]');
    expect(saved.length).toBe(1);
    expect(saved[0].label).toBe('Cardiovascular');
  });

  it('prevents consecutive duplicate labels of the same type', () => {
    const { result } = renderHook(() => useClinicalHistory());
    
    act(() => {
      result.current.addToHistory('exam', 'ECG');
      result.current.addToHistory('exam', 'ECG'); // Should be ignored
    });

    expect(result.current.history.length).toBe(1);
  });

  it('allows same label if type is different, or same type if not consecutive', () => {
    const { result } = renderHook(() => useClinicalHistory());
    
    act(() => {
      result.current.addToHistory('exam', 'ECG');
      result.current.addToHistory('finding', 'ECG'); // different type
      result.current.addToHistory('exam', 'Chest X-Ray');
      result.current.addToHistory('exam', 'ECG'); // not consecutive
    });

    expect(result.current.history.length).toBe(4);
  });

  it('keeps only the last 15 items', () => {
    const { result } = renderHook(() => useClinicalHistory());
    
    act(() => {
      for (let i = 0; i < 20; i++) {
        result.current.addToHistory('exam', `Item ${i}`);
      }
    });

    expect(result.current.history.length).toBe(15);
    expect(result.current.history[0].label).toBe('Item 5');
    expect(result.current.history[14].label).toBe('Item 19');
  });

  it('removes an item by id', () => {
    const { result } = renderHook(() => useClinicalHistory());
    
    act(() => {
      result.current.addToHistory('exam', 'Remove Me');
    });
    
    const id = result.current.history[0].id;
    
    act(() => {
      result.current.removeFromHistory(id);
    });
    
    expect(result.current.history.length).toBe(0);
  });

  it('clears history entirely', () => {
    const { result } = renderHook(() => useClinicalHistory());
    
    act(() => {
      result.current.addToHistory('exam', 'Test 1');
      result.current.addToHistory('exam', 'Test 2');
      result.current.clearHistory();
    });
    
    expect(result.current.history.length).toBe(0);
    const saved = JSON.parse(sessionStorage.getItem('medex_clinical_history') || '[]');
    expect(saved.length).toBe(0);
  });
});
