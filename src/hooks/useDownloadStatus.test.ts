import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDownloadStatus } from './useDownloadStatus';
import { storage } from '../services/storageService';
import { downloadManager } from '../services/downloadManagerService';
import { useAppStore } from '../store/useAppStore';
import { DownloadTask, Examination } from '../types';

vi.mock('../services/storageService', () => ({
  storage: {
    getAllDownloaded: vi.fn()
  }
}));

vi.mock('../services/downloadManagerService', () => ({
  downloadManager: {
    subscribe: vi.fn(),
    addTask: vi.fn()
  }
}));

describe('useDownloadStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.setState({
      downloadedIds: new Set(),
      syncingIds: new Set()
    });
  });

  it('initializes and fetches downloaded exams on mount', async () => {
    vi.mocked(storage.getAllDownloaded).mockResolvedValue([{ id: 'exam-1' } as unknown as Examination]);
    vi.mocked(downloadManager.subscribe).mockReturnValue(vi.fn());

    const { result } = renderHook(() => useDownloadStatus());

    // We must wait for state updates from the async getAllDownloaded
    await vi.waitFor(() => {
      expect(result.current.downloadedIds.has('exam-1')).toBe(true);
    });

    expect(downloadManager.subscribe).toHaveBeenCalled();
  });

  it('updates syncingIds when download manager emits events', async () => {
    vi.mocked(storage.getAllDownloaded).mockResolvedValue([]);

    // Capture the subscriber callback
    let subscriberCallback: (tasks: DownloadTask[]) => void;
    vi.mocked(downloadManager.subscribe).mockImplementation((cb) => {
      subscriberCallback = cb;
      return vi.fn();
    });

    const { result } = renderHook(() => useDownloadStatus());

    await vi.waitFor(() => {
      expect(downloadManager.subscribe).toHaveBeenCalled();
    });

    act(() => {
      subscriberCallback([
        { examId: 'exam-1', status: 'downloading' },
        { examId: 'exam-2', status: 'pending' },
        { examId: 'exam-3', status: 'completed' }
      ] as unknown as DownloadTask[]);
    });

    expect(result.current.syncingIds.has('exam-1')).toBe(true);
    expect(result.current.syncingIds.has('exam-2')).toBe(true);
    expect(result.current.syncingIds.has('exam-3')).toBe(false); // completed is not syncing
  });

  it('starts a download', async () => {
    vi.mocked(storage.getAllDownloaded).mockResolvedValue([]);
    vi.mocked(downloadManager.subscribe).mockReturnValue(vi.fn());

    const { result } = renderHook(() => useDownloadStatus());

    await vi.waitFor(() => {
      expect(downloadManager.subscribe).toHaveBeenCalled();
    });

    act(() => {
      result.current.startDownload('exam-999');
    });

    expect(downloadManager.addTask).toHaveBeenCalledWith('exam-999');
  });
});
