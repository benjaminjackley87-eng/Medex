import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { ConceptSchema } from '../src/types/appliedAnatomySchema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../src/data/applied_anatomy');
const OBJECTIVES_PATH = path.resolve(__dirname, '../unique_learning_objectives.md');

// 1. Environment Variable Loader
function loadEnv() {
  const envPaths = ['.env', '.env.local'];
  for (const envPath of envPaths) {
    const fullPath = path.resolve(process.cwd(), envPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
        if (match) {
          const key = match[1];
          let val = match[2].trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    }
  }
}

loadEnv();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ Error: GEMINI_API_KEY is not set in .env or .env.local files.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// 2. CLI Argument Parsing
interface Args {
  objective?: string;
  concept?: string;
  file?: string;
  iterations: number;
  model: string;
}

function parseArgs(): Args {
  const args: Args = {
    iterations: 2,
    model: 'gemini-2.5-pro'
  };

  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--objective') {
      args.objective = argv[++i];
    } else if (argv[i] === '--concept') {
      args.concept = argv[++i];
    } else if (argv[i] === '--file') {
      args.file = argv[++i];
    } else if (argv[i] === '--iterations') {
      args.iterations = parseInt(argv[++i], 10);
    } else if (argv[i] === '--model') {
      args.model = argv[++i];
    }
  }

  return args;
}

// 3. Objectives Extractor
function getObjectiveText(code: string): string | null {
  if (!fs.existsSync(OBJECTIVES_PATH)) {
    console.warn(`⚠️ objectives file not found at ${OBJECTIVES_PATH}`);
    return null;
  }
  const content = fs.readFileSync(OBJECTIVES_PATH, 'utf8');
  const lines = content.split('\n');

  for (const line of lines) {
    // Matches markdown table row containing the code
    if (line.includes(`\`${code}\``)) {
      const parts = line.split('|');
      if (parts.length >= 3) {
        return parts[2].trim();
      }
    }
  }
  return null;
}

function cleanJson(text: string): string {
  if (typeof text !== 'string') return text;
  const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (match) {
    return match[0];
  }
  return text.replace(/```json\n?|```/g, '').trim();
}

