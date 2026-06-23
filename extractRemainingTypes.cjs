const fs = require('fs');
const path = require('path');

const extractFileContent = () => {
  const files = fs.readdirSync('./migrated_prompt_history');
  const allInterfaces = new Set();
  const allTypes = new Set();

  function traverse(obj) {
    if (typeof obj === 'string') {
      const interfaceMatches = obj.match(/export interface [A-Za-z0-9_]+\s*\{[^}]+\}/g);
      if (interfaceMatches) {
        for (const match of interfaceMatches) allInterfaces.add(match);
      }
      const typeMatches = obj.match(/export type [A-Za-z0-9_]+\s*=[^;]+;/g);
      if (typeMatches) {
        for (const match of typeMatches) allTypes.add(match);
      }
    } else if (Array.isArray(obj)) {
      for (const item of obj) traverse(item);
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key of Object.keys(obj)) traverse(obj[key]);
    }
  }

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const content = fs.readFileSync('./migrated_prompt_history/' + file, 'utf8');
    try {
      const data = JSON.parse(content);
      traverse(data);
    } catch (e) {}
  }

  let result = '// Extracted from prompt history\n\n';
  for (const i of allInterfaces) result += i + '\n\n';
  for (const t of allTypes) result += t + '\n\n';

  fs.writeFileSync('all_recovered_types.ts', result);
  console.log('Extracted ' + allInterfaces.size + ' interfaces and ' + allTypes.size + ' types.');
};

extractFileContent();
