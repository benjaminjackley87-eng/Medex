# ANZCA Primary Sciences Project Tracker & Architecture Summary

## Project Goal

Create an extensive, ANZCA-primary-level relational database of foundational sciences, structured using a layered, recursive architecture to guarantee maximum content depth.

## Discussion Summary: The Recursive Architecture Pivot

- **Date of Pivot**: June 16, 2026
- **The Problem**: Monolithic organ-system JSON files force the consolidation of vast domains (Anatomy, Cellular Mechanics, Physiology, and Clinical Application). This risks structural truncation due to sheer volume and makes iterative verification difficult.
- **The Solution**: Transition to a Recursive Layered Architecture. We will systematically build, verify, and lock down one vertical scientific layer across all organ systems before initiating the next.
- **The Relational Linkage**: Each module contains structural and regional keys (e.g., `structureId`, `innervationKey`) to allow seamless, recursive linking across future cellular, physiological, and pharmacological JSONs.

```text
       [ LAYER 1: APPLIED CLINICAL ANATOMY & HISTOLOGY ]
                             │
                             ▼ (linked via structural IDs)
       [ LAYER 2: BIOPHYSICAL & CELLULAR MECHANICS ]
                             │
                             ▼ (linked via mechanical pathways)
       [ LAYER 3: INTEGRATIVE ORGAN PHYSIOLOGY ]
                             │
                             ▼ (linked via regulatory loops)
       [ LAYER 4: PHYSIOLOGICAL EXTREMES & STRESS ]
                             │
                             ▼ (linked via clinical scenarios)
       [ LAYER 5: ANAESTHETIC IMPLICATIONS & PHARMACOLOGY ]
```

## File Catalog

| Layer   | System ID                 | File Name                             | File Type | Status   | Last Edited (AEST)   |
| :------ | :------------------------ | :------------------------------------ | :-------- | :------- | :------------------- |
| Tracker | tracker                   | `anzca_physiology_project_tracker.md` | Markdown  | Active   | June 17, 2026, 09:05 |
| Layer 1 | `anat_resp_01`            | `anat_resp_01.json`                   | JSON      | Complete | June 17, 2026, 08:02 |
| Layer 1 | `anat_cvs_01`             | `anat_cvs_01.json`                    | JSON      | Complete | June 16, 2026, 19:32 |
| Layer 1 | `anat_neuraxis_01`        | `anat_neuraxis_01.json`               | JSON      | Complete | June 17, 2026, 08:02 |
| Layer 1 | `anat_pain_01`            | `anat_pain_01.json`                   | JSON      | Complete | June 17, 2026, 08:04 |
| Layer 1 | `anat_cns_01`             | `anat_cns_01.json`                    | JSON      | Complete | June 17, 2026, 08:04 |
| Layer 1 | `anat_pns_01`             | `anat_pns_01.json`                    | JSON      | Complete | June 17, 2026, 08:05 |
| Layer 1 | `anat_renal_01`           | `anat_renal_01.json`                  | JSON      | Complete | June 17, 2026, 08:17 |
| Layer 1 | `anat_hepatic_01`         | `anat_hepatic_01.json`                | JSON      | Complete | June 17, 2026, 08:22 |
| Layer 1 | `anat_git_01`             | `anat_git_01.json`                    | JSON      | Complete | June 17, 2026, 08:25 |
| Layer 1 | `anat_endocrine_01`       | `anat_endocrine_01.json`              | JSON      | Complete | June 17, 2026, 08:35 |
| Layer 1 | `anat_haem_01`            | `anat_haem_01.json`                   | JSON      | Complete | June 17, 2026, 08:41 |
| Layer 1 | `anat_paed_01`            | `anat_paed_01.json`                   | JSON      | Complete | June 17, 2026, 08:42 |
| Layer 1 | `anat_special_01`         | `anat_special_01.json`                | JSON      | Complete | June 17, 2026, 08:47 |
| Layer 1 | `anat_musculoskeletal_01` | `anat_musculoskeletal_01.json`        | JSON      | Complete | June 17, 2026, 08:54 |
| Layer 2 | `cell_neuro_01`           | `cell_neuro_01.json`                  | JSON      | Complete | June 17, 2026, 09:08 |
| Layer 2 | `cell_synapse_01`         | `cell_synapse_01.json`                | JSON      | Complete | June 17, 2026, 09:11 |
| Layer 2 | `cell_cardiac_01`         | `cell_cardiac_01.json`                | JSON      | Complete | June 17, 2026, 09:20 |
| Layer 2 | `cell_pulmonary_01`       | `cell_pulmonary_01.json`              | JSON      | Complete | June 17, 2026, 09:35 |
| Layer 2 | `cell_renal_01`           | `cell_renal_01.json`                  | JSON      | Complete | June 17, 2026, 09:43 |
| Layer 2 | `cell_endocrine_01`       | `cell_endocrine_01.json`              | JSON      | Complete | June 18, 2026, 08:12 |
| Layer 2 | `cell_hepatic_01`         | `cell_hepatic_01.json`                | JSON      | Complete | June 18, 2026, 08:18 |
| Layer 3 | `phys_cvs_01`             | `phys_cvs_01.json`                    | JSON      | Complete | June 18, 2026, 09:35 |
| Layer 3 | `phys_resp_01`            | `phys_resp_01.json`                   | JSON      | Complete | June 18, 2026, 09:46 |
| Layer 3 | `phys_neuro_01`           | `phys_neuro_01.json`                  | JSON      | Complete | June 18, 2026, 09:47 |
| Layer 3 | `phys_renal_01`           | `phys_renal_01.json`                  | JSON      | Complete | June 18, 2026, 09:48 |
| Layer 3 | `phys_hepatic_01`         | `phys_hepatic_01.json`                | JSON      | Complete | June 18, 2026, 09:48 |
| Layer 3 | `phys_endocrine_01`       | `phys_endocrine_01.json`              | JSON      | Complete | June 18, 2026, 09:49 |
| Layer 3 | `phys_haem_01`            | `phys_haem_01.json`                   | JSON      | Complete | June 18, 2026, 09:50 |
| Layer 3 | `phys_musculoskeletal_01` | `phys_musculoskeletal_01.json`        | JSON      | Complete | June 18, 2026, 09:50 |
| Layer 3 | `phys_paed_01`            | `phys_paed_01.json`                   | JSON      | Complete | June 18, 2026, 09:51 |

