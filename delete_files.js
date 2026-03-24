const fs = require('fs');
const path = require('path');

const basePath = 'c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter';

// Root level files to delete
const rootFiles = [
    "api.newsletters.route.ts",
    "api.newsletters.[id].route.ts",
    "lib.db.ts",
    "temp_lib_db.ts",
    "app.write.page.tsx",
    "app.newsletter.[id].page.tsx",
    "components.PasswordModal.tsx",
    "components.NewsletterCard.tsx",
    "NewsletterDetailPage.tsx",
    "WritePage.tsx"
];

// App directory files to delete
const appFiles = [
    "api.newsletters.route.ts",
    "api.newsletters.[id].route.ts",
    "db.ts",
    "lib.db.ts",
    "DeleteRoute.ts",
    "write.page.tsx",
    "PasswordModal.tsx",
    "components.PasswordModal.tsx",
    "components.NewsletterCard.tsx",
    "NewsletterCard.tsx",
    "newsletter.[id].page.tsx",
    "page_home.tsx",
    "db_code.txt"
];

console.log("Deleting root level files...");
rootFiles.forEach(file => {
    const filePath = path.join(basePath, file);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`✓ Deleted: ${file}`);
        } else {
            console.log(`⚠ Not found: ${file}`);
        }
    } catch (err) {
        console.log(`✗ Error deleting ${file}: ${err.message}`);
    }
});

console.log("\nDeleting app directory files...");
appFiles.forEach(file => {
    const filePath = path.join(basePath, 'app', file);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`✓ Deleted: app\\${file}`);
        } else {
            console.log(`⚠ Not found: app\\${file}`);
        }
    } catch (err) {
        console.log(`✗ Error deleting app\\${file}: ${err.message}`);
    }
});

console.log("\n✓ File deletion complete!");
