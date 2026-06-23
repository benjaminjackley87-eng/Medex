import React from 'react';
import Tooltip from './Tooltip';

export interface SidebarItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  active: boolean;
  color?: 'blue' | 'indigo' | 'rose' | 'orange' | 'emerald' | 'amber' | 'cyan';
  tooltip: string;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  onClick,
  active,
  color = 'blue',
  tooltip,
  isCollapsed
}) => {
  const colorClasses = {
    blue: active
      ? 'bg-blue-600 text-white shadow-blue-900/40'
      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200',
    indigo: active
      ? 'bg-indigo-600 text-white shadow-indigo-900/40'
      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200',
    rose: active
      ? 'bg-rose-600 text-white shadow-rose-900/40'
      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200',
    orange: active
      ? 'bg-orange-600 text-white shadow-orange-900/40'
      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200',
    emerald: active
      ? 'bg-emerald-600 text-white shadow-emerald-900/40'
      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200',
    amber: active
      ? 'bg-amber-600 text-white shadow-amber-900/40'
      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200',
    cyan: active
      ? 'bg-cyan-600 text-white shadow-cyan-900/40'
      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200'
  };

  const iconColorClasses = {
    blue: active ? 'text-white' : 'text-slate-650 group-hover:text-blue-400',
    indigo: active ? 'text-white' : 'text-slate-650 group-hover:text-indigo-400',
    rose: active ? 'text-white' : 'text-slate-650 group-hover:text-rose-400',
    orange: active ? 'text-white' : 'text-slate-650 group-hover:text-orange-400',
    emerald: active ? 'text-white' : 'text-slate-650 group-hover:text-emerald-400',
    amber: active ? 'text-white' : 'text-slate-650 group-hover:text-amber-400',
    cyan: active ? 'text-white' : 'text-slate-650 group-hover:text-cyan-400'
  };

  return (
    <Tooltip content={tooltip} position="right" className="w-full">
      <button
        onClick={onClick}
        className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 group relative overflow-hidden ${colorClasses[color]}`}
      >
        <div className={`transition-colors duration-300 shrink-0 ${iconColorClasses[color]}`}>
          {icon}
        </div>
        {!isCollapsed && (
          <span className="animate-in fade-in slide-in-from-left-2 duration-500">{label}</span>
        )}
        {active && !isCollapsed && (
          <div
            className={`absolute right-0 top-0 bottom-0 w-1 ${
              color === 'blue'
                ? 'bg-blue-400'
                : color === 'indigo'
                  ? 'bg-indigo-400'
                  : color === 'rose'
                    ? 'bg-rose-400'
                    : color === 'orange'
                      ? 'bg-orange-400'
                      : color === 'emerald'
                        ? 'bg-emerald-400'
                        : color === 'cyan'
                          ? 'bg-cyan-400'
                          : 'bg-amber-400'
            }`}
          />
        )}
      </button>
    </Tooltip>
  );
};

export default SidebarItem;
