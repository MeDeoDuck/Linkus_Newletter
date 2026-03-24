const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

// Define directory structure
const directories = [
  'app/api/newsletters/[id]',
  'app/components',
  'app/lib',
  'app/write',
  'app/newsletters/[id]'
];

// Define file moves: { source: destination }
const fileMoves = {
  'lib.db.ts': 'app/lib/db.ts',
  'api.newsletters.route.ts': 'app/api/newsletters/route.ts',
  'api.newsletters.[id].route.ts': 'app/api/newsletters/[id]/route.ts',
  'WritePage.tsx': 'app/write/page.tsx',
  'NewsletterDetailPage.tsx': 'app/newsletters/[id]/page.tsx',
  'components.NewsletterCard.tsx': 'app/components/NewsletterCard.tsx',
  'components.PasswordModal.tsx': 'app/components/PasswordModal.tsx'
};

console.log('Starting reorganization...\n');

// Create directories
directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  } else {
    console.log(`✓ Directory already exists: ${dir}`);
  }
});

console.log('\nMoving files...\n');

// Move files
Object.entries(fileMoves).forEach(([source, dest]) => {
  const sourcePath = path.join(baseDir, source);
  const destPath = path.join(baseDir, dest);

  if (fs.existsSync(sourcePath)) {
    try {
      // Read file
      const content = fs.readFileSync(sourcePath, 'utf8');
      
      // Write to destination
      fs.writeFileSync(destPath, content, 'utf8');
      console.log(`✓ Moved: ${source} → ${dest}`);
    } catch (error) {
      console.error(`✗ Error moving ${source}: ${error.message}`);
    }
  } else {
    console.log(`⊘ Source not found: ${source}`);
  }
});

console.log('\nReorganization complete!');
