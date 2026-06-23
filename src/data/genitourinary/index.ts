import { ExamSystem, Examination } from '../../types';

export const genitourinaryExaminations: Examination[] = [
  {
    id: 'gu-male-intimate',
    system: ExamSystem.GENITOURINARY,
    name: 'Male Intimate Examination',
    shortDescription: 'Assessment of the male genitalia and inguinal region for masses, hernias, and skin changes.',
    keywords: ['testicular', 'inguinal hernia', 'scrotum', 'prostate', 'hydrocele', 'varicocele'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Male Genital Exam: Systematic palpation of the scrotum and inguinal canal.',
        source: 'https://picsum.photos/seed/guexam/800/450'
      }
    ],
    steps: [
      { 
        id: 'gum1', 
        category: 'Inspection', 
        title: 'Genital Inspection', 
        description: 'Look for skin changes, ulcers, and swelling. Observe the position of the urethral meatus.', 
        positiveFindings: [
          { description: 'Scrotal swelling' }, 
          { description: 'Penile ulcer (Syphilis/HSV)' },
          { description: 'Hypospadias' }
        ], 
        negativeFindings: ['Normal external genitalia', 'No skin lesions'] 
      },
      { 
        id: 'gum2', 
        category: 'Palpation', 
        title: 'Testicular Palpation', 
        description: 'Palpate each testis, epididymis, and vas deferens. Use two hands.', 
        positiveFindings: [
          { description: 'Hard testicular mass (Malignancy until proven otherwise)' }, 
          { description: 'Epididymal cyst (Separate from testis)' },
          { description: 'Varicocele ("Bag of worms")' },
          { description: 'Hydrocele (Transilluminates)' }
        ], 
        negativeFindings: ['Testes smooth, symmetrical, and non-tender'] 
      },
      { 
        id: 'gum3', 
        category: 'Inguinal', 
        title: 'Inguinal Hernia Screen', 
        description: 'Palpate inguinal canals while patient coughs. Identify the external ring.', 
        positiveFindings: [
          { description: 'Cough impulse present' },
          { description: 'Reducible mass' }
        ], 
        negativeFindings: ['No hernias detected', 'No cough impulse'] 
      },
      { 
        id: 'gum4', 
        category: 'DRE', 
        title: 'Digital Rectal Examination', 
        description: 'Assess prostate size, consistency, and presence of nodules.', 
        positiveFindings: [
          { description: 'Hard, irregular prostate (Malignancy)' },
          { description: 'Smooth, enlarged prostate (BPH)' },
          { description: 'Tender prostate (Prostatitis)' }
        ], 
        negativeFindings: ['Prostate smooth, firm, and non-tender'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Testicular Torsion', explanation: 'Sudden onset pain, high-riding testis, absent cremasteric reflex. Surgical emergency.' },
      { condition: 'Epididymo-orchitis', explanation: 'Gradual onset, fever, dysuria, relief with elevation (Prehn sign).' },
      { condition: 'Inguinal Hernia', explanation: 'Mass that can be "gotten above", cough impulse, reducible.' }
    ],
    redFlags: [
      'Painless hard testicular mass (Malignancy)',
      'Sudden onset severe scrotal pain (Torsion)',
      'Incarcerated or strangulated hernia (Painful, non-reducible)',
      'Gross haematuria'
    ],
    physiologyBuckets: [
      {
        title: 'Anatomy',
        content: [
          { label: 'Inguinal Canal', description: 'Deep ring (mid-inguinal point) to superficial ring (pubic tubercle).' },
          { label: 'Scrotal Layers', description: 'Skin, Dartos, Fascia, Tunica Vaginalis.' }
        ],
        color: 'text-blue-600'
      }
    ],
    patternRecognition: [
      { title: 'Testicular Cancer', description: 'Painless, hard, irregular mass within the testis.', color: 'text-red-600' },
      { title: 'Hydrocele', description: 'Fluctuant, transilluminates, can "get above" it.', color: 'text-blue-600' }
    ],
    workedCases: [
      {
        title: 'Case 1: The Heavy Testis',
        description: '25M, noticed a "heaviness" in the left scrotum. Exam: 2cm hard mass in left testis, does not transilluminate.',
        analysis: 'Impression: Suspected Testicular Malignancy. Urgent ultrasound and referral.'
      }
    ],
    onePager: {
      basics: 'Look (Skin/Swelling), Feel (Testis/Epididymis), Screen (Hernias), DRE (Prostate).',
      normalValues: ['Testis: 15-25ml volume', 'Prostate: Walnut size'],
      redFlags: ['Painless Mass', 'Sudden Pain', 'Strangulated Hernia'],
      goldenRules: 'Any solid testicular mass is cancer until proven otherwise by ultrasound.'
    },
    isDraft: false
  }
];
