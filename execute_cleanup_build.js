#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const basePath = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

// All files to delete
const filesToDelete = [
    // Root level
    path.join(basePath, 'api.newsletters.route.ts'),
    path.join(basePath, 'api.newsletters.[id].route.ts'),
    path.join(basePath, 'lib.db.ts'),
    path.join(basePath, 'temp_lib_db.ts'),
    path.join(basePath, 'app.write.page.tsx'),
    path.join(basePath, 'app.newsletter.[id].page.tsx'),
    path.join(basePath, 'components.PasswordModal.tsx'),
    path.join(basePath, 'components.NewsletterCard.tsx'),
    path.join(basePath, 'NewsletterDetailPage.tsx'),
    path.join(basePath, 'WritePage.tsx'),
    // App directory
    path.join(basePath, 'app', 'api.newsletters.route.ts'),
    path.join(basePath, 'app', 'api.newsletters.[id].route.ts'),
    path.join(basePath, 'app', 'db.ts'),
    path.join(basePath, 'app', 'lib.db.ts'),
    path.join(basePath, 'app', 'DeleteRoute.ts'),
    path.join(basePath, 'app', 'write.page.tsx'),
    path.join(basePath, 'app', 'PasswordModal.tsx'),
    path.join(basePath, 'app', 'components.PasswordModal.tsx'),
    path.join(basePath, 'app', 'components.NewsletterCard.tsx'),
    path.join(basePath, 'app', 'NewsletterCard.tsx'),
    path.join(basePath, 'app', 'newsletter.[id].page.tsx'),
    path.join(basePath, 'app', 'page_home.tsx'),
    path.join(basePath, 'app', 'db_code.txt')
];

let deletedCount = 0;
let notFoundCount = 0;

console.log('========== FILE DELETION ==========\n');

filesToDelete.forEach(filePath => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('✓ DELETED: ' + filePath.replace(basePath, '.'));
            deletedCount++;
        } else {
            console.log('⚠ NOT FOUND: ' + filePath.replace(basePath, '.'));
            notFoundCount++;
        }
    } catch (err) {
        console.error('✗ ERROR: ' + filePath.replace(basePath, '.') + ' - ' + err.message);
    }
});

console.log(`\n✓ Deleted: ${deletedCount} files`);
console.log(`⚠ Not found: ${notFoundCount} files`);

console.log('\n========== NPM BUILD ==========\n');

try {
    process.chdir(basePath);
    const buildOutput = execSync('npm run build 2>&1', { encoding: 'utf-8', stdio: 'pipe' });
    console.log(buildOutput);
    console.log('\n✓ BUILD SUCCEEDED');
    process.exit(0);
} catch (err) {
    console.log(err.stdout || err.message || err);
    console.error('\n✗ BUILD FAILED');
    process.exit(1);
}
