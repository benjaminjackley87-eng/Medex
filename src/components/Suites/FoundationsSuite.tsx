import React, { useState, Suspense, lazy } from 'react';
import { Atom, BookOpen, Pill, Brain, Zap, Loader2, FlaskConical } from 'lucide-react';
import SuiteLayout, { SuiteTab } from '../ui/SuiteLayout';
import GlowContainer from '../ui/GlowContainer';

// Lazy-load each science sub-module to keep bundle efficient
const SciencesExplorer = lazy(() => import('../../views/SciencesExplorer'));
const GenericPharmacologyView = lazy(() => import('../../views/GenericPharmacologyView'));
const AnaestheticsCCView = lazy(() => import('../../views/AnaestheticsCCView'));
const NeuropraxiaView = lazy(() => import('../../views/NeuropraxiaView'));
const GlossaryView = lazy(() => import('../../views/GlossaryView'));

interface FoundationsSuiteProps {
  onBack: () => void;
}

/** Loading fallback used inside each tab */
const TabLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        Loading Module...
      </span>
    </div>
  </div>
);

/**
 * FoundationsSuite Component
 * Consolidates all foundational science modules under one cyan-themed Suite:
 *   - Sciences Explorer (PV-Loop, OHDC+ simulators, physiology)
 *   - Generic Pharmacology (drug classes and mechanisms)
 *   - Anaesthetics & Critical Care
 *   - Neuropraxia (neurological science)
 *   - Clinical Glossary
 *
 * Uses SuiteLayout's 3-column pattern:
 *   Col 1 (Sidebar)  — Module context guide & tips
 *   Col 2 (Main)     — Active science module
 *   Col 3 (Detail)   — Quick reference / concept flashcard
 */
