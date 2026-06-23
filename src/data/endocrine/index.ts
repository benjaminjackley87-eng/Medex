import { ExamSystem, Examination } from '../../types';

export const endocrineExaminations: Examination[] = [
  {
    id: 'endo-thyroid',
    system: ExamSystem.ENDOCRINE,
    name: 'Thyroid Status Examination',
    shortDescription: 'Assessment of thyroid function and goitre, including stigmata of hyper- and hypothyroidism.',
    keywords: ['goitre', 'hyperthyroidism', 'hypothyroidism', 'exophthalmos', 'graves', 'myxoedema'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Thyroid Examination: Palpation technique and eye sign assessment.',
        source: 'https://picsum.photos/seed/thyroidexam/800/450'
      },
      { 
        type: 'diagram', 
        description: 'Thyroid Anatomy: Relation to larynx and trachea.',
        source: 'https://picsum.photos/seed/thyroidanatomy/800/450'
      }
    ],
    steps: [
      { 
        id: 'et1', 
        category: 'Inspection', 
        title: 'Hands & Pulse', 
        description: 'Check for tremor (resting/fine), palmar erythema, and pulse (tachycardia/AF).', 
        positiveFindings: [
          { description: 'Fine tremor (Hyperthyroidism)' }, 
          { description: 'Palmar erythema' },
          { description: 'Tachycardia / Atrial Fibrillation' }
        ], 
        negativeFindings: ['No tremor', 'Pulse regular and 60-100 bpm'] 
      },
      { 
        id: 'et2', 
        category: 'Inspection', 
        title: 'Eye Signs', 
        description: 'Assess for exophthalmos, lid lag, and ophthalmoplegia.', 
        positiveFindings: [
          { description: 'Lid lag (Hyperthyroidism)' }, 
          { description: 'Exophthalmos (Graves disease)' },
          { description: 'Chemosis / Conjunctival injection' }
        ], 
        negativeFindings: ['No eye signs', 'Normal eye movements'] 
      },
      { 
        id: 'et3', 
        category: 'Palpation', 
        title: 'Thyroid Gland', 
        description: 'Palpate from behind while the patient swallows water. Note size, consistency, and mobility.', 
        positiveFindings: [
          { description: 'Diffuse goitre (Graves / Hashimotos)' }, 
          { description: 'Solitary nodule (Malignancy / Cyst)' },
          { description: 'Multinodular goitre' }
        ], 
        negativeFindings: ['Thyroid not palpable or smooth and non-tender'] 
      },
      { 
        id: 'et4', 
        category: 'Auscultation', 
        title: 'Thyroid Bruit', 
        description: 'Listen over the lobes of the thyroid with the bell of the stethoscope.', 
        positiveFindings: [{ description: 'Bruit (Hypervascularity in Graves)' }], 
        negativeFindings: ['No bruit'] 
      },
      { 
        id: 'et5', 
        category: 'Special Tests', 
        title: 'Reflexes & Pretibial Myxoedema', 
        description: 'Check biceps/brachioradialis reflexes and inspect shins.', 
        positiveFindings: [
          { description: 'Hyper-reflexia (Hyperthyroidism)' }, 
          { description: 'Slow-relaxing reflexes (Hypothyroidism)' },
          { description: 'Pretibial myxoedema (Graves)' }
        ], 
        negativeFindings: ['Normal reflexes', 'No skin changes'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Graves Disease', explanation: 'Diffuse goitre, thyroid bruit, exophthalmos, pretibial myxoedema.' },
      { condition: 'Toxic Multinodular Goitre', explanation: 'Irregular goitre, tachycardia, elderly patient.' },
      { condition: 'Hashimoto Thyroiditis', explanation: 'Firm goitre, hypothyroidism stigmata (bradycardia, dry skin).' }
    ],
    redFlags: [
      'Hard, fixed thyroid nodule (Malignancy)',
      'Stridor (Tracheal compression)',
      'Sudden painful goitre (Thyroiditis / Haemorrhage into cyst)',
      'Thyroid storm (Severe tachycardia, fever, agitation)'
    ],
    physiologyBuckets: [
      {
        title: 'HPT Axis',
        content: [
          { label: 'TRH', description: 'Thyrotropin-releasing hormone from hypothalamus.' },
          { label: 'TSH', description: 'Thyroid-stimulating hormone from anterior pituitary.' },
          { label: 'T3/T4', description: 'Active hormones produced by thyroid follicles.' }
        ],
        color: 'text-blue-600'
      }
    ],
    patternRecognition: [
      { title: 'Hyperthyroidism', description: 'Tremor, tachycardia, weight loss, heat intolerance.', color: 'text-amber-600' },
      { title: 'Hypothyroidism', description: 'Bradycardia, weight gain, cold intolerance, dry skin.', color: 'text-blue-600' }
    ],
    workedCases: [
      {
        title: 'Case 1: The Anxious Student',
        description: '21F, palpitations and weight loss. Exam: Fine tremor, HR 110, diffuse smooth goitre with bruit.',
        analysis: 'Impression: Graves Disease. Confirm with TSH/T4 and TRAb antibodies.'
      }
    ],
    onePager: {
      basics: 'Hands (Tremor), Eyes (Lid lag), Neck (Palpation/Swallow), Reflexes.',
      normalValues: ['HR: 60-100 bpm', 'TSH: 0.4-4.0 mIU/L', 'Free T4: 9-19 pmol/L'],
      redFlags: ['Hard Nodule', 'Stridor', 'Thyroid Storm'],
      goldenRules: 'Always ask the patient to swallow water to assess mobility of a neck mass.'
    },
    isDraft: false
  },
  {
    id: 'endo-foot',
    system: ExamSystem.ENDOCRINE,
    name: 'Diabetic Foot Examination',
    shortDescription: 'Screening for neuropathy and peripheral vascular disease to prevent ulceration and amputation.',
    keywords: ['diabetes', 'monofilament', 'neuropathy', 'ulcer', 'charcot', 'ischaemia'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Diabetic Foot Screen: Monofilament technique and pulse palpation.',
        source: 'https://picsum.photos/seed/footexam/800/450'
      }
    ],
    steps: [
      { 
        id: 'ef1', 
        category: 'Inspection', 
        title: 'Foot Inspection', 
        description: 'Look for ulcers, calluses, fungal infections, and Charcot deformity.', 
        positiveFindings: [
          { description: 'Active ulcer (Neuropathic/Ischaemic)' },
          { description: 'Charcot joint (Rock-bottom foot)' },
          { description: 'Claw toes (Motor neuropathy)' }
        ], 
        negativeFindings: ['Skin intact', 'No deformities'] 
      },
      { 
        id: 'ef2', 
        category: 'Neurological', 
        title: 'Monofilament Test', 
        description: 'Test 10 points on each foot with 10g monofilament. Patient eyes closed.', 
        positiveFindings: [{ description: 'Loss of protective sensation (LOPS)' }], 
        negativeFindings: ['Sensation intact at all 10 points'] 
      },
      { 
        id: 'ef3', 
        category: 'Vascular', 
        title: 'Pulses', 
        description: 'Palpate Dorsalis Pedis and Posterior Tibial pulses.', 
        positiveFindings: [{ description: 'Absent or diminished pulses (PVD)' }], 
        negativeFindings: ['Pulses present and equal'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Neuropathic Ulcer', explanation: 'Painless, usually on pressure points (metatarsal heads), warm foot.' },
      { condition: 'Ischaemic Ulcer', explanation: 'Painful, usually on toes or heels, cold foot, absent pulses.' },
      { condition: 'Charcot Neuroarthropathy', explanation: 'Swollen, red, warm foot in a diabetic patient with neuropathy.' }
    ],
    redFlags: [
      'Active ulceration',
      'Signs of infection (Cellulitis / Osteomyelitis)',
      'Critical limb ischaemia (Rest pain, gangrene)',
      'Acute Charcot (Hot, swollen foot)'
    ],
    physiologyBuckets: [
      {
        title: 'Pathophysiology',
        content: [
          { label: 'Neuropathy', description: 'Sensory (loss of pain), Motor (deformity), Autonomic (dry skin).' },
          { label: 'Angiopathy', description: 'Microvascular and macrovascular disease (PVD).' }
        ],
        color: 'text-red-600'
      }
    ],
    patternRecognition: [
      { title: 'Neuropathic Foot', description: 'Warm, pulses present, loss of sensation, painless ulcers.', color: 'text-blue-600' },
      { title: 'Ischaemic Foot', description: 'Cold, pulses absent, painful ulcers, pale/cyanotic.', color: 'text-red-600' }
    ],
    workedCases: [
      {
        title: 'Case 1: The Painless Callus',
        description: '70M Type 2 DM. Large callus on 1st metatarsal head. No pain.',
        analysis: 'Impression: High risk for neuropathic ulcer. Needs debridement and offloading.'
      }
    ],
    onePager: {
      basics: 'Look (Ulcers/Deformity), Feel (Pulses/Temp), Test (Monofilament).',
      normalValues: ['Monofilament: 10/10 points', 'Pulses: Palpable'],
      redFlags: ['Ulcer', 'Infection', 'Acute Charcot'],
      goldenRules: 'A hot, swollen foot in a diabetic patient is Charcot until proven otherwise.'
    },
    isDraft: false
  },
  {
    id: 'endo-cushing',
    system: ExamSystem.ENDOCRINE,
    name: 'Cushing & Addison Examination',
    shortDescription: 'Assessment of adrenal dysfunction, focusing on cortisol excess or deficiency.',
    keywords: ['cortisol', 'striae', 'hyperpigmentation', 'moon face', 'adrenal'],
    steps: [
      { 
        id: 'ec1', 
        category: 'Cushing', 
        title: 'Cushingoid Features', 
        description: 'Look for moon face, buffalo hump, and purple striae.', 
        positiveFindings: [
          { description: 'Purple striae >1cm width' },
          { description: 'Proximal myopathy (Difficulty standing from chair)' },
          { description: 'Easy bruising / Thin skin' }
        ], 
        negativeFindings: ['No cushingoid features'] 
      },
      { 
        id: 'ec2', 
        category: 'Addison', 
        title: 'Addisonian Features', 
        description: 'Look for hyperpigmentation (palmar creases/buccal) and postural hypotension.', 
        positiveFindings: [
          { description: 'Hyperpigmentation (ACTH excess)' },
          { description: 'Postural drop in BP (>20mmHg systolic)' }
        ], 
        negativeFindings: ['Normal skin pigmentation', 'No postural drop'] 
      }
    ],
    differentialDiagnoses: [
      { condition: 'Cushing Syndrome', explanation: 'Exogenous steroids (most common), Pituitary adenoma (Cushing Disease), Ectopic ACTH.' },
      { condition: 'Addison Disease', explanation: 'Primary adrenal insufficiency (Autoimmune, TB, Metastasis).' }
    ],
    redFlags: [
      'Adrenal Crisis (Hypotension, shock, vomiting, fever)',
      'Severe proximal myopathy',
      'Rapid onset Cushingoid features (Ectopic ACTH)'
    ],
    onePager: {
      basics: 'Cushing: Moon face, Striae, Myopathy. Addison: Pigmentation, BP drop.',
      normalValues: ['Postural BP: <20mmHg drop'],
      redFlags: ['Adrenal Crisis', 'Ectopic ACTH'],
      goldenRules: 'Always check for proximal myopathy in suspected Cushing syndrome.'
    },
    isDraft: false
  }
];
