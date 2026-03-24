const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';
process.chdir(projectDir);

console.log('===== STEP 1: Navigate to project directory =====');
console.log('Current directory:', process.cwd());
console.log('');

// Step 2: Create all directories
const directories = [
  'app\\lib',
  'app\\api\\newsletters\\[id]',
  'app\\write',
  'app\\newsletters\\[id]',
  'app\\components'
];

console.log('===== STEP 2: Create all directories =====');
directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${dir}`);
  } else {
    console.log(`Exists: ${dir}`);
  }
});
console.log('');

// Step 3: Copy files
const files_to_copy = [
  ['lib.db.ts', 'app\\lib\\db.ts'],
  ['api.newsletters.route.ts', 'app\\api\\newsletters\\route.ts'],
  ['api.newsletters.[id].route.ts', 'app\\api\\newsletters\\[id]\\route.ts'],
  ['app.write.page.tsx', 'app\\write\\page.tsx'],
  ['app.newsletter.[id].page.tsx', 'app\\newsletters\\[id]\\page.tsx'],
  ['components.NewsletterCard.tsx', 'app\\components\\NewsletterCard.tsx'],
  ['components.PasswordModal.tsx', 'app\\components\\PasswordModal.tsx'],
];

console.log('===== STEP 3: Copy all files to their destination locations =====');
files_to_copy.forEach(([src, dst]) => {
  const srcPath = path.join(process.cwd(), src);
  const dstPath = path.join(process.cwd(), dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`Copied: ${src} -> ${dst}`);
  } else {
    console.log(`ERROR: Source file not found: ${src}`);
  }
});
console.log('');

// Step 4: Verify structure
console.log('===== STEP 4: Verify structure =====');
console.log('Directory listing (filtered for .ts and .tsx files):');
const walkDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      console.log(fullPath.replace(process.cwd() + '\\', ''));
    }
  });
};
walkDir(path.join(process.cwd(), 'app'));
console.log('');

console.log('===== REORGANIZATION COMPLETE =====');