## Actionable Pivot Checklist

### 1. Architectural Setup

- [x] Refactor tracker schema to support recursive layered architecture.
- [x] Define the standardized schema for Layer 1: Applied Clinical Anatomy & Histology.
- [x] Establish standard relational key prefixes (e.g., `anat_`, `cell_`, `phys_`).

### 2. Layer 1: Applied Clinical Anatomy & Histology

- [x] **Module 1.1**: Respiratory System Anatomy (`anat_resp_01.json` - Complete)
  - Nasal Cavity: Turbinates, warming/humidification physics, Kiesselbach's Plexus, and cribriform plate.
  - Larynx: Unpaired/paired cartilages, membranes, ligaments, vocal cord micro-architecture (5 layers), superior vs. recurrent laryngeal nerve courses.
  - Trachea: Dimensions, C-shaped rings, trachealis muscle, relations, vertebral levels (C6 to T4/T5), and pediatric variations.
  - Bronchial Tree: Branching generations (0-23), conducting vs. respiratory zones, right vs. left main bronchus structural differences, and histological transitions.
  - Diaphragm: Origins, insertions, muscle fiber typing, innervation (phrenic C3-C5), and anatomical apertures (T8, T10, T12).
- [x] **Module 1.2**: Cardiovascular System Anatomy (`anat_cvs_01.json` - Complete)
  - Pericardium: Fibrous vs. serous layers, pericardial cavity, transverse and oblique sinuses, and phrenic nerve relations.
  - Chambers: Right atrium (sinus venarum, crista terminalis, pectinate muscles, fossa ovalis), right ventricle (infundibulum, moderator band, trabeculae), left atrium (smooth wall, pulmonary veins, auricle), left ventricle (wall thickness, papillary muscles).
  - Coronary Circulation: Left (LAD, Cx) and Right (PDA, marginal, nodal) coronary arteries, coronary dominance definitions and population percentages (85/8/7), and the venous drainage pathways (coronary sinus tributaries, anterior cardiac veins, Thebesian veins).
  - Conduction System & Fibrous Skeleton: SA node, AV node (Triangle of Koch boundaries), Bundle of His, bundle branches, Purkinje fiber micro-architecture, and the electrical insulating properties of the fibrous skeleton.
