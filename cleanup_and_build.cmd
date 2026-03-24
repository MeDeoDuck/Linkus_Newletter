@echo off
cd /d c:\Users\seank\OneDrive\Desktop\linkus_newletter

REM Delete root level files
del /f "api.newsletters.route.ts" 2>nul
del /f "api.newsletters.[id].route.ts" 2>nul
del /f "lib.db.ts" 2>nul
del /f "temp_lib_db.ts" 2>nul
del /f "app.write.page.tsx" 2>nul
del /f "app.newsletter.[id].page.tsx" 2>nul
del /f "components.PasswordModal.tsx" 2>nul
del /f "components.NewsletterCard.tsx" 2>nul
del /f "NewsletterDetailPage.tsx" 2>nul
del /f "WritePage.tsx" 2>nul

REM Delete app directory files
del /f "app\api.newsletters.route.ts" 2>nul
del /f "app\api.newsletters.[id].route.ts" 2>nul
del /f "app\db.ts" 2>nul
del /f "app\lib.db.ts" 2>nul
del /f "app\DeleteRoute.ts" 2>nul
del /f "app\write.page.tsx" 2>nul
del /f "app\PasswordModal.tsx" 2>nul
del /f "app\components.PasswordModal.tsx" 2>nul
del /f "app\components.NewsletterCard.tsx" 2>nul
del /f "app\NewsletterCard.tsx" 2>nul
del /f "app\newsletter.[id].page.tsx" 2>nul
del /f "app\page_home.tsx" 2>nul
del /f "app\db_code.txt" 2>nul

echo Files deleted. Running build...
npm run build
