import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Helper to format camelCase, snake_case keys into Title Case words
export const formatKeyToTitle = (key: string): string => {
  if (!key) return '';
  // 1. Insert spaces before capital letters in camelCase and after acronyms
  let result = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  // 2. Replace underscores or hyphens with spaces
  result = result.replace(/[_-]/g, ' ');
  // 3. Trim extra spaces
  result = result.trim();
  // 4. Capitalize first letter of each word
  return result
    .split(' ')
    .map((word) => {
      if (!word) return '';
      // Preserve uppercase acronyms
      if (word === word.toUpperCase() && word.length > 1) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

// Helper to safely render inline math using KaTeX
export const renderInlineMath = (
  math: string,
  className: string = 'inline-math px-1 text-amber-500 font-semibold font-serif'
) => {
  try {
    const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
    return <span dangerouslySetInnerHTML={{ __html: html }} className={className} />;
  } catch (e) {
    return <span className="text-amber-600 font-mono">${math}$</span>;
  }
};

// Helper to safely render block math using KaTeX
export const renderBlockMath = (
  math: string,
  className: string = 'block-math my-4 overflow-x-auto py-3 px-5 bg-slate-950/40 rounded-xl border border-slate-800/80 flex justify-center text-slate-200'
) => {
  try {
    const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
    return <div dangerouslySetInnerHTML={{ __html: html }} className={className} />;
  } catch (e) {
    return <div className="text-amber-500 font-mono text-center my-3">$${math}$$</div>;
  }
};

// Helper to parse strings for bold (**...**) and inline math ($...$ or $$...$$)
export const parseContentText = (text: string): React.ReactNode => {
  if (typeof text !== 'string') {
    text = String(text || '');
  }
  if (!text) return '';

  // Check if the entire block is a TeX formula (starts with $$ or has backslashes)
  if (text.startsWith('$$') && text.endsWith('$$')) {
    return renderBlockMath(text.slice(2, -2));
  }
  if (text.startsWith('$') && text.endsWith('$') && !text.includes('\n')) {
    return renderInlineMath(text.slice(1, -1));
  }

  // Auto-detect math if backslash or complex math markers are present and not already wrapped
  if (
    (text.includes('\\frac') || text.includes('\\cdot') || text.includes('\\left')) &&
    !text.includes('$')
  ) {
    return renderBlockMath(text);
  }

  // Parse inline math ($...$) and bold (**...**)
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      return <React.Fragment key={index}>{renderInlineMath(part.slice(1, -1))}</React.Fragment>;
    } else {
      const subParts = part.split(/(\*\*[^*]+\*\*)/g);
      return subParts.map((subPart, subIndex) => {
        if (subPart.startsWith('**') && subPart.endsWith('**')) {
          return (
            <strong
              key={subIndex}
              className="font-extrabold text-white bg-white/5 px-1 py-0.5 rounded border border-white/10"
            >
              {subPart.slice(2, -2)}
            </strong>
          );
        } else {
          return subPart;
        }
      });
    }
  });
};

