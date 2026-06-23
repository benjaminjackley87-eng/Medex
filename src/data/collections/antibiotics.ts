export interface AntibioticCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Pathogen {
  name: string;
  type: string;
  microscopy: string;
}

export interface Antibiotic {
  name: string;
  short: string;
}

export const ANTIBIOTIC_CATEGORIES: AntibioticCategory[] = [
  { id: 'penicillins', name: 'Penicillins', icon: '💊', description: 'Beta-lactams targeting cell wall synthesis. Includes Benzylpenicillin, Amoxicillin, Flucloxacillin.' },
  { id: 'cephalosporins', name: 'Cephalosporins', icon: '🧬', description: 'Broad-spectrum beta-lactams. 1st to 5th generations with varying Gram +/- coverage.' },
  { id: 'carbapenems', name: 'Carbapenems', icon: '🛡️', description: 'Ultra-broad spectrum "big guns". Reserved for multi-drug resistant infections.' },
  { id: 'macrolides', name: 'Macrolides', icon: '🦠', description: 'Protein synthesis inhibitors. Excellent for atypicals (Legionella, Mycoplasma).' },
  { id: 'fluoroquinolones', name: 'Quinolones', icon: '⚡', description: 'DNA gyrase inhibitors. Broad spectrum, high oral bioavailability.' },
  { id: 'aminoglycosides', name: 'Aminoglycosides', icon: '🧪', description: 'Potent Gram-negative coverage. Requires careful TDM (Gentamicin, Amikacin).' },
  { id: 'tetracyclines', name: 'Tetracyclines', icon: '🍂', description: 'Bacteriostatic protein inhibitors. Used for acne, atypicals, and zoonoses.' },
  { id: 'glycopeptides', name: 'Glycopeptides', icon: '🧱', description: 'Cell wall inhibitors for resistant Gram-positives (MRSA). Includes Vancomycin.' },
];

export const ANTIBIOGRAM_PATHOGENS: Pathogen[] = [
  { name: 'S. aureus (MSSA)', type: 'GPC', microscopy: 'Gram-positive cocci' },
  { name: 'S. pyogenes (GAS)', type: 'GPC', microscopy: 'Gram-positive cocci' },
  { name: 'S. pneumoniae', type: 'GPC', microscopy: 'Gram-positive cocci' },
  { name: 'Enterococcus faecalis', type: 'GPC', microscopy: 'Gram-positive cocci' },
  { name: 'N. meningitidis', type: 'GNC', microscopy: 'Gram-negative cocci' },
  { name: 'E. coli', type: 'GNB', microscopy: 'Gram-negative bacilli' },
  { name: 'Klebsiella spp.', type: 'GNB', microscopy: 'Gram-negative bacilli' },
  { name: 'P. aeruginosa', type: 'GNB', microscopy: 'Gram-negative bacilli' },
  { name: 'H. influenzae', type: 'GNB', microscopy: 'Gram-negative bacilli' },
  { name: 'Listeria monocytogenes', type: 'GPB', microscopy: 'Gram-positive bacilli' },
  { name: 'Mycoplasma/Legionella', type: 'Atypical', microscopy: 'Atypical' },
  { name: 'Bacteroides fragilis', type: 'Anaerobe', microscopy: 'Gram-negative bacilli (Anaerobe)' },
  { name: 'Treponema pallidum', type: 'Spirochete', microscopy: 'Spirochete' },
];

export const ANTIBIOGRAM_ANTIBIOTICS: Antibiotic[] = [
  { name: 'Amox', short: 'AMX' },
  { name: 'Amox/Clav', short: 'AUG' },
  { name: 'Fluclox', short: 'FLX' },
  { name: 'Cephalex', short: 'LEX' },
  { name: 'Ceftriax', short: 'CRO' },
  { name: 'Pip/Taz', short: 'TZP' },
  { name: 'Cipro', short: 'CIP' },
  { name: 'Doxy', short: 'DOX' },
  { name: 'Metronid', short: 'MTZ' },
];

export const ANTIBIOGRAM_COVERAGE: Record<string, number[]> = {
  'S. aureus (MSSA)': [0, 2, 3, 2, 2, 3, 0, 2, 0],
  'S. pyogenes (GAS)': [3, 3, 3, 3, 3, 3, 0, 2, 0],
  'S. pneumoniae': [3, 3, 0, 1, 3, 3, 0, 2, 0],
  'Enterococcus faecalis': [3, 3, 0, 0, 0, 3, 0, 0, 0],
  'N. meningitidis': [3, 3, 0, 0, 3, 3, 2, 0, 0],
  'E. coli': [1, 2, 0, 2, 3, 3, 3, 1, 0],
  'Klebsiella spp.': [0, 2, 0, 2, 3, 3, 3, 1, 0],
  'P. aeruginosa': [0, 0, 0, 0, 0, 3, 3, 0, 0],
  'H. influenzae': [1, 3, 0, 1, 3, 3, 3, 2, 0],
  'Listeria monocytogenes': [3, 3, 0, 0, 0, 0, 0, 0, 0],
  'Mycoplasma/Legionella': [0, 0, 0, 0, 0, 0, 2, 3, 0],
  'Bacteroides fragilis': [0, 3, 0, 0, 0, 3, 0, 0, 3],
  'Treponema pallidum': [3, 3, 0, 0, 3, 0, 0, 3, 0],
};
