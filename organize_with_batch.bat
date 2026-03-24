@echo off
REM Directory creation and file organization script
REM This script organizes the Next.js project structure

cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

echo ======================================================================
echo NEXT.JS PROJECT STRUCTURE ORGANIZATION
echo ======================================================================
echo.

echo 1. Creating directories...
mkdir app\lib
mkdir app\api\newsletters\[id]
mkdir app\write
mkdir app\newsletters\[id]
mkdir app\components

echo    Created all required directories
echo.

echo 2. Copying files to new locations...

REM Copy database file
copy lib.db.ts app\lib\db.ts
echo    Copied: lib.db.ts ^-^> app\lib\db.ts

REM Copy API routes
copy api.newsletters.route.ts app\api\newsletters\route.ts
echo    Copied: api.newsletters.route.ts ^-^> app\api\newsletters\route.ts

copy "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts"
echo    Copied: api.newsletters.[id].route.ts ^-^> app\api\newsletters\[id]\route.ts

REM Copy page files
copy app.write.page.tsx app\write\page.tsx
echo    Copied: app.write.page.tsx ^-^> app\write\page.tsx

copy "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx"
echo    Copied: app.newsletter.[id].page.tsx ^-^> app\newsletters\[id]\page.tsx

REM Copy component files
copy components.NewsletterCard.tsx app\components\NewsletterCard.tsx
echo    Copied: components.NewsletterCard.tsx ^-^> app\components\NewsletterCard.tsx

copy components.PasswordModal.tsx app\components\PasswordModal.tsx
echo    Copied: components.PasswordModal.tsx ^-^> app\components\PasswordModal.tsx

echo.
echo 3. Final Directory Structure (app/)
echo ======================================================================
echo.
tree app /F

echo.
echo ======================================================================
echo ORGANIZATION COMPLETE!
echo ======================================================================
