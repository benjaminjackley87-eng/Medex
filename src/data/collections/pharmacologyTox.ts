export interface ATODItem {
  category: string;
  substances: string;
  presentation: string;
  management: string;
  withdrawal: string;
}

export interface AgitationItem {
  class: string;
  medications: string;
  indications: string;
  dosage: string;
  pros: string;
  cons: string;
}

export interface ToxidromeItem {
  name: string;
  features: string;
  examination: string;
  findings: string;
  causes: string;
  investigations: string;
  management: string;
}

export const ATODS_DATA: ATODItem[] = [
  {
    category: 'Opioids',
    substances: 'Heroin, Fentanyl, Oxycodone, Morphine',
    presentation: 'Pinpoint pupils, respiratory depression, bradycardia, hypotension, decreased level of consciousness.',
    management: 'Airway support, Naloxone (0.4mg - 2mg IV/IM/SC), repeat as needed. Monitor for rebound toxicity.',
    withdrawal: 'COWS score assessment. Buprenorphine or Methadone titration. Adjuncts: Clonidine, anti-emetics, simple analgesia.'
  },
  {
    category: 'Stimulants',
    substances: 'Methamphetamine (Ice), Cocaine, MDMA',
    presentation: 'Mydriasis, tachycardia, hypertension, hyperthermia, agitation, psychosis, diaphoresis.',
    management: 'Benzodiazepines (Diazepam 5-10mg) for agitation/seizures. Cooling for hyperthermia. Avoid beta-blockers.',
    withdrawal: 'Supportive care, sleep, hydration. Monitor for depression/suicidal ideation.'
  },
  {
    category: 'Benzodiazepines',
    substances: 'Diazepam, Alprazolam, Temazepam',
    presentation: 'Ataxia, slurred speech, CNS depression with relatively stable vitals (unless co-ingested).',
    management: 'Supportive care, airway protection. Flumazenil (rarely used due to seizure risk in chronic users).',
    withdrawal: 'Gradual taper (usually switching to long-acting Diazepam). Risk of seizures and Delirium Tremens.'
  },
  {
    category: 'Alcohol',
    substances: 'Ethanol',
    presentation: 'Ataxia, slurred speech, disinhibition, CNS depression, respiratory depression in severe cases.',
    management: 'Supportive care, hydration, Thiamine (prevent Wernicke\'s). Monitor for hypoglycemia.',
    withdrawal: 'AWS score. Diazepam loading or scheduled doses. Thiamine (IV/IM). Monitor for DTs and seizures.'
  }
];

export const AGITATION_MANAGEMENT: AgitationItem[] = [
  {
    class: 'Benzodiazepines',
    medications: 'Diazepam, Midazolam, Lorazepam',
    indications: 'First-line for alcohol/sedative withdrawal, stimulant toxicity, or undifferentiated agitation.',
    dosage: 'Diazepam: 5-10mg PO/IV. Midazolam: 2.5-5mg IV/IM. Lorazepam: 1-2mg PO/IV.',
    pros: 'Rapid onset (especially Midazolam), anticonvulsant properties, reliable sedation.',
    cons: 'Respiratory depression, hypotension, paradoxical agitation (rare), long half-life (Diazepam).'
  },
  {
    class: 'Alcohol Withdrawal (ETOH) - Benzo Plan',
    medications: 'Diazepam (Symptom-Triggered)',
    indications: 'Management of acute alcohol withdrawal syndrome (AWS).',
    dosage: 'AWS < 10: Monitor. AWS 10-14: Diazepam 5-10mg PO. AWS 15-20: Diazepam 10-20mg PO. AWS > 20: Diazepam 20mg PO + Consider IV.',
    pros: 'Prevents seizures and Delirium Tremens (DTs). Symptom-triggered dosing reduces total benzo requirement.',
    cons: 'Requires frequent monitoring (AWS/CIWA scores). Risk of over-sedation in liver failure (consider Oxazepam).'
  },
  {
    class: 'Antipsychotics (Typical)',
    medications: 'Haloperidol, Droperidol',
    indications: 'Acute psychosis, severe agitation where benzos are insufficient or contraindicated.',
    dosage: 'Droperidol: 2.5-5mg IV/IM. Haloperidol: 2.5-5mg IV/IM.',
    pros: 'Droperidol has rapid onset and less respiratory depression than benzos.',
    cons: 'Extrapyramidal side effects (EPS), QTc prolongation, Neuroleptic Malignant Syndrome (NMS).'
  },
  {
    class: 'Antipsychotics (Atypical)',
    medications: 'Olanzapine (Wafer/IM), Quetiapine, Risperidone',
    indications: 'Mild to moderate agitation, known psychiatric history, long-term management.',
    dosage: 'Olanzapine: 5-10mg PO/IM. Quetiapine: 25-50mg PO. Risperidone: 0.5-1mg PO.',
    pros: 'Lower risk of EPS than typicals, better tolerated for oral loading.',
    cons: 'Olanzapine IM should NOT be given within 2 hours of parenteral benzos (risk of fatal hypotension/resp depression).'
  },
  {
    class: 'Atypical / Adjunctive',
    medications: 'Clonidine, Dexmedetomidine',
    indications: 'Hyperactive delirium, sympathetic surge, adjunct in withdrawal states.',
    dosage: 'Clonidine: 75-150mcg PO TDS. Dexmedetomidine: 0.2-1.4mcg/kg/hr IV infusion.',
    pros: 'Reduces sympathetic drive without significant respiratory depression.',
    cons: 'Bradycardia, hypotension. Clonidine has slow onset (PO). Dexmedetomidine usually requires ICU/HDU monitoring.'
  },
  {
    class: 'Ketamine',
    medications: 'Ketamine (IM/IV)',
    indications: 'Severe, life-threatening agitation ("Excited Delirium") where immediate control is required for safety.',
    dosage: 'IM: 4-5mg/kg (Rapid control). IV: 1-2mg/kg (Slow push).',
    pros: 'Extremely rapid dissociation, maintains airway reflexes and respiratory drive.',
    cons: 'Emergence phenomena, hypotension, tachycardia, requires advanced airway skills available.'
  }
];

