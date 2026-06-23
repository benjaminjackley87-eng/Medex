import { ExamSystem, Examination } from '../../types';

export const paediatricExaminations: Examination[] = [
  {
    id: 'paed-newborn',
    system: ExamSystem.PAEDIATRIC,
    name: 'Newborn Examination (NIPE)',
    shortDescription: 'Comprehensive screening of the neonate within 72 hours to identify congenital abnormalities.',
    keywords: ['nipe', 'newborn', 'neonate', 'reflexes', 'hips', 'red reflex', 'murmur'],
    visualAids: [
      { 
        type: 'video', 
        description: 'NIPE Examination: Systematic head-to-toe assessment of the newborn.',
        source: 'https://picsum.photos/seed/nipeexam/800/450'
      }
    ],
    steps: [
      { 
        id: 'pn1', 
        category: 'General', 
        title: 'General Appearance', 
        description: 'Assess colour (jaundice/cyanosis), tone, and activity. Note any dysmorphic features.', 
        positiveFindings: [
          { description: 'Jaundice <24h (Pathological)' },
          { description: 'Hypotonia (Floppy baby)' },
          { description: 'Central cyanosis' }
        ], 
        negativeFindings: ['Normal tone and colour', 'Pink and active'] 
      },
      { 
        id: 'pn2', 
        category: 'Head', 
        title: 'Eyes & Ears', 
        description: 'Check for red reflex (ophthalmoscope) and inspect ears for position and pits.', 
        positiveFindings: [
          { description: 'Absent red reflex (Cataract / Retinoblastoma)' },
          { description: 'Low-set ears' }
        ], 
        negativeFindings: ['Red reflex present bilaterally', 'Ears normally set'] 
      },
      { 
        id: 'pn3', 
        category: 'CVS', 
        title: 'Heart & Pulses', 
        description: 'Auscultate for murmurs and palpate femoral pulses.', 
        positiveFindings: [
          { description: 'Significant murmur' },
          { description: 'Absent / Weak femoral pulses (Coarctation of Aorta)' }
        ], 
        negativeFindings: ['Normal heart sounds', 'Femoral pulses palpable and equal'] 
      },
      { 
        id: 'pn4', 
        category: 'Hips', 
        title: 'Barlow & Ortolani', 
        description: 'Screen for developmental dysplasia of the hip (DDH). Barlow (dislocate), Ortolani (reduce).', 
        positiveFindings: [{ description: 'Palpable "clunk" (DDH)' }], 
        negativeFindings: ['Hips stable and symmetrical'] 
      },
      { 
        id: 'pn5', 
        category: 'Reflexes', 
        title: 'Primitive Reflexes', 
        description: 'Test Moro, Sucking, and Rooting reflexes.', 
        positiveFindings: [{ description: 'Asymmetrical Moro (Erb\'s palsy / Fracture)' }], 
        negativeFindings: ['Reflexes present and symmetrical'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Developmental Dysplasia of the Hip (DDH)', explanation: 'Positive Barlow/Ortolani, asymmetrical skin folds, limited abduction.' },
      { condition: 'Congenital Heart Disease', explanation: 'Murmur, cyanosis, weak femoral pulses, respiratory distress.' },
      { condition: 'Neonatal Sepsis', explanation: 'Temperature instability, poor feeding, hypotonia, respiratory distress.' }
    ],
    redFlags: [
      'Absent red reflex',
      'Absent femoral pulses',
      'Jaundice < 24 hours',
      'Bile-stained vomiting'
    ],
    onePager: {
      basics: 'Eyes (Red reflex), Heart (Murmurs/Pulses), Hips (Stability), Testes (Descended).',
      normalValues: ['HR: 110-160 bpm', 'RR: 30-60 bpm'],
      redFlags: ['Absent Red Reflex', 'Weak Femoral Pulses', 'Early Jaundice'],
      goldenRules: 'The NIPE is a screening tool; any abnormality requires urgent specialist review.'
    },
    isDraft: false
  },
  {
    id: 'paed-emergency',
    system: ExamSystem.PAEDIATRIC,
    name: 'Emergency Paediatric Assessment',
    shortDescription: 'Rapid primary survey for the acutely unwell child using the Paediatric Assessment Triangle.',
    keywords: ['paediatric emergency', 'abcde', 'wetflag', 'triage', 'resuscitation'],
    steps: [
      { 
        id: 'pe1', 
        category: 'Assessment', 
        title: 'Paediatric Assessment Triangle (PAT)', 
        description: 'Assess Appearance (Tone/Interact), Work of Breathing, and Circulation (Skin color).', 
        positiveFindings: [
          { description: 'Altered mental status / Lethargy' }, 
          { description: 'Increased work of breathing (Recession/Grunting)' },
          { description: 'Pallor / Mottling / Cyanosis' }
        ], 
        negativeFindings: ['Stable PAT (Normal appearance, breathing, and circulation)'] 
      },
      { 
        id: 'pe2', 
        category: 'ABCDE', 
        title: 'Primary Survey', 
        description: 'Airway, Breathing, Circulation, Disability, Exposure.', 
        positiveFindings: [
          { description: 'Stridor / Drooling (Epiglottitis)' }, 
          { description: 'Capillary refill > 2s' },
          { description: 'Bulging fontanelle' }
        ], 
        negativeFindings: ['ABCDE stable'] 
      },
      { 
        id: 'pe3', 
        category: 'WETFLAG', 
        title: 'Resuscitation Calculations', 
        description: 'Weight, Energy, Tube, Fluids, Lorazepam, Adrenaline, Glucose.', 
        positiveFindings: [{ description: 'Calculations completed for age/weight' }], 
        negativeFindings: ['Not required'] 
      }
    ],
    redFlags: [
      'Silent Chest (Severe asthma)',
      'Cyanosis (Hypoxia)',
      'Bradycardia (Late sign of arrest)',
      'Hypotension (Very late sign of shock)',
      'Non-blanching rash (Meningococcaemia)'
    ],
    physiologyBuckets: [
      {
        title: 'Paediatric Differences',
        content: [
          { label: 'Airway', description: 'Larger tongue, higher larynx, narrower subglottis.' },
          { label: 'Breathing', description: 'Horizontal ribs, diaphragm dependent, higher oxygen demand.' },
          { label: 'Circulation', description: 'Stroke volume fixed; cardiac output is heart rate dependent.' }
        ],
        color: 'text-red-600'
      }
    ],
    onePager: {
      basics: 'Appearance (Tone/Interact), Breathing (Work/Rate), Circulation (Color/Pulse).',
      normalValues: ['Weight (kg): (Age + 4) x 2', 'Energy (J): 4J/kg', 'Tube (ETT): (Age/4) + 4'],
      redFlags: ['Silent Chest', 'Cyanosis', 'Bradycardia', 'Non-blanching Rash'],
      goldenRules: 'Children compensate well until they don\'t. A "quiet" sick child is a major red flag.'
    },
    isDraft: false
  },
  {
    id: 'paed-neonatal-fever',
    system: ExamSystem.PAEDIATRIC,
    name: 'Neonatal Fever Assessment',
    shortDescription: 'Evaluation of fever in infants < 28 days old, requiring a full sepsis screen.',
    keywords: ['neonatal fever', 'sepsis', 'meningitis', 'lumbar puncture', 'gbs'],
    steps: [
      { 
        id: 'pnf1', 
        category: 'Assessment', 
        title: 'Clinical Stability', 
        description: 'Assess for lethargy, poor feeding, and respiratory distress.', 
        positiveFindings: [
          { description: 'Bulging fontanelle (Meningitis)' }, 
          { description: 'Grunting / Nasal flaring' },
          { description: 'Temperature > 38°C' }
        ], 
        negativeFindings: ['Infant appears well and active'] 
      },
      { 
        id: 'pnf2', 
        category: 'Investigations', 
        title: 'Sepsis Screen', 
        description: 'FBC, CRP, Blood culture, Urine culture, Lumbar Puncture (LP).', 
        positiveFindings: [{ description: 'Elevated inflammatory markers / CSF pleocytosis' }], 
        negativeFindings: ['Screen initiated'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Neonatal Sepsis', explanation: 'GBS, E. coli, Listeria. High risk in first 28 days.' },
      { condition: 'Meningitis', explanation: 'Fever, bulging fontanelle, irritability, seizures.' },
      { condition: 'UTI', explanation: 'Common cause of occult fever in neonates.' }
    ],
    redFlags: [
      'Temperature > 38°C in infant < 28 days',
      'Bulging fontanelle',
      'Non-blanching rash',
      'Seizures',
      'Lethargy / Poor feeding'
    ],
    isDraft: false
  },
  {
    id: 'paed-children',
    system: ExamSystem.PAEDIATRIC,
    name: 'General Paediatric Examination',
    shortDescription: 'Developmental and clinical assessment of the paediatric patient, focusing on growth and milestones.',
    keywords: ['milestones', 'growth charts', 'paediatrics', 'development'],
    steps: [
      { 
        id: 'pc1', 
        category: 'Growth', 
        title: 'Growth Parameters', 
        description: 'Plot height, weight, and head circumference on centile charts.', 
        positiveFindings: [{ description: 'Crossing centiles downwards (Failure to thrive)' }], 
        negativeFindings: ['Growth along centiles'] 
      },
      { 
        id: 'pc2', 
        category: 'Development', 
        title: 'Developmental Milestones', 
        description: 'Assess gross motor, fine motor, speech, and social domains.', 
        positiveFindings: [{ description: 'Developmental delay in one or more domains' }], 
        negativeFindings: ['Milestones met for age'] 
      }
    ],
    isDraft: false
  }
];
