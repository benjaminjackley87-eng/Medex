import { loadAllAppliedAnatomyModules, AppliedAnatomyModule } from '../data/collections/appliedAnatomyLoader';

export interface SearchDocument {
  id: string;
  moduleId: string;
  moduleTitle: string;
  type: 'module' | 'concept' | 'structure' | 'correlation';
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
}

export interface PaginatedResults {
  results: SearchResult[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

class LocalSearchService {
  private documents: SearchDocument[] = [];
  private isIndexed = false;

  constructor() {
    // Lazy build the index when the first search is requested
  }

  public ensureIndexed() {
    if (this.isIndexed) return;

    try {
      const modules = loadAllAppliedAnatomyModules();
      const docs: SearchDocument[] = [];

      modules.forEach((mod) => {
        // 1. Index the module itself
        docs.push({
          id: `module_${mod.moduleId}`,
          moduleId: mod.moduleId,
          moduleTitle: mod.moduleTitle,
          type: 'module',
          title: mod.moduleTitle,
          subtitle: 'Foundational Sciences Module',
          content: `${mod.moduleTitle} ${mod.tags.join(' ')}`,
          tags: mod.tags
        });

        // 2. Index Concepts (Layer 2)
        if (mod.concepts) {
          mod.concepts.forEach((concept) => {
            const roteDataStr = concept.roteData
              ? JSON.stringify(concept.roteData).replace(/["{}]/g, ' ')
              : '';
            const mechanicsStr =
              typeof concept.firstPrinciplesMechanics === 'string'
                ? concept.firstPrinciplesMechanics
                : JSON.stringify(concept.firstPrinciplesMechanics || '').replace(/["{}]/g, ' ');

            docs.push({
              id: `concept_${concept.conceptId}`,
              moduleId: mod.moduleId,
              moduleTitle: mod.moduleTitle,
              type: 'concept',
              title: concept.conceptName,
              subtitle: `${mod.moduleTitle} • Concept`,
              content: `${concept.conceptName} ${roteDataStr} ${mechanicsStr}`,
              tags: mod.tags
            });

            // Index individual correlations within concepts
            if (concept.clinicalAndAnaestheticCorrelations) {
              concept.clinicalAndAnaestheticCorrelations.forEach((corr, index) => {
                docs.push({
                  id: `corr_concept_${concept.conceptId}_${index}`,
                  moduleId: mod.moduleId,
                  moduleTitle: mod.moduleTitle,
                  type: 'correlation',
                  title: corr.scenario,
                  subtitle: `${concept.conceptName} • Clinical Correlation`,
                  content: `${corr.scenario} ${corr.anatomicalBasis}`,
                  tags: [...mod.tags, 'correlation', 'clinical']
                });
              });
            }
          });
        }

        // 3. Index Structures (Layer 1)
        if (mod.structures) {
          mod.structures.forEach((struc) => {
            const landmarks = struc.surfaceLandmarksAndRelations
              ? Object.values(struc.surfaceLandmarksAndRelations).join(' ')
              : '';
            const macro = struc.macroAnatomy?.description || '';
            const micro = struc.microAnatomyAndHistology
              ? Object.values(struc.microAnatomyAndHistology).join(' ')
              : '';
            const blood = struc.bloodSupply ? Object.values(struc.bloodSupply).join(' ') : '';
            const lymph = struc.lymphaticDrainage
              ? Object.values(struc.lymphaticDrainage).join(' ')
              : '';
            const innervation = struc.innervation ? Object.values(struc.innervation).join(' ') : '';

            docs.push({
              id: `structure_${struc.structureId}`,
              moduleId: mod.moduleId,
              moduleTitle: mod.moduleTitle,
              type: 'structure',
              title: struc.anatomicalName,
              subtitle: `${mod.moduleTitle} • Anatomy`,
              content: `${struc.anatomicalName} ${landmarks} ${macro} ${micro} ${blood} ${lymph} ${innervation}`,
              tags: mod.tags
            });

            // Index individual correlations within structures
            if (struc.clinicalAndAnaestheticCorrelations) {
              struc.clinicalAndAnaestheticCorrelations.forEach((corr, index) => {
                docs.push({
                  id: `corr_structure_${struc.structureId}_${index}`,
                  moduleId: mod.moduleId,
                  moduleTitle: mod.moduleTitle,
                  type: 'correlation',
                  title: corr.scenario,
                  subtitle: `${struc.anatomicalName} • Clinical Correlation`,
                  content: `${corr.scenario} ${corr.anatomicalBasis}`,
                  tags: [...mod.tags, 'correlation', 'clinical']
                });
              });
            }
          });
        }
      });

      this.documents = docs;
      this.isIndexed = true;
    } catch (e) {
      console.error('Failed to build search index:', e);
    }
  }

  /**
   * Helper to normalize strings for search (lowercase, alphanumeric only).
   * E.g. "Acetyl-CoA" -> "acetylcoa", "AcetylCoa" -> "acetylcoa"
   */
  private normalizeString(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  /**
   * Performs local keyword/fuzzy prefix matching over the index.
   */
  public search(query: string, page: number = 1, pageSize: number = 5): PaginatedResults {
    this.ensureIndexed();

    if (!query || !query.trim()) {
      return {
        results: [],
        totalResults: 0,
        totalPages: 0,
        currentPage: page,
        hasMore: false
      };
    }

    const rawTerms = query.split(/\s+/).filter(Boolean);
    const normalizedTerms = rawTerms.map((term) => this.normalizeString(term)).filter(Boolean);

    if (normalizedTerms.length === 0) {
      return {
        results: [],
        totalResults: 0,
        totalPages: 0,
        currentPage: page,
        hasMore: false
      };
    }

    const matches: SearchResult[] = [];

    this.documents.forEach((doc) => {
      let score = 0;
      let allTermsMatched = true;

      const normTitle = this.normalizeString(doc.title);
      const normSubtitle = this.normalizeString(doc.subtitle);
      const normContent = this.normalizeString(doc.content);
      const normTags = doc.tags.map((t) => this.normalizeString(t));

      for (const term of normalizedTerms) {
        let termMatched = false;

        // 1. Check title matches
        if (normTitle.includes(term)) {
          score += 15;
          if (normTitle.startsWith(term)) score += 10; // Extra points for prefix
          termMatched = true;
        }

        // 2. Check tags matches
        if (normTags.some((tag) => tag.includes(term))) {
          score += 8;
          termMatched = true;
        }

        // 3. Check subtitle matches
        if (normSubtitle.includes(term)) {
          score += 5;
          termMatched = true;
        }

        // 4. Check content matches
        if (normContent.includes(term)) {
          const occurrences = normContent.split(term).length - 1;
          score += 1 * Math.min(occurrences, 5); // Cap term frequency weight to avoid spam
          termMatched = true;
        }

        if (!termMatched) {
          allTermsMatched = false;
          break; // Must match all terms in AND search
        }
      }

      if (allTermsMatched && score > 0) {
        matches.push({
          document: doc,
          score
        });
      }
    });

    // Sort by descending score
    matches.sort((a, b) => b.score - a.score);

    // Paginate results
    const totalResults = matches.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedMatches = matches.slice(startIndex, startIndex + pageSize);

    return {
      results: paginatedMatches,
      totalResults,
      totalPages,
      currentPage: page,
      hasMore: page < totalPages
    };
  }
}

export const localSearchService = new LocalSearchService();
