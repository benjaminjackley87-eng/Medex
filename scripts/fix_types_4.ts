import { Project, SyntaxKind } from 'ts-morph';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
const typesFile = project.getSourceFile('src/types.ts');

if (typesFile) {
  // Add missing types safely
  const missingTypesStr = `
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
export type ExamSystem = string;
`;

  // Clean up duplicate ids or bad regex replace results
  // Instead of manual clean, we just add missing properties directly to the AST.

  const clincCorr = typesFile.getInterface('ClinicalCorrelation');
  if (clincCorr) {
    if (!clincCorr.getProperty('needsCirculationDiagram'))
      clincCorr.addProperty({
        name: 'needsCirculationDiagram',
        type: 'boolean',
        hasQuestionToken: true
      });
    if (!clincCorr.getProperty('circulationSide'))
      clincCorr.addProperty({ name: 'circulationSide', type: 'string', hasQuestionToken: true });
    if (!clincCorr.getProperty('circulationImageUrl'))
      clincCorr.addProperty({
        name: 'circulationImageUrl',
        type: 'string',
        hasQuestionToken: true
      });
    if (!clincCorr.getProperty('needsPVLoopDiagram'))
      clincCorr.addProperty({
        name: 'needsPVLoopDiagram',
        type: 'boolean',
        hasQuestionToken: true
      });
    if (!clincCorr.getProperty('pvLoopImageUrl'))
      clincCorr.addProperty({ name: 'pvLoopImageUrl', type: 'string', hasQuestionToken: true });
    if (!clincCorr.getProperty('needsAnatomyDiagram'))
      clincCorr.addProperty({
        name: 'needsAnatomyDiagram',
        type: 'boolean',
        hasQuestionToken: true
      });
    if (!clincCorr.getProperty('affectedAnatomy'))
      clincCorr.addProperty({ name: 'affectedAnatomy', type: 'string', hasQuestionToken: true });
    if (!clincCorr.getProperty('anatomyImageUrl'))
      clincCorr.addProperty({ name: 'anatomyImageUrl', type: 'string', hasQuestionToken: true });
    if (!clincCorr.getProperty('retrievedAt'))
      clincCorr.addProperty({ name: 'retrievedAt', type: 'number', hasQuestionToken: true });
  }

  const examination = typesFile.getInterface('Examination');
  if (examination) {
    if (!examination.getProperty('referenceStandard'))
      examination.addProperty({
        name: 'referenceStandard',
        type: 'string',
        hasQuestionToken: true
      });
    if (!examination.getProperty('visualAids'))
      examination.addProperty({ name: 'visualAids', type: 'VisualAid[]', hasQuestionToken: true });
    if (!examination.getProperty('redFlags'))
      examination.addProperty({ name: 'redFlags', type: 'any[]', hasQuestionToken: true });
    if (!examination.getProperty('learningStatus'))
      examination.addProperty({ name: 'learningStatus', type: 'any', hasQuestionToken: true });
  }

  const examStep = typesFile.getInterface('ExamStep');
  if (examStep) {
    if (!examStep.getProperty('maneuverType'))
      examStep.addProperty({ name: 'maneuverType', type: 'ManeuverType', hasQuestionToken: true });
  }

  const abx = typesFile.getInterface('AntibioticInfo');
  if (abx) {
    if (!abx.getProperty('id'))
      abx.addProperty({ name: 'id', type: 'string', hasQuestionToken: true });
    if (!abx.getProperty('coverage'))
      abx.addProperty({ name: 'coverage', type: 'any', hasQuestionToken: true });
  }

  const patho = typesFile.getInterface('PathogenInfo');
  if (patho) {
    if (!patho.getProperty('id'))
      patho.addProperty({ name: 'id', type: 'string', hasQuestionToken: true });
    if (!patho.getProperty('type'))
      patho.addProperty({ name: 'type', type: 'string', hasQuestionToken: true });
  }

  const drugMap = typesFile.getInterface('DrugMapping');
  if (drugMap) {
    if (!drugMap.getProperty('id'))
      drugMap.addProperty({ name: 'id', type: 'string', hasQuestionToken: true });
  }

  const glossary = typesFile.getInterface('GlossaryEntry');
  if (glossary) {
    if (!glossary.getProperty('id'))
      glossary.addProperty({ name: 'id', type: 'string', hasQuestionToken: true });
  }

  typesFile.addStatements(missingTypesStr);

  // Fix duplicates that were introduced by string replace.
  // We'll iterate all interfaces, remove duplicate properties by name.
  typesFile.getInterfaces().forEach((iface) => {
    const props = iface.getProperties();
    const seen = new Set<string>();
    props.forEach((p) => {
      const name = p.getName();
      if (seen.has(name)) {
        p.remove();
      } else {
        seen.add(name);
      }
    });
  });

  project.saveSync();
  console.log('Fixed AST and saved!');
}
