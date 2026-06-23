import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data/applied_anatomy');
const OBJECTIVES_PATH = path.resolve(__dirname, '../unique_learning_objectives.md');

function loadObjectives(): { code: string; text: string }[] {
  if (!fs.existsSync(OBJECTIVES_PATH)) return [];
  const content = fs.readFileSync(OBJECTIVES_PATH, 'utf8');
  const lines = content.split('\n');
  const objs = [];
  for (let i = 5; i < lines.length; i++) {
    const match = lines[i].match(/^\|\s*`([^`]+)`\s*\|\s*(.*)\s*\|\s*$/);
    if (match) {
      objs.push({ code: match[1].trim(), text: match[2].trim() });
    }
  }
  return objs;
}

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const stopwords = new Set([
    'describe',
    'discuss',
    'outline',
    'explain',
    'evaluate',
    'particular',
    'including',
    'clinical',
    'anaesthesia',
    'patient',
    'management',
    'appropriate',
    'associated',
    'potential',
    'common',
    'select',
    'identify',
    'with',
    'from',
    'that',
    'this',
    'these',
    'understand',
    'knowledge',
    'demonstrate'
  ]);
  return words.filter((w) => !stopwords.has(w));
}

function getUncoveredObjectives() {
  console.log('Analyzing gaps...');
  const objs = loadObjectives();
  const dbContents: string[] = [];

  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
  for (const f of files) {
    dbContents.push(fs.readFileSync(path.join(DATA_DIR, f), 'utf-8').toLowerCase());
  }

  const uncovered = [];
  for (const obj of objs) {
    const keywords = extractKeywords(obj.text);
    if (keywords.length === 0) continue;

    let isCovered = false;
    for (const db of dbContents) {
      const matches = keywords.filter((kw) => db.includes(kw));
      if (matches.length / keywords.length >= 0.6) {
        isCovered = true;
        break;
      }
    }
    if (!isCovered) {
      uncovered.push(obj);
    }
  }
  return uncovered;
}

function mapPrefixToFile(code: string): string {
  const prefix = code.split(' ')[0];
  switch (prefix) {
    case 'SS_PA':
      return 'clinical_paed_01.json';
    case 'SS_IC':
      return 'clinical_intensive_care_01.json';
    case 'SS_OB':
      return 'clinical_obstetrics_01.json';
    case 'SS_CS':
      return 'clinical_cardiac_01.json';
    case 'SS_NS':
      return 'clinical_neuro_01.json';
    case 'SS_OR':
      return 'clinical_ortho_01.json';
    case 'SS_VS':
      return 'clinical_vascular_01.json';
    case 'SS_TS':
      return 'clinical_thoracic_01.json';
    case 'AT_RA':
    case 'BT_RA':
      return 'clinical_regional_01.json';
    case 'AT_PM':
    case 'BT_PM':
      return 'clinical_pain_01.json';
    case 'SS_HN':
      return 'clinical_head_neck_01.json';
    case 'SS_PB':
      return 'clinical_plastics_01.json';
    case 'SS_GG':
      return 'clinical_general_surg_01.json';
    case 'SS_OP':
      return 'clinical_ophthalmology_01.json';
    default:
      return 'clinical_fundamentals_01.json';
  }
}

function ensureFileExists(filename: string) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    const template = {
      moduleId: filename.replace('.json', ''),
      moduleTitle: filename.replace('.json', '').replace(/_/g, ' ').toUpperCase(),
      description: `Generated nodes for ${filename}`,
      tags: ['generated'],
      concepts: []
    };
    fs.writeFileSync(filepath, JSON.stringify(template, null, 2), 'utf-8');
    console.log(`Created new database file: ${filename}`);
  }
}

async function runBatch() {
  const args = process.argv.slice(2);
  let limit = 0;
  let prefixFilter = '';
  let delayMs = 0;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit') limit = parseInt(args[++i], 10);
    if (args[i] === '--prefix') prefixFilter = args[++i];
    if (args[i] === '--delay') delayMs = parseInt(args[++i], 10);
  }

  const uncovered = getUncoveredObjectives();
  console.log(`Found ${uncovered.length} uncovered objectives total.`);

  let targetObjs = uncovered;
  if (prefixFilter) {
    targetObjs = targetObjs.filter((o) => o.code.startsWith(prefixFilter));
  }

  console.log(`Targeting ${targetObjs.length} objectives for processing.`);
  if (limit > 0 && limit < targetObjs.length) {
    targetObjs = targetObjs.slice(0, limit);
    console.log(`Limiting run to ${limit} items.`);
  }

  if (targetObjs.length === 0) {
    console.log('No objectives to process.');
    return;
  }

  let successCount = 0;
  for (let i = 0; i < targetObjs.length; i++) {
    const obj = targetObjs[i];
    const targetFile = mapPrefixToFile(obj.code);
    ensureFileExists(targetFile);

    console.log(`\n======================================================`);
    console.log(`[${i + 1}/${targetObjs.length}] Processing ${obj.code} -> ${targetFile}`);
    console.log(`Objective: ${obj.text}`);
    console.log(`======================================================\n`);

    try {
      execSync(
        `npx tsx scripts/generateContent.ts --objective "${obj.code}" --file "${targetFile}"`,
        { stdio: 'inherit' }
      );
      successCount++;
    } catch (e: any) {
      console.error(`\n❌ Failed generating for ${obj.code}:`, e.message);
    }

    if (i < targetObjs.length - 1 && delayMs > 0) {
      console.log(`⏳ Sleeping for ${delayMs / 1000} seconds to respect API rate limits...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  console.log(
    `\nBatch process complete. Successfully processed ${successCount}/${targetObjs.length} items.`
  );
}

runBatch().catch(console.error);
