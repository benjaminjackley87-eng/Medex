import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Search, GitBranch, Sparkles, AlertCircle } from 'lucide-react';
import SuiteLayout, { SuiteTab } from '../../components/ui/SuiteLayout';
import SymptomChecker from '../../pages/SymptomChecker';
import ClinicalFinder from '../../pages/ClinicalFinder';
import ClinicalCorrelationView from '../../pages/ClinicalCorrelationView';
import DermatologyRevisor from '../../components/common/DermatologyRevisor';
import GlowContainer from '../../components/ui/GlowContainer';
import { Examination } from '../../types';

interface DiagnosticReasoningSuiteProps {
  onSelectExam?: (exam: Examination) => void;
  onNavigateToInvestigations?: (query: string) => void;
  onNavigateToGlossary?: (term: string | undefined) => void;
  onBack?: () => void;
}

/**
 * DiagnosticReasoningSuite Component
 * Unifies Symptom Checker, Clinical Finder, Correlation, and Dermatology Revisor
 * under a purple-themed three-column layout.
 */
export const DiagnosticReasoningSuite: React.FC<DiagnosticReasoningSuiteProps> = ({
  onSelectExam,
  onNavigateToInvestigations,
  onNavigateToGlossary,
  onBack
}) => {
  const navigate = useNavigate();
  const handleSelectExam = onSelectExam || ((exam: Examination) => navigate(`/exam/${exam.id}`));
  const handleNavigateToInvestigations = onNavigateToInvestigations || (() => navigate('/investigations-hub'));
  const handleNavigateToGlossary = onNavigateToGlossary || (() => navigate('/foundations'));
  const handleBack = onBack || (() => navigate('/'));
  const [activeTab, setActiveTab] = useState<string>('symptomChecker');
  const [activeDetail, setActiveDetail] = useState<React.ReactNode | null>(null);

  // Tab definitions conforming to the SuiteTab interface
  const tabs: SuiteTab[] = [
    { id: 'symptomChecker', label: 'Symptom Mapper', icon: Activity },
    { id: 'finder', label: 'Finder Directory', icon: Search },
    { id: 'correlation', label: 'Pathophysiology Correlation', icon: GitBranch },
    { id: 'dermRevisor', label: 'Dermatology Revisor', icon: Sparkles }
  ];

  // Sidebar content (Column 1) based on active tab
  const renderSidebar = () => {
    switch (activeTab) {
      case 'symptomChecker':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Triage Assistance
            </h3>
            <p>Input patient presentation symptoms to map them to appropriate physical exams.</p>
            <div className="p-3 bg-slate-900/60 border border-indigo-500/10 rounded-xl space-y-1">
              <span className="font-bold text-[9px] uppercase tracking-wider text-indigo-400 block">
                Pro Tip
              </span>
              <p className="text-[10px]">
                Be specific about symptom duration, severity, and patient age.
              </p>
            </div>
          </div>
        );
      case 'finder':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Search Index
            </h3>
            <p>
              Drill down into specific physical signs and learn their underlying clinical
              significance.
            </p>
          </div>
        );
      case 'correlation':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Pathophysiology
            </h3>
            <p>
              Visualize structural connections between organ system exams, physiological loops, and
              key findings.
            </p>
          </div>
        );
      case 'dermRevisor':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Visual Reference
            </h3>
            <p>
              Browse high-fidelity dermatological clinical reference images and diagnostic
              indicators.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Main content selector (Column 2)
  const renderContent = () => {
    switch (activeTab) {
      case 'symptomChecker':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <SymptomChecker onSelectExam={handleSelectExam} />
          </div>
        );
      case 'finder':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <ClinicalFinder onNavigateToGlossary={handleNavigateToGlossary} />
          </div>
        );
      case 'correlation':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <ClinicalCorrelationView
              onNavigateToInvestigations={handleNavigateToInvestigations}
              onNavigateToGlossary={handleNavigateToGlossary}
            />
          </div>
        );
      case 'dermRevisor':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <DermatologyRevisor onBack={handleBack} />
          </div>
        );
      default:
        return (
          <div className="p-8 text-center text-slate-400">
            Select a module tab from the top navigation bar.
          </div>
        );
    }
  };

  // Detail panel assistant (Column 3)
  const renderDetail = () => {
    if (activeDetail) return activeDetail;

    return (
      <div className="space-y-4 text-slate-400 text-xs font-medium leading-relaxed">
        <div className="p-4 bg-indigo-950/20 border border-indigo-500/10 rounded-2xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-slate-200 uppercase tracking-widest text-[9px] mb-1">
              Diagnostic Nexus
            </h4>
            <p className="text-[11px]">
              Selecting interactive signs, diagrams, or generating symptoms will populate high-yield
              pathophysiology analysis and differentials here.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <GlowContainer theme="indigo" containerClass="w-full h-full max-w-none p-0">
      <SuiteLayout
        title="Diagnostic Reasoning Suite"
        category="Clinical Logic"
        activeTab={activeTab}
        tabs={tabs}
        onSelectTab={setActiveTab}
        onBack={handleBack}
        themeClass="from-indigo-600 to-violet-900"
        sidebarTitle="Diagnostic Scope"
        sidebarIcon={GitBranch}
        sidebarContent={renderSidebar()}
        detailTitle="Clinical Synthesis"
        detailIcon={Sparkles}
        detailContent={renderDetail()}
      >
        {renderContent()}
      </SuiteLayout>
    </GlowContainer>
  );
};

export default DiagnosticReasoningSuite;