- [x] **Module 1.3**: Spine & Neuraxial Anatomy (`anat_neuraxis_01.json` - Complete)
  - Vertebral Column: Typical vertebra, regional variations (cervical, thoracic, lumbar), sacral hiatus, and intervertebral disc micro-anatomy.
  - Ligaments & Needle Layers: Sequential tissue layers traversed for both midline and paramedian approaches, and the biophysics of the ligamentum flavum (80% elastin, 20% collagen).
  - Meninges & Spaces: Dura, arachnoid, and pia mater characteristics; epidural, subdural, and subarachnoid spaces; conus medullaris and dural sac termination levels (adult vs. pediatric).
  - Spinal Blood Supply: Anterior spinal artery (ASA), posterior spinal arteries (PSAs), segmental radicular arteries, and the Artery of Adamkiewicz.
- [x] **Module 1.4**: Pain Pathways & Neural Tracts (`anat_pain_01.json` - Complete)
  - Nocicepsors: Transducers (TRPV1, TRPM8, ASICs, Piezo2) and peripheral sensitization via the inflammatory soup (PGE2, Bradykinin, Nav1.8/Nav1.9).
  - Afferents: A-delta (first pain) vs. C-fibers (second pain) and Lissauer's tract.
  - Dorsal Horn Synapses: Excitatory neurotransmission (Glutamate, Substance P, CGRP) and the heterotetrameric NMDA receptor biophysics ($Mg^{2+}$ plug displacement, GluN1/GluN2 stoichiometry, Glycine co-activation).
  - Ascending Pathways: Lateral and anterior spinothalamic tracts, spinoreticular, and spinomesencephalic tracts.
  - Thalamocortical Projections: VPL/VPM relay, primary somatosensory cortex (S1/S2 homunculus), and limbic emotional processing (Anterior Cingulate/Insular cortex).
  - Descending Modulation: PAG, RVM (NRM), and Locus Coeruleus pathways; spinal pre- and post-synaptic inhibition (Enkephalin, mu-opioid, GIRK $K^+$ channels); and the Gate Control Theory.
- [x] **Module 1.5**: Central Nervous System Anatomy (`anat_cns_01.json` - Complete)
  - Cerebrum: Lobes, neocortical laminations (Layers I-VI, giant pyramidal cells of Betz in Layer V), cerebral blood supply (ACA, MCA, PCA), and glymphatic clearance.
  - Brainstem: Midbrain, pons, and medulla oblongata; cranial nerve nuclei mapping (III-XII); respiratory groups (DRG, VRG, pneumotaxic, apneustic) and cardiovascular reflex centers (NTS, RVLM, nucleus ambiguus).
  - Cranial Nerves: Exact pathways, exit foramina, modalities, and clinical palsy presentations for CN I to XII.
  - Circle of Willis: Internal carotid and vertebrobasilar systems, anastomotic loop components, and common aneurysm sites.
  - Cavernous Sinus: Boundaries, lateral wall structures (CN III, IV, V1, V2), and central structures (ICA, CN VI).
  - Ventricles & Barriers: CSF flow pathway (Monro, Sylvius, Magendie, Luschka), choroid plexus blood-CSF barrier, blood-brain barrier microanatomy, and circumventricular organs (Area Postrema CTZ, OVLT, Median Eminence).
- [x] **Module 1.6**: Peripheral Nervous System Anatomy (`anat_pns_01.json` - Complete)
  - Dermatomes & Myotomes: Cutaneous maps, motor rami, and joint osteotomes (shoulder, hip, knee).
  - Brachial Plexus: Interscalene, supraclavicular, infraclavicular, and axillary site relations; roots, trunks, divisions, cords, and branches; axillary sheath compartments.
  - Lumbosacral Plexus: Lumbar (L1-L4) and sacral (L4-S4) branches; psoas and piriformis relations; femoral, obturator, LFCN, sciatic, and pudendal courses; fascia iliaca compartment.
  - Nerve Injury Classifications: Seddon (Neuropraxia, Axonotmesis, Neurotmesis) vs. Sunderland (1st to 5th-degree) micro-anatomical correlates.
  - Wallerian Degeneration: Axonal disintegration, myelin fragmentation, Schwann cell de-differentiation, Bands of Büngner formation, and growth cone kinetics.
