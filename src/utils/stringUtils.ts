export function levenshteinDistance(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export function getClosestMatch(query: string, candidates: string[]): string | null {
  if (!query || query.length < 3 || candidates.length === 0) return null;

  const lowerQuery = query.toLowerCase();
  let bestMatch = null;
  let minDistance = Infinity;

  // Max allowed distance grows with word length
  const maxAllowedDistance = Math.max(2, Math.floor(query.length * 0.4));

  for (const candidate of candidates) {
    const candidateStr = candidate.toLowerCase();

    // Exact substring match check (if query is just a substring, we might just return it or rely on existing filter)
    // The fuzzy match handles typos.
    const words = candidateStr.split(/[\s-]+/);

    // Calculate distance to the entire string
    let candidateMinDist = levenshteinDistance(lowerQuery, candidateStr);

    // Calculate distance to individual words
    for (const word of words) {
      if (word.length >= 3) {
        const dist = levenshteinDistance(lowerQuery, word);
        if (dist < candidateMinDist) {
          candidateMinDist = dist;
        }
      }
    }

    if (candidateMinDist < minDistance) {
      minDistance = candidateMinDist;
      bestMatch = candidate;
    }
  }

  if (minDistance <= maxAllowedDistance) {
    return bestMatch;
  }
  return null;
}