// Format description paragraphs, extracting sub-lists into micro cards
export const formatDescriptionParagraphs = (text: string, baseKey: string): React.ReactNode => {
  if (typeof text !== 'string') return text;

  // Split by escaped newlines (\n)
  const lines = text.split(/\\n|\n/g);

  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Numbered list match: "1. **" or "1. "
        const numMatch = trimmed.match(/^(\d+)\.\s+\*\*(.*)\*\*(.*)/);
        const bulletMatch = trimmed.match(/^-\s+\*\*(.*)\*\*(.*)/) || trimmed.match(/^-\s+(.*)/);

        if (numMatch) {
          const num = numMatch[1];
          const header = numMatch[2];
          const body = numMatch[3];
          return (
            <div
              key={`${baseKey}-${index}`}
              className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl space-y-1 hover:border-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="shrink-0 w-5 h-5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center text-[9px] font-black">
                  {num}
                </span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {parseContentText(header)}
                </h4>
              </div>
              {body && (
                <div className="text-xs text-slate-300 leading-relaxed font-medium pl-7">
                  {parseContentText(body)}
                </div>
              )}
            </div>
          );
        }

        if (bulletMatch) {
          const header = bulletMatch[2] ? bulletMatch[1] : '';
          const body = bulletMatch[2] ? bulletMatch[2] : bulletMatch[1];
          return (
            <div key={`${baseKey}-${index}`} className="flex gap-3 items-start pl-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
              <div className="text-xs text-slate-300 leading-relaxed font-medium">
                {header ? (
                  <strong className="text-white block mb-0.5">{parseContentText(header)}</strong>
                ) : null}
                {parseContentText(body)}
              </div>
            </div>
          );
        }

        // Check if paragraph contains sub-numbered sections like "1. **" inside the text
        const regexSubList = /(\b\d+\.\s+\*\*[^*]+\*\*)/g;
        const subParts = trimmed.split(regexSubList);
        if (subParts.length > 1) {
          const subElements: React.ReactNode[] = [];
          if (subParts[0].trim()) {
            subElements.push(
              <p key="intro" className="text-xs text-slate-300 leading-relaxed font-medium">
                {parseContentText(subParts[0].trim())}
              </p>
            );
          }
          for (let i = 1; i < subParts.length; i += 2) {
            const headerPart = subParts[i];
            const bodyPart = subParts[i + 1] || '';
            const match = headerPart.match(/^(\d+)\.\s+\*\*(.*)\*\*/);
            if (match) {
              const num = match[1];
              const title = match[2];
              subElements.push(
                <div
                  key={`sub-${num}`}
                  className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl space-y-1 hover:border-slate-700/50 transition-colors mt-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 w-5 h-5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center text-[9px] font-black">
                      {num}
                    </span>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {parseContentText(title)}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-medium pl-7">
                    {parseContentText(bodyPart.trim())}
                  </div>
                </div>
              );
            }
          }
          return (
            <div key={`${baseKey}-${index}`} className="space-y-2">
              {subElements}
            </div>
          );
        }

        return (
          <p
            key={`${baseKey}-${index}`}
            className="text-xs text-slate-300 leading-relaxed font-medium"
          >
            {parseContentText(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

// Splits paragraphs containing inline list numbers like "1. **" and "2. **" into clean card sub-sections
export const splitParagraphIntoList = (text: string, blockKey: string): React.ReactNode => {
  // Matches "1. **", "2. **", etc.
  const regex = /(\b\d+\.\s+\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  if (parts.length <= 1) {
    return (
      <p className="text-sm text-slate-300 leading-relaxed font-medium">{parseContentText(text)}</p>
    );
  }

  const elements: React.ReactNode[] = [];

  // Intro text before any list items
  if (parts[0].trim()) {
    elements.push(
      <p
        key={`${blockKey}-intro`}
        className="text-sm text-slate-300 leading-relaxed font-medium mb-4"
      >
        {parseContentText(parts[0].trim())}
      </p>
    );
  }

  // Sub-cards for each item
  for (let i = 1; i < parts.length; i += 2) {
    const headerPart = parts[i];
    const bodyPart = parts[i + 1] || '';

    const match = headerPart.match(/^(\d+)\.\s+\*\*(.*)\*\*/);
    if (match) {
      const num = match[1];
      const title = match[2];

      elements.push(
        <div
          key={`${blockKey}-card-${num}`}
          className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-2 mt-3 hover:border-slate-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center text-[10px] font-black">
              {num}
            </span>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {parseContentText(title)}
            </h4>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed font-medium pl-9">
            {parseContentText(bodyPart.trim())}
          </div>
        </div>
      );
    }
  }

  return <div className="space-y-3">{elements}</div>;
};

// Format a single line (processes list prefixes vs normal paragraphs)
export const formatTextLine = (line: string, index: number, blockKey: string) => {
  // Check if it's a numbered list item
  const listMatch = line.match(/^(\d+)\.\s+(.*)/);
  if (listMatch) {
    const num = listMatch[1];
    const content = listMatch[2];
    return (
      <li key={`${blockKey}-list-num-${index}`} className="flex gap-4 items-start pl-2">
        <span className="shrink-0 w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center text-[10px] font-black">
          {num}
        </span>
        <div className="flex-1 text-slate-300 font-medium text-sm leading-relaxed">
          {parseContentText(content)}
        </div>
      </li>
    );
  }

  // Check if it's a bulleted list item
  const bulletMatch = line.match(/^-\s+(.*)/);
  if (bulletMatch) {
    const content = bulletMatch[1];
    return (
      <li key={`${blockKey}-list-bullet-${index}`} className="flex gap-4 items-start pl-2">
        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
        <div className="flex-1 text-slate-300 font-medium text-sm leading-relaxed">
          {parseContentText(content)}
        </div>
      </li>
    );
  }

  // Standard line - passes through list split check
  return (
    <div key={`${blockKey}-para-${index}`}>
      {splitParagraphIntoList(line, `${blockKey}-${index}`)}
    </div>
  );
};

// Render full multi-paragraph content including block math and lists
export const renderFullContent = (text: string, blockKey: string = 'content') => {
  if (typeof text !== 'string') {
    text = String(text || '');
  }
  if (!text) return null;

  // Split by block math first
  const blocks = text.split(/($$[^$]+$$)/g);
  return blocks.map((block, index) => {
    const currentKey = `${blockKey}-b-${index}`;
    if (block.startsWith('$$') && block.endsWith('$$')) {
      const math = block.slice(2, -2);
      return <React.Fragment key={currentKey}>{renderBlockMath(math)}</React.Fragment>;
    } else {
      // Split by newlines
      const lines = block.split(/\n+/).filter(Boolean);
      const elements: React.ReactNode[] = [];
      let currentList: React.ReactNode[] = [];
      let isListActive = false;

      lines.forEach((line, lineIdx) => {
        const isNumbered = /^\d+\.\s+/.test(line);
        const isBulleted = /^-\s+/.test(line);

        if (isNumbered || isBulleted) {
          if (!isListActive) {
            isListActive = true;
            currentList = [];
          }
          currentList.push(formatTextLine(line, lineIdx, currentKey));
        } else {
          if (isListActive) {
            elements.push(
              <ul key={`${currentKey}-list-group-${lineIdx}`} className="space-y-4 my-6 pl-2">
                {currentList}
              </ul>
            );
            isListActive = false;
          }
          elements.push(formatTextLine(line, lineIdx, currentKey));
        }
      });

      if (isListActive) {
        elements.push(
          <ul key={`${currentKey}-list-group-end`} className="space-y-4 my-6 pl-2">
            {currentList}
          </ul>
        );
      }

      return (
        <div key={currentKey} className="space-y-4">
          {elements}
        </div>
      );
    }
  });
};
