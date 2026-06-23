import { describe, it, expect } from 'vitest';
import { attemptJSONRepair, repairKaTeX, deeplyRepairStrings } from './healData';

describe('healData - attemptJSONRepair', () => {
  it('should parse valid JSON successfully', () => {
    const raw = '{"test": 123}';
    expect(attemptJSONRepair(raw)).toEqual({ test: 123 });
  });

  it('should repair JSON with missing closing brace', () => {
    const raw = '{"test": 123';
    expect(attemptJSONRepair(raw)).toEqual({ test: 123 });
  });

  it('should repair JSON with missing array closing brace', () => {
    const raw = '{"test": [123';
    expect(attemptJSONRepair(raw)).toEqual({ test: [123] });
  });

  it('should repair JSON with missing string quote and brace', () => {
    const raw = '{"test": "123';
    expect(attemptJSONRepair(raw)).toEqual({ test: '123' });
  });
});

describe('healData - repairKaTeX', () => {
  it('should escape bare percent signs', () => {
    expect(repairKaTeX('50% of people')).toBe('50\\% of people');
    expect(repairKaTeX('50\\% of people')).toBe('50\\% of people'); // Already escaped
  });

  it('should wrap common physiological acronyms in \\text{}', () => {
    expect(repairKaTeX('The MAP is 70')).toBe('The \\text{MAP} is 70');
    expect(repairKaTeX('The \\text{MAP} is 70')).toBe('The \\text{MAP} is 70'); // Already wrapped
    expect(repairKaTeX('GFR decreases')).toBe('\\text{GFR} decreases');
  });

  it('should handle non-string inputs gracefully', () => {
    // @ts-ignore
    expect(repairKaTeX(123)).toBe(123);
  });
});

describe('healData - deeplyRepairStrings', () => {
  it('should recursively repair strings in objects and arrays', () => {
    const input = {
      description: 'MAP is 50%',
      metrics: ['CVP is 10', { nested: 'HR is 100%' }]
    };
    const expected = {
      description: '\\text{MAP} is 50\\%',
      metrics: ['\\text{CVP} is 10', { nested: '\\text{HR} is 100\\%' }]
    };
    expect(deeplyRepairStrings(input)).toEqual(expected);
  });
});