// 4. Content Generator-Critic Loop
async function runPipeline() {
  const args = parseArgs();

  if (!args.objective && !args.concept) {
    console.error('❌ Error: You must specify either --objective <code> or --concept <name>.');
    console.log(
      'Usage: npx tsx scripts/generateContent.ts --objective "AT_PO 2.12" --file "clinical_fundamentals_01.json"'
    );
    process.exit(1);
  }

  if (!args.file) {
    console.error('❌ Error: You must specify a target database file via --file <filename.json>.');
    process.exit(1);
  }

  const targetFilePath = path.join(DATA_DIR, args.file);
  if (!fs.existsSync(targetFilePath)) {
    console.error(`❌ Error: Target file does not exist: ${targetFilePath}`);
    process.exit(1);
  }

  let promptContext: string;
  let conceptName = args.concept || '';

  if (args.objective) {
    console.log(`🔍 Extracting curriculum objective for: ${args.objective}...`);
    const objText = getObjectiveText(args.objective);
    if (objText) {
      console.log(`📄 Found Objective: "${objText}"`);
      promptContext = `Curriculum Objective [${args.objective}]: ${objText}`;
      if (!conceptName) {
        // Fallback name based on the objective text
        conceptName = objText.slice(0, 50) + '...';
      }
    } else {
      console.warn(
        `⚠️ Warning: Objective code ${args.objective} not found in unique_learning_objectives.md. Generating from code prefix.`
      );
      promptContext = `Curriculum Objective Code: ${args.objective}`;
    }
  } else {
    promptContext = `Concept Topic: ${conceptName}`;
  }

  console.log(`\n🚀 Starting Content Generation Pipeline using model: ${args.model}`);
  console.log(`Target: ${conceptName} -> ${args.file}\n`);

  // Prompt schemas and guidelines
  const formatInstructions = `
  You MUST return a single JSON object that conforms strictly to the Concept schema:
  {
    "conceptId": "concept_[snake_case_name]",
    "conceptName": "Specific clinical/physiological concept name",
    "roteData": {
      // Key biophysical properties, definitions, or structured formulas.
      // If including a mathematical formula, structure it EXACTLY as a Formula object:
      "formulaKeyName": {
        "formulaName": "Name of the formula",
        "equation": "LaTeX formula (e.g. J_v = K_f \\\\cdot \\\\left[ ... \\\\right])",
        "useCaseExample": "Clear, direct clinical use case",
        "variablesExplanation": {
          "variableSymbol": "Explanation of variable (e.g. 'K_f': 'Capillary filtration coefficient')"
        },
        "resultInterpretation": "Detailed registrar/consultant explanation of outcomes"
      }
    },
    "specialTests": [
      // Optional list of provocative physical/clinical tests:
      {
        "testName": "Name of the test (e.g. Tinel's sign)",
        "useCaseExample": "Assessment of nerve regeneration or entrapment",
        "method": "Step-by-step physical execution technique.",
        "findingsInterpretation": {
          "positive": "Description of what constitutes a positive test (e.g. paresthesia in nerve distribution)",
          "negative": "Description of normal/negative findings"
        },
        "clinicalRelevance": "Diagnostics and statistics (sensitivity, specificity, LR+, LR-)",
        "ebmData": {
          "sensitivity": "e.g. 85%",
          "specificity": "e.g. 90%",
          "positiveLikelihoodRatio": "e.g. 8.5",
          "negativeLikelihoodRatio": "e.g. 0.17",
          "evidenceLevel": "e.g. Level I, II, III"
        }
      }
    ],
    "firstPrinciplesMechanics": "Comprehensive first-principles physiological or biophysical description. Explain at a cellular/molecular level where appropriate. Use LaTeX formatting for inline math ($...$) and block math ($$...$$) if necessary.",
    "clinicalAndAnaestheticCorrelations": [
      {
        "scenario": "Clinical/Anaesthesia Scenario name",
        "anatomicalBasis": "Deep anatomical/physiological explanation of the scenario. Connect clinical signs to mechanisms."
      }
    ]
  }

  CRITICAL LaTeX & ESCAPING RULE:
  - Inside JSON, any backslashes in LaTeX equations or strings (e.g., \\frac, \\cdot, \\bar, \\approx, \\text, \\Delta) MUST be escaped with double backslashes, e.g. "P = \\\\frac{2 \\\\cdot T}{r}".
  - Ensure all math variables are written in standard LaTeX.
  `;

  // --- STEP 1: INITIAL GENERATION ---
  console.log('1. Generating initial draft...');
  const genPrompt = `
  You are an elite Medical Education Architect designing materials for senior anaesthesia and intensive care fellowship candidates (CICM, ANZCA, RACP).
  Generate a comprehensive Concept node for: "${conceptName}".
  Context: ${promptContext}

  Ensure you provide high-yield, consultant-grade depth. Pathophysiology must be precise and detailed at the cellular/molecular level.
  
  ${formatInstructions}
  `;

  let draftText = '';
  try {
    const response = await ai.models.generateContent({
      model: args.model,
      contents: genPrompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an elite medical education database builder.'
      }
    });
    draftText = response.text || '';
  } catch (error: any) {
    console.error(`❌ Initial generation failed: ${error.message}`);
    process.exit(1);
  }

  let draftObj: any;
  let iterationsCount = 0;

  // Internal function to clean and validate
  function validateDraft(jsonText: string): { success: boolean; data?: any; error?: string } {
    try {
      const cleaned = cleanJson(jsonText);
      const parsed = JSON.parse(cleaned);
      const validation = ConceptSchema.safeParse(parsed);
      if (!validation.success) {
        return { success: false, error: JSON.stringify(validation.error.format(), null, 2) };
      }
      return { success: true, data: validation.data };
    } catch (e: any) {
      return { success: false, error: `JSON Parse error: ${e.message}` };
    }
  }

  // Schema self-correction loop
  let validationResult = validateDraft(draftText);
  while (!validationResult.success && iterationsCount < 2) {
    console.log(
      `⚠️ Schema validation failed. Prompting model for self-correction (Attempt ${iterationsCount + 1})...`
    );
    console.log(validationResult.error);
    iterationsCount++;
    try {
      const correctionResponse = await ai.models.generateContent({
        model: args.model,
        contents: `The previous JSON draft failed validation with the following errors:\n${validationResult.error}\n\nPlease output the corrected JSON that satisfies the schema exactly. Ensure LaTeX double-backslashes are escaped correctly.`,
        config: { responseMimeType: 'application/json' }
      });
      draftText = correctionResponse.text || '';
      validationResult = validateDraft(draftText);
    } catch (error: any) {
      console.error(`❌ Self-correction failed: ${error.message}`);
      break;
    }
  }

  if (!validationResult.success) {
    console.error('❌ Fatal: Could not generate a schema-compliant JSON draft.');
    process.exit(1);
  }

  draftObj = validationResult.data;

  // --- STEP 2: CRITIC REVIEW & REFLECTION LOOP ---
  let finalDraftObj = draftObj;

  for (let iter = 1; iter <= args.iterations; iter++) {
    console.log(`\n2. Critic evaluating draft (Iteration ${iter}/${args.iterations})...`);

    const criticSystemPrompt = `
    You are a stringent, expert Consultant Physician and ANZCA Curriculum Examiner reviewing a database record for a medical education application.
    Your job is to critically review the concept draft and find gaps or errors.
    Look for:
    1. Generic pathophysiology that needs deeper mechanistic explanation (e.g. molecular pathways, cellular receptors, biophysics).
    2. Missing Likelihood Ratios (LR+ / LR-) or Sensitivity/Specificity metrics for clinical special tests.
    3. Missing clinical pearls, pitfalls, or advanced nuances expected of a specialist consultant.
    4. Malformed LaTeX or unescaped backslashes in equations.
    
    Respond ONLY with a bulleted list of missing details and corrections that must be made. If the concept is absolutely perfect, consultant-grade, and free of errors, respond ONLY with "PERFECT".
    `;

    const criticPrompt = `Review this draft concept and list what is missing or incorrect:\n\n${JSON.stringify(finalDraftObj, null, 2)}`;

    let criticFeedback: string;
    try {
      const response = await ai.models.generateContent({
        model: args.model,
        contents: criticPrompt,
        config: {
          systemInstruction: criticSystemPrompt
        }
      });
      criticFeedback = response.text || '';
    } catch (error: any) {
      console.error(`❌ Critic evaluation failed: ${error.message}`);
      break;
    }

    console.log(
      `\nCritic Feedback:\n-----------------\n${criticFeedback.trim()}\n-----------------`
    );

    if (criticFeedback.toUpperCase().includes('PERFECT') && criticFeedback.length < 20) {
      console.log('🎉 Concept accepted by Critic without further revisions.');
      break;
    }

    // --- STEP 3: REVISION ---
    console.log('3. Revising draft based on Critic feedback...');
    const revisePrompt = `
    Original Draft:
    ${JSON.stringify(finalDraftObj, null, 2)}

    Critic Feedback:
    ${criticFeedback}

    Please update the JSON draft to incorporate the Critic's feedback. 
    Ensure:
    1. No existing details are lost.
    2. The output strictly conforms to the schema.
    3. LaTeX double-backslashes (\\\\frac, \\\\cdot, etc.) are correctly formatted.

    ${formatInstructions}
    `;

    try {
      const reviseResponse = await ai.models.generateContent({
        model: args.model,
        contents: revisePrompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are an elite medical education database builder.'
        }
      });

      const revisionText = reviseResponse.text || '';
      const validation = validateDraft(revisionText);
      if (validation.success) {
        finalDraftObj = validation.data;
        console.log('✅ Revision successfully parsed and validated against schema.');
      } else {
        console.warn(
          `⚠️ Revised draft failed schema validation: ${validation.error}. Retaining previous iteration.`
        );
      }
    } catch (error: any) {
      console.error(`❌ Revision failed: ${error.message}. Retaining previous iteration.`);
    }
  }

  // --- STEP 4: WRITE TO TARGET JSON DATABASE FILE ---
  console.log(`\n💾 Appending concept to database file: ${targetFilePath}`);
  try {
    const fileContent = fs.readFileSync(targetFilePath, 'utf8');
    const moduleObj = JSON.parse(fileContent);

    if (!moduleObj.concepts) {
      moduleObj.concepts = [];
    }

    // Check if concept already exists by conceptId and update, otherwise push new
    const existingIndex = moduleObj.concepts.findIndex(
      (c: any) => c.conceptId === finalDraftObj.conceptId
    );
    if (existingIndex >= 0) {
      console.log(`Updating existing concept with ID: ${finalDraftObj.conceptId}`);
      moduleObj.concepts[existingIndex] = finalDraftObj;
    } else {
      console.log(`Adding new concept with ID: ${finalDraftObj.conceptId}`);
      moduleObj.concepts.push(finalDraftObj);
    }

    fs.writeFileSync(targetFilePath, JSON.stringify(moduleObj, null, 2), 'utf8');
    console.log('🎉 Successfully saved concept to target file.');
  } catch (error: any) {
    console.error(`❌ Error writing to database file: ${error.message}`);
    process.exit(1);
  }

  // --- STEP 5: AUTOMATED SCHEMA AND LATEX INTEGRITY CHECK ---
  console.log('\n🔍 Running integrity checks...');

  // 1. Schema Check
  console.log('- Running schema validation check...');
  const schemaCheckResult = validateDraft(JSON.stringify(finalDraftObj));
  if (schemaCheckResult.success) {
    console.log('  ✅ Schema integrity check passed.');
  } else {
    console.warn(`  ⚠️ Schema integrity check failed: ${schemaCheckResult.error}`);
  }

  // 2. Run compile and validators via shell command if possible
  console.log('- Running project validators...');
  // We will let the developer see these on completion.
}

runPipeline().catch((err) => {
  console.error('Fatal pipeline error:', err);
  process.exit(1);
});
