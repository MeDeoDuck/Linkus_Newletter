@echo off
setlocal enabledelayedexpansion

REM Navigate to script directory
cd /d "%~dp0"

echo.
echo ========================================
echo  Next.js App Router Reorganization
echo ========================================
echo.
echo Creating directory structure...

REM Create directories
mkdir "app\lib" 2>nul
mkdir "app\api\newsletters" 2>nul
mkdir "app\api\newsletters\[id]" 2>nul
mkdir "app\write" 2>nul
mkdir "app\newsletters" 2>nul
mkdir "app\newsletters\[id]" 2>nul
mkdir "app\components" 2>nul

echo Done. Now copying files...
echo.

REM Copy files
if exist "lib.db.ts" (
    copy /Y "lib.db.ts" "app\lib\db.ts" >nul 2>&1 && echo ✓ lib.db.ts copied
)

if exist "api.newsletters.route.ts" (
    copy /Y "api.newsletters.route.ts" "app\api\newsletters\route.ts" >nul 2>&1 && echo ✓ api.newsletters.route.ts copied
)

if exist "api.newsletters.[id].route.ts" (
    copy /Y "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts" >nul 2>&1 && echo ✓ api.newsletters.[id].route.ts copied
)

if exist "app.write.page.tsx" (
    copy /Y "app.write.page.tsx" "app\write\page.tsx" >nul 2>&1 && echo ✓ app.write.page.tsx copied
)

if exist "app.newsletter.[id].page.tsx" (
    copy /Y "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx" >nul 2>&1 && echo ✓ app.newsletter.[id].page.tsx copied
)

if exist "components.NewsletterCard.tsx" (
    copy /Y "components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx" >nul 2>&1 && echo ✓ components.NewsletterCard.tsx copied
)

if exist "components.PasswordModal.tsx" (
    copy /Y "components.PasswordModal.tsx" "app\components\PasswordModal.tsx" >nul 2>&1 && echo ✓ components.PasswordModal.tsx copied
)

echo.
echo ✅ Reorganization complete!
echo.
echo Verifying structure...
dir /s app | findstr /E "\.ts$|\.tsx$"

echo.
echo Next steps:
echo   1. npm install
echo   2. npm run build
echo   3. npm run dev
echo.
pause
