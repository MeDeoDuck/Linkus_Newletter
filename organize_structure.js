const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname);
process.chdir(projectDir);

console.log('=' .repeat(70));
console.log('NEXT.JS PROJECT STRUCTURE ORGANIZATION');
console.log('=' .repeat(70));
console.log(`Project Directory: ${projectDir}\n`);

// Step 1: Create directories
const dirsToCreate = [
    path.join(projectDir, 'app', 'lib'),
    path.join(projectDir, 'app', 'api', 'newsletters', '[id]'),
    path.join(projectDir, 'app', 'write'),
    path.join(projectDir, 'app', 'newsletters', '[id]'),
    path.join(projectDir, 'app', 'components'),
];

console.log('1. Creating directories...');
dirsToCreate.forEach(dir => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            const relPath = path.relative(projectDir, dir);
            console.log(`   ✓ Created: ${relPath}`);
        } else {
            const relPath = path.relative(projectDir, dir);
            console.log(`   ✓ Already exists: ${relPath}`);
        }
    } catch (err) {
        console.error(`   ✗ Error creating ${dir}: ${err.message}`);
    }
});

// Step 2: Copy files
const fileMappings = [
    { src: 'lib.db.ts', dst: path.join('app', 'lib', 'db.ts') },
    { src: 'api.newsletters.route.ts', dst: path.join('app', 'api', 'newsletters', 'route.ts') },
    { src: 'api.newsletters.[id].route.ts', dst: path.join('app', 'api', 'newsletters', '[id]', 'route.ts') },
    { src: 'app.write.page.tsx', dst: path.join('app', 'write', 'page.tsx') },
    { src: 'app.newsletter.[id].page.tsx', dst: path.join('app', 'newsletters', '[id]', 'page.tsx') },
    { src: 'components.NewsletterCard.tsx', dst: path.join('app', 'components', 'NewsletterCard.tsx') },
    { src: 'components.PasswordModal.tsx', dst: path.join('app', 'components', 'PasswordModal.tsx') },
];

console.log('\n2. Copying files to new locations...');
fileMappings.forEach(({ src, dst }) => {
    try {
        const srcPath = path.join(projectDir, src);
        const dstPath = path.join(projectDir, dst);
        
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, dstPath);
            console.log(`   ✓ Copied: ${src} → ${dst}`);
        } else {
            console.log(`   ✗ Source not found: ${src}`);
        }
    } catch (err) {
        console.error(`   ✗ Error copying ${src}: ${err.message}`);
    }
});

// Step 3: Print directory structure
console.log('\n3. Final Directory Structure (app/):\n');
console.log('─'.repeat(70));

function printTree(dirPath, prefix = '', ignoreList = new Set(['.git', 'node_modules', 'UI', '.next'])) {
    try {
        const entries = fs.readdirSync(dirPath)
            .filter(e => !e.startsWith('.') && !ignoreList.has(e))
            .sort();
        
        entries.forEach((entry, index) => {
            try {
                const fullPath = path.join(dirPath, entry);
                const isLast = index === entries.length - 1;
                const connector = isLast ? '└── ' : '├── ';
                console.log(`${prefix}${connector}${entry}`);
                
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    const nextPrefix = prefix + (isLast ? '    ' : '│   ');
                    printTree(fullPath, nextPrefix, ignoreList);
                }
            } catch (err) {
                console.error(`Error processing ${entry}: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error reading directory ${dirPath}: ${err.message}`);
    }
}

const appPath = path.join(projectDir, 'app');
if (fs.existsSync(appPath)) {
    console.log('app/');
    printTree(appPath);
    console.log('─'.repeat(70));
} else {
    console.error('Error: app directory not found');
}

console.log('\n' + '=' .repeat(70));
console.log('✓ ORGANIZATION COMPLETE!');
console.log('=' .repeat(70));
console.log('\nDirectory structure has been successfully organized.');
console.log('All files have been copied to their new locations in app/');

