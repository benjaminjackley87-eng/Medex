import { ExamSystem, Examination } from '../../types';

export const neurologicalExaminations: Examination[] = [
  { 
    id: 'cn-exam', 
    system: ExamSystem.NEUROLOGICAL, 
    name: 'Cranial Nerves (I-XII)', 
    shortDescription: 'Comprehensive assessment of the 12 cranial nerves to localize neurological lesions.', 
    keywords: ['pupils', 'hearing', 'vision', 'facial nerve', 'osce', 'cranial'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Cranial Nerve Examination: Step-by-step demonstration of all 12 nerves.',
        source: 'https://picsum.photos/seed/cnexam/800/450'
      }
    ],
    steps: [
      {
        id: 'cn-2',
        category: 'CN II',
        title: 'Optic Nerve Assessment',
        description: 'Assess visual acuity (Snellen), fields (confrontation), and pupillary reflexes (direct, consensual, accommodation). Perform fundoscopy.',
        positiveFindings: [
          { description: 'Relative Afferent Pupillary Defect (RAPD - Optic Neuritis)' },
          { description: 'Bitemporal hemianopia (Pituitary tumour)' },
          { description: 'Papilloedema (Raised ICP)' }
        ],
        negativeFindings: ['Pupils equal and reactive to light', 'Visual fields full', 'Optic discs clear']
      },
      {
        id: 'cn-3',
        category: 'CN III, IV, VI',
        title: 'Eye Movements',
        description: 'Test extraocular movements in an "H" pattern. Assess for nystagmus, diplopia, and ptosis.',
        positiveFindings: [
          { description: 'Ptosis + "Down and Out" eye (CN III Palsy)' },
          { description: 'Diplopia on downward/inward gaze (CN IV Palsy)' },
          { description: 'Diplopia on lateral gaze (CN VI Palsy)' }
        ],
        negativeFindings: ['Full range of eye movements', 'No nystagmus']
      },
      {
        id: 'cn-7',
        category: 'CN VII',
        title: 'Facial Nerve Assessment',
        description: 'Ask the patient to raise eyebrows, close eyes tightly, smile, and puff out cheeks. Assess for symmetry.',
        positiveFindings: [
          { description: 'LMN palsy (Bell\'s Palsy - forehead involved)' },
          { description: 'UMN palsy (Stroke - forehead spared due to bilateral innervation)' }
        ],
        negativeFindings: ['Facial symmetry at rest and on movement']
      },
      {
        id: 'cn-8',
        category: 'CN VIII',
        title: 'Vestibulocochlear Nerve',
        description: 'Assess hearing (whisper test). Perform Rinne\'s and Weber\'s tests if hearing is reduced.',
        positiveFindings: [
          { description: 'Sensorineural hearing loss (Weber lateralizes to normal ear)' },
          { description: 'Conductive hearing loss (Rinne negative - Bone > Air)' }
        ],
        negativeFindings: ['Hearing intact', 'Rinne positive (Air > Bone)']
      }
    ],
    differentialDiagnoses: [
      { condition: 'Multiple Sclerosis', explanation: 'Optic neuritis (RAPD), internuclear ophthalmoplegia (INO), multiple CN involvement.' },
      { condition: 'Stroke', explanation: 'UMN facial palsy (forehead sparing), often with hemiparesis.' },
      { condition: 'Bell\'s Palsy', explanation: 'LMN facial palsy (forehead involved), idiopathic.' }
    ],
    redFlags: [
      'Sudden onset severe headache ("Thunderclap")',
      'Papilloedema (Raised ICP)',
      'Acute onset focal neurological deficit (Stroke)',
      'New onset seizure'
    ],
    onePager: {
      basics: 'I (Smell), II (Vision/Pupils), III/IV/VI (Eyes), V (Face sensation/Mastication), VII (Face movement), VIII (Hearing), IX/X (Palate/Gag), XI (Shoulders), XII (Tongue).',
      normalValues: ['PERRLA', 'Full EOM', 'Facial symmetry', 'Normal hearing'],
      redFlags: ['Papilloedema', 'Thunderclap headache', 'Acute deficit'],
      goldenRules: 'UMN facial palsy spares the forehead; LMN involves the whole side.'
    },
    isDraft: false 
  },
  {
    id: 'neuro-upper',
    system: ExamSystem.NEUROLOGICAL,
    name: 'Upper Extremity Neurological Exam',
    shortDescription: 'Assessment of tone, power, reflexes, and sensation in the arms to localize spinal or peripheral lesions.',
    keywords: ['tone', 'power', 'reflexes', 'sensation', 'coordination', 'upper limb'],
    steps: [
      { 
        id: 'nu1', 
        category: 'Tone', 
        title: 'Tone Assessment', 
        description: 'Assess for spasticity (clasp-knife), rigidity (lead-pipe/cogwheel), or hypotonia.', 
        positiveFindings: [
          { description: 'Spasticity (UMN lesion)' },
          { description: 'Cogwheel rigidity (Parkinsonism)' },
          { description: 'Hypotonia (LMN / Cerebellar lesion)' }
        ], 
        negativeFindings: ['Normal tone'] 
      },
      { 
        id: 'nu2', 
        category: 'Power', 
        title: 'Power Assessment', 
        description: 'Grade power 0-5 (MRC scale) for shoulder abduction (C5), elbow flexion (C5/6), elbow extension (C7), wrist extension (C6), finger extension (C7), finger abduction (T1).', 
        positiveFindings: [
          { description: 'Weakness (LMN/UMN)' },
          { description: 'Wasting / Fasciculations (LMN)' }
        ], 
        negativeFindings: ['Power 5/5 in all groups'] 
      },
      { 
        id: 'nu3', 
        category: 'Reflexes', 
        title: 'Reflexes', 
        description: 'Test Biceps (C5/6), Triceps (C7), Supinator (C6).', 
        positiveFindings: [
          { description: 'Hyperreflexia (UMN)' },
          { description: 'Areflexia / Hyporeflexia (LMN)' }
        ], 
        negativeFindings: ['Reflexes 2+ symmetrical'] 
      },
      { 
        id: 'nu4', 
        category: 'Coordination', 
        title: 'Coordination', 
        description: 'Finger-to-nose test, dysdiadochokinesia (rapid alternating movements).', 
        positiveFindings: [
          { description: 'Intention tremor / Dysmetria (Cerebellar)' },
          { description: 'Dysdiadochokinesia (Cerebellar)' }
        ], 
        negativeFindings: ['Coordination intact'] 
      }
    ],
    isDraft: false
  },
  {
    id: 'neuro-lower',
    system: ExamSystem.NEUROLOGICAL,
    name: 'Lower Extremity Neurological Exam',
    shortDescription: 'Assessment of tone, power, reflexes, and sensation in the legs to localize spinal or peripheral lesions.',
    keywords: ['tone', 'power', 'reflexes', 'sensation', 'gait', 'lower limb'],
    steps: [
      { 
        id: 'nl1', 
        category: 'Tone', 
        title: 'Tone Assessment', 
        description: 'Assess for spasticity or rigidity. Test for ankle clonus.', 
        positiveFindings: [
          { description: 'Clonus >3 beats (UMN)' },
          { description: 'Spasticity (UMN)' }
        ], 
        negativeFindings: ['Normal tone', 'No clonus'] 
      },
      { 
        id: 'nl2', 
        category: 'Power', 
        title: 'Power Assessment', 
        description: 'Grade power 0-5 (MRC scale) for hip flexion (L2), knee extension (L3/4), knee flexion (S1), ankle dorsiflexion (L4), big toe extension (L5), ankle plantarflexion (S1).', 
        positiveFindings: [
          { description: 'Foot drop (L5 / Common Peroneal Nerve)' },
          { description: 'Proximal weakness (Myopathy)' }
        ], 
        negativeFindings: ['Power 5/5 in all groups'] 
      },
      { 
        id: 'nl3', 
        category: 'Reflexes', 
        title: 'Reflexes', 
        description: 'Test Knee (L3/4), Ankle (S1), Plantar (Babinski).', 
        positiveFindings: [
          { description: 'Extensor plantar (Babinski - UMN)' },
          { description: 'Hyperreflexia (UMN)' }
        ], 
        negativeFindings: ['Reflexes 2+ symmetrical, flexor plantars'] 
      }
    ],
    isDraft: false
  },
  {
    id: 'neuro-localization',
    system: ExamSystem.NEUROLOGICAL,
    name: 'Targeted Neuro-Localization (INO, Cavernous Sinus, Brown-Séquard)',
    shortDescription: 'Osce checklists and localization patterns for internuclear ophthalmoplegia, cavernous sinus syndrome, and spinal cord hemisection.',
    keywords: ['ino', 'cavernous sinus', 'brown sequard', 'localization', 'spinal cord', 'lesion', 'mlf'],
    steps: [
      {
        id: 'loc-ino',
        category: 'Brainstem / MLF',
        title: 'Internuclear Ophthalmoplegia (INO) Assessment',
        description: 'Assess conjugate horizontal gaze and convergence. INO is caused by a lesion in the Medial Longitudinal Fasciculus (MLF), which coordinates CN VI on one side with CN III on the contralateral side.',
        positiveFindings: [
          { description: 'Ipsilateral adduction failure (the eye on the side of the lesion cannot look inward during conjugate gaze)' },
          { description: 'Contralateral monocular horizontal nystagmus (the abducting eye beats horizontally)' },
          { description: 'Preserved convergence (proves CN III and medial recti are structurally intact, localizing pathology to the MLF)' },
          { description: 'Bilateral INO (highly suggestive of demyelinating disease, e.g., Multiple Sclerosis)' },
          { description: 'Unilateral INO (most commonly due to ischemic stroke of pontine paramedian reticular branches)' }
        ],
        negativeFindings: ['Full, conjugate extraocular movements on horizontal and vertical gaze', 'No nystagmus', 'Normal convergence']
      },
      {
        id: 'loc-cavsinus',
        category: 'Cavernous Sinus',
        title: 'Cavernous Sinus Cranial Nerves',
        description: 'Systematically test cranial nerves passing through the cavernous sinus: CN III, IV, V1, V2, and VI, plus ocular sympathetics.',
        positiveFindings: [
          { description: 'Complete ophthalmoplegia (palsies of CN III, IV, and VI) leading to an immobile eye and ptosis' },
          { description: 'Loss of sensation in the V1 (ophthalmic) and V2 (maxillary) divisions (forehead, cornea, upper cheek)' },
          { description: 'Sympathetic palsy (Horner\'s syndrome: miosis, ptosis, anhydrosis) due to carotid plexus compression' },
          { description: 'Early CN VI palsy (abducens sits centrally next to internal carotid artery, making it highly vulnerable to early compression)' },
          { description: 'Proptosis and chemosis with pulsatile bruit (suggests carotid-cavernous fistula)' }
        ],
        negativeFindings: ['Symmetrical cranial nerves III, IV, V, VI', 'Normal facial sensation in all divisions', 'Pupils symmetrical and reactive']
      },
      {
        id: 'loc-brownsequard',
        category: 'Spinal Cord',
        title: 'Brown-Séquard Syndrome (Spinal Hemisection)',
        description: 'Examine motor and sensory function systematically below a suspected spinal lesion level to identify the classic hemisection pattern.',
        positiveFindings: [
          { description: 'Ipsilateral spastic paresis below the lesion (interruption of descending lateral corticospinal tract, showing UMN signs)' },
          { description: 'Ipsilateral loss of fine touch, vibration, and proprioception below the lesion (interruption of ascending dorsal columns)' },
          { description: 'Contralateral loss of pain and temperature sensation starting 1-2 segments below the lesion (interruption of ascending lateral spinothalamic tract)' },
          { description: 'Ipsilateral flaccid paralysis at the exact level of the lesion (destruction of lower motor neurons in the anterior horn)' },
          { description: 'Segmental ipsilateral sensory loss at the level of the lesion (destruction of posterior horn entry zones)' }
        ],
        negativeFindings: ['Symmetrical motor power (5/5) in all extremities', 'Normal sensation to light touch, pinprick, vibration, and proprioception bilaterally']
      }
    ],
    differentialDiagnoses: [
      { condition: 'Multiple Sclerosis', explanation: 'Presents classically with bilateral INO or demyelinating plaque causing spinal hemisection.' },
      { condition: 'Cavernous Sinus Thrombosis', explanation: 'Ophthalmoplegia, V1/V2 sensory loss, proptosis, often secondary to facial infections.' },
      { condition: 'Spinal Cord Trauma / Tumor', explanation: 'Direct mechanical compression or hemisection yielding Brown-Séquard syndrome.' }
    ],
    redFlags: [
      'Rapidly progressive ascending weakness',
      'Loss of bowel/bladder sphincter tone',
      'Acute complete ophthalmoplegia with severe headache',
      'Spinal level with saddle anaesthesia'
    ],
    onePager: {
      basics: 'INO localizes to MLF (adduction failure + contralateral nystagmus, normal convergence). Cavernous Sinus localizes to III, IV, V1, V2, VI + sympathetics. Brown-Séquard localizes to unilateral hemicord (ipsilateral motor/proprioception loss + contralateral pain/temp loss).',
      normalValues: ['Normal conjugate gaze', 'Full facial sensation', 'Normal bilateral sensation and motor power'],
      redFlags: ['Sphincter dysfunction', 'Saddle anaesthesia', 'Rapid ascending paralysis'],
      goldenRules: 'Convergence is preserved in INO because the pathway bypasses the MLF. Spinothalamic tract crosses in the cord (contralateral loss), while Corticospinal and DCML cross in the brainstem (ipsilateral loss).'
    },
    isDraft: false
  }
];
