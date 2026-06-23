import { describe, it, expect } from 'vitest';
import {
  formatKeyToTitle,
  parseContentText,
  formatDescriptionParagraphs
} from './latexTextParser';
import React from 'react';
import { render } from '@testing-library/react';

describe('latexTextParser', () => {
  describe('formatKeyToTitle', () => {
    it('converts camelCase to Title Case', () => {
      expect(formatKeyToTitle('myCamelCaseString')).toBe('My Camel Case String');
    });

    it('converts snake_case to Title Case', () => {
      expect(formatKeyToTitle('my_snake_case_string')).toBe('My Snake Case String');
    });

    it('handles uppercase acronyms', () => {
      // Assuming the function retains upper case acronyms
      expect(formatKeyToTitle('ECGFindings')).toBe('ECG Findings');
    });

    it('handles empty strings gracefully', () => {
      expect(formatKeyToTitle('')).toBe('');
    });
  });

  describe('parseContentText', () => {
    it('returns empty string for null or empty input', () => {
      expect(parseContentText('')).toBe('');
      // @ts-ignore - testing invalid input
      expect(parseContentText(null)).toBe('');
    });

    it('parses bold text correctly', () => {
      const result = parseContentText('Here is **bold** text');
      // The result is an array of React Nodes. We can render it and check text content.
      const { container } = render(<div>{result}</div>);
      expect(container.textContent).toContain('Here is bold text');
      expect(container.querySelector('strong')).not.toBeNull();
      expect(container.querySelector('strong')?.textContent).toBe('bold');
    });
  });

  describe('formatDescriptionParagraphs', () => {
    it('handles numbered lists correctly', () => {
      const input = `1. **First Point** Body of first point
2. **Second Point** Body of second point`;
      const result = formatDescriptionParagraphs(input, 'test-key');
      const { container } = render(<div>{result}</div>);
      
      expect(container.textContent).toContain('First Point');
      expect(container.textContent).toContain('Body of first point');
      // Numbered lists in formatDescriptionParagraphs get rendered as specific UI components
      const headers = container.querySelectorAll('h4');
      expect(headers.length).toBe(2);
    });

    it('handles standard paragraphs', () => {
      const input = `This is a standard paragraph without lists.`;
      const result = formatDescriptionParagraphs(input, 'test-key');
      const { container } = render(<div>{result}</div>);
      
      expect(container.textContent).toContain('This is a standard paragraph');
    });
  });
});
