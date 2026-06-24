import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock all page components to avoid complex setups
vi.mock('./components/common/Sidebar', () => ({ default: () => <nav data-testid="sidebar" /> }));
vi.mock('./pages/DashboardView', () => ({ default: () => <div data-testid="dashboard-view" /> }));
vi.mock('./pages/LibraryView', () => ({ default: () => <div data-testid="library-view" /> }));
vi.mock('./pages/ExamView', () => ({ default: () => <div data-testid="exam-view" /> }));
vi.mock('./pages/ClinicalFinder', () => ({ default: () => <div data-testid="clinical-finder" /> }));
vi.mock('./pages/TutorialView', () => ({ default: () => <div data-testid="tutorial-view" /> }));
vi.mock('./pages/SettingsView', () => ({ default: () => <div data-testid="settings-view" /> }));
vi.mock('./pages/GlossaryView', () => ({ default: () => <div data-testid="glossary-view" /> }));
vi.mock('./pages/ClinicalCalculatorsView', () => ({
  default: () => <div data-testid="clinical-calculators-view" />
}));
vi.mock('./pages/ProceduresView', () => ({ default: () => <div data-testid="procedures-view" /> }));
vi.mock('./pages/PharmacologyView', () => ({
  default: () => <div data-testid="pharmacology-view" />
}));
vi.mock('./pages/GenericPharmacologyView', () => ({
  default: () => <div data-testid="generic-pharmacology-view" />
}));
vi.mock('./pages/PharmacologyToxView', () => ({
  default: () => <div data-testid="pharmacology-tox-view" />
}));
vi.mock('./pages/ImmunisationView', () => ({
  default: () => <div data-testid="immunisation-view" />
}));
vi.mock('./pages/ECGView', () => ({ default: () => <div data-testid="ecg-view" /> }));
vi.mock('./pages/RadiologyView', () => ({ default: () => <div data-testid="radiology-view" /> }));
vi.mock('./pages/SymptomChecker', () => ({ default: () => <div data-testid="symptom-checker" /> }));
vi.mock('./pages/NeuropraxiaView', () => ({
  default: () => <div data-testid="neuropraxia-view" />
}));
vi.mock('./pages/SciencesExplorer', () => ({
  default: () => <div data-testid="sciences-explorer" />
}));
vi.mock('./pages/TherapeuticNavigator', () => ({
  default: () => <div data-testid="therapeutic-navigator" />
}));
vi.mock('./pages/KnowledgeGraphExplorer', () => ({
  default: () => <div data-testid="knowledge-graph-explorer" />
}));
vi.mock('./pages/AnaestheticsCCView', () => ({
  default: () => <div data-testid="anaesthetics-cc-view" />
}));
vi.mock('./features/ClinicalWorkspace/WorkspaceLayout', () => ({
  default: () => <div data-testid="workspace-layout" />
}));
vi.mock('./pages/DevAssistant', () => ({ default: () => <div data-testid="dev-assistant" /> }));
vi.mock('./features/Suites/DiagnosticReasoningSuite', () => ({
  default: () => <div data-testid="diagnostic-reasoning-suite" />
}));
vi.mock('./features/Suites/InvestigationsSuite', () => ({
  default: () => <div data-testid="investigations-suite" />
}));
vi.mock('./features/Suites/TherapeuticsSuite', () => ({
  default: () => <div data-testid="therapeutics-suite" />
}));
vi.mock('./features/Suites/AcuteInterventionsSuite', () => ({
  default: () => <div data-testid="acute-interventions-suite" />
}));
vi.mock('./features/Suites/FoundationsSuite', () => ({
  default: () => <div data-testid="foundations-suite" />
}));
vi.mock('./pages/StudyHubView', () => ({ default: () => <div data-testid="study-hub-view" /> }));
vi.mock('./components/common/DownloadManager', () => ({
  default: () => <div data-testid="download-manager" />
}));

describe('App Routing', () => {
  beforeEach(() => {
    // Reset the history state before each test
    window.history.pushState({}, '', '/');
  });

  it('renders DashboardView on the root path "/"', async () => {
    render(<App />);
    await screen.findByTestId('sidebar');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(await screen.findByTestId('dashboard-view')).toBeInTheDocument();
  });

  it('renders LibraryView on "/library"', async () => {
    window.history.pushState({}, '', '/library');
    render(<App />);
    await screen.findByTestId('sidebar');
    expect(await screen.findByTestId('library-view')).toBeInTheDocument();
  });

  it('renders ExamView on "/exam/:id"', async () => {
    window.history.pushState({}, '', '/exam/123');
    render(<App />);
    await screen.findByTestId('sidebar');
    expect(await screen.findByTestId('exam-view')).toBeInTheDocument();
  });

  it('renders SymptomChecker on "/symptom-checker"', async () => {
    window.history.pushState({}, '', '/symptom-checker');
    render(<App />);
    await screen.findByTestId('sidebar');
    expect(await screen.findByTestId('symptom-checker')).toBeInTheDocument();
  });

  it('renders SettingsView on "/settings"', async () => {
    window.history.pushState({}, '', '/settings');
    render(<App />);
    await screen.findByTestId('sidebar');
    expect(await screen.findByTestId('settings-view')).toBeInTheDocument();
  });

  it('renders DiagnosticReasoningSuite on "/diagnostic-reasoning"', async () => {
    window.history.pushState({}, '', '/diagnostic-reasoning');
    render(<App />);
    await screen.findByTestId('sidebar');
    expect(await screen.findByTestId('diagnostic-reasoning-suite')).toBeInTheDocument();
  });

  it('redirects unknown routes to "/" (DashboardView)', async () => {
    window.history.pushState({}, '', '/some-random-unknown-route');
    render(<App />);
    await screen.findByTestId('sidebar');
    expect(await screen.findByTestId('dashboard-view')).toBeInTheDocument();
  });

  it('handles online/offline status correctly in AppLayout', async () => {
    render(<App />);
    await screen.findByTestId('sidebar');

    // Default should be what navigator.onLine is (true in jsdom)
    // Dispatch offline event
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    // Dispatch online event
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    // Check if sidebar still exists without throwing error
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
});
