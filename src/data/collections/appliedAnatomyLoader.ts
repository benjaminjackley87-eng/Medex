/**
 * Dynamically imports all Layer 1 and Layer 2 JSON modules under data/applied_anatomy
 * using Vite's compile-time eager glob import.
 */

export interface Formula {
  formulaName: string;
  equation: string;
  useCaseExample: string;
  variablesExplanation: Record<string, string>;
  resultInterpretation: string;
}

export interface SpecialTest {
  testName: string;
  useCaseExample: string;
  method: string;
  findingsInterpretation: {
    positive: string;
    negative: string;
  };
  clinicalRelevance: string;
}

export interface AppliedAnatomyModule {
  moduleId: string;
  moduleTitle: string;
  tags: string[];
  concepts?: Array<{
    conceptId: string;
    conceptName: string;
    roteData?: Record<string, any>;
    specialTests?: SpecialTest[];
    firstPrinciplesMechanics?: Record<string, string> | string;
    clinicalAndAnaestheticCorrelations?: Array<{
      scenario: string;
      anatomicalBasis: string;
    }>;
  }>;
  structures?: Array<{
    structureId: string;
    anatomicalName: string;
    surfaceLandmarksAndRelations?: Record<string, string>;
    macroAnatomy?: {
      description: string;
    };
    microAnatomyAndHistology?: Record<string, string>;
    bloodSupply?: Record<string, string>;
    lymphaticDrainage?: Record<string, string>;
    innervation?: Record<string, string>;
    clinicalAndAnaestheticCorrelations?: Array<{
      scenario: string;
      anatomicalBasis: string;
    }>;
  }>;
  crossReferenceKeys?: string[];
}

export function loadAllAppliedAnatomyModules(): AppliedAnatomyModule[] {
  // Vite-specific compile-time glob import
  const modules = import.meta.glob<AppliedAnatomyModule>('../applied_anatomy/*.json', { eager: true });
  
  return (Object.values(modules) as unknown[]).map((mod) => {
    const m = mod as { default?: AppliedAnatomyModule } & AppliedAnatomyModule;
    return m.default ? m.default : m;
  });
}