- [x] **Module 1.7**: Renal & Urinary Tract Anatomy (`anat_renal_01.json` - Complete)
  - Kidney Macroanatomy: Cortex, medulla, pyramids, calyces, renal pelvis, and relation to retroperitoneum (vertebral levels T12-L3, trans-psoas, quadratus lumborum).
  - Renal Vasculature: Renal artery segments, lobar, interlobar, arcuate, and interlobular courses; afferent/efferent arteriolar geometries and the vasa recta loop.
  - Nephron Histology: Bowman's capsule, podocyte filtration slit diaphragm, proximal convoluted tubule (brush border), loop of Henle (thin/thick segments), distal tubule, and collecting duct cell types (principal vs. intercalated).
  - Juxtaglomerular Apparatus: Macula densa, juxtaglomerular granular cells, and extraglomerular mesangial cells.
  - Ureter & Bladder: Course of ureter (under the uterine artery/vas deferens), detrusor muscle, trigone, and internal/external sphincter innervation.
- [x] **Module 1.8**: Hepatic & Biliary Anatomy (`anat_hepatic_01.json` - Complete)
  - Macroanatomy: Couinaud segments (I-VIII) and surgical resection boundaries.
  - Microanatomy: Classical lobule, portal lobule, and Rappaport acinus (Zones 1-3).
  - Vascular System: Dual blood supply, hepatic arterial buffer response (HABR), sinusoids, space of Disse, and Kupffer cells.
- [x] **Module 1.9**: Gastrointestinal Tract Anatomy (`anat_git_01.json` - Complete)
  - Esophagus & Stomach: Anatomical constrictions, cardiorespiratory crossing levels, rugae, muscularis externa layers, and gastric secretory cells (parietal, chief, goblet, enteroendocrine).
  - Digestion & Absorption: Nutrient and mineral absorption sites (duodenum, jejunum, ileum, colon), brush border enzymes, B12/intrinsic factor pathway, and iron management.
- [x] **Module 1.10**: Endocrine System Anatomy (`anat_endocrine_01.json` - Complete)
  - Pituitary & Hypothalamus: Anatomical relations, infundibulum, adenohypophysis portal system, neurohypophysis tracts and Herring bodies.
  - Thyroid & Parathyroid: Cricoid relations, recurrent laryngeal nerve proximity, follicles, and calcium-sensing receptors on chief cells.
  - Adrenal Glands: Retroperitoneal relations, cortex zones (G-F-R) and hormone pathways, and chromaffin cells of the medulla.
- [x] **Module 1.11**: Haematological System & Lymphatic Anatomy (`anat_haem_01.json` - Complete)
  - Bone Marrow: Sinusoid histology, cellular niches (osteoblastic/vascular), and egress.
  - Spleen: Red pulp (cords of Billroth, fenestrated sinusoids) and white pulp (PALS, lymphoid follicles).
  - Thymus & Lymph Nodes: Blood-thymus barrier, selection, paracortex HEVs, and medullary cords.
- [x] **Module 1.12**: Paediatric & Neonatal Anatomical Variations (`anat_paed_01.json` - Complete)
  - Airway: Cephalad larynx, omega epiglottis, subglottic narrowing.
  - Respiratory & CVS: Infant compliance, metabolic rates, heart-rate dependent cardiac output.
  - Thermoregulation: Surface area limits, non-shivering thermogenesis via brown fat UCP-1.
- [x] **Module 1.13**: Special Organs (Eye, Ear, Teeth, Skin) (`anat_special_01.json` - Complete)
  - Eye & Ear: Orbit/extraocular muscles, middle ear ossicles, Eustachian tube.
  - Teeth & Skin: Dental anatomy, oral cavity dermatomal/myotomal maps, skin strata, and sensory receptors.
