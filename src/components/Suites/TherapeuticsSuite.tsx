import React, { useState } from 'react';
import { Pill, Activity, ShieldAlert, Calendar, AlertCircle } from 'lucide-react';
import SuiteLayout, { SuiteTab } from '../ui/SuiteLayout';
import { TherapeuticNavigator } from '../../views/TherapeuticNavigator';
import GenericPharmacologyView from '../../views/GenericPharmacologyView';
import { PharmacologyToxView } from '../../views/PharmacologyToxView';
import ImmunisationView from '../../views/ImmunisationView';
import GlowContainer from '../ui/GlowContainer';

interface TherapeuticsSuiteProps {
  onBack: () => void;
}

/**
 * TherapeuticsSuite Component
 * Unifies Pharmacology Reference, Generic Pharma, Toxidromes & Toxins, and Immunisations
 * under an amber-themed three-column layout.
 */
export const TherapeuticsSuite: React.FC<TherapeuticsSuiteProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<string>('navigator');
  const [activeDetail, setActiveDetail] = useState<React.ReactNode | null>(null);

  // Tab definitions conforming to the SuiteTab interface
  const tabs: SuiteTab[] = [
    { id: 'navigator', label: 'Pharmacology Reference', icon: Pill },
    { id: 'generic', label: 'Generic Pharmacology', icon: Activity },
    { id: 'tox', label: 'Toxidromes & Toxins', icon: ShieldAlert },
    { id: 'immunisation', label: 'Immunisations', icon: Calendar }
  ];

  // Sidebar content (Column 1) based on active tab
  const renderSidebar = () => {
    switch (activeTab) {
      case 'navigator':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Drug Reference
            </h3>
            <p>
              Look up target indications, contraindications, clinical dosages, and pharmacokinetics
              profiles.
            </p>
          </div>
        );
      case 'generic':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Pharma Classes
            </h3>
            <p>
              Explore drug spectral classes, receptor-binding profiles, and systemic modes of
              action.
            </p>
          </div>
        );
      case 'tox':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Toxicology Alert
            </h3>
            <p>
              Determine signs of toxidrome overdosage, specific antidotes, and critical
              decontamination protocols.
            </p>
          </div>
        );
      case 'immunisation':
        return (
          <div className="space-y-4 text-slate-400 text-xs leading-relaxed font-medium">
            <h3 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Schedules
            </h3>
            <p>
              Review national and local immunization schedules across paediatric, adult, and special
              patient cohorts.
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
      case 'navigator':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <TherapeuticNavigator />
          </div>
        );
      case 'generic':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <GenericPharmacologyView />
          </div>
        );
      case 'tox':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <PharmacologyToxView />
          </div>
        );
      case 'immunisation':
        return (
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-2">
            <ImmunisationView />
          </div>
        );
      default:
        return (
          <div className="p-8 text-center text-slate-400">Select a therapeutics module tab.</div>
        );
    }
  };

  // Detail panel (Column 3)
  const renderDetail = () => {
    if (activeDetail) return activeDetail;

    return (
      <div className="space-y-4 text-slate-400 text-xs font-medium leading-relaxed">
        <div className="p-4 bg-amber-950/20 border border-amber-500/10 rounded-2xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-slate-200 uppercase tracking-widest text-[9px] mb-1">
              Therapeutic Monitor
            </h4>
            <p className="text-[11px]">
              Side effects, cross-interactions, toxicological red flags, and stewardship alerts
              appear here during active workflows.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <GlowContainer theme="amber" containerClass="w-full h-full max-w-none p-0">
      <SuiteLayout
        title="Therapeutics Suite"
        category="Treatment & Tox"
        activeTab={activeTab}
        tabs={tabs}
        onSelectTab={setActiveTab}
        onBack={onBack}
        themeClass="from-amber-500 to-orange-850"
        sidebarTitle="Therapeutics Scope"
        sidebarIcon={Pill}
        sidebarContent={renderSidebar()}
        detailTitle="Clinical Warnings"
        detailIcon={ShieldAlert}
        detailContent={renderDetail()}
      >
        {renderContent()}
      </SuiteLayout>
    </GlowContainer>
  );
};

export default TherapeuticsSuite;
