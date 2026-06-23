import { ExamSystem, Examination } from '../../types';

export const specialtyExaminations: Examination[] = [
  {
    id: 'specialty-frailty',
    system: ExamSystem.SPECIALTY,
    name: 'Frailty Assessment',
    shortDescription: 'Evaluation of physiological reserve and vulnerability in older adults using the Clinical Frailty Scale.',
    keywords: ['frailty', 'rockwood', 'geriatrics', 'comorbidities', 'functional decline'],
    visualAids: [
      { 
        type: 'diagram', 
        description: 'Clinical Frailty Scale (CFS): Visual guide from 1 (Very Fit) to 9 (Terminally Ill).',
        source: 'https://picsum.photos/seed/frailty/800/450'
      }
    ],
    steps: [
      { 
        id: 'fr1', 
        category: 'Assessment', 
        title: 'Clinical Frailty Scale (CFS)', 
        description: 'Assess the patient\'s level of fitness and dependence on others for activities of daily living (ADLs).', 
        positiveFindings: [
          { description: 'CFS 5 (Mildly Frail): Needs help with high-order ADLs (finances, heavy housework).' },
          { description: 'CFS 6 (Moderately Frail): Needs help with outdoor activities and light housework.' },
          { description: 'CFS 7 (Severely Frail): Completely dependent for personal care.' }
        ], 
        negativeFindings: ['CFS 1 (Very Fit)', 'CFS 2 (Well)', 'CFS 3 (Managing Well)'] 
      },
      { 
        id: 'fr2', 
        category: 'Functional', 
        title: 'Timed Up and Go (TUG) Test', 
        description: 'Time taken to stand from a chair, walk 3 metres, turn, and sit back down.', 
        positiveFindings: [{ description: 'TUG > 12 seconds (Increased falls risk)' }], 
        negativeFindings: ['TUG < 10 seconds'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Sarcopenia', explanation: 'Loss of muscle mass and strength, often a component of frailty.' },
      { condition: 'Malnutrition', explanation: 'Weight loss and weakness contributing to physiological vulnerability.' }
    ],
    redFlags: [
      'Recent falls',
      'Sudden functional decline',
      'Unexplained weight loss',
      'Polypharmacy (>5 medications)'
    ],
    onePager: {
      basics: 'CFS (1-9), TUG Test, Functional ADLs, Comorbidities.',
      normalValues: ['CFS: 1-3', 'TUG: <10s'],
      redFlags: ['Falls', 'Functional Decline', 'Weight Loss'],
      goldenRules: 'Frailty is a dynamic state; early intervention can prevent further decline.'
    },
    isDraft: false
  },
  {
    id: 'specialty-mmse',
    system: ExamSystem.SPECIALTY,
    name: 'Mini-Mental State Examination (MMSE)',
    shortDescription: 'A widely used 30-point questionnaire to screen for cognitive impairment and dementia.',
    keywords: ['mmse', 'cognition', 'dementia', 'alzheimer', 'memory', 'orientation'],
    steps: [
      { 
        id: 'mm1', 
        category: 'Orientation', 
        title: 'Time & Place', 
        description: 'Ask for year, season, date, day, month; and state, country, town, hospital, floor.', 
        positiveFindings: [{ description: 'Disorientation to time or place' }], 
        negativeFindings: ['Fully oriented (10/10)'] 
      },
      { 
        id: 'mm2', 
        category: 'Registration', 
        title: 'Three Objects', 
        description: 'Name three objects and ask the patient to repeat them.', 
        positiveFindings: [{ description: 'Inability to register all three objects' }], 
        negativeFindings: ['Registration intact (3/3)'] 
      },
      { 
        id: 'mm3', 
        category: 'Attention', 
        title: 'Serial 7s', 
        description: 'Subtract 7 from 100, then 7 from that, for 5 iterations. Alternatively, spell "WORLD" backwards.', 
        positiveFindings: [{ description: 'Errors in calculation or spelling' }], 
        negativeFindings: ['Attention intact (5/5)'] 
      },
      { 
        id: 'mm4', 
        category: 'Recall', 
        title: 'Delayed Recall', 
        description: 'Ask for the three objects named earlier.', 
        positiveFindings: [{ description: 'Inability to recall objects' }], 
        negativeFindings: ['Recall intact (3/3)'] 
      },
      { 
        id: 'mm5', 
        category: 'Language', 
        title: 'Naming & Commands', 
        description: 'Name a pencil and watch. Repeat a phrase. Follow a 3-stage command. Read and obey "Close your eyes". Write a sentence. Copy a design.', 
        positiveFindings: [{ description: 'Errors in language or praxis' }], 
        negativeFindings: ['Language intact (9/9)'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Delirium', explanation: 'Acute onset, fluctuating course, impaired attention (unlike dementia).' },
      { condition: 'Depression (Pseudodementia)', explanation: 'Patient often says "I don\'t know", inconsistent effort.' },
      { condition: 'Alzheimer\'s Disease', explanation: 'Progressive memory loss, disorientation, language impairment.' }
    ],
    redFlags: [
      'Acute onset (Suggests Delirium)',
      'Focal neurological deficits',
      'Rapidly progressive cognitive decline',
      'Visual hallucinations (Suggests Lewy Body Dementia)'
    ],
    onePager: {
      basics: 'Orientation, Registration, Attention, Recall, Language.',
      normalValues: ['Score: 24-30'],
      redFlags: ['Acute Onset', 'Focal Deficits', 'Hallucinations'],
      goldenRules: 'MMSE is a screening tool, not a diagnostic one. Consider educational level.'
    },
    isDraft: false
  }
];