- [x] **Module 1.14**: Musculoskeletal & Neuromuscular Junction (NMJ) Anatomy (`anat_musculoskeletal_01.json` - Complete)
  - NMJ: Presynaptic/postsynaptic membranes, receptor profiles (adult/fetal nAChR, Nav1.4), and E-C coupling.
  - Bone Histology: Osteons, Haversian systems, Volkmann's canals, and CRITOE pediatric joint ossification ages.

### 3. Layer 2: Biophysical & Cellular Mechanics

- [x] **Module 2.1**: Cellular Neurophysiology (`cell_neuro_01.json` - Complete)
  - Resting Membrane Potential: Generation of the RMP, electrochemical driving forces, and selective membrane permeability.
  - Equilibriums & Potentials: Nernst Equation (derivation and calculation of equilibrium potentials for $Na^+, K^+, Cl^-, Ca^{2+}$) and the Goldman-Hodgkin-Katz Equation (relative permeabilities).
  - Action Potential Kinetics: Phase 0 (Nav1.5 activation), Phase 1, Phase 2, Phase 3, Phase 4; absolute and relative refractory periods.
  - Passive Cable Properties: Length constant ($\lambda$) and Time constant ($\tau$) of nerve fibers, myelin mechanics, and saltatory conduction.
- [x] **Module 2.2**: Synaptic & Neurotransmitter Mechanics (`cell_synapse_01.json` - Complete)
  - Vesicle Release: Depolarization, voltage-gated $Ca^{2+}$ influx, synaptotagmin calcium sensing, SNARE complex assembly (synaptobrevin, syntaxin, SNAP-25), exocytosis, and clathrin-mediated endocytosis.
  - Acetylcholine: Synthesis (Choline + Acetyl-CoA via ChAT), vesicular transport (VAChT), receptor binding (Nicotinic pentameric structure, Muscarinic G-protein cascades), and termination (Acetylcholinesterase kinetics).
  - Catecholamines (Noradrenaline/Adrenaline): Synthesis pathway (Tyrosine $\rightarrow$ L-DOPA $\rightarrow$ Dopamine $\rightarrow$ Noradrenaline $\rightarrow$ Adrenaline), VMAT-2 packaging, pre-synaptic alpha-2 auto-receptor feedback, and termination (NET/reuptake-1, extra-neuronal uptake-2, MAO, and COMT metabolism).
  - GABA & Glycine: GABA synthesis (Glutamate via GAD), vesicle storage (VGAT), receptor kinetics ($GABA_A$ pentameric ligand-gated chloride channel vs. $GABA_B$ heterodimeric Gi-coupled potassium/calcium modulator), and GAT-1 reuptake.
  - Glutamate: Synthesis (Glutamine via glutaminase), vesicular packaging (VGLUT), receptor kinetics (AMPA fast $Na^+$ conductances, Kainate, and NMDA heterotetrameric calcium flux), and glial EAAT transport.
- [x] **Module 2.3**: Cardiac Biophysics & Muscle Mechanics (`cell_cardiac_01.json` - Complete)
  - Myocyte Action Potentials: Phase 0 to 4 kinetics, differences between ventricular/atrial myocytes and pacemaker cells (SA/AV node hyperpolarization-activated $I_f$ funny currents, $T$-type and $L$-type $Ca^{2+}$ currents).
  - Excitation-Contraction Coupling: T-tubule depolarization, L-type calcium channel (DHPR) opening, sarcoplasmic reticulum Ryanodine receptor (RyR2) activation ($Ca^{2+}$-induced calcium release), calcium binding to Troponin C, conformational shift of tropomyosin, myosin-actin cross-bridge cycling.
  - Relaxation (Lusitropy): Intracellular calcium clearance via SERCA2 (regulated by phospholamban phosphorylation), Sodium-Calcium Exchanger (NCX), and sarcolemmal $Ca^{2+}$-ATPase.
  - Starling Basis: Length-dependent calcium sensitivity and sarcomere filament overlap kinetics.
  - Syncytium & Coupling: Intercalated disc mechanics, gap junction connexons, and connexin-43 ischemia gating.
