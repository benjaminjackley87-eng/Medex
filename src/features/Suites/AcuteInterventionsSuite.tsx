import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Wrench, Syringe, Layers, AlertCircle } from 'lucide-react';
import SuiteLayout, { SuiteTab } from '../../components/ui/SuiteLayout';
import { AcuteCareView } from '../../pages/AcuteCareView';
import ProceduresView from '../../pages/ProceduresView';
import AnaestheticsCCView from '../../pages/AnaestheticsCCView';
import NeuropraxiaView from '../../pages/NeuropraxiaView';
import GlowContainer from '../../components/ui/GlowContainer';

interface AcuteInterventionsSuiteProps {
  isEditMode?: boolean;
  onBack?: () => void;
}

/**
 * AcuteInterventionsSuite Component
 * Unifies Emergency Protocols, Bedside Procedures, Anaesthesia CC, and Neuropraxia Nerve Maps
 * under a rose-themed three-column layout.
 */
export const AcuteInterventionsSuite: React.FC<AcuteInterventionsSuiteProps> = ({
  isEditMode = false,
  onBack
}) => {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate('/'));
  const [activeTab, setActiveTab] = useState<string>('acuteCare');
  const [activeDetail, setActiveDetail] = useState<React.ReactNode | null>(null);

  // Tab definitions conforming to the SuiteTab interface
  const tabs: SuiteTab[] = [
    { id: 'acuteCare', label: 'Emergency Protocols', icon: ShieldAlert },
    { id: 'procedures', label: 'Bedside Procedures', icon: Wrench },
    { id: 'anaestheticsCC', label: 'Anaesthesia CC', icon: Syringe },
    { id: 'neuropraxia', label: 'Neuropraxia & Nerve Maps', icon: Layers }
  ];

  // Sidebar content (Column 1) based on active tab
  const renderSidebar = () => {
    switch (activeTab) {
      case 'acuteCare':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Acute Guidelines
            </h3>
            <p>
              Review immediate treatment sequences for anaphylaxis, status epilepticus, acute
              asthma, and cardiac arrests.
            </p>
          </div>
        );
      case 'procedures':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Bedside Skills
            </h3>
            <p>
              Step-by-step procedural guides for lumbar puncture, chest drain insertion, arterial
              cannulation, and suturing.
            </p>
          </div>
        );
      case 'anaestheticsCC':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Critical Care
            </h3>
            <p>
              Look up anaesthetic drug induction protocols, sedation scales, and neuromuscular
              blockade guidelines.
            </p>
          </div>
        );
      case 'neuropraxia':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Neuropraxia Maps
            </h3>
            <p>
              Consult upper/lower limb nerve maps, sensory innervation charts, and nerve injury
              classifications.
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
      case 'acuteCare':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <AcuteCareView isEditMode={isEditMode} />
          </div>
        );
      case 'procedures':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <ProceduresView isEditMode={isEditMode} />
          </div>
        );
      case 'anaestheticsCC':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <AnaestheticsCCView />
          </div>
        );
      case 'neuropraxia':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <NeuropraxiaView />
          </div>
        );
      default:
        return (
          <div className="p-8 text-center text-slate-400">Select an intervention module tab.</div>
        );
    }
  };

  // Detail panel (Column 3)
  const renderDetail = () => {
    if (activeDetail) return activeDetail;

    return (
      <div className="space-y-4 text-slate-400 text-xs font-medium leading-relaxed">
        <div className="p-4 bg-rose-950/20 border border-rose-500/10 rounded-2xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-slate-200 uppercase tracking-widest text-[9px] mb-1">
              Resuscitation Monitor
            </h4>
            <p className="text-[11px]">
              Emergency checklists, drug dosing timelines, block complications, and acute reversal
              procedures populate here during active scenarios.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <GlowContainer theme="rose" containerClass="w-full h-full max-w-none p-0">
      <SuiteLayout
        title="Acute Interventions Suite"
        category="Emergency & Critical Care"
        activeTab={activeTab}
        tabs={tabs}
        onSelectTab={setActiveTab}
        onBack={handleBack}
        themeClass="from-red-600 to-rose-900"
        sidebarTitle="Interventions"
        sidebarIcon={ShieldAlert}
        sidebarContent={renderSidebar()}
        detailTitle="Crisis Management"
        detailIcon={ShieldAlert}
        detailContent={renderDetail()}
      >
        {renderContent()}
      </SuiteLayout>
    </GlowContainer>
  );
};

export default AcuteInterventionsSuite;
