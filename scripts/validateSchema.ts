import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppliedAnatomyModuleSchema } from '../src/types/appliedAnatomySchema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data/applied_anatomy');

function validateAll() {
  console.log(`Scanning data directory: ${DATA_DIR}`);
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Error: Directory does not exist: ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter((file) => file.endsWith('.json'));
  console.log(`Found ${files.length} JSON modules to validate.`);

  let errorCount = 0;

  files.forEach((file) => {
    const filePath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(content);

      const result = AppliedAnatomyModuleSchema.safeParse(jsonData);
      if (!result.success) {
        console.error(`\n❌ [INVALID] ${file}`);
        console.error(JSON.stringify(result.error.format(), null, 2));
        errorCount++;
      } else {
        console.log(`✅ [VALID] ${file}`);
      }
    } catch (e: any) {
      console.error(`\n❌ [ERROR] Failed to read/parse ${file}: ${e.message}`);
      errorCount++;
    }
  });

  if (errorCount > 0) {
    console.error(`\nValidation failed with ${errorCount} invalid file(s).`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All ${files.length} modules validated successfully against the Zod schema!`);
    process.exit(0);
  }
}

validateAll();