- [x] **Module 2.4**: Alveolar & Pulmonary Biophysics (`cell_pulmonary_01.json` - Complete)
  - Surface Tension Physics: Intermolecular cohesive forces of water, Laplace's Law ($P = 2T/r$) derivation, and dynamic area-dependent DPPC compression mechanics.
  - Alveolar Fluid Balance: Hydrostatic, oncotic, and surface tension pressures governing fluid filtration across the alveolar-capillary barrier (Starling equation), active sodium transport, and Negative Pressure Pulmonary Edema (NPPE) kinetics.
  - Gas Diffusion: Fick's Law of Diffusion ($V_{gas} \propto \frac{A \cdot S \cdot \Delta P}{T \cdot \sqrt{MW}}$), Graham's Law, solubility vs. weight trade-offs, diffusion vs. perfusion limitation, and the physiological mechanisms of severe hypoxemia in minor pulmonary emboli (PE).
- [x] **Module 2.5**: Renal & Glomerular Biophysics (`cell_renal_01.json` - Complete)
  - Ultrafiltration Starling Dynamics: $P_{GC}$ (high/flat), $P_{BS}$, $\pi_{GC}$ filtration concentration, and sizes/charges barrier selectivity.
  - Tubular Transport Mechanics: SGLT1 stoichiometry ($2:1$) thermodynamic optimization, electrogenic NKCC2 paracellular cation absorption ($Ca^{2+}/Mg^{2+}$), ROMK recycling, and ENaC-induced negative lumen excretion (aldosterone-mediated).
  - Perfusion Autoregulation: Stretch myogenic mechanism and Tubuloglomerular Feedback (TGF) (macula densa NKCC2 $\rightarrow$ ATP/adenosine $\rightarrow$ afferent vasoconstriction via $A_1$).
  - Medullary Concentration: Loop countercurrent multiplication (Single Effect, water extraction via AQP-1), urea recycling, and passive vasa recta countercurrent exchange.
  - Hormonal & Acid-Base Cascades: EPO cortical fibroblast oxygen sensing (PHD degradation / HIF-2$\alpha$), ADH $V_2$-$G_s$ aquaporin-2 vesicle exocytosis, NHE3 PCT bicarbonate recovery, and Type A/B intercalated acid excretion/bicarbonate wasting cells.
- [x] **Module 2.6**: Endocrine & Receptor Biophysics (`cell_endocrine_01.json` - Complete)
  - Receptor Cascades: Seven-transmembrane GPCR transduction ($G_s, G_i, G_q$), RTK insulin PI3K/Akt GLUT4 vesicle exocytosis, and Type I/II nuclear receptor HRE chromatin remodeling.
  - Synaptic & VGIC Electrolytes: Nicotinic cation ($Na^+/K^+$ EPP), GABA_A anion ($Cl^-$ shunt), M2-GIRK Chronotropy ($K^+$ flow), S4-sensor physical gating, and H-gate peptide ball inactivation.
  - Signaling & Junctions: Pathological calcium-induced mitochondrial mPTP opening, Cytochrome C / Apaf-1 Caspase-9/3 apoptosome cascade, tight junction claudins/occludins paracellular gate/fence, desmosome cytokeratins/desmoplakin mechanical frame, and VE-cadherin degradation edema.
- [x] **Module 2.7**: Hepatic & Metabolic Biophysics (`cell_hepatic_01.json` - Complete)
  - Cellular Bioenergetics: ETC complexes I-IV electron transport coupling, proton extrusion, and $F_oF_1$-ATP Synthase rotor torque synthesis thermodynamics.
  - Cori Cycle & Lactate Shuttle: MCT4 export / MCT1 import co-transport kinetics ($1:1$ proton link), and Zone 1 gluconeogenesis thermodynamic pathways.
  - Sinusoidal structure-function: Endothelial fenestrations, lack of basement membrane, and the space of Disse.
  - Metabolic Clearance Kinetics: Extraction Ratio ($ER$), Phase I/II pathways, first-principles of perfusion-limited (high $ER$) vs. capacity-limited (low $ER$) drug clearance, and Michaelis-Menten kinetics detailing first-order (concentration-limited) vs. zero-order (enzyme-saturated) elimination dynamics.
- [x] **Layer 2 Verification**: Compile and review completed Layer 2 database.

