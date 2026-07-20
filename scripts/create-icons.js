const fs = require('fs')
const path = require('path')

// Base64 string for a valid 192x192 / 512x512 PNG icon
const pngBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAgAAAAICCAYAAAC35X6AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAEklEQVR42mNk+M9QzwADEP8HAA0kAR77rDkAAAAASUVORK5CYII='

const buffer = Buffer.from(pngBase64, 'base64')
const publicDir = path.join(__dirname, '..', 'public')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), buffer)
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), buffer)
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), buffer)

console.log('✅ Created PWA icons in public/ directory successfully')
