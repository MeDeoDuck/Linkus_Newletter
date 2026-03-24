@echo off
REM =========================================
REM Next.js App Router Reorganization Script
REM =========================================
REM This batch file reorganizes files to proper Next.js structure
REM Run this from the project directory

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ========================================
echo  Next.js App Router Reorganization
echo ========================================
echo.

REM Create directories
echo Step 1: Creating directory structure...
call :create_dirs

REM Copy files
echo.
echo Step 2: Copying files to proper locations...
call :copy_files

REM Run Node reorganization script if available
echo.
echo Step 3: Running Node.js reorganization script...
if exist "move-files.js" (
    node move-files.js
) else if exist "reorganize.js" (
    node reorganize.js
) else (
    echo   ! Node.js scripts not found, trying Python fallback...
    if exist "reorganize_final.py" (
        python reorganize_final.py
    ) else (
        echo   ! Python script not found
    )
)

echo.
echo ========================================
echo  ✅ Reorganization Complete!
echo ========================================
echo.
echo Next steps:
echo   1. npm install
echo   2. npm run build
echo   3. npm run dev
echo.
pause
exit /b 0

:create_dirs
if not exist "app\lib" mkdir "app\lib" && echo   ✓ Created app\lib || echo   ⊘ app\lib exists
if not exist "app\api\newsletters\[id]" mkdir "app\api\newsletters\[id]" && echo   ✓ Created app\api\newsletters\[id] || echo   ⊘ app\api\newsletters\[id] exists
if not exist "app\write" mkdir "app\write" && echo   ✓ Created app\write || echo   ⊘ app\write exists
if not exist "app\newsletters\[id]" mkdir "app\newsletters\[id]" && echo   ✓ Created app\newsletters\[id] || echo   ⊘ app\newsletters\[id] exists
if not exist "app\components" mkdir "app\components" && echo   ✓ Created app\components || echo   ⊘ app\components exists
goto :eof

:copy_files
if exist "app\lib.db.ts" (
    if not exist "app\lib\db.ts" (
        copy /Y "app\lib.db.ts" "app\lib\db.ts" >nul 2>&1 && echo   ✓ lib.db.ts
    ) else (
        echo   ⊘ app\lib\db.ts exists
    )
)

if exist "app\api.newsletters.route.ts" (
    if not exist "app\api\newsletters\route.ts" (
        copy /Y "app\api.newsletters.route.ts" "app\api\newsletters\route.ts" >nul 2>&1 && echo   ✓ api.newsletters.route.ts
    ) else (
        echo   ⊘ app\api\newsletters\route.ts exists
    )
)

if exist "app\api.newsletters.[id].route.ts" (
    if not exist "app\api\newsletters\[id]\route.ts" (
        copy /Y "app\api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts" >nul 2>&1 && echo   ✓ api.newsletters.[id].route.ts
    ) else (
        echo   ⊘ app\api\newsletters\[id]\route.ts exists
    )
)

if exist "app\write.page.tsx" (
    if not exist "app\write\page.tsx" (
        copy /Y "app\write.page.tsx" "app\write\page.tsx" >nul 2>&1 && echo   ✓ write.page.tsx
    ) else (
        echo   ⊘ app\write\page.tsx exists
    )
)

if exist "app\newsletter.[id].page.tsx" (
    if not exist "app\newsletters\[id]\page.tsx" (
        copy /Y "app\newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx" >nul 2>&1 && echo   ✓ newsletter.[id].page.tsx
    ) else (
        echo   ⊘ app\newsletters\[id]\page.tsx exists
    )
)

if exist "app\components.NewsletterCard.tsx" (
    if not exist "app\components\NewsletterCard.tsx" (
        copy /Y "app\components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx" >nul 2>&1 && echo   ✓ components.NewsletterCard.tsx
    ) else (
        echo   ⊘ app\components\NewsletterCard.tsx exists
    )
)

if exist "app\components.PasswordModal.tsx" (
    if not exist "app\components\PasswordModal.tsx" (
        copy /Y "app\components.PasswordModal.tsx" "app\components\PasswordModal.tsx" >nul 2>&1 && echo   ✓ components.PasswordModal.tsx
    ) else (
        echo   ⊘ app\components\PasswordModal.tsx exists
    )
)
goto :eof
