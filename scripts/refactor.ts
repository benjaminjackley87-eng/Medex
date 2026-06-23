import { Project } from 'ts-morph';
import fs from 'fs';
import path from 'path';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json'
});

console.log('Starting refactoring process...');

// 1. Move root TypeScript files into src/
const rootFilesToMove = ['App.tsx', 'index.tsx', 'constants.ts', 'types.ts', 'theme.ts'];

for (const fileName of rootFilesToMove) {
  const sourceFile = project.getSourceFile(fileName);
  if (sourceFile) {
    console.log(`Moving ${fileName} to src/`);
    sourceFile.moveToDirectory('src');
  } else {
    console.log(`Source file ${fileName} not found in project.`);
  }
}

// 2. Move core directories into src/
const foldersToMove = [
  'components',
  'hooks',
  'utils',
  'services',
  'store',
  'data',
  'types' // Wait, the root file is types.ts, there is also a types directory? Oh I should check.
];

for (const folderName of foldersToMove) {
  const dir = project.getDirectory(folderName);
  if (dir) {
    console.log(`Moving directory ${folderName} to src/${folderName}`);
    const destPath = path.resolve('src', folderName).replace(/\\/g, '/');
    dir.move(destPath);
  } else {
    console.log(`Directory ${folderName} not found in project.`);
  }
}

// 3. Move CSS and other non-TS files
if (fs.existsSync('index.css')) {
  if (!fs.existsSync('src')) fs.mkdirSync('src');
  fs.renameSync('index.css', 'src/index.css');
  console.log('Moved index.css to src/index.css');
}

// 4. Save intermediate progress to let ts-morph resolve new paths
project.saveSync();
console.log('Intermediate save complete.');

// Now reload project to find files in their new locations for Phase 2 (Views separation)
const project2 = new Project({
  tsConfigFilePath: 'tsconfig.json'
});

// Create views directory
const srcDir = project2.getDirectory('src');
if (srcDir) {
  const viewsDir = srcDir.getDirectory('views') || srcDir.createDirectory('views');

  const componentsDir = project2.getDirectory('src/components');
  if (componentsDir) {
    console.log('Separating Views from Components...');
    // Identify View components
    const viewFiles = componentsDir.getSourceFiles().filter((f) => {
      const name = f.getBaseName();
      return (
        name.endsWith('View.tsx') ||
        name.includes('Explorer') ||
        name === 'TherapeuticNavigator.tsx' ||
        name === 'TherapeuticNavigator.test.tsx' ||
        name === 'SymptomChecker.tsx' ||
        name === 'ClinicalFinder.tsx' ||
        name === 'DevAssistant.tsx'
      );
    });

    for (const file of viewFiles) {
      console.log(`Moving ${file.getBaseName()} to src/views/`);
      file.moveToDirectory(viewsDir);
    }
  }

  // Same for any subdirectories in components that are purely view-related
  const viewSubDirs = [
    'ClinicalCorrelationView',
    'ClinicalWorkspace',
    'Exam',
    'ExamView',
    'ProceduresView',
    'sciencesExplorer'
  ];
  for (const subDirName of viewSubDirs) {
    const subDir = project2.getDirectory(`src/components/${subDirName}`);
    if (subDir) {
      console.log(`Moving directory ${subDirName} to src/views/`);
      const destPath = path.resolve('src', 'views', subDirName).replace(/\\/g, '/');
      subDir.move(destPath);
    }
  }

  project2.saveSync();
  console.log('Refactoring complete!');
} else {
  console.log('Error: src directory not found for Phase 2.');
}
