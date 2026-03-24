#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const baseDir = process.cwd();

console.log('='.repeat(70));
console.log('PROJECT CLEANUP AND BUILD VERIFICATION');
console.log('='.repeat(70));
console.log();

// Files to delete
const filesToDelete = [
  // Root
  'api.newsletters.route.ts',
  'api.newsletters.[id].route.ts',
  'lib.db.ts',
  'temp_lib_db.ts',
  'app.write.page.tsx',
  'app.newsletter.[id].page.tsx',
  'components.PasswordModal.tsx',
  'components.NewsletterCard.tsx',
  'NewsletterDetailPage.tsx',
  'WritePage.tsx',
  // app/
  'app/api.newsletters.route.ts',
  'app/api.newsletters.[id].route.ts',
  'app/db.ts',
  'app/lib.db.ts',
  'app/DeleteRoute.ts',
  'app/write.page.tsx',
  'app/PasswordModal.tsx',
  'app/components.PasswordModal.tsx',
  'app/components.NewsletterCard.tsx',
  'app/NewsletterCard.tsx',
  'app/newsletter.[id].page.tsx',
  'app/page_home.tsx',
  'app/db_code.txt',
];

console.log('STEP 1: Deleting Duplicate Files');
console.log('-'.repeat(70));

let deletedCount = 0;
filesToDelete.forEach(file => {
  const fullPath = path.join(baseDir, file);
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`  ✓ ${file}`);
      deletedCount++;
    }
  } catch (error) {
    console.error(`  ✗ ${file}: ${error.message}`);
  }
});

console.log();
console.log(`Deleted ${deletedCount} files`);
console.log();

console.log('STEP 2: Verifying Required Files');
console.log('-'.repeat(70));

const requiredFiles = [
  'app/api/newsletters/route.ts',
  'app/api/newsletters/[id]/route.ts',
  'app/write/page.tsx',
  'app/newsletters/[id]/page.tsx',
  'app/components/NewsletterCard.tsx',
  'app/components/PasswordModal.tsx',
  'app/lib/db.ts',
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css',
  'package.json',
  'tsconfig.json',
];

let allPresent = true;
requiredFiles.forEach(file => {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ MISSING: ${file}`);
    allPresent = false;
  }
});

console.log();

if (!allPresent) {
  console.log('ERROR: Some required files are missing!');
  process.exit(1);
}

console.log('✓ All required files present!');
console.log();

console.log('STEP 3: Running npm build');
console.log('-'.repeat(70));

try {
  execSync('npm run build', { 
    cwd: baseDir,
    stdio: 'inherit',
    shell: true
  });
  
  console.log();
  console.log('='.repeat(70));
  console.log('✓ BUILD SUCCESSFUL!');
  console.log('='.repeat(70));
  console.log();
  console.log('Next steps:');
  console.log('  1. Stage changes: git add .');
  console.log('  2. Commit: git commit -m "Restructure: Move files to Next.js App Router format"');
  console.log('  3. Push: git push origin main');
  console.log();
  process.exit(0);
  
} catch (error) {
  console.log();
  console.log('='.repeat(70));
  console.log('✗ BUILD FAILED!');
  console.log('='.repeat(70));
  console.log();
  console.error('Error details:');
  console.error(error.message);
  process.exit(1);
}
