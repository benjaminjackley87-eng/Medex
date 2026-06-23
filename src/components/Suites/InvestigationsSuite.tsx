import React, { useState } from 'react';
import { Microscope, Activity, Layers, Calculator, AlertCircle } from 'lucide-react';
import SuiteLayout, { SuiteTab } from '../ui/SuiteLayout';
import InvestigationHub from '../InvestigationHub';
import ECGView from '../../views/ECGView';
import RadiologyView from '../../views/RadiologyView';
import { ClinicalCalculatorsView } from '../../views/ClinicalCalculatorsView';
import GlowContainer from '../ui/GlowContainer';

interface InvestigationsSuiteProps {
  initialSearchQuery?: string;
  onSearchHandled?: () => void;
  onBack: () => void;
}

/**
 * InvestigationsSuite Component
 * Unifies Labs, ECG Library, Radiology Gallery, and Medical Calculators
 * under a teal-themed three-column layout.
 */
export const InvestigationsSuite: React.FC<InvestigationsSuiteProps> = ({
  initialSearchQuery = '',
  onSearchHandled,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<string>('labs');
  const [activeDetail, setActiveDetail] = useState<React.ReactNode | null>(null);

  // Tab definitions conforming to the SuiteTab interface
  const tabs: SuiteTab[] = [
    { id: 'labs', label: 'Lab Interpretation', icon: Microscope },
    { id: 'ecg', label: 'ECG Rhythm Analysis', icon: Activity },
    { id: 'radiology', label: 'Imaging Gallery', icon: Layers },
    { id: 'calculators', label: 'Medical Calculators', icon: Calculator }
  ];

  // Sidebar content (Column 1) based on active tab
  const renderSidebar = () => {
    switch (activeTab) {
      case 'labs':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Diagnostics Index
            </h3>
            <p>
              Analyze arterial blood gases, liver function profiles, full blood counts, and
              metabolic panels.
            </p>
          </div>
        );
      case 'ecg':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              ECG Library
            </h3>
            <p>
              Browse typical electro-cardio waveforms, conduction delays, arrhythmias, and acute
              ischemic changes.
            </p>
          </div>
        );
      case 'radiology':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Imaging Reference
            </h3>
            <p>
              Compare normal and pathologic radiographic scans across CXR, AXR, CT, and ultrasound
              views.
            </p>
          </div>
        );
      case 'calculators':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Clinical Calculators
            </h3>
            <p>
              Rapidly evaluate clinical severity indices, GCS scores, clearance rates, and dosage
              parameters.
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
      case 'labs':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <InvestigationHub
              initialSearchQuery={initialSearchQuery}
              onSearchHandled={onSearchHandled}
            />
          </div>
        );
      case 'ecg':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <ECGView />
          </div>
        );
      case 'radiology':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <RadiologyView />
          </div>
        );
      case 'calculators':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <ClinicalCalculatorsView />
          </div>
        );
      default:
        return (
          <div className="p-8 text-center text-slate-400">Select a diagnostics module tab.</div>
        );
    }
  };

  // Detail panel (Column 3)
  const renderDetail = () => {
    if (activeDetail) return activeDetail;

    return (
      <div className="space-y-4 text-slate-400 text-xs font-medium leading-relaxed">
        <div className="p-4 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-slate-200 uppercase tracking-widest text-[9px] mb-1">
              Diagnostics Assistant
            </h4>
            <p className="text-[11px]">
              Laboratory reference ranges, ECG lead placement diagnostics, and radiographic
              checklist highlights appear here during active workflows.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <GlowContainer theme="emerald" containerClass="w-full h-full max-w-none p-0">
      <SuiteLayout
        title="Investigations Hub"
        category="Diagnostics"
        activeTab={activeTab}
        tabs={tabs}
        onSelectTab={setActiveTab}
        onBack={onBack}
        themeClass="from-emerald-600 to-teal-800"
        sidebarTitle="Diagnostics List"
        sidebarIcon={Microscope}
        sidebarContent={renderSidebar()}
        detailTitle="Diagnostic Analysis"
        detailIcon={Microscope}
        detailContent={renderDetail()}
      >
        {renderContent()}
      </SuiteLayout>
    </GlowContainer>
  );
};

export default InvestigationsSuite;
