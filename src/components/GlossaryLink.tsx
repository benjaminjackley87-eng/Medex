import React from 'react';
import { GLOSSARY_DATA } from '../views/GlossaryView';

interface GlossaryLinkProps {
  text: string;
  onNavigate: (term: string) => void;
}

const GlossaryLink: React.FC<GlossaryLinkProps> = ({ text, onNavigate }) => {
  if (!text) return null;

  // Sort terms by length descending to match longer terms first (e.g., "Pitting Edema" before "Edema")
  const sortedTerms = [...GLOSSARY_DATA].sort((a, b) => b.term.length - a.term.length);

  // Create a regex that matches any of the terms (case-insensitive)
  // We use word boundaries \b to avoid matching parts of words
  const termsRegex = new RegExp(
    `\\b(${sortedTerms.map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi'
  );

  const parts = text.split(termsRegex);
  const matches = text.match(termsRegex) || [];

  let matchIndex = 0;
  return (
    <>
      {parts.map((part, i) => {
        // If this part matches one of our terms
        if (i % 2 === 1) {
          const term = matches[matchIndex++];
          return (
            <button
              key={`glossary-btn-${i}-${term}`}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(term);
              }}
              className="text-blue-600 hover:underline font-bold decoration-blue-300 underline-offset-2 transition-all"
              title={`View definition for ${term}`}
            >
              {part}
            </button>
          );
        }
        return <span key={`glossary-text-${i}`}>{part}</span>;
      })}
    </>
  );
};

export default GlossaryLink;
