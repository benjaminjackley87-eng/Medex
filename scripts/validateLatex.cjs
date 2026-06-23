const fs = require('fs');
const path = require('path');
const katex = require('katex');

// Replicate the project's logic
function validateMath(math, isBlock, file, key, originalText) {
  try {
    katex.renderToString(math, { displayMode: isBlock, throwOnError: true });
  } catch (err) {
    console.error(`\x1b[31m[ERROR]\x1b[0m in ${path.basename(file)} at key "${key}":`);
    console.error(`  Math type: ${isBlock ? 'Block' : 'Inline'}`);
    console.error(`  Failed fragment: "${math}"`);
    console.error(`  KaTeX message: ${err.message}`);
    console.error(`  Full text: "${originalText}"\n`);
    return false;
  }
  return true;
}

function parseContentText(text, file, key) {
  if (typeof text !== 'string') return true;

  if (text.startsWith('$$') && text.endsWith('$$')) {
    return validateMath(text.slice(2, -2), true, file, key, text);
  }
  if (text.startsWith('$') && text.endsWith('$') && !text.includes('\n')) {
    return validateMath(text.slice(1, -1), false, file, key, text);
  }

  if (
    (text.includes('\\frac') || text.includes('\\cdot') || text.includes('\\left')) &&
    !text.includes('$')
  ) {
    return validateMath(text, true, file, key, text);
  }

  let success = true;
  const parts = text.split(/(\$[^\$]+\$)/g);
  for (const part of parts) {
    if (part.startsWith('$') && part.endsWith('$')) {
      if (!validateMath(part.slice(1, -1), false, file, key, text)) {
        success = false;
      }
    }
  }
  return success;
}

function validateRoteOrRelationValue(value, key, file) {
  const strVal = String(value);
  let success = true;

  if (strVal.includes('\\') && /\bwhere\b/.test(strVal)) {
    const parts = strVal.split(/\bwhere\b/);
    const formula = parts[0].trim();
    const explanation = parts.slice(1).join('where').trim();

    if (!validateMath(formula, true, file, key, strVal)) {
      success = false;
    }
    if (!parseContentText(explanation, file, key)) {
      success = false;
    }
    return success;
  }

  if (strVal.includes('\\') && !strVal.includes('$')) {
    return validateMath(strVal, true, file, key, strVal);
  }

  return parseContentText(strVal, file, key);
}

// Recursively traverse JSON objects to find all string values
let totalChecked = 0;
let totalFailed = 0;

function checkObject(obj, file, currentPath = '') {
  if (typeof obj === 'string') {
    totalChecked++;
    const isRoteData = currentPath.includes('roteData');

    // If it's in roteData, validate using the specialized rote data renderer
    if (isRoteData) {
      if (!validateRoteOrRelationValue(obj, currentPath, file)) {
        totalFailed++;
      }
    } else {
      // General text parser validation
      if (!parseContentText(obj, file, currentPath)) {
        totalFailed++;
      }
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => checkObject(item, file, `${currentPath}[${idx}]`));
  } else if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([key, val]) => {
      checkObject(val, file, currentPath ? `${currentPath}.${key}` : key);
    });
  }
}

// Scan data/applied_anatomy
const anatomyDir = path.join(__dirname, '..', 'data', 'applied_anatomy');
console.log(`Scanning JSON files in ${anatomyDir}...\n`);

const files = fs.readdirSync(anatomyDir);
files.forEach((file) => {
  if (file.endsWith('.json')) {
    const filePath = path.join(anatomyDir, file);
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      checkObject(content, filePath);
    } catch (err) {
      console.error(`Failed to parse/read JSON file: ${file}. Error: ${err.message}`);
    }
  }
});

console.log(`Validation Complete.`);
console.log(`Total strings checked: ${totalChecked}`);
if (totalFailed === 0) {
  console.log(`\x1b[32m[SUCCESS]\x1b[0m All LaTeX math in JSON files is valid and renderable!`);
  process.exit(0);
} else {
  console.log(
    `\x1b[31m[FAILED]\x1b[0m Found ${totalFailed} invalid math string(s). See errors above.`
  );
  process.exit(1);
}
