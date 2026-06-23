import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else {
      if (
        file === 'App.tsx' ||
        file === 'constants.ts' ||
        file === 'theme.ts' ||
        file === 'types.ts'
      ) {
        console.log('FOUND:', filePath);
      }
    }
  }
}

walk(process.cwd());
