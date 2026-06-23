import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useColumnWidths } from './useColumnWidths';

describe('useColumnWidths', () => {
  const layoutKey = 'testLayout';
  const storageKey = `medex_colWidths_${layoutKey}`;
  const defaultWidths = { sidebar: 300, detail: 400 };

  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default widths if nothing is in localStorage', () => {
    const { result } = renderHook(() => useColumnWidths(layoutKey, defaultWidths));

    expect(result.current.sidebarWidth).toBe(300);
    expect(result.current.detailWidth).toBe(400);
  });

  it('initializes from localStorage if present', () => {
    localStorage.setItem(storageKey, JSON.stringify({ sidebar: 250, detail: 350 }));
    const { result } = renderHook(() => useColumnWidths(layoutKey, defaultWidths));

    expect(result.current.sidebarWidth).toBe(250);
    expect(result.current.detailWidth).toBe(350);
  });

  it('falls back to defaults if localStorage has invalid JSON', () => {
    localStorage.setItem(storageKey, 'invalid-json');
    const { result } = renderHook(() => useColumnWidths(layoutKey, defaultWidths));

    expect(result.current.sidebarWidth).toBe(300);
    expect(result.current.detailWidth).toBe(400);
  });

  it('updates widths and debounces save to localStorage', () => {
    const { result } = renderHook(() => useColumnWidths(layoutKey, defaultWidths));

    act(() => {
      result.current.setSidebarWidth(320);
    });

    expect(result.current.sidebarWidth).toBe(320);

    // localStorage should not be updated immediately because of debounce
    const immediateStore = localStorage.getItem(storageKey);
    expect(immediateStore).toBeNull();

    // Fast forward timer
    act(() => {
      vi.advanceTimersByTime(150);
    });

    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    expect(saved.sidebar).toBe(320);
    expect(saved.detail).toBe(400); // unaffected detail width
  });

  it('updates detail width independently', () => {
    const { result } = renderHook(() => useColumnWidths(layoutKey, defaultWidths));

    act(() => {
      result.current.setDetailWidth(500);
    });

    expect(result.current.detailWidth).toBe(500);

    act(() => {
      vi.advanceTimersByTime(150);
    });

    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    expect(saved.sidebar).toBe(300);
    expect(saved.detail).toBe(500);
  });
});
