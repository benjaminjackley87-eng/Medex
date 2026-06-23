import { useMemo } from 'react';
import { getClosestMatch } from '../utils/stringUtils';

/**
 * A custom hook for filtering clinical data based on a search query.
 *
 * @param data The array of items to filter.
 * @param query The search string.
 * @param searchFields The fields in each item to search against.
 * @returns The filtered array of items and a potential spelling suggestion.
 */
export function useClinicalSearch<T>(
  data: T[],
  query: string,
  searchFields: (keyof T)[]
): { results: T[]; didYouMean: string | null } {
  return useMemo(() => {
    if (!query.trim()) return { results: data, didYouMean: null };

    const lowerQuery = query.toLowerCase();

    const results = data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });

    let didYouMean = null;
    if (results.length === 0 && query.trim().length > 2) {
      // Extract all strings from the search fields to use as candidates
      const allCandidates: string[] = [];
      data.forEach((item) => {
        searchFields.forEach((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            allCandidates.push(value);
          }
        });
      });
      didYouMean = getClosestMatch(query.trim(), Array.from(new Set(allCandidates)));
    }

    return { results, didYouMean };
  }, [data, query, searchFields]);
}
