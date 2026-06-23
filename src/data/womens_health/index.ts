import { ExamSystem, Examination } from '../../types';

export const womensHealthExaminations: Examination[] = [
  {
    id: 'womens-antepartum',
    system: ExamSystem.WOMENS_HEALTH,
    name: 'Antepartum Assessment',
    shortDescription: 'Obstetric examination of the pregnant patient to assess fetal growth, position, and wellbeing.',
    keywords: ['pregnancy', 'fundal height', 'fetal heart', 'leopold', 'obstetrics'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Obstetric Examination: Leopold manoeuvres and symphysis-fundal height measurement.',
        source: 'https://picsum.photos/seed/obsexam/800/450'
      }
    ],
    steps: [
      { 
        id: 'wa1', 
        category: 'Inspection', 
        title: 'Abdominal Inspection', 
        description: 'Look for surgical scars, striae gravidarum, and linea nigra. Observe fetal movements.', 
        positiveFindings: [
          { description: 'Surgical scars (Previous C-section)' },
          { description: 'Visible fetal movements' }
        ], 
        negativeFindings: ['No scars', 'Normal skin changes of pregnancy'] 
      },
      { 
        id: 'wa2', 
        category: 'Palpation', 
        title: 'Fundal Height', 
        description: 'Measure from the symphysis pubis to the top of the fundus using a tape measure (after 24 weeks).', 
        positiveFindings: [
          { description: 'SFH < dates (Small for gestational age / IUGR)' },
          { description: 'SFH > dates (Large for gestational age / Polyhydramnios / Multiple pregnancy)' }
        ], 
        negativeFindings: ['SFH matches gestational age (+/- 2cm)'] 
      },
      { 
        id: 'wa3', 
        category: 'Leopold', 
        title: 'Leopold Manoeuvres', 
        description: '1. Fundal grip (What is at the top?), 2. Lateral grip (Where is the back?), 3. Pawlik\'s grip (What is at the pelvic inlet?), 4. Pelvic grip (Is the head engaged?).', 
        positiveFindings: [
          { description: 'Breech presentation' },
          { description: 'Transverse lie' },
          { description: 'Non-engaged head at term' }
        ], 
        negativeFindings: ['Cephalic presentation', 'Longitudinal lie'] 
      },
      { 
        id: 'wa4', 
        category: 'Auscultation', 
        title: 'Fetal Heart Rate', 
        description: 'Listen over the fetal back using a Pinard stethoscope or handheld Doppler.', 
        positiveFindings: [
          { description: 'Tachycardia (>160 bpm)' },
          { description: 'Bradycardia (<110 bpm)' }
        ], 
        negativeFindings: ['Fetal heart rate 110-160 bpm'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Intrauterine Growth Restriction (IUGR)', explanation: 'SFH < dates, reduced fetal movements, risk factors (smoking, PET).' },
      { condition: 'Polyhydramnios', explanation: 'SFH > dates, tense abdomen, difficult to palpate fetal parts.' },
      { condition: 'Multiple Pregnancy', explanation: 'SFH > dates, multiple fetal parts palpated, two heartbeats heard.' }
    ],
    redFlags: [
      'Reduced fetal movements',
      'Vaginal bleeding',
      'Rupture of membranes',
      'Signs of Pre-eclampsia (Hypertension, oedema, headache)'
    ],
    onePager: {
      basics: 'Inspection (Scars), Palpation (SFH/Leopold), Auscultation (FHR).',
      normalValues: ['FHR: 110-160 bpm', 'SFH: Weeks = cm (after 24w)'],
      redFlags: ['Reduced Movements', 'Bleeding', 'High BP'],
      goldenRules: 'Always measure SFH with the tape measure reversed to avoid bias.'
    },
    isDraft: false
  },
  {
    id: 'womens-pelvic',
    system: ExamSystem.WOMENS_HEALTH,
    name: 'Pelvic Examination',
    shortDescription: 'Comprehensive assessment of the female reproductive tract, including speculum and bimanual examination.',
    keywords: ['speculum', 'bimanual', 'cervix', 'adnexa', 'pid', 'ectopic'],
    steps: [
      { 
        id: 'wp1', 
        category: 'Speculum', 
        title: 'Speculum Examination', 
        description: 'Visualize the cervix and vaginal walls. Take swabs or smears if indicated.', 
        positiveFindings: [
          { description: 'Cervical motion tenderness (PID / Ectopic)' },
          { description: 'Vaginal discharge (Infection)' },
          { description: 'Cervical erosions / Polyps' }
        ], 
        negativeFindings: ['Cervix healthy and closed', 'No abnormal discharge'] 
      },
      { 
        id: 'wp2', 
        category: 'Bimanual', 
        title: 'Bimanual Palpation', 
        description: 'Assess uterine size, position, and mobility. Palpate adnexa for masses or tenderness.', 
        positiveFindings: [
          { description: 'Adnexal mass (Cyst / Ectopic / Malignancy)' },
          { description: 'Enlarged uterus (Fibroids / Pregnancy)' },
          { description: 'Fixed, retroverted uterus (Endometriosis)' }
        ], 
        negativeFindings: ['Uterus normal size and mobile', 'No adnexal masses'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Pelvic Inflammatory Disease (PID)', explanation: 'Cervical motion tenderness, adnexal tenderness, fever, discharge.' },
      { condition: 'Ectopic Pregnancy', explanation: 'Unilateral pelvic pain, vaginal bleeding, adnexal mass/tenderness, positive β-hCG.' },
      { condition: 'Endometriosis', explanation: 'Chronic pelvic pain, dysmenorrhoea, fixed retroverted uterus.' }
    ],
    redFlags: [
      'Severe pelvic pain + Positive pregnancy test (Ectopic)',
      'Post-menopausal bleeding (Malignancy)',
      'Palpable adnexal mass in post-menopausal woman',
      'Signs of pelvic sepsis'
    ],
    isDraft: false
  },
  {
    id: 'womens-breast',
    system: ExamSystem.WOMENS_HEALTH,
    name: 'Breast Examination',
    shortDescription: 'Systematic assessment of breast tissue and regional lymph nodes to screen for malignancy.',
    keywords: ['breast lump', 'axilla', 'nipple discharge', 'mammogram'],
    steps: [
      { 
        id: 'wb1', 
        category: 'Inspection', 
        title: 'Breast Inspection', 
        description: 'Observe with arms at sides, arms raised, and hands on hips. Look for asymmetry, skin changes, and nipple inversion.', 
        positiveFindings: [
          { description: 'Peau d\'orange (Inflammatory cancer)' },
          { description: 'Skin tethering / Dimpling' },
          { description: 'Nipple retraction / Discharge' }
        ], 
        negativeFindings: ['Symmetrical breasts', 'No skin or nipple changes'] 
      },
      { 
        id: 'wb2', 
        category: 'Palpation', 
        title: 'Breast Palpation', 
        description: 'Palpate all four quadrants and the axillary tail using a systematic pattern. Palpate axillary and supraclavicular nodes.', 
        positiveFindings: [
          { description: 'Hard, irregular, fixed mass (Malignancy)' },
          { description: 'Smooth, mobile mass (Fibroadenoma)' },
          { description: 'Axillary lymphadenopathy' }
        ], 
        negativeFindings: ['No lumps palpable', 'No lymphadenopathy'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Breast Cancer', explanation: 'Hard, irregular, fixed lump, skin tethering, nipple inversion, lymphadenopathy.' },
      { condition: 'Fibroadenoma', explanation: 'Smooth, highly mobile "breast mouse", usually in younger women.' },
      { condition: 'Fibrocystic Change', explanation: 'Lumpy breasts, often cyclical pain, improves after menses.' }
    ],
    redFlags: [
      'Hard, fixed breast lump',
      'Skin dimpling or peau d\'orange',
      'Spontaneous bloody nipple discharge',
      'New nipple inversion',
      'Axillary lymphadenopathy'
    ],
    isDraft: false
  }
];
