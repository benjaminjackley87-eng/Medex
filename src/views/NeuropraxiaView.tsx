import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Search,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Brain,
  Zap,
  RotateCcw,
  Maximize2,
  Minimize2,
  FileText,
  Dna,
  Workflow,
  Crosshair,
  Wind,
  Layers,
  Loader2
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import MedImage from '../components/common/MedImage';
import ImageModal from '../components/ImageModal';
import { useClinicalSearch } from '../hooks/useClinicalSearch';

interface SpecialTest {
  testName: string;
  useCaseExample: string;
  method: string;
  findingsInterpretation: {
    positive: string;
    negative: string;
  };
  clinicalRelevance: string;
}

interface NeuropraxiaCondition {
  id: string;
  name: string;
  category: 'Plexopathy' | 'Neuropraxia' | 'Entrapment';
  plexus: 'Brachial' | 'Lumbosacral' | 'Other';
  clinicalFeatures: string[];
  sensationChanges: string[];
  motorDeficits: string[];
  anatomy: {
    dermatomes: string[];
    myotomes: string[];
    description: string;
  };
  specialTests: SpecialTest[];
  pearls: string[];
}

const NEUROPRAXIA_DATA: NeuropraxiaCondition[] = [
  {
    id: 'tos',
    name: 'Thoracic Outlet Syndrome (TOS)',
    category: 'Entrapment',
    plexus: 'Brachial',
    clinicalFeatures: [
      'Upper limb pain/heaviness',
      'Paresthesia when elevating arms',
      'Coldness or pallor in hand (if vascular)',
      'Weakness in hand intrinsics'
    ],
    sensationChanges: ['Paresthesia in C8/T1 distribution', 'Medial forearm numbness'],
    motorDeficits: [
      'Gilliatt-Sumner hand (atrophy of thenar/hypothenar eminence)',
      'Weakness in finger abduction/adduction'
    ],
    anatomy: {
      dermatomes: ['C8', 'T1'],
      myotomes: ['T1 (Finger Abduction)'],
      description:
        'Compression at the scalene triangle, costoclavicular space, or sub-coracoid space. Usually involves the lower trunk (C8-T1).'
    },
    specialTests: [
      {
        testName: "Adson's Maneuver",
        useCaseExample:
          'Suspected compression at the Interscalene Triangle (Scalene Anticus Syndrome).',
        method:
          "1. Locate the patient's radial pulse on the affected side.\n2. Abduct the arm to 30 degrees, extend the shoulder, and externally rotate the arm.\n3. Instruct the patient to turn their head toward the symptomatic side and elevate their chin.\n4. Have the patient take a deep breath and hold it for 10-15 seconds while you continuously monitor the radial pulse.",
        findingsInterpretation: {
          positive:
            "A significant diminution or complete obliteration of the radial pulse, coupled with a replication of the patient's neurological symptoms.",
          negative:
            'Radial pulse remains strong and symmetric; no paresthesias or pain are reproduced.'
        },
        clinicalRelevance:
          'Indicates compression of the subclavian artery and/or lower trunk of the brachial plexus between the anterior and middle scalene muscles. False-positive rate is high (~13%) in healthy populations; must correlate with paresthesias.'
      },
      {
        testName: "Military Brace (Eden's Test)",
        useCaseExample:
          'Suspected compression in the Costoclavicular Space (between the clavicle and the 1st rib).',
        method:
          "1. Locate the radial pulse on the affected side.\n2. Draw the patient's shoulders backward and downward (into a strict 'at-attention' military posture).\n3. Apply mild downward traction on the arm while checking the radial pulse.",
        findingsInterpretation: {
          positive:
            'Significant reduction or loss of the radial pulse, accompanied by the reproduction of shoulder or arm pain/paresthesia.',
          negative: 'Pulse amplitude remains unchanged; no symptoms are replicated.'
        },
        clinicalRelevance:
          'Suggests costoclavicular compression. Often positive in patients who wear heavy backpacks or have hypertrophied subclavius muscles.'
      },
      {
        testName: "Wright's Hyperabduction Test",
        useCaseExample: 'Suspected compression in the Subcoracoid or Pectoralis Minor Space.',
        method:
          '1. Locate the radial pulse.\n2. Passive hyperabduction of the arm to 180 degrees with external rotation.\n3. Note when the radial pulse changes and if symptoms are reproduced.',
        findingsInterpretation: {
          positive: 'Obliteration of the radial pulse and replication of upper limb paresthesias.',
          negative: 'Normal pulse volume is maintained; no neurological symptoms.'
        },
        clinicalRelevance:
          'Identifies entrapment under the pectoralis minor tendon near the coracoid process. Useful for differentiating distal vs. proximal TOS sites.'
      },
      {
        testName: 'Roos Stress Test (East Test)',
        useCaseExample: 'General screening and functional assessment for Thoracic Outlet Syndrome.',
        method:
          "1. Instruct the patient to abduct both arms to 90 degrees, externally rotate the shoulders, and flex the elbows to 90 degrees ('chicken wing' or 90/90 position).\n2. Have the patient slowly open and close their hands (making a fist and then fully extending the fingers) continuously for 3 minutes.",
        findingsInterpretation: {
          positive:
            'Inability to maintain the posture for the full 3 minutes, or rapid reproduction of ischemic pain, paresthesias, or hand weakness within 30-60 seconds.',
          negative: 'Able to complete 3 minutes with only mild, symmetrical muscle fatigue.'
        },
        clinicalRelevance:
          'Most sensitive clinical test for TOS (~84% sensitivity, ~40% specificity). A positive result does not confirm the diagnosis but strongly warrants further electrodiagnostic or imaging workup.'
      }
    ],
    pearls: [
      'True neurogenic TOS is rare; functional TOS is common.',
      'Differentiate by site: Interscalene (Adson), Costoclavicular (Military), Subcoracoid (Wright).',
      'Check for a cervical rib on X-ray.'
    ]
  },
  {
    id: 'cts',
    name: 'Carpal Tunnel Syndrome (CTS)',
    category: 'Entrapment',
    plexus: 'Other',
    clinicalFeatures: [
      'Paresthesia in radial 3.5 digits (thumb to ring finger)',
      'Nocturnal pain / "Flick sign" (shaking hand for relief)',
      'Weakness in thumb opposition',
      'Ache in the forearm or shoulder (referred pain)'
    ],
    sensationChanges: [
      'Numbness in the median nerve distribution (radial 3.5 fingers)',
      'Key marker: Sparing of the palm (palmar cutaneous branch spares the tunnel)'
    ],
    motorDeficits: [
      'Abductor Pollicis Brevis (Thumb Abduction)',
      'Opponens Pollicis (Opposition)',
      'Thenar atrophy in chronic cases'
    ],
    anatomy: {
      dermatomes: ['C6', 'C7', 'C8'],
      myotomes: ['T1 (Thumb Abduction)'],
      description:
        'Compression of the median nerve beneath the transverse carpal ligament. Spares the thenar eminence sensation as the palmar cutaneous branch passes superficial to the retinaculum.'
    },
    specialTests: [
      {
        testName: "Phalen's Wrist Flexion Test",
        useCaseExample: 'Suspected Carpal Tunnel Syndrome (median nerve compression at wrist).',
        method:
          '1. Instruct the patient to flex both wrists maximally.\n2. Have them press the dorsal aspects of their hands together (fingers pointing downward, elbows horizontal) to maintain maximal flexion.\n3. Hold this position for 60 seconds unless symptoms are reproduced sooner.',
        findingsInterpretation: {
          positive:
            'Development or worsening of paresthesias, numbness, or tingling in the median nerve distribution (thumb, index, middle, and radial half of ring finger).',
          negative: 'No sensory changes or pain in the median nerve distribution after 60 seconds.'
        },
        clinicalRelevance:
          'High diagnostic utility (Sensitivity ~68%, Specificity ~73%). A positive test suggests median nerve compression, helping differentiate it from a C6/C7 cervical radiculopathy.'
      },
      {
        testName: "Reverse Phalen's (Prayer Test)",
        useCaseExample: 'Alternative provocative test for Carpal Tunnel Syndrome.',
        method:
          '1. Instruct the patient to bring their palms together at the level of the chest (as if in prayer).\n2. Have them lower their hands toward the waist, maintaining palm contact to force maximal wrist extension.\n3. Hold this position for 60 seconds.',
        findingsInterpretation: {
          positive: 'Onset of tingling or numbness in the radial 3.5 digits.',
          negative: 'No sensory symptoms after 60 seconds.'
        },
        clinicalRelevance:
          "Extension increases pressure in the carpal tunnel significantly (even higher than flexion), making it useful if standard Phalen's is equivocal."
      },
      {
        testName: "Tinel's Tap at the Wrist",
        useCaseExample:
          'Assessing local nerve irritability or regenerating fibers in median nerve entrapment.',
        method:
          "1. Support the patient's wrist in a slightly extended position.\n2. Lightly tap (percuss) over the course of the median nerve within the carpal tunnel (just proximal to the flexor crease, medial to the flexor carpi radialis tendon) using a reflex hammer or your index finger.",
        findingsInterpretation: {
          positive:
            'A sudden, electric shock-like sensation, tingling, or paresthesia radiating into the median-innervated digits.',
          negative: 'No radiating paresthesias; only local tapping sensation.'
        },
        clinicalRelevance:
          "Sensitivity ~50%, Specificity ~77%. Useful for tracking nerve recovery: a positive Tinel's sign that migrates distally over time indicates axonal regeneration."
      }
    ],
    pearls: [
      'Most common entrapment neuropathy.',
      'Sparing of the thenar eminence (palm) differentiates CTS from a more proximal median nerve lesion.',
      'Check for systemic associations: Diabetes, Hypothyroidism, Pregnancy, RA.'
    ]
  },
  {
    id: 'sciatic',
    name: 'Sciatic Nerve Entrapment (Piriformis Syndrome)',
    category: 'Entrapment',
    plexus: 'Lumbosacral',
    clinicalFeatures: [
      'Deep buttock pain',
      'Sciatic-like pain down the thigh',
      'Aggravated by prolonged sitting'
    ],
    sensationChanges: ['Lateral leg and foot numbness', 'Posterior thigh paresthesia'],
    motorDeficits: ['Weakness in knee flexion (Hamstrings)', 'Weakness in foot inversion/eversion'],
    anatomy: {
      dermatomes: ['L4', 'L5', 'S1', 'S2', 'S3'],
      myotomes: ['L5 (Dorsiflexion)', 'S1 (Plantarflexion)'],
      description:
        'The sciatic nerve passes under or through the piriformis muscle. Lesions here spare the gluteal muscles (supplied by superior/inferior gluteal nerves).'
    },
    specialTests: [
      {
        testName: "Straight Leg Raise (SLR / Lasegue's Test)",
        useCaseExample:
          'Differentiating sciatic nerve compression (e.g., Piriformis) from lumbar disc herniation/radiculopathy.',
        method:
          "1. With the patient supine, lift the affected leg passively by the heel, keeping the knee fully extended.\n2. Stop at the angle where pain is reproduced (typically between 30 and 70 degrees).\n3. Lower the leg slightly and dorsiflex the foot (Bragard's sign) to confirm neural tension.",
        findingsInterpretation: {
          positive:
            'Reproduction of sharp, radicular pain shooting down the posterior leg below the knee (suggests disc herniation/L5-S1 root compression).',
          negative:
            'No radicular pain below the knee (local hamstring tightness or buttock-only pain is negative).'
        },
        clinicalRelevance:
          'High sensitivity (~91%) but lower specificity (~26%) for lumbar disc herniation. In Piriformis syndrome, the SLR is often negative or only reproduces deep buttock pain, rather than radicular below-knee pain.'
      }
    ],
    pearls: [
      'Piriformis syndrome is a diagnosis of exclusion.',
      'If gluteal wasting is present, the lesion is PROXIMAL to the sciatic notch (Lumbosacral Plexus or Root).'
    ]
  },
  {
    id: 'obturator',
    name: 'Obturator Nerve Entrapment',
    category: 'Entrapment',
    plexus: 'Lumbosacral',
    clinicalFeatures: [
      'Medial thigh pain/paresthesia',
      'Groin pain aggravated by adduction',
      'Often secondary to pelvic surgery or trauma'
    ],
    sensationChanges: ['Small area of numbness on the medial distal thigh'],
    motorDeficits: [
      'Weakness in thigh adduction (Adductor Longus/Magnus/Brevis)',
      'Trendelenburg gait (rarely, if compensatory patterns fail)'
    ],
    anatomy: {
      dermatomes: ['L2', 'L3', 'L4'],
      myotomes: ['L3 (Thigh Adduction)'],
      description:
        'Arises from L2-L4. Passes through the obturator canal. Supplies adductors and medial thigh skin.'
    },
    specialTests: [
      {
        testName: 'Hip Internal/External Rotation Test',
        useCaseExample:
          'Differentiating obturator nerve entrapment from hip joint arthritis or labral tears.',
        method:
          '1. Place the patient supine with the hip and knee flexed to 90 degrees.\n2. Passively rotate the hip internally and externally to its end-range.\n3. Note the location and type of pain provoked.',
        findingsInterpretation: {
          positive:
            'Deep groin pain accompanied by paresthesias radiating down the medial thigh indicates obturator involvement.',
          negative:
            'Pain is localized strictly to the groin/hip joint without any sensory radiation or paresthesias.'
        },
        clinicalRelevance:
          'Helps rule out primary hip pathology. If rotation replicates medial thigh paresthesias, it points to compression of the obturator nerve within the obturator canal.'
      }
    ],
    pearls: [
      'Howship-Romberg sign: Inner thigh pain with hip extension/adduction (seen in obturator hernia).'
    ]
  },
  {
    id: 'brachial-palsy',
    name: "Erb's Palsy (Brachial Plexus Upper Trunk)",
    category: 'Plexopathy',
    plexus: 'Brachial',
    clinicalFeatures: [
      "Waiter's tip position (Adducted, internally rotated arm, extended elbow, pronated forearm)",
      'Loss of sensation in lateral shoulder/arm'
    ],
    sensationChanges: ['C5/C6 dermatomes (Lateral shoulder, forearm)'],
    motorDeficits: [
      'Deltoid (Abduction)',
      'Biceps (Flexion/Supination)',
      'Infraspinatus (External rotation)'
    ],
    anatomy: {
      dermatomes: ['C5', 'C6'],
      myotomes: ['C5 (Abduction)', 'C6 (Flexion)'],
      description:
        'Upper trunk lesion (C5-C6 roots). Often due to excessive lateral neck stretch during birth or trauma.'
    },
    specialTests: [
      {
        testName: "Cervical Spine Spurling's Test",
        useCaseExample:
          "Differentiating Erb's Palsy (upper trunk plexopathy) from acute C5/C6 cervical radiculopathy.",
        method:
          "1. Have the patient sit upright.\n2. Ask the patient to extend their neck, rotate, and laterally flex their head toward the affected side.\n3. Apply a gentle, axial downward force on the top of the patient's head.",
        findingsInterpretation: {
          positive:
            'Reproduction of radicular pain shooting down the arm into the C5/C6 dermatome (indicates cervical radiculopathy).',
          negative: 'No radiating pain (local neck stiffness or muscular pain is negative).'
        },
        clinicalRelevance:
          "Highly specific (~92%) for cervical radiculopathy. A negative Spurling's test in the presence of upper limb deficits pointing to C5/C6 suggests a brachial plexopathy rather than spinal root compression."
      }
    ],
    pearls: ["Contrast with Klumpke's (C8-T1): Claw hand result."]
  },
  {
    id: 'radial-palsy',
    name: 'Radial Nerve Palsy (Saturday Night Palsy)',
    category: 'Neuropraxia',
    plexus: 'Brachial',
    clinicalFeatures: [
      'Wrist drop (extensor weakness)',
      'Weakness in finger extension at MCP joints',
      'Weakness in thumb abduction'
    ],
    sensationChanges: ['Numbness on the dorsal aspect of the first web space'],
    motorDeficits: [
      'Extensor carpi radialis (Wrist extension)',
      'Brachioradialis (Flexion in mid-prone)',
      'Triceps (if lesion is high in the axilla)'
    ],
    anatomy: {
      dermatomes: ['C6', 'C7', 'C8'],
      myotomes: ['C7 (Wrist extension)'],
      description:
        'Radial nerve (C5-T1). Compression typically at the spiral groove of the humerus. Spares triceps if compressed at the mid-humerus.'
    },
    specialTests: [
      {
        testName: 'Triceps Strength Check',
        useCaseExample: 'Localizing a radial nerve lesion (spiral groove vs. axillary level).',
        method:
          "1. Flex the patient's elbow to 90 degrees.\n2. Instruct the patient to extend the elbow against your resistance.\n3. Palpate the triceps muscle belly to assess contraction.",
        findingsInterpretation: {
          positive:
            'Normal triceps strength with coexisting wrist drop (indicates a distal compression at the spiral groove, sparing the triceps branches).',
          negative:
            'Weakness in triceps extension and wrist extension (indicates a high radial nerve lesion in the axilla or a C7 radiculopathy).'
        },
        clinicalRelevance:
          'Essential localization tool. High lesions (e.g., crutch compression) affect the triceps, whereas Saturday Night Palsy (spiral groove compression) spares it because the branches to the long and medial heads of the triceps arise proximal to the spiral groove.'
      }
    ],
    pearls: [
      'Supeination is preserved (Biceps - Musculocutaneous).',
      'Crutch palsy involves the axilla.'
    ]
  },
  {
    id: 'peroneal-palsy',
    name: 'Common Peroneal Nerve Palsy',
    category: 'Neuropraxia',
    plexus: 'Lumbosacral',
    clinicalFeatures: [
      'Foot drop (weakness in dorsiflexion)',
      'Slapping gait',
      'Often due to habitual leg crossing or compression at the fibular head'
    ],
    sensationChanges: ['Numbness on the lateral leg and dorsal foot'],
    motorDeficits: [
      'Tibialis Anterior (Dorsiflexion)',
      'Extensor Digitorum (Toe extension)',
      'Peroneals (Eversion)'
    ],
    anatomy: {
      dermatomes: ['L4', 'L5', 'S1'],
      myotomes: ['L4/L5 (Dorsiflexion)'],
      description:
        'Common Fibular (Peroneal) nerve splits into deep and superficial at the neck of the fibula.'
    },
    specialTests: [
      {
        testName: 'Foot Inversion Check',
        useCaseExample:
          'Differentiating common peroneal nerve palsy at the fibular neck from an L5 radiculopathy.',
        method:
          "1. Support the patient's ankle.\n2. Instruct the patient to turn their foot inward (inversion) against your resistance.\n3. Palpate the tibialis posterior tendon.",
        findingsInterpretation: {
          positive:
            'Normal inversion strength in the presence of foot drop (confirms peroneal nerve palsy, as inversion is mediated by the tibial nerve).',
          negative:
            'Weakness in both dorsiflexion/eversion and inversion (points to an L5 radiculopathy, as L5 supplies both tibial and peroneal nerve pathways).'
        },
        clinicalRelevance:
          'Crucial OSCE differentiator. Peroneal nerve palsy spares foot inversion, while L5 radiculopathy compromises it because the tibialis posterior is innervated by the tibial nerve (L5 root).'
      }
    ],
    pearls: [
      'The most common entrapment neuropathy in the lower limb.',
      'Check for L5 root signs (e.g. Big toe extension weakness + inversion weakness).'
    ]
  }
];

