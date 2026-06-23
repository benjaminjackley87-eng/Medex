import { ExamSystem, Examination } from '../../types';

export const dermatologyExaminations: Examination[] = [
  {
    id: 'derm-general',
    system: ExamSystem.SPECIALTY,
    name: 'General Dermatological Examination',
    shortDescription: 'Systematic approach to skin, hair, and nail assessment, following DermNet NZ standards.',
    keywords: ['skin', 'hair', 'nails', 'morphology', 'dermnet', 'dermatology'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Dermatological Examination: Systematic approach from head to toe, including mucosal surfaces.',
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
        description: 'Assess the distribution of lesions (generalized, localized, symmetrical, sun-exposed).',
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
        description: 'Identify the primary lesion type: Macule, Papule, Plaque, Nodule, Vesicle, Bulla, Pustule.',
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
        description: 'Look for scale, crust, erosion, ulceration, excoriation, and lichenification.',
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
        description: 'Inspect the scalp, oral mucosa, and all 20 nails for stigmata of systemic disease.',
        positiveFindings: [
          { description: 'Nail pitting / Onycholysis (Psoriasis)' },
          { description: 'Koilonychia (Iron deficiency)' },
          { description: 'Alopecia areata (Autoimmune)' }
        ],
        negativeFindings: ['Hair, nails, and mucosa normal']
      }
    ],
    differentialDiagnoses: [
      { condition: 'Psoriasis', explanation: 'Well-demarcated erythematous plaques with silvery scale, typically on extensor surfaces.' },
      { condition: 'Atopic Dermatitis', explanation: 'Poorly-defined erythematous patches with excoriations, typically on flexural surfaces.' },
      { condition: 'Tinea Corporis', explanation: 'Annular lesion with peripheral scale and central clearing.' }
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
          { label: 'Epidermal Turnover', description: 'Accelerated in Psoriasis (4 days vs 28 days).' },
          { label: 'Filaggrin Deficiency', description: 'Leads to impaired barrier and Atopic Dermatitis.' }
        ],
        color: 'text-orange-600'
      }
    ],
    onePager: {
      basics: 'Distribution, Morphology (Primary/Secondary), and Special Sites (Hair/Nails/Mucosa).',
      normalValues: ['Skin: Intact', 'Nails: Smooth', 'Scalp: No scaling'],
      redFlags: ['Erythroderma', 'Nikolsky Sign', 'Atypical Nevi', 'Purpura'],
      goldenRules: 'If it\'s dry, wet it; if it\'s wet, dry it. Always describe the morphology before the diagnosis.'
    },
    isDraft: false
  },
  {
    id: 'derm-lesion',
    system: ExamSystem.SPECIALTY,
    name: 'Skin Lesion Assessment (SCALPEL)',
    shortDescription: 'A structured approach to describing any skin lesion, optimized for DermNet NZ terminology.',
    keywords: ['scalpel', 'abcde', 'melanoma', 'bcc', 'scc', 'lesion'],
    steps: [
      { id: 'sl1', category: 'Description', title: 'SCALPEL Mnemonic', description: 'Size, Colour, Age, Location, Pattern, Elevation, Loss of integrity.', positiveFindings: [{ description: 'Asymmetrical shape' }, { description: 'Multiple colours' }], negativeFindings: ['Symmetrical, uniform lesion'] },
      { id: 'sl2', category: 'Malignancy', title: 'ABCDE of Melanoma', description: 'Asymmetry, Border irregularity, Colour variegation, Diameter >6mm, Evolving.', positiveFindings: [{ description: 'Diameter > 6mm' }, { description: 'Irregular borders' }], negativeFindings: ['ABCDE negative'] },
      { id: 'sl3', category: 'Palpation', title: 'Palpation of Lesion', description: 'Assess consistency, tenderness, and tethering.', positiveFindings: [{ description: 'Induration (SCC)' }, { description: 'Pearly border (BCC)' }], negativeFindings: ['Soft and mobile'] }
    ],
    isDraft: false
  }
];
