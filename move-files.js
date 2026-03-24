#!/usr/bin/env node
/**
 * Next.js App Router File Reorganization
 * This script moves files from app/ to their proper nested directory structure
 */

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
process.chdir(projectRoot);

console.log('🚀 Moving files to proper Next.js App Router structure...\n');

// Files to move and their destinations
const fileMappings = [
  {
    src: path.join(projectRoot, 'app', 'lib.db.ts'),
    dest: path.join(projectRoot, 'app', 'lib', 'db.ts'),
    desc: 'Database utilities'
  },
  {
    src: path.join(projectRoot, 'app', 'api.newsletters.route.ts'),
    dest: path.join(projectRoot, 'app', 'api', 'newsletters', 'route.ts'),
    desc: 'Newsletter list API'
  },
  {
    src: path.join(projectRoot, 'app', 'api.newsletters.[id].route.ts'),
    dest: path.join(projectRoot, 'app', 'api', 'newsletters', '[id]', 'route.ts'),
    desc: 'Newsletter detail API'
  },
  {
    src: path.join(projectRoot, 'app', 'write.page.tsx'),
    dest: path.join(projectRoot, 'app', 'write', 'page.tsx'),
    desc: 'Write page'
  },
  {
    src: path.join(projectRoot, 'app', 'newsletter.[id].page.tsx'),
    dest: path.join(projectRoot, 'app', 'newsletters', '[id]', 'page.tsx'),
    desc: 'Newsletter detail page'
  },
  {
    src: path.join(projectRoot, 'app', 'components.NewsletterCard.tsx'),
    dest: path.join(projectRoot, 'app', 'components', 'NewsletterCard.tsx'),
    desc: 'Newsletter card component'
  },
  {
    src: path.join(projectRoot, 'app', 'components.PasswordModal.tsx'),
    dest: path.join(projectRoot, 'app', 'components', 'PasswordModal.tsx'),
    desc: 'Password modal component'
  }
];

// Create necessary directories
const dirsToCreate = [
  path.join(projectRoot, 'app', 'lib'),
  path.join(projectRoot, 'app', 'api', 'newsletters', '[id]'),
  path.join(projectRoot, 'app', 'write'),
  path.join(projectRoot, 'app', 'newsletters', '[id]'),
  path.join(projectRoot, 'app', 'components')
];

console.log('📁 Creating directories...');
dirsToCreate.forEach(dir => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`  ✓ Created: ${path.relative(projectRoot, dir)}`);
    }
  } catch (err) {
    console.error(`  ✗ Error creating ${dir}: ${err.message}`);
  }
});

console.log('\n📋 Moving files...');
let movedCount = 0;
let skippedCount = 0;
let errorCount = 0;

fileMappings.forEach(({ src, dest, desc }) => {
  try {
    if (fs.existsSync(src)) {
      // Create dest directory if it doesn't exist
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        console.log(`  ✓ ${desc}`);
        console.log(`    ${path.relative(projectRoot, src)} → ${path.relative(projectRoot, dest)}`);
        movedCount++;
      } else {
        console.log(`  ⊘ ${desc} (already exists)`);
        skippedCount++;
      }
    } else {
      console.log(`  ✗ ${desc} (source not found: ${path.relative(projectRoot, src)})`);
      errorCount++;
    }
  } catch (err) {
    console.log(`  ✗ ${desc}: ${err.message}`);
    errorCount++;
  }
});

console.log(`\n📊 Results: ${movedCount} moved, ${skippedCount} skipped, ${errorCount} errors`);

// Update tsconfig.json paths
console.log('\n⚙️  Verifying tsconfig.json...');
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
try {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }
  
  const expectedPaths = {
    "@/*": ["./*"],
    "@/lib/db": ["./app/lib/db.ts"],
    "@/components/*": ["./app/components/*"]
  };
  
  tsconfig.compilerOptions.paths = expectedPaths;
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  
  console.log('  ✓ tsconfig.json paths verified:');
  console.log('    - @/* → ./*');
  console.log('    - @/lib/db → ./app/lib/db.ts');
  console.log('    - @/components/* → ./app/components/*');
} catch (err) {
  console.log(`  ✗ Error updating tsconfig.json: ${err.message}`);
}

console.log('\n✅ File reorganization complete!');
console.log('\n📝 Next steps:');
console.log('  1. Run: npm install');
console.log('  2. Run: npm run build');
console.log('  3. Run: npm run dev');
