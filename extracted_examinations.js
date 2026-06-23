export const EXAMINATIONS = [
  ...U8,
  {
    id: 'general-comprehensive',
    system: ce.GENERAL,
    name: 'Comprehensive Clinical Assessment',
    shortDescription: 'A systematic head-to-toe clinical evaluation.',
    keywords: ['head to toe', 'comprehensive', 'physical exam', 'general assessment'],
    steps: [
      {
        id: 'gen1',
        category: 'General',
        title: 'General Inspection',
        description: 'Assess habitus, distress, and surroundings.',
        positiveFindings: [{ description: 'Cachexia' }, { description: 'Respiratory distress' }],
        negativeFindings: ['Comfortable at rest']
      },
      {
        id: 'gen2',
        category: 'Vitals',
        title: 'Vital Signs',
        description: 'Temp, HR, BP, RR, SpO2.',
        positiveFindings: [{ description: 'Fever' }],
        negativeFindings: ['Vitals stable']
      },
      {
        id: 'gen3',
        category: 'Systems',
        title: 'Systematic Review',
        description: 'Briefly screen CVS, Resp, GI, and Neuro.',
        positiveFindings: [{ description: 'Any focal abnormality' }],
        negativeFindings: ['Systems screen negative']
      }
    ],
    isDraft: !1
  },
  {
    id: 'cvs-exam',
    system: ce.CARDIOVASCULAR,
    name: 'Cardiovascular System Examination',
    shortDescription:
      'Comprehensive precordial assessment following the standard OSCE checklist for cardiovascular health.',
    keywords: ['heart', 'murmurs', 'pulse', 'jvp', 'precordium', 'valves', 'geeky medics', 'osce'],
    visualAids: [
      {
        type: 'video',
        description:
          'Complete Cardiovascular Examination Technique: Demonstration of inspection, palpation, and auscultation landmarks.',
        source: 'https://picsum.photos/seed/cvsexam/800/450'
      },
      {
        type: 'diagram',
        description:
          'Anatomical Landmarks of the Precordium: Identification of the Mitral, Tricuspid, Pulmonary, and Aortic auscultation areas.',
        source: 'https://picsum.photos/seed/cvsanatomy/800/450'
      }
    ],
    steps: [
      {
        id: 'cvs-9',
        category: 'General inspection',
        title: 'End-of-Bed Inspection',
        description:
          'Observe the patient from the end of the bed. Note signs of clinical distress, breathing effort, and obvious systemic markers like malar flush or cyanosis.',
        positiveFindings: [
          { description: 'Malar flush (Mitral Stenosis)' },
          { description: 'Cyanosis (Hypoxemia/Shunt)' },
          { description: 'Tachypnoea (Heart Failure)' },
          { description: 'Cachexia (Chronic Heart Failure)' }
        ],
        negativeFindings: [
          'Patient comfortable at rest',
          'No obvious syndromic features',
          'No peripheral oedema'
        ]
      },
      {
        id: 'cvs-11',
        category: 'Hands',
        title: 'Peripheral Stigmata',
        description:
          'Inspect the dorsal and palmar surfaces. Look for splinter haemorrhages, Osler nodes, Janeway lesions, and clubbing.',
        positiveFindings: [
          { description: 'Splinter haemorrhages (Infective Endocarditis)' },
          { description: 'Janeway lesions (Infective Endocarditis - non-tender)' },
          { description: 'Osler nodes (Infective Endocarditis - tender)' },
          { description: 'Tendon xanthomata (Hyperlipidaemia)' },
          { description: 'Finger clubbing (Cyanotic CHD / Endocarditis)' }
        ],
        negativeFindings: [
          'Hands warm and well-perfused',
          'No peripheral stigmata of endocarditis',
          'Capillary refill < 2s'
        ]
      },
      {
        id: 'cvs-14',
        category: 'Pulses',
        title: 'Radial Pulse Assessment',
        description:
          'Palpate the radial pulse. Assess the rate (60-100 bpm), rhythm (regular/irregular), and character.',
        positiveFindings: [
          { description: 'Irregularly irregular rhythm (Atrial Fibrillation)' },
          { description: 'Radio-radial delay (Coarctation of Aorta)' },
          { description: 'Collapsing pulse (Aortic Regurgitation)' },
          { description: 'Slow-rising pulse (Aortic Stenosis)' }
        ],
        negativeFindings: ['Regular rhythm', 'Pulse rate 72 bpm', 'Synchronous radial pulses']
      },
      {
        id: 'cvs-20',
        category: 'Neck',
        title: 'Jugular Venous Pressure (JVP)',
        description:
          'Observe the internal jugular vein pulse between the two heads of the sternocleidomastoid at 45°. Measure vertical height from the sternal angle. Correlate waves with the cardiac cycle.',
        imagePrompt:
          'Detailed medical diagram of the Jugular Venous Pressure (JVP) waveform showing a, c, x, v, and y waves, correlated with a lead II ECG trace and cardiac cycle phases (atrial contraction, ventricular systole, etc.). Clean textbook style, white background.',
        positiveFindings: [
          { description: 'Elevated JVP >3cm (Right Heart Failure / Fluid Overload)' },
          { description: 'Large v-waves (Tricuspid Regurgitation)' },
          { description: 'Cannon a-waves (Complete Heart Block)' },
          { description: 'Kussmaul sign (Constrictive Pericarditis)' }
        ],
        negativeFindings: [
          'JVP not visible or < 3cm vertical height',
          'Negative hepatojugular reflux'
        ]
      },
      {
        id: 'cvs-25',
        category: 'Palpation',
        title: 'Precordial Palpation',
        description:
          'Locate the apex beat (5th ICS MCL). Palpate for parasternal heaves and valvular thrills.',
        positiveFindings: [
          { description: 'Displaced apex beat (Ventricular Dilatation / LVH)' },
          { description: 'Left parasternal heave (Right Ventricular Hypertrophy)' },
          { description: 'Systolic thrill (Aortic Stenosis / VSD)' },
          { description: 'Diastolic thrill (Mitral Stenosis - rare)' }
        ],
        negativeFindings: ['Apex beat palpable in 5th ICS MCL', 'No heaves or thrills']
      },
      {
        id: 'cvs-28',
        category: 'Auscultation',
        title: 'Cardiac Auscultation',
        description:
          'Listen at the Mitral, Tricuspid, Pulmonary, and Aortic areas using bell and diaphragm. Palpate carotid pulse to identify S1.',
        positiveFindings: [
          { description: 'Ejection systolic murmur (Aortic Stenosis)' },
          { description: 'Pansystolic murmur (Mitral Regurgitation)' },
          { description: 'Early diastolic murmur (Aortic Regurgitation)' },
          { description: 'Mid-diastolic murmur (Mitral Stenosis)' },
          { description: 'Gallop rhythm (S3/S4 Heart Sounds)' }
        ],
        negativeFindings: ['Normal S1 and S2 heard', 'No added sounds or murmurs']
      }
    ],
    differentialDiagnoses: [
      {
        condition: 'Heart Failure',
        explanation: 'Elevated JVP, displaced apex, S3 gallop, peripheral oedema.'
      },
      {
        condition: 'Aortic Stenosis',
        explanation:
          'Slow-rising pulse, narrow pulse pressure, ejection systolic murmur radiating to carotids.'
      },
      {
        condition: 'Mitral Regurgitation',
        explanation: 'Displaced apex, pansystolic murmur radiating to axilla.'
      }
    ],
    diagnosticCriteria: [
      {
        condition: 'Heart Failure',
        criteria: [
          'Framingham criteria: 2 major or 1 major + 2 minor criteria',
          'Major: PND, orthopnoea, elevated JVP, crackles, S3 gallop',
          'Minor: Peripheral oedema, night cough, exertional dyspnoea, hepatomegaly'
        ]
      },
      {
        condition: 'Hypertension',
        criteria: [
          'Clinic BP >= 140/90 mmHg',
          'ABPM daytime average >= 135/85 mmHg',
          'Severe hypertension: >= 180/120 mmHg'
        ]
      },
      {
        condition: 'Arrhythmias (e.g. Atrial Fibrillation)',
        criteria: [
          'ECG showing irregularly irregular rhythm',
          'Absence of distinct P waves',
          'Irregular ventricular response'
        ]
      }
    ],
    redFlags: [
      'New onset chest pain with clinical instability',
      'Acute severe dyspnoea with pulmonary oedema',
      'Syncope on exertion (Aortic Stenosis)',
      'Fever + New murmur (Infective Endocarditis)'
    ],
    physiologyBuckets: [
      {
        title: 'A) Pump Function (The Heart)',
        content: [
          {
            label: 'Contractility',
            description: 'Force of contraction. Reduced in HFrEF (Systolic Failure).'
          },
          {
            label: 'Compliance',
            description: 'Ease of filling. Reduced in HFpEF (Diastolic Failure).'
          },
          {
            label: 'Preload',
            description: 'End-diastolic volume. Increased in fluid overload (High JVP).'
          }
        ],
        color: 'text-blue-600'
      },
      {
        title: 'B) Plumbing (The Valves)',
        content: [
          {
            label: 'Stenosis',
            description: 'Narrowed opening. Pressure overload (e.g., AS leads to LVH).'
          },
          {
            label: 'Regurgitation',
            description: 'Leaky closure. Volume overload (e.g., MR leads to Dilatation).'
          }
        ],
        color: 'text-emerald-600'
      }
    ],
    patternRecognition: [
      {
        title: 'Heart Failure (Left)',
        description: 'Dyspnoea, Orthopnoea, PND, displaced apex, S3, bibasal crackles.',
        color: 'text-blue-600'
      },
      {
        title: 'Heart Failure (Right)',
        description: 'Elevated JVP, peripheral oedema, hepatomegaly, parasternal heave.',
        color: 'text-emerald-600'
      },
      {
        title: 'Aortic Stenosis',
        description: 'Slow-rising pulse, narrow pulse pressure, ESM radiating to carotids.',
        color: 'text-amber-600'
      }
    ],
    workedCases: [
      {
        title: 'Case 1: The Breathless Smoker',
        description:
          '72M, dyspnoea, orthopnoea. Exam: JVP +4cm, displaced apex, S3 gallop, bibasal crackles.',
        analysis:
          'Impression: Decompensated Left Heart Failure. Likely ischaemic or hypertensive origin.'
      },
      {
        title: 'Case 2: The Syncopal Pensioner',
        description:
          '80F, collapsed while walking. Exam: SBP 100/80, slow-rising pulse, ESM at 2nd RICS.',
        analysis:
          'Impression: Severe Aortic Stenosis. High risk of sudden cardiac death; needs urgent Echo.'
      }
    ],
    onePager: {
      basics:
        'Systematic precordial assessment: Inspection, Palpation, Auscultation. Always check pulses and JVP.',
      normalValues: [
        'HR: 60-100 bpm',
        'BP: <140/90 mmHg',
        'JVP: <3cm vertical height',
        'Apex: 5th ICS MCL'
      ],
      redFlags: ['Chest Pain', 'Syncope', 'Acute Dyspnoea', 'Fever + Murmur'],
      goldenRules:
        "Murmurs are just sounds; correlate with the pulse and the patient's clinical state."
    },
    isDraft: !1
  },
  {
    id: 'cvs-arms',
    system: ce.CARDIOVASCULAR,
    name: 'Peripheral Vascular Exam (Arms)',
    shortDescription: 'Assessment of upper limb arterial and venous status.',
    keywords: ['radial pulse', 'brachial pulse', 'allen test', 'thoracic outlet'],
    steps: [
      {
        id: 'cva1',
        category: 'Inspection',
        title: 'Upper Limb Inspection',
        description: 'Look for colour, temperature, muscle wasting, and scars.',
        positiveFindings: [{ description: 'Pallor/Cyanosis (Ischaemia)' }],
        negativeFindings: ['Normal colour and temperature']
      },
      {
        id: 'cva2',
        category: 'Palpation',
        title: 'Pulses',
        description: 'Palpate radial, ulnar, and brachial pulses.',
        positiveFindings: [{ description: 'Absent radial pulse (Occlusion)' }],
        negativeFindings: ['Pulses present and symmetrical']
      },
      {
        id: 'cva3',
        category: 'Special Tests',
        title: "Allen's Test",
        description: 'Assess patency of radial and ulnar arteries.',
        positiveFindings: [{ description: 'Delayed refill >5s (Arterial insufficiency)' }],
        negativeFindings: ['Normal refill <5s']
      }
    ],
    isDraft: !1
  },
  {
    id: 'cvs-legs',
    system: ce.CARDIOVASCULAR,
    name: 'Peripheral Vascular Exam (Legs)',
    shortDescription: 'Assessment of lower limb arterial and venous status.',
    keywords: ['femoral pulse', 'popliteal pulse', 'dorsalis pedis', 'buerger test'],
    steps: [
      {
        id: 'cvl1',
        category: 'Inspection',
        title: 'Lower Limb Inspection',
        description: 'Look for ulcers, hair loss, and venous changes.',
        positiveFindings: [
          { description: 'Venous ulcers (CVI)' },
          { description: 'Arterial ulcers (PAD)' }
        ],
        negativeFindings: ['No ulcers or hair loss']
      },
      {
        id: 'cvl2',
        category: 'Palpation',
        title: 'Pulses',
        description: 'Palpate femoral, popliteal, posterior tibial, and dorsalis pedis pulses.',
        positiveFindings: [{ description: 'Absent DP pulse (PAD)' }],
        negativeFindings: ['All pulses present and symmetrical']
      },
      {
        id: 'cvl3',
        category: 'Special Tests',
        title: "Buerger's Test",
        description: 'Assess for postural rubor and pallor.',
        positiveFindings: [{ description: 'Angle of pallor <20° (Severe ischaemia)' }],
        negativeFindings: ['No pallor on elevation']
      }
    ],
    isDraft: !1
  },
  {
    id: 'cvs-dynamic',
    system: ce.CARDIOVASCULAR,
    name: 'Dynamic Manoeuvres for Valvular Pathology',
    shortDescription: 'Special maneuvers to differentiate cardiac murmurs.',
    keywords: ['valsalva', 'squatting', 'inspiration', 'handgrip'],
    steps: [
      {
        id: 'cvd1',
        category: 'Manoeuvres',
        title: 'Inspiration',
        description: "Right-sided murmurs increase on inspiration (Carvallo's sign).",
        positiveFindings: [{ description: 'Increased TR/PR murmur' }],
        negativeFindings: ['No change in murmur intensity']
      },
      {
        id: 'cvd2',
        category: 'Manoeuvres',
        title: 'Valsalva / Standing',
        description: 'Decreases most murmurs except HOCM and MVP.',
        positiveFindings: [{ description: 'Increased HOCM murmur' }],
        negativeFindings: ['Decreased murmur intensity']
      },
      {
        id: 'cvd3',
        category: 'Manoeuvres',
        title: 'Squatting / Passive Leg Raise',
        description: 'Increases preload. Increases most murmurs except HOCM and MVP.',
        positiveFindings: [{ description: 'Decreased HOCM murmur' }],
        negativeFindings: ['Increased murmur intensity']
      }
    ],
    isDraft: !1
  },
  {
    id: 'resp-exam',
    system: ce.RESPIRATORY,
    name: 'Respiratory System Examination',
    shortDescription:
      'Comprehensive thoracic assessment focusing on inspection, palpation, and auscultation stigmata.',
    keywords: ['lungs', 'breath sounds', 'asthma', 'copd', 'pneumonia', 'trachea'],
    visualAids: [
      {
        type: 'video',
        description:
          'Respiratory Examination: Proper technique for chest expansion and percussion.',
        source: 'https://picsum.photos/seed/respexam/800/450'
      },
      {
        type: 'diagram',
        description:
          'Lung Lobe Anatomy: Anterior and posterior projections for accurate auscultation.',
        source: 'https://picsum.photos/seed/respanatomy/800/450'
      }
    ],
    steps: [
      {
        id: 'r1',
        category: 'General inspection',
        title: 'End-of-Bed Inspection',
        description:
          'Assess breathing effort, use of accessory muscles, and audible sounds (stridor/wheeze). Check for supplemental oxygen and inhalers.',
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
        description:
          'Palpate the trachea in the suprasternal notch. Ensure it is central by checking the gap between the trachea and the sternocleidomastoid on each side.',
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
        description:
          'Place hands on the lower chest wall and observe the distance between thumbs during deep inspiration.',
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
        description:
          'Percuss the chest in an "S" pattern, comparing sides. Include supra-clavicular and axillary areas.',
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
        description:
          'Listen to breath sounds with the diaphragm while the patient breathes deeply through an open mouth. Compare symmetrical areas.',
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
      {
        condition: 'Pneumonia',
        explanation:
          'Dull percussion, bronchial breathing, coarse crackles, increased vocal resonance.'
      },
      {
        condition: 'Pleural Effusion',
        explanation:
          'Stony dull percussion, absent breath sounds, reduced expansion on affected side.'
      },
      {
        condition: 'Pneumothorax',
        explanation:
          'Hyper-resonant percussion, absent breath sounds, tracheal deviation (if tension).'
      }
    ],
    diagnosticCriteria: [
      {
        condition: 'Asthma',
        criteria: [
          'Spirometry: FEV1/FVC < 0.7',
          'Reversibility: >12% and >200mL increase in FEV1 with bronchodilator',
          'Variable expiratory airflow limitation'
        ]
      },
      {
        condition: 'COPD',
        criteria: [
          'Post-bronchodilator FEV1/FVC < 0.7',
          'History of smoking or significant exposure to noxious stimuli',
          'Chronic progressively worsening dyspnoea, cough, or sputum production'
        ]
      },
      {
        condition: 'Pneumonia',
        criteria: [
          'Clinical signs (fever, cough, tachypnoea, focal chest signs)',
          'New radiologic infiltrate on CXR',
          'Supportive laboratory findings (leukocytosis, high CRP)'
        ]
      }
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
          {
            label: 'Obstruction',
            description: 'Difficulty getting air OUT. FEV1/FVC < 0.7 (Asthma/COPD).'
          },
          {
            label: 'Restriction',
            description: 'Difficulty getting air IN. Reduced TLC (Fibrosis/Chest wall).'
          }
        ],
        color: 'text-blue-600'
      },
      {
        title: 'B) Diffusion (Gas Exchange)',
        content: [
          {
            label: 'V/Q Mismatch',
            description: 'Perfusion without ventilation (Shunt) or vice versa (Dead space).'
          },
          { label: 'Membrane Thickening', description: 'Reduced DLCO (Interstitial Lung Disease).' }
        ],
        color: 'text-emerald-600'
      }
    ],
    patternRecognition: [
      {
        title: 'Consolidation',
        description: 'Dull percussion, bronchial breathing, increased vocal resonance.',
        color: 'text-blue-600'
      },
      {
        title: 'Pleural Effusion',
        description: 'Stony dullness, absent breath sounds, reduced expansion.',
        color: 'text-emerald-600'
      },
      {
        title: 'Pneumothorax',
        description: 'Hyper-resonance, absent breath sounds, tracheal deviation (if tension).',
        color: 'text-amber-600'
      }
    ],
    workedCases: [
      {
        title: 'Case 1: The Productive Cough',
        description:
          '65M, fever, rusty sputum. Exam: RR 24, dullness at right base, bronchial breathing.',
        analysis: 'Impression: Lobar Pneumonia. Needs CXR and CURB-65 assessment.'
      },
      {
        title: 'Case 2: The Sudden Pleurisy',
        description:
          '24F, sudden sharp chest pain. Exam: Hyper-resonant left chest, absent breath sounds.',
        analysis: 'Impression: Spontaneous Pneumothorax. Check for tracheal deviation (Tension).'
      }
    ],
    onePager: {
      basics:
        'Inspection (Effort), Palpation (Trachea/Expansion), Percussion (Notes), Auscultation (Sounds).',
      normalValues: [
        'RR: 12-20 bpm',
        'SpO2: >94% (or 88-92% in COPD)',
        'Trachea: Central',
        'Expansion: Symmetrical'
      ],
      redFlags: ['Tracheal Deviation', 'Silent Chest', 'Stridor', 'Haemoptysis'],
      goldenRules: 'Always compare left to right. Asymmetry is the hallmark of focal pathology.'
    },
    isDraft: !1
  },
  {
    id: 'gi-exam',
    system: ce.GASTROINTESTINAL,
    name: 'Gastrointestinal System Examination',
    shortDescription: 'Abdominal assessment including shifting dullness and organomegaly.',
    keywords: ['liver', 'spleen', 'bowel sounds', 'jaundice', 'ascites', 'palpation'],
    visualAids: [
      {
        type: 'video',
        description:
          'Abdominal Palpation: Demonstrating superficial and deep palpation of the 9 regions.',
        source: 'https://picsum.photos/seed/giexam/800/450'
      },
      {
        type: 'diagram',
        description:
          'Abdominal Regions and Underlying Organs: Mapping the 9 regions to clinical findings.',
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
        description:
          'Palpate all 9 regions. Assess for tenderness, guarding, and rebound. Perform specific maneuvers for appendicitis.',
        positiveFindings: [
          { description: 'Guarding / Rigidity (Peritonitis)' },
          { description: 'Rebound tenderness (Peritonitis)' },
          { description: "Murphy's sign positive (Cholecystitis)" },
          { description: "McBurney's point tenderness (Appendicitis)" },
          { description: "Rovsing's sign (Pain in RIF on LIF palpation - Appendicitis)" },
          { description: 'Psoas sign (Pain on hip extension - Retrocecal appendicitis)' }
        ],
        negativeFindings: [
          'Soft and non-tender',
          'No guarding or rebound',
          'Negative appendicitis signs'
        ]
      },
      {
        id: 'gi-10',
        category: 'Organomegaly',
        title: 'Liver, Spleen & Kidney Palpation',
        description:
          'Palpate from the RIF toward the right costal margin (liver) and left costal margin (spleen). Perform ballottement of the kidneys.',
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
        description:
          'Percuss from the midline to the flank. If dull, have the patient roll and re-percuss.',
        positiveFindings: [{ description: 'Shifting dullness positive (Ascites)' }],
        negativeFindings: ['No shifting dullness']
      }
    ],
    differentialDiagnoses: [
      {
        condition: 'Cirrhosis',
        explanation:
          'Jaundice, spider naevi, caput medusae, hepatomegaly (early) or small liver (late), ascites.'
      },
      {
        condition: 'Acute Cholecystitis',
        explanation: "RUQ tenderness, positive Murphy's sign, fever."
      },
      {
        condition: 'Bowel Obstruction',
        explanation: 'Distension, tinkling bowel sounds, generalized tenderness.'
      }
    ],
    diagnosticCriteria: [
      {
        condition: 'Liver Cirrhosis',
        criteria: [
          'Histological confirmation via liver biopsy',
          'Combination of clinical signs (stigmata of chronic liver disease), abnormal LFTs, and imaging (nodular liver surface, ascites)',
          'Portal hypertension complications (varices, encephalopathy)'
        ]
      },
      {
        condition: 'Acute Pancreatitis',
        criteria: [
          'Requires 2 of 3: Characteristic abdominal pain (epigastric radiating to back)',
          'Serum amylase/lipase >= 3x upper limit of normal',
          'Characteristic findings on cross-sectional imaging (CT/MRI)'
        ]
      }
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
          {
            label: 'Portal Hypertension',
            description: 'Increased resistance. Leads to Ascites, Varices, Splenomegaly.'
          },
          {
            label: 'Synthetic Function',
            description: 'Liver making proteins (Albumin/Clotting factors). Low in Cirrhosis.'
          }
        ],
        color: 'text-blue-600'
      },
      {
        title: 'B) Biliary Excretion',
        content: [
          {
            label: 'Obstruction',
            description: 'Bile cannot exit. Pale stools, dark urine, itchy skin (Jaundice).'
          },
          {
            label: 'Inflammation',
            description: "Murphy's sign (Gallbladder), McBurney's point (Appendix)."
          }
        ],
        color: 'text-emerald-600'
      }
    ],
    patternRecognition: [
      {
        title: 'Chronic Liver Disease',
        description: 'Jaundice, spider naevi, palmar erythema, gynaecomastia, ascites.',
        color: 'text-blue-600'
      },
      {
        title: 'Acute Peritonitis',
        description: 'Rigid abdomen, guarding, rebound tenderness, absent bowel sounds.',
        color: 'text-rose-600'
      },
      {
        title: 'Bowel Obstruction',
        description: 'Distension, tinkling bowel sounds, generalized tenderness.',
        color: 'text-amber-600'
      }
    ],
    workedCases: [
      {
        title: 'Case 1: The Yellow Patient',
        description: '58F, itchy skin, dark urine. Exam: Jaundice, RUQ mass, non-tender.',
        analysis:
          "Impression: Obstructive Jaundice. Rule out pancreatic malignancy (Courvoisier's Law)."
      },
      {
        title: 'Case 2: The Tense Abdomen',
        description:
          '45M, alcoholic, large belly. Exam: Shifting dullness positive, caput medusae.',
        analysis: 'Impression: Portal Hypertension with Ascites. Likely Cirrhosis.'
      }
    ],
    onePager: {
      basics:
        'Inspection (Scars/Distension), Palpation (Tenderness/Organs), Percussion (Dullness), Auscultation (Bowel sounds).',
      normalValues: [
        'Bowel Sounds: Present',
        'Liver: <2cm below costal margin',
        'Spleen: Not palpable',
        'Abdomen: Soft'
      ],
      redFlags: ['Rigidity', 'Haematemesis', 'Painless Jaundice', 'Weight Loss'],
      goldenRules: 'Always ask about pain before you touch. Start palpation furthest from the pain.'
    },
    isDraft: !1
  },
  {
    id: 'gu-male-intimate',
    system: ce.GENITOURINARY,
    name: 'Male Intimate Examination',
    shortDescription: 'Assessment of the male genitalia and inguinal region.',
    keywords: ['testicular', 'inguinal hernia', 'scrotum', 'prostate'],
    steps: [
      {
        id: 'gum1',
        category: 'Inspection',
        title: 'Genital Inspection',
        description: 'Look for skin changes, ulcers, and swelling.',
        positiveFindings: [{ description: 'Scrotal swelling' }, { description: 'Penile ulcer' }],
        negativeFindings: ['Normal external genitalia']
      },
      {
        id: 'gum2',
        category: 'Palpation',
        title: 'Testicular Palpation',
        description: 'Palpate each testis, epididymis, and vas deferens.',
        positiveFindings: [
          { description: 'Hard testicular mass (Malignancy)' },
          { description: 'Epididymal cyst' }
        ],
        negativeFindings: ['Testes smooth and symmetrical']
      },
      {
        id: 'gum3',
        category: 'Inguinal',
        title: 'Inguinal Hernia Screen',
        description: 'Palpate inguinal canals while patient coughs.',
        positiveFindings: [{ description: 'Cough impulse present' }],
        negativeFindings: ['No hernias detected']
      }
    ],
    isDraft: !1
  },
  {
    id: 'cn-exam',
    system: ce.NEUROLOGICAL,
    name: 'Cranial Nerves (I-XII)',
    shortDescription: 'Comprehensive cranial nerve survey.',
    keywords: ['pupils', 'hearing', 'vision', 'facial nerve'],
    steps: [
      {
        id: 'cn-2',
        category: 'CN II',
        title: 'Optic Nerve Assessment',
        description:
          'Assess visual acuity, fields, and pupillary reflexes (direct and consensual).',
        positiveFindings: [
          { description: 'Relative Afferent Pupillary Defect (Optic Neuritis)' },
          { description: 'Hemianopia (Stroke / Tumour)' }
        ],
        negativeFindings: [
          'Pupils equal and reactive to light',
          'Visual fields full to confrontation'
        ]
      },
      {
        id: 'cn-3',
        category: 'CN III, IV, VI',
        title: 'Eye Movements',
        description:
          'Test extraocular movements in an "H" pattern. Assess for nystagmus and ptosis.',
        positiveFindings: [
          { description: 'Ptosis + "Down and Out" eye (CN III Palsy)' },
          { description: 'Diplopia on lateral gaze (CN VI Palsy)' }
        ],
        negativeFindings: ['Full range of eye movements', 'No nystagmus or diplopia']
      },
      {
        id: 'cn-7',
        category: 'CN VII',
        title: 'Facial Nerve Assessment',
        description:
          'Ask the patient to raise eyebrows, close eyes tightly, smile, and puff out cheeks.',
        positiveFindings: [
          { description: "Lower motor neuron palsy (Bell's Palsy - forehead involved)" },
          { description: 'Upper motor neuron palsy (Stroke - forehead spared)' }
        ],
        negativeFindings: ['Facial symmetry at rest and on movement']
      }
    ],
    isDraft: !1
  },
  {
    id: 'rheum-joints',
    system: ce.RHEUMATOLOGICAL,
    name: 'Targeted Joint Examination (GALS)',
    shortDescription: 'Screening assessment for musculoskeletal disease.',
    keywords: ['gals', 'joints', 'arthritis', 'musculoskeletal'],
    steps: [
      {
        id: 'rhj1',
        category: 'Gait',
        title: 'Gait Assessment',
        description: 'Observe the patient walking. Look for symmetry and smoothness.',
        positiveFindings: [{ description: 'Antalgic gait' }],
        negativeFindings: ['Normal gait']
      },
      {
        id: 'rhj2',
        category: 'Arms',
        title: 'Upper Limb Screen',
        description: 'Hands behind head, hands out, turn over, make a fist.',
        positiveFindings: [{ description: 'Reduced range of motion' }],
        negativeFindings: ['Full range of motion']
      },
      {
        id: 'rhj3',
        category: 'Legs',
        title: 'Lower Limb Screen',
        description: 'Passive knee flexion, internal rotation of hip.',
        positiveFindings: [{ description: 'Crepitus' }],
        negativeFindings: ['No joint tenderness']
      }
    ],
    isDraft: !1
  },
  {
    id: 'rheum-inflammatory',
    system: ce.RHEUMATOLOGICAL,
    name: 'Inflammatory Arthritis Examination',
    shortDescription: 'Detailed assessment of small joints for synovitis.',
    keywords: ['synovitis', 'rheumatoid', 'psoriatic', 'mcp', 'pip'],
    steps: [
      {
        id: 'rhi1',
        category: 'Inspection',
        title: 'Hand Inspection',
        description: 'Look for swelling, deformity (Ulnar deviation), and wasting.',
        positiveFindings: [
          { description: 'Symmetrical small joint swelling' },
          { description: 'Boutonniere/Swan-neck deformity' }
        ],
        negativeFindings: ['No joint swelling or deformity']
      },
      {
        id: 'rhi2',
        category: 'Palpation',
        title: 'Squeeze Test',
        description: 'Squeeze MCP and MTP joints gently.',
        positiveFindings: [{ description: 'Pain on squeeze (Synovitis)' }],
        negativeFindings: ['No tenderness on squeeze']
      },
      {
        id: 'rhi3',
        category: 'Palpation',
        title: 'Joint Palpation',
        description: 'Palpate individual joints for bogginess and warmth.',
        positiveFindings: [{ description: 'Bogginess (Synovitis)' }],
        negativeFindings: ['Joints firm and cool']
      }
    ],
    physiologyBuckets: [
      {
        title: 'Clinical Principles',
        content: [
          {
            label: 'Window of Opportunity',
            description:
              'Early aggressive treatment (within 3-6 months) prevents irreversible joint damage.'
          },
          {
            label: 'Treat-to-Target',
            description:
              'Aim for clinical remission or low disease activity using objective scores (e.g., DAS28).'
          },
          {
            label: 'Symmetry',
            description: 'RA is typically symmetrical; Psoriatic/Reactive are often asymmetrical.'
          }
        ],
        color: 'text-rose-600'
      }
    ],
    isDraft: !1
  },
  {
    id: 'rheum-as',
    system: ce.RHEUMATOLOGICAL,
    name: 'Ankylosing Spondylitis Assessment',
    shortDescription: 'Focused assessment for axial spondyloarthritis.',
    keywords: ['ankylosing spondylitis', 'axial spa', 'schober', 'uveitis'],
    steps: [
      {
        id: 'rhas1',
        category: 'Inspection',
        title: 'Postural Assessment',
        description: 'Look for loss of lumbar lordosis and increased thoracic kyphosis.',
        positiveFindings: [{ description: 'Question mark posture' }],
        negativeFindings: ['Normal spinal posture']
      },
      {
        id: 'rhas2',
        category: 'Mobility',
        title: "Modified Schober's",
        description: 'Measure lumbar flexion (Normal >5cm increase).',
        positiveFindings: [{ description: "Reduced Schober's (<5cm)" }],
        negativeFindings: ['Normal lumbar mobility']
      },
      {
        id: 'rhas3',
        category: 'Extra-articular',
        title: 'Extra-articular Signs',
        description: 'Check for uveitis, psoriasis, and IBD signs.',
        positiveFindings: [{ description: 'Red eye (Uveitis)' }],
        negativeFindings: ['No extra-articular signs']
      }
    ],
    physiologyBuckets: [
      {
        title: 'Axial SpA Features',
        content: [
          {
            label: 'Inflammatory Back Pain',
            description: 'Improves with exercise, worse at rest, nocturnal pain.'
          },
          {
            label: 'Enthesitis',
            description: 'Inflammation at tendon insertion points (e.g., Achilles).'
          },
          { label: 'HLA-B27', description: 'Strong genetic association (90% of AS patients).' }
        ]
      }
    ],
    isDraft: !1
  },
  {
    id: 'rheum-back',
    system: ce.RHEUMATOLOGICAL,
    name: 'Back & Neck Examination',
    shortDescription: 'Assessment of spinal mobility and nerve root compression.',
    keywords: ['schober test', 'slr', 'sciatica', 'spinal stenosis'],
    steps: [
      {
        id: 'rhb1',
        category: 'Inspection',
        title: 'Spinal Inspection',
        description: 'Look for scoliosis, kyphosis, and muscle wasting.',
        positiveFindings: [{ description: 'Scoliosis' }],
        negativeFindings: ['Normal spinal curves']
      },
      {
        id: 'rhb2',
        category: 'Mobility',
        title: "Schober's Test",
        description: 'Measure lumbar flexion. Normal is >5cm increase.',
        positiveFindings: [{ description: "Reduced Schober's (Ankylosing Spondylitis)" }],
        negativeFindings: ['Normal mobility']
      },
      {
        id: 'rhb3',
        category: 'Special Tests',
        title: 'Straight Leg Raise (SLR)',
        description: 'Assess for nerve root irritation (L4-S1).',
        positiveFindings: [{ description: 'Positive SLR <45° (Disc prolapse)' }],
        negativeFindings: ['SLR 90°']
      }
    ],
    isDraft: !1
  },
  {
    id: 'rheum-fibro',
    system: ce.RHEUMATOLOGICAL,
    name: 'Fibromyalgia Assessment',
    shortDescription: 'Evaluation of widespread pain and tender points.',
    keywords: ['fibromyalgia', 'tender points', 'chronic pain', 'fatigue'],
    steps: [
      {
        id: 'rhf1',
        category: 'Assessment',
        title: 'Widespread Pain Index (WPI)',
        description: 'Assess pain in 19 body regions over the last week.',
        positiveFindings: [{ description: 'High WPI score' }],
        negativeFindings: ['No widespread pain']
      },
      {
        id: 'rhf2',
        category: 'Palpation',
        title: 'Tender Points',
        description: 'Apply 4kg of pressure to 18 specific points.',
        positiveFindings: [{ description: '>= 11/18 tender points' }],
        negativeFindings: ['No specific tender points']
      }
    ],
    isDraft: !1
  },
  {
    id: 'endo-thyroid',
    system: ce.ENDOCRINE,
    name: 'Thyroid Examination',
    shortDescription: 'Assessment of thyroid function and goitre.',
    keywords: ['goitre', 'hyperthyroidism', 'hypothyroidism', 'exophthalmos'],
    steps: [
      {
        id: 'et1',
        category: 'Inspection',
        title: 'Hands & Eyes',
        description: 'Look for tremor, palmar erythema, and eye signs.',
        positiveFindings: [
          { description: 'Lid lag (Hyperthyroidism)' },
          { description: 'Exophthalmos (Graves)' }
        ],
        negativeFindings: ['No eye signs']
      },
      {
        id: 'et2',
        category: 'Palpation',
        title: 'Thyroid Gland',
        description: 'Palpate from behind while the patient swallows.',
        positiveFindings: [{ description: 'Goitre' }, { description: 'Nodule' }],
        negativeFindings: ['Thyroid not palpable']
      }
    ],
    isDraft: !1
  },
  {
    id: 'endo-foot',
    system: ce.ENDOCRINE,
    name: 'Diabetic Foot Examination',
    shortDescription: 'Screening for neuropathy and peripheral vascular disease.',
    keywords: ['diabetes', 'monofilament', 'neuropathy', 'ulcer'],
    steps: [
      {
        id: 'ef1',
        category: 'Inspection',
        title: 'Foot Inspection',
        description: 'Look for ulcers, calluses, and Charcot joint.',
        positiveFindings: [{ description: 'Active ulcer' }],
        negativeFindings: ['Skin intact']
      },
      {
        id: 'ef2',
        category: 'Neurological',
        title: 'Monofilament Test',
        description: 'Test 10 points with 10g monofilament.',
        positiveFindings: [{ description: 'Loss of protective sensation' }],
        negativeFindings: ['Sensation intact']
      }
    ],
    isDraft: !1
  },
  {
    id: 'endo-cushing',
    system: ce.ENDOCRINE,
    name: 'Cushing & Addison Examination',
    shortDescription: 'Assessment of adrenal dysfunction.',
    keywords: ['cortisol', 'striae', 'hyperpigmentation', 'moon face'],
    steps: [
      {
        id: 'ec1',
        category: 'Cushing',
        title: 'Cushingoid Features',
        description: 'Look for moon face, buffalo hump, and purple striae.',
        positiveFindings: [{ description: 'Purple striae >1cm' }],
        negativeFindings: ['No cushingoid features']
      },
      {
        id: 'ec2',
        category: 'Addison',
        title: 'Addisonian Features',
        description: 'Look for hyperpigmentation (palmar creases/buccal).',
        positiveFindings: [{ description: 'Hyperpigmentation' }],
        negativeFindings: ['Normal skin pigmentation']
      }
    ],
    isDraft: !1
  },
  {
    id: 'neuro-upper',
    system: ce.NEUROLOGICAL,
    name: 'Upper Extremity Neurological Exam',
    shortDescription: 'Assessment of tone, power, reflexes, and sensation in the arms.',
    keywords: ['tone', 'power', 'reflexes', 'sensation', 'coordination'],
    steps: [
      {
        id: 'nu1',
        category: 'Tone',
        title: 'Tone Assessment',
        description: 'Assess for spasticity, rigidity, or hypotonia.',
        positiveFindings: [
          { description: 'Spasticity (UMN)' },
          { description: 'Cogwheel rigidity (Parkinsonism)' }
        ],
        negativeFindings: ['Normal tone']
      },
      {
        id: 'nu2',
        category: 'Power',
        title: 'Power Assessment',
        description: 'Grade power 0-5 (MRC scale).',
        positiveFindings: [{ description: 'Weakness (LMN/UMN)' }],
        negativeFindings: ['Power 5/5 in all groups']
      },
      {
        id: 'nu3',
        category: 'Reflexes',
        title: 'Reflexes',
        description: 'Test Biceps (C5/6), Triceps (C7), Supinator (C6).',
        positiveFindings: [
          { description: 'Hyperreflexia (UMN)' },
          { description: 'Areflexia (LMN)' }
        ],
        negativeFindings: ['Reflexes 2+ symmetrical']
      }
    ],
    isDraft: !1
  },
  {
    id: 'neuro-lower',
    system: ce.NEUROLOGICAL,
    name: 'Lower Extremity Neurological Exam',
    shortDescription: 'Assessment of tone, power, reflexes, and sensation in the legs.',
    keywords: ['tone', 'power', 'reflexes', 'sensation', 'gait'],
    steps: [
      {
        id: 'nl1',
        category: 'Tone',
        title: 'Tone Assessment',
        description: 'Assess for spasticity or rigidity.',
        positiveFindings: [{ description: 'Clonus (UMN)' }],
        negativeFindings: ['Normal tone']
      },
      {
        id: 'nl2',
        category: 'Power',
        title: 'Power Assessment',
        description: 'Grade power 0-5 (MRC scale).',
        positiveFindings: [{ description: 'Foot drop (L5/Peroneal nerve)' }],
        negativeFindings: ['Power 5/5 in all groups']
      },
      {
        id: 'nl3',
        category: 'Reflexes',
        title: 'Reflexes',
        description: 'Test Knee (L3/4), Ankle (S1), Plantar (Babinski).',
        positiveFindings: [{ description: 'Extensor plantar (Babinski - UMN)' }],
        negativeFindings: ['Reflexes 2+ symmetrical, flexor plantars']
      }
    ],
    isDraft: !1
  },
  {
    id: 'stroke-nihss',
    system: ce.NEUROLOGICAL,
    name: 'Stroke Assessment (NIHSS/FAST)',
    shortDescription: 'Rapid assessment of suspected acute stroke.',
    keywords: ['stroke', 'nihss', 'fast', 'tpa', 'thrombectomy'],
    steps: [
      {
        id: 'st1',
        category: 'FAST',
        title: 'FAST Screen',
        description: 'Face, Arms, Speech, Time.',
        positiveFindings: [
          { description: 'Facial droop' },
          { description: 'Arm drift' },
          { description: 'Slurred speech' }
        ],
        negativeFindings: ['FAST negative']
      },
      {
        id: 'st2',
        category: 'NIHSS',
        title: 'NIHSS Score',
        description: 'Comprehensive 11-item stroke scale.',
        positiveFindings: [{ description: 'High NIHSS score (>20 - Severe stroke)' }],
        negativeFindings: ['NIHSS 0']
      }
    ],
    isDraft: !1
  },
  {
    id: 'acute-abcde',
    system: ce.ACUTE_CARE,
    name: 'ABCDE Assessment',
    shortDescription: 'Acutely ill patient primary survey.',
    keywords: ['emergency', 'resuscitation', 'triage'],
    steps: [
      {
        id: 'abcde-a',
        category: 'A',
        title: 'Airway',
        description:
          'Assess patency. Is the patient talking? Look for obstruction (stridor, secretions).',
        positiveFindings: [
          { description: 'Stridor (Upper airway obstruction)' },
          { description: 'Gurgling (Secretions / Vomit)' }
        ],
        negativeFindings: ['Airway patent', 'Patient speaking in full sentences']
      },
      {
        id: 'abcde-b',
        category: 'B',
        title: 'Breathing',
        description: 'Assess RR, SpO2, chest expansion, and auscultation.',
        positiveFindings: [
          { description: 'Tachypnoea > 25 bpm' },
          { description: 'SpO2 < 92% on high-flow O2' }
        ],
        negativeFindings: ['RR 16 bpm', 'SpO2 98% on room air']
      },
      {
        id: 'abcde-c',
        category: 'C',
        title: 'Circulation',
        description: 'Assess HR, BP, CRT, and peripheral temperature.',
        positiveFindings: [
          { description: 'Hypotension (SBP < 90 mmHg)' },
          { description: 'Tachycardia (HR > 100 bpm)' },
          { description: 'CRT > 2s' }
        ],
        negativeFindings: ['HR 80 bpm', 'BP 120/80 mmHg', 'CRT < 2s']
      }
    ],
    redFlags: [
      'Airway obstruction (Stridor/Gurgling)',
      'Respiratory rate > 30 or < 8',
      'Systolic BP < 90 mmHg',
      'GCS < 8 (Protect the airway)'
    ],
    isDraft: !1
  },
  {
    id: 'acute-deteriorating',
    system: ce.ACUTE_CARE,
    name: 'Assessment of the Deteriorating Patient',
    shortDescription: 'Structured approach to clinical deterioration using NEWS2.',
    keywords: ['news2', 'deterioration', 'escalation', 'met call'],
    steps: [
      {
        id: 'det1',
        category: 'Assessment',
        title: 'NEWS2 Score',
        description: 'Calculate NEWS2 based on physiological parameters.',
        positiveFindings: [{ description: 'NEWS2 >= 5 (Urgent review)' }],
        negativeFindings: ['NEWS2 < 2']
      },
      {
        id: 'det2',
        category: 'Escalation',
        title: 'ISBAR Handover',
        description: 'Identify, Situation, Background, Assessment, Recommendation.',
        positiveFindings: [{ description: 'Clear escalation plan' }],
        negativeFindings: ['No escalation required']
      }
    ],
    isDraft: !1
  },
  {
    id: 'acute-airway',
    system: ce.ACUTE_CARE,
    name: 'Airway Assessment',
    shortDescription: 'Predicting difficult airway management.',
    keywords: ['mallampati', 'difficult airway', 'intubation', 'lemon'],
    steps: [
      {
        id: 'aw1',
        category: 'LEMON',
        title: 'LEMON Criteria',
        description: 'Look, Evaluate (3-3-2), Mallampati, Obstruction, Neck mobility.',
        positiveFindings: [
          { description: 'Mallampati IV (Difficult)' },
          { description: 'Limited neck extension' }
        ],
        negativeFindings: ['Mallampati I', 'Normal 3-3-2 rule']
      }
    ],
    isDraft: !1
  },
  {
    id: 'acute-als',
    system: ce.ACUTE_CARE,
    name: 'ALS Algorithm',
    shortDescription: 'Advanced Life Support management of cardiac arrest.',
    keywords: ['cpr', 'defibrillation', 'adrenaline', 'arrest'],
    steps: [
      {
        id: 'als1',
        category: 'Rhythm',
        title: 'Rhythm Check',
        description: 'Shockable (VF/pVT) vs Non-shockable (PEA/Asystole).',
        positiveFindings: [{ description: 'Ventricular Fibrillation' }],
        negativeFindings: ['ROSC achieved']
      },
      {
        id: 'als2',
        category: 'Drugs',
        title: 'Adrenaline & Amiodarone',
        description: 'Adrenaline 1mg every 3-5 mins. Amiodarone 300mg after 3 shocks.',
        positiveFindings: [{ description: 'Drug delivery confirmed' }],
        negativeFindings: ['No drugs required yet']
      }
    ],
    isDraft: !1
  },
  {
    id: 'acute-anaphylaxis',
    system: ce.ACUTE_CARE,
    name: 'Anaphylaxis Algorithm',
    shortDescription: 'Emergency management of severe allergic reactions.',
    keywords: ['adrenaline', 'epinephrine', 'allergy', 'shock'],
    steps: [
      {
        id: 'ana1',
        category: 'Diagnosis',
        title: 'Clinical Criteria',
        description: 'Sudden onset, life-threatening airway/breathing/circulation problems.',
        positiveFindings: [{ description: 'Stridor/Wheeze' }, { description: 'Hypotension' }],
        negativeFindings: ['Stable vitals']
      },
      {
        id: 'ana2',
        category: 'Treatment',
        title: 'IM Adrenaline',
        description: '0.5mg IM Adrenaline (1:1000) immediately.',
        positiveFindings: [{ description: 'Adrenaline administered' }],
        negativeFindings: ['Symptoms resolving']
      }
    ],
    isDraft: !1
  },
  {
    id: 'acute-sepsis',
    system: ce.ACUTE_CARE,
    name: 'Sepsis Assessment',
    shortDescription: 'Identification and management of sepsis (Sepsis Six).',
    keywords: ['sepsis', 'qsofa', 'sepsis six', 'infection'],
    steps: [
      {
        id: 'sep1',
        category: 'Screening',
        title: 'qSOFA / Red Flag Sepsis',
        description: 'RR >= 22, Altered mentation, SBP <= 100.',
        positiveFindings: [{ description: 'Lactate > 2' }],
        negativeFindings: ['qSOFA 0']
      },
      {
        id: 'sep2',
        category: 'Sepsis Six',
        title: 'The Sepsis Six',
        description: 'Oxygen, Cultures, Antibiotics, Fluids, Lactate, Urine output.',
        positiveFindings: [{ description: 'All 6 completed within 1 hour' }],
        negativeFindings: ['Not septic']
      }
    ],
    isDraft: !1
  },
  {
    id: 'acute-mh',
    system: ce.ACUTE_CARE,
    name: 'Malignant Hyperthermia (MH)',
    shortDescription: 'Emergency management of MH crisis.',
    keywords: ['dantrolene', 'hyperthermia', 'anaesthesia', 'succinylcholine'],
    steps: [
      {
        id: 'mh1',
        category: 'Diagnosis',
        title: 'Clinical Signs',
        description: 'Hypercapnia, muscle rigidity, tachycardia, hyperthermia.',
        positiveFindings: [{ description: 'Masseter spasm' }, { description: 'Rising ETCO2' }],
        negativeFindings: ['Stable ETCO2']
      },
      {
        id: 'mh2',
        category: 'Treatment',
        title: 'Dantrolene',
        description: 'Stop triggers. Give Dantrolene 2.5mg/kg IV.',
        positiveFindings: [{ description: 'Dantrolene administered' }],
        negativeFindings: ['Crisis averted']
      }
    ],
    isDraft: !1
  },
  {
    id: 'acute-trauma',
    system: ce.ACUTE_CARE,
    name: 'Trauma Assessment (ATLS/ABCDE)',
    shortDescription: 'Systematic primary and secondary survey for the major trauma patient.',
    keywords: ['trauma', 'atls', 'abcde', 'primary survey', 'secondary survey', 'spine'],
    steps: [
      {
        id: 'tr1',
        category: 'A',
        title: 'Airway & C-Spine',
        description:
          'Assess airway patency while maintaining manual in-line cervical spine stabilisation.',
        positiveFindings: [
          { description: 'Airway obstruction (Blood/Vomit/Tongue)' },
          { description: 'Cervical spine tenderness' }
        ],
        negativeFindings: ['Airway patent', 'C-spine stabilised']
      },
      {
        id: 'tr2',
        category: 'B',
        title: 'Breathing & Ventilation',
        description:
          'Assess for life-threatening chest injuries (Tension pneumothorax, Open pneumothorax, Flail chest, Massive haemothorax).',
        positiveFindings: [
          { description: 'Tracheal deviation (Tension Pneumothorax)' },
          { description: 'Absent breath sounds (Pneumothorax/Haemothorax)' },
          { description: 'Paradoxical chest wall movement (Flail chest)' }
        ],
        negativeFindings: ['Symmetrical chest expansion', 'Breath sounds present bilaterally']
      },
      {
        id: 'tr3',
        category: 'C',
        title: 'Circulation & Haemorrhage',
        description:
          'Identify and control external haemorrhage. Assess for internal bleeding (Chest, Abdomen, Pelvis, Long bones, Floor).',
        positiveFindings: [
          { description: 'Hypotension / Tachycardia (Shock)' },
          { description: 'Pelvic instability' },
          { description: 'Rigid abdomen' }
        ],
        negativeFindings: ['Stable vitals', 'Pelvis stable', 'No external haemorrhage']
      },
      {
        id: 'tr4',
        category: 'D',
        title: 'Disability / Neuro',
        description: 'Assess GCS, pupil size/reactivity, and lateralising signs.',
        positiveFindings: [
          { description: 'GCS < 8 (Intubate)' },
          { description: 'Unequal pupils (Raised ICP)' }
        ],
        negativeFindings: ['GCS 15', 'Pupils equal and reactive']
      },
      {
        id: 'tr5',
        category: 'E',
        title: 'Exposure & Environment',
        description:
          'Full exposure of the patient while preventing hypothermia (Warm blankets/fluids).',
        positiveFindings: [
          { description: 'Hypothermia' },
          { description: 'Hidden injuries on posterior surface' }
        ],
        negativeFindings: ['Patient warm', 'No hidden injuries']
      },
      {
        id: 'tr6',
        category: 'Secondary',
        title: 'Secondary Survey',
        description:
          'Head-to-toe examination performed only after the primary survey is complete and the patient is stabilised.',
        positiveFindings: [
          { description: "Battle's sign / Raccoon eyes (Basal skull fracture)" },
          { description: 'Limb deformities' }
        ],
        negativeFindings: ['Secondary survey complete']
      }
    ],
    redFlags: [
      'Tension Pneumothorax (Clinical diagnosis - do not wait for X-ray)',
      "Cardiac Tamponade (Beck's Triad: Hypotension, JVP elevation, Muffled heart sounds)",
      'Massive Haemothorax (>1500ml initial drainage)',
      'Flail Chest (Paradoxical movement)',
      'Open Pneumothorax (Sucking chest wound)'
    ],
    onePager: {
      basics: 'Primary Survey (ABCDE) -> Resuscitation -> Secondary Survey (Head-to-toe).',
      normalValues: ['GCS: 15', 'SBP: >90 mmHg', 'SpO2: >94%'],
      redFlags: ['Tension Pneumothorax', 'Cardiac Tamponade', 'Massive Haemothorax', 'GCS < 8'],
      goldenRules:
        'Treat the most life-threatening injuries first. The Primary Survey is dynamic and must be repeated if the patient deteriorates.'
    },
    isDraft: !1
  },
  {
    id: 'paed-newborn',
    system: ce.PAEDIATRIC,
    name: 'Newborn Examination (NIPE)',
    shortDescription: 'Comprehensive screening of the neonate within 72 hours.',
    keywords: ['nipe', 'newborn', 'neonate', 'reflexes', 'hips'],
    steps: [
      {
        id: 'pn1',
        category: 'General',
        title: 'General Appearance',
        description: 'Assess colour, tone, and activity.',
        positiveFindings: [{ description: 'Jaundice <24h' }],
        negativeFindings: ['Normal tone and colour']
      },
      {
        id: 'pn2',
        category: 'Hips',
        title: 'Barlow & Ortolani',
        description: 'Screen for developmental dysplasia of the hip (DDH).',
        positiveFindings: [{ description: 'Palpable "clunk" (DDH)' }],
        negativeFindings: ['Hips stable']
      },
      {
        id: 'pn3',
        category: 'Reflexes',
        title: 'Primitive Reflexes',
        description: 'Test Moro, Sucking, and Rooting reflexes.',
        positiveFindings: [{ description: 'Absent Moro reflex' }],
        negativeFindings: ['Reflexes present']
      }
    ],
    isDraft: !1
  },
  {
    id: 'paed-emergency',
    system: ce.PAEDIATRIC,
    name: 'Emergency Paediatric Assessment',
    shortDescription: 'Rapid primary survey for the acutely unwell child.',
    keywords: ['paediatric emergency', 'abcde', 'wetflag', 'triage'],
    steps: [
      {
        id: 'pe1',
        category: 'Assessment',
        title: 'Paediatric Assessment Triangle',
        description: 'Assess Appearance, Work of Breathing, and Circulation.',
        positiveFindings: [
          { description: 'Altered mental status' },
          { description: 'Increased work of breathing' }
        ],
        negativeFindings: ['Stable PAT']
      },
      {
        id: 'pe2',
        category: 'ABCDE',
        title: 'Primary Survey',
        description: 'Airway, Breathing, Circulation, Disability, Exposure.',
        positiveFindings: [{ description: 'Stridor' }, { description: 'Capillary refill > 2s' }],
        negativeFindings: ['ABCDE stable']
      },
      {
        id: 'pe3',
        category: 'WETFLAG',
        title: 'Resuscitation Calculations',
        description: 'Weight, Energy, Tube, Fluids, Lorazepam, Adrenaline, Glucose.',
        positiveFindings: [{ description: 'Calculations completed' }],
        negativeFindings: ['Not required']
      }
    ],
    onePager: {
      basics: 'Appearance (Tone/Interact), Breathing (Work/Rate), Circulation (Color/Pulse).',
      normalValues: ['Weight (kg): (Age + 4) x 2', 'Energy (J): 4J/kg', 'Tube (ETT): (Age/4) + 4'],
      redFlags: [
        'Silent Chest',
        'Cyanosis',
        'Bradycardia (Late sign)',
        'Hypotension (Very late sign)'
      ],
      goldenRules: `Children compensate well until they don't. A "quiet" sick child is a major red flag.`
    },
    isDraft: !1
  },
  {
    id: 'paed-neonatal-fever',
    system: ce.PAEDIATRIC,
    name: 'Neonatal Fever Assessment',
    shortDescription: 'Evaluation of fever in infants < 28 days old.',
    keywords: ['neonatal fever', 'sepsis', 'meningitis', 'lumbar puncture'],
    steps: [
      {
        id: 'pnf1',
        category: 'Assessment',
        title: 'Clinical Stability',
        description: 'Assess for lethargy, poor feeding, and respiratory distress.',
        positiveFindings: [
          { description: 'Bulging fontanelle (Meningitis)' },
          { description: 'Grunting/Nasal flaring' }
        ],
        negativeFindings: ['Infant appears well']
      },
      {
        id: 'pnf2',
        category: 'Investigations',
        title: 'Sepsis Screen',
        description: 'FBC, CRP, Blood culture, Urine culture, LP.',
        positiveFindings: [{ description: 'Elevated inflammatory markers' }],
        negativeFindings: ['Screen initiated']
      }
    ],
    redFlags: [
      'Temperature > 38°C in infant < 28 days',
      'Bulging fontanelle',
      'Non-blanching rash',
      'Seizures'
    ],
    isDraft: !1
  },
  {
    id: 'paed-children',
    system: ce.PAEDIATRIC,
    name: 'Examining Children (Stat Pearls)',
    shortDescription: 'Developmental and clinical assessment of the paediatric patient.',
    keywords: ['milestones', 'growth charts', 'paediatrics'],
    steps: [
      {
        id: 'pc1',
        category: 'Growth',
        title: 'Growth Parameters',
        description: 'Plot height, weight, and head circumference.',
        positiveFindings: [{ description: 'Crossing centiles' }],
        negativeFindings: ['Growth along centiles']
      },
      {
        id: 'pc2',
        category: 'Development',
        title: 'Developmental Milestones',
        description: 'Assess gross motor, fine motor, speech, and social.',
        positiveFindings: [{ description: 'Developmental delay' }],
        negativeFindings: ['Milestones met for age']
      }
    ],
    isDraft: !1
  },
  {
    id: 'paed-genetic',
    system: ce.PAEDIATRIC,
    name: 'Genetic Abnormalities & Physical Features',
    shortDescription: 'Identification of dysmorphic features associated with genetic syndromes.',
    keywords: ['down syndrome', 'turner syndrome', 'dysmorphism'],
    steps: [
      {
        id: 'pg1',
        category: 'Features',
        title: 'Dysmorphic Features',
        description: 'Look for epicanthic folds, low-set ears, and single palmar crease.',
        positiveFindings: [
          { description: 'Single palmar crease (Down Syndrome)' },
          { description: 'Webbed neck (Turner Syndrome)' }
        ],
        negativeFindings: ['No dysmorphic features']
      }
    ],
    isDraft: !1
  },
  {
    id: 'womens-antepartum',
    system: ce.WOMENS_HEALTH,
    name: 'Antepartum Assessment',
    shortDescription: 'Obstetric examination of the pregnant patient.',
    keywords: ['pregnancy', 'fundal height', 'fetal heart', 'leopold'],
    steps: [
      {
        id: 'wa1',
        category: 'Abdomen',
        title: 'Fundal Height',
        description: 'Measure from symphysis pubis to top of fundus.',
        positiveFindings: [{ description: 'SFH < dates (IUGR)' }],
        negativeFindings: ['SFH matches dates']
      },
      {
        id: 'wa2',
        category: 'Leopold',
        title: 'Leopold Manoeuvres',
        description: 'Determine fetal lie, presentation, and position.',
        positiveFindings: [{ description: 'Breech presentation' }],
        negativeFindings: ['Cephalic presentation']
      }
    ],
    isDraft: !1
  },
  {
    id: 'womens-pelvic',
    system: ce.WOMENS_HEALTH,
    name: 'Pelvic Examination',
    shortDescription: 'Bimanual and speculum assessment of the female pelvis.',
    keywords: ['speculum', 'bimanual', 'cervix', 'adnexa'],
    steps: [
      {
        id: 'wp1',
        category: 'Speculum',
        title: 'Speculum Exam',
        description: 'Visualize cervix and vaginal walls.',
        positiveFindings: [{ description: 'Cervical excitation (Ectopic/PID)' }],
        negativeFindings: ['Cervix healthy']
      },
      {
        id: 'wp2',
        category: 'Bimanual',
        title: 'Bimanual Palpation',
        description: 'Assess uterine size and adnexal masses.',
        positiveFindings: [{ description: 'Adnexal mass' }],
        negativeFindings: ['No masses palpable']
      }
    ],
    isDraft: !1
  },
  {
    id: 'womens-breast',
    system: ce.WOMENS_HEALTH,
    name: 'Breast Examination',
    shortDescription: 'Systematic assessment of breast tissue and axillary nodes.',
    keywords: ['breast lump', 'axilla', 'nipple discharge'],
    steps: [
      {
        id: 'wb1',
        category: 'Inspection',
        title: 'Breast Inspection',
        description: 'Look for skin changes, tethering, and nipple inversion.',
        positiveFindings: [{ description: "Peau d'orange" }],
        negativeFindings: ['No skin changes']
      },
      {
        id: 'wb2',
        category: 'Palpation',
        title: 'Breast Palpation',
        description: 'Palpate all 4 quadrants and the axillary tail.',
        positiveFindings: [{ description: 'Hard, irregular mass' }],
        negativeFindings: ['No lumps palpable']
      }
    ],
    isDraft: !1
  },
  {
    id: 'mental-mse',
    system: ce.MENTAL_HEALTH,
    name: 'Mental State Examination (MSE)',
    shortDescription: 'Structured assessment of psychiatric symptoms.',
    keywords: ['mse', 'psychiatry', 'mood', 'affect', 'insight'],
    steps: [
      {
        id: 'mse1',
        category: 'ASEPTIC',
        title: 'Appearance & Behaviour',
        description: 'Observe grooming, eye contact, and rapport.',
        positiveFindings: [{ description: 'Dishevelled appearance' }],
        negativeFindings: ['Well-groomed']
      },
      {
        id: 'mse2',
        category: 'ASEPTIC',
        title: 'Mood & Affect',
        description: 'Subjective mood and objective affect.',
        positiveFindings: [{ description: 'Flat affect' }],
        negativeFindings: ['Euthymic mood']
      }
    ],
    isDraft: !1
  },
  {
    id: 'specialty-frailty',
    system: ce.SPECIALTY,
    name: 'Frailty Assessment',
    shortDescription: 'Evaluation of physiological reserve in older adults.',
    keywords: ['frailty', 'rockwood', 'geriatrics'],
    steps: [
      {
        id: 'fr1',
        category: 'Assessment',
        title: 'Clinical Frailty Scale (CFS)',
        description: 'Score from 1 (Very Fit) to 9 (Terminally Ill).',
        positiveFindings: [{ description: 'CFS >= 5 (Mildly frail)' }],
        negativeFindings: ['CFS 1']
      }
    ],
    isDraft: !1
  },
  {
    id: 'specialty-mmse',
    system: ce.SPECIALTY,
    name: 'Mini-Mental State Examination (MMSE)',
    shortDescription: 'Cognitive screening tool for dementia.',
    keywords: ['mmse', 'cognition', 'dementia', 'alzheimer'],
    steps: [
      {
        id: 'mm1',
        category: 'Assessment',
        title: 'MMSE Score',
        description: 'Score out of 30 across orientation, registration, etc.',
        positiveFindings: [{ description: 'Score < 24 (Cognitive impairment)' }],
        negativeFindings: ['Score 30/30']
      }
    ],
    isDraft: !1
  },
  {
    id: 'derm-general',
    system: ce.DERMATOLOGY,
    name: 'General Dermatological Examination',
    shortDescription:
      'Systematic approach to skin, hair, and nail assessment, following DermNet NZ standards.',
    keywords: ['skin', 'hair', 'nails', 'morphology', 'dermnet', 'dermatology'],
    visualAids: [
      {
        type: 'video',
        description:
          'Dermatological Examination: Systematic approach from head to toe, including mucosal surfaces.',
        source: 'https://picsum.photos/seed/dermexam/800/450'
      },
      {
        type: 'diagram',
        description: 'Skin Layers and Morphology: Understanding primary and secondary lesions.',
        source: 'https://picsum.photos/seed/dermmorph/800/450'
      }
    ],
    steps: [
      {
        id: 'd1',
        category: 'Inspection',
        title: 'General Inspection',
        description:
          'Assess the distribution of lesions (generalized, localized, symmetrical, sun-exposed).',
        positiveFindings: [
          { description: 'Generalized eruption (Exanthem)' },
          { description: 'Symmetrical distribution (Endogenous eczema / Psoriasis)' },
          { description: 'Sun-exposed distribution (Photosensitivity / Solar keratoses)' }
        ],
        negativeFindings: ['Skin clear of lesions', 'Normal distribution']
      },
      {
        id: 'd2',
        category: 'Morphology',
        title: 'Primary Lesion Assessment',
        description:
          'Identify the primary lesion type: Macule, Papule, Plaque, Nodule, Vesicle, Bulla, Pustule.',
        positiveFindings: [
          { description: 'Erythematous plaques (Psoriasis)' },
          { description: 'Tense bullae (Bullous Pemphigoid)' },
          { description: 'Umbilicated papules (Molluscum Contagiosum)' }
        ],
        negativeFindings: ['No primary lesions identified']
      },
      {
        id: 'd3',
        category: 'Morphology',
        title: 'Secondary Changes',
        description:
          'Look for scale, crust, erosion, ulceration, excoriation, and lichenification.',
        positiveFindings: [
          { description: 'Silvery scale (Psoriasis)' },
          { description: 'Honey-colored crust (Impetigo)' },
          { description: 'Lichenification (Chronic Eczema)' }
        ],
        negativeFindings: ['No secondary changes']
      },
      {
        id: 'd4',
        category: 'Special Sites',
        title: 'Hair, Nails & Mucosa',
        description:
          'Inspect the scalp, oral mucosa, and all 20 nails for stigmata of systemic disease.',
        positiveFindings: [
          { description: 'Nail pitting / Onycholysis (Psoriasis)' },
          { description: 'Koilonychia (Iron deficiency)' },
          { description: 'Alopecia areata (Autoimmune)' }
        ],
        negativeFindings: ['Hair, nails, and mucosa normal']
      }
    ],
    differentialDiagnoses: [
      {
        condition: 'Psoriasis',
        explanation:
          'Well-demarcated erythematous plaques with silvery scale, typically on extensor surfaces.'
      },
      {
        condition: 'Atopic Dermatitis',
        explanation:
          'Poorly-defined erythematous patches with excoriations, typically on flexural surfaces.'
      },
      {
        condition: 'Tinea Corporis',
        explanation: 'Annular lesion with peripheral scale and central clearing.'
      }
    ],
    redFlags: [
      'Erythroderma (>90% skin involvement)',
      'Nikolsky sign positive (SJS/TEN)',
      'Rapidly evolving pigmented lesion (Melanoma)',
      'Fever + Purpuric rash (Meningococcaemia)'
    ],
    physiologyBuckets: [
      {
        title: 'A) Skin Barrier Function',
        content: [
          {
            label: 'Epidermal Turnover',
            description: 'Accelerated in Psoriasis (4 days vs 28 days).'
          },
          {
            label: 'Filaggrin Deficiency',
            description: 'Leads to impaired barrier and Atopic Dermatitis.'
          }
        ],
        color: 'text-orange-600'
      }
    ],
    onePager: {
      basics:
        'Distribution, Morphology (Primary/Secondary), and Special Sites (Hair/Nails/Mucosa).',
      normalValues: ['Skin: Intact', 'Nails: Smooth', 'Scalp: No scaling'],
      redFlags: ['Erythroderma', 'Nikolsky Sign', 'Atypical Nevi', 'Purpura'],
      goldenRules:
        "If it's dry, wet it; if it's wet, dry it. Always describe the morphology before the diagnosis."
    },
    isDraft: !1
  },
  {
    id: 'derm-lesion',
    system: ce.DERMATOLOGY,
    name: 'Skin Lesion Assessment (SCALPEL)',
    shortDescription:
      'A structured approach to describing any skin lesion, optimized for DermNet NZ terminology.',
    keywords: ['scalpel', 'abcde', 'melanoma', 'bcc', 'scc', 'lesion'],
    steps: [
      {
        id: 'sl1',
        category: 'Description',
        title: 'SCALPEL Mnemonic',
        description: 'Size, Colour, Age, Location, Pattern, Elevation, Loss of integrity.',
        positiveFindings: [
          { description: 'Asymmetrical shape' },
          { description: 'Multiple colours' }
        ],
        negativeFindings: ['Symmetrical, uniform lesion']
      },
      {
        id: 'sl2',
        category: 'Malignancy',
        title: 'ABCDE of Melanoma',
        description: 'Asymmetry, Border irregularity, Colour variegation, Diameter >6mm, Evolving.',
        positiveFindings: [{ description: 'Diameter > 6mm' }, { description: 'Irregular borders' }],
        negativeFindings: ['ABCDE negative']
      },
      {
        id: 'sl3',
        category: 'Palpation',
        title: 'Palpation of Lesion',
        description: 'Assess consistency, tenderness, and tethering.',
        positiveFindings: [
          { description: 'Induration (SCC)' },
          { description: 'Pearly border (BCC)' }
        ],
        negativeFindings: ['Soft and mobile']
      }
    ],
    isDraft: !1
  },
  {
    id: 'eye-exam',
    system: ce.OPHTHALMOLOGY,
    name: 'Comprehensive Eye & Ophthalmic Examination',
    shortDescription: 'Systematic assessment of visual acuity, fields, movements, and fundoscopy.',
    keywords: ['vision', 'pupils', 'fundoscopy', 'glaucoma', 'cataract', 'retina'],
    visualAids: [
      {
        type: 'video',
        description:
          'Ophthalmic Examination: Proper technique for fundoscopy and slit lamp basics.',
        source: 'https://picsum.photos/seed/eyeexam/800/450'
      },
      {
        type: 'diagram',
        description: 'Retinal Landmarks: Identifying the optic disc, macula, and arcade vessels.',
        source: 'https://picsum.photos/seed/retina/800/450'
      }
    ],
    steps: [
      {
        id: 'eye1',
        category: 'Acuity',
        title: 'Visual Acuity',
        description:
          'Test each eye using a Snellen chart at 6 metres. Use pinhole if acuity is reduced.',
        positiveFindings: [
          { description: 'Acuity < 6/12 (Significant impairment)' },
          { description: 'Improvement with pinhole (Refractive error)' }
        ],
        negativeFindings: ['Acuity 6/6 bilaterally']
      },
      {
        id: 'eye2',
        category: 'Pupils',
        title: 'Pupillary Reflexes',
        description: 'Assess direct, consensual, and swinging flashlight test for RAPD.',
        positiveFindings: [
          { description: 'Relative Afferent Pupillary Defect (RAPD - Optic nerve lesion)' },
          { description: 'Fixed dilated pupil (Acute Glaucoma / CN III palsy)' }
        ],
        negativeFindings: ['Pupils equal, round, reactive to light and accommodation']
      },
      {
        id: 'eye3',
        category: 'Fields',
        title: 'Visual Fields',
        description:
          'Test by confrontation in all four quadrants. Map any scotomas or hemianopias.',
        positiveFindings: [
          { description: 'Bitemporal hemianopia (Pituitary tumour)' },
          { description: 'Homonymous hemianopia (Stroke)' }
        ],
        negativeFindings: ['Visual fields full to confrontation']
      },
      {
        id: 'eye4',
        category: 'Fundoscopy',
        title: 'Direct Ophthalmoscopy',
        description: 'Assess red reflex, optic disc (margins, cup), vessels, and macula.',
        positiveFindings: [
          { description: 'Papilloedema (Raised ICP)' },
          { description: 'Silver/Copper wiring (Hypertension)' },
          { description: 'Cotton wool spots (Diabetes / Ischaemia)' },
          { description: 'Drusen (Macular Degeneration)' }
        ],
        negativeFindings: [
          'Clear red reflex',
          'Optic disc margins sharp',
          'No haemorrhages or exudates'
        ]
      }
    ],
    redFlags: [
      'Sudden painless loss of vision (Retinal detachment / Artery occlusion)',
      'Painful red eye with reduced acuity (Acute Angle Closure Glaucoma)',
      'New onset flashes and floaters',
      'Papilloedema (Medical emergency)'
    ],
    onePager: {
      basics: 'Acuity (Snellen), Pupils (RAPD), Fields (Confrontation), Fundoscopy (Disc/Vessels).',
      normalValues: ['Acuity: 6/6', 'IOP: 10-21 mmHg', 'Cup-to-disc ratio: <0.3'],
      redFlags: ['Sudden Vision Loss', 'Painful Red Eye', 'RAPD', 'Papilloedema'],
      goldenRules: 'Always check visual acuity first. It is the "vital sign" of the eye.'
    },
    isDraft: !1
  },
  {
    id: 'ent-ear',
    system: ce.ENT,
    name: 'Ear Examination & Otoscopy',
    shortDescription: 'Assessment of the external ear, canal, and tympanic membrane.',
    keywords: ['otoscopy', 'hearing', 'tympanic membrane', 'tinnitus', 'vertigo'],
    steps: [
      {
        id: 'ear1',
        category: 'Inspection',
        title: 'External Ear',
        description:
          'Inspect the pinna, pre-auricular area, and mastoid for scars, redness, or discharge.',
        positiveFindings: [
          { description: 'Mastoid tenderness (Mastoiditis)' },
          { description: 'Pre-auricular sinus' }
        ],
        negativeFindings: ['No external abnormalities']
      },
      {
        id: 'ear2',
        category: 'Otoscopy',
        title: 'Otoscopic Assessment',
        description:
          'Inspect the canal and tympanic membrane (TM). Note the cone of light, handle of malleus, and pars tensa.',
        positiveFindings: [
          { description: 'TM perforation' },
          { description: 'Bulging erythematous TM (Acute Otitis Media)' },
          { description: 'Retracted TM with fluid (Otitis Media with Effusion)' },
          { description: 'Cholesteatoma (Attic crusting)' }
        ],
        negativeFindings: ['Canal clear', 'TM pearly grey with normal landmarks']
      },
      {
        id: 'ear3',
        category: 'Hearing',
        title: 'Weber & Rinne Tests',
        description:
          'Use 512Hz tuning fork to differentiate conductive vs sensorineural hearing loss.',
        positiveFindings: [
          { description: 'Rinne negative (Conductive loss - BC > AC)' },
          { description: 'Weber lateralizes to affected side (Conductive loss)' },
          { description: 'Weber lateralizes to unaffected side (Sensorineural loss)' }
        ],
        negativeFindings: ['Rinne positive (AC > BC)', 'Weber midline']
      }
    ],
    isDraft: !1
  },
  {
    id: 'ent-nose',
    system: ce.ENT,
    name: 'Nasal Examination & Epistaxis',
    shortDescription: 'Anterior rhinoscopy and management of nasal bleeding.',
    keywords: ['rhinoscopy', 'epistaxis', 'septum', 'polyps', 'sinusitis'],
    steps: [
      {
        id: 'nose1',
        category: 'Inspection',
        title: 'External & Internal Inspection',
        description:
          'Assess nasal bridge and perform anterior rhinoscopy using a speculum or otoscope.',
        positiveFindings: [
          { description: 'Septal deviation' },
          { description: 'Nasal polyps (Glistening grey masses)' },
          { description: 'Septal haematoma (Emergency)' }
        ],
        negativeFindings: ['Nasal mucosa pink', 'Septum midline', 'No polyps']
      },
      {
        id: 'nose2',
        category: 'Epistaxis',
        title: 'Epistaxis Assessment',
        description: "Identify the source of bleeding (Little's area / Kiesselbach's plexus).",
        positiveFindings: [
          { description: "Active bleeding from Little's area" },
          { description: 'Posterior bleeding (Blood in oropharynx)' }
        ],
        negativeFindings: ['No active bleeding identified']
      },
      {
        id: 'nose3',
        category: 'Management',
        title: 'Epistaxis Management',
        description:
          "Apply direct pressure (Trotter's method). Consider cautery or packing if persistent.",
        positiveFindings: [
          { description: 'Bleeding controlled with pressure' },
          { description: 'Packing required' }
        ],
        negativeFindings: ['Bleeding ceased']
      }
    ],
    isDraft: !1
  },
  {
    id: 'ent-hints',
    system: ce.ENT,
    name: 'HINTS Exam for Vertigo',
    shortDescription: 'Differentiating central vs peripheral causes of acute vestibular syndrome.',
    keywords: ['hints', 'vertigo', 'nystagmus', 'stroke', 'vestibular neuritis'],
    steps: [
      {
        id: 'hints1',
        category: 'H',
        title: 'Head Impulse Test',
        description:
          "Rapidly turn patient's head while they fixate on your nose. Look for corrective saccades.",
        positiveFindings: [
          { description: 'Corrective saccade present (Peripheral - reassuring)' },
          { description: 'No saccade (Central - concerning in AVS)' }
        ],
        negativeFindings: ['Normal vestibulo-ocular reflex']
      },
      {
        id: 'hints2',
        category: 'N',
        title: 'Nystagmus Assessment',
        description: 'Observe for spontaneous or gaze-evoked nystagmus.',
        positiveFindings: [
          { description: 'Vertical or Torsional nystagmus (Central)' },
          { description: 'Direction-changing nystagmus (Central)' },
          { description: 'Horizontal unidirectional nystagmus (Peripheral)' }
        ],
        negativeFindings: ['No nystagmus']
      },
      {
        id: 'hints3',
        category: 'TS',
        title: 'Test of Skew',
        description:
          'Perform alternate cover test. Look for vertical misalignment upon uncovering.',
        positiveFindings: [{ description: 'Vertical skew deviation (Central)' }],
        negativeFindings: ['No skew deviation']
      }
    ],
    onePager: {
      basics: 'HINTS = Head Impulse, Nystagmus, Test of Skew. Used in Acute Vestibular Syndrome.',
      normalValues: ['Normal HINTS = Peripheral cause', 'INFARCT = Central cause'],
      redFlags: ['HINTS positive for Central cause (INFARCT)', 'Focal neuro signs', 'New headache'],
      goldenRules: 'HINTS is more sensitive than early MRI for posterior circulation stroke in AVS.'
    },
    isDraft: !1
  },
  {
    id: 'ent-throat',
    system: ce.ENT,
    name: 'Throat & Oropharynx Examination',
    shortDescription: 'Assessment of the oral cavity, tonsils, and pharynx.',
    keywords: ['throat', 'tonsils', 'pharynx', 'uvula', 'oropharynx'],
    steps: [
      {
        id: 'thr1',
        category: 'Inspection',
        title: 'Oral Cavity',
        description:
          'Inspect the lips, teeth, gums, buccal mucosa, and tongue. Look for ulcers, leukoplakia, or masses.',
        positiveFindings: [
          { description: 'Aphthous ulcers' },
          { description: 'Leukoplakia (Pre-malignant)' },
          { description: 'Oral candidiasis (Thrush)' }
        ],
        negativeFindings: ['Mucosa pink and moist', 'No ulcers or masses']
      },
      {
        id: 'thr2',
        category: 'Inspection',
        title: 'Oropharynx & Tonsils',
        description:
          'Use a tongue depressor to visualize the tonsils, uvula, and posterior pharyngeal wall.',
        positiveFindings: [
          { description: 'Tonsillar hypertrophy / Exudates (Tonsillitis)' },
          { description: 'Uvular deviation (Peritonsillar abscess / Quinsy)' },
          { description: 'Cobblestoning (Chronic irritation / Reflux)' }
        ],
        negativeFindings: ['Tonsils not enlarged', 'No exudates', 'Uvula midline']
      },
      {
        id: 'thr3',
        category: 'Palpation',
        title: 'Neck Nodes',
        description:
          'Palpate cervical lymph nodes (submental, submandibular, jugulodigastric, etc.).',
        positiveFindings: [
          { description: 'Tender lymphadenopathy (Infection)' },
          { description: 'Hard, fixed nodes (Malignancy)' }
        ],
        negativeFindings: ['No lymphadenopathy palpable']
      }
    ],
    isDraft: !1
  }
];
