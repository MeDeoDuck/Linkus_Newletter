#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname);

console.log('🚀 Starting file reorganization...\n');

// Step 1: Create directory structure
const dirs = [
  'app/lib',
  'app/api/newsletters/[id]',
  'app/write',
  'app/newsletters/[id]',
  'app/components',
];

console.log('📁 Creating directories...');
dirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  ✓ Created: ${dir}`);
  } else {
    console.log(`  ✓ Already exists: ${dir}`);
  }
});

console.log('\n📋 Copying files...');

// Step 2: Copy files
const fileMappings = [
  { src: 'lib.db.ts', dest: 'app/lib/db.ts', desc: 'Database utilities' },
  { src: 'api.newsletters.route.ts', dest: 'app/api/newsletters/route.ts', desc: 'Newsletter API routes' },
  { src: 'api.newsletters.[id].route.ts', dest: 'app/api/newsletters/[id]/route.ts', desc: 'Newsletter detail API route' },
  { src: 'app.write.page.tsx', dest: 'app/write/page.tsx', desc: 'Write page' },
  { src: 'app.newsletter.[id].page.tsx', dest: 'app/newsletters/[id]/page.tsx', desc: 'Newsletter detail page' },
  { src: 'components.NewsletterCard.tsx', dest: 'app/components/NewsletterCard.tsx', desc: 'Newsletter card component' },
  { src: 'components.PasswordModal.tsx', dest: 'app/components/PasswordModal.tsx', desc: 'Password modal component' },
];

let copiedCount = 0;
let skippedCount = 0;

fileMappings.forEach(({ src, dest, desc }) => {
  const srcPath = path.join(projectRoot, src);
  const destPath = path.join(projectRoot, dest);
  
  try {
    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  ✓ ${desc}: ${src} → ${dest}`);
        copiedCount++;
      } else {
        console.log(`  ⊘ ${desc}: ${dest} (already exists)`);
        skippedCount++;
      }
    } else {
      console.log(`  ✗ ${desc}: ${src} (source not found)`);
    }
  } catch (err) {
    console.log(`  ✗ ${desc}: Error - ${err.message}`);
  }
});

console.log(`\n📊 File copy results: ${copiedCount} copied, ${skippedCount} skipped`);

// Step 3: Update tsconfig.json
console.log('\n⚙️  Updating tsconfig.json...');
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
try {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }
  
  // Update paths
  tsconfig.compilerOptions.paths = {
    "@/*": ["./*"],
    "@/lib/db": ["./app/lib/db.ts"],
    "@/components/*": ["./app/components/*"]
  };
  
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  
  console.log('  ✓ Updated compilerOptions.paths:');
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
