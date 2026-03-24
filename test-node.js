#!/usr/bin/env node
// Quick test to see if script can execute
console.log('Node.js is available!');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

const fs = require('fs');
const path = require('path');

// Try to create a simple test directory
const testDir = path.join(process.cwd(), 'app', 'lib');
const testDir2 = path.join(process.cwd(), 'app', 'api', 'newsletters', '[id]');

try {
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    console.log('✓ Successfully created:', testDir);
  } else {
    console.log('✓ Directory already exists:', testDir);
  }
  
  if (!fs.existsSync(testDir2)) {
    fs.mkdirSync(testDir2, { recursive: true });
    console.log('✓ Successfully created:', testDir2);
  } else {
    console.log('✓ Directory already exists:', testDir2);
  }
} catch (err) {
  console.error('✗ Error:', err.message);
}
