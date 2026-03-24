const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

// Directory structure to create
const dirs = [
  'lib',
  path.join('api', 'newsletters'),
  path.join('api', 'newsletters', '[id]'),
  'write',
  path.join('newsletters', '[id]'),
  'components'
];

// File contents and destinations
const files = [
  {
    dest: path.join('lib', 'db.ts'),
    src: 'lib.db.ts'
  },
  {
    dest: path.join('api', 'newsletters', 'route.ts'),
    src: 'api.newsletters.route.ts'
  },
  {
    dest: path.join('api', 'newsletters', '[id]', 'route.ts'),
    src: 'api.newsletters.[id].route.ts'
  },
  {
    dest: path.join('write', 'page.tsx'),
    src: 'write.page.tsx'
  },
  {
    dest: path.join('newsletters', '[id]', 'page.tsx'),
    src: 'newsletter.[id].page.tsx'
  },
  {
    dest: path.join('components', 'NewsletterCard.tsx'),
    src: 'components.NewsletterCard.tsx'
  },
  {
    dest: path.join('components', 'PasswordModal.tsx'),
    src: 'components.PasswordModal.tsx'
  }
];

console.log('='.repeat(60));
console.log('Next.js App Router File Reorganization');
console.log('='.repeat(60));

console.log('\n1. Creating directories...\n');

// Create all directories
dirs.forEach(dir => {
  const fullPath = path.join(appDir, dir);
  try {
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`   ✓ ${dir}/`);
    } else {
      console.log(`   ~ ${dir}/ (already exists)`);
    }
  } catch (err) {
    console.error(`   ✗ ${dir} - ${err.message}`);
  }
});

console.log('\n2. Copying files...\n');

// Copy files
files.forEach(file => {
  const srcPath = path.join(appDir, file.src);
  const destPath = path.join(appDir, file.dest);

  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`   ✓ ${file.src}`);
      console.log(`     └─> ${file.dest}`);
    } else {
      console.log(`   ✗ ${file.src} (not found)`);
    }
  } catch (err) {
    console.error(`   ✗ Failed to copy ${file.src}: ${err.message}`);
  }
});

console.log('\n3. Verifying reorganized structure...\n');

// Verify structure
const expectedStructure = [
  'lib/db.ts',
  'api/newsletters/route.ts',
  'api/newsletters/[id]/route.ts',
  'write/page.tsx',
  'newsletters/[id]/page.tsx',
  'components/NewsletterCard.tsx',
  'components/PasswordModal.tsx'
];

let allVerified = true;
expectedStructure.forEach(filePath => {
  const fullPath = path.join(appDir, filePath);
  const normalized = filePath.replace(/\//g, '\\');
  if (fs.existsSync(fullPath)) {
    console.log(`   ✓ ${normalized}`);
  } else {
    console.log(`   ✗ ${normalized} (missing)`);
    allVerified = false;
  }
});

console.log('\n' + '='.repeat(60));
if (allVerified) {
  console.log('✓ SUCCESS: All files reorganized successfully!');
} else {
  console.log('⚠ PARTIAL: Some files may be missing.');
}
console.log('='.repeat(60));

// Display final tree structure
console.log('\n4. Final app/ directory structure:\n');
const listTree = (dir, prefix = '', isLast = true) => {
  const items = fs.readdirSync(dir);
  const filtered = items.filter(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    return stat.isDirectory() || item.endsWith('.ts') || item.endsWith('.tsx');
  });

  filtered.forEach((item, index) => {
    const isLastItem = index === filtered.length - 1;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const isDir = stat.isDirectory();

    const connector = isLastItem ? '└── ' : '├── ';
    console.log(prefix + connector + item + (isDir ? '/' : ''));

    if (isDir && prefix.length < 20) {
      const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
      listTree(fullPath, newPrefix, isLastItem);
    }
  });
};

listTree(appDir);

console.log('\n' + '='.repeat(60));
console.log('Next steps:');
console.log('1. Verify imports use @/lib/db and @/components/*');
console.log('2. Run: npm run build');
console.log('3. Check for any build errors');
console.log('='.repeat(60));
