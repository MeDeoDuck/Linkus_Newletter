@echo off
cd /d c:\Users\seank\OneDrive\Desktop\linkus_newletter

echo Deleting files from project root...
del /f /q "api.newsletters.route.ts" 2>nul
del /f /q "api.newsletters.[id].route.ts" 2>nul
del /f /q "lib.db.ts" 2>nul
del /f /q "temp_lib_db.ts" 2>nul
del /f /q "app.write.page.tsx" 2>nul
del /f /q "app.newsletter.[id].page.tsx" 2>nul
del /f /q "components.PasswordModal.tsx" 2>nul
del /f /q "components.NewsletterCard.tsx" 2>nul
del /f /q "NewsletterDetailPage.tsx" 2>nul
del /f /q "WritePage.tsx" 2>nul

echo Deleting files from app directory...
del /f /q "app\api.newsletters.route.ts" 2>nul
del /f /q "app\api.newsletters.[id].route.ts" 2>nul
del /f /q "app\db.ts" 2>nul
del /f /q "app\lib.db.ts" 2>nul
del /f /q "app\DeleteRoute.ts" 2>nul
del /f /q "app\write.page.tsx" 2>nul
del /f /q "app\PasswordModal.tsx" 2>nul
del /f /q "app\components.PasswordModal.tsx" 2>nul
del /f /q "app\components.NewsletterCard.tsx" 2>nul
del /f /q "app\NewsletterCard.tsx" 2>nul
del /f /q "app\newsletter.[id].page.tsx" 2>nul
del /f /q "app\page_home.tsx" 2>nul
del /f /q "app\db_code.txt" 2>nul

echo Cleanup completed. Running npm run build...
call npm run build
