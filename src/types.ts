
export enum ExamSystem {
  GENERAL = 'General Principles',
  CARDIOVASCULAR = 'Cardiovascular',
  RESPIRATORY = 'Respiratory',
  GASTROINTESTINAL = 'Gastrointestinal',
  GENITOURINARY = 'Genitourinary',
  HAEMATOLOGICAL = 'Haematological',
  RHEUMATOLOGICAL = 'Rheumatological',
  ENDOCRINE = 'Endocrine',
  NEUROLOGICAL = 'Nervous System',
  PAEDIATRIC = 'Paediatric & Neonatal',
  WOMENS_HEALTH = 'Women\'s Health',
  SPECIALTY = 'Specialty Systems',
  MENTAL_HEALTH = 'Mental Health',
  ACUTE_CARE = 'Acute Care'
}

export interface ClinicalFinding {
  description: string;
  imageUrl?: string;
  localImageUrl?: string;
}

export type ImageSize = 'sm' | 'md' | 'lg' | 'full';
export type ImagePosition = 'left' | 'right' | 'top' | 'bottom';

export interface ImageConfig {
  size: ImageSize;
  position: ImagePosition;
}

export interface ExamStep {
  id: string;
  title: string;
  description: string;
  category: string; 
  imageUrl?: string;
  localImageUrl?: string;
  positiveFindings?: ClinicalFinding[];
  negativeFindings?: string[];
  imagePrompt?: string;
  imageConfig?: ImageConfig;
  pathophysiology?: string;
  clinicalPearls?: string[];
    maneuverType?: ManeuverType;
}

export interface DifferentialDiagnosis {
  condition: string;
  explanation?: string;
}

export interface OnePager {
  basics: string;
  normalValues: string[];
  redFlags: string[];
  goldenRules: string;
}

export interface AudioSimulation {
  id: string;
  name: string;
  description: string;
  url: string;
  localUrl?: string;
  type: 'heart' | 'lung' | 'other';
}

export interface GroundingSource {
  title: string;
  uri: string;
}


export interface ClinicalCorrelation { needsCirculationDiagram?: boolean; circulationSide?: string; circulationImageUrl?: string; needsPVLoopDiagram?: boolean; pvLoopImageUrl?: string; needsAnatomyDiagram?: boolean; affectedAnatomy?: string; anatomyImageUrl?: string;
  sign: string;
  pathophysiology: string;
  causes: string[];
  clinicalSignificance: string;
  sources?: GroundingSource[];
  imageUrl?: string;
  imagePrompt?: string;
    retrievedAt?: number;
}

export interface Examination { referenceStandard?: string;
  id: string;
  system: ExamSystem | string;
  name: string;
  shortDescription: string;
  steps: ExamStep[];
  videoUrl?: string;
  headerImageUrl?: string;
  localHeaderImageUrl?: string;
  headerImagePrompt?: string;
  headerImageConfig?: ImageConfig;
  keywords: string[];
  audioSimulations?: AudioSimulation[];
  isDraft?: boolean; 
  sources?: GroundingSource[];
  isDownloaded?: boolean;
  lastUpdated?: number;
  relatedExamIds?: string[];
  onePager?: OnePager;
  differentialDiagnoses?: DifferentialDiagnosis[];
  physiologyBuckets?: any[];
  diagnosticCriteria?: any[];
  workedCases?: any[];
  patternRecognition?: any[];
    visualAids?: VisualAid[];
    redFlags?: any[];
    learningStatus?: any;
}

export type AppView = string;

export interface AntibioticInfo { id?: string; coverage?: any;
 name: string; class: string;
 mechanism?: string; sideEffects?: string[]; [key: string]: any; }
export interface PathogenInfo { id?: string; type?: string;
 name: string;
 commonInfections?: string[]; firstLine?: string[]; [key: string]: any; }
export interface InteractionResult { severity: string; description: string; management?: string; [key: string]: any; }
export interface RadiologyFinding { id: string; name: string; description?: string; keySigns: string[]; clinicalSignificance: string; management: any; [key: string]: any; }
export interface MCQQuestion { id: string; question: string; options: string[]; answer: string; explanation?: string; [key: string]: any; }
export interface StudyProgress { topic: string; questionsAttempted: number; correctAnswers: number; lastStudiedAt: number; masteryLevel: number; score?: number; completed?: number; [key: string]: any; }
export interface ExamSession { id: string; startTime: number; endTime?: number; isCompleted?: boolean; questions: MCQQuestion[]; userAnswers?: any; score?: number; [key: string]: any; }
export interface TherapeuticGuidance { id?: string; condition: string; summary: string; firstLine: string[]; secondLine: string[]; tnqSpecifics: string; monitoring: string[]; sources: GroundingSource[]; retrievedAt?: number; referenceUrl?: string; [key: string]: any; }
export interface GlossaryEntry { id?: string;
 term: string; definition: string; category?: string; relatedTerms?: string[]; [key: string]: any; }
export interface DrugInfo { id: string; name: string; class?: string; indications?: string[]; sideEffects?: string[]; [key: string]: any; }
export interface DrugMapping { id?: string;
 [key: string]: any; }
export interface DosageInfo { route: string; dose: string; frequency?: string; maxDose?: string; [key: string]: any; }
export enum LearningStatus { LEARNED = 'learned', IN_PROGRESS = 'in_progress', TO_REVIEW = 'to_review' }


export interface DownloadTask { [key: string]: any; }
export type DownloadTaskStatus = any;
export interface DiagnosisSuggestion { [key: string]: any; }
export interface ClinicalCondition { [key: string]: any; }
export interface ConditionInvestigation { [key: string]: any; }
export interface DifferentialSynthesis { [key: string]: any; }
export interface PatientContext { [key: string]: any; }
export interface InvestigationDetail { [key: string]: any; }
export interface ECGPattern { [key: string]: any; }
export type AppTheme = any;
export interface ClarifyingQuestion { [key: string]: any; }
export interface ClarifyingResponse { [key: string]: any; }
export interface AnaesthesiaDrug { [key: string]: any; }
export type VisualAid = any;
export type DifferentialItem = any;
export type ManeuverType = string;
