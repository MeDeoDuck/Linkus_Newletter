const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

// Directory structure to create
const dirsToCreate = [
  'lib',
  'api',
  'api\\newsletters',
  'api\\newsletters\\[id]',
  'write',
  'newsletters',
  'newsletters\\[id]',
  'components'
];

console.log('Creating directories...\n');

// Create all directories
dirsToCreate.forEach(dir => {
  const fullPath = path.join(appDir, dir);
  try {
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✓ Created: ${dir}`);
    } else {
      console.log(`  Already exists: ${dir}`);
    }
  } catch (err) {
    console.error(`✗ Error creating ${dir}: ${err.message}`);
  }
});

console.log('\nDirectory creation complete!');
