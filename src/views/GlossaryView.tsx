import React, { useState, useMemo } from 'react';
import { GlossaryEntry } from '../types';
import { Book, Search, ChevronRight, Hash, Info, ArrowLeft, Sparkles, Layers } from 'lucide-react';
import { useClinicalSearch } from '../hooks/useClinicalSearch';

const GLOSSARY_DATA: GlossaryEntry[] = [
  {
    term: 'Auscultation',
    definition:
      'The act of listening to sounds from the heart, lungs, or other organs, typically with a stethoscope, as a part of medical diagnosis.'
  },
  {
    term: 'Palpation',
    definition:
      'A method of feeling with the fingers or hands during a physical examination to examine the size, consistency, texture, location, and tenderness of an organ or body part.'
  },
  {
    term: 'Percussion',
    definition:
      'A method of tapping on a surface to determine the underlying structure, and is used in clinical examinations to assess the condition of the thorax or abdomen.'
  },
  {
    term: 'Inspection',
    definition:
      'The visual examination of the patient to observe for any abnormalities, such as changes in color, shape, or movement.'
  },
  {
    term: 'Cyanosis',
    definition:
      'A bluish discoloration of the skin and mucous membranes resulting from inadequate oxygenation of the blood.'
  },
  {
    term: 'Clubbing',
    definition:
      'A bulbous enlargement of the ends of one or more fingers or toes, often associated with chronic lung or heart disease.'
  },
  {
    term: 'Jaundice',
    definition:
      'A yellowing of the skin and the whites of the eyes caused by an accumulation of bile pigment (bilirubin) in the blood.'
  },
  {
    term: 'Ascites',
    definition: 'The accumulation of fluid in the peritoneal cavity, causing abdominal swelling.'
  },
  { term: 'Splenomegaly', definition: 'Abnormal enlargement of the spleen.' },
  { term: 'Hepatomegaly', definition: 'Abnormal enlargement of the liver.' },
  {
    term: 'Lymphadenopathy',
    definition: 'A disease affecting the lymph nodes, which often become enlarged or swollen.'
  },
  {
    term: 'Murmur',
    definition:
      'An extra or unusual sound heard during a heartbeat, sometimes sounding like a whooshing or swishing noise.'
  },
  {
    term: 'Crepitations',
    definition:
      'Crackling or rattling sounds heard during auscultation of the lungs, often indicating fluid in the alveoli.'
  },
  {
    term: 'Wheeze',
    definition:
      'A continuous, coarse, whistling sound produced in the respiratory airways during breathing.'
  },
  {
    term: 'Bruit',
    definition:
      'An abnormal sound, usually a blowing or swishing noise, heard through a stethoscope over an artery or organ.'
  },
  {
    term: 'Pitting Edema',
    definition:
      'Swelling where a finger press leaves an indentation that persists for some time after the pressure is removed.'
  },
  {
    term: 'Tachycardia',
    definition: 'An abnormally rapid heart rate, typically over 100 beats per minute at rest.'
  },
  {
    term: 'Bradycardia',
    definition: 'An abnormally slow heart rate, typically under 60 beats per minute at rest.'
  },
  { term: 'Dyspnea', definition: 'Difficult or labored breathing; shortness of breath.' },
  {
    term: 'Orthopnea',
    definition:
      'Shortness of breath that occurs when lying flat, causing the person to have to sleep propped up in bed or sitting in a chair.'
  },
  {
    term: 'Hemoptysis',
    definition:
      'The coughing up of blood or blood-stained mucus from the bronchi, larynx, trachea, or lungs.'
  },
  {
    term: 'Melena',
    definition:
      'Dark sticky feces containing partly digested blood, typically following internal bleeding or the swallowing of blood.'
  },
  { term: 'Hematemesis', definition: 'The vomiting of blood.' },
  {
    term: 'Syncope',
    definition: 'Temporary loss of consciousness caused by a fall in blood pressure; fainting.'
  },
  {
    term: 'Ataxia',
    definition:
      'The loss of full control of bodily movements, often resulting in a lack of coordination.'
  },
  { term: 'Nystagmus', definition: 'Rapid involuntary movements of the eyes.' },
  {
    term: 'Proprioception',
    definition:
      'The sense of the relative position of neighboring parts of the body and strength of effort being employed in movement.'
  },
  {
    term: 'Stridor',
    definition:
      'A harsh or grating sound when breathing, caused by obstruction of the windpipe or larynx.'
  },
  {
    term: 'Tremor',
    definition:
      'An involuntary, somewhat rhythmic, muscle contraction and relaxation involving oscillations or twitching movements of one or more body parts.'
  },
  {
    term: 'Fasciculation',
    definition:
      'A brief, spontaneous contraction affecting a small number of muscle fibers, often causing a flicker of movement under the skin.'
  },
  { term: 'Hyperreflexia', definition: 'Overactive or overresponsive reflexes.' },
  { term: 'Hyporeflexia', definition: 'Below normal or absent reflexes.' },
  {
    term: 'Babinski Sign',
    definition:
      'An upward response (extension) of the big toe when the sole of the foot is stimulated, indicating damage to the central nervous system.'
  },
  {
    term: 'Romberg Test',
    definition:
      'A test used in an exam of neurological function for balance, and also as a test for drunken driving.'
  },
  {
    term: 'Kyphosis',
    definition: 'Excessive outward curvature of the spine, causing hunching of the back.'
  },
  { term: 'Lordosis', definition: 'Excessive inward curvature of the spine.' },
  { term: 'Scoliosis', definition: 'Abnormal lateral curvature of the spine.' },
  { term: 'Pruritus', definition: 'Severe itching of the skin, as a symptom of various ailments.' },
  {
    term: 'Erythema',
    definition:
      'Superficial reddening of the skin, usually in patches, as a result of injury or irritation causing dilatation of the blood capillaries.'
  },
  { term: 'Petechiae', definition: 'Small red or purple spots caused by bleeding into the skin.' },
  {
    term: 'Purpura',
    definition:
      'A rash of purple spots on the skin caused by internal bleeding from small blood vessels.'
  },
  {
    term: 'Ecchymosis',
    definition:
      'A discoloration of the skin resulting from bleeding underneath, typically caused by bruising.'
  },
  {
    term: 'Xanthelasma',
    definition:
      'A sharply demarcated yellowish deposit of fat underneath the skin around the eyelids.'
  },
  {
    term: 'Koilonychia',
    definition: 'Spoon-shaped nails, often a sign of iron-deficiency anemia.'
  },
  { term: 'Leukonychia', definition: 'White spots or lines on the fingernails or toenails.' },
  {
    term: 'Spider Naevi',
    definition:
      "A type of telangiectasia found slightly beneath the skin surface, often containing a central red spot and reddish extensions which radiate outwards like a spider's web."
  },
  {
    term: 'Palmar Erythema',
    definition:
      'Reddening of the palms of the hands, often associated with liver disease or pregnancy.'
  },
  {
    term: "Dupuytren's Contracture",
    definition:
      'A condition in which one or more fingers become permanently bent in a flexed position.'
  },
  {
    term: 'Asterixis',
    definition:
      'A tremor of the hand when the wrist is extended, sometimes said to resemble a bird flapping its wings; often associated with hepatic encephalopathy.'
  },
  {
    term: 'Caput Medusae',
    definition:
      'The appearance of distended and engorged superficial epigastric veins, which are seen radiating from the umbilicus across the abdomen.'
  },
  {
    term: "Murphy's Sign",
    definition:
      "A sign of gallbladder disease (cholecystitis) consisting of pain on taking a deep breath when the examiner's fingers are on the approximate location of the gallbladder."
  },
  {
    term: "McBurney's Point",
    definition:
      'A point on the right side of the abdomen, about two-thirds of the distance between the umbilicus and the anterior superior iliac spine, where tenderness is a sign of appendicitis.'
  },
  {
    term: "Rovsing's Sign",
    definition:
      "A sign of appendicitis; if palpation of the left lower quadrant of a person's abdomen increases the pain felt in the right lower quadrant."
  },
  {
    term: 'Rebound Tenderness',
    definition:
      'Pain that is felt upon the sudden release of steady pressure over a part of the abdomen.'
  },
  {
    term: 'Guarding',
    definition:
      'The tensing of the abdominal wall muscles to guard inflamed organs within the abdomen from the pain of pressure upon them.'
  },
  {
    term: 'Rigidity',
    definition: 'Involuntary stiffness of the abdominal muscles, indicating peritonitis.'
  },
  {
    term: 'Bruit',
    definition:
      'An abnormal sound, usually a blowing or swishing noise, heard through a stethoscope over an artery or organ.'
  },
  {
    term: 'Thrill',
    definition: 'A vibratory sensation felt on the skin overlying an area of turbulent blood flow.'
  },
  {
    term: 'Heave',
    definition:
      'A palpable lifting sensation felt over the precordium, indicating ventricular hypertrophy.'
  },
  {
    term: 'Apex Beat',
    definition:
      'The furthermost point outwards and downwards from the sternum at which the cardiac impulse can be felt.'
  },
  {
    term: 'Jugular Venous Pressure (JVP)',
    definition:
      'The indirectly observed pressure over the venous system via visualization of the internal jugular vein.'
  },
  {
    term: 'Hepatojugular Reflux',
    definition:
      'The distension of the neck veins precipitated by the maneuver of firm pressure over the liver.'
  },
  {
    term: 'Pulsus Paradoxus',
    definition:
      'An abnormally large decrease in systolic blood pressure and pulse wave amplitude during inspiration.'
  },
  {
    term: 'Water-hammer Pulse',
    definition:
      'A pulse that is bounding and forceful, rapidly increasing and then collapsing, as occurs in aortic regurgitation.'
  },
  {
    term: "Corrigan's Pulse",
    definition:
      'A clinical sign in which there is a forceful distension and collapse of the carotid arteries.'
  },
  {
    term: "Quincke's Sign",
    definition: 'Capillary pulsations in the fingernails, often seen in aortic regurgitation.'
  },
  {
    term: "Duroziez's Sign",
    definition:
      'A systolic and diastolic bruit heard over the femoral artery when it is compressed with a stethoscope.'
  },
  {
    term: "Traube's Sign",
    definition: 'A booming "pistol-shot" sound heard over the femoral artery.'
  },
  {
    term: "De Musset's Sign",
    definition:
      'A condition in which there is rhythmic nodding or bobbing of the head in synchrony with the beating of the heart, seen in aortic regurgitation.'
  },
  {
    term: 'Graham Steell Murmur',
    definition:
      'An early diastolic murmur heard at the left sternal border, indicating pulmonary regurgitation.'
  },
  {
    term: 'Austin Flint Murmur',
    definition: 'A low-pitched rumbling diastolic murmur heard at the apex in aortic regurgitation.'
  },
  {
    term: "Carvallo's Sign",
    definition:
      'A clinical sign found in patients with tricuspid regurgitation; the pansystolic murmur becomes louder during inspiration.'
  },
  {
    term: "Kussmaul's Sign",
    definition:
      'A paradoxical rise in jugular venous pressure (JVP) on inspiration, or a failure in the appropriate fall of the JVP with inspiration.'
  },
  {
    term: "Friedreich's Sign",
    definition:
      'A rapid fall and rise in the JVP (the "y" descent), seen in constrictive pericarditis.'
  },
  {
    term: "Beck's Triad",
    definition:
      'A collection of three medical signs associated with cardiac tamponade: low blood pressure, muffled heart sounds, and raised JVP.'
  },
  {
    term: 'Pulsus Alternans',
    definition:
      'A physical finding with arterial pulse waveform showing alternating strong and weak beats.'
  },
  {
    term: 'Pulsus Bisferiens',
    definition:
      'A physical finding with two systolic peaks per cardiac cycle, seen in aortic regurgitation and hypertrophic cardiomyopathy.'
  },
  {
    term: 'Pulsus Tardus et Parvus',
    definition: 'A pulse that is slow to rise and small in amplitude, seen in aortic stenosis.'
  },
  {
    term: 'Gallop Rhythm',
    definition:
      'The presence of a third (S3) or fourth (S4) heart sound, creating a rhythm reminiscent of a galloping horse.'
  },
  {
    term: 'Summation Gallop',
    definition:
      'The sound produced when both S3 and S4 are present and occur simultaneously during tachycardia.'
  },
  {
    term: 'Opening Snap',
    definition:
      'A high-pitched diastolic sound heard in mitral stenosis, caused by the sudden opening of the stenotic mitral valve.'
  },
  {
    term: 'Ejection Click',
    definition:
      'A high-pitched systolic sound heard in aortic or pulmonary stenosis, caused by the sudden opening of the semilunar valves.'
  },
  {
    term: 'Mid-systolic Click',
    definition:
      'A high-pitched sound heard in mitral valve prolapse, often followed by a late systolic murmur.'
  },
  {
    term: 'Pericardial Friction Rub',
    definition: 'A scratchy, high-pitched sound heard on auscultation, indicating pericarditis.'
  },
  {
    term: 'Pericardial Knock',
    definition:
      'A high-pitched diastolic sound heard in constrictive pericarditis, occurring slightly earlier than an S3.'
  },
  {
    term: "Hamman's Sign",
    definition:
      'A crunching sound heard over the precordium in synchrony with the heartbeat, indicating pneumomediastinum.'
  },
  {
    term: 'Tactile Vocal Fremitus',
    definition: "The vibration felt by a hand placed on a patient's chest while the patient speaks."
  },
  {
    term: 'Vocal Resonance',
    definition:
      "The sound heard through a stethoscope placed on a patient's chest while the patient speaks."
  },
  {
    term: 'Bronchophony',
    definition: 'The abnormal transmission of sounds from the lungs or bony ridges of the body.'
  },
  {
    term: 'Egophony',
    definition:
      'An increased resonance of voice sounds heard when auscultating the lungs, often described as having a nasal or bleating quality.'
  },
  {
    term: 'Whispered Pectoriloquy',
    definition:
      'The increased loudness of whispering heard through a stethoscope on the lung fields.'
  },
  {
    term: 'Tracheal Tug',
    definition:
      'An abnormal downward movement of the trachea during inspiration, seen in severe respiratory distress or aortic aneurysm.'
  },
  {
    term: 'Pectus Excavatum',
    definition: 'A condition in which the breastbone is sunken into the chest.'
  },
  {
    term: 'Pectus Carinatum',
    definition: 'A condition in which the breastbone protrudes from the chest.'
  },
  {
    term: 'Barrel Chest',
    definition:
      'A large, rounded thorax, often seen in patients with chronic obstructive pulmonary disease (COPD).'
  },
  {
    term: "Harrison's Sulcus",
    definition:
      'A horizontal groove along the lower border of the thorax corresponding to the costal insertion of the diaphragm.'
  },
  {
    term: "Hoover's Sign",
    definition:
      'The inward movement of the lower rib cage during inspiration, indicating a flat diaphragm as seen in COPD.'
  },
  {
    term: "Pemberton's Sign",
    definition:
      'Facial flushing and neck vein distension when the patient raises both arms above their head, indicating superior vena cava syndrome.'
  },
  {
    term: "Trousseau's Sign",
    definition:
      'A sign of hypocalcemia; carpal spasm induced by inflating a blood pressure cuff above systolic pressure.'
  },
  {
    term: "Chvostek's Sign",
    definition:
      'A sign of hypocalcemia; twitching of the facial muscles in response to tapping over the facial nerve.'
  },
  { term: 'Exophthalmos', definition: 'Protrusion of the eyeball from the orbit.' },
  {
    term: 'Lid Lag',
    definition: 'The failure of the upper eyelid to follow the downward movement of the eyeball.'
  },
  {
    term: 'Pretibial Myxedema',
    definition: "Thickening of the skin over the shins, often seen in Graves' disease."
  },
  {
    term: 'Acanthosis Nigricans',
    definition:
      'A skin condition characterized by areas of dark, velvety discoloration in body folds and creases.'
  },
  {
    term: 'Hirsutism',
    definition: 'Excessive body hair in parts of the body where hair is normally absent or minimal.'
  },
  {
    term: 'Gynecomastia',
    definition: "Enlargement of a man's breasts, usually due to hormone imbalance."
  },
  { term: 'Striae', definition: 'Stretch marks; linear marks, ridges, or grooves on the skin.' },
  {
    term: 'Moon Facies',
    definition:
      'A medical sign where the face develops a rounded appearance due to fat deposits on the sides of the face.'
  },
  { term: 'Buffalo Hump', definition: 'A hump of fat on the back of the neck and upper back.' },
  {
    term: 'Proximal Myopathy',
    definition:
      'Weakness of the muscles closest to the center of the body, such as the shoulders and hips.'
  },
  {
    term: 'Trendelenburg Sign',
    definition: 'A sign of hip abductor weakness; the pelvis drops on the side of the lifted leg.'
  },
  {
    term: 'Antalgic Gait',
    definition: 'A limp adopted to avoid pain on weight-bearing structures.'
  },
  {
    term: 'Ataxic Gait',
    definition: 'An unsteady, uncoordinated walk, with a wide base and the feet thrown out.'
  },
  {
    term: 'Festinating Gait',
    definition:
      "A gait characterized by small, shuffling steps that accelerate, often seen in Parkinson's disease."
  },
  {
    term: 'Steppage Gait',
    definition:
      'A gait characterized by lifting the leg high to avoid dragging the toes, often seen in foot drop.'
  },
  {
    term: 'Hemiplegic Gait',
    definition: 'A gait where the patient circumducts the paralyzed leg, often seen after a stroke.'
  },
  {
    term: 'Scissoring Gait',
    definition:
      'A gait where the legs cross over each other like scissors, often seen in cerebral palsy.'
  },
  {
    term: 'Waddling Gait',
    definition:
      'A gait characterized by an exaggerated side-to-side movement of the pelvis, often seen in proximal muscle weakness.'
  }
];

