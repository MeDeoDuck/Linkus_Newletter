const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Create directory structure
const dirs = [
  'app/lib',
  'app/api/newsletters/[id]',
  'app/write',
  'app/newsletters/[id]',
  'app/components',
];

dirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

console.log('\nAll directories created successfully!');
