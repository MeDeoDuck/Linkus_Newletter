const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

// Files to remove from root (duplicates)
const filesToRemove = [
  'api.newsletters.route.ts',
  'api.newsletters.[id].route.ts',
  'WritePage.tsx',
  'NewsletterDetailPage.tsx',
  'components.NewsletterCard.tsx',
  'components.PasswordModal.tsx',
  'lib.db.ts',
  // Also remove from app root
  path.join('app', 'api.newsletters.route.ts'),
  path.join('app', 'api.newsletters.[id].route.ts'),
  path.join('app', 'write.page.tsx'),
  path.join('app', 'newsletter.[id].page.tsx'),
  path.join('app', 'components.NewsletterCard.tsx'),
  path.join('app', 'components.PasswordModal.tsx'),
  path.join('app', 'lib.db.ts'),
  path.join('app', 'db.ts'),
  path.join('app', 'NewsletterCard.tsx'),
  path.join('app', 'PasswordModal.tsx'),
  path.join('app', 'DeleteRoute.ts'),
  path.join('app', 'db_code.txt'),
  path.join('app', 'page_home.tsx'),
];

console.log('Cleaning up duplicate files...\n');

filesToRemove.forEach(file => {
  const fullPath = path.join(baseDir, file);
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✓ Removed: ${file}`);
    }
  } catch (error) {
    console.log(`✗ Error removing ${file}: ${error.message}`);
  }
});

console.log('\nCleanup complete!');
