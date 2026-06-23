import { ExamSystem, Examination } from '../../types';

export const rheumatologicalExaminations: Examination[] = [
  {
    id: 'rheum-gals',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'GALS Screening Examination',
    shortDescription: 'Gait, Arms, Legs, Spine: A rapid screening tool for musculoskeletal disease.',
    keywords: ['gals', 'joints', 'arthritis', 'musculoskeletal', 'screening'],
    visualAids: [
      { 
        type: 'video', 
        description: 'GALS Screening Technique: Systematic assessment of gait, arms, legs, and spine.',
        source: 'https://picsum.photos/seed/gals/800/450'
      }
    ],
    steps: [
      { 
        id: 'rhg1', 
        category: 'Gait', 
        title: 'Gait Assessment', 
        description: 'Observe the patient walking. Look for symmetry, smoothness, and ability to turn quickly.', 
        positiveFindings: [
          { description: 'Antalgic gait (Painful weight-bearing)' },
          { description: 'Trendelenburg gait (Hip abductor weakness)' },
          { description: 'Waddling gait (Proximal muscle weakness)' }
        ], 
        negativeFindings: ['Normal gait', 'Smooth turn'] 
      },
      { 
        id: 'rhg2', 
        category: 'Arms', 
        title: 'Upper Limb Screen', 
        description: 'Hands behind head (Shoulder abduction/ER), hands out (Elbow extension), turn over (Supination/Pronation), make a fist (Grip strength), squeeze MCPs (Squeeze test).', 
        positiveFindings: [
          { description: 'Reduced range of motion (Shoulder/Elbow)' },
          { description: 'Pain on MCP squeeze (Synovitis)' },
          { description: 'Weak grip (RA / Carpal Tunnel)' }
        ], 
        negativeFindings: ['Full range of motion', 'No tenderness on squeeze'] 
      },
      { 
        id: 'rhg3', 
        category: 'Legs', 
        title: 'Lower Limb Screen', 
        description: 'Assess knee for swelling/effusion, passive knee flexion, internal rotation of hip (90/90), squeeze MTPs.', 
        positiveFindings: [
          { description: 'Knee effusion (Patellar tap / Bulge sign)' },
          { description: 'Reduced internal rotation of hip (OA)' },
          { description: 'Pain on MTP squeeze (Synovitis)' }
        ], 
        negativeFindings: ['No joint tenderness', 'No effusions'] 
      },
      { 
        id: 'rhg4', 
        category: 'Spine', 
        title: 'Spinal Screen', 
        description: 'Inspect from side and back. Assess cervical rotation, lateral neck flexion, and lumbar flexion (touch toes).', 
        positiveFindings: [
          { description: 'Scoliosis / Kyphosis' },
          { description: 'Reduced lumbar flexion' },
          { description: 'Reduced cervical rotation' }
        ], 
        negativeFindings: ['Normal spinal curves', 'Full range of spinal motion'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Osteoarthritis (OA)', explanation: 'Asymmetrical, worse with use, bony swellings (Heberden\'s nodes), reduced internal rotation of hip.' },
      { condition: 'Rheumatoid Arthritis (RA)', explanation: 'Symmetrical small joint involvement, morning stiffness >30 mins, pain on MCP/MTP squeeze.' },
      { condition: 'Ankylosing Spondylitis', explanation: 'Reduced spinal mobility, inflammatory back pain, young male predominance.' }
    ],
    redFlags: [
      'Hot, swollen, tender single joint (Septic Arthritis)',
      'Systemic symptoms (Fever, weight loss)',
      'Acute back pain with neurological deficit (Cauda Equina)',
      'Multiple joint involvement with systemic features (Vasculitis / CTD)'
    ],
    onePager: {
      basics: 'Gait (Walk/Turn), Arms (Behind head/Hands out/Squeeze), Legs (Knee/Hip/MTP), Spine (Look/Touch toes).',
      normalValues: ['Full ROM in all joints', 'No joint effusions', 'No pain on squeeze tests'],
      redFlags: ['Septic Joint', 'Cauda Equina', 'Systemic Illness'],
      goldenRules: 'GALS is a screen; if positive, perform a detailed regional examination.'
    },
    isDraft: false
  },
  {
    id: 'rheum-hand',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'Hand & Wrist Examination',
    shortDescription: 'Detailed assessment of the hand and wrist, focusing on inflammatory vs degenerative changes.',
    keywords: ['rheumatoid', 'osteoarthritis', 'synovitis', 'nodes', 'deformity'],
    steps: [
      { 
        id: 'rhh1', 
        category: 'Inspection', 
        title: 'Hand Inspection', 
        description: 'Look for ulnar deviation, swan-neck/boutonniere deformities (RA), Heberden\'s/Bouchard\'s nodes (OA), and muscle wasting.', 
        positiveFindings: [
          { description: 'Ulnar deviation of MCPs (RA)' },
          { description: 'Heberden\'s nodes (DIP OA)' },
          { description: 'Bouchard\'s nodes (PIP OA)' },
          { description: 'Thenar wasting (Carpal Tunnel)' }
        ], 
        negativeFindings: ['No joint swelling or deformity', 'Normal muscle bulk'] 
      },
      { 
        id: 'rhh2', 
        category: 'Palpation', 
        title: 'Joint Palpation', 
        description: 'Palpate MCPs, PIPs, DIPs, and wrists for warmth, bogginess (synovitis), or hard bony swellings (OA).', 
        positiveFindings: [
          { description: 'Bogginess / Synovitis (RA)' },
          { description: 'Hard, bony swellings (OA)' },
          { description: 'Pain on MCP squeeze' }
        ], 
        negativeFindings: ['Joints cool and non-tender'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Rheumatoid Arthritis', explanation: 'Symmetrical PIP/MCP involvement, ulnar deviation, morning stiffness.' },
      { condition: 'Osteoarthritis', explanation: 'DIP/PIP involvement, Heberden\'s nodes, worse with use.' },
      { condition: 'Psoriatic Arthritis', explanation: 'Asymmetrical, dactylitis ("sausage digit"), nail changes (pitting).' }
    ],
    isDraft: false
  },
  {
    id: 'rheum-as',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'Ankylosing Spondylitis Assessment',
    shortDescription: 'Focused assessment for axial spondyloarthritis.',
    keywords: ['ankylosing spondylitis', 'axial spa', 'schober', 'uveitis'],
    steps: [
      { 
        id: 'rhas1', 
        category: 'Inspection', 
        title: 'Postural Assessment', 
        description: 'Look for loss of lumbar lordosis and increased thoracic kyphosis ("Question mark posture").', 
        positiveFindings: [{ description: 'Question mark posture' }], 
        negativeFindings: ['Normal spinal posture'] 
      },
      { 
        id: 'rhas2', 
        category: 'Mobility', 
        title: 'Modified Schober\'s Test', 
        description: 'Mark 10cm above and 5cm below L5. Measure increase on maximal flexion (Normal >5cm increase).', 
        positiveFindings: [{ description: 'Reduced Schober\'s (<5cm increase)' }], 
        negativeFindings: ['Normal lumbar mobility (>5cm increase)'] 
      },
      { 
        id: 'rhas3', 
        category: 'Extra-articular', 
        title: 'Extra-articular Signs', 
        description: 'Check for uveitis (red eye), psoriasis, IBD signs, and apical lung fibrosis.', 
        positiveFindings: [{ description: 'Red eye (Acute Anterior Uveitis)' }], 
        negativeFindings: ['No extra-articular signs'] 
      }
    ],
    physiologyBuckets: [
      {
        title: 'Axial SpA Features',
        content: [
          { label: 'Inflammatory Back Pain', description: 'Improves with exercise, worse at rest, nocturnal pain, morning stiffness >30 mins.' },
          { label: 'Enthesitis', description: 'Inflammation at tendon insertion points (e.g., Achilles tendonitis, plantar fasciitis).' },
          { label: 'HLA-B27', description: 'Strong genetic association (present in ~90% of AS patients).' }
        ],
        color: 'text-blue-600'
      }
    ],
    isDraft: false
  }
];
