const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

const directories = [
  path.join(baseDir, 'app\\lib'),
  path.join(baseDir, 'app\\api\\newsletters\\[id]'),
  path.join(baseDir, 'app\\write'),
  path.join(baseDir, 'app\\newsletters\\[id]'),
  path.join(baseDir, 'app\\components')
];

directories.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created: ${dir}`);
});

console.log('All directories created successfully!');
