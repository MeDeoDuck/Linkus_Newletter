const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  process.chdir(r'c:\Users\seank\OneDrive\Desktop\linkus_newletter');
} catch (e) {
  process.chdir('c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter');
}

const baseDir = process.cwd();
console.log('Working from:', baseDir);
console.log('');

// Step 1: Delete duplicates
const toDelete = [
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

console.log('DELETING DUPLICATE FILES:');
let deleteCount = 0;
toDelete.forEach(f => {
  try {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log('  ✓', f);
      deleteCount++;
    }
  } catch (e) {
    console.error('  ✗', f, e.message);
  }
});
console.log(`\nDeleted ${deleteCount}/${toDelete.length} files\n`);

// Step 2: Verify correct files exist
const correct = [
  'app/api/newsletters/route.ts',
  'app/api/newsletters/[id]/route.ts',
  'app/write/page.tsx',
  'app/newsletters/[id]/page.tsx',
  'app/components/NewsletterCard.tsx',
  'app/components/PasswordModal.tsx',
  'app/lib/db.ts',
];

console.log('VERIFYING CORRECT FILES:');
let allGood = true;
correct.forEach(f => {
  if (fs.existsSync(f)) {
    console.log('  ✓', f);
  } else {
    console.log('  ✗ MISSING:', f);
    allGood = false;
  }
});
console.log('');

if (!allGood) {
  console.log('ERROR: Missing required files!');
  process.exit(1);
}

// Step 3: Build
console.log('RUNNING npm build:');
console.log('');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('');
  console.log('✓ BUILD SUCCESSFUL!');
  console.log('');
  console.log('Next steps:');
  console.log('  git add .');
  console.log('  git commit -m "Restructure: Move files to Next.js App Router format"');
  console.log('  git push origin main');
} catch (e) {
  console.log('');
  console.log('✗ BUILD FAILED!');
  process.exit(1);
}
