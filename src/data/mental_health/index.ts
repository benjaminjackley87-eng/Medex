import { ExamSystem, Examination } from '../../types';

export const mentalHealthExaminations: Examination[] = [
  {
    id: 'mental-mse',
    system: ExamSystem.MENTAL_HEALTH,
    name: 'Mental State Examination (MSE)',
    shortDescription: 'A structured assessment of a patient\'s current state of mind and psychiatric symptoms.',
    keywords: ['mse', 'psychiatry', 'mood', 'affect', 'insight', 'hallucinations', 'delusions'],
    visualAids: [
      { 
        type: 'video', 
        description: 'MSE Interview: Techniques for assessing mood, affect, and thought content.',
        source: 'https://picsum.photos/seed/mseexam/800/450'
      }
    ],
    steps: [
      { 
        id: 'mse1', 
        category: 'ASEPTIC', 
        title: 'Appearance & Behaviour', 
        description: 'Observe grooming, eye contact, rapport, and psychomotor activity.', 
        positiveFindings: [
          { description: 'Dishevelled appearance (Self-neglect)' },
          { description: 'Psychomotor agitation / retardation' },
          { description: 'Poor eye contact' }
        ], 
        negativeFindings: ['Well-groomed', 'Appropriate eye contact', 'Normal psychomotor activity'] 
      },
      { 
        id: 'mse2', 
        category: 'ASEPTIC', 
        title: 'Speech', 
        description: 'Assess rate, volume, and quantity of speech.', 
        positiveFindings: [
          { description: 'Pressured speech (Mania)' },
          { description: 'Poverty of speech (Depression/Schizophrenia)' },
          { description: 'Dysarthria' }
        ], 
        negativeFindings: ['Normal rate, volume, and flow'] 
      },
      { 
        id: 'mse3', 
        category: 'ASEPTIC', 
        title: 'Emotion (Mood & Affect)', 
        description: 'Subjective mood (patient\'s report) and objective affect (observed).', 
        positiveFindings: [
          { description: 'Flat or blunted affect' },
          { description: 'Labile affect' },
          { description: 'Incongruent affect' }
        ], 
        negativeFindings: ['Euthymic mood', 'Reactive and congruent affect'] 
      },
      { 
        id: 'mse4', 
        category: 'ASEPTIC', 
        title: 'Perception', 
        description: 'Screen for hallucinations (auditory, visual, etc.) and illusions.', 
        positiveFindings: [
          { description: 'Auditory hallucinations (Command/Third-person)' },
          { description: 'Visual hallucinations' }
        ], 
        negativeFindings: ['No perceptual disturbances'] 
      },
      { 
        id: 'mse5', 
        category: 'ASEPTIC', 
        title: 'Thought (Content & Form)', 
        description: 'Assess for delusions, obsessions, and formal thought disorder (e.g., flight of ideas).', 
        positiveFindings: [
          { description: 'Delusions (Persecutory/Grandiose)' },
          { description: 'Suicidal / Homicidal ideation' },
          { description: 'Flight of ideas / Loosening of associations' }
        ], 
        negativeFindings: ['No delusions', 'No suicidal ideation', 'Linear thought process'] 
      },
      { 
        id: 'mse6', 
        category: 'ASEPTIC', 
        title: 'Insight & Judgement', 
        description: 'Does the patient understand they are unwell? Can they make reasonable decisions?', 
        positiveFindings: [{ description: 'Lack of insight' }], 
        negativeFindings: ['Good insight and judgement'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Major Depressive Disorder', explanation: 'Low mood, anhedonia, psychomotor retardation, poverty of speech.' },
      { condition: 'Bipolar Affective Disorder', explanation: 'Periods of mania (pressured speech, grandiose delusions) and depression.' },
      { condition: 'Schizophrenia', explanation: 'Auditory hallucinations, delusions, formal thought disorder, flat affect.' }
    ],
    redFlags: [
      'Active suicidal ideation with plan/intent',
      'Homicidal ideation / Risk to others',
      'Command hallucinations',
      'Severe self-neglect'
    ],
    physiologyBuckets: [
      {
        title: 'Neurotransmitters',
        content: [
          { label: 'Serotonin', description: 'Mood, sleep, appetite regulation.' },
          { label: 'Dopamine', description: 'Reward, motivation, motor control (excess in psychosis).' },
          { label: 'GABA', description: 'Inhibitory neurotransmitter (anxiety).' }
        ],
        color: 'text-purple-600'
      }
    ],
    patternRecognition: [
      { title: 'Mania', description: 'Pressured speech, grandiose delusions, labile affect, flight of ideas.', color: 'text-amber-600' },
      { title: 'Psychosis', description: 'Hallucinations, delusions, lack of insight.', color: 'text-red-600' }
    ],
    workedCases: [
      {
        title: 'Case 1: The Withdrawn Youth',
        description: '19M, brought by parents. Not showering, talking to himself, believes the TV is sending him messages.',
        analysis: 'Impression: First Episode Psychosis. Needs urgent psychiatric assessment and safety planning.'
      }
    ],
    onePager: {
      basics: 'ASEPTIC: Appearance, Speech, Emotion, Perception, Thought, Insight, Cognition.',
      normalValues: ['Mood: Euthymic', 'Insight: Good'],
      redFlags: ['Suicide Risk', 'Violence Risk', 'Command Hallucinations'],
      goldenRules: 'Always ask directly about suicidal ideation and intent.'
    },
    isDraft: false
  }
];
