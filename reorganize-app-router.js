const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

// Define file mappings
const fileMappings = [
  { src: 'lib.db.ts', dest: 'lib\\db.ts' },
  { src: 'api.newsletters.route.ts', dest: 'api\\newsletters\\route.ts' },
  { src: 'api.newsletters.[id].route.ts', dest: 'api\\newsletters\\[id]\\route.ts' },
  { src: 'write.page.tsx', dest: 'write\\page.tsx' },
  { src: 'newsletter.[id].page.tsx', dest: 'newsletters\\[id]\\page.tsx' },
  { src: 'components.NewsletterCard.tsx', dest: 'components\\NewsletterCard.tsx' },
  { src: 'components.PasswordModal.tsx', dest: 'components\\PasswordModal.tsx' }
];

// Create directories
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

console.log('Creating directories...');
dirsToCreate.forEach(dir => {
  const fullPath = path.join(appDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  } else {
    console.log(`  Already exists: ${dir}`);
  }
});

console.log('\nCopying files...');
fileMappings.forEach(mapping => {
  const srcPath = path.join(appDir, mapping.src);
  const destPath = path.join(appDir, mapping.dest);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied: ${mapping.src} → ${mapping.dest}`);
  } else {
    console.log(`✗ Source not found: ${mapping.src}`);
  }
});

console.log('\nVerifying final structure...');
const verifyStructure = () => {
  const expectedPaths = [
    'lib\\db.ts',
    'api\\newsletters\\route.ts',
    'api\\newsletters\\[id]\\route.ts',
    'write\\page.tsx',
    'newsletters\\[id]\\page.tsx',
    'components\\NewsletterCard.tsx',
    'components\\PasswordModal.tsx'
  ];

  let allExist = true;
  expectedPaths.forEach(pathStr => {
    const fullPath = path.join(appDir, pathStr);
    if (fs.existsSync(fullPath)) {
      console.log(`✓ Verified: ${pathStr}`);
    } else {
      console.log(`✗ Missing: ${pathStr}`);
      allExist = false;
    }
  });

  return allExist;
};

const structureValid = verifyStructure();

console.log('\n' + '='.repeat(60));
if (structureValid) {
  console.log('✓ All files successfully reorganized!');
} else {
  console.log('✗ Some files are missing. Check above.');
}
console.log('='.repeat(60));

// List the final app directory structure
console.log('\nFinal app/ directory structure:');
const listDir = (dir, prefix = '') => {
  const items = fs.readdirSync(dir);
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isDir = fs.statSync(fullPath).isDirectory();
    const isLast = index === items.length - 1;
    console.log(prefix + (isLast ? '└── ' : '├── ') + item + (isDir ? '/' : ''));
    if (isDir && prefix.length < 12) {
      listDir(fullPath, prefix + (isLast ? '    ' : '│   '));
    }
  });
};

listDir(appDir);