export const FoundationsSuite: React.FC<FoundationsSuiteProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<string>('sciences');

  const tabs: SuiteTab[] = [
    { id: 'sciences', label: 'Sciences Explorer', icon: Atom },
    { id: 'pharmacology', label: 'Pharmacology', icon: Pill },
    { id: 'anaesthetics', label: 'Anaesthetics & CC', icon: FlaskConical },
    { id: 'neuropraxia', label: 'Neuropraxia', icon: Brain },
    { id: 'glossary', label: 'Glossary', icon: BookOpen }
  ];

  // ── Sidebar (Column 1) context per tab ───────────────────────────────────
  const renderSidebar = () => {
    switch (activeTab) {
      case 'sciences':
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-black text-slate-200 uppercase tracking-widest mb-2">
                Sciences Explorer
              </h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Interactive physiological simulators, pressure-volume loops, and Frank–Starling
                mechanics.
              </p>
            </div>
            <div className="p-3 bg-cyan-950/30 border border-cyan-500/15 rounded-xl space-y-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 block">
                Modules Available
              </span>
              {[
                'Cardiovascular PV-Loop',
                'OHDC+ Simulator',
                'Respiratory Mechanics',
                'Pharmacokinetics'
              ].map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-cyan-500" />
                  <span className="text-[10px] font-bold text-slate-400">{m}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'pharmacology':
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-black text-slate-200 uppercase tracking-widest mb-2">
                Pharmacology
              </h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Drug classes, mechanisms of action, pharmacokinetics, and clinical applications.
              </p>
            </div>
            <div className="p-3 bg-purple-950/30 border border-purple-500/15 rounded-xl">
              <span className="text-[9px] font-black uppercase tracking-wider text-purple-400 block mb-2">
                Key Areas
              </span>
              {['Cardiovascular', 'Respiratory', 'CNS', 'Antimicrobials', 'Analgesics'].map((a) => (
                <div key={a} className="flex items-center gap-2 py-1">
                  <Pill className="w-2.5 h-2.5 text-purple-500 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-400">{a}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'anaesthetics':
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-black text-slate-200 uppercase tracking-widest mb-2">
                Anaesthetics & CC
              </h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Anaesthetic agents, regional techniques, ventilator management, and ICU protocols.
              </p>
            </div>
            <div className="p-3 bg-rose-950/20 border border-rose-500/10 rounded-xl">
              <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 block mb-1">
                ⚠ Priority Topics
              </span>
              <p className="text-[10px] font-medium text-slate-400">
                Inhalational agents, TIVA protocols, difficult airway algorithms.
              </p>
            </div>
          </div>
        );
      case 'neuropraxia':
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-black text-slate-200 uppercase tracking-widest mb-2">
                Neuropraxia
              </h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Neuroanatomy, peripheral nerve injuries, plexus anatomy, and clinical
                neuropathology.
              </p>
            </div>
          </div>
        );
      case 'glossary':
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-black text-slate-200 uppercase tracking-widest mb-2">
                Clinical Glossary
              </h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Definitions, eponyms, abbreviations, and clinical terminology across all
                specialties.
              </p>
            </div>
            <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                Tip
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Search by term, system, or prefix for rapid lookup during clinical sessions.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // ── Main Content (Column 2) ───────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case 'sciences':
        return (
          <Suspense fallback={<TabLoader />}>
            <SciencesExplorer onBack={onBack} />
          </Suspense>
        );
      case 'pharmacology':
        return (
          <Suspense fallback={<TabLoader />}>
            <GenericPharmacologyView />
          </Suspense>
        );
      case 'anaesthetics':
        return (
          <Suspense fallback={<TabLoader />}>
            <AnaestheticsCCView />
          </Suspense>
        );
      case 'neuropraxia':
        return (
          <Suspense fallback={<TabLoader />}>
            <NeuropraxiaView />
          </Suspense>
        );
      case 'glossary':
        return (
          <Suspense fallback={<TabLoader />}>
            <GlossaryView onBack={onBack} />
          </Suspense>
        );
      default:
        return <p className="text-slate-400 p-8">Select a module from the tab bar.</p>;
    }
  };

  // ── Detail Panel (Column 3) — quick reference ──────────────────────────
  const renderDetail = () => (
    <div className="space-y-5 text-slate-400 text-xs font-medium leading-relaxed">
      <div className="p-4 bg-cyan-950/20 border border-cyan-500/10 rounded-2xl flex gap-3">
        <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-black text-slate-200 uppercase tracking-widest text-[9px] mb-1">
            Foundations Nexus
          </h4>
          <p className="text-[11px]">
            Interact with simulators, search pharmacology profiles, or click glossary terms to
            populate contextual reference cards here.
          </p>
        </div>
      </div>

      {/* Quick reference cards */}
      <div className="space-y-3">
        {[
          { label: 'Fick Principle', body: 'CO = VO₂ / (CaO₂ − CvO₂)', color: 'text-cyan-400' },
          {
            label: 'Henderson–Hasselbalch',
            body: 'pH = pKa + log([A⁻]/[HA])',
            color: 'text-emerald-400'
          },
          {
            label: 'Starling Forces',
            body: 'Jv = Kf[(Pc − Pi) − σ(πc − πi)]',
            color: 'text-indigo-400'
          }
        ].map((card) => (
          <div key={card.label} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl">
            <span
              className={`text-[9px] font-black uppercase tracking-widest ${card.color} block mb-2`}
            >
              {card.label}
            </span>
            <p className="text-[11px] font-mono text-slate-300">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <GlowContainer theme="cyan" containerClass="w-full h-full max-w-none p-0">
      <SuiteLayout
        title="Foundations Suite"
        category="Basic Sciences"
        activeTab={activeTab}
        tabs={tabs}
        onSelectTab={setActiveTab}
        onBack={onBack}
        themeClass="from-cyan-500 to-blue-900"
        sidebarTitle="Module Guide"
        sidebarIcon={Atom}
        sidebarContent={renderSidebar()}
        detailTitle="Quick Reference"
        detailIcon={BookOpen}
        detailContent={renderDetail()}
      >
        {renderContent()}
      </SuiteLayout>
    </GlowContainer>
  );
};

export default FoundationsSuite;
