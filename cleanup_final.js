#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

// Files to delete
const filesToDelete = [
  // From root
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
  // From app/
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

console.log('=== CLEANUP: Removing Duplicate Files ===\n');

let deletedCount = 0;
let notFoundCount = 0;

filesToDelete.forEach(file => {
  const fullPath = path.join(baseDir, file);
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✓ Deleted: ${file}`);
      deletedCount++;
    } else {
      console.log(`⊘ Not found: ${file}`);
      notFoundCount++;
    }
  } catch (error) {
    console.error(`✗ Error deleting ${file}: ${error.message}`);
  }
});

console.log(`\n=== CLEANUP COMPLETE ===`);
console.log(`Deleted: ${deletedCount} files`);
console.log(`Not found: ${notFoundCount} files`);

// Verify correct files still exist
console.log('\n=== VERIFICATION: Correct Files ===\n');

const correctFiles = [
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
  'tsconfig.json',
  'package.json',
  'next.config.js',
];

let allPresent = true;
correctFiles.forEach(file => {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ MISSING: ${file}`);
    allPresent = false;
  }
});

if (allPresent) {
  console.log('\n✓ All required files are in place!');
  console.log('✓ Project is ready for build!');
  process.exit(0);
} else {
  console.log('\n✗ Some required files are missing!');
  process.exit(1);
}
