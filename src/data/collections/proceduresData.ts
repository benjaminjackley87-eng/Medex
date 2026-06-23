import { ImageConfig } from '../../types';

export interface ProcedureStep {
  title: string;
  description: string;
  pearls?: string[];
  imageUrl?: string;
  localImageUrl?: string;
  imageConfig?: ImageConfig;
}

export interface Procedure {
  id: string;
  name: string;
  category: 'Bedside' | 'Surgical' | 'Emergency' | 'Diagnostic';
  description: string;
  indications: string[];
  contraindications: string[];
  equipment: string[];
  steps: ProcedureStep[];
  complications: string[];
  aftercare: string[];
  imageUrl?: string;
  localImageUrl?: string;
  imageConfig?: ImageConfig;
}

export const INITIAL_PROCEDURES: Procedure[] = [
  {
    id: 'lumbar-puncture',
    name: 'Lumbar Puncture',
    category: 'Diagnostic',
    description: 'A critical diagnostic and therapeutic procedure involving the sampling of cerebrospinal fluid (CSF) from the subarachnoid space.',
    indications: [
      'Suspected CNS infection (Meningitis, Encephalitis)',
      'Subarachnoid hemorrhage (SAH) with negative CT',
      'Diagnosis of inflammatory conditions (MS, Guillain-Barré)',
      'Measurement of intracranial pressure (IIH)',
      'Therapeutic: Intrathecal chemotherapy or antibiotics',
      'Spinal anesthesia administration'
    ],
    contraindications: [
      'Evidence of raised ICP with risk of herniation (focal neuro signs, papilledema)',
      'Infection at the needle insertion site',
      'Coagulopathy (INR > 1.4, Platelets < 50,000)',
      'Suspected spinal cord compression',
      'Recent use of therapeutic anticoagulants (LMWH within 12-24h)'
    ],
    equipment: [
      'LP Tray (Sterile)',
      'Spinal needle (20G or 22G, preferably atraumatic Whitacre/Sprotte)',
      'Manometer with 3-way stopcock',
      'Sterile gloves, gown, mask, and cap',
      'Skin prep (0.5% Chlorhexidine in 70% Alcohol)',
      'Local anesthetic (1% Lidocaine with 5ml syringe and 25G needle)',
      '4 Sterile collection tubes (numbered 1-4)',
      'Adhesive bandage'
    ],
    steps: [
      { 
        title: 'Consent & Preparation', 
        description: 'Obtain informed consent. Perform a "Time Out" to verify patient identity, procedure, and site. Ensure recent neuroimaging has been reviewed if indicated.',
        pearls: ['Explain the "pop" sensation and the importance of remaining still to the patient.']
      },
      { 
        title: 'Positioning', 
        description: 'Lateral decubitus (preferred for pressure measurement) or sitting position. Maximize spinal flexion ("fetal position") to open the interspinous spaces. Ensure the back is perpendicular to the bed.',
        imageUrl: 'https://picsum.photos/seed/lp-positioning/800/600',
        pearls: ['In lateral decubitus, ensure the hips and shoulders are vertically aligned to avoid spinal rotation.']
      },
      { 
        title: 'Landmarking', 
        description: 'Identify the L3/L4 or L4/L5 interspace. Tuffier\'s line (connecting the superior iliac crests) typically crosses the L4 spinous process or L4/L5 space.',
        imageUrl: 'https://picsum.photos/seed/lp-landmarking/800/600',
        pearls: ['Mark the site with a pen or by indentation with a fingernail before sterile prep.']
      },
      { 
        title: 'Sterile Field & Local Anesthesia', 
        description: 'Perform surgical hand scrub. Apply sterile prep in a widening circular motion, ensuring no contamination of the sterile field occurs. Drape the area. Infiltrate 1% Lidocaine to create a skin wheal, then deeper into the interspinous ligament.',
        pearls: ['Wait at least 1-2 minutes for the anesthetic to take full effect before inserting the spinal needle.']
      },
      { 
        title: 'Needle Insertion', 
        description: 'Insert the spinal needle with stylet in place. Aim towards the umbilicus (slightly cephalad). Maintain the bevel parallel to the longitudinal dural fibers (bevel up in lateral decubitus).',
        pearls: [
          'If bone is encountered: Early bone (shallow) - adjust angle cephalad or caudad; Late bone (deep) - adjust angle slightly left or right.',
          'Always withdraw the needle to the subcutaneous tissue before re-angling.'
        ]
      },
      { 
        title: 'Entry & CSF Flow', 
        description: 'Advance slowly. A "pop" or change in resistance is often felt as the ligamentum flavum and dura are pierced. Remove the stylet periodically to check for CSF flow.',
        pearls: ['If flow is poor, rotate the needle 90 degrees; a nerve root may be obstructing the bevel.']
      },
      { 
        title: 'Opening Pressure', 
        description: 'Once CSF flows, attach the manometer via the 3-way stopcock. Ensure the patient is in lateral decubitus with legs slightly extended. Measure the height of the CSF column at the end of expiration.',
        pearls: ['Normal opening pressure is 10-20 cm H2O. Values >25 cm H2O suggest elevated ICP.']
      },
      { 
        title: 'CSF Collection', 
        description: 'Collect 2-3ml of CSF in each of the 4 tubes. Tube 1: Chemistry/Protein/Glucose; Tube 2: Microbiology/Gram stain; Tube 3: Hematology/Cell count; Tube 4: Special tests (Viral, Cytology).',
        pearls: ['Always use Tube 3 or 4 for cell count to minimize the impact of a "traumatic tap" (blood from insertion).']
      },
      { 
        title: 'Closure', 
        description: 'Replace the stylet before removing the needle to prevent dural strands from being pulled into the epidural space. Apply firm pressure and an adhesive bandage.',
        pearls: ['Replacing the stylet has been shown to significantly reduce the incidence of post-LP headache.']
      }
    ],
    complications: [
      'Post-dural puncture headache (PDPH) - most common',
      'Traumatic tap (iatrogenic bleeding)',
      'Infection (Meningitis or Discitis)',
      'Epidural hematoma',
      'Cerebral herniation (rare but catastrophic)',
      'Transient nerve root irritation'
    ],
    aftercare: [
      'Monitor vital signs and neurological status for 1-2 hours.',
      'Encourage oral hydration.',
      'Advise the patient to seek medical attention if they develop severe headache, fever, or new neurological deficits.',
      'No evidence that prolonged flat bed rest prevents PDPH, but it may improve comfort.'
    ]
  },
  {
    id: 'pleural-aspiration',
    name: 'Pleural Aspiration (Thoracentesis)',
    category: 'Diagnostic',
    description: 'Removal of fluid from the pleural space for diagnostic analysis (Light\'s criteria) or therapeutic relief of dyspnea.',
    indications: [
      'New-onset pleural effusion (except if clinically clear CHF)',
      'Symptomatic relief of large, tension, or bilateral effusions',
      'Suspected empyema or parapneumonic effusion'
    ],
    contraindications: [
      'Very small amount of fluid (<1cm on US or lateral decubitus)',
      'Skin infection at the insertion site',
      'Coagulopathy (relative; Platelets < 50,000, INR > 2.0)',
      'Uncooperative patient',
      'Mechanical ventilation (increased risk of tension pneumothorax if pleura is breached)'
    ],
    equipment: [
      'Thoracentesis kit or 21G needle with 3-way stopcock',
      'Ultrasound machine with curvilinear or linear probe',
      'Sterile gloves, gown, mask, and drape',
      'Skin prep (Chlorhexidine)',
      'Local anesthetic (1% Lidocaine)',
      'Collection tubes and large drainage bag (if therapeutic)'
    ],
    steps: [
      { 
        title: 'Positioning & US Marking', 
        description: 'Patient sits upright, leaning forward over a bedside table. Use ultrasound to identify the largest pocket of fluid, typically in the mid-scapular or posterior axillary line.',
        pearls: [
          'Mark the site with the patient in the exact position they will be in during the procedure.',
          'Identify the diaphragm and solid organs (liver/spleen) to avoid accidental puncture.'
        ]
      },
      { 
        title: 'Sterile Field & Anesthesia', 
        description: 'Perform sterile prep and drape. Infiltrate local anesthetic down to the parietal pleura. Ensure you aspirate fluid into the anesthetic syringe to confirm correct depth.',
        pearls: [
          'The parietal pleura is highly sensitive; ensure generous infiltration at this level.',
          'A "pop" may be felt as the needle enters the pleural space.'
        ]
      },
      { 
        title: 'Needle Insertion', 
        description: 'Insert the aspiration needle or catheter-over-needle assembly over the SUPERIOR border of the rib to avoid the neurovascular bundle.',
        pearls: [
          'The neurovascular bundle (VAN) runs along the inferior border of each rib.',
          'Maintain negative pressure during advancement until fluid is reached.'
        ]
      },
      { 
        title: 'Fluid Collection', 
        description: 'Aspirate the required amount of fluid (typically 50ml for diagnostic). For therapeutic drainage, connect to a drainage bag via a 3-way stopcock.',
        pearls: [
          'Do not remove more than 1.5L of fluid in a single session to avoid re-expansion pulmonary edema.',
          'Stop if the patient develops severe cough, chest pain, or shortness of breath.'
        ]
      },
      { 
        title: 'Analysis (Light\'s Criteria)', 
        description: 'Send fluid for: Protein, LDH, Glucose, pH, Gram stain/Culture, Cytology. Compare with serum Protein and LDH.',
        pearls: [
          'Exudate if: Fluid/Serum Protein > 0.5, Fluid/Serum LDH > 0.6, or Fluid LDH > 2/3 upper limit of normal serum LDH.',
          'Low pH (<7.2) or low glucose (<3.3 mmol/L) suggests empyema or malignancy.'
        ]
      }
    ],
    complications: [
      'Pneumothorax (most common)',
      'Hemothorax (intercostal artery injury)',
      'Re-expansion pulmonary edema',
      'Infection (Empyema)',
      'Splenic or hepatic laceration'
    ],
    aftercare: [
      'Post-procedure Chest X-ray if the patient is symptomatic or if air was aspirated.',
      'Monitor vital signs and respiratory effort.',
      'Advise the patient to report any new shortness of breath or pleuritic chest pain.'
    ]
  },
  {
    id: 'central-line',
    name: 'CVC Insertion (IJV)',
    category: 'Emergency',
    description: 'Placement of a central venous catheter (CVC) into the Internal Jugular Vein (IJV) under ultrasound guidance for reliable vascular access and hemodynamic monitoring.',
    indications: [
      'Administration of vasopressors or inotropes',
      'Long-term administration of irritant drugs (e.g., Amiodarone, TPN)',
      'Lack of peripheral venous access',
      'Hemodialysis or continuous renal replacement therapy (CRRT)',
      'Central venous pressure (CVP) monitoring',
      'Transvenous cardiac pacing'
    ],
    contraindications: [
      'Infection at the insertion site',
      'Thrombosis of the target vessel',
      'Coagulopathy (relative; IJV/Femoral preferred over Subclavian due to compressibility)',
      'Distorted local anatomy (e.g., trauma, previous surgery)',
      'Uncooperative patient (if not sedated/ventilated)'
    ],
    equipment: [
      'CVC Insertion Kit (Triple or Quad lumen)',
      'Ultrasound machine with high-frequency linear probe and sterile cover',
      'Full barrier precautions: Sterile gown, gloves, mask, and cap',
      'Full sterile body drape',
      'Skin prep (2% Chlorhexidine in 70% Alcohol)',
      'Local anesthetic (1% Lidocaine)',
      'Sterile saline flushes',
      'Suture material (e.g., 3-0 Silk or Prolene)',
      'Transparent sterile dressing'
    ],
    steps: [
      { 
        title: 'Preparation & Consent', 
        description: 'Obtain informed consent. Perform a "Time Out". Position the patient in Trendelenburg (15 degrees) to distend the IJV and prevent air embolism. Rotate the head slightly away from the insertion side.',
        pearls: [
          'Extreme head rotation can collapse the IJV or bring the carotid artery directly underneath it.',
          'Trendelenburg position increases the cross-sectional area of the IJV, making it an easier target.'
        ]
      },
      { 
        title: 'Ultrasound Survey', 
        description: 'Identify the IJV and Carotid Artery. Confirm IJV patency by compressibility. Note the relationship (IJV is usually lateral and more superficial).',
        pearls: [
          'The IJV is thin-walled and collapses with gentle pressure; the Carotid is thick-walled and pulsatile.',
          'Valsalva maneuver or humming by the patient can further distend the IJV.'
        ]
      },
      { 
        title: 'Sterile Field & Local Anesthesia', 
        description: 'Perform surgical hand scrub. Apply skin prep and full sterile drape. Infiltrate 1% Lidocaine at the puncture site under US guidance, creating a skin wheal and then deeper infiltration.',
        pearls: [
          'Ensure the ultrasound probe is covered with a sterile sheath and sterile gel is used inside and outside the sheath.',
          'Generous local anesthesia reduces patient movement during the critical needle insertion phase.'
        ]
      },
      { 
        title: 'Venous Access (Real-time US)', 
        description: 'Insert the introducer needle attached to a syringe under real-time US guidance (short-axis or long-axis). Maintain negative pressure until a flash of dark, non-pulsatile blood is seen.',
        pearls: [
          'Keep the needle tip in view at all times. Use the "dynamic needle tip tracking" technique.',
          'If blood is bright red or pulsatile, suspect arterial puncture. Apply pressure for 5-10 minutes.'
        ]
      },
      { 
        title: 'Seldinger Technique', 
        description: 'Remove the syringe while securing the needle. Thread the guidewire through the needle. The wire should pass easily without resistance. Confirm wire position in the vein with US.',
        pearls: [
          'Never force the guidewire. If resistance is felt, withdraw slightly and re-verify venous position.',
          'Monitor for cardiac arrhythmias (ectopy) on the monitor; if seen, pull the wire back 1-2 cm.'
        ]
      },
      { 
        title: 'Dilation', 
        description: 'Remove the needle over the wire, keeping the wire in place. Make a small skin nick with a #11 scalpel. Pass the dilator over the wire to create a tract, then remove it.',
        pearls: [
          'Always maintain a firm grip on the guidewire at the skin surface.',
          'Only dilate as deep as the subcutaneous tissue; do not dilate the vein wall itself to avoid unnecessary trauma.'
        ]
      },
      { 
        title: 'Catheter Insertion', 
        description: 'Advance the CVC over the wire to the desired depth. Ensure the wire protrudes from the distal hub before advancing the catheter into the vein.',
        pearls: [
          'Depth for Right IJV: Men ~15-16 cm, Women ~13-14 cm. Depth for Left IJV: Add 2-3 cm.',
          'Ensure the wire is never "lost" inside the patient.'
        ]
      },
      { 
        title: 'Securing & Confirmation', 
        description: 'Aspirate blood from all lumens to ensure patency, then flush with sterile saline. Secure the catheter with sutures. Apply a sterile transparent dressing.',
        pearls: [
          'Perform a post-procedure Chest X-ray to confirm the tip is in the Superior Vena Cava and rule out pneumothorax.',
          'The ideal tip location is at the level of the carina or the junction of the SVC and Right Atrium.'
        ]
      }
    ],
    complications: [
      'Arterial puncture (Carotid artery)',
      'Pneumothorax (lower risk than subclavian but still possible)',
      'Air embolism',
      'Cardiac arrhythmias',
      'Catheter-related bloodstream infection (CRBSI)',
      'Venous thrombosis'
    ],
    aftercare: [
      'Immediate post-procedure Chest X-ray.',
      'Daily site inspection for erythema, warmth, or drainage.',
      'Flush all lumens with saline every 8-12 hours if not in use.',
      'Remove the catheter as soon as it is no longer strictly necessary.'
    ]
  },
  {
    id: 'arterial-line',
    name: 'Arterial Line Insertion',
    category: 'Emergency',
    description: 'Placement of a catheter into an artery (typically Radial, Brachial, or Femoral) for continuous blood pressure monitoring and frequent arterial blood gas (ABG) sampling.',
    indications: [
      'Continuous real-time blood pressure monitoring (e.g., in shock, hypertensive crisis)',
      'Frequent arterial blood gas sampling',
      'Failure of non-invasive blood pressure monitoring'
    ],
    contraindications: [
      'Infection at the insertion site',
      'Absent collateral circulation (for radial site - abnormal Allen\'s test)',
      'Raynaud\'s phenomenon (relative)',
      'Thromboangiitis obliterans (Buerger\'s disease)',
      'Vascular graft at the site'
    ],
    equipment: [
      'Arterial line kit (catheter-over-needle or Seldinger)',
      'Pressure transducer system with flush bag (heparinized saline)',
      'Ultrasound machine (optional but recommended)',
      'Sterile gloves, mask, and drape',
      'Skin prep (Chlorhexidine)',
      'Local anesthetic (1% Lidocaine)',
      'Suture or adhesive securement device'
    ],
    steps: [
      { 
        title: 'Preparation & Allen\'s Test', 
        description: 'Obtain consent. Perform Allen\'s test to ensure adequate ulnar collateral flow if using the radial artery. Position the wrist in slight extension.',
        pearls: ['Avoid extreme extension as it can flatten the artery and make puncture more difficult.']
      },
      { 
        title: 'US Identification', 
        description: 'Identify the artery using ultrasound. Confirm pulsatility and non-compressibility. Note the depth and course of the vessel.',
        pearls: ['The radial artery is often found just medial to the radial styloid process.']
      },
      { 
        title: 'Sterile Prep & Anesthesia', 
        description: 'Perform sterile prep and drape. Infiltrate a small amount of local anesthetic over the puncture site.',
        pearls: ['Avoid large volumes of anesthetic which can obscure the arterial pulse or US view.']
      },
      { 
        title: 'Arterial Puncture', 
        description: 'Insert the needle at a 30-45 degree angle. Advance until a flash of bright red, pulsatile blood is seen in the hub.',
        pearls: ['If using catheter-over-needle, advance the entire unit 1-2mm further once flash is seen to ensure the catheter tip is in the lumen.']
      },
      { 
        title: 'Catheter Advancement', 
        description: 'Lower the angle of the needle and advance the catheter over the needle into the artery. Remove the needle while applying proximal pressure to the artery.',
        pearls: ['If resistance is felt, do not force the catheter. Use the Seldinger technique (guidewire) if necessary.']
      },
      { 
        title: 'Connection & Securement', 
        description: 'Connect the catheter to the pressure transducer system. Confirm a sharp arterial waveform on the monitor. Secure with sutures or adhesive device.',
        pearls: ['Ensure all connections are tight to prevent hemorrhage.']
      }
    ],
    complications: [
      'Hematoma and bleeding',
      'Arterial thrombosis or embolism',
      'Infection',
      'Pseudoaneurysm formation',
      'Skin necrosis'
    ],
    aftercare: [
      'Continuous monitoring of the arterial waveform.',
      'Regular neurovascular checks of the distal limb (color, warmth, capillary refill).',
      'Maintain the pressure bag at 300 mmHg.',
      'Label the line clearly as "Arterial".'
    ]
  },
  {
    id: 'suturing-techniques',
    name: 'Suturing Techniques',
    category: 'Surgical',
    description: 'Fundamental skills for skin closure, including selection of materials and specific knot-tying techniques for various clinical scenarios.',
    indications: [
      'Skin laceration closure',
      'Surgical incision closure',
      'Securing medical devices (drains, tubes, central lines)'
    ],
    contraindications: [
      'Highly contaminated or infected wounds (consider delayed primary closure)',
      'Tension too high for simple sutures (may require undermining or flaps)',
      'Wounds requiring deep structural repair beyond simple skin closure',
      'Significant tissue loss preventing edge apposition'
    ],
    equipment: [
      'Suture kit (Adson forceps, Needle driver, Suture scissors)',
      'Suture material (e.g., 3-0 or 4-0 Nylon/Ethilon for skin)',
      'Local anesthetic (1% Lidocaine with/without Adrenaline)',
      'Sterile gloves, gown, and drapes',
      'Skin prep solution (Chlorhexidine or Betadine)',
      'Sterile gauze and dressings'
    ],
    steps: [
      { 
        title: 'Wound Preparation', 
        description: 'Irrigate thoroughly with normal saline to remove debris. Clean surrounding skin with antiseptic. Infiltrate local anesthesia and drape the area to maintain a sterile field.',
        pearls: ['Always check distal neurovascular status and tendon integrity BEFORE applying local anesthetic.']
      },
      { 
        title: 'Simple Interrupted', 
        description: 'The foundation of suturing. Insert needle at 90° to skin surface (~5mm from edge), exiting at equal depth/distance on opposite side. Tie a secure square knot (instrument tie).',
        imageUrl: 'https://images.unsplash.com/photo-1579154235602-3c220f9db111?auto=format&fit=crop&q=80&w=800',
        pearls: [
          'The "Rule of Halves": Place the first suture in the middle of the wound, then bisect the remaining segments for even spacing.',
          'Aim for slight eversion of the wound edges; they will flatten as they heal.'
        ]
      },
      { 
        title: 'Vertical Mattress', 
        description: 'Superior for wound edge eversion and providing deep tissue support. Use the "Far-far, Near-near" technique: 1. Far-far (deep/wide bite), 2. Near-near (shallow/narrow bite) in the same vertical plane.',
        pearls: ['Excellent for areas where skin naturally tends to invert (e.g., posterior neck, concave surfaces).']
      },
      { 
        title: 'Horizontal Mattress', 
        description: 'Effective for everting edges and distributing tension across a wider area. Consists of two simple interrupted passes side-by-side in opposite directions, forming a loop.',
        pearls: ['Useful for closing wounds under moderate tension, but carry a higher risk of tissue strangulation if tied too tight.']
      },
      { 
        title: 'Continuous (Running) Suture', 
        description: 'A series of sutures tied only at the beginning and end. Rapid closure technique for long, low-tension wounds with well-approximated edges.',
        pearls: ['If one part of the suture breaks, the entire wound may dehisce. Avoid if there is any risk of infection requiring partial drainage.']
      },
      { 
        title: 'Securing the Knot', 
        description: 'Use the instrument tie method. Place the needle driver over the wound, wrap suture twice for the first throw (surgeons knot), then single wraps for subsequent throws in opposite directions.',
        pearls: ['Ensure the knot is pulled to one side of the wound, not sitting directly on the incision line.']
      }
    ],
    complications: [
      'Infection (Abscess, Cellulitis)',
      'Wound Dehiscence',
      'Hypertrophic scarring or Keloid formation',
      'Tissue ischemia/necrosis (due to excessive tension)',
      'Nerve or vessel injury during needle passage',
      'Suture "spitting" (if using absorbable deep sutures)'
    ],
    aftercare: [
      'Keep the wound clean and dry for at least 24-48 hours.',
      'Advise on signs of infection: Increasing pain, redness, warmth, or purulent discharge.',
      'Suture Removal Timing: Face (3-5 days), Scalp (7-10 days), Trunk/Extremities (10-14 days), High-tension areas/Joints (14 days).'
    ]
  },
  {
    id: 'joint-aspiration',
    name: 'Joint Aspiration (Knee Arthrocentesis)',
    category: 'Bedside',
    description: 'A diagnostic and therapeutic procedure involving the aspiration of synovial fluid from the knee joint cavity under strict aseptic conditions to rule out septic arthritis and evaluate crystal arthropathies.',
    indications: [
      'Suspected septic arthritis (critical diagnostic emergency)',
      'Evaluation of crystal-induced arthropathy (Gout vs. Pseudogout)',
      'Decompression of a tense hemarthrosis or large joint effusion for symptomatic relief',
      'Intra-articular drug delivery (corticosteroids, hyaluronan)'
    ],
    contraindications: [
      'Active cellulitis or cutaneous infection overlying the needle insertion path',
      'Bacteremia (relative; do not introduce bacteria into a joint unless septic arthritis is strongly suspected)',
      'Uncontrolled coagulopathy or therapeutic anticoagulation (relative; INR > 3.0)',
      'Prosthetic joint (absolute contraindication for bedside aspiration; must be performed under theatre-sterile conditions by Orthopaedics)'
    ],
    equipment: [
      'Sterile dressing pack (drapes, gauze, skin prep)',
      '2% Chlorhexidine in 70% Isopropyl Alcohol',
      'Sterile gloves and gown',
      'Local anesthetic: 1% Lidocaine (5-10 ml) with 25G needle and 10ml syringe',
      'Aspiration needle: 18G or 20G (large bore required for thick inflammatory fluid)',
      'Syringes: 20ml and 50ml (for large volume effusions)',
      'Synovial fluid collection tubes: Sterile plain tube (for Gram stain and Culture), EDTA tube (for Cell Count and Differential), Heparinized plain tube (for Polarized Light Microscopy for crystals)'
    ],
    steps: [
      {
        title: 'Consent, Prep & ANTT',
        description: 'Obtain informed consent. Perform a strict Aseptic Non-Touch Technique (ANTT). Position the patient supine with the knee fully extended or slightly flexed to 15-20 degrees with a small towel roll under the popliteal fossa to relax the quadriceps.',
        pearls: ['ANTT is vital to prevent introducing exogenous organisms into a sterile joint space.']
      },
      {
        title: 'Landmarking & Approach',
        description: 'Identify the lateral infrapatellar or lateral suprapatellar approach. For lateral suprapatellar (preferred), landmark 1cm superior and 1cm lateral to the superior-lateral corner of the patella, targeting the suprapatellar bursa.',
        pearls: ['Milking the joint effusion from the medial and inferior aspects towards the bursa can distend the suprapatellar space and make aspiration easier.']
      },
      {
        title: 'Local Anesthesia & Puncture',
        description: 'Perform a sterile surgical prep. Raise a skin wheal with 1% Lidocaine. Infiltrate down to the joint capsule. Insert the 18G aspiration needle, maintaining continuous negative pressure as you advance behind the patella, parallel to the bed.',
        pearls: [
          'A loss of resistance or a "give" is felt when entering the joint capsule.',
          'Always stabilize the needle hub during syringe swaps to prevent articular cartilage trauma.'
        ]
      },
      {
        title: 'Fluid Collection & Analysis',
        description: 'Aspirate as much fluid as possible. Send the samples immediately for: Gram stain/Culture, Polarized Light Microscopy (needle-shaped negatively birefringent Monosodium Urate crystals for Gout; rhomboid positively birefringent Calcium Pyrophosphate crystals for Pseudogout), and Cell Count.',
        pearls: [
          'Septic arthritis typically has synovial WCC > 50,000 cells/µL with >75% polymorphonuclear leukocytes (PMNs).',
          'Inflammatory effusions (e.g., Rheumatoid Arthritis) typically show WCC 2,000-50,000 cells/µL.'
        ]
      }
    ],
    complications: [
      'Iatrogenic joint space infection (incidence < 1 in 10,000 with proper ANTT)',
      'Local hemorrhage or hemarthrosis',
      'Articular cartilage injury from the needle tip',
      'Local anesthetic systemic toxicity (LAST) - rare for joint volumes'
    ],
    aftercare: [
      'Apply firm pressure for 2 minutes followed by a sterile adhesive bandage.',
      'Advise resting the joint for 24 hours.',
      'Educate patient on red-flag symptoms: fever, systemic chills, worsening joint pain, or spreading erythema.'
    ]
  },
  {
    id: 'chest-drain',
    name: 'Chest Drain Insertion (Seldinger Technique)',
    category: 'Emergency',
    description: 'Placement of a small-bore intercostal catheter (ICC) into the pleural space using the Seldinger wire-guided technique to evacuate air, blood, or fluid.',
    indications: [
      'Pneumothorax (primary/secondary spontaneous, tension post-decompression, traumatic, or mechanical ventilation-induced)',
      'Symptomatic malignant pleural effusion or recurrent transudative pleural effusion',
      'Parapneumonic effusion or pleural empyema',
      'Hemothorax (though large-bore open surgical tubes may be preferred for massive hemothorax)'
    ],
    contraindications: [
      'Local skin infection or burn overlying the insertion site',
      'Severe coagulopathy or thrombocytopenia (relative; target INR < 1.5, Platelets > 50,000 if time permits)',
      'Co-existing pleural adhesions at the target site (requires careful ultrasound mapping or open surgical finger thoracostomy instead)'
    ],
    equipment: [
      'Seldinger Chest Drain Kit (typically 12F to 14F catheter)',
      'Guidewire, introducer needle, dilators, and three-way stopcock',
      '2% Chlorhexidine in 70% Isopropyl Alcohol skin prep',
      'Full sterile barrier precautions (sterile gown, gloves, mask, cap, and large windowed drape)',
      'Local anesthetic: 1% Lidocaine (10-20 ml) with 5ml/10ml syringes and 25G/21G needles',
      'Scalpel (#11 blade)',
      'Underwater seal chest drainage system (e.g., Atrium) primed with sterile water',
      'Suture material (1-0 Silk or Nylon) for securement',
      'Intralipid 20% emulsion (on standby for LAST protocols)'
    ],
    steps: [
      {
        title: 'Consent & Position',
        description: 'Obtain consent (unless emergent). Position the patient supine or semi-recumbent (30-45 degrees head up) with the arm on the affected side abducted and rested behind the patient\'s head to expose the axilla.',
        pearls: ['Ensure the underwater seal system is fully assembled and primed before starting the procedure.']
      },
      {
        title: 'Landmarking (Safety Triangle)',
        description: 'Identify the Safe Triangle: bordered anteriorly by the lateral border of the Pectoralis Major, posteriorly by the anterior border of the Latissimus Dorsi, superiorly by the axilla, and inferiorly by the 5th intercostal space (level of the nipple in men).',
        pearls: [
          'Ultrasound mapping of the fluid/air pocket is strongly recommended to identify the safest intercostal space.',
          'Always target the interspace just superior to the lower rib to avoid the intercostal neurovascular bundle running along the inferior margin of the upper rib.'
        ]
      },
      {
        title: 'Sterile Field & Local Anesthesia',
        description: 'Establish a wide sterile field. Infiltrate skin, subcutaneous tissue, and then advance the needle to the rib periosteum. Walk the needle over the superior border of the lower rib, infiltrating Lidocaine deep down to the parietal pleura. Aspirate air or fluid to confirm entry into the pleural space before depositing the final local anesthetic volume.',
        pearls: [
          'The parietal pleura is highly sensitive; ensure it is fully anesthetized.',
          'Observe for Local Anesthetic Systemic Toxicity (LAST) symptoms: metallic taste, tinnitus, circumoral numbness, seizure, or cardiac arrhythmias. Treat LAST with 20% Intralipid (1.5 mL/kg IV bolus over 1 min, then 0.25 mL/kg/min infusion).'
        ]
      },
      {
        title: 'Seldinger Puncture & Wire Threading',
        description: 'Make a small 5mm skin incision with the scalpel. Insert the Seldinger introducer needle attached to a syringe, walking over the superior border of the rib, maintaining negative syringe pressure. Once air or pleural fluid is freely aspirated, remove the syringe, stabilize the needle, and thread the guidewire. The wire should glide in without resistance.',
        pearls: [
          'If resistance is encountered, stop. Do not force the wire. Re-verify needle position by aspirating fluid/air.',
          'Always keep a secure hand on the guidewire.'
        ]
      },
      {
        title: 'Dilation & Catheter Placement',
        description: 'Withdraw the introducer needle over the guidewire. Pass the dilator over the guidewire to dilate the tract through the intercostal muscles. Remove the dilator, and feed the chest tube over the wire into the pleural space. Ensure all side holes of the catheter are well within the pleural space.',
        pearls: ['Dilate only in a single forward motion; do not twist or force the dilator deep into the pleural space to avoid lung parenchyma laceration.']
      },
      {
        title: 'Connection & Securement',
        description: 'Withdraw the guidewire. Immediately clamp or occlude the chest tube, then connect it to the three-way stopcock and the underwater seal drainage system. Unclamp and observe for "swinging" (respiratory variation of the fluid column) or "bubbling" (active air leak). Secure the catheter with a heavy suture and apply a clear, occlusive dressing.',
        pearls: [
          'Confirm placement and check for complications (e.g. pneumothorax, catheter malposition) with an immediate post-procedure erect Chest X-ray.',
          'Never clamp a bubbling chest tube, as this can rapidly precipitate a tension pneumothorax.'
        ]
      }
    ],
    complications: [
      'Intercostal artery laceration resulting in hemothorax',
      'Visceral organ injury (lung laceration, liver/spleen puncture)',
      'Subcutaneous emphysema (due to catheter malposition outside the pleura)',
      'Re-expansion pulmonary edema (if > 1.5L of chronic pleural fluid is drained rapidly)',
      'Local infection, empyema, or chest tube-associated cellulitis'
    ],
    aftercare: [
      'Obtain an immediate post-procedure Chest X-ray.',
      'Check the underwater seal system hourly for bubbling, swinging, and drainage volume.',
      'Ensure the drainage bottle is kept below the level of the patient\'s chest at all times.',
      'Advise nursing staff to monitor for sudden severe dyspnea, hypotension, or unilateral chest pain.'
    ]
  }
];
