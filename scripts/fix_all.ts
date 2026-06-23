import fs from 'fs';
import path from 'path';

// 1. Fix absolute paths in App.tsx
const appPath = 'src/App.tsx';
let appContent = fs.readFileSync(appPath, 'utf-8');
appContent = appContent.replace(/F:\/Repositories\/Medex\/src\//g, './');
fs.writeFileSync(appPath, appContent);
console.log('Fixed absolute paths in App.tsx');

// 2. Add missing default exports in pages
const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const baseName = path.basename(file, '.tsx');
  
  if (!content.includes(`export default ${baseName}`)) {
    content += `\nexport default ${baseName};\n`;
    fs.writeFileSync(filePath, content);
    console.log(`Added export default to ${file}`);
  }
}

// 3. Fix types.ts
const typesPath = 'src/types.ts';
let typesContent = fs.readFileSync(typesPath, 'utf-8');
// remove the sections added by my scripts
const splitIndex = typesContent.indexOf('// ADDED DURING FSD REFACTOR FIXES');
if (splitIndex !== -1) {
    typesContent = typesContent.substring(0, splitIndex);
}
// remove the other section added by AST script
const splitIndex2 = typesContent.indexOf('export interface DownloadTask { [key: string]: any; }');
if (splitIndex2 !== -1) {
    typesContent = typesContent.substring(0, splitIndex2);
}

const cleanAppends = `
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
typesContent += cleanAppends;
fs.writeFileSync(typesPath, typesContent);
console.log('Cleaned types.ts');
