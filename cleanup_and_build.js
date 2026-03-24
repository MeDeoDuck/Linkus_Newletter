const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

// Files to delete from project root
const rootFiles = [
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

// Files to delete from app/ directory
const appFiles = [
  'api.newsletters.route.ts',
  'api.newsletters.[id].route.ts',
  'db.ts',
  'lib.db.ts',
  'DeleteRoute.ts',
  'write.page.tsx',
  'PasswordModal.tsx',
  'components.PasswordModal.tsx',
  'components.NewsletterCard.tsx',
  'NewsletterCard.tsx',
  'newsletter.[id].page.tsx',
  'page_home.tsx',
  'db_code.txt'
];

console.log('Starting cleanup...\n');

// Delete root files
console.log('Deleting files from project root:');
rootFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`  ✓ Deleted: ${file}`);
    } catch (err) {
      console.log(`  ✗ Failed to delete: ${file} - ${err.message}`);
    }
  } else {
    console.log(`  - Not found: ${file}`);
  }
});

// Delete app directory files
console.log('\nDeleting files from app/ directory:');
appFiles.forEach(file => {
  const filePath = path.join(projectRoot, 'app', file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`  ✓ Deleted: app\\${file}`);
    } catch (err) {
      console.log(`  ✗ Failed to delete: app\\${file} - ${err.message}`);
    }
  } else {
    console.log(`  - Not found: app\\${file}`);
  }
});

console.log('\nCleanup completed. Running npm run build...\n');

// Run npm run build
try {
  const output = execSync('npm run build', { 
    cwd: projectRoot,
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  console.log('BUILD OUTPUT:\n');
  console.log(output);
  console.log('\n✓ Build completed successfully!');
} catch (err) {
  console.error('✗ Build failed with error:\n');
  console.error(err.stdout);
  console.error(err.stderr);
  process.exit(1);
}
