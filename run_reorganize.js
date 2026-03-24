const fs = require('fs');
const path = require('path');

const projectRoot = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

console.log("Starting file reorganization...\n");

// Step 1: Create directory structure
const dirs = [
    'app\\lib',
    'app\\api\\newsletters\\[id]',
    'app\\write',
    'app\\newsletters\\[id]',
    'app\\components',
];

for (const dir of dirs) {
    const fullPath = path.join(projectRoot, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✓ Created directory: ${dir}`);
    } else {
        console.log(`✓ Directory already exists: ${dir}`);
    }
}

console.log();

// Step 2: Copy/Move files
const fileMappings = [
    ['lib.db.ts', 'app\\lib\\db.ts'],
    ['api.newsletters.route.ts', 'app\\api\\newsletters\\route.ts'],
    ['api.newsletters.[id].route.ts', 'app\\api\\newsletters\\[id]\\route.ts'],
    ['app.write.page.tsx', 'app\\write\\page.tsx'],
    ['app.newsletter.[id].page.tsx', 'app\\newsletters\\[id]\\page.tsx'],
    ['components.NewsletterCard.tsx', 'app\\components\\NewsletterCard.tsx'],
    ['components.PasswordModal.tsx', 'app\\components\\PasswordModal.tsx'],
];

for (const [src, dst] of fileMappings) {
    const srcPath = path.join(projectRoot, src);
    const dstPath = path.join(projectRoot, dst);

    if (fs.existsSync(srcPath)) {
        if (fs.existsSync(dstPath)) {
            console.log(`✓ ${dst} already exists (skipped)`);
        } else {
            fs.copyFileSync(srcPath, dstPath);
            console.log(`✓ Copied ${src} → ${dst}`);
        }
    } else {
        console.log(`✗ Source file not found: ${src}`);
    }
}

console.log();

// Step 3: Update tsconfig.json
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
try {
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
    const tsconfig = JSON.parse(tsconfigContent);

    // Update paths
    tsconfig.compilerOptions.paths = {
        "@/*": ["./*"],
        "@/lib/db": ["./app/lib/db.ts"],
        "@/components/*": ["./app/components/*"]
    };

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

    console.log("✓ Updated tsconfig.json paths:");
    console.log("  - @/lib/db → ./app/lib/db.ts");
    console.log("  - @/components/* → ./app/components/*");
} catch (e) {
    console.log(`✗ Error updating tsconfig.json: ${e.message}`);
}

console.log("\n✅ File reorganization complete!");
