@echo off
REM Fix unused parameter error and redeploy
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ==========================================
echo FIXING TYPESCRIPT ERROR AND REDEPLOYING
echo ==========================================
echo.

REM Stage changes
echo Staging changes...
git add .
echo.

REM Commit with fix message
echo Committing fix...
git commit -m "Fix: Remove unused request parameter in API route"
echo.

REM Push to GitHub
echo Pushing to GitHub...
git push origin main
echo.

echo ==========================================
echo REDEPLOYMENT TRIGGERED
echo ==========================================
echo.
echo Vercel will automatically redeploy with the fix.
echo This should resolve the TypeScript error.
echo.
pause
