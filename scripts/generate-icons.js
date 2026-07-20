const fs = require('fs');
const path = require('path');

// A valid 1x1 transparent PNG expanded to valid image bytes
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAgAAAAICCAYAAAC35X6AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAEklEQVR42mNk+M9QzwADEP8HAA0kAR77rDkAAAAASUVORK5CYII=';

const buffer = Buffer.from(pngBase64, 'base64');

const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), buffer);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), buffer);

console.log('✅ Generated PWA icons in public/icon-192.png and public/icon-512.png');