interface GlossaryViewProps {
  onBack?: () => void;
  initialTerm?: string;
}

const GlossaryView: React.FC<GlossaryViewProps> = ({ onBack, initialTerm }) => {
  const [searchQuery, setSearchQuery] = useState(initialTerm || '');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryEntry | null>(null);

  const sortedGlossary = useMemo(() => {
    return [...GLOSSARY_DATA].sort((a, b) => a.term.localeCompare(b.term));
  }, []);

  const { results: filteredGlossary, didYouMean } = useClinicalSearch(sortedGlossary, searchQuery, [
    'term',
    'definition'
  ]);

  const groupedGlossary = useMemo(() => {
    const groups: Record<string, GlossaryEntry[]> = {};
    filteredGlossary.forEach((entry) => {
      const firstLetter = entry.term[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(entry);
    });
    return groups;
  }, [filteredGlossary]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="max-w-6xl mx-auto py-10 px-8 animate-in fade-in duration-700 pb-32">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-900 rounded-xl text-slate-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="p-4 bg-blue-600 text-white rounded-[24px] shadow-2xl shadow-blue-600/20">
              <Book className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-none mb-2">
                Medical Glossary
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Info className="w-3 h-3" /> Clinical Terminology & Definitions
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-950/20 rounded-2xl border border-white/5">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              {GLOSSARY_DATA.length} Terms Indexed
            </span>
          </div>
        </div>

        <div className="relative group max-w-xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medical terms or definitions..."
            className="w-full pl-14 pr-6 py-4 bg-slate-950/40 border border-white/5 rounded-[20px] text-sm font-bold text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm outline-none"
          />
          {didYouMean && (
            <div className="mt-4 flex justify-start">
              <button
                onClick={() => setSearchQuery(didYouMean)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-950/20 hover:bg-blue-100 text-blue-600 rounded-xl transition-all shadow-sm w-full"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 shrink-0">
                  Did you mean
                </span>
                <span className="text-xs font-bold border-b border-blue-600 border-dashed truncate">
                  {didYouMean}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 shrink-0">
                  ?
                </span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Alphabet Navigation */}
        <div className="hidden lg:block sticky top-24 w-16 shrink-0">
          <div className="flex flex-col gap-1">
            {alphabet.map((letter) => {
              const hasTerms = groupedGlossary[letter];
              return (
                <button
                  key={letter}
                  onClick={() => {
                    const element = document.getElementById(`letter-${letter}`);
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  disabled={!hasTerms}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl text-[11px] font-black transition-all ${
                    hasTerms
                      ? 'text-slate-400 hover:bg-blue-600 hover:text-white cursor-pointer'
                      : 'text-slate-200 cursor-default'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 space-y-12 w-full">
          {Object.keys(groupedGlossary).length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 bg-slate-950/20 rounded-[50px] border-2 border-dashed border-white/5">
              <div className="p-8 bg-slate-950/40 rounded-full shadow-inner border border-white/5">
                <Search className="w-16 h-16 text-slate-200" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                  No Terms Found
                </h3>
                <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto">
                  Try searching for a different term or browse the alphabet.
                </p>
              </div>
            </div>
          ) : (
            Object.entries(groupedGlossary)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, entries]) => {
                const typedEntries = entries as GlossaryEntry[];
                return (
                  <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-black">
                        {letter}
                      </div>
                      <div className="h-px flex-1 bg-slate-900" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {typedEntries.map((entry, idx) => (
                        <div
                          key={idx}
                          className="group p-6 bg-slate-950/40 rounded-[32px] border border-white/5 shadow-sm hover:shadow-xl hover:border-blue-950/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-base font-black text-white group-hover:text-blue-600 transition-colors">
                              {entry.term}
                            </h3>
                            <div className="p-1.5 bg-slate-950/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                          </div>
                          <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
                            {entry.definition}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryView;
export { GLOSSARY_DATA };
