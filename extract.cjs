const fs = require('fs');
const data = require('./migrated_prompt_history/prompt_2026-02-12T01_53_32.674Z.json');

let longestMatch = '';

function traverse(obj) {
  if (typeof obj === 'string') {
    if (obj.includes('export const') && obj.includes('cvs-20')) {
      if (obj.length > longestMatch.length) {
        longestMatch = obj;
      }
    }
  } else if (Array.isArray(obj)) {
    for (const item of obj) traverse(item);
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key of Object.keys(obj)) traverse(obj[key]);
  }
}

traverse(data);

if (longestMatch) {
  console.log('Found match of length:', longestMatch.length);
  fs.writeFileSync('recovered_constants_candidate.ts', longestMatch);
} else {
  console.log('No match found');
}
