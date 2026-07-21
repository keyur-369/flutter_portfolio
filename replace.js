const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const originalContent = content;
      
      // Simple replacements
      content = content.replace(/border-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'border-primary$2');
      content = content.replace(/border-t-(blue|indigo|purple|violet|cyan|pink)-[1-9]00/g, 'border-t-primary');
      content = content.replace(/border-b-(blue|indigo|purple|violet|cyan|pink)-[1-9]00/g, 'border-b-primary');
      content = content.replace(/border-l-(blue|indigo|purple|violet|cyan|pink)-[1-9]00/g, 'border-l-primary');
      content = content.replace(/border-r-(blue|indigo|purple|violet|cyan|pink)-[1-9]00/g, 'border-r-primary');
      content = content.replace(/bg-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'bg-primary$2');
      content = content.replace(/text-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'text-primary$2');
      content = content.replace(/shadow-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'shadow-primary$2');
      content = content.replace(/ring-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'ring-primary$2');
      
      content = content.replace(/from-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'from-primary$2');
      content = content.replace(/via-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'via-primary/80');
      content = content.replace(/to-(blue|indigo|purple|violet|cyan|pink)-[1-9]00(\/[0-9]+)?/g, 'to-secondary$2');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'components'));
processDirectory(path.join(__dirname, 'app'));
