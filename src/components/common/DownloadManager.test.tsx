import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import DownloadManager from './DownloadManager';
import { downloadManager } from '../../services/downloadManagerService';
import { DownloadTask } from '../../types';

// Mock the downloadManagerService
vi.mock('../../services/downloadManagerService', () => {
  let mockTasks: DownloadTask[] = [];
  let isPaused = false;
  let listeners: ((tasks: DownloadTask[]) => void)[] = [];

  return {
    downloadManager: {
      subscribe: vi.fn((listener) => {
        listeners.push(listener);
        // Call immediately with current tasks (as real implementation does)
        listener(mockTasks);
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      }),
      getPauseState: vi.fn(() => isPaused),
      clearArchive: vi.fn(),
      downloadAll: vi.fn(),
      togglePause: vi.fn(),
      retryTask: vi.fn(),
      cancelTask: vi.fn(),

      // Test helpers
      __setMockTasks: (tasks: DownloadTask[]) => {
        mockTasks = tasks;
        listeners.forEach(l => l(mockTasks));
      },
      __setMockPaused: (paused: boolean) => {
        isPaused = paused;
        listeners.forEach(l => l(mockTasks));
      }
    }
  };
});

describe('DownloadManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to empty tasks and not paused
    (downloadManager as any).__setMockTasks([]);
    (downloadManager as any).__setMockPaused(false);
  });

  it('renders correctly with no tasks', () => {
    const { container } = render(<DownloadManager />);
    expect(screen.getByText('No Active Transfers')).toBeInTheDocument();

    // Test the stats rendering "0 / 0"
    const statsContainer = container.querySelector('p.text-3xl');
    expect(statsContainer).toHaveTextContent('0/0');
  });

  it('calculates stats correctly with mixed task statuses', () => {
    const mockTasks: DownloadTask[] = [
      { id: '1', examId: 'e1', examName: 'Exam 1', type: 'deep_sync', status: 'completed', progress: 100, retryCount: 0, createdAt: 0 },
      { id: '2', examId: 'e2', examName: 'Exam 2', type: 'deep_sync', status: 'downloading', progress: 50, retryCount: 0, createdAt: 0 },
      { id: '3', examId: 'e3', examName: 'Exam 3', type: 'deep_sync', status: 'pending', progress: 0, retryCount: 0, createdAt: 0 },
      { id: '4', examId: 'e4', examName: 'Exam 4', type: 'deep_sync', status: 'failed', progress: 0, retryCount: 0, createdAt: 0, error: 'Failed' },
      { id: '5', examId: 'e5', examName: 'Exam 5', type: 'deep_sync', status: 'completed', progress: 100, retryCount: 0, createdAt: 0 },
    ];

    (downloadManager as any).__setMockTasks(mockTasks);

    const { container } = render(<DownloadManager />);

    // Completed: 2, Total: 5 => "2 / 5"
    const statsContainer = container.querySelector('p.text-3xl');
    expect(statsContainer).toHaveTextContent('2/5');

    // Failed: 1
    expect(screen.getByText('1 Pipeline Disruptions')).toBeInTheDocument();

    // Queued: 1
    expect(screen.getByText('1 Sequential Tasks Pending')).toBeInTheDocument();

    // Ensure all exam names render
    expect(screen.getByText('Exam 1')).toBeInTheDocument();
    expect(screen.getByText('Exam 2')).toBeInTheDocument();
    expect(screen.getByText('Exam 3')).toBeInTheDocument();
    expect(screen.getByText('Exam 4')).toBeInTheDocument();
    expect(screen.getByText('Exam 5')).toBeInTheDocument();
  });

  it('calls downloadAll when Sync Entire Library button is clicked', () => {
    render(<DownloadManager />);
    const syncButton = screen.getByText('Sync Entire Library');
    syncButton.click();
    expect(downloadManager.downloadAll).toHaveBeenCalledTimes(1);
  });

  it('toggles pause state when Pause/Resume button is clicked', () => {
    (downloadManager as any).__setMockPaused(false);
    const { unmount } = render(<DownloadManager />);

    const pauseButton = screen.getByText('Pause');
    pauseButton.click();
    expect(downloadManager.togglePause).toHaveBeenCalledTimes(1);

    unmount();

    // Re-render with paused state true
    (downloadManager as any).__setMockPaused(true);
    render(<DownloadManager />);

    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('calls clearArchive when Trash button is clicked', () => {
    // We need to query the button using standard ARIA roles or by specific DOM structure
    // Since there's a Tooltip, the button is its child. We can find by icon or tooltip contents if they are rendered
    // "Purge all downloaded data" is the tooltip content, but might not be in DOM if it's a hover tooltip

    const { container } = render(<DownloadManager />);
    // Trash icon is inside a button with certain classes for the header clear
    // We can just find the button that calls clearArchive.
    const buttons = container.querySelectorAll('button');
    const clearButton = Array.from(buttons).find(b => b.innerHTML.includes('lucide-trash2'));

    expect(clearButton).toBeDefined();
    clearButton?.click();

    expect(downloadManager.clearArchive).toHaveBeenCalledTimes(1);
  });
});
