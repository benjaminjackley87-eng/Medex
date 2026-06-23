import { ExamSystem, Examination } from '../../types';

export const generalExaminations: Examination[] = [
  {
    id: 'general-comprehensive',
    system: ExamSystem.GENERAL,
    name: 'Comprehensive Clinical Assessment',
    shortDescription: 'A systematic head-to-toe clinical evaluation to assess overall health and identify focal abnormalities.',
    keywords: ['head to toe', 'comprehensive', 'physical exam', 'general assessment', 'vitals', 'habitus'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Head-to-Toe Assessment: A systematic approach to the general physical examination.',
        source: 'https://picsum.photos/seed/genexam/800/450'
      }
    ],
    steps: [
      { 
        id: 'gen1', 
        category: 'General', 
        title: 'General Inspection', 
        description: 'Assess habitus (BMI), distress (respiratory/pain), and surroundings (oxygen, monitors, mobility aids).', 
        positiveFindings: [
          { description: 'Cachexia / Malnutrition' }, 
          { description: 'Obesity' },
          { description: 'Acute distress (Pain/Dyspnoea)' },
          { description: 'Jaundice / Cyanosis / Pallor' }
        ], 
        negativeFindings: ['Comfortable at rest', 'No obvious distress', 'Well-nourished'] 
      },
      { 
        id: 'gen2', 
        category: 'Vitals', 
        title: 'Vital Signs', 
        description: 'Measure Temperature, Heart Rate, Blood Pressure, Respiratory Rate, and SpO2.', 
        positiveFindings: [
          { description: 'Fever (>38°C)' },
          { description: 'Tachycardia / Bradycardia' },
          { description: 'Hypertension / Hypotension' },
          { description: 'Tachypnoea (>20 bpm)' },
          { description: 'Hypoxia (SpO2 <94%)' }
        ], 
        negativeFindings: ['Vitals within normal limits'] 
      },
      { 
        id: 'gen3', 
        category: 'Head & Neck', 
        title: 'HEENT Assessment', 
        description: 'Inspect eyes (conjunctival pallor, scleral icterus), mouth (hydration, cyanosis), and neck (JVP, lymph nodes).', 
        positiveFindings: [
          { description: 'Conjunctival pallor (Anaemia)' },
          { description: 'Scleral icterus (Jaundice)' },
          { description: 'Raised JVP (Heart failure)' },
          { description: 'Lymphadenopathy' }
        ], 
        negativeFindings: ['Eyes clear', 'Mucosa moist', 'JVP not raised'] 
      },
      { 
        id: 'gen4', 
        category: 'Systems', 
        title: 'Systematic Screening', 
        description: 'Briefly auscultate heart and lungs, palpate abdomen, and check for peripheral oedema.', 
        positiveFindings: [
          { description: 'Heart murmur' },
          { description: 'Lung crackles / wheeze' },
          { description: 'Abdominal tenderness / masses' },
          { description: 'Pitting oedema' }
        ], 
        negativeFindings: ['Systems screen negative for gross abnormality'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Anaemia', explanation: 'Pallor, tachycardia, conjunctival pallor.' },
      { condition: 'Jaundice', explanation: 'Scleral icterus, dark urine, pale stools (if obstructive).' },
      { condition: 'Dehydration', explanation: 'Dry mucous membranes, reduced skin turgor, tachycardia, hypotension.' }
    ],
    redFlags: [
      'Unexplained weight loss (Malignancy)',
      'New onset confusion / Altered GCS',
      'Severe pain (Unresponsive to simple analgesia)',
      'Signs of sepsis (Fever, tachycardia, hypotension)'
    ],
    onePager: {
      basics: 'General (Habitus/Distress), Vitals (ABCDE), HEENT (Pallor/Jaundice), Systems (Screen).',
      normalValues: ['Temp: 36.5-37.5°C', 'HR: 60-100 bpm', 'BP: 120/80 mmHg', 'RR: 12-20 bpm'],
      redFlags: ['Sepsis', 'Weight Loss', 'Altered GCS'],
      goldenRules: 'Vital signs are the most important part of any clinical assessment.'
    },
    isDraft: false
  }
];
