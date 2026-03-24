@echo off
REM Comprehensive Organization Script
REM This script organizes the Next.js project into the proper structure

setlocal enabledelayedexpansion
color 0A
cls

title Next.js Project Organization - Organizing Structure...

cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

echo.
echo ========================================================================
echo                                                                         
echo    NEXT.JS PROJECT STRUCTURE ORGANIZATION                             
echo                                                                         
echo ========================================================================
echo.
echo PROJECT LOCATION: %CD%
echo.

REM Step 1: Create all required directories
echo [STEP 1/3] Creating directories...
echo.

for %%D in (
    "app\lib"
    "app\api\newsletters\[id]"
    "app\write"
    "app\newsletters\[id]"
    "app\components"
) do (
    if not exist "%%D" (
        mkdir "%%D" 2>nul
        if errorlevel 0 echo   [OK]   Created: %%D
    ) else (
        echo   [EXISTS]  %%D
    )
)

echo.
echo [STEP 2/3] Copying files to new locations...
echo.

REM Copy lib.db.ts
if exist "lib.db.ts" (
    copy /Y "lib.db.ts" "app\lib\db.ts" >nul 2>&1
    if errorlevel 0 (
        echo   [OK]   lib.db.ts -^> app\lib\db.ts
    ) else (
        echo   [ERR]  Failed: lib.db.ts
    )
)

REM Copy api.newsletters.route.ts
if exist "api.newsletters.route.ts" (
    copy /Y "api.newsletters.route.ts" "app\api\newsletters\route.ts" >nul 2>&1
    if errorlevel 0 (
        echo   [OK]   api.newsletters.route.ts -^> app\api\newsletters\route.ts
    ) else (
        echo   [ERR]  Failed: api.newsletters.route.ts
    )
)

REM Copy api.newsletters.[id].route.ts
if exist "api.newsletters.[id].route.ts" (
    copy /Y "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts" >nul 2>&1
    if errorlevel 0 (
        echo   [OK]   api.newsletters.[id].route.ts -^> app\api\newsletters\[id]\route.ts
    ) else (
        echo   [ERR]  Failed: api.newsletters.[id].route.ts
    )
)

REM Copy app.write.page.tsx
if exist "app.write.page.tsx" (
    copy /Y "app.write.page.tsx" "app\write\page.tsx" >nul 2>&1
    if errorlevel 0 (
        echo   [OK]   app.write.page.tsx -^> app\write\page.tsx
    ) else (
        echo   [ERR]  Failed: app.write.page.tsx
    )
)

REM Copy app.newsletter.[id].page.tsx
if exist "app.newsletter.[id].page.tsx" (
    copy /Y "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx" >nul 2>&1
    if errorlevel 0 (
        echo   [OK]   app.newsletter.[id].page.tsx -^> app\newsletters\[id]\page.tsx
    ) else (
        echo   [ERR]  Failed: app.newsletter.[id].page.tsx
    )
)

REM Copy components.NewsletterCard.tsx
if exist "components.NewsletterCard.tsx" (
    copy /Y "components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx" >nul 2>&1
    if errorlevel 0 (
        echo   [OK]   components.NewsletterCard.tsx -^> app\components\NewsletterCard.tsx
    ) else (
        echo   [ERR]  Failed: components.NewsletterCard.tsx
    )
)

REM Copy components.PasswordModal.tsx
if exist "components.PasswordModal.tsx" (
    copy /Y "components.PasswordModal.tsx" "app\components\PasswordModal.tsx" >nul 2>&1
    if errorlevel 0 (
        echo   [OK]   components.PasswordModal.tsx -^> app\components\PasswordModal.tsx
    ) else (
        echo   [ERR]  Failed: components.PasswordModal.tsx
    )
)

echo.
echo [STEP 3/3] Displaying directory structure...
echo.
echo ========================================================================
echo.
tree app /F 2>nul
if errorlevel 1 (
    echo.
    echo Unable to display tree. Listing files instead:
    echo.
    dir /S app
)
echo.
echo ========================================================================
echo.
echo ORGANIZATION COMPLETED SUCCESSFULLY!
echo.
echo All files have been organized into the proper Next.js structure:
echo   - Database utilities in app/lib/
echo   - API routes in app/api/
echo   - Page components in app/write/ and app/newsletters/[id]/
echo   - Shared components in app/components/
echo.
echo ========================================================================
echo.

endlocal
pause
