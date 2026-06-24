/**
 * bm25SearchService.ts
 *
 * Pure BM25 (Okapi BM25) implementation over local MedEx clinical data.
 * Used to power offline-first search across all major clinical domains:
 *   - Examinations (ALL_EXAMINATIONS static dataset)
 *   - Knowledge Graph nodes (graph_index.json)
 *   - Cached IndexedDB entries (ECG patterns, radiology findings,
 *     therapeutic protocols, clinical correlations, antibiotics, pathogens,
 *     anaesthesia drugs)
 *
 * Scoring threshold: a BM25 score of ≥ 2.0 is considered a "confident match"
 * and will short-circuit the Gemini API call.
 */

import { ALL_EXAMINATIONS } from '../data';
import { graphQueryEngine } from './graphQueryEngine';
import { storage } from './storageService';
import type {
  Examination,
  ECGPattern,
  RadiologyFinding,
  TherapeuticGuidance,
  ClinicalCorrelation,
  AntibioticInfo,
  PathogenInfo,
  AnaesthesiaDrug,
  ClinicalCondition
} from '../types';

// ─── BM25 Tunables ────────────────────────────────────────────────────────────
const BM25_K1 = 1.5; // Term saturation parameter
const BM25_B = 0.75; // Length normalisation parameter
/** Minimum BM25 score a local result must achieve to bypass the API. */
export const BM25_THRESHOLD = 2.0;

// ─── Generic document structure ───────────────────────────────────────────────
interface BM25Doc<T> {
  id: string;
  /** Concatenated searchable text (name + keywords + description etc.) */
  corpus: string;
  payload: T;
}

// ─── Tokenisation ─────────────────────────────────────────────────────────────
/** Simple whitespace + punctuation tokeniser, lowercased. */
function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

// ─── Core BM25 scorer ─────────────────────────────────────────────────────────
function buildBM25Index<T>(docs: BM25Doc<T>[]) {
  // Compute term frequency for each document
  const tf: Map<string, Map<string, number>> = new Map(); // docId -> term -> count
  const df: Map<string, number> = new Map(); // term -> #docs containing term
  const docLengths: Map<string, number> = new Map();

  for (const doc of docs) {
    const tokens = tokenise(doc.corpus);
    docLengths.set(doc.id, tokens.length);
    const termCounts = new Map<string, number>();
    for (const t of tokens) {
      termCounts.set(t, (termCounts.get(t) ?? 0) + 1);
    }
    tf.set(doc.id, termCounts);
    for (const t of termCounts.keys()) {
      df.set(t, (df.get(t) ?? 0) + 1);
    }
  }

  const N = docs.length;
  const avgdl = Array.from(docLengths.values()).reduce((a, b) => a + b, 0) / (N || 1);

  return function score(docId: string, queryTerms: string[]): number {
    const termCounts = tf.get(docId);
    if (!termCounts) return 0;
    const dl = docLengths.get(docId) ?? 0;

    let total = 0;
    for (const term of queryTerms) {
      const freq = termCounts.get(term) ?? 0;
      if (freq === 0) continue;
      const dfVal = df.get(term) ?? 0;
      const idf = Math.log((N - dfVal + 0.5) / (dfVal + 0.5) + 1);
      const tfNorm =
        (freq * (BM25_K1 + 1)) / (freq + BM25_K1 * (1 - BM25_B + BM25_B * (dl / avgdl)));
      total += idf * tfNorm;
    }
    return total;
  };
}

