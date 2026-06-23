import fs from 'fs';

let typesContent = fs.readFileSync('src/types.ts', 'utf-8');

typesContent = typesContent.replace(
  /export interface ClinicalCorrelation \{/g,
  'export interface ClinicalCorrelation { needsCirculationDiagram?: boolean; circulationSide?: string; circulationImageUrl?: string; needsPVLoopDiagram?: boolean; pvLoopImageUrl?: string; needsAnatomyDiagram?: boolean; affectedAnatomy?: string; anatomyImageUrl?: string;'
);

typesContent = typesContent.replace(
  /export interface Examination \{/g,
  'export interface Examination { referenceStandard?: string;'
);

typesContent = typesContent.replace(
  /export interface AntibioticInfo \{/g,
  'export interface AntibioticInfo { id?: string; coverage?: any;'
);

typesContent = typesContent.replace(
  /export interface PathogenInfo \{/g,
  'export interface PathogenInfo { id?: string; type?: string;'
);

typesContent = typesContent.replace(
  /export interface DrugMapping \{/g,
  'export interface DrugMapping { id?: string;'
);

// We'll also just add an id to GlossaryEntry if it exists
typesContent = typesContent.replace(
  /export interface GlossaryEntry \{/g,
  'export interface GlossaryEntry { id?: string;'
);

fs.writeFileSync('src/types.ts', typesContent);
console.log('Fixed interface definitions in src/types.ts');
