import { ExamSystem, Examination } from '../../types';

export const cardiovascularExaminations: Examination[] = [
  {
    id: 'cvs-exam',
    system: ExamSystem.CARDIOVASCULAR,
    name: 'Cardiovascular System Examination',
    shortDescription: 'Comprehensive precordial assessment following the standard OSCE checklist for cardiovascular health.',
    keywords: ['heart', 'murmurs', 'pulse', 'jvp', 'precordium', 'valves', 'geeky medics', 'osce'],
    visualAids: [
      { 
        type: 'video', 
        description: 'Complete Cardiovascular Examination Technique: Demonstration of inspection, palpation, and auscultation landmarks.',
        source: 'https://picsum.photos/seed/cvsexam/800/450'
      },
      { 
        type: 'diagram', 
        description: 'Anatomical Landmarks of the Precordium: Identification of the Mitral, Tricuspid, Pulmonary, and Aortic auscultation areas.',
        source: 'https://picsum.photos/seed/cvsanatomy/800/450'
      },
      {
        type: 'diagram',
        description: 'CVP Waveform Interpretation (LITFL): Normal a, c, v waves and x, y descents correlated with the cardiac cycle.',
        source: 'https://picsum.photos/seed/cvpwaveform/800/450'
      },
      {
        type: 'diagram',
        description: 'CVP Waveforms in Pathology (LITFL): Comparison of waveforms in Tricuspid Regurgitation (large v-waves), Atrial Fibrillation (absent a-waves), and Cardiac Tamponade (blunted y-descent).',
        source: 'https://picsum.photos/seed/cvppathology/800/450'
      },
      {
        type: 'diagram',
        description: 'Normal JVP Waveform Components: a (atrial systole), c (tricuspid bulge), x (atrial relaxation/ventricular ejection), v (atrial filling during systole), y (tricuspid opening/diastolic emptying).',
        source: 'https://picsum.photos/seed/jvpnormal/800/450'
      }
    ],
    steps: [
      { 
        id: 'cvs-9', 
        category: 'General inspection', 
        title: 'End-of-Bed Inspection', 
        description: "Observe the patient from the end of the bed before making physical contact. Assess their overall comfort, work of breathing, body habitus, and look for any obvious syndromes or immediate signs of systemic distress.",
        positiveFindings: [
          { description: 'Obvious dyspnoea at rest or tachypnoea' },
          { description: 'Cardiac cachexia (severe, unintentional weight loss and muscle wasting)' },
          { description: 'Marfanoid habitus (tall stature, long limbs, arachnodactyly, pectus deformities)' },
          { description: 'Down syndrome facies or Turner syndrome features' },
          { description: 'Patient sitting upright or leaning forward (orthopnoea)' }
        ],
        negativeFindings: [
          'Patient is comfortable at rest',
          'No obvious respiratory distress or increased work of breathing',
          'Normal body habitus with no obvious syndromic features'
        ]
      },
      {
        id: 'cvs-bp',
        category: 'Vitals',
        title: 'Blood Pressure Assessment',
        description: 'Measure blood pressure using a sphygmomanometer or automated device. Assess for postural drop if clinically indicated.',
        positiveFindings: [
          { description: 'Hypertension (>140/90 mmHg)' },
          { description: 'Postural hypotension (>20 mmHg drop in SBP on standing)' },
          { description: 'Narrow pulse pressure (Aortic Stenosis / Heart Failure)' },
          { description: 'Wide pulse pressure (Aortic Regurgitation / Thyrotoxicosis)' }
        ],
        negativeFindings: ['Blood pressure 120/80 mmHg', 'No postural drop detected']
      },
      { 
        id: 'cvs-11', 
        category: 'Hands', 
        title: 'Inspection and Assessment of the Hands and Nails', 
        description: 'Ask the patient to hold their hands out resting on a pillow or their lap. Inspect the dorsum and palms of the hands, examine the nails closely, assess temperature, and test capillary refill.',
        positiveFindings: [
          { description: 'Clubbing (loss of the normal nail bed angle, increased fluctuancy of the nail bed)' },
          { description: 'Splinter haemorrhages (linear, dark red/brown streaks under the nails)' },
          { description: 'Osler\'s nodes (tender, red/purple raised nodules on the pulps of the fingers or toes)' },
          { description: 'Janeway lesions (non-tender, erythematous/haemorrhagic macules on the palms or soles)' },
          { description: 'Peripheral cyanosis (bluish discoloration of the distal extremities)' },
          { description: 'Capillary refill time (CRT) > 2 seconds' },
          { description: 'Tendon xanthomata (yellowish cholesterol deposits over the knuckles/extensor tendons)' }
        ],
        negativeFindings: [
          'Hands are warm and well-perfused',
          'Capillary refill time is < 2 seconds',
          'No clubbing, peripheral cyanosis, or peripheral stigmata of infective endocarditis'
        ]
      },
      { 
        id: 'cvs-14', 
        category: 'Pulses', 
        title: 'Arterial Pulse Assessment', 
        description: 'Palpate the radial pulse. Assess the rate, rhythm, character, volume, and condition of the vessel wall.',
        positiveFindings: [
          { description: 'Irregularly irregular rhythm (Atrial Fibrillation)' },
          { description: 'Collapsing pulse (Aortic Regurgitation)' },
          { description: 'Slow-rising pulse (Aortic Stenosis)' },
          { description: 'Weak/Thready pulse (Shock / Severe Heart Failure)' },
          { description: 'Hard/Tortuous vessel wall (Atherosclerosis)' }
        ],
        negativeFindings: ['Regular rhythm', 'Pulse rate 72 bpm', 'Normal volume and character']
      },
      {
        id: 'cvs-delay',
        category: 'Pulses',
        title: 'Radiofemoral and Radial-Radial Delay',
        description: 'Simultaneously palpate both radial pulses, then a radial and femoral pulse to check for delay.',
        positiveFindings: [
          { description: 'Radio-radial delay (Subclavian artery stenosis / Aortic dissection)' },
          { description: 'Radio-femoral delay (Coarctation of the aorta)' }
        ],
        negativeFindings: ['No radio-radial or radio-femoral delay detected']
      },
      {
        id: 'cvs-face',
        category: 'Face',
        title: 'Face, Eyes & Mouth',
        description: 'Inspect the eyes for arcus and xanthelasma. Check the mouth for central cyanosis and dentition.',
        positiveFindings: [
          { description: 'Corneal arcus / Xanthelasma (Hyperlipidaemia)' },
          { description: 'Conjunctival pallor (Anaemia)' },
          { description: 'Central cyanosis (Arterial hypoxaemia)' },
          { description: 'Poor dentition (Risk factor for Infective Endocarditis)' },
          { description: 'High-arched palate (Marfan syndrome)' }
        ],
        negativeFindings: ['No malar flush', 'No central cyanosis', 'Sclerae white and conjunctivae pink']
      },
      {
        id: 'cvs-carotid',
        category: 'Neck',
        title: 'Carotid Arteries',
        description: 'Palpate the carotid pulse (one at a time). Assess character and volume. Auscultate for bruits.',
        positiveFindings: [
          { description: 'Carotid bruit (Atherosclerosis / Radiating AS murmur)' },
          { description: 'Bounding carotids (Aortic Regurgitation)' },
          { description: 'Slow-rising carotid pulse (Aortic Stenosis)' }
        ],
        negativeFindings: ['Carotid pulses symmetrical with normal character', 'No bruits auscultated']
      },
      { 
        id: 'cvs-20', 
        category: 'Neck', 
        title: 'Jugular Venous Pressure (JVP)', 
        description: 'Observe the internal jugular vein pulse at 45°. Assess the waveform (a, c, v peaks; x, y descents), measure vertical height, and check for hepatojugular reflux.',
        imagePrompt: 'Detailed medical diagram of the Jugular Venous Pressure (JVP) waveform showing a, c, x, v, and y waves, correlated with a lead II ECG trace and cardiac cycle phases. Include a comparison panel showing pathological waveforms: large v-waves (TR), absent a-waves (AF), and blunted y-descent (Tamponade). Clean textbook style, white background.',
        positiveFindings: [
          { description: 'Elevated JVP >3cm (Right Heart Failure / Fluid Overload)' },
          { description: 'Large v-waves (Tricuspid Regurgitation)' },
          { description: 'Cannon a-waves (Complete Heart Block)' },
          { description: 'Hepatojugular reflux positive' }
        ],
        negativeFindings: ['JVP not visible or < 3cm vertical height', 'Negative hepatojugular reflux']
      },
      {
        id: 'cvs-precordium-insp',
        category: 'Inspection',
        title: 'Precordium Inspection',
        description: 'Inspect the chest for scars, visible pulsations, and deformities.',
        positiveFindings: [
          { description: 'Midline sternotomy scar (Previous CABG / Valve replacement)' },
          { description: 'Left submammary scar (Mitral valvotomy)' },
          { description: 'Visible apex beat (Thin habitus / Cardiomegaly)' },
          { description: 'Pectus excavatum/carinatum (Marfan syndrome)' }
        ],
        negativeFindings: ['No scars or visible pulsations', 'Normal chest wall configuration']
      },
      { 
        id: 'cvs-25', 
        category: 'Palpation', 
        title: 'Precordial Palpation', 
        description: 'Locate the apex beat (5th ICS MCL). Palpate for parasternal heaves and valvular thrills.',
        positiveFindings: [
          { description: 'Displaced apex beat (Ventricular Dilatation / LVH)' },
          { description: 'Left parasternal heave (Right Ventricular Hypertrophy)' },
          { description: 'Systolic thrill (Aortic Stenosis / VSD)' },
          { description: 'Diastolic thrill (Mitral Stenosis - rare)' }
        ],
        negativeFindings: ['Apex beat palpable in 5th ICS MCL', 'No heaves or thrills']
      },
      {
        id: 'cvs-precordium-perc',
        category: 'Percussion',
        title: 'Precordial Percussion',
        description: 'Percuss the borders of the heart if clinically indicated (e.g., suspected pericardial effusion).',
        positiveFindings: [
          { description: 'Increased area of cardiac dullness (Pericardial effusion / Cardiomegaly)' }
        ],
        negativeFindings: ['Normal area of cardiac dullness']
      },
      { 
        id: 'cvs-28', 
        category: 'Auscultation', 
        title: 'Cardiac Auscultation & Dynamic Manoeuvres', 
        description: 'Listen at the Mitral, Tricuspid, Pulmonary, and Aortic areas using both the diaphragm and bell. Perform dynamic manoeuvres to differentiate murmurs: 1. **Valsalva (Strain phase) / Standing** (decreases preload/afterload): *Increases* HOCM and MVP (earlier click); *Decreases* AS and MR. 2. **Squatting / Passive Leg Raise** (increases preload/afterload): *Decreases* HOCM and MVP (delayed click); *Increases* AS and MR. 3. **Isometric Handgrip** (increases afterload/SVR): *Increases* MR, AR, and VSD; *Decreases* AS and HOCM.',
        positiveFindings: [
          { description: 'Ejection systolic murmur (AS: cresc-decresc, radiates to carotids, louder with squatting, softer with handgrip)' },
          { description: 'Late-systolic murmur with mid-systolic click (MVP: click/murmur occurs earlier with Valsalva, later with squatting)' },
          { description: 'Ejection systolic murmur (HOCM: louder with Valsalva/standing, softer with squatting/handgrip)' },
          { description: 'Pansystolic murmur (MR: radiates to axilla, louder with handgrip/squatting, softer with Valsalva)' },
          { description: 'Early diastolic murmur (AR: high-pitched decresc, sitting forward in expiration, louder with handgrip)' },
          { description: 'Mid-diastolic rumble (MS: low-pitched, localized to apex in left lateral decubitus)' },
          { description: 'Gallop rhythm (S3: early diastole, volume overload; S4: late diastole, atrial kick into stiff ventricle)' }
        ],
        negativeFindings: ['Normal S1 and S2 heard', 'No added sounds, clicks, rubs, or murmurs']
      },
      {
        id: 'cvs-completion',
        category: 'Completion',
        title: 'Completing the Examination',
        description: 'Assess the back, abdomen, and legs to complete the systemic cardiovascular assessment.',
        positiveFindings: [
          { description: 'Sacral oedema / Bibasal crackles (Heart Failure)' },
          { description: 'Hepatomegaly / Pulsatile liver (Right Heart Failure / TR)' },
          { description: 'Pulsatile abdominal mass (Abdominal Aortic Aneurysm)' },
          { description: 'Pitting peripheral oedema (Heart Failure / Venous insufficiency)' }
        ],
        negativeFindings: ['Lungs clear to auscultation', 'No hepatomegaly', 'No peripheral oedema']
      }
    ],
    differentialDiagnoses: [
      { condition: 'Heart Failure', explanation: 'Elevated JVP, displaced apex, S3 gallop, peripheral oedema.' },
      { condition: 'Aortic Stenosis', explanation: 'Slow-rising pulse, narrow pulse pressure, ejection systolic murmur radiating to carotids.' },
      { condition: 'Mitral Regurgitation', explanation: 'Displaced apex, pansystolic murmur radiating to axilla.' }
    ],
    redFlags: [
      'New onset chest pain with clinical instability',
      'Acute severe dyspnoea with pulmonary oedema',
      'Syncope on exertion (Aortic Stenosis)',
      'Fever + New murmur (Infective Endocarditis)'
    ],
    physiologyBuckets: [
      {
        title: 'A) General Appearance Pathophysiology',
        content: [
          { 
            label: 'Cardiac Cachexia', 
            description: 'Chronic, severe heart failure leads to a hypermetabolic state. Decreased cardiac output causes bowel oedema, leading to anorexia and malabsorption, while elevated inflammatory cytokines (like TNF-alpha) drive skeletal muscle apoptosis and fat wasting.' 
          },
          { 
            label: 'Marfanoid Habitus', 
            description: 'A genetic mutation in the FBN1 gene affecting fibrillin-1, a crucial glycoprotein for elastic fiber formation in connective tissue. This directly compromises the structural integrity of the aortic wall and heart valves, predisposing to aortic root dilation, aortic dissection, and mitral valve prolapse.' 
          },
          { 
            label: 'Orthopnoea', 
            description: 'In left ventricular failure, lying flat increases venous return to the heart. The failing left ventricle cannot pump this increased volume, leading to elevated pulmonary venous pressure and transudation of fluid into the alveoli (pulmonary oedema). Sitting upright utilizes gravity to pool blood in the splanchnic and lower extremity beds, decreasing preload and relieving pulmonary congestion.' 
          }
        ],
        color: 'text-blue-600'
      },
      {
        title: 'B) Hands and Nails Pathophysiology',
        content: [
          { 
            label: 'Clubbing', 
            description: 'In cyanotic congenital heart disease (right-to-left shunts), megakaryocytes bypass the normal fragmentation in the pulmonary capillary bed. They enter the systemic circulation, lodge in the distal capillaries of the digits, and release Platelet-Derived Growth Factor (PDGF) and Vascular Endothelial Growth Factor (VEGF), leading to increased vascularity and fibrovascular proliferation of the nail bed.' 
          },
          { 
            label: 'Osler\'s Nodes vs. Janeway Lesions', 
            description: 'Both are classic signs of Infective Endocarditis (IE). Osler\'s nodes are mediated by localized immune complex deposition leading to inflammation (tender). Janeway lesions are caused by septic microemboli showering from the infected heart valve into the peripheral capillaries (painless microabscesses/haemorrhages).' 
          },
          { 
            label: 'Splinter Haemorrhages', 
            description: 'Caused by microemboli or immune complexes damaging the longitudinally aligned capillaries in the nail bed, resulting in tiny streaks of extravasated blood.' 
          }
        ],
        color: 'text-emerald-600'
      },
      {
        title: 'C) Pump Function (The Heart)',
        content: [
          { label: 'Contractility', description: 'Force of contraction. Reduced in HFrEF (Systolic Failure).' },
          { label: 'Compliance', description: 'Ease of filling. Reduced in HFpEF (Diastolic Failure).' },
          { label: 'Preload', description: 'End-diastolic volume. Increased in fluid overload (High JVP).' }
        ],
        color: 'text-blue-600'
      },
      {
        title: 'D) Plumbing (The Valves)',
        content: [
          { label: 'Stenosis', description: 'Narrowed opening. Pressure overload (e.g., AS leads to LVH).' },
          { label: 'Regurgitation', description: 'Leaky closure. Volume overload (e.g., MR leads to Dilatation).' }
        ],
        color: 'text-emerald-600'
      },
      {
        title: 'E) JVP Waveform Physiology',
        content: [
          { 
            label: 'a wave', 
            description: 'The rise in right atrial pressure caused by atrial systole (contraction). Corresponds to the end of diastole.' 
          },
          { 
            label: 'c wave', 
            description: 'The ventricular contraction causes the tricuspid valve to bulge upwards into the right atrium (RA), creating a small pressure spike.' 
          },
          { 
            label: 'x descent', 
            description: 'The decrease in pressure in the RA as the atrium relaxes and the tricuspid valve moves away from the RA during the ejection of blood from the right ventricle.' 
          },
          { 
            label: 'v wave', 
            description: 'The peak in atrial pressure during ventricular systole when the tricuspid valve is closed and the atrium is filling with venous blood.' 
          },
          { 
            label: 'y descent', 
            description: 'The tricuspid valve opens and blood rapidly empties from the atrium into the right ventricle during early diastole.' 
          }
        ],
        color: 'text-blue-600'
      }
    ],
    patternRecognition: [
      { title: 'Heart Failure (Left)', description: 'Dyspnoea, Orthopnoea, PND, displaced apex, S3, bibasal crackles.', color: 'text-blue-600' },
      { title: 'Heart Failure (Right)', description: 'Elevated JVP, peripheral oedema, hepatomegaly, parasternal heave.', color: 'text-emerald-600' },
      { title: 'Aortic Stenosis', description: 'Slow-rising pulse, narrow pulse pressure, ESM radiating to carotids.', color: 'text-amber-600' }
    ],
    workedCases: [
      {
        title: 'Case 1: The Breathless Smoker',
        description: '72M, dyspnoea, orthopnoea. Exam: JVP +4cm, displaced apex, S3 gallop, bibasal crackles.',
        analysis: 'Impression: Decompensated Left Heart Failure. Likely ischaemic or hypertensive origin.'
      },
      {
        title: 'Case 2: The Syncopal Pensioner',
        description: '80F, collapsed while walking. Exam: SBP 100/80, slow-rising pulse, ESM at 2nd RICS.',
        analysis: 'Impression: Severe Aortic Stenosis. High risk of sudden cardiac death; needs urgent Echo.'
      }
    ],
    onePager: {
      basics: 'Systematic precordial assessment: Inspection, Palpation, Auscultation. Always check pulses and JVP.',
      normalValues: ['HR: 60-100 bpm', 'BP: <140/90 mmHg', 'JVP: <3cm vertical height', 'Apex: 5th ICS MCL'],
      redFlags: ['Chest Pain', 'Syncope', 'Acute Dyspnoea', 'Fever + Murmur'],
      goldenRules: 'A cardiovascular examination begins the moment you lay eyes on the patient. The diagnosis of Marfan syndrome, severe heart failure, or an acute exacerbation is often made before you even introduce yourself. Always note what the patient is surrounded by—look for oxygen masks, GTN sprays on the bedside table, or intravenous diuretic infusions, as these are massive diagnostic clues. Remember: Osler\'s nodes = Ouch (tender); Janeway lesions = painless. Splinter haemorrhages are non-specific in isolation but significant in a febrile patient with a new murmur. Peripheral cyanosis (cold hands, pink tongue) implies poor perfusion; central cyanosis (blue tongue/lips) implies arterial hypoxaemia.'
    },
    isDraft: false
  },
  {
    id: 'cvs-arms',
    system: ExamSystem.CARDIOVASCULAR,
    name: 'Peripheral Vascular Exam (Upper Limbs)',
    shortDescription: 'Assessment of upper limb arterial and venous status.',
    keywords: ['radial pulse', 'brachial pulse', 'allen test', 'thoracic outlet'],
    steps: [
      { id: 'cva1', category: 'Inspection', title: 'Upper Limb Inspection', description: 'Look for colour, temperature, muscle wasting, and scars.', positiveFindings: [{ description: 'Pallor/Cyanosis (Ischaemia)' }, { description: 'Muscle wasting (Chronic ischaemia)' }], negativeFindings: ['Normal colour and temperature', 'No muscle wasting'] },
      { id: 'cva2', category: 'Palpation', title: 'Pulses', description: 'Palpate radial, ulnar, and brachial pulses. Assess volume and symmetry.', positiveFindings: [{ description: 'Absent radial pulse (Occlusion)' }, { description: 'Asymmetrical pulses (Aortic dissection / Stenosis)' }], negativeFindings: ['Pulses present and symmetrical'] },
      { id: 'cva3', category: 'Special Tests', title: 'Allen\'s Test', description: 'Assess patency of radial and ulnar arteries.', positiveFindings: [{ description: 'Delayed refill >5s (Arterial insufficiency)' }], negativeFindings: ['Normal refill <5s'] }
    ],
    isDraft: false
  },
  {
    id: 'cvs-legs',
    system: ExamSystem.CARDIOVASCULAR,
    name: 'Peripheral Vascular Exam (Lower Limbs)',
    shortDescription: 'Assessment of lower limb arterial status (Chronic PAD).',
    keywords: ['femoral pulse', 'popliteal pulse', 'dorsalis pedis', 'buerger test', 'claudication'],
    steps: [
      { id: 'cvl1', category: 'Inspection', title: 'Lower Limb Inspection', description: 'Look for ulcers, hair loss, trophic changes, and muscle wasting.', positiveFindings: [{ description: 'Arterial ulcers (Pressure points / Toes)' }, { description: 'Hair loss / Shiny skin (Trophic changes)' }, { description: 'Muscle wasting (Calf)' }], negativeFindings: ['No ulcers or hair loss', 'Normal skin texture'] },
      { id: 'cvl2', category: 'Palpation', title: 'Pulses', description: 'Palpate femoral, popliteal, posterior tibial, and dorsalis pedis pulses.', positiveFindings: [{ description: 'Absent DP/PT pulse (PAD)' }, { description: 'Femoral bruits (Atherosclerosis)' }], negativeFindings: ['All pulses present and symmetrical'] },
      { id: 'cvl3', category: 'Special Tests', title: 'Buerger\'s Test', description: 'Assess for postural rubor and pallor.', positiveFindings: [{ description: 'Angle of pallor <20° (Severe ischaemia)' }, { description: 'Reactive hyperaemia (Sunset foot)' }], negativeFindings: ['No pallor on elevation'] }
    ],
    isDraft: false
  },
  {
    id: 'cvs-acute-arterial',
    system: ExamSystem.CARDIOVASCULAR,
    name: 'Acute Arterial Occlusion (The 6 Ps)',
    shortDescription: 'Emergency assessment for acute limb-threatening ischaemia.',
    keywords: ['6 ps', 'ischaemia', 'embolism', 'thrombosis'],
    steps: [
      { 
        id: 'cvaa1', 
        category: 'Assessment', 
        title: 'The 6 Ps of Acute Ischaemia', 
        description: 'Systematically check for the six cardinal signs of acute arterial occlusion.',
        positiveFindings: [
          { description: 'Pain (Sudden onset, severe)' },
          { description: 'Pallor (Pale, cadaveric appearance)' },
          { description: 'Pulselessness (Absent distal pulses)' },
          { description: 'Paresthesia (Numbness / Tingling)' },
          { description: 'Paralysis (Loss of motor function - late sign)' },
          { description: 'Poikilothermia (Cold to touch / Perishingly cold)' }
        ],
        negativeFindings: ['Limb warm and well-perfused', 'Pulses present', 'Normal sensation and power']
      }
    ],
    isDraft: false
  },
  {
    id: 'cvs-venous',
    system: ExamSystem.CARDIOVASCULAR,
    name: 'Chronic Venous Disease & Varicose Veins',
    shortDescription: 'Assessment of venous insufficiency and varicose veins.',
    keywords: ['varicose veins', 'venous ulcers', 'trendelenburg', 'perthes'],
    steps: [
      { id: 'cvv1', category: 'Inspection', title: 'Venous Inspection', description: 'Look for varicose veins, haemosiderin staining, venous eczema, and lipodermatosclerosis.', positiveFindings: [{ description: 'Varicose veins (Great/Small saphenous)' }, { description: 'Venous ulcers (Medial malleolus)' }, { description: 'Atrophie blanche' }], negativeFindings: ['No visible varicose veins', 'No skin changes'] },
      { id: 'cvv2', category: 'Special Tests', title: 'Trendelenburg Test', description: 'Assess for saphenofemoral junction incompetence.', positiveFindings: [{ description: 'Rapid filling from above (SFJ incompetence)' }], negativeFindings: ['No retrograde filling'] },
      { id: 'cvv3', category: 'Special Tests', title: 'Perthes\' Test', description: 'Assess patency of deep veins.', positiveFindings: [{ description: 'Increased pain / Distension (Deep vein occlusion)' }], negativeFindings: ['Varicose veins collapse (Deep veins patent)'] }
    ],
    isDraft: false
  },
  {
    id: 'cvs-targeted',
    system: ExamSystem.CARDIOVASCULAR,
    name: 'Targeted Pathological CVS Assessments',
    shortDescription: 'Quick-reference findings for specific cardiovascular conditions.',
    keywords: ['heart failure', 'endocarditis', 'pericarditis', 'cardiomyopathy'],
    steps: [
      { 
        id: 'cvtp1', 
        category: 'Heart Failure', 
        title: 'LVF vs. RVF', 
        description: 'Differentiate between left and right-sided heart failure findings.',
        positiveFindings: [
          { description: 'LVF: Dyspnoea, Orthopnoea, S3, Bibasal crackles' },
          { description: 'RVF: Elevated JVP, Peripheral oedema, Hepatomegaly' }
        ],
        negativeFindings: ['No signs of fluid overload']
      },
      { 
        id: 'cvtp2', 
        category: 'Infective Endocarditis', 
        title: 'Systemic Signs of IE', 
        description: 'Look for peripheral stigmata and systemic markers.',
        positiveFindings: [
          { description: 'Fever + New murmur' },
          { description: 'Splinter haemorrhages, Osler nodes, Janeway lesions' },
          { description: 'Roth spots (Fundoscopy)' },
          { description: 'Splenomegaly / Haematuria' }
        ],
        negativeFindings: ['No stigmata of endocarditis']
      },
      { 
        id: 'cvtp3', 
        category: 'Pericardial Disease', 
        title: 'Pericarditis & Tamponade', 
        description: 'Assess for pericardial friction rub and Beck\'s triad.',
        positiveFindings: [
          { description: 'Pericardial rub (Leaning forward, expiration)' },
          { description: 'Beck\'s Triad: Low BP, Elevated JVP, Muffled heart sounds' },
          { description: 'Pulsus paradoxus (>10mmHg drop in SBP on inspiration)' }
        ],
        negativeFindings: ['Normal heart sounds', 'No friction rub']
      }
    ],
    isDraft: false
  },
  {
    id: 'cvs-investigations',
    system: ExamSystem.CARDIOVASCULAR,
    name: 'CVS Bedside & Extended Investigations',
    shortDescription: 'Systematic approach to CVS investigations including CXR and ECG.',
    keywords: ['cxr', 'ecg', 'investigations', 'chest x-ray'],
    steps: [
      { 
        id: 'cvi1', 
        category: 'Chest X-Ray', 
        title: 'Systematic CVS CXR Approach', 
        description: 'Assess the heart size, borders, and pulmonary vasculature.',
        positiveFindings: [
          { description: 'Cardiomegaly (CTR > 0.5 on PA film)' },
          { description: 'Kerley B lines / Alveolar oedema (Heart Failure)' },
          { description: 'Cephalisation of vessels (Pulmonary venous congestion)' },
          { description: 'Aortic knuckle calcification' }
        ],
        negativeFindings: ['Normal heart size and lung fields']
      },
      { 
        id: 'cvi2', 
        category: 'ECG', 
        title: 'The "Normal" ECG', 
        description: 'Identify key events and normal values on a standard 12-lead ECG.',
        positiveFindings: [
          { description: 'PR interval: 120-200ms' },
          { description: 'QRS duration: <120ms' },
          { description: 'QTc: <440ms (Men) / <460ms (Women)' },
          { description: 'Normal axis: -30° to +90°' }
        ],
        negativeFindings: ['Normal sinus rhythm', 'No ST-T changes']
      }
    ],
    isDraft: false
  }
];
