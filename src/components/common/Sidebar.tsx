import React, { useState, useEffect } from 'react';
import SidebarItem from "./SidebarItem";
import { useNavigate, useLocation } from 'react-router-dom';
import { ExamSystem } from '../../types';
import { downloadManager } from '../../services/downloadManagerService';
import Tooltip from './Tooltip';
import { SYSTEM_THEMES } from '../../theme';
import { useAppStore } from '../../store/useAppStore';
import {
  Search,
  BookOpen,
  CloudDownload,
  Microscope,
  Zap,
  HardDrive,
  ToggleLeft,
  ToggleRight,
  Code2,
  GraduationCap,
  Layers,
  Pill,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  Wifi,
  WifiOff,
  GitBranch,
  Network
} from 'lucide-react';

const Sidebar: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = location.pathname.split('/')[1] || 'dashboard';

  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const setIsCollapsed = useAppStore((state) => state.setIsSidebarCollapsed);
  const isEditMode = useAppStore((state) => state.isEditMode);
  const setIsEditMode = useAppStore((state) => state.setIsEditMode);

  const selectedSystem = useAppStore((state) => state.selectedSystem);
  const setSelectedSystem = useAppStore((state) => state.setSelectedSystem);

  const [activeDownloads, setActiveDownloads] = useState(0);
  const [sectionsOpen, setSectionsOpen] = useState({
    suites: true,
    examinations: false,
    resources: false
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    if (isCollapsed) return;
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const unsub = downloadManager.subscribe((tasks) => {
      setActiveDownloads(tasks.filter((t) => t.status !== 'completed').length);
    });
    return () => {
      unsub();
    };
  }, []);

  const navTo = (path: string) => {
    navigate(path);
  };

  return (
    <aside
      className={`${isCollapsed ? 'w-20' : 'w-72'} bg-[#0F1115] border-r border-white/5 h-screen flex flex-col shrink-0 transition-all duration-500 ease-in-out overflow-hidden select-none relative font-sans`}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[100px] rounded-full -mr-24 -mt-24 pointer-events-none" />

      <div
        className={`p-6 border-b border-white/5 shrink-0 bg-[#0F1115]/80 backdrop-blur-xl z-10 flex flex-col items-center ${isCollapsed ? 'gap-6' : 'gap-8'}`}
      >
        <div
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} w-full`}
        >
          <div className="flex items-center gap-4 text-blue-500">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-900/40 border border-blue-400/20 shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-500">
                <h1 className="text-xl font-black tracking-tighter text-white uppercase leading-none">
                  MedEx
                </h1>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1 opacity-60">
                  Nexus v4.0.2
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-950/40/5 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {!isCollapsed && (
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 'k' }));
            }}
            className="relative group/search w-full animate-in fade-in zoom-in-95 duration-500 text-left"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-650 group-hover/search:text-blue-400 transition-colors pointer-events-none" />
            <div className="w-full pl-11 pr-4 py-3 bg-slate-950/40/[0.03] border border-white/5 rounded-xl text-[10px] font-black tracking-widest text-slate-400 group-hover/search:bg-slate-950/40/[0.05] transition-all uppercase flex items-center justify-between">
              <span>SEARCH...</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-950/40/5 rounded border border-white/10 shadow-sm opacity-40 group-hover/search:opacity-100 transition-opacity">
                <span className="text-[8px] font-black text-slate-400 uppercase">⌘K</span>
              </div>
            </div>
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar overscroll-contain">
        <div className="space-y-2">
          {!isCollapsed && (
            <button
              onClick={() => toggleSection('suites')}
              className="w-full flex items-center justify-between px-3 mb-2 hover:bg-slate-950/40/5 py-1.5 rounded-lg transition-colors group"
            >
              <p className="text-[9px] font-black text-slate-400 group-hover:text-slate-400 uppercase tracking-[0.3em] transition-colors">
                Clinical Suites
              </p>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${sectionsOpen.suites ? '' : '-rotate-90'}`}
              />
            </button>
          )}

          {(sectionsOpen.suites || isCollapsed) && (
            <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
              <SidebarItem
                id="dashboard"
                label="Dashboard"
                icon={<GraduationCap className="w-4 h-4" />}
                onClick={() => navTo('/dashboard')}
                active={currentView === 'dashboard'}
                color="blue"
                tooltip="Home Overview"
                isCollapsed={isCollapsed}
              />

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedSystem(null);
                    toggleSection('examinations');
                    navTo('/library');
                  }}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 group relative overflow-hidden ${
                    currentView === 'library'
                      ? 'bg-blue-600 text-white shadow-blue-900/40'
                      : 'text-slate-400 hover:bg-slate-950/40/[0.03] hover:text-slate-200'
                  }`}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
                    <div
                      className={`transition-colors duration-300 shrink-0 ${currentView === 'library' ? 'text-white' : 'text-slate-650 group-hover:text-blue-400'}`}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    {!isCollapsed && (
                      <span className="animate-in fade-in slide-in-from-left-2 duration-500">
                        Exams & OSCEs
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${sectionsOpen.examinations ? '' : '-rotate-90'}`}
                    />
                  )}
                </button>

                {sectionsOpen.examinations && !isCollapsed && (
                  <div className="ml-4 pl-4 border-l border-white/5 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-300">
                    <button
                      onClick={() => {
                        setSelectedSystem(null);
                        navTo('/library');
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        currentView === 'library' && selectedSystem === null
                          ? 'text-blue-400 bg-blue-400/10'
                          : 'text-slate-400 hover:text-slate-300 hover:bg-slate-950/40/5'
                      }`}
                    >
                      All Systems
                    </button>
                    {Object.values(ExamSystem).map((system) => (
                      <button
                        key={system}
                        onClick={() => {
                          setSelectedSystem(system);
                          navTo('/library');
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                          currentView === 'library' && selectedSystem === system
                            ? 'text-blue-400 bg-blue-400/10'
                            : 'text-slate-400 hover:text-slate-300 hover:bg-slate-950/40/5'
                        }`}
                      >
                        <div className="shrink-0 opacity-50">
                          {SYSTEM_THEMES[system]?.iconRaw &&
                            React.createElement(SYSTEM_THEMES[system].iconRaw, {
                              className: 'w-3 h-3'
                            })}
                        </div>
                        <span className="truncate">{system}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <SidebarItem
                id="diagnosticReasoning"
                label="Diagnostic Reasoning"
                icon={<GitBranch className="w-4 h-4" />}
                onClick={() => navTo('/diagnostic-reasoning')}
                active={[
                  'diagnostic-reasoning',
                  'symptom-checker',
                  'finder',
                  'correlation',
                  'derm-revisor'
                ].includes(currentView)}
                color="indigo"
                tooltip="Symptom Mapping & Differentials"
                isCollapsed={isCollapsed}
              />

              <SidebarItem
                id="investigationsHub"
                label="Investigations Hub"
                icon={<Microscope className="w-4 h-4" />}
                onClick={() => navTo('/investigations-hub')}
                active={[
                  'investigations-hub',
                  'investigations',
                  'ecg',
                  'radiology',
                  'clinical-calculators'
                ].includes(currentView)}
                color="emerald"
                tooltip="Labs, ECGs, Radiology & Scores"
                isCollapsed={isCollapsed}
              />

              <SidebarItem
                id="therapeuticsTox"
                label="Therapeutics & Tox"
                icon={<Pill className="w-4 h-4" />}
                onClick={() => navTo('/therapeutics-tox')}
                active={[
                  'therapeutics-tox',
                  'generic-pharmacology',
                  'pharmacology',
                  'pharmacology-tox',
                  'immunisation',
                  'therapeutic-navigator'
                ].includes(currentView)}
                color="amber"
                tooltip="Monographs & Toxicology Guidelines"
                isCollapsed={isCollapsed}
              />

              <SidebarItem
                id="acuteInterventions"
                label="Acute Interventions"
                icon={<Zap className="w-4 h-4" />}
                onClick={() => navTo('/acute-interventions')}
                active={[
                  'acute-interventions',
                  'acute-care',
                  'procedures',
                  'anaesthetics-cc',
                  'neuropraxia'
                ].includes(currentView)}
                color="rose"
                tooltip="Emergency Protocols & Bedside Skills"
                isCollapsed={isCollapsed}
              />

              <SidebarItem
                id="foundations"
                label="Foundations"
                icon={<Layers className="w-4 h-4" />}
                onClick={() => navTo('/foundations')}
                active={['foundations', 'sciences-explorer', 'glossary'].includes(currentView)}
                color="cyan"
                tooltip="Sciences, Pharmacology & Glossary"
                isCollapsed={isCollapsed}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          {!isCollapsed && (
            <button
              onClick={() => toggleSection('resources')}
              className="w-full flex items-center justify-between px-3 mb-2 hover:bg-slate-950/40/5 py-1.5 rounded-lg transition-colors group"
            >
              <p className="text-[9px] font-black text-slate-400 group-hover:text-slate-400 uppercase tracking-[0.3em] transition-colors">
                Resources & System
              </p>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${sectionsOpen.resources ? '' : '-rotate-90'}`}
              />
            </button>
          )}

          {(sectionsOpen.resources || isCollapsed) && (
            <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
              <SidebarItem
                id="studyHub"
                label="Study Hub"
                icon={<GraduationCap className="w-4 h-4" />}
                onClick={() => navTo('/study-hub')}
                active={currentView === 'study-hub'}
                color="indigo"
                tooltip="RGA MCQ Prep"
                isCollapsed={isCollapsed}
              />

              <SidebarItem
                id="knowledgeGraph"
                label="Knowledge Graph"
                icon={<Network className="w-4 h-4" />}
                onClick={() => navTo('/knowledge-graph')}
                active={currentView === 'knowledge-graph'}
                color="rose"
                tooltip="LOD Architecture Explorer"
                isCollapsed={isCollapsed}
              />

              <div className="w-full h-px bg-slate-950/40/5 my-2" />

              <SidebarItem
                id="downloads"
                label="Download Manager"
                icon={<CloudDownload className="w-4 h-4" />}
                onClick={() => navTo('/downloads')}
                active={currentView === 'downloads'}
                tooltip="Data Pipeline"
                isCollapsed={isCollapsed}
              />
              {[
                {
                  id: 'tutorial',
                  label: 'Tutorial Info',
                  icon: <BookOpen className="w-4 h-4" />,
                  onClick: () => navTo('/tutorial'),
                  active: currentView === 'tutorial',
                  tooltip: 'How to use MedEx'
                },
                {
                  id: 'settings',
                  label: 'Settings',
                  icon: <Settings className="w-4 h-4" />,
                  onClick: () => navTo('/settings'),
                  active: currentView === 'settings',
                  tooltip: 'System Preferences'
                }
              ].map((item) => (
                <SidebarItem key={item.id} {...item} isCollapsed={isCollapsed} />
              ))}
            </div>
          )}
        </div>
      </nav>

      <div
        className={`p-6 border-t border-white/5 bg-[#0F1115]/80 backdrop-blur-xl shrink-0 space-y-4 ${isCollapsed ? 'items-center' : ''}`}
      >
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-xl cursor-pointer transition-all border ${isEditMode ? 'bg-amber-600 text-white border-amber-500 shadow-2xl shadow-amber-900/40' : 'bg-slate-950/40/[0.03] text-slate-400 border-white/5 hover:border-white/10'}`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
            <Code2 className="w-4 h-4 shrink-0" />
            {!isCollapsed && (
              <span className="text-[9px] font-black uppercase tracking-widest truncate animate-in fade-in slide-in-from-left-2 duration-500">
                Edit Mode
              </span>
            )}
          </div>
          {!isCollapsed &&
            (isEditMode ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />)}
        </button>

        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-1`}>
          <div className="w-10 h-10 rounded-xl bg-slate-950/40/[0.03] border border-white/5 flex items-center justify-center text-blue-400 shadow-inner shrink-0">
            <HardDrive className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-500">
              <p className="text-[10px] font-black text-white uppercase truncate tracking-widest">
                Secure Disk
              </p>
              <p className="text-[8px] font-black text-slate-400 tracking-[0.3em] truncate uppercase">
                Vault Linked
              </p>
            </div>
          )}
        </div>

        <div
          className={`px-1 flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} animate-in fade-in slide-in-from-bottom-2 duration-700`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-505 ${
              isOnline
                ? 'bg-emerald-950/200/10 border-emerald-500/20 text-emerald-500'
                : 'bg-rose-950/200/10 border-rose-500/20 text-rose-500'
            }`}
          >
            {isOnline ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4 animate-pulse" />
            )}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-500">
              <p className="text-[10px] font-black uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-rose-500'}">
                {isOnline ? 'Nexus Linked' : 'Offline Mode'}
              </p>
              <p className="text-[8px] font-black text-slate-400 tracking-[0.3em] uppercase">
                {isOnline ? 'Cloud Sync Active' : 'Local Cache Only'}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
