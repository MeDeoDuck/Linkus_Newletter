#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define all directories that need to be created
const directories = [
  'app/api/newsletters/[id]',
  'app/newsletter/[id]',
  'app/write',
  'components',
  'lib'
];

// Create directories
console.log('Creating directory structure...');
directories.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  }
});

console.log('\nDirectory structure created successfully!');
console.log('\nNext steps:');
console.log('1. Run: npm install');
console.log('2. Ensure all TypeScript files are in place (check README)');
console.log('3. Run: npm run dev');
