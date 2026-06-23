import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * useColumnWidths Hook
 * Persists column widths to localStorage so they survive navigation and page reloads.
 * Uses a debounce on writes to avoid excessive storage I/O during drag operations.
 *
 * @param layoutKey - Unique key to namespace the widths (e.g. 'suiteLayout' | 'workspaceLayout')
 * @param defaults  - Default widths in pixels: { sidebar, detail }
 */
export function useColumnWidths(layoutKey: string, defaults: { sidebar: number; detail: number }) {
  const storageKey = `medex_colWidths_${layoutKey}`;

  // Read persisted values once on mount; fall back to defaults
  const [sidebarWidth, setSidebarWidthRaw] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.sidebar ?? defaults.sidebar;
      }
    } catch {
      // Ignore parse errors
    }
    return defaults.sidebar;
  });

  const [detailWidth, setDetailWidthRaw] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.detail ?? defaults.detail;
      }
    } catch {
      // Ignore parse errors
    }
    return defaults.detail;
  });

  // Debounce timer ref — avoids thrashing localStorage on every mouse move
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistWidths = useCallback(
    (sidebar: number, detail: number) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, JSON.stringify({ sidebar, detail }));
        } catch {
          // Storage quota errors should not crash the app
        }
      }, 150);
    },
    [storageKey]
  );

  // Wrapper setters that also trigger persistence
  const setSidebarWidth = useCallback(
    (value: number) => {
      setSidebarWidthRaw(value);
      setDetailWidthRaw((prev) => {
        persistWidths(value, prev);
        return prev;
      });
    },
    [persistWidths]
  );

  const setDetailWidth = useCallback(
    (value: number) => {
      setDetailWidthRaw(value);
      setSidebarWidthRaw((prev) => {
        persistWidths(prev, value);
        return prev;
      });
    },
    [persistWidths]
  );

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  return { sidebarWidth, setSidebarWidth, detailWidth, setDetailWidth };
}
