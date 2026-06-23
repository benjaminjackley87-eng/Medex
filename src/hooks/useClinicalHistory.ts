import { useState, useCallback, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  type: 'system' | 'exam' | 'finding' | 'physiology' | 'procedure';
  label: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export function useClinicalHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load initial history from session/local storage if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('medex_clinical_history');
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load clinical history', e);
    }
  }, []);

  const saveHistory = useCallback((newHistory: HistoryItem[]) => {
    setHistory(() => {
      try {
        sessionStorage.setItem('medex_clinical_history', JSON.stringify(newHistory));
      } catch (e) {
        console.error('Failed to save clinical history', e);
      }
      return newHistory;
    });
  }, []);

  const addToHistory = useCallback(
    (type: HistoryItem['type'], label: string, id: string = label, metadata?: Record<string, unknown>) => {
      const newItem: HistoryItem = {
        id: `${type}-${id}-${Date.now()}`,
        type,
        label,
        timestamp: Date.now(),
        metadata
      };
      setHistory((prev) => {
        // Avoid consecutive duplicate labels of same type
        if (
          prev.length > 0 &&
          prev[prev.length - 1].label === label &&
          prev[prev.length - 1].type === type
        ) {
          return prev;
        }
        const updated = [...prev, newItem].slice(-15); // keep last 15 steps
        try {
          sessionStorage.setItem('medex_clinical_history', JSON.stringify(updated));
        } catch { /* ignore */ }
        return updated;
      });
    },
    []
  );

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        sessionStorage.setItem('medex_clinical_history', JSON.stringify(updated));
      } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory(() => {
      try { sessionStorage.setItem('medex_clinical_history', JSON.stringify([])); } catch { /* ignore */ }
      return [];
    });
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
}
