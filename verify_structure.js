const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

const requiredFiles = [
  'app\\lib\\db.ts',
  'app\\api\\newsletters\\route.ts',
  'app\\api\\newsletters\\[id]\\route.ts',
  'app\\write\\page.tsx',
  'app\\newsletters\\[id]\\page.tsx',
  'app\\components\\NewsletterCard.tsx',
  'app\\components\\PasswordModal.tsx',
  'app\\layout.tsx',
  'app\\page.tsx',
  'app\\globals.css'
];

console.log('=== STRUCTURE VERIFICATION ===\n');

const missingFiles = [];
const presentFiles = [];

requiredFiles.forEach(file => {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file}`);
    presentFiles.push(file);
  } else {
    console.log(`✗ MISSING: ${file}`);
    missingFiles.push(file);
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total Required: ${requiredFiles.length}`);
console.log(`Present: ${presentFiles.length}`);
console.log(`Missing: ${missingFiles.length}`);

if (missingFiles.length === 0) {
  console.log('\n✓ All files are in correct locations!');
} else {
  console.log('\n✗ Missing files:');
  missingFiles.forEach(f => console.log(`  - ${f}`));
}

// Check imports in key files
console.log('\n=== CHECKING IMPORTS ===\n');

const files = {
  'app\\page.tsx': ['@/components/PasswordModal', '@/components/NewsletterCard'],
  'app\\write\\page.tsx': ['@/components/PasswordModal'],
  'app\\newsletters\\[id]\\page.tsx': ['@/components/PasswordModal', 'react-markdown'],
  'app\\api\\newsletters\\route.ts': ['@/lib/db'],
  'app\\api\\newsletters\\[id]\\route.ts': ['@/lib/db'],
};

Object.entries(files).forEach(([file, imports]) => {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(`Checking ${file}:`);
    imports.forEach(imp => {
      if (content.includes(imp)) {
        console.log(`  ✓ "${imp}"`);
      } else {
        console.log(`  ✗ "${imp}" - NOT FOUND`);
      }
    });
  }
});

console.log('\n=== VERIFICATION COMPLETE ===');
