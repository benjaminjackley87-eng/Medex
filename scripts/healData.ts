import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppliedAnatomyModuleSchema } from '../src/types/appliedAnatomySchema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data/applied_anatomy');

// 1. JSON Auto-Repair
export function attemptJSONRepair(rawText: string): any {
  try {
    return JSON.parse(rawText);
  } catch (e) {
    const repaired = rawText.trim();
    const tryParse = (text: string) => {
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    };

    let result = tryParse(repaired + '}');
    if (result) return result;

    result = tryParse(repaired + ']}');
    if (result) return result;

    result = tryParse(repaired + '"}');
    if (result) return result;

    throw e;
  }
}

// 2. KaTeX Repair
export function repairKaTeX(str: string): string {
  if (typeof str !== 'string') return str;
  let newStr = str;

  // Fix unescaped percent signs: replace % with \% if not already escaped
  newStr = newStr.replace(/(?<!\\)%/g, '\\%');

  // Wrap common physiological acronyms in \text{} if they are not already wrapped.
  // We only do this loosely for known variables
  const acronyms = [
    'CPP',
    'MAP',
    'GFR',
    'ICP',
    'CVP',
    'SVR',
    'PVR',
    'CO',
    'HR',
    'SV',
    'PEEP',
    'V_d',
    'V_t',
    'P_a',
    'P_A',
    'F_iO_2'
  ];

  for (const ac of acronyms) {
    // In memory string has a single backslash for \text{
    const regex = new RegExp(`(?<!\\\\text\\{)\\b${ac}\\b(?!\\})`, 'g');
    newStr = newStr.replace(regex, `\\text{${ac}}`);
  }

  return newStr;
}

export function deeplyRepairStrings(obj: any): any {
  if (typeof obj === 'string') {
    return repairKaTeX(obj);
  } else if (Array.isArray(obj)) {
    return obj.map((item) => deeplyRepairStrings(item));
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const [key, val] of Object.entries(obj)) {
      newObj[key] = deeplyRepairStrings(val);
    }
    return newObj;
  }
  return obj;
}

// 3. Main Healing Function
export function healData(targetDir: string = DATA_DIR) {
  console.log(`Starting Data Healing process in ${targetDir}...`);
  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(targetDir).filter((file) => file.endsWith('.json'));
  let healedCount = 0;
  let failedCount = 0;

  files.forEach((file) => {
    const filePath = path.join(targetDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');

    let jsonData;
    try {
      jsonData = attemptJSONRepair(rawContent);
    } catch (e: any) {
      console.error(`❌ [FATAL] Could not parse or repair JSON for ${file}: ${e.message}`);
      failedCount++;
      return;
    }

    let repairedData = deeplyRepairStrings(jsonData);

    const validationResult = AppliedAnatomyModuleSchema.safeParse(repairedData);
    if (!validationResult.success) {
      console.warn(
        `⚠️ [WARN] Schema validation failed for ${file}. Attempting to inject fallbacks...`
      );
      if (!repairedData.moduleId) repairedData.moduleId = file.replace('.json', '');
      if (!repairedData.moduleTitle)
        repairedData.moduleTitle = file.replace(/_|-/g, ' ').replace('.json', '');
      if (!repairedData.tags) repairedData.tags = [];

      const retryValidation = AppliedAnatomyModuleSchema.safeParse(repairedData);
      if (!retryValidation.success) {
        console.error(`❌ [ERROR] Could not heal schema errors for ${file}:`);
        console.error(JSON.stringify(retryValidation.error.format(), null, 2));
        failedCount++;
        return;
      } else {
        repairedData = retryValidation.data;
      }
    } else {
      repairedData = validationResult.data;
    }

    const newContent = JSON.stringify(repairedData, null, 2) + '\n';
    if (newContent !== rawContent && newContent.trim() !== rawContent.trim()) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`🩹 [HEALED] ${file}`);
      healedCount++;
    }
  });

  console.log(
    `\nHealing complete. Healed ${healedCount} file(s). Failed to heal ${failedCount} file(s).`
  );
  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

if (process.argv[1] === __filename) {
  healData();
}
