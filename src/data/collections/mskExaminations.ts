import { Examination, ExamSystem } from '../../types';

export const mskExaminations: Examination[] = [
  {
    id: 'msk-knee',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'Knee Examination',
    shortDescription: 'Comprehensive assessment of the knee joint, including ligamentous stability and meniscal integrity.',
    keywords: ['knee', 'acl', 'mcl', 'meniscus', 'lachman', 'mcmurray'],
    steps: [
      {
        id: 'knee-ins',
        category: 'Inspection',
        title: 'Inspection',
        description: 'Observe gait. Inspect knee for swelling (effusion), redness, deformity (varus/valgus), muscle wasting (quadriceps), and scars.',
        positiveFindings: [
          { description: 'Swelling / Suprapatellar effusion' },
          { description: 'Genu Varum (Bow-legged)' },
          { description: 'Genu Valgum (Knock-kneed)' },
          { description: 'Quadriceps wasting' }
        ],
        negativeFindings: ['No deformity', 'No effusion', 'Symmetrical muscle bulk']
      },
      {
        id: 'knee-palp',
        category: 'Palpation',
        title: 'Palpation',
        description: 'Assess temperature. Palpate joint lines, bony landmarks, and assess for effusion (Patellar tap or Bulge sign).',
        positiveFindings: [
          { description: 'Joint line tenderness (Medial or Lateral)' },
          { description: 'Warmth (Inflammatory or Septic)' },
          { description: 'Patellar tap positive (Large effusion)' }
        ],
        negativeFindings: ['Joints cool', 'No joint line tenderness']
      },
      {
        id: 'knee-rom',
        category: 'Movement',
        title: 'Range of Motion',
        description: 'Assess active and passive flexion (Normal ~140°) and extension (Normal 0°). Check for hyper-extension.',
        positiveFindings: [
          { description: 'Reduced flexion (Effusion/Mechanical block)' },
          { description: 'Fixed flexion deformity' }
        ],
        negativeFindings: ['Full range of motion (0-140)']
      },
      {
        id: 'knee-spec-mcl',
        category: 'Special Tests',
        title: 'Collateral Ligaments (MCL/LCL)',
        description: 'Valgus Stress Test (MCL): Apply valgus stress at 0° and 30° flexion. Varus Stress Test (LCL): Apply varus stress at 0° and 30° flexion.',
        positiveFindings: [
          { description: 'Increased laxity on Valgus stress (MCL tear)' },
          { description: 'Increased laxity on Varus stress (LCL tear)' }
        ],
        clinicalPearls: ['Always test at 30° flexion to isolate the ligament from the joint capsule.']
      },
      {
        id: 'knee-spec-acl',
        category: 'Special Tests',
        title: 'Cruciate Ligaments (ACL/PCL)',
        description: 'Lachman Test (ACL): Knee at 20-30° flexion, pull tibia forward. Anterior Drawer (ACL): Knee at 90° flexion, pull tibia forward. Posterior Drawer (PCL): Push tibia backward at 90° flexion.',
        positiveFindings: [
          { description: 'Soft endpoint or increased excursion on Lachman (ACL tear)' },
          { description: 'Posterior sag (PCL tear)' }
        ],
        clinicalPearls: ['Lachman is globally the most sensitive test for acute ACL rupture.']
      },
      {
        id: 'knee-spec-men',
        category: 'Special Tests',
        title: 'Meniscal Integrity',
        description: 'McMurray\'s Test: Flex knee, rotate tibia medially/laterally while extending. Look for a click or pain.',
        positiveFindings: [
          { description: 'Painful click on McMurray\'s (Meniscal tear)' }
        ]
      }
    ],
    redFlags: [
      'Inability to weight bear (Ottawa Knee Rules)',
      'Hot, red, swollen joint (Septic arthritis)',
      'Locked knee (Bucket-handle meniscal tear)',
      'Neurovascular deficit in the foot (Knee dislocation)'
    ],
    referenceStandard: 'Macleod\'s Clinical Examination',
    isDraft: false
  },
  {
    id: 'msk-shoulder',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'Shoulder Examination',
    shortDescription: 'Detailed assessment of the shoulder complex, rotator cuff function, and impingement signs.',
    keywords: ['shoulder', 'rotator cuff', 'impingement', 'biceps', 'instability'],
    steps: [
      {
        id: 'sh-ins',
        category: 'Inspection',
        title: 'Inspection',
        description: 'Inspect from front, side, and back. Look for muscle wasting (supraspinatus/infraspinatus), deformity (AC joint), and winging of the scapula.',
        positiveFindings: [
          { description: 'Supraspinatus fossa wasting' },
          { description: 'AC joint prominence' },
          { description: 'Scapular winging (Long thoracic nerve injury)' }
        ]
      },
      {
        id: 'sh-rom',
        category: 'Movement',
        title: 'Movement & Painful Arc',
        description: 'Assess active and passive ROM: Abduction, Flexion, Internal/External rotation. Observe for a painful arc (60-120° abduction).',
        positiveFindings: [
          { description: 'Painful arc between 60-120° (Impingement)' },
          { description: 'Reduced passive ER (Capsulitis / Frozen shoulder)' }
        ]
      },
      {
        id: 'sh-cuff',
        category: 'Special Tests',
        title: 'Rotator Cuff Testing',
        description: 'Supraspinatus (Empty Can), Infraspinatus (Resisted ER), Subscapularis (Gerber Lift-off or Belly Press).',
        positiveFindings: [
          { description: 'Weakness in "Empty Can" (Supraspinatus tear)' },
          { description: 'Inability to lift hand off back (Subscapularis tear)' }
        ]
      },
      {
        id: 'sh-imp',
        category: 'Special Tests',
        title: 'Impingement Signs',
        description: 'Hawkins-Kennedy: Passively flex shoulder 90°, elbow 90°, then internally rotate. Neer\'s: Passively flex shoulder while stabilizing scapula.',
        positiveFindings: [
          { description: 'Pain on Hawkins-Kennedy (Subacromial impingement)' }
        ]
      }
    ],
    isDraft: false
  },
  {
    id: 'msk-hip',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'Hip Examination',
    shortDescription: 'Assessment of hip joint pathology, range of motion, and abductor strength.',
    keywords: ['hip', 'osteoarthritis', 'trendelenburg', 'thomas test'],
    steps: [
      {
        id: 'hip-ins',
        category: 'Inspection',
        title: 'Inspection & Gait',
        description: 'Observe walking. Look for pelvic tilt, Trendelenburg gait, or antalgic gait. Measure leg length.',
        positiveFindings: [
          { description: 'Trendelenburg gait' },
          { description: 'Apparent vs True leg length discrepancy' }
        ]
      },
      {
        id: 'hip-rom',
        category: 'Range of Motion',
        title: 'Joint Mobility',
        description: 'Assess flexion, internal/external rotation (at 90° flexion), abduction, and adduction.',
        positiveFindings: [
          { description: 'Reduced internal rotation (Early OA sign)' },
          { description: 'Thomas Test positive (Fixed flexion deformity)' }
        ]
      }
    ],
    isDraft: false
  },
  {
    id: 'msk-wrist',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'Wrist & Hand Examination',
    shortDescription: 'Assessment of wrist stability, tendonitis, and common nerve entrapment syndromes.',
    keywords: ['wrist', 'hand', 'finkelstein', 'phalen', 'tinel', 'carpal tunnel'],
    steps: [
      {
        id: 'wr-ins',
        category: 'Inspection',
        title: 'Inspection',
        description: 'Observe for swelling, deformity (Colles/Smith), and muscle wasting (Thenar/Hypothenar).',
        positiveFindings: [
          { description: 'Dinner fork deformity (Colles fracture)' },
          { description: 'Thenar wasting (Chronic Carpal Tunnel)' }
        ]
      },
      {
        id: 'wr-rom',
        category: 'Movement',
        title: 'Range of Motion',
        description: 'Assess flexion, extension, ulnar/radial deviation, and grip strength.',
        positiveFindings: [
          { description: 'Pain on radial deviation (De Quervain\'s)' }
        ]
      },
      {
        id: 'wr-spec-ct',
        category: 'Special Tests',
        title: 'Carpal Tunnel Screen',
        description: 'Phalen\'s Test: Max flexion of wrists for 60s. Tinel\'s Sign: Percuss over median nerve at the flexor retinaculum.',
        positiveFindings: [
          { description: 'Paresthesia in median nerve distribution (Positive Phalen/Tinel)' }
        ]
      },
      {
        id: 'wr-spec-dq',
        category: 'Special Tests',
        title: 'De Quervain\'s Screen',
        description: 'Finkelstein\'s Test: Tuck thumb into fist and ulnar deviate wrist.',
        positiveFindings: [
          { description: 'Sharp pain over first dorsal compartment (Positive Finkelstein)' }
        ]
      }
    ],
    isDraft: false
  },
  {
    id: 'msk-ankle',
    system: ExamSystem.RHEUMATOLOGICAL,
    name: 'Ankle & Foot Examination',
    shortDescription: 'Assessment of ankle stability, plantar fasciitis, and diabetic foot stigmata.',
    keywords: ['ankle', 'foot', 'talar tilt', 'thompson test', 'achilles'],
    steps: [
      {
        id: 'ank-ins',
        category: 'Inspection',
        title: 'Inspection & Gait',
        description: 'Observe for swelling, deformity (flat feet / pes planus), and hallux valgus (bunions). Hear for "clipping" sounds.',
        positiveFindings: [
          { description: 'Hallux valgus' },
          { description: 'Pes planus (Flat feet)' },
          { description: 'Swelling over lateral malleolus' }
        ]
      },
      {
        id: 'ank-rom',
        category: 'Movement',
        title: 'Range of Motion',
        description: 'Assess plantarflexion, dorsiflexion, inversion, and eversion.',
        positiveFindings: [
          { description: 'Reduced dorsiflexion (Tight Achilles / Joint impingement)' }
        ]
      },
      {
        id: 'ank-spec-ach',
        category: 'Special Tests',
        title: 'Achilles Integrity',
        description: 'Simmonds\' / Thompson\'s Test: Patient prone, squeeze calf and observe for plantarflexion.',
        positiveFindings: [
          { description: 'Absence of plantarflexion (Achilles tendon rupture)' }
        ]
      },
      {
        id: 'ank-spec-lig',
        category: 'Special Tests',
        title: 'Ligamentous Stability',
        description: 'Anterior Drawer (ATFL integrity) and Talar Tilt (CFL integrity).',
        positiveFindings: [
          { description: 'Increased laxity on anterior drawer (ATFL tear)' }
        ]
      }
    ],
    isDraft: false
  }
];
