# Plan: Consolidated Clinical Suites & Navigation Simplification

This plan outlines the restructuring of MedEx's 20+ standalone modules into **6 unified Clinical Suites**, aligning them with a premium, highly visual **three-column workspace layout**. It incorporates a cohesive design system using rich aesthetics, color variations, and glassmorphism.

---

## 1. UI Design Unification & Visual Appeal

To capture the engaging and modern look of the Dashboard page across all pages, we will enforce these visual standards:

1. **Dynamic Glowing Backgrounds**:
   - Translucent container elements with deep, colorful background blur rings (e.g. `bg-blue-500/5` or `bg-rose-500/5` blur effects) customized to match the active medical suite.
2. **Glassmorphism & Depth**:
   - All modules will use rounded-3xl cards (`rounded-[32px]`) with thin, clean border lines (`border-white/5` or theme-colored lines like `border-indigo-500/10`).
3. **Engaging Micro-interactions**:
   - Glowing drop-shadows on active nodes, clean indicator dots, scale-up hover states on interactive cards (`hover:scale-[1.01] hover:border-white/10`).
4. **Harmonious Color Codes**:
   - **Rose / Red**: Critical findings, diagnostics, red flags.
   - **Emerald / Green**: Stored protocols, checked tasks, learned progress.
   - **Indigo / Purple**: Academic sciences, references, drug monographs.
   - **Amber / Orange**: Clinical pearls, toxicology guidelines, worked cases.

---

## 2. Proposed Consolidation Matrix

We will consolidate the sidebar navigation links from over 20 scattered pages into **6 Master Modules**:

| Master Suite                   | Consolidated Sub-pages                                             | Workspace Layout Content Tabs                                                      | Visual Style                                    |
| :----------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :---------------------------------------------- |
| **1. Dashboard & Progress**    | Dashboard, Tutorial, Settings                                      | Overview, User Profile, Settings                                                   | Cobalt blue accent, clean card grids            |
| **2. Examinations & OSCEs**    | Library, ExamView, MSK Exams                                       | Systems List, Active OSCE Protocol, One-Pager Summaries                            | Organ-specific active colors, progress loops    |
| **3. Diagnostic Reasoning**    | Symptom Checker, Clinical Finder, Correlation, Derm Revisor        | Symptom Mapper, Condition Index, Sign Pathophysiology                              | Indigo-purple gradients, connected node graphs  |
| **4. Investigations Hub**      | Investigations (Labs), ECG Library, Radiology Gallery, Calculators | Lab Interpretation, ECG Patterns, Imaging Gallery, Medical Calculators             | Emerald-teal glow, detailed diagnostic cards    |
| **5. Therapeutics & Tox**      | Generic Pharmacology, Abx & Pathogens, Toxidromes, Immunisations   | Drug Reference, Antibiotics & Pathogen Matrix, Tox & ATODs, Immunisation Schedules | Amber-orange warning alerts, pill detail sheets |
| **6. Acute Care & Procedures** | Acute Protocols, Bedside Procedures, Anaesthetics, Neuropraxia     | Emergency Protocols, Procedural Techniques, Anaesthesia Drugs, Nerve Plexus Maps   | High-intensity rose/red warning badges          |

---

## 3. Reworking the Shell Layout

To implement this:

1. **Sidebar Cleanup**: Replace the 5 expanded pillars in `Sidebar.tsx` with the 6 Master Modules.
2. **Three-Column Suites**:
   - Each Master Suite will load inside a unified **WorkspaceLayout** wrapper.
   - **Column 1**: Navigation trail / sub-categories list (e.g. ECG categories inside the Investigations Suite, or Drug classes inside Therapeutics).
   - **Column 2**: High-yield card grid / index list.
   - **Column 3**: Drilled-down detail panel (e.g. showing the specific ECG strip, drug monographs, or procedural setup steps).

---

## User Review Required

> [!WARNING]
> **View Combination Implications**
> Combining sub-pages means routing logic inside `App.tsx` will be simplified to render fewer parent views. Individual sub-pages (like `ECGView.tsx`, `RadiologyView.tsx`) will be refactored into tabs within their unified parent components (e.g. `Suites/InvestigationsSuite.tsx`).

---

## Proposed Changes

### [NEW] Unified Parent Components

- **`components/Suites/DiagnosticReasoningSuite.tsx`**
- **`components/Suites/InvestigationsSuite.tsx`**
- **`components/Suites/TherapeuticsSuite.tsx`**
- **`components/Suites/AcuteInterventionsSuite.tsx`**

### [MODIFY] Navigation & Routing Shell

- **`components/Sidebar.tsx`**: Clean up the navigation pillar links to list only the 6 core suites.
- **`App.tsx`**: Simplify the `currentView` routing shell to support the new parent suites.

---

## Verification Plan

### Automated Tests

- Run `npx tsc --noEmit` to verify type resolutions after routing simplification.
- Execute `npm run build` to verify webpack bundling.

### Manual Verification

- Ensure all consolidated features (such as drug search, ECG strips, radiology image enlargers, and clinical calculators) remain fully accessible and load inside their new tabbed parent suites.