export const TOXIDROMES_DATA: ToxidromeItem[] = [
  {
    name: 'Anticholinergic',
    features: 'Tachycardia, Mydriasis, DRY skin, Urinary retention, Delirium.',
    examination: '1. Vitals: Tachycardia, Hyperthermia. 2. Eyes: Mydriasis. 3. Skin: Dry, flushed, hot. 4. GI: Absent bowel sounds. 5. GU: Palpable bladder (retention). 6. CNS: Delirium, "picking" behavior.',
    findings: 'Classic: "Mad as a hatter, dry as a bone, red as a beet, blind as a bat, hot as a hare".',
    causes: 'Atropine, Antihistamines, TCAs, Scopolamine, Jimson weed.',
    investigations: 'BSL, ECG (QRS/QTc), Paracetamol/Salicylate screen, U&E, VBG.',
    management: '1. Supportive care. 2. Sedation: Diazepam 5-10mg IV for agitation/seizures. 3. Active cooling if >39°C. 4. Urinary catheterization. 5. Physostigmine (rare - tox consult required).'
  },
  {
    name: 'Cholinergic',
    features: 'SLUDGE (Salivation, Lacrimation, Urination, Defecation, Emesis), Bradycardia, Pinpoint pupils.',
    examination: '1. Vitals: bradycardia, hypotension. 2. Eyes: Miosis (pinpoint). 3. Resp: Bronchorrhoea/Bronchospasm (wheeze). 4. GI: Hyperactive sounds, emesis. 5. Neuro: Fasciculations, weakness.',
    findings: 'DUMBELS: Diaphoresis/Diarrhoea, Urination, Miosis, Bradycardia, Emesis, Lacrimation, Salivation.',
    causes: 'Organophosphates, Carbamates, Nerve agents, Pilocarpine.',
    investigations: 'BSL, ECG, RBC Cholinesterase level, U&E, LFTs, CXR.',
    management: '1. Decontamination First (PPE!). 2. Airway support/suctioning. 3. Atropine: Titrate to dry secretions. 4. Pralidoxime (2-PAM). 5. Benzos for seizures.'
  },
  {
    name: 'Sympathomimetic',
    features: 'Tachycardia, Hypertension, Mydriasis, DIAPHORESIS (wet skin).',
    examination: '1. Vitals: Tachycardia, Hypertension, Hyperthermia. 2. Eyes: Mydriasis. 3. Skin: Profuse diaphoresis (distinguishes from anticholinergic). 4. Neuro: Tremor, hyperreflexia, agitation.',
    findings: 'Sympathetic surge: Everything is high/fast, but skin is WET.',
    causes: 'Cocaine, Amphetamines (Ice), MDMA, Ephedrine.',
    investigations: 'BSL, ECG (ischaemia), Troponin, CK (rhabdomyolysis), U&E (renal function), CT Head (if focal Neuro).',
    management: '1. Benzos: Aggressive titration (Diazepam 5-10mg IV). 2. Cooling: Evaporative cooling, fans. 3. Fluid resuscitation. 4. Hypertension: GTN or Phentolamine. AVOID BETA-BLOCKERS.'
  },
  {
    name: 'Opioid',
    features: 'Miosis, Respiratory depression, CNS depression.',
    examination: '1. Vitals: Bradypnoea (RR < 12), Bradycardia, Hypotension. 2. Eyes: Pinpoint pupils (miosis). 3. Neuro: CNS depression/Coma. 4. Skin: Track marks, cool/clammy.',
    findings: 'Opioid Triad: Pinpoint pupils, Respiratory depression, Coma.',
    causes: 'Heroin, Morphine, Fentanyl, Oxycodone, Methadone.',
    investigations: 'BSL, Paracetamol level, VBG (pCO2), CXR (non-cardiogenic pulmonary oedema), ECG.',
    management: '1. Airway support (BVM). 2. Naloxone: 0.4mg - 2mg IV/IM. Titrate to RR > 10, not full consciousness.'
  },
  {
    name: 'Serotonin Syndrome',
    features: 'Tremor, Clonus, Hyperreflexia, Autonomic instability.',
    examination: '1. Autonomic: Tachycardia, diaphoresis, hyperthermia. 2. Neuro: Clonus (especially lower limbs), Hyperreflexia, Tremor. 3. CNS: Agitation, confusion.',
    findings: 'Classic Triad: Altered mental status, Autonomic hyperactivity, Neuromuscular excitation.',
    causes: 'SSRIs, SNRIs, MAOIs, TCAs, Tramadol, MDMA.',
    investigations: 'BSL, CK, U&E, ECG.',
    management: '1. Stop all serotonergics. 2. Supportive care. 3. Benzos for agitation. 4. Cooling. 5. Cyproheptadine (tox consult).'
  },
  {
    name: 'Sedative-Hypnotic',
    features: 'CNS depression, Ataxia, Slurred speech, Vitals often stable.',
    examination: '1. Vitals: Usually stable (unless severe). 2. Eyes: Nystagmus. 3. Neuro: Slurred speech, ataxia, CNS depression. 4. Skin: Normal.',
    findings: 'Intoxication pattern: Slurred speech, ataxia, nystagmus with stable vitals.',
    causes: 'Benzodiazepines, Barbiturates, Z-drugs, Alcohol.',
    investigations: 'BSL, ECG, Paracetamol level, Screen for co-ingestants.',
    management: '1. Supportive care. 2. Airway protection (if GCS low). 3. Flumazenil (Rarely indicated, usually avoided due to seizure risk).'
  },
  {
    name: 'Beta-Blocker / CCB Toxicity',
    features: 'Profound bradycardia, hypotension, cardiogenic shock, conduction block, and metabolic acidosis. Hyperglycaemia is classic for CCB toxicity, while BB toxicity causes hypoglycaemia/euglycaemia.',
    examination: '1. Vitals: Severe bradycardia, hypotension, hypothermia, slow capillary refill. 2. Neuro: Preserved consciousness initially in CCB shock vs early coma/seizures in lipophilic BB (propranolol) toxicity.',
    findings: 'Inhibition of L-type calcium channels on pancreatic islet cells by CCBs prevents insulin release, leading to severe hyperglycaemia and lactate accumulation.',
    causes: 'Beta-blockers (Propranolol, Metoprolol, Atenolol), Calcium Channel Blockers (Verapamil, Diltiazem, Amlodipine).',
    investigations: 'Serial BSL (hourly), ECG (bradyarrhythmias, junctional rhythm, QRS/QT prolongation), Electrolytes (frequent Potassium), ABG/VBG (metabolic acidosis).',
    management: '1. First-line: Fluid bolus, IV Calcium (Gluconate 3-6g or Chloride 1-2g), Atropine 0.6-1.2mg. 2. High-Dose Insulin (HIET): 1 U/kg IV regular insulin bolus + D50W 50mL. Follow with 1 U/kg/hr regular insulin infusion (titrated up to 10 U/kg/hr). Maintain euglycaemia with D10W/D50W infusion to target BSL 5-8 mmol/L. Keep potassium 3.5-4.5 mmol/L (do not aggressively correct mild hypokalaemia as it is an intracellular shift, not true depletion).'
  },
  {
    name: 'Tricyclic Antidepressant (TCA) Toxicity',
    features: 'Anticholinergic signs (mydriasis, dry skin, delirium) progressing rapidly to sodium channel blockade (QRS widening, arrhythmias) and CNS toxicity (seizures, coma).',
    examination: '1. Vitals: Tachycardia, hypotension, hyperthermia. 2. Eyes: Mydriasis. 3. Neuro: Rapid onset of coma, hyperreflexia, myoclonus, seizures. 4. Skin: Flushed, dry skin.',
    findings: 'ECG Risk-Stratification: QRS duration > 100 ms predicts seizures (Sens ~33%, Spec ~80%); QRS > 160 ms predicts ventricular arrhythmias (Sens ~50%, Spec ~85%). Terminal R-wave in aVR > 3 mm (or R/S ratio in aVR > 0.7).',
    causes: 'Amitriptyline, Nortriptyline, Clomipramine, Doxepin, Imipramine.',
    investigations: '12-lead ECG (essential, repeat hourly or if clinical status changes), BSL, VBG/ABG (pH monitoring), Electrolytes.',
    management: '1. Sodium Bicarbonate: Indicated if QRS > 100 ms, terminal R in aVR > 3 mm, refractory hypotension, or ventricular dysrhythmias. Dose: 1-2 mmol/kg (8.4% NaHCO3) IV boluses, repeated to narrow the QRS (< 100 ms) and achieve arterial pH 7.45 - 7.55. 2. Seizures: Benzos first-line. AVOID Phenytoin (class Ib sodium channel blocker; worsens cardiotoxicity). 3. Airway: Intubation for coma/seizures; hyperventilate to maintain pH 7.45-7.50.'
  }
];
