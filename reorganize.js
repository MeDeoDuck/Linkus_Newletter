const fs = require('fs');
const path = require('path');

const projectRoot = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

// Ensure we're in the right directory
process.chdir(projectRoot);

console.log('Starting file reorganization...\n');

// Step 1: Create directory structure
const dirs = [
  'app/lib',
  'app/api/newsletters/[id]',
  'app/write',
  'app/newsletters/[id]',
  'app/components',
];

dirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

// Step 2: Copy lib.db.ts to app/lib/db.ts
try {
  const srcDb = path.join(projectRoot, 'lib.db.ts');
  const destDb = path.join(projectRoot, 'app', 'lib', 'db.ts');
  
  if (fs.existsSync(srcDb) && !fs.existsSync(destDb)) {
    fs.copyFileSync(srcDb, destDb);
    console.log('✓ Created app/lib/db.ts from lib.db.ts');
  } else if (fs.existsSync(destDb)) {
    console.log('✓ app/lib/db.ts already exists');
  }
} catch (e) {
  console.error('Error copying db.ts:', e.message);
}

// Step 3: Copy API route files
try {
  const srcApiNewsletters = path.join(projectRoot, 'api.newsletters.route.ts');
  const destApiNewsletters = path.join(projectRoot, 'app', 'api', 'newsletters', 'route.ts');
  
  if (fs.existsSync(srcApiNewsletters) && !fs.existsSync(destApiNewsletters)) {
    fs.copyFileSync(srcApiNewsletters, destApiNewsletters);
    console.log('✓ Created app/api/newsletters/route.ts');
  } else if (fs.existsSync(destApiNewsletters)) {
    console.log('✓ app/api/newsletters/route.ts already exists');
  }
} catch (e) {
  console.error('Error copying api newsletters route:', e.message);
}

// Step 4: Copy API [id] route file
try {
  const srcApiId = path.join(projectRoot, 'api.newsletters.[id].route.ts');
  const destApiId = path.join(projectRoot, 'app', 'api', 'newsletters', '[id]', 'route.ts');
  
  if (fs.existsSync(srcApiId) && !fs.existsSync(destApiId)) {
    fs.copyFileSync(srcApiId, destApiId);
    console.log('✓ Created app/api/newsletters/[id]/route.ts');
  } else if (fs.existsSync(destApiId)) {
    console.log('✓ app/api/newsletters/[id]/route.ts already exists');
  }
} catch (e) {
  console.error('Error copying api [id] route:', e.message);
}

// Step 5: Copy write page
try {
  const srcWrite = path.join(projectRoot, 'app.write.page.tsx');
  const destWrite = path.join(projectRoot, 'app', 'write', 'page.tsx');
  
  if (fs.existsSync(srcWrite) && !fs.existsSync(destWrite)) {
    fs.copyFileSync(srcWrite, destWrite);
    console.log('✓ Created app/write/page.tsx');
  } else if (fs.existsSync(destWrite)) {
    console.log('✓ app/write/page.tsx already exists');
  }
} catch (e) {
  console.error('Error copying write page:', e.message);
}

// Step 6: Copy newsletter detail page
try {
  const srcDetail = path.join(projectRoot, 'app.newsletter.[id].page.tsx');
  const destDetail = path.join(projectRoot, 'app', 'newsletters', '[id]', 'page.tsx');
  
  if (fs.existsSync(srcDetail) && !fs.existsSync(destDetail)) {
    fs.copyFileSync(srcDetail, destDetail);
    console.log('✓ Created app/newsletters/[id]/page.tsx');
  } else if (fs.existsSync(destDetail)) {
    console.log('✓ app/newsletters/[id]/page.tsx already exists');
  }
} catch (e) {
  console.error('Error copying newsletter detail page:', e.message);
}

// Step 7: Copy components
try {
  const srcCard = path.join(projectRoot, 'components.NewsletterCard.tsx');
  const destCard = path.join(projectRoot, 'app', 'components', 'NewsletterCard.tsx');
  
  if (fs.existsSync(srcCard) && !fs.existsSync(destCard)) {
    fs.copyFileSync(srcCard, destCard);
    console.log('✓ Created app/components/NewsletterCard.tsx');
  } else if (fs.existsSync(destCard)) {
    console.log('✓ app/components/NewsletterCard.tsx already exists');
  }
} catch (e) {
  console.error('Error copying NewsletterCard:', e.message);
}

try {
  const srcModal = path.join(projectRoot, 'components.PasswordModal.tsx');
  const destModal = path.join(projectRoot, 'app', 'components', 'PasswordModal.tsx');
  
  if (fs.existsSync(srcModal) && !fs.existsSync(destModal)) {
    fs.copyFileSync(srcModal, destModal);
    console.log('✓ Created app/components/PasswordModal.tsx');
  } else if (fs.existsSync(destModal)) {
    console.log('✓ app/components/PasswordModal.tsx already exists');
  }
} catch (e) {
  console.error('Error copying PasswordModal:', e.message);
}

console.log('\n✅ File reorganization complete!');
