import fs from 'fs';

const pngBase64 = fs.readFileSync('public/logo-mark.png').toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <image href="data:image/png;base64,${pngBase64}" width="100" height="100" />
</svg>`;

fs.writeFileSync('public/favicon.svg', svgContent);
console.log('Updated public/favicon.svg with embedded base64 logo-mark.png!');
