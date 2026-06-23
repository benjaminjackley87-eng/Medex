import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useClinicalSearch } from './useClinicalSearch';

describe('useClinicalSearch', () => {
  const mockData = [
    { id: 1, name: 'Sepsis', category: 'Infection' },
    { id: 2, name: 'Myocardial Infarction', category: 'Cardiology' },
    { id: 3, name: 'Pneumonia', category: 'Respiratory' }
  ];

  it('returns all data when query is empty', () => {
    const { result } = renderHook(() => useClinicalSearch(mockData, '', ['name', 'category']));
    
    expect(result.current.results).toEqual(mockData);
    expect(result.current.didYouMean).toBeNull();
  });

  it('filters data by a matching field', () => {
    const { result } = renderHook(() => useClinicalSearch(mockData, 'pneumo', ['name', 'category']));
    
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Pneumonia');
    expect(result.current.didYouMean).toBeNull();
  });

  it('filters data case-insensitively', () => {
    const { result } = renderHook(() => useClinicalSearch(mockData, 'SEPSIS', ['name']));
    
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Sepsis');
  });

  it('returns empty results and no suggestion if query is too short', () => {
    const { result } = renderHook(() => useClinicalSearch(mockData, 'ab', ['name']));
    
    expect(result.current.results).toHaveLength(0);
    expect(result.current.didYouMean).toBeNull();
  });

  it('provides a didYouMean suggestion for minor typos if query > 2 chars', () => {
    // 'pnuemonia' is a typo for 'Pneumonia'
    const { result } = renderHook(() => useClinicalSearch(mockData, 'pnuemonia', ['name', 'category']));
    
    expect(result.current.results).toHaveLength(0);
    expect(result.current.didYouMean).toBe('Pneumonia');
  });

  it('does not crash if searchFields point to non-string fields', () => {
    // id is a number
    // @ts-ignore - testing runtime safety
    const { result } = renderHook(() => useClinicalSearch(mockData, '1', ['id']));
    
    expect(result.current.results).toHaveLength(0);
  });
});
