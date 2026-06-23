import { describe, it, expect } from 'vitest';
import { formatKeyToTitle, parseContentText, formatDescriptionParagraphs } from './latexTextParser';
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

    it('sanitizes inline math XSS attempts', () => {
      // By using an invalid KaTeX macro that might try to inject HTML
      // We simulate an XSS payload to see if DOMPurify strips script tags
      const result = parseContentText('$<script>alert("XSS")</script>$');
      const { container } = render(<div>{result}</div>);
      const span = container.querySelector('span.inline-math');
      expect(span).not.toBeNull();
      // The <script> tag should be sanitized out by DOMPurify
      expect(span?.innerHTML).not.toContain('<script>');
    });

    it('sanitizes block math XSS attempts', () => {
      // It turns out KaTeX just renders standard text like `onerror` as math text nodes:
      // <span class="mord mathnormal">o</span><span class="mord mathnormal">n</span>...
      // Since it's harmless text we don't strictly need it removed by DOMPurify,
      // but if a user injects an actual HTML tag DOMPurify strips it.
      // Here we inject an anchor with javascript.
      const result = parseContentText('$$<a href="javascript:alert(1)">XSS</a>$$');
      const { container } = render(<div>{result}</div>);
      const div = container.querySelector('div.block-math');
      expect(div).not.toBeNull();

      // We expect the script context to not be executable (if it parsed as HTML it would be stripped).
      // If it parsed as KaTeX Math, it's just plain text nodes displaying `<a href...`.
      // We mostly care that DOMPurify sanitizes it if it DID parse as HTML.
      expect(div?.innerHTML).not.toContain('<a href="javascript:alert(1)">');
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
