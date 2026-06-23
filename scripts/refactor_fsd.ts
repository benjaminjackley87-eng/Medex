import { Project } from 'ts-morph';
import path from 'path';
import fs from 'fs';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json'
});

['src/pages', 'src/features', 'src/components/common', 'src/components/ui'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Refactoring to Industry Standard FSD...');

// 1. Move root views to src/pages
const viewsDir = project.getDirectory('src/views');
if (viewsDir) {
  const sourceFiles = viewsDir.getSourceFiles();
  
  for (const file of sourceFiles) {
    const baseName = file.getBaseName();
    console.log(`Moving ${baseName} to pages/`);
    file.moveToDirectory(path.resolve(process.cwd(), 'src/pages'));
  }

  // Handle directories in views
  const dirs = viewsDir.getDirectories();
  for (const dir of dirs) {
    const baseName = dir.getBaseName();
    console.log(`Moving feature directory ${baseName} to features/`);
    try {
        dir.move(path.resolve(process.cwd(), 'src/features', baseName));
    } catch(e:any) {
        console.error(`Error moving ${baseName}:`, e.message);
    }
  }
}

// 2. Move components/Suites, components/investigationHub, components/calculators to features
const componentsDir = project.getDirectory('src/components');
if (componentsDir) {
  const featuresToMove = ['Suites', 'investigationHub', 'calculators'];
  for (const feature of featuresToMove) {
    const dir = componentsDir.getDirectory(feature);
    if (dir) {
      console.log(`Moving component feature ${feature} to features/`);
      try {
        dir.move(path.resolve(process.cwd(), 'src/features', feature));
      } catch(e:any) {
        console.error(`Error moving ${feature}:`, e.message);
      }
    }
  }

  // Move remaining files in components/ to components/common/ unless they are already in ui/ or common/
  const looseFiles = componentsDir.getSourceFiles();
  for (const file of looseFiles) {
    if (file.getBaseName() === 'LibraryView.test.tsx') {
      console.log('Moving LibraryView.test.tsx to pages/');
      file.moveToDirectory(path.resolve(process.cwd(), 'src/pages'));
    } else {
      console.log(`Moving loose component ${file.getBaseName()} to common/`);
      file.moveToDirectory(path.resolve(process.cwd(), 'src/components/common'));
    }
  }
}

console.log('Saving changes. ts-morph will auto-update all imports...');
project.saveSync();
console.log('✅ Done!');
