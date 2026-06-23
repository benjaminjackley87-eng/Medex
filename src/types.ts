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
  WOMENS_HEALTH = "Women's Health",
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

export interface PathophysiologyInfo {
  finding: string;
  mechanism: string;
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
  pathophysiology?: PathophysiologyInfo[];
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

export interface ClinicalCorrelation {
  needsCirculationDiagram?: boolean;
  circulationSide?: string;
  circulationImageUrl?: string;
  needsPVLoopDiagram?: boolean;
  pvLoopImageUrl?: string;
  needsAnatomyDiagram?: boolean;
  affectedAnatomy?: string;
  anatomyImageUrl?: string;
  sign: string;
  pathophysiology: string;
  causes: string[];
  clinicalSignificance: string;
  sources?: GroundingSource[];
  imageUrl?: string;
  imagePrompt?: string;
  retrievedAt?: number;
}

export interface PhysiologyBucketItem {
  label: string;
  description: string;
}

export interface PhysiologyBucket {
  title: string;
  color?: string;
  content: PhysiologyBucketItem[];
}

export interface DiagnosticCriterion {
  condition: string;
  criteria: string[];
}

export interface WorkedCase {
  title: string;
  description: string;
  analysis: string;
}

export interface PatternRecognitionItem {
  title: string;
  description: string;
  color?: string;
}

export interface Examination {
  referenceStandard?: string;
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
  physiologyBuckets?: PhysiologyBucket[];
  diagnosticCriteria?: DiagnosticCriterion[];
  workedCases?: WorkedCase[];
  patternRecognition?: PatternRecognitionItem[];
  visualAids?: VisualAid[];
  redFlags?: string[];
  learningStatus?: LearningStatus;
}

export type AppView = string;

export interface AntibioticInfo {
  id?: string;
  name: string;
  class: string;
  mechanism?: string;
  sideEffects?: string[];
  spectrum?: string;
  gramPositiveCoverage?: string;
  gramNegativeCoverage?: string;
  atypicalCoverage?: string;
  anaerobicCoverage?: string;
  commonIndications?: string[];
  stewardshipNote?: string;
  retrievedAt?: number;
}

export interface PathogenInfo {
  id?: string;
  type?: string;
  name: string;
  classification?: string;
  characteristics?: string;
  commonInfections?: string[];
  typicalAntibiotics?: string[];
  relatedOrganisms?: string[];
  firstLine?: string[];
  retrievedAt?: number;
}

export interface DrugInteraction {
  severity: 'high' | 'moderate' | 'low' | string;
  drugs: string[];
  description: string;
  mechanism: string;
  management: string;
}

export interface DrugSynergism {
  drugs: string[];
  description: string;
}

export interface DrugContraindication {
  drugs: string[];
  reason: string;
}

export interface InteractionResult {
  medications: string[];
  summary: string;
  interactions: DrugInteraction[];
  synergisms: DrugSynergism[];
  contraindications: DrugContraindication[];
}

export interface RadiologyFinding {
  id: string;
  name: string;
  modality: 'CXR' | 'AXR' | 'CT' | 'MRI' | 'US' | string;
  category: 'Chest' | 'Abdomen' | 'Neuro' | 'MSK' | 'Other' | string;
  description?: string;
  keySigns: string[];
  clinicalSignificance: string;
  management: string[];
  imageUrl?: string;
  localImageUrl?: string;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
}

export interface StudyProgress {
  topic: string;
  questionsAttempted: number;
  correctAnswers: number;
  lastStudiedAt: number;
  masteryLevel: number;
  score?: number;
  completed?: number;
}

export interface ExamSession {
  id: string;
  startTime: number;
  endTime?: number;
  isCompleted?: boolean;
  questions: MCQQuestion[];
  userAnswers: number[];
  score: number;
}

export interface TherapeuticGuidance {
  id?: string;
  condition: string;
  summary: string;
  firstLine: string[];
  secondLine: string[];
  tnqSpecifics: string;
  monitoring: string[];
  sources: GroundingSource[];
  retrievedAt?: number;
  referenceUrl?: string;
}

export interface GlossaryEntry {
  id?: string;
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
}

export interface DosageInfo {
  route: string;
  dose?: string;
  frequency?: string;
  maxDose?: string;
  indication?: string;
  adultDose?: string;
  paediatricDose?: string;
  notes?: string;
}

export interface DrugInfo {
  id: string;
  name: string;
  tradeNames?: string[];
  therapeuticClass?: string;
  pharmacokinetics?: string;
  pharmacodynamics?: string;
  mechanismOfAction?: string;
  indications?: string[];
  contraindications?: string[];
  adverseEffects?: string[];
  dosages?: DosageInfo[];
  paediatricDosages?: string;
  retrievedAt?: number;
}

export interface DrugMapping {
  condition_id: string;
  drug_id: string;
  drug_name: string;
  therapeutic_class?: string;
  line_of_treatment: '1st line' | '2nd line' | 'Alternative' | string;
  note?: string;
}

export enum LearningStatus {
  LEARNED = 'learned',
  IN_PROGRESS = 'in_progress',
  TO_REVIEW = 'to_review'
}

export type DownloadTaskStatus = 'pending' | 'downloading' | 'completed' | 'failed' | 'paused';

export interface DownloadTask {
  id: string;
  examId: string;
  examName: string;
  type: 'deep_sync' | 'light_sync';
  status: DownloadTaskStatus;
  progress: number;
  retryCount: number;
  createdAt: number;
  error?: string;
}

export interface DiagnosisSuggestion {
  condition: string;
  likelihood?: string;
  probability?: string;
  reasoning: string;
  keyFindings?: string[];
}

export interface ClinicalCondition {
  name: string;
  description: string;
  findings: {
    category: string;
    sign: string;
    significance: string;
    link?: string;
  }[];
}

export interface ConditionInvestigation {
  condition: string;
  reasoning: string;
  firstLine: string[];
  goldStandard: string[];
  monitoring: string[];
}

export interface DifferentialItem {
  condition: string;
  likelihood: string;
  isCritical?: boolean;
  reasoning: string;
  supportingFindings: string[];
  conflictingFindings: string[];
  differentiationQuestions: string[];
  investigations: string[];
  scientificReference?: string;
}

export interface DifferentialSynthesis {
  summary: string;
  tnqContext: string;
  differentials: DifferentialItem[];
  retrievedAt?: number;
}

export interface PatientContext {
  age?: string;
  height?: string;
  weight?: string;
  ethnicity?: string;
  pmhx?: string;
  smoker?: boolean;
  alcohol?: string;
  otherDrugs?: string;
  recentPresentations?: string;
}

export interface InvestigationDetail {
  testName: string;
  technique: string;
  findings: string;
  interpretation: string;
  clinicalContext?: string;
}

export interface ECGPattern {
  id?: string;
  name: string;
  category: string;
  description: string;
  criteria: string[];
  clinicalSignificance: string;
  management: string[];
  imageUrl?: string;
  localImageUrl?: string;
}

export interface AppTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string;
  fontSans: string;
  glassEffect: 'none' | 'low' | 'medium' | 'high' | string;
}

export interface ClarifyingQuestion {
  id: string;
  question: string;
  type: 'boolean' | 'text' | 'choice' | string;
  options?: string[];
  rationale?: string;
}

export interface ClarifyingResponse {
  questionId: string;
  response: string;
}

export interface AnaesthesiaDrug {
  name: string;
  class: string;
  indications: string[];
  dose: string;
  mechanism: string;
  sideEffects: string[];
  contraindications: string[];
  pearls: string[];
  category?: string;
}

export interface VisualAid {
  type: 'diagram' | 'video';
  description: string;
  source?: string;
}

export type DifferentialItemType = DifferentialItem;

export type ManeuverType = string;
