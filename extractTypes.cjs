const fs = require('fs');
const path = require('path');

const extractFileContent = (targetString, outputFileName) => {
    console.log('Searching for ' + targetString);
    const files = fs.readdirSync('./migrated_prompt_history');
    let bestContent = null;
    let maxLines = 0;
    
    function traverse(obj) {
      if (typeof obj === 'string') {
        if (obj.includes(targetString)) {
          const lines = obj.split('\n').length;
          if (lines > maxLines) {
            maxLines = lines;
            bestContent = obj;
          }
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
    
    if (bestContent) {
        fs.writeFileSync(outputFileName, bestContent);
        console.log('Recovered ' + outputFileName + ' with ' + maxLines + ' lines.');
    } else {
        console.log('Could not find ' + targetString);
    }
}

extractFileContent('export const SYSTEM_THEMES', 'recovered_theme.ts');
