@echo off
cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

REM Create all directories
mkdir "app\lib" 2>nul
mkdir "app\api\newsletters\[id]" 2>nul
mkdir "app\write" 2>nul
mkdir "app\newsletters\[id]" 2>nul
mkdir "app\components" 2>nul

echo Directories created.

REM Copy files to their new locations
copy "lib.db.ts" "app\lib\db.ts" 2>nul
copy "api.newsletters.route.ts" "app\api\newsletters\route.ts" 2>nul
copy "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts" 2>nul
copy "app.write.page.tsx" "app\write\page.tsx" 2>nul
copy "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx" 2>nul
copy "components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx" 2>nul
copy "components.PasswordModal.tsx" "app\components\PasswordModal.tsx" 2>nul

echo Files copied.

REM Verify the structure
echo.
echo Directory structure:
dir /s app

echo.
echo Complete!
