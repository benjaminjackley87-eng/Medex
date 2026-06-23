import { ExamSystem, Examination } from '../../types';

export const gastrointestinalExaminations: Examination[] = [
  { 
    id: 'gi-exam', 
    system: ExamSystem.GASTROINTESTINAL, 
    name: 'Gastrointestinal System Examination', 
    shortDescription: 'Abdominal assessment including shifting dullness and organomegaly.', 
    keywords: ['liver', 'spleen', 'bowel sounds', 'jaundice', 'ascites', 'palpation'], 
    visualAids: [
      { 
        type: 'video', 
        description: 'Abdominal Palpation: Demonstrating superficial and deep palpation of the 9 regions.',
        source: 'https://picsum.photos/seed/giexam/800/450'
      },
      { 
        type: 'diagram', 
        description: 'Abdominal Regions and Underlying Organs: Mapping the 9 regions to clinical findings.',
        source: 'https://picsum.photos/seed/gianatomy/800/450'
      }
    ],
    steps: [
      {
        id: 'gi-1',
        category: 'Inspection',
        title: 'Abdominal Inspection',
        description: 'Observe the abdomen for scars, distension, caput medusae, and striae.',
        positiveFindings: [
          { description: 'Caput medusae (Portal Hypertension)' },
          { description: 'Spider naevi (Chronic Liver Disease)' },
          { description: 'Abdominal distension (The 5 Fs: Fat, Fluid, Flatus, Feces, Fetus)' }
        ],
        negativeFindings: ['Abdomen flat and symmetrical', 'No visible scars or masses']
      },
      {
        id: 'gi-5',
        category: 'Palpation',
        title: 'Superficial & Deep Palpation',
        description: 'Palpate all 9 regions. Assess for tenderness, guarding, and rebound. Perform specific maneuvers for appendicitis.',
        positiveFindings: [
          { description: 'Guarding / Rigidity (Peritonitis)' },
          { description: 'Rebound tenderness (Peritonitis)' },
          { description: 'Murphy\'s sign positive (Cholecystitis)' },
          { description: 'McBurney\'s point tenderness (Appendicitis)' },
          { description: 'Rovsing\'s sign (Pain in RIF on LIF palpation - Appendicitis)' },
          { description: 'Psoas sign (Pain on hip extension - Retrocecal appendicitis)' }
        ],
        negativeFindings: ['Soft and non-tender', 'No guarding or rebound', 'Negative appendicitis signs']
      },
      {
        id: 'gi-10',
        category: 'Organomegaly',
        title: 'Liver, Spleen & Kidney Palpation',
        description: 'Palpate from the RIF toward the right costal margin (liver) and left costal margin (spleen). Perform ballottement of the kidneys.',
        positiveFindings: [
          { description: 'Hepatomegaly (Cirrhosis / Malignancy / Heart Failure)' },
          { description: 'Splenomegaly (Portal HTN / Haematological malignancy / Infection)' },
          { description: 'Ballotable kidneys (Polycystic Kidney Disease / Hydronephrosis)' }
        ],
        negativeFindings: ['Liver and spleen not palpable', 'Kidneys not ballotable']
      },
      {
        id: 'gi-15',
        category: 'Percussion',
        title: 'Shifting Dullness',
        description: 'Percuss from the midline to the flank. If dull, have the patient roll and re-percuss.',
        positiveFindings: [
          { description: 'Shifting dullness positive (Ascites)' }
        ],
        negativeFindings: ['No shifting dullness']
      }
    ], 
    differentialDiagnoses: [
      { condition: 'Cirrhosis', explanation: 'Jaundice, spider naevi, caput medusae, hepatomegaly (early) or small liver (late), ascites.' },
      { condition: 'Acute Cholecystitis', explanation: 'RUQ tenderness, positive Murphy\'s sign, fever.' },
      { condition: 'Bowel Obstruction', explanation: 'Distension, tinkling bowel sounds, generalized tenderness.' }
    ],
    redFlags: [
      'Rigid abdomen (Peritonitis)',
      'Haematemesis or melaena',
      'Painless jaundice (Malignancy)',
      'Weight loss + Altered bowel habit'
    ],
    physiologyBuckets: [
      {
        title: 'A) Portal Haemodynamics',
        content: [
          { label: 'Portal Hypertension', description: 'Increased resistance. Leads to Ascites, Varices, Splenomegaly.' },
          { label: 'Synthetic Function', description: 'Liver making proteins (Albumin/Clotting factors). Low in Cirrhosis.' }
        ],
        color: 'text-blue-600'
      },
      {
        title: 'B) Biliary Excretion',
        content: [
          { label: 'Obstruction', description: 'Bile cannot exit. Pale stools, dark urine, itchy skin (Jaundice).' },
          { label: 'Inflammation', description: 'Murphy\'s sign (Gallbladder), McBurney\'s point (Appendix).' }
        ],
        color: 'text-emerald-600'
      }
    ],
    patternRecognition: [
      { title: 'Chronic Liver Disease', description: 'Jaundice, spider naevi, palmar erythema, gynaecomastia, ascites.', color: 'text-blue-600' },
      { title: 'Acute Peritonitis', description: 'Rigid abdomen, guarding, rebound tenderness, absent bowel sounds.', color: 'text-rose-600' },
      { title: 'Bowel Obstruction', description: 'Distension, tinkling bowel sounds, generalized tenderness.', color: 'text-amber-600' }
    ],
    workedCases: [
      {
        title: 'Case 1: The Yellow Patient',
        description: '58F, itchy skin, dark urine. Exam: Jaundice, RUQ mass, non-tender.',
        analysis: 'Impression: Obstructive Jaundice. Rule out pancreatic malignancy (Courvoisier\'s Law).'
      },
      {
        title: 'Case 2: The Tense Abdomen',
        description: '45M, alcoholic, large belly. Exam: Shifting dullness positive, caput medusae.',
        analysis: 'Impression: Portal Hypertension with Ascites. Likely Cirrhosis.'
      }
    ],
    onePager: {
      basics: 'Inspection (Scars/Distension), Palpation (Tenderness/Organs), Percussion (Dullness), Auscultation (Bowel sounds).',
      normalValues: ['Bowel Sounds: Present', 'Liver: <2cm below costal margin', 'Spleen: Not palpable', 'Abdomen: Soft'],
      redFlags: ['Rigidity', 'Haematemesis', 'Painless Jaundice', 'Weight Loss'],
      goldenRules: 'Always ask about pain before you touch. Start palpation furthest from the pain.'
    },
    isDraft: false 
  }
];
