import React, { useState, useEffect, useMemo } from 'react';
import { downloadManager } from '../../services/downloadManagerService';
import { DownloadTask } from '../../types';
import Tooltip from './Tooltip';
import {
  CloudDownload,
  Trash2,
  Pause,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowDownToLine,
  RefreshCw,
  FileText,
  Brain,
  Image as ImageIcon,
  Sparkles,
  Library
} from 'lucide-react';

const DownloadManager: React.FC = () => {
  const [tasks, setTasks] = useState<DownloadTask[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);

  useEffect(() => {
    const unsub = downloadManager.subscribe((newTasks) => {
      setTasks(newTasks);
      setIsPaused(downloadManager.getPauseState());
    });
    return () => {
      unsub();
    };
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const active = tasks.filter((t) => t.status === 'downloading').length;
    const queued = tasks.filter((t) => t.status === 'pending').length;
    const failed = tasks.filter((t) => t.status === 'failed').length;
    return { completed, active, queued, failed, total: tasks.length };
  }, [tasks]);

  const getStatusIcon = (status: DownloadTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'downloading':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-slate-400" />;
      default:
        return <RefreshCw className="w-4 h-4 text-slate-300" />;
    }
  };

  const getSubTaskStatus = (progress: number, start: number, end: number) => {
    if (progress >= end) return 'completed';
    if (progress >= start) return 'active';
    return 'pending';
  };

  const SubTaskPip: React.FC<{
    label: string;
    icon: React.ReactNode;
    status: 'completed' | 'active' | 'pending';
    error?: boolean;
  }> = ({ label, icon, status, error }) => {
    const colors = {
      completed: 'text-emerald-500 border-emerald-950/30 bg-emerald-950/20',
      active: 'text-blue-600 border-blue-200 bg-blue-950/20 animate-pulse',
      pending: 'text-slate-300 border-slate-50 bg-slate-950/20'
    };

    return (
      <div
        className={`flex flex-col items-center gap-1.5 flex-1 p-2 rounded-xl border transition-all duration-500 ${colors[status]} ${error && status === 'active' ? 'text-red-500 border-red-100 bg-red-50' : ''}`}
      >
        <div className="shrink-0">
          {status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : icon}
        </div>
        <span className="text-[7px] font-black uppercase tracking-tighter text-center">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 animate-in fade-in duration-700 flex flex-col h-full overflow-hidden">
      <header className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-950/20 rounded-2xl border border-blue-950/30 text-blue-600 shadow-sm">
            <CloudDownload className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              Data Pipeline
            </h1>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Resilient Library Sync
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip content="Purge all downloaded data">
            <button
              onClick={() => downloadManager.clearArchive()}
              className="p-3 bg-slate-950/40 border border-white/5 text-slate-400 hover:text-red-500 hover:border-red-200 rounded-xl transition-all shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </Tooltip>

          <button
            onClick={() => downloadManager.downloadAll()}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-slate-800 shadow-xl flex items-center gap-2"
          >
            <Library className="w-4 h-4" /> Sync Entire Library
          </button>

          <Tooltip content={isPaused ? 'Resume Pipeline' : 'Pause Queue'}>
            <button
              onClick={() => downloadManager.togglePause()}
              className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl ${isPaused ? 'bg-emerald-600 text-white' : 'bg-slate-950/40 border border-white/5 text-slate-400'}`}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </Tooltip>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <div className="flex-1 bg-slate-950/20 rounded-[40px] border border-white/5 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {tasks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 animate-in fade-in duration-1000">
                <div className="p-6 bg-slate-950/40 rounded-full shadow-inner border border-slate-50 mb-4">
                  <ArrowDownToLine className="w-10 h-10 opacity-20" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em]">
                  No Active Transfers
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">
                  Add protocols or use 'Sync All' to begin
                </p>
              </div>
            ) : (
              tasks.map((task, idx) => {
                const p = task.progress;
                const isFailed = task.status === 'failed';
                const isQueued = task.status === 'pending';

                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
                    className={`p-6 bg-slate-950/40 rounded-[32px] border transition-all duration-500 animate-in slide-in-from-right-4 group/task ${
                      isQueued
                        ? 'opacity-60 grayscale-[0.5] border-slate-50'
                        : 'border-white/5 shadow-sm hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-2xl transition-all duration-500 ${isFailed ? 'bg-red-50' : 'bg-slate-950/20'}`}
                        >
                          {getStatusIcon(task.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-white leading-none">
                              {task.examName}
                            </h4>
                            {isFailed && (
                              <button
                                onClick={() => downloadManager.retryTask(task.id)}
                                className="flex items-center gap-1.5 px-2 py-0.5 bg-red-100 text-red-600 rounded-md text-[8px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
                              >
                                <RefreshCw className="w-2.5 h-2.5" /> Retry
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              {task.type}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            <span
                              className={`text-[9px] font-bold italic ${isFailed ? 'text-red-500' : isQueued ? 'text-slate-400' : 'text-blue-500'}`}
                            >
                              {task.error ||
                                (task.status === 'completed'
                                  ? 'Stored'
                                  : isQueued
                                    ? 'Waiting in Queue...'
                                    : 'Syncing Assets...')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-black tabular-nums tracking-tighter ${isQueued ? 'text-slate-300' : 'text-white'}`}
                        >
                          {p}%
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 items-stretch">
                      <SubTaskPip
                        label="Protocol"
                        icon={<FileText className="w-3.5 h-3.5" />}
                        status={getSubTaskStatus(p, 0, 15)}
                        error={isFailed}
                      />
                      <SubTaskPip
                        label="Reasoning"
                        icon={<Brain className="w-3.5 h-3.5" />}
                        status={getSubTaskStatus(p, 16, 40)}
                        error={isFailed}
                      />
                      <SubTaskPip
                        label="Stigmata"
                        icon={<ImageIcon className="w-3.5 h-3.5" />}
                        status={getSubTaskStatus(p, 41, 75)}
                        error={isFailed}
                      />
                      <SubTaskPip
                        label="Verify"
                        icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        status={getSubTaskStatus(p, 96, 100)}
                        error={isFailed}
                      />
                    </div>

                    <div className="mt-4 w-full h-1 bg-slate-950/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${isFailed ? 'bg-red-500' : 'bg-blue-600'}`}
                        style={{ width: `${p}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('taskId');
              if (id) downloadManager.cancelTask(id);
              setIsDraggingOverTrash(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOverTrash(true);
            }}
            onDragLeave={() => setIsDraggingOverTrash(false)}
            className={`flex-1 min-h-[150px] rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden group/trash ${isDraggingOverTrash ? 'border-red-500 bg-red-50 text-red-500 scale-105 rotate-2' : 'border-white/5 bg-slate-950/40 text-slate-400 hover:border-slate-300'}`}
          >
            <Trash2
              className={`w-8 h-8 mb-3 transition-transform ${isDraggingOverTrash ? 'animate-bounce scale-125' : 'group-hover/trash:rotate-12'}`}
            />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center px-4">
              Cancel Download
            </p>
          </div>

          <div className="p-8 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-blue-400 mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  Library Pulse
                </span>
              </div>
              <div className="space-y-1 mb-6">
                <p className="text-3xl font-black tracking-tighter tabular-nums">
                  {stats.completed}
                  <span className="text-slate-400 mx-1">/</span>
                  {stats.total || '0'}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Active Batch Status
                </p>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-950/200 transition-all duration-1000"
                    style={{
                      width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>
              {stats.failed > 0 && (
                <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" /> {stats.failed} Pipeline Disruptions
                </p>
              )}
              {stats.queued > 0 && (
                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mt-1">
                  {stats.queued} Sequential Tasks Pending
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadManager;
