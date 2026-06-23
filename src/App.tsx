import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import DashboardView from './pages/DashboardView';
import WorkspaceLayout from './features/ClinicalWorkspace/WorkspaceLayout';
import DownloadManager from './components/common/DownloadManager';

const LibraryView = React.lazy(() => import('./pages/LibraryView'));
const ExamView = React.lazy(() => import('./pages/ExamView'));
const ClinicalFinder = React.lazy(() => import('./pages/ClinicalFinder'));
const TutorialView = React.lazy(() => import('./pages/TutorialView'));
const SettingsView = React.lazy(() => import('./pages/SettingsView'));
const GlossaryView = React.lazy(() => import('./pages/GlossaryView'));
const ClinicalCalculatorsView = React.lazy(() => import('./pages/ClinicalCalculatorsView'));
const ProceduresView = React.lazy(() => import('./pages/ProceduresView'));
const PharmacologyView = React.lazy(() => import('./pages/PharmacologyView'));
const GenericPharmacologyView = React.lazy(() => import('./pages/GenericPharmacologyView'));
const PharmacologyToxView = React.lazy(() => import('./pages/PharmacologyToxView'));
const ImmunisationView = React.lazy(() => import('./pages/ImmunisationView'));
const ECGView = React.lazy(() => import('./pages/ECGView'));
const RadiologyView = React.lazy(() => import('./pages/RadiologyView'));
const SymptomChecker = React.lazy(() => import('./pages/SymptomChecker'));
const NeuropraxiaView = React.lazy(() => import('./pages/NeuropraxiaView'));
const SciencesExplorer = React.lazy(() => import('./pages/SciencesExplorer'));
const TherapeuticNavigator = React.lazy(() => import('./pages/TherapeuticNavigator'));
const KnowledgeGraphExplorer = React.lazy(() => import('./pages/KnowledgeGraphExplorer'));
const AnaestheticsCCView = React.lazy(() => import('./pages/AnaestheticsCCView'));
const DevAssistant = React.lazy(() => import('./pages/DevAssistant'));
const DiagnosticReasoningSuite = React.lazy(
  () => import('./features/Suites/DiagnosticReasoningSuite')
);
const InvestigationsSuite = React.lazy(() => import('./features/Suites/InvestigationsSuite'));
const TherapeuticsSuite = React.lazy(() => import('./features/Suites/TherapeuticsSuite'));
const AcuteInterventionsSuite = React.lazy(
  () => import('./features/Suites/AcuteInterventionsSuite')
);
const FoundationsSuite = React.lazy(() => import('./features/Suites/FoundationsSuite'));
const StudyHubView = React.lazy(() => import('./pages/StudyHubView'));

function AppLayout() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#0A0C10] text-slate-200 overflow-hidden font-sans">
      <Sidebar isOnline={isOnline} />
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        <React.Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-slate-400 py-24 flex-col gap-3">
              <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Loading Module...
              </span>
            </div>
          }
        >
          <Outlet />
        </React.Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Core views */}
          <Route path="/" element={<DashboardView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/library" element={<LibraryView />} />
          <Route path="/exam/:id" element={<ExamView />} />

          {/* Sidebar: Diagnostic Reasoning suite */}
          <Route path="/diagnostic-reasoning" element={<DiagnosticReasoningSuite />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/finder" element={<ClinicalFinder />} />
          <Route path="/search" element={<ClinicalFinder />} />

          {/* Sidebar: Investigations Hub suite */}
          <Route path="/investigations-hub" element={<InvestigationsSuite />} />
          <Route path="/investigations" element={<InvestigationsSuite />} />
          <Route path="/ecg" element={<ECGView />} />
          <Route path="/radiology" element={<RadiologyView />} />
          <Route path="/clinical-calculators" element={<ClinicalCalculatorsView />} />
          <Route path="/calculators" element={<ClinicalCalculatorsView />} />

          {/* Sidebar: Therapeutics & Tox suite */}
          <Route path="/therapeutics-tox" element={<TherapeuticsSuite />} />
          <Route path="/therapeutic-navigator" element={<TherapeuticNavigator />} />
          <Route path="/therapeutics" element={<TherapeuticsSuite />} />
          <Route path="/pharmacology" element={<PharmacologyView />} />
          <Route path="/generic-pharmacology" element={<GenericPharmacologyView />} />
          <Route path="/pharmacology-tox" element={<PharmacologyToxView />} />
          <Route path="/immunisation" element={<ImmunisationView />} />

          {/* Sidebar: Acute Interventions suite */}
          <Route path="/acute-interventions" element={<AcuteInterventionsSuite />} />
          <Route path="/acute" element={<AcuteInterventionsSuite />} />
          <Route path="/procedures" element={<ProceduresView />} />
          <Route path="/anaesthetics-cc" element={<AnaestheticsCCView />} />
          <Route path="/anaesthetics" element={<AnaestheticsCCView />} />
          <Route path="/neuropraxia" element={<NeuropraxiaView />} />

          {/* Sidebar: Foundations suite */}
          <Route path="/foundations" element={<FoundationsSuite />} />
          <Route path="/sciences-explorer" element={<SciencesExplorer />} />
          <Route path="/sciences" element={<FoundationsSuite />} />
          <Route path="/glossary" element={<GlossaryView />} />

          {/* Resources & System */}
          <Route path="/study-hub" element={<StudyHubView />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraphExplorer />} />
          <Route path="/downloads" element={<DownloadManager />} />
          <Route path="/tutorial" element={<TutorialView />} />
          <Route path="/settings" element={<SettingsView />} />

          {/* Dev tools */}
          <Route path="/workspace" element={<WorkspaceLayout />} />
          <Route path="/dev" element={<DevAssistant />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
