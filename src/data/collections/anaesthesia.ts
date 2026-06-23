
export interface AnaesthesiaDrug {
  name: string;
  class: string;
  indications: string[];
  dose: string;
  mechanism: string;
  sideEffects: string[];
  contraindications: string[];
  pearls: string[];
}

export const INDUCTION_AGENTS: AnaesthesiaDrug[] = [
  {
    name: 'Propofol',
    class: 'Intravenous Induction Agent',
    indications: ['Induction and maintenance of general anaesthesia', 'Sedation'],
    dose: '1.5 - 2.5 mg/kg (Induction)',
    mechanism: 'GABA-A receptor agonist, increases chloride conductance',
    sideEffects: ['Hypotension', 'Apnoea', 'Pain on injection', 'PRIS (Propofol Related Infusion Syndrome)'],
    contraindications: ['Hypersensitivity to egg or soy (relative)', 'Severe hypotension'],
    pearls: ['Antiemetic properties', 'Decreases ICP and CPP', 'No analgesic properties']
  },
  {
    name: 'Ketamine',
    class: 'Dissociative Anaesthetic',
    indications: ['Induction', 'Analgesia', 'Sedation'],
    dose: '1 - 2 mg/kg (IV Induction)',
    mechanism: 'NMDA receptor antagonist',
    sideEffects: ['Tachycardia', 'Hypertension', 'Emergence delirium', 'Hypersalivation'],
    contraindications: ['Severe hypertension', 'Raised ICP (controversial)', 'Psychosis'],
    pearls: ['Maintains respiratory drive', 'Bronchodilator', 'Potent analgesic']
  },
  {
    name: 'Etomidate',
    class: 'Carboxylated Imidazole',
    indications: ['Induction in haemodynamically unstable patients'],
    dose: '0.2 - 0.3 mg/kg',
    mechanism: 'GABA-A receptor modulator',
    sideEffects: ['Adrenocortical suppression', 'Myoclonus', 'Pain on injection'],
    contraindications: ['Sepsis (relative due to adrenal suppression)', 'Porphyria'],
    pearls: ['Cardiovascular stability', 'Minimal respiratory depression']
  }
];

export const MUSCLE_RELAXANTS: AnaesthesiaDrug[] = [
  {
    name: 'Suxamethonium',
    class: 'Depolarising Neuromuscular Blocker',
    indications: ['Rapid Sequence Induction (RSI)', 'Short procedures'],
    dose: '1 - 1.5 mg/kg',
    mechanism: 'Nicotinic ACh receptor agonist, causes prolonged depolarisation',
    sideEffects: ['Fasciculations', 'Hyperkalaemia', 'Myalgia', 'Bradycardia (especially in children)'],
    contraindications: ['Malignant Hyperthermia', 'Hyperkalaemia', 'Burns/Denervation (>24h)', 'Pseudocholinesterase deficiency'],
    pearls: ['Rapid onset (30-60s)', 'Short duration (5-10m)', 'Requires refrigeration']
  },
  {
    name: 'Rocuronium',
    class: 'Non-depolarising Neuromuscular Blocker (Aminosteroid)',
    indications: ['Intubation', 'Maintenance of paralysis'],
    dose: '0.6 mg/kg (Standard), 1.2 mg/kg (RSI)',
    mechanism: 'Competitive antagonist at nicotinic ACh receptors',
    sideEffects: ['Anaphylaxis (rare)', 'Prolonged blockade in renal/hepatic failure'],
    contraindications: ['Hypersensitivity'],
    pearls: ['Reversible with Sugammadex', '1.2 mg/kg provides RSI conditions in 60s']
  }
];

export const EMERGENCY_DRUGS: AnaesthesiaDrug[] = [
  {
    name: 'Adrenaline',
    class: 'Sympathomimetic (Alpha & Beta agonist)',
    indications: ['Anaphylaxis', 'Cardiac Arrest', 'Severe Bradycardia'],
    dose: 'Anaphylaxis: 0.5mg IM; Arrest: 1mg IV',
    mechanism: 'Alpha-1, Beta-1, Beta-2 agonist',
    sideEffects: ['Tachycardia', 'Arrhythmias', 'Hypertension', 'Myocardial Ischaemia'],
    contraindications: ['None in life-threatening situations'],
    pearls: ['Potent inotrope and chronotrope', 'Causes bronchodilation']
  },
  {
    name: 'Ephedrine',
    class: 'Sympathomimetic (Indirect & Direct)',
    indications: ['Hypotension (especially post-induction)'],
    dose: '3 - 9 mg boluses IV',
    mechanism: 'Indirectly releases Noradrenaline; Direct Alpha and Beta agonist',
    sideEffects: ['Tachycardia', 'Tachyphylaxis'],
    contraindications: ['Tachycardia'],
    pearls: ['Increases HR and BP', 'Crosses placenta (minimal effect on fetal pH)']
  },
  {
    name: 'Metaraminol',
    class: 'Sympathomimetic (Alpha-1 agonist)',
    indications: ['Hypotension'],
    dose: '0.5 - 1 mg boluses IV',
    mechanism: 'Potent Alpha-1 agonist',
    sideEffects: ['Reflex bradycardia', 'Hypertension'],
    contraindications: ['Hypertension'],
    pearls: ['Pure vasoconstrictor', 'Minimal effect on HR (may decrease)']
  }
];
