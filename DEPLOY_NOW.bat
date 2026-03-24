@echo off
REM Deploy to Vercel - Simple Windows Batch Script
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ==========================================
echo DEPLOYMENT TO VERCEL
echo ==========================================
echo.

REM Step 1: Check git
echo Step 1: Checking Git...
git --version > nul 2>&1
if errorlevel 1 (
    echo ERROR: Git not found. Please install Git.
    pause
    exit /b 1
)
echo OK: Git found
echo.

REM Step 2: Check for changes
echo Step 2: Checking for changes...
git status --porcelain > nul
if errorlevel 0 (
    echo Changes detected or repository clean
)
echo.

REM Step 3: Stage changes
echo Step 3: Staging all changes...
git add .
echo OK: Changes staged
echo.

REM Step 4: Commit
echo Step 4: Creating commit...
git commit -m "Restructure: Move files to Next.js App Router format for Vercel"
if errorlevel 1 (
    echo WARNING: No changes to commit or commit failed
) else (
    echo OK: Changes committed
)
echo.

REM Step 5: Push to GitHub
echo Step 5: Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: Failed to push to GitHub
    echo Make sure you have internet connection and correct permissions
    pause
    exit /b 1
)
echo OK: Successfully pushed to GitHub!
echo.

REM Step 6: Final message
echo ==========================================
echo DEPLOYMENT COMPLETE
echo ==========================================
echo.
echo Your changes have been pushed to GitHub!
echo Vercel will automatically deploy your project.
echo.
echo Monitor deployment at: https://vercel.com/dashboard
echo.
pause