/** Run a BM25 search over a collection and return sorted hits. */
function bm25Search<T>(
  query: string,
  docs: BM25Doc<T>[],
  topK = 1
): Array<{ score: number; payload: T }> {
  if (!query.trim() || docs.length === 0) return [];
  const queryTerms = tokenise(query);
  if (queryTerms.length === 0) return [];

  const scoreFn = buildBM25Index(docs);
  const scored = docs.map((doc) => ({ score: scoreFn(doc.id, queryTerms), payload: doc.payload }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).filter((h) => h.score > 0);
}

// ─── Domain-specific search functions ─────────────────────────────────────────

/**
 * Search ALL_EXAMINATIONS by condition/exam name and return the best matching
 * Examination mapped as a ClinicalCondition (physical findings per step).
 */
export function searchExaminationAsCondition(query: string): ClinicalCondition | null {
  const docs: BM25Doc<Examination>[] = ALL_EXAMINATIONS.map((exam) => ({
    id: exam.id,
    corpus: [
      exam.name,
      exam.shortDescription,
      ...(exam.keywords ?? []),
      ...(exam.steps?.map((s) => `${s.title} ${s.description}`) ?? []),
      ...(exam.differentialDiagnoses?.map((d) => d.condition) ?? [])
    ].join(' '),
    payload: exam
  }));

  const hits = bm25Search(query, docs);
  if (!hits.length || hits[0].score < BM25_THRESHOLD) return null;

  const exam = hits[0].payload;

  // Map ExamSteps → ClinicalCondition findings
  const findings: ClinicalCondition['findings'] = exam.steps.flatMap((step) => {
    const base = {
      category: step.category || 'General',
      sign: step.title,
      significance: step.description
    };
    const positive = (step.positiveFindings ?? []).map((pf) => ({
      category: step.category || 'Positive Findings',
      sign: pf.description,
      significance: step.title
    }));
    return [base, ...positive];
  });

  return {
    name: exam.name,
    description: exam.shortDescription,
    findings
  };
}

/**
 * Search cached ECG patterns in IndexedDB by pattern name.
 */
export async function searchECGPattern(query: string): Promise<ECGPattern | null> {
  try {
    const patterns = await storage.getAllECGPatterns();
    if (!patterns.length) return null;

    const docs: BM25Doc<ECGPattern>[] = patterns.map((p) => ({
      id: p.id ?? p.name,
      corpus: [
        p.name,
        p.category,
        p.description,
        ...(p.criteria ?? []),
        p.clinicalSignificance
      ].join(' '),
      payload: p
    }));

    const hits = bm25Search(query, docs);
    if (!hits.length || hits[0].score < BM25_THRESHOLD) return null;
    return hits[0].payload;
  } catch {
    return null;
  }
}

/**
 * Search cached Radiology findings in IndexedDB.
 */
export async function searchRadiologyFinding(query: string): Promise<RadiologyFinding | null> {
  try {
    const findings = await storage.getAllRadiologyFindings();
    if (!findings.length) return null;

    const docs: BM25Doc<RadiologyFinding>[] = findings.map((f) => ({
      id: f.id,
      corpus: [
        f.name,
        f.modality,
        f.category,
        f.description ?? '',
        ...(f.keySigns ?? []),
        f.clinicalSignificance
      ].join(' '),
      payload: f
    }));

    const hits = bm25Search(query, docs);
    if (!hits.length || hits[0].score < BM25_THRESHOLD) return null;
    return hits[0].payload;
  } catch {
    return null;
  }
}

/**
 * Search cached Therapeutic Guidance protocols in IndexedDB.
 */
export async function searchTherapeuticGuidance(
  query: string
): Promise<TherapeuticGuidance | null> {
  try {
    // getProtocol uses exact key; we need to scan all protocols
    // We reuse getAllRadiologyFindings-style pattern via direct IDB scan.
    // For now, do an exact-then-fuzzy key lookup using getProtocol + adjacent terms.
    const direct = await storage.getProtocol(query);
    if (direct) return direct;

    // Fallback: search graph nodes for condition name then check storage
    const graphNodes = graphQueryEngine.searchNodes(query);
    for (const node of graphNodes.slice(0, 3)) {
      const candidate = await storage.getProtocol(node.name);
      if (candidate) return candidate;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Search cached Clinical Correlations in IndexedDB.
 */
export async function searchClinicalCorrelation(
  query: string
): Promise<ClinicalCorrelation | null> {
  try {
    const direct = await storage.getCorrelation(query);
    if (direct) return direct;
    return null;
  } catch {
    return null;
  }
}

/**
 * Search cached Antibiotic information in IndexedDB.
 */
export async function searchAntibiotic(query: string): Promise<AntibioticInfo | null> {
  try {
    const direct = await storage.getAntibiotic(query);
    if (direct) return direct;

    // Normalised lookup (e.g. "Augmentin" → "amoxicillin-clavulanate")
    const normQuery = query.toLowerCase().trim();
    const aliases: Record<string, string> = {
      augmentin: 'amoxicillin-clavulanate',
      timentin: 'ticarcillin-clavulanate',
      zithromax: 'azithromycin',
      flagyl: 'metronidazole',
      bactrim: 'trimethoprim-sulfamethoxazole'
    };
    if (aliases[normQuery]) {
      const aliased = await storage.getAntibiotic(aliases[normQuery]);
      if (aliased) return aliased;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Search cached Pathogen information in IndexedDB.
 */
export async function searchPathogen(query: string): Promise<PathogenInfo | null> {
  try {
    const direct = await storage.getPathogen(query);
    if (direct) return direct;
    return null;
  } catch {
    return null;
  }
}

/**
 * Search cached Anaesthesia drugs in IndexedDB.
 */
export async function searchAnaesthesiaDrug(query: string): Promise<AnaesthesiaDrug | null> {
  try {
    const direct = await storage.getAnaesthesiaDrug(query);
    if (direct) return direct;

    // BM25 over all cached drugs
    const drugs = await storage.getAnaesthesiaDrugs();
    if (!drugs.length) return null;

    const docs: BM25Doc<AnaesthesiaDrug>[] = drugs.map((d) => ({
      id: d.name,
      corpus: [d.name, d.class, ...(d.indications ?? []), d.mechanism, ...(d.pearls ?? [])].join(
        ' '
      ),
      payload: d
    }));

    const hits = bm25Search(query, docs);
    if (!hits.length || hits[0].score < BM25_THRESHOLD) return null;
    return hits[0].payload;
  } catch {
    return null;
  }
}

/**
 * Search ALL_EXAMINATIONS using BM25 for a condition/sign name and return
 * the top matching examination's name (useful for correlation lookups).
 */
export function searchExaminationName(query: string): Examination | null {
  const docs: BM25Doc<Examination>[] = ALL_EXAMINATIONS.map((exam) => ({
    id: exam.id,
    corpus: [exam.name, exam.shortDescription, ...(exam.keywords ?? [])].join(' '),
    payload: exam
  }));

  const hits = bm25Search(query, docs);
  if (!hits.length || hits[0].score < BM25_THRESHOLD) return null;
  return hits[0].payload;
}
