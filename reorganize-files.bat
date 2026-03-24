@echo off
REM Reorganize Next.js project structure
REM This batch file creates directories and moves files to proper locations

setlocal enabledelayedexpansion

cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

echo.
echo ========================================
echo  Reorganizing Project Structure
echo ========================================
echo.

REM Create directory structure
echo [1/3] Creating directory structure...
echo.

if not exist "app\lib" (
    mkdir "app\lib"
    echo   ✓ Created app\lib
) else (
    echo   ✓ app\lib already exists
)

if not exist "app\api" (
    mkdir "app\api\newsletters\[id]"
    echo   ✓ Created app\api\newsletters\[id]
) else if not exist "app\api\newsletters\[id]" (
    mkdir "app\api\newsletters\[id]"
    echo   ✓ Created app\api\newsletters\[id]
) else (
    echo   ✓ app\api\newsletters\[id] already exists
)

if not exist "app\write" (
    mkdir "app\write"
    echo   ✓ Created app\write
) else (
    echo   ✓ app\write already exists
)

if not exist "app\newsletters\[id]" (
    mkdir "app\newsletters\[id]"
    echo   ✓ Created app\newsletters\[id]
) else (
    echo   ✓ app\newsletters\[id] already exists
)

if not exist "app\components" (
    mkdir "app\components"
    echo   ✓ Created app\components
) else (
    echo   ✓ app\components already exists
)

echo.
echo [2/3] Copying files to proper locations...
echo.

REM Copy files
if exist "lib.db.ts" (
    if not exist "app\lib\db.ts" (
        copy "lib.db.ts" "app\lib\db.ts" >nul
        echo   ✓ lib.db.ts → app\lib\db.ts
    ) else (
        echo   ⊘ app\lib\db.ts already exists
    )
) else (
    echo   ✗ lib.db.ts not found
)

if exist "api.newsletters.route.ts" (
    if not exist "app\api\newsletters\route.ts" (
        copy "api.newsletters.route.ts" "app\api\newsletters\route.ts" >nul
        echo   ✓ api.newsletters.route.ts → app\api\newsletters\route.ts
    ) else (
        echo   ⊘ app\api\newsletters\route.ts already exists
    )
) else (
    echo   ✗ api.newsletters.route.ts not found
)

if exist "api.newsletters.[id].route.ts" (
    if not exist "app\api\newsletters\[id]\route.ts" (
        copy "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts" >nul
        echo   ✓ api.newsletters.[id].route.ts → app\api\newsletters\[id]\route.ts
    ) else (
        echo   ⊘ app\api\newsletters\[id]\route.ts already exists
    )
) else (
    echo   ✗ api.newsletters.[id].route.ts not found
)

if exist "app.write.page.tsx" (
    if not exist "app\write\page.tsx" (
        copy "app.write.page.tsx" "app\write\page.tsx" >nul
        echo   ✓ app.write.page.tsx → app\write\page.tsx
    ) else (
        echo   ⊘ app\write\page.tsx already exists
    )
) else (
    echo   ✗ app.write.page.tsx not found
)

if exist "app.newsletter.[id].page.tsx" (
    if not exist "app\newsletters\[id]\page.tsx" (
        copy "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx" >nul
        echo   ✓ app.newsletter.[id].page.tsx → app\newsletters\[id]\page.tsx
    ) else (
        echo   ⊘ app\newsletters\[id]\page.tsx already exists
    )
) else (
    echo   ✗ app.newsletter.[id].page.tsx not found
)

if exist "components.NewsletterCard.tsx" (
    if not exist "app\components\NewsletterCard.tsx" (
        copy "components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx" >nul
        echo   ✓ components.NewsletterCard.tsx → app\components\NewsletterCard.tsx
    ) else (
        echo   ⊘ app\components\NewsletterCard.tsx already exists
    )
) else (
    echo   ✗ components.NewsletterCard.tsx not found
)

if exist "components.PasswordModal.tsx" (
    if not exist "app\components\PasswordModal.tsx" (
        copy "components.PasswordModal.tsx" "app\components\PasswordModal.tsx" >nul
        echo   ✓ components.PasswordModal.tsx → app\components\PasswordModal.tsx
    ) else (
        echo   ⊘ app\components\PasswordModal.tsx already exists
    )
) else (
    echo   ✗ components.PasswordModal.tsx not found
)

echo.
echo [3/3] Running Node.js reorganize script...
echo.

if exist "reorganize-all.js" (
    node "reorganize-all.js"
) else (
    echo   ! reorganize-all.js not found, skipping advanced reorganization
)

echo.
echo ========================================
echo  ✅ Reorganization Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Verify the file structure
echo   2. Run: npm install (if not already done)
echo   3. Run: npm run build
echo   4. Run: npm run dev
echo.
pause
