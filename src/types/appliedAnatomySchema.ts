import { z } from 'zod';

export const ClinicalCorrelationSchema = z.object({
  scenario: z.string(),
  anatomicalBasis: z.string()
});

export const FormulaSchema = z.object({
  formulaName: z.string(),
  equation: z.string(),
  useCaseExample: z.string(),
  variablesExplanation: z.record(z.string(), z.string()),
  resultInterpretation: z.string()
});

export const EBMDataSchema = z.object({
  sensitivity: z.string().optional(),
  specificity: z.string().optional(),
  positiveLikelihoodRatio: z.string().optional(),
  negativeLikelihoodRatio: z.string().optional(),
  evidenceLevel: z.string().optional()
});

export const SpecialTestSchema = z.object({
  testName: z.string(),
  useCaseExample: z.string(),
  method: z.string(),
  findingsInterpretation: z.object({
    positive: z.string(),
    negative: z.string()
  }),
  clinicalRelevance: z.string(),
  ebmData: EBMDataSchema.optional()
});

export const ConceptSchema = z.object({
  conceptId: z.string(),
  conceptName: z.string(),
  roteData: z.record(z.string(), z.union([FormulaSchema, z.any()])).optional(),
  specialTests: z.array(SpecialTestSchema).optional(),
  firstPrinciplesMechanics: z.any().optional(),
  clinicalAndAnaestheticCorrelations: z.array(ClinicalCorrelationSchema).optional()
});

export const StructureSchema = z.object({
  structureId: z.string(),
  anatomicalName: z.string(),
  surfaceLandmarksAndRelations: z.record(z.string(), z.any()).optional(),
  macroAnatomy: z.any().optional(),
  microAnatomyAndHistology: z.record(z.string(), z.any()).optional(),
  bloodSupply: z.record(z.string(), z.any()).optional(),
  lymphaticDrainage: z.record(z.string(), z.any()).optional(),
  innervation: z.record(z.string(), z.any()).optional(),
  clinicalAndAnaestheticCorrelations: z.array(ClinicalCorrelationSchema).optional()
});

export const AppliedAnatomyModuleSchema = z.object({
  moduleId: z.string(),
  moduleTitle: z.string(),
  tags: z.array(z.string()),
  concepts: z.array(ConceptSchema).optional(),
  structures: z.array(StructureSchema).optional(),
  crossReferenceKeys: z.array(z.string()).optional()
});

export type AppliedAnatomyModule = z.infer<typeof AppliedAnatomyModuleSchema>;
