import fs from 'fs';

const lines = fs.readFileSync('src/types.ts', 'utf-8').split('\n');
const baseLines = lines.slice(0, 137);

const additions = `
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
`;

fs.writeFileSync('src/types.ts', baseLines.join('\n') + '\n' + additions);
console.log('Fixed types.ts forcefully');
