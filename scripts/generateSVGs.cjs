const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'assets', 'placeholders');
fs.mkdirSync(dir, { recursive: true });

function makeSvg(width, height, text, bg) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bg}" />
    <text x="50%" y="50%" font-family="sans-serif" font-size="${height / 10}px" font-weight="bold" fill="rgba(255,255,255,0.7)" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
}

fs.writeFileSync(
  path.join(dir, 'procedure-main.svg'),
  makeSvg(800, 600, 'Procedure Overview', '#0f172a')
);
fs.writeFileSync(
  path.join(dir, 'procedure-step.svg'),
  makeSvg(800, 600, 'Procedure Step', '#0f172a')
);
fs.writeFileSync(path.join(dir, 'avatar.svg'), makeSvg(100, 100, 'AV', '#334155'));
fs.writeFileSync(path.join(dir, 'ctg-monitor.svg'), makeSvg(800, 450, 'CTG Monitor', '#0f172a'));
fs.writeFileSync(
  path.join(dir, 'fetal-ultrasound.svg'),
  makeSvg(800, 450, 'Fetal Ultrasound', '#0f172a')
);
fs.writeFileSync(path.join(dir, 'labor-ward.svg'), makeSvg(800, 450, 'Labor Ward', '#0f172a'));
fs.writeFileSync(path.join(dir, 'ctg-case.svg'), makeSvg(400, 200, 'CTG Case', '#0f172a'));
fs.writeFileSync(
  path.join(dir, 'clinical-presentation.svg'),
  makeSvg(800, 600, 'Clinical Presentation', '#0f172a')
);
fs.writeFileSync(path.join(dir, 'exam-step.svg'), makeSvg(800, 600, 'Exam Step', '#0f172a'));

console.log('SVGs generated successfully.');
