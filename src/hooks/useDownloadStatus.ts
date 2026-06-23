import { useEffect } from 'react';
import { storage } from '../services/storageService';
import { downloadManager } from '../services/downloadManagerService';
import { useAppStore } from '../store/useAppStore';

export function useDownloadStatus() {
  const downloadedIds = useAppStore((state) => state.downloadedIds);
  const setDownloadedIds = useAppStore((state) => state.setDownloadedIds);
  const syncingIds = useAppStore((state) => state.syncingIds);
  const setSyncingIds = useAppStore((state) => state.setSyncingIds);

  const refreshDownloaded = async () => {
    const all = await storage.getAllDownloaded();
    setDownloadedIds(new Set(all.map((e) => e.id)));
  };

  useEffect(() => {
    refreshDownloaded();
    const unsub = downloadManager.subscribe((tasks) => {
      refreshDownloaded();
      const currentSyncing = new Set(
        tasks
          .filter((t) => t.status === 'downloading' || t.status === 'pending')
          .map((t) => t.examId)
      );
      setSyncingIds(currentSyncing);
    });
    return () => {
      unsub();
    };
  }, []);

  const startDownload = (examId: string) => {
    downloadManager.addTask(examId);
  };

  return { downloadedIds, syncingIds, startDownload };
}
