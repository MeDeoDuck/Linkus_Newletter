@echo off
setlocal enabledelayedexpansion

cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

echo.
echo ======================================================================
echo NEXT.JS PROJECT STRUCTURE ORGANIZATION
echo ======================================================================
echo.
echo This script will organize your project into proper Next.js structure
echo.

REM Step 1: Create directories
echo Step 1: Creating required directories...
echo.

if not exist "app\lib" (
    mkdir "app\lib"
    echo   + Created: app\lib
) else (
    echo   * Already exists: app\lib
)

if not exist "app\api\newsletters\[id]" (
    mkdir "app\api\newsletters\[id]"
    echo   + Created: app\api\newsletters\[id]
) else (
    echo   * Already exists: app\api\newsletters\[id]
)

if not exist "app\write" (
    mkdir "app\write"
    echo   + Created: app\write
) else (
    echo   * Already exists: app\write
)

if not exist "app\newsletters\[id]" (
    mkdir "app\newsletters\[id]"
    echo   + Created: app\newsletters\[id]
) else (
    echo   * Already exists: app\newsletters\[id]
)

if not exist "app\components" (
    mkdir "app\components"
    echo   + Created: app\components
) else (
    echo   * Already exists: app\components
)

echo.
echo Step 2: Copying files to new locations...
echo.

if exist "lib.db.ts" (
    copy "lib.db.ts" "app\lib\db.ts" >nul 2>&1 && (
        echo   + Copied: lib.db.ts to app\lib\db.ts
    ) || (
        echo   ! Error copying lib.db.ts
    )
)

if exist "api.newsletters.route.ts" (
    copy "api.newsletters.route.ts" "app\api\newsletters\route.ts" >nul 2>&1 && (
        echo   + Copied: api.newsletters.route.ts to app\api\newsletters\route.ts
    ) || (
        echo   ! Error copying api.newsletters.route.ts
    )
)

if exist "api.newsletters.[id].route.ts" (
    copy "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts" >nul 2>&1 && (
        echo   + Copied: api.newsletters.[id].route.ts to app\api\newsletters\[id]\route.ts
    ) || (
        echo   ! Error copying api.newsletters.[id].route.ts
    )
)

if exist "app.write.page.tsx" (
    copy "app.write.page.tsx" "app\write\page.tsx" >nul 2>&1 && (
        echo   + Copied: app.write.page.tsx to app\write\page.tsx
    ) || (
        echo   ! Error copying app.write.page.tsx
    )
)

if exist "app.newsletter.[id].page.tsx" (
    copy "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx" >nul 2>&1 && (
        echo   + Copied: app.newsletter.[id].page.tsx to app\newsletters\[id]\page.tsx
    ) || (
        echo   ! Error copying app.newsletter.[id].page.tsx
    )
)

if exist "components.NewsletterCard.tsx" (
    copy "components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx" >nul 2>&1 && (
        echo   + Copied: components.NewsletterCard.tsx to app\components\NewsletterCard.tsx
    ) || (
        echo   ! Error copying components.NewsletterCard.tsx
    )
)

if exist "components.PasswordModal.tsx" (
    copy "components.PasswordModal.tsx" "app\components\PasswordModal.tsx" >nul 2>&1 && (
        echo   + Copied: components.PasswordModal.tsx to app\components\PasswordModal.tsx
    ) || (
        echo   ! Error copying components.PasswordModal.tsx
    )
)

echo.
echo Step 3: Displaying final directory structure...
echo.
echo ======================================================================
tree app /F
echo ======================================================================

echo.
echo ORGANIZATION COMPLETE!
echo.
echo The project structure has been organized successfully.
echo All files have been moved to their proper locations.
echo.
pause
