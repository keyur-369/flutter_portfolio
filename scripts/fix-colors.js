const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const replaceColors = (filePath) => {
  if (filePath.includes('admin\\settings\\page.tsx') || filePath.includes('admin/settings/page.tsx')) return;
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.css') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Primary
  content = content.replace(/#FE7F2D/gi, 'hsl(var(--primary))');
  content = content.replace(/rgba\(254,\s*127,\s*45,\s*([0-9.]+)\)/gi, 'hsl(var(--primary) / $1)');
  
  // Primary variants
  content = content.replace(/#ffb347/gi, 'hsl(var(--primary) / 0.9)');
  content = content.replace(/#ff9a55/gi, 'hsl(var(--primary) / 0.8)');
  content = content.replace(/#e06520/gi, 'hsl(var(--primary) / 0.9)');

  // Secondary
  content = content.replace(/#233D4D/gi, 'hsl(var(--secondary))');
  content = content.replace(/rgba\(35,\s*61,\s*77,\s*([0-9.]+)\)/gi, 'hsl(var(--secondary) / $1)');

  // Secondary variants
  content = content.replace(/#2d4f63/gi, 'hsl(var(--secondary) / 0.8)');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
};

walkDir(path.join(__dirname, 'app'), replaceColors);
walkDir(path.join(__dirname, 'components'), replaceColors);