### 4. Layer 3: Integrative Organ Physiology

- [x] **Module 3.1**: Integrative Cardiovascular Physiology
  - The Cardiac Cycle: Wiggers diagram, pressure-volume loops (preload, afterload, inotropy changes), and coronary blood flow waveforms (LV systolic compression vs. RV continuous flow).
  - Hemodynamic Regulatory Loops: Baroreceptor reflexes (carotid sinus, aortic arch), Bainbridge reflex, Bezold-Jarisch reflex, peripheral chemoreceptors, and the Valsalva Manoeuvre (Phases 1-4).
  - Humoral & Endocrine Control: RAAS pathway, Vasopressin (V1 vs. V2), and Natriuretic Peptides (ANP/BNP).
  - Microcirculation: Starling's forces, capillary filtration coefficient, and glycocalyx barrier mechanics.
- [x] **Module 3.2**: Integrative Respiratory Physiology
  - Ventilation and Perfusion (V/Q): Global vs. regional V/Q matching, West's Zones of the lung, hypoxic pulmonary vasoconstriction (HPV) triggers and blunting, and the physiological Shunt ($Qs/Qt$) and Dead Space ($Vd/Vt$) equations.
  - Gas Transport & Chemical Kinetics: Oxyhaemoglobin Dissociation Curve (OHDC) cooperative binding kinetics (T and R states, Hill coefficient), Carbon Dioxide Dissociation Curve, the molecular Bohr effect, and the Haldane effect.
  - Apneic Oxygenation: High-flow nasal oxygen (HFNO) convective mass flow physics ($VO_2$ vs. $VCO_2$ alveolar excretion volumetric mismatch).
- [x] **Module 3.3**: Integrative Neurophysiology & Pain
  - CBF & ICP Regulation: Cerebral perfusion pressure, autoregulation, chemical CBF modulation, CSF dynamics, Monro-Kellie.
  - Pain Transmission: Sensory transduction, dorsal horn synapses, gate control, and descending pain modulation (opioids).
- [x] **Module 3.4**: Integrative Renal & Acid-Base Physiology
  - GFR & Autoregulation: Starling filtration forces, TGF, renal handling of sodium and potassium (aldosterone/ENaC/ROMK).
  - Acid-Base: Carbonic anhydrase, Type A and B intercalated cells, and Stewart's physical chemical approach.
- [x] **Module 3.5**: Integrative Hepatic & Gastrointestinal Physiology
  - Hepatic Perfusion & Clearance: Dual blood supply, HABR, Phase I/II metabolism, and extraction-ratio-dependent clearance.
  - Bilirubin & GI: Bilirubin conjugation and secretion, parietal cell acid secretion, and intestinal pacemaking (Cajal slow waves).
- [x] **Module 3.6**: Integrative Endocrine & Metabolic Physiology
  - HPA Axis & Thyroid: Cortisol biosynthesis, GR transactivation/transrepression, thyroid hormone NIS/TPO pathways.
  - Calcium & Pancreas: CaSR chief cell feedback, insulin beta-cell glucose sensing, and hypothalamic thermoregulation (UCP-1).
- [x] **Module 3.7**: Integrative Haematological & Immunological Physiology
  - Hematopoiesis & Coagulation: Erythropoiesis (PHD/HIF-2a), hepcidin regulation, cell-based coagulation, and fibrinolysis.
  - Immune & Complement: Innate/adaptive cells and the complement system pathways (MAC assembly and osmotic lysis).
- [x] **Module 3.8**: Integrative Muscle & Neuromuscular Junction Physiology
  - Contraction Mechanics: Sarcomere sliding filament model, E-C coupling (DHPR/RyR1), cross-bridge cycle, and fiber recruitment.
  - NMJ: Quantal transmission, ACh exocytosis (SNARE), postsynaptic nAChR, and EPP.
- [x] **Module 3.9**: Integrative Paediatric & Maternal-Fetal Physiology
  - Pregnancy & Fetus: Maternal adaptations, placental transfer, double Bohr effect, and ion trapping.
  - Transition & Pediatric: Birth transitional circulation shunts closure, pediatric compliance, and heart-rate dependent cardiac output.
