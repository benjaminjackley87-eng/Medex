import { describe, it, expect } from 'vitest';
import { levenshteinDistance, getClosestMatch } from './stringUtils';

describe('stringUtils', () => {
  describe('levenshteinDistance', () => {
    it('calculates exact match distance as 0', () => {
      expect(levenshteinDistance('test', 'test')).toBe(0);
    });

    it('calculates one substitution distance as 1', () => {
      expect(levenshteinDistance('test', 'tent')).toBe(1);
    });

    it('calculates insertion distance as 1', () => {
      expect(levenshteinDistance('test', 'tests')).toBe(1);
    });

    it('calculates deletion distance as 1', () => {
      expect(levenshteinDistance('test', 'tet')).toBe(1);
    });

    it('handles empty strings', () => {
      expect(levenshteinDistance('', 'test')).toBe(4);
      expect(levenshteinDistance('test', '')).toBe(4);
      expect(levenshteinDistance('', '')).toBe(0);
    });
  });

  describe('getClosestMatch', () => {
    const candidates = ['Myocardial Infarction', 'Pneumonia', 'Heart Failure'];

    it('returns exact matches (ignoring case)', () => {
      expect(getClosestMatch('pneumonia', candidates)).toBe('Pneumonia');
    });

    it('returns null if query is too short', () => {
      expect(getClosestMatch('pn', candidates)).toBeNull();
    });

    it('handles minor typos', () => {
      expect(getClosestMatch('pnuemonia', candidates)).toBe('Pneumonia'); // transposes letters
    });

    it('matches a candidate word exactly', () => {
      // 'heart' has a distance of 0 from the word 'heart' in 'Heart Failure'
      expect(getClosestMatch('heart', candidates)).toBe('Heart Failure');
    });

    it('returns null if no candidate is close enough', () => {
      expect(getClosestMatch('xyzabc', candidates)).toBeNull();
    });

    it('returns null if candidates list is empty', () => {
      expect(getClosestMatch('test', [])).toBeNull();
    });
  });
});
