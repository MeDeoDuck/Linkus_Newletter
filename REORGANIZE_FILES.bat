@echo off
setlocal enabledelayedexpansion

REM Next.js App Router File Reorganization Script for Windows
REM Change to the project root directory
cd /d "%~dp0"

echo.
echo ========================================================================
echo NEXT.JS APP ROUTER FILE REORGANIZATION
echo ========================================================================
echo.

REM Step 1: Create all necessary directories
echo STEP 1: Creating directory structure...
echo.

if not exist "app\lib" (
    mkdir "app\lib"
    echo   [OK] Created: app\lib\
) else (
    echo   [SKIP] app\lib\ (already exists)
)

if not exist "app\api\newsletters" (
    mkdir "app\api\newsletters"
    echo   [OK] Created: app\api\newsletters\
) else (
    echo   [SKIP] app\api\newsletters\ (already exists)
)

if not exist "app\api\newsletters\[id]" (
    mkdir "app\api\newsletters\[id]
    echo   [OK] Created: app\api\newsletters\[id]\
) else (
    echo   [SKIP] app\api\newsletters\[id]\ (already exists)
)

if not exist "app\write" (
    mkdir "app\write"
    echo   [OK] Created: app\write\
) else (
    echo   [SKIP] app\write\ (already exists)
)

if not exist "app\newsletters\[id]" (
    mkdir "app\newsletters\[id]
    echo   [OK] Created: app\newsletters\[id]\
) else (
    echo   [SKIP] app\newsletters\[id]\ (already exists)
)

if not exist "app\components" (
    mkdir "app\components"
    echo   [OK] Created: app\components\
) else (
    echo   [SKIP] app\components\ (already exists)
)

REM Step 2: Copy files to their new locations
echo.
echo STEP 2: Copying files to their proper locations...
echo.

if exist "app\lib.db.ts" (
    copy "app\lib.db.ts" "app\lib\db.ts" >nul 2>&1
    if errorlevel 1 (
        echo   [FAIL] Failed to copy lib.db.ts
    ) else (
        echo   [OK] lib.db.ts ^-^> app\lib\db.ts
    )
) else (
    echo   [MISSING] app\lib.db.ts not found
)

if exist "app\api.newsletters.route.ts" (
    copy "app\api.newsletters.route.ts" "app\api\newsletters\route.ts" >nul 2>&1
    if errorlevel 1 (
        echo   [FAIL] Failed to copy api.newsletters.route.ts
    ) else (
        echo   [OK] api.newsletters.route.ts ^-^> app\api\newsletters\route.ts
    )
) else (
    echo   [MISSING] app\api.newsletters.route.ts not found
)

if exist "app\api.newsletters.[id].route.ts" (
    copy "app\api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts" >nul 2>&1
    if errorlevel 1 (
        echo   [FAIL] Failed to copy api.newsletters.[id].route.ts
    ) else (
        echo   [OK] api.newsletters.[id].route.ts ^-^> app\api\newsletters\[id]\route.ts
    )
) else (
    echo   [MISSING] app\api.newsletters.[id].route.ts not found
)

if exist "app\write.page.tsx" (
    copy "app\write.page.tsx" "app\write\page.tsx" >nul 2>&1
    if errorlevel 1 (
        echo   [FAIL] Failed to copy write.page.tsx
    ) else (
        echo   [OK] write.page.tsx ^-^> app\write\page.tsx
    )
) else (
    echo   [MISSING] app\write.page.tsx not found
)

if exist "app\newsletter.[id].page.tsx" (
    copy "app\newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx" >nul 2>&1
    if errorlevel 1 (
        echo   [FAIL] Failed to copy newsletter.[id].page.tsx
    ) else (
        echo   [OK] newsletter.[id].page.tsx ^-^> app\newsletters\[id]\page.tsx
    )
) else (
    echo   [MISSING] app\newsletter.[id].page.tsx not found
)

if exist "app\components.NewsletterCard.tsx" (
    copy "app\components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx" >nul 2>&1
    if errorlevel 1 (
        echo   [FAIL] Failed to copy components.NewsletterCard.tsx
    ) else (
        echo   [OK] components.NewsletterCard.tsx ^-^> app\components\NewsletterCard.tsx
    )
) else (
    echo   [MISSING] app\components.NewsletterCard.tsx not found
)

if exist "app\components.PasswordModal.tsx" (
    copy "app\components.PasswordModal.tsx" "app\components\PasswordModal.tsx" >nul 2>&1
    if errorlevel 1 (
        echo   [FAIL] Failed to copy components.PasswordModal.tsx
    ) else (
        echo   [OK] components.PasswordModal.tsx ^-^> app\components\PasswordModal.tsx
    )
) else (
    echo   [MISSING] app\components.PasswordModal.tsx not found
)

REM Step 3: Verify structure
echo.
echo STEP 3: Verifying final structure...
echo.

set missing=0

if exist "app\lib\db.ts" (
    echo   [VERIFIED] app\lib\db.ts
) else (
    echo   [MISSING] app\lib\db.ts
    set /a missing+=1
)

if exist "app\api\newsletters\route.ts" (
    echo   [VERIFIED] app\api\newsletters\route.ts
) else (
    echo   [MISSING] app\api\newsletters\route.ts
    set /a missing+=1
)

if exist "app\api\newsletters\[id]\route.ts" (
    echo   [VERIFIED] app\api\newsletters\[id]\route.ts
) else (
    echo   [MISSING] app\api\newsletters\[id]\route.ts
    set /a missing+=1
)

if exist "app\write\page.tsx" (
    echo   [VERIFIED] app\write\page.tsx
) else (
    echo   [MISSING] app\write\page.tsx
    set /a missing+=1
)

if exist "app\newsletters\[id]\page.tsx" (
    echo   [VERIFIED] app\newsletters\[id]\page.tsx
) else (
    echo   [MISSING] app\newsletters\[id]\page.tsx
    set /a missing+=1
)

if exist "app\components\NewsletterCard.tsx" (
    echo   [VERIFIED] app\components\NewsletterCard.tsx
) else (
    echo   [MISSING] app\components\NewsletterCard.tsx
    set /a missing+=1
)

if exist "app\components\PasswordModal.tsx" (
    echo   [VERIFIED] app\components\PasswordModal.tsx
) else (
    echo   [MISSING] app\components\PasswordModal.tsx
    set /a missing+=1
)

REM Step 4: Show directory listing
echo.
echo STEP 4: Directory structure (app folder):
echo.
tree "app" /F

REM Final Summary
echo.
echo ========================================================================
if %missing% equ 0 (
    echo ^[SUCCESS^] All files reorganized successfully!
) else (
    echo ^[WARNING^] %missing% file(s) still missing
)
echo ========================================================================
echo.
echo NEXT STEPS:
echo   1. Verify tsconfig.json paths:
echo      - "@/lib/db" ^-^> "./app/lib/db.ts"
echo      - "@/components/*" ^-^> "./app/components/*"
echo   2. Run: npm run build
echo   3. Check for TypeScript/build errors
echo   4. Run: npm run dev
echo.
echo ========================================================================
echo.

pause
endlocal
