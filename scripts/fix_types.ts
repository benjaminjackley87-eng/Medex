import fs from 'fs';

const missingTypes = `
// ADDED DURING FSD REFACTOR FIXES
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
`;

fs.appendFileSync('src/types.ts', missingTypes);
console.log('Appended missing types to src/types.ts');
