const fs = require('fs');
const content = fs.readFileSync('dist/assets/index-Cb1FE4Yj.js', 'utf8');

// Find 'id:"cvs-exam"' or similar
const match = content.match(/id:\s*["']cvs-exam["']/);
if (match) {
    let start = match.index;
    
    // Walk backwards to find the start of the EXAMINATIONS array.
    // It should be something like `var X = [` or `const X = [`
    // We look for a `[` that starts the array of examinations.
    let bracketCount = 0;
    while (start > 0) {
        if (content[start] === ']') bracketCount++;
        else if (content[start] === '[') {
            if (bracketCount === 0) {
                // This might be the start of the array!
                // Let's check if the previous characters look like `= ` or `=[`
                break;
            }
            bracketCount--;
        }
        start--;
    }
    
    // Now walk forward to find the matching `]`
    let end = start + 1;
    bracketCount = 1;
    while (bracketCount > 0 && end < content.length) {
        if (content[end] === '[') bracketCount++;
        else if (content[end] === ']') bracketCount--;
        end++;
    }
    
    fs.writeFileSync('extracted_examinations.js', 'export const EXAMINATIONS = ' + content.substring(start, end) + ';\n');
    console.log('Successfully extracted EXAMINATIONS array of length ' + (end - start));
} else {
    console.log('Could not find cvs-exam');
}