const gemini = new GeminiService();

export const NeuropraxiaView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isIllustrationLoading, setIsIllustrationLoading] = useState(false);
  const [illustrationUrl, setIllustrationUrl] = useState<string | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  const { results: filteredConditions, didYouMean } = useClinicalSearch(
    NEUROPRAXIA_DATA,
    searchQuery,
    ['name', 'plexus', 'category']
  );

  const activeCondition = useMemo(
    () => NEUROPRAXIA_DATA.find((c) => c.id === selectedId),
    [selectedId]
  );

  const handleSelect = async (id: string) => {
    setSelectedId(id);
    setIllustrationUrl(null);
    setIsIllustrationLoading(true);

    // Generate an illustration for the specific plexus anatomy
    const condition = NEUROPRAXIA_DATA.find((c) => c.id === id);
    if (condition) {
      try {
        const url = await gemini.generateIllustration(
          `Detailed clinical anatomy diagram for ${condition.name}: showing ${condition.plexus} plexus, dermatomes ${condition.anatomy.dermatomes.join('/')}, and nerve branches. High-fidelity medical illustration style.`,
          false
        );
        setIllustrationUrl(url || null);
      } catch (e) {
        console.error('Failed to generate anatomy illustration', e);
      } finally {
        setIsIllustrationLoading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-orange-100">
          <Workflow className="w-4 h-4" /> Neuro-Localization Matrix
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          Plexopathies & <span className="text-orange-600">Neuropraxias</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl font-medium">
          Differentiating peripheral nerve entrapments, plexus lesions, and radicular patterns
          through clinical markers and provocative testing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search neuropraxias..."
              className="w-full bg-slate-950/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
            />
          </div>

          {didYouMean && (
            <div className="flex justify-start">
              <button
                onClick={() => setSearchQuery(didYouMean)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl transition-all shadow-sm w-full"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 shrink-0">
                  Did you mean
                </span>
                <span className="text-xs font-bold border-b border-orange-600 border-dashed truncate">
                  {didYouMean}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 shrink-0">
                  ?
                </span>
              </button>
            </div>
          )}

          <div className="space-y-3">
            {filteredConditions.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                  selectedId === c.id
                    ? 'bg-orange-600 text-white shadow-xl shadow-orange-200'
                    : 'bg-slate-950/40 border border-white/5 text-slate-400 hover:border-orange-200 hover:bg-orange-50/30'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    selectedId === c.id
                      ? 'bg-slate-950/40/20'
                      : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'
                  }`}
                >
                  <Dna className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-xs font-black uppercase tracking-widest mb-0.5 ${
                      selectedId === c.id ? 'text-orange-100' : 'text-orange-600'
                    }`}
                  >
                    {c.category}
                  </div>
                  <div className="font-bold truncate">{c.name}</div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${selectedId === c.id ? 'rotate-90 text-white' : 'text-slate-300 group-hover:translate-x-1'}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeCondition ? (
              <motion.div
                key={activeCondition.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Condition Title Card */}
                <div className="bg-slate-950/40 border border-white/5 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 scale-150 opacity-5 pointer-events-none">
                    <Workflow className="w-32 h-32 text-orange-600" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase rounded-lg">
                        {activeCondition.plexus} Plexus
                      </span>
                      <span className="px-3 py-1 bg-slate-900 text-slate-350 text-[10px] font-black uppercase rounded-lg">
                        {activeCondition.category}
                      </span>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
                      {activeCondition.name}
                    </h2>
                    <p className="text-slate-400 font-medium italic">Lesion Level Analysis</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Presentation */}
                  <div className="space-y-6">
                    <div className="bg-slate-950/40 border border-white/5 rounded-[32px] p-8 flex flex-col gap-6">
                      <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" /> Clinical Features
                      </h3>
                      <ul className="space-y-4">
                        {activeCondition.clinicalFeatures.map((f, i) => (
                          <li key={i} className="flex gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-200 mt-2 shrink-0" />
                            <span className="text-sm font-bold text-slate-400 leading-relaxed">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950/40 border border-white/5 rounded-[32px] p-8 flex flex-col gap-6">
                      <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <Layers className="w-4 h-4 text-orange-500" /> Sensation & Motor
                      </h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                            Sensory Loss
                          </div>
                          <ul className="space-y-3">
                            {activeCondition.sensationChanges.map((s, i) => (
                              <li key={i} className="text-xs font-bold text-slate-400">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                            Motor Deficits
                          </div>
                          <ul className="space-y-3">
                            {activeCondition.motorDeficits.map((m, i) => (
                              <li key={i} className="text-xs font-bold text-slate-400">
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Anatomy & Illustration */}
                  <div className="space-y-6">
                    <div className="bg-slate-900 rounded-[32px] overflow-hidden aspect-square relative group">
                      {isIllustrationLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
                          <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                            Synthesizing Anatomy...
                          </span>
                        </div>
                      ) : illustrationUrl ? (
                        <MedImage
                          src={illustrationUrl}
                          alt={activeCondition.name}
                          label="Anatomy"
                          className="w-full h-full object-cover"
                          config={{ size: 'full', position: 'top' }}
                          onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-350">
                          <Info className="w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/90 to-transparent">
                        <div className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] mb-1">
                          Dermatomes / Myotomes
                        </div>
                        <div className="flex gap-2">
                          {activeCondition.anatomy.dermatomes.map((d) => (
                            <span
                              key={d}
                              className="px-2 py-0.5 bg-slate-950/40/10 rounded text-[9px] font-bold text-white uppercase"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-[32px] p-8">
                      <h3 className="text-sm font-black text-orange-700 uppercase tracking-widest mb-4">
                        Anatomy Summary
                      </h3>
                      <p className="text-sm font-bold text-orange-900 leading-relaxed">
                        {activeCondition.anatomy.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Special Provocative Tests */}
                <div className="bg-slate-950/40 border border-white/5 rounded-[40px] p-10">
                  <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tight flex items-center gap-3">
                    <Crosshair className="w-5 h-5 text-orange-600" /> Clinical Assessment & Special
                    Tests
                  </h3>
                  <div className="space-y-8">
                    {activeCondition.specialTests.map((test, i) => (
                      <div
                        key={i}
                        className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl space-y-4"
                      >
                        <div className="flex items-center gap-4 border-b border-white/5 pb-3">
                          <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-black">
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-lg font-black text-white">{test.testName}</div>
                            <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">
                              {test.useCaseExample}
                            </div>
                          </div>
                        </div>

                        <div className="pl-12 space-y-4">
                          <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                              Execution Method
                            </span>
                            <p className="text-xs text-slate-350 leading-relaxed font-semibold whitespace-pre-line">
                              {test.method}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-red-950/20 border-l-4 border-red-500 rounded-r-2xl">
                              <span className="text-[9px] font-black text-red-400 uppercase tracking-widest block mb-1">
                                Positive Result (Replicates Pathology)
                              </span>
                              <p className="text-xs font-semibold text-slate-300">
                                {test.findingsInterpretation.positive}
                              </p>
                            </div>
                            <div className="p-4 bg-emerald-950/20 border-l-4 border-emerald-500 rounded-r-2xl">
                              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-1">
                                Negative Result
                              </span>
                              <p className="text-xs font-semibold text-slate-300">
                                {test.findingsInterpretation.negative}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">
                              Clinical Significance & Stats
                            </span>
                            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                              {test.clinicalRelevance}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pearls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeCondition.pearls.map((p, i) => (
                    <div
                      key={i}
                      className="p-6 bg-slate-950/40 border border-white/5 rounded-3xl group hover:border-orange-200 transition-all"
                    >
                      <Zap className="w-5 h-5 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-slate-400 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center gap-6 text-center text-slate-300">
                <div className="w-24 h-24 rounded-full bg-slate-950/20 flex items-center justify-center mb-4">
                  <Brain className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-400">
                  Select a Pathology
                </h3>
                <p className="text-sm font-bold text-slate-400 max-w-xs uppercase tracking-widest">
                  Choose a condition to visualize neuro-anatomical lesion levels and assessment
                  criteria
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
};

export default NeuropraxiaView;
