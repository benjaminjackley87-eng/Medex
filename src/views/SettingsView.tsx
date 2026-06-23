import React from 'react';
import { Settings } from 'lucide-react';

interface SettingsViewProps {
  isDevMode: boolean;
  onToggleDevMode: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({
  isDevMode,
  onToggleDevMode,
  isEditMode,
  onToggleEditMode
}) => {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center">
          <Settings className="w-6 h-6 text-slate-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            System Preferences
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
            Configure MedEx Nexus
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bento-card p-8">
          <h2 className="text-xl font-black text-slate-300 mb-4">General Settings</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Preferences and configuration options for your medical workstation.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5">
              <div>
                <h3 className="font-bold text-slate-300">Dark Mode</h3>
                <p className="text-xs text-slate-400">Toggle dark mode appearance</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-not-allowed opacity-50">
                <div className="absolute left-1 top-1 w-4 h-4 bg-slate-950/40 rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5">
              <div>
                <h3 className="font-bold text-slate-300">Offline Mode</h3>
                <p className="text-xs text-slate-400">Enable automatic background syncing</p>
              </div>
              <div className="w-12 h-6 bg-blue-950/200 rounded-full relative cursor-not-allowed opacity-50">
                <div className="absolute right-1 top-1 w-4 h-4 bg-slate-950/40 rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5">
              <div>
                <h3 className="font-bold text-slate-300">Edit Mode</h3>
                <p className="text-xs text-slate-400">
                  Enable manual content editing across all modules
                </p>
              </div>
              <button
                onClick={onToggleEditMode}
                className={`w-12 h-6 rounded-full relative transition-colors ${isEditMode ? 'bg-emerald-600' : 'bg-slate-200'}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-slate-950/40 rounded-full shadow-sm transition-all ${isEditMode ? 'right-1' : 'left-1'}`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/20 rounded-xl border border-white/5">
              <div>
                <h3 className="font-bold text-slate-300">Development Mode</h3>
                <p className="text-xs text-slate-400">
                  Enable AI-powered content generation assistant
                </p>
              </div>
              <button
                onClick={onToggleDevMode}
                className={`w-12 h-6 rounded-full relative transition-colors ${isDevMode ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-slate-950/40 rounded-full shadow-sm transition-all ${isDevMode ? 'right-1' : 'left-1'}`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
