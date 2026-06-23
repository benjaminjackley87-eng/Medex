import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import DashboardView from './pages/DashboardView';
import LibraryView from './pages/LibraryView';

import ExamView from './pages/ExamView';
import ClinicalFinder from './pages/ClinicalFinder';
import TutorialView from './pages/TutorialView';
import SettingsView from './pages/SettingsView';
import GlossaryView from './pages/GlossaryView';
import ClinicalCalculatorsView from './pages/ClinicalCalculatorsView';
import ProceduresView from './pages/ProceduresView';
import PharmacologyView from './pages/PharmacologyView';
import GenericPharmacologyView from './pages/GenericPharmacologyView';
import PharmacologyToxView from './pages/PharmacologyToxView';
import ImmunisationView from './pages/ImmunisationView';
import ECGView from './pages/ECGView';
import RadiologyView from './pages/RadiologyView';
import SymptomChecker from './pages/SymptomChecker';
import NeuropraxiaView from './pages/NeuropraxiaView';
import SciencesExplorer from './pages/SciencesExplorer';
import TherapeuticNavigator from './pages/TherapeuticNavigator';
import KnowledgeGraphExplorer from './pages/KnowledgeGraphExplorer';
import AnaestheticsCCView from './pages/AnaestheticsCCView';
import WorkspaceLayout from './features/ClinicalWorkspace/WorkspaceLayout';
import DevAssistant from './pages/DevAssistant';
import DiagnosticReasoningSuite from './features/Suites/DiagnosticReasoningSuite';
import InvestigationsSuite from './features/Suites/InvestigationsSuite';
import TherapeuticsSuite from './features/Suites/TherapeuticsSuite';
import AcuteInterventionsSuite from './features/Suites/AcuteInterventionsSuite';
import FoundationsSuite from './features/Suites/FoundationsSuite';
import StudyHubView from './pages/StudyHubView';
import DownloadManager from './components/common/DownloadManager';

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
        <Outlet />
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
