import { ExamSystem, Examination } from '../../types';

export const respiratoryExaminations: Examination[] = [
  {
    id: 'resp-exam',
    system: ExamSystem.RESPIRATORY,
    name: 'Respiratory System Examination',
    shortDescription: 'Comprehensive thoracic assessment focusing on inspection, palpation, and auscultation stigmata.',
    keywords: ['lungs', 'breath sounds', 'asthma', 'copd', 'pneumonia', 'trachea'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Respiratory Examination: Proper technique for chest expansion and percussion.',
        source: 'https://picsum.photos/seed/respexam/800/450'
      },
      { 
        type: 'diagram', 
        description: 'Lung Lobe Anatomy: Anterior and posterior projections for accurate auscultation.',
        source: 'https://picsum.photos/seed/respanatomy/800/450'
      }
    ],
    steps: [
      { 
        id: 'r1', 
        category: 'General inspection', 
        title: 'End-of-Bed Inspection', 
        description: 'Assess breathing effort, use of accessory muscles, and audible sounds (stridor/wheeze). Check for supplemental oxygen and inhalers.',
        positiveFindings: [
          { description: 'Tachypnoea (>20 bpm)' },
          { description: 'Use of accessory muscles (Sternocleidomastoid/Scalene)' },
          { description: 'Pursed-lip breathing (COPD)' },
          { description: 'Intercostal recession (Severe distress)' }
        ],
        negativeFindings: ['Comfortable at rest', 'No supplemental oxygen', 'No audible wheeze']
      },
      { 
        id: 'r5', 
        category: 'Palpation', 
        title: 'Tracheal Position', 
        description: 'Palpate the trachea in the suprasternal notch. Ensure it is central by checking the gap between the trachea and the sternocleidomastoid on each side.',
        positiveFindings: [
          { description: 'Deviation away from lesion (Tension Pneumothorax / Massive Effusion)' },
          { description: 'Deviation toward lesion (Upper Lobe Collapse / Fibrosis)' }
        ],
        negativeFindings: ['Trachea central and non-deviated']
      },
      { 
        id: 'r7', 
        category: 'Palpation', 
        title: 'Chest Expansion', 
        description: 'Place hands on the lower chest wall and observe the distance between thumbs during deep inspiration.',
        positiveFindings: [
          { description: 'Reduced bilateral expansion (COPD / Interstitial Lung Disease)' },
          { description: 'Asymmetrical expansion (Pleural Effusion / Pneumonia / Pneumothorax)' }
        ],
        negativeFindings: ['Symmetrical chest expansion > 5cm']
      },
      { 
        id: 'r8', 
        category: 'Percussion', 
        title: 'Percussion Notes', 
        description: 'Percuss the chest in an "S" pattern, comparing sides. Include supra-clavicular and axillary areas.',
        positiveFindings: [
          { description: 'Dullness (Consolidation / Collapse / Tumour)' },
          { description: 'Stony dullness (Pleural Effusion)' },
          { description: 'Hyper-resonance (Pneumothorax / Emphysema)' }
        ],
        negativeFindings: ['Resonant throughout all lung fields']
      },
      { 
        id: 'r9', 
        category: 'Auscultation', 
        title: 'Auscultation of Lungs', 
        description: 'Listen to breath sounds with the diaphragm while the patient breathes deeply through an open mouth. Compare symmetrical areas.',
        positiveFindings: [
          { description: 'Fine inspiratory crackles (Pulmonary Oedema / Fibrosis)' },
          { description: 'Coarse crackles (Pneumonia / Bronchiectasis)' },
          { description: 'Expiratory wheeze (Asthma / COPD)' },
          { description: 'Bronchial breathing (Consolidation)' },
          { description: 'Pleural rub (Pleurisy)' }
        ],
        negativeFindings: ['Normal vesicular breath sounds', 'No added sounds']
      }
    ],
    differentialDiagnoses: [
      { condition: 'Pneumonia', explanation: 'Dull percussion, bronchial breathing, coarse crackles, increased vocal resonance.' },
      { condition: 'Pleural Effusion', explanation: 'Stony dull percussion, absent breath sounds, reduced expansion on affected side.' },
      { condition: 'Pneumothorax', explanation: 'Hyper-resonant percussion, absent breath sounds, tracheal deviation (if tension).' }
    ],
    redFlags: [
      'Tracheal deviation (Tension Pneumothorax)',
      'Silent chest in acute asthma',
      'Stridor (Upper airway obstruction)',
      'Massive haemoptysis'
    ],
    physiologyBuckets: [
      {
        title: 'A) Ventilation (Airflow)',
        content: [
          { label: 'Obstruction', description: 'Difficulty getting air OUT. FEV1/FVC < 0.7 (Asthma/COPD).' },
          { label: 'Restriction', description: 'Difficulty getting air IN. Reduced TLC (Fibrosis/Chest wall).' }
        ],
        color: 'text-blue-600'
      },
      {
        title: 'B) Diffusion (Gas Exchange)',
        content: [
          { label: 'V/Q Mismatch', description: 'Perfusion without ventilation (Shunt) or vice versa (Dead space).' },
          { label: 'Membrane Thickening', description: 'Reduced DLCO (Interstitial Lung Disease).' }
        ],
        color: 'text-emerald-600'
      }
    ],
    patternRecognition: [
      { title: 'Consolidation', description: 'Dull percussion, bronchial breathing, increased vocal resonance.', color: 'text-blue-600' },
      { title: 'Pleural Effusion', description: 'Stony dullness, absent breath sounds, reduced expansion.', color: 'text-emerald-600' },
      { title: 'Pneumothorax', description: 'Hyper-resonance, absent breath sounds, tracheal deviation (if tension).', color: 'text-amber-600' }
    ],
    workedCases: [
      {
        title: 'Case 1: The Productive Cough',
        description: '65M, fever, rusty sputum. Exam: RR 24, dullness at right base, bronchial breathing.',
        analysis: 'Impression: Lobar Pneumonia. Needs CXR and CURB-65 assessment.'
      },
      {
        title: 'Case 2: The Sudden Pleurisy',
        description: '24F, sudden sharp chest pain. Exam: Hyper-resonant left chest, absent breath sounds.',
        analysis: 'Impression: Spontaneous Pneumothorax. Check for tracheal deviation (Tension).'
      }
    ],
    onePager: {
      basics: 'Inspection (Effort), Palpation (Trachea/Expansion), Percussion (Notes), Auscultation (Sounds).',
      normalValues: ['RR: 12-20 bpm', 'SpO2: >94% (or 88-92% in COPD)', 'Trachea: Central', 'Expansion: Symmetrical'],
      redFlags: ['Tracheal Deviation', 'Silent Chest', 'Stridor', 'Haemoptysis'],
      goldenRules: 'Always compare left to right. Asymmetry is the hallmark of focal pathology.'
    },
    isDraft: false
  }
];
