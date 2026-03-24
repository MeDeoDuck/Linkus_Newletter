#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function main() {
    const projectDir = __dirname;
    
    console.log('='.repeat(70));
    console.log('NEXT.JS PROJECT STRUCTURE ORGANIZATION');
    console.log('='.repeat(70));
    console.log(`Project: ${projectDir}\n`);

    // Directories to create
    const dirs = [
        'app/lib',
        'app/api/newsletters/[id]',
        'app/write',
        'app/newsletters/[id]',
        'app/components',
    ];

    console.log('1. Creating directories...');
    dirs.forEach(dir => {
        const fullPath = path.join(projectDir, dir);
        try {
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                console.log(`   ✓ Created: ${dir}`);
            } else {
                console.log(`   ✓ Already exists: ${dir}`);
            }
        } catch (e) {
            console.error(`   ✗ Error creating ${dir}: ${e.message}`);
        }
    });

    // Files to copy
    const files = [
        { from: 'lib.db.ts', to: 'app/lib/db.ts' },
        { from: 'api.newsletters.route.ts', to: 'app/api/newsletters/route.ts' },
        { from: 'api.newsletters.[id].route.ts', to: 'app/api/newsletters/[id]/route.ts' },
        { from: 'app.write.page.tsx', to: 'app/write/page.tsx' },
        { from: 'app.newsletter.[id].page.tsx', to: 'app/newsletters/[id]/page.tsx' },
        { from: 'components.NewsletterCard.tsx', to: 'app/components/NewsletterCard.tsx' },
        { from: 'components.PasswordModal.tsx', to: 'app/components/PasswordModal.tsx' },
    ];

    console.log('\n2. Copying files...');
    files.forEach(({ from, to }) => {
        const fromPath = path.join(projectDir, from);
        const toPath = path.join(projectDir, to);
        try {
            if (fs.existsSync(fromPath)) {
                fs.copyFileSync(fromPath, toPath);
                console.log(`   ✓ Copied: ${from} → ${to}`);
            } else {
                console.log(`   ✗ Not found: ${from}`);
            }
        } catch (e) {
            console.error(`   ✗ Error copying ${from}: ${e.message}`);
        }
    });

    console.log('\n3. Final Directory Structure:\n');
    console.log('-'.repeat(70));
    
    function showTree(dir, prefix = '', depth = 0) {
        if (depth > 5) return;
        
        try {
            const items = fs.readdirSync(dir)
                .filter(f => !f.startsWith('.') && ![].includes(f))
                .sort();
            
            items.forEach((item, idx) => {
                const itemPath = path.join(dir, item);
                const isLast = idx === items.length - 1;
                const connector = isLast ? '└── ' : '├── ';
                console.log(`${prefix}${connector}${item}`);
                
                if (fs.statSync(itemPath).isDirectory()) {
                    const newPrefix = prefix + (isLast ? '    ' : '│   ');
                    showTree(itemPath, newPrefix, depth + 1);
                }
            });
        } catch (e) {
            // Ignore errors
        }
    }

    const appDir = path.join(projectDir, 'app');
    if (fs.existsSync(appDir)) {
        console.log('app/');
        showTree(appDir);
    }

    console.log('-'.repeat(70));
    console.log('\n' + '='.repeat(70));
    console.log('✓ ORGANIZATION COMPLETE!');
    console.log('='.repeat(70));
    console.log('\nAll files have been organized into the proper Next.js structure.');
}

main();
