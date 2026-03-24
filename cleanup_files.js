const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

const rootLevelFiles = [
  'api.newsletters.route.ts',
  'api.newsletters.[id].route.ts',
  'lib.db.ts',
  'temp_lib_db.ts',
  'app.write.page.tsx',
  'app.newsletter.[id].page.tsx',
  'components.PasswordModal.tsx',
  'components.NewsletterCard.tsx',
  'NewsletterDetailPage.tsx',
  'WritePage.tsx'
];

const appDirFiles = [
  'app\\api.newsletters.route.ts',
  'app\\api.newsletters.[id].route.ts',
  'app\\db.ts',
  'app\\lib.db.ts',
  'app\\DeleteRoute.ts',
  'app\\write.page.tsx',
  'app\\PasswordModal.tsx',
  'app\\components.PasswordModal.tsx',
  'app\\components.NewsletterCard.tsx',
  'app\\NewsletterCard.tsx',
  'app\\newsletter.[id].page.tsx',
  'app\\page_home.tsx',
  'app\\db_code.txt'
];

const allFiles = [...rootLevelFiles, ...appDirFiles];
let deletedCount = 0;
let failedCount = 0;

allFiles.forEach(file => {
  const fullPath = path.join(baseDir, file);
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✓ Deleted: ${file}`);
      deletedCount++;
    } else {
      console.log(`⊘ Not found: ${file}`);
    }
  } catch (error) {
    console.log(`✗ Failed to delete ${file}: ${error.message}`);
    failedCount++;
  }
});

console.log(`\n=== Cleanup Summary ===`);
console.log(`Deleted: ${deletedCount} files`);
console.log(`Failed: ${failedCount} files`);
console.log(`Not found: ${allFiles.length - deletedCount - failedCount} files`);
