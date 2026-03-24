@echo off
cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

echo ===== STEP 1: Navigate to project directory =====
echo Current directory: %cd%
echo.

echo ===== STEP 2: Create all directories =====
mkdir "app\lib" 2>NUL
echo Created: app\lib
mkdir "app\api\newsletters\[id]" 2>NUL
echo Created: app\api\newsletters\[id]
mkdir "app\write" 2>NUL
echo Created: app\write
mkdir "app\newsletters\[id]" 2>NUL
echo Created: app\newsletters\[id]
mkdir "app\components" 2>NUL
echo Created: app\components
echo.

echo ===== STEP 3: Copy all files to their destination locations =====
copy /Y "lib.db.ts" "app\lib\db.ts"
echo Copied: lib.db.ts to app\lib\db.ts

copy /Y "api.newsletters.route.ts" "app\api\newsletters\route.ts"
echo Copied: api.newsletters.route.ts to app\api\newsletters\route.ts

copy /Y "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts"
echo Copied: api.newsletters.[id].route.ts to app\api\newsletters\[id]\route.ts

copy /Y "app.write.page.tsx" "app\write\page.tsx"
echo Copied: app.write.page.tsx to app\write\page.tsx

copy /Y "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx"
echo Copied: app.newsletter.[id].page.tsx to app\newsletters\[id]\page.tsx

copy /Y "components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx"
echo Copied: components.NewsletterCard.tsx to app\components\NewsletterCard.tsx

copy /Y "components.PasswordModal.tsx" "app\components\PasswordModal.tsx"
echo Copied: components.PasswordModal.tsx to app\components\PasswordModal.tsx
echo.

echo ===== STEP 4: Verify structure =====
echo Directory listing (filtered for .ts and .tsx files):
dir /s app | findstr /E "\.ts$|\.tsx$"
echo.

echo ===== STEP 5: Run build =====
call npm run build
echo.

echo ===== REORGANIZATION COMPLETE =====
pause
