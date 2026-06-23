export interface AcuteManagementItem {
  presentation: string;
  management: string;
  adjuncts: string;
  imaging: string;
  imageUrl?: string;
  localImageUrl?: string;
}

export const ACUTE_MANAGEMENT: AcuteManagementItem[] = [
  {
    presentation: 'Bowel Obstruction',
    management: 'NGT to low suction (decompression), Nil Per Os (NPO), aggressive IV fluid resuscitation.',
    adjuncts: '2 x Large bore IV access (16G/14G), IDC for strict fluid balance, Surgical R/V.',
    imaging: 'AXR/CXR (erect), CT Abdomen/Pelvis with IV contrast (Gold Standard).'
  },
  {
    presentation: 'Acute Sepsis',
    management: 'Sepsis 6: Oxygen, Blood Cultures, IV Antibiotics, IV Fluids, Lactate, Urine Output.',
    adjuncts: 'Early source control, Vasopressors if fluid refractory (ICU R/V).',
    imaging: 'Guided by suspected source (CXR, CT, Ultrasound).'
  },
  {
    presentation: 'Suspected ACS (QLD Health)',
    management: 'Immediate: ABCs, Aspirin 300mg, GTN (sublingual/spray), Morphine (if pain refractory), O2 (if SaO2 < 94%). Risk stratify (High/Inter/Low) based on ECG/Troponin.',
    adjuncts: 'Serial ECGs (0, 1, 3h), Serial High-Sensitivity Troponin, Cardiac Monitoring, DAPT (Clopidogrel/Ticagrelor), Anticoagulation (Heparin/Enoxaparin).',
    imaging: 'CXR (rule out differential), Echocardiogram (if indicated), Coronary Angiogram (for High Risk/STEMI).'
  },
  {
    presentation: 'Acute Pulmonary Oedema',
    management: 'LMNOP: Lasix (Furosemide), Morphine (judiciously), Nitrates (GTN), Oxygen, Positioning (Upright).',
    adjuncts: 'CPAP/BiPAP (NIV), IDC for monitoring output.',
    imaging: 'CXR (Kerley B lines, cardiomegaly), Bedside Echo/POCUS.'
  },
  {
    presentation: 'Surgical Transfer / Review',
    management: 'Stabilize ABCs, analgesia, keep NPO.',
    adjuncts: 'Ensure 2 x large bore IV access, T/F to facility with CT/Surgical R/V if not available locally.',
    imaging: 'Relevant imaging completed and uploaded to PACS prior to transfer.'
  }
];
