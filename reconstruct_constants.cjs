const fs = require('fs');

let content = fs.readFileSync('extracted_examinations.js', 'utf8');

// Replace minified enum 'ce.ENT' with 'ExamSystem.ENT'
content = content.replace(/\b[a-zA-Z]+\.([A-Z_]+)\b/g, (match, p1) => {
    return 'ExamSystem.' + p1;
});
// Also replace `!1` with `false` and `!0` with `true`
content = content.replace(/!1/g, 'false');
content = content.replace(/!0/g, 'true');

const typesImport = `import { ExamSystem, Examination } from './types';\n\n`;
fs.writeFileSync('src/constants.ts', typesImport + content);
