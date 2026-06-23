import { ExamSystem, Examination } from '../../types';

export const acuteCareExaminations: Examination[] = [
  { 
    id: 'acute-abcde', 
    system: ExamSystem.ACUTE_CARE, 
    name: 'ABCDE Assessment', 
    shortDescription: 'The primary survey for the rapid assessment and stabilization of the acutely ill or injured patient.', 
    keywords: ['emergency', 'resuscitation', 'triage', 'primary survey', 'osce'],
    visualAids: [
      { 
        type: 'video', 
        description: 'ABCDE Assessment: Systematic approach to the critically unwell patient.',
        source: 'https://picsum.photos/seed/abcde/800/450'
      }
    ],
    steps: [
      {
        id: 'abcde-a',
        category: 'A',
        title: 'Airway & C-Spine',
        description: 'Assess patency. Is the patient talking? Look for obstruction (stridor, secretions, foreign body). Maintain C-spine if trauma.',
        positiveFindings: [
          { description: 'Stridor (Upper airway obstruction)' },
          { description: 'Gurgling (Secretions / Vomit)' },
          { description: 'See-saw breathing (Complete obstruction)' }
        ],
        negativeFindings: ['Airway patent', 'Patient speaking in full sentences']
      },
      {
        id: 'abcde-b',
        category: 'B',
        title: 'Breathing & Ventilation',
        description: 'Assess RR, SpO2, chest expansion, percussion, and auscultation. Look for tracheal deviation.',
        positiveFindings: [
          { description: 'Tachypnoea > 25 bpm' },
          { description: 'SpO2 < 92% on high-flow O2' },
          { description: 'Tracheal deviation (Tension Pneumothorax)' },
          { description: 'Silent chest (Severe asthma)' }
        ],
        negativeFindings: ['RR 12-20 bpm', 'SpO2 94-98%', 'Vesicular breath sounds']
      },
      {
        id: 'abcde-c',
        category: 'C',
        title: 'Circulation & Haemorrhage',
        description: 'Assess HR, BP, CRT, peripheral temperature, and JVP. Look for external bleeding.',
        positiveFindings: [
          { description: 'Hypotension (SBP < 90 mmHg)' },
          { description: 'Tachycardia (HR > 100 bpm)' },
          { description: 'CRT > 2s (Shock)' },
          { description: 'Cold, clammy peripheries' }
        ],
        negativeFindings: ['HR 60-100 bpm', 'BP 120/80 mmHg', 'CRT < 2s']
      },
      {
        id: 'abcde-d',
        category: 'D',
        title: 'Disability / Neurology',
        description: 'Assess GCS or AVPU. Check pupils (size, symmetry, reaction). Check blood glucose.',
        positiveFindings: [
          { description: 'GCS < 8 (Needs airway protection)' },
          { description: 'Hypoglycaemia (< 4 mmol/L)' },
          { description: 'Unequal pupils (Raised ICP / Herniation)' }
        ],
        negativeFindings: ['Alert (AVPU)', 'GCS 15', 'Pupils equal and reactive']
      },
      {
        id: 'abcde-e',
        category: 'E',
        title: 'Exposure & Environment',
        description: 'Full top-to-toe inspection. Look for rashes, wounds, or calves (DVT). Maintain dignity and prevent hypothermia.',
        positiveFindings: [
          { description: 'Non-blanching rash (Meningococcal sepsis)' },
          { description: 'Abdominal bruising (Internal haemorrhage)' },
          { description: 'Hypothermia (< 35°C)' }
        ],
        negativeFindings: ['No obvious injuries', 'Temperature 36.5-37.5°C']
      }
    ], 
    differentialDiagnoses: [
      { condition: 'Sepsis', explanation: 'Fever/Hypothermia, tachycardia, hypotension, high lactate, source of infection.' },
      { condition: 'Tension Pneumothorax', explanation: 'Acute dyspnoea, tracheal deviation, absent breath sounds, hypotension.' },
      { condition: 'Hypovolaemic Shock', explanation: 'Tachycardia, hypotension, flat JVP, cold peripheries, history of bleeding/fluid loss.' }
    ],
    redFlags: [
      'Airway obstruction (Stridor/Gurgling)',
      'Respiratory rate > 30 or < 8',
      'Systolic BP < 90 mmHg',
      'GCS < 8 (Protect the airway)',
      'Lactate > 4 mmol/L'
    ],
    onePager: {
      basics: 'A (Airway), B (Breathing), C (Circulation), D (Disability), E (Exposure).',
      normalValues: ['RR: 12-20', 'HR: 60-100', 'SBP: >90', 'GCS: 15', 'Glucose: 4-7'],
      redFlags: ['Stridor', 'Hypotension', 'GCS < 8', 'High Lactate'],
      goldenRules: 'Treat life-threats as you find them before moving to the next letter.'
    },
    isDraft: false 
  },
  {
    id: 'acute-sepsis',
    system: ExamSystem.ACUTE_CARE,
    name: 'Sepsis Assessment & Management',
    shortDescription: 'Rapid identification and treatment of sepsis using the Sepsis Six bundle.',
    keywords: ['sepsis', 'qsofa', 'sepsis six', 'infection', 'lactate'],
    steps: [
      { 
        id: 'sep1', 
        category: 'Screening', 
        title: 'Red Flag Sepsis', 
        description: 'Assess for: RR >= 22, Altered mentation, SBP <= 100, Lactate > 2, Non-blanching rash.', 
        positiveFindings: [{ description: 'Lactate > 2' }, { description: 'qSOFA score >= 2' }], 
        negativeFindings: ['No red flags', 'qSOFA 0'] 
      },
      { 
        id: 'sep2', 
        category: 'Management', 
        title: 'The Sepsis Six', 
        description: 'Give: 1. Oxygen, 2. IV Fluids, 3. IV Antibiotics. Take: 4. Blood Cultures, 5. Lactate, 6. Urine Output.', 
        positiveFindings: [{ description: 'All 6 completed within 1 hour' }], 
        negativeFindings: ['Not septic'] 
      }
    ],
    isDraft: false
  }
];
