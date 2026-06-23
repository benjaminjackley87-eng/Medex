import React from 'react';
import { DownloadTask } from '../../types';
import { downloadManager } from '../../services/downloadManagerService';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Pause,
  RefreshCw,
  FileText,
  Brain,
  Image as ImageIcon
} from 'lucide-react';

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

interface DownloadTaskCardProps {
  task: DownloadTask;
  idx: number;
}

const DownloadTaskCard: React.FC<DownloadTaskCardProps> = ({ task, idx }) => {
  const p = task.progress;
  const isFailed = task.status === 'failed';
  const isQueued = task.status === 'pending';

  return (
    <div
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
};

export default DownloadTaskCard;
