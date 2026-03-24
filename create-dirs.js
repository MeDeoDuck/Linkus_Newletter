#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dirs = [
  'app/api/newsletters/[id]',
  'app/write',
  'app/newsletters/[id]',
  'app/components',
  'app/lib'
];

const base = path.join(__dirname);

dirs.forEach(dir => {
  const fullPath = path.join(base, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

console.log('Done');
