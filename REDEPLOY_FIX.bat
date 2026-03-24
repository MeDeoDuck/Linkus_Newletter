@echo off
REM Quick fix and redeploy
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ==========================================
echo FIXING BUILD ERROR AND REDEPLOYING
echo ==========================================
echo.

REM Stage changes
echo Staging changes...
git add .
echo.

REM Commit with fix message
echo Committing fix...
git commit -m "Fix: Correct postcss.config.js configuration"
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
echo Check your Vercel dashboard for updated build status.
echo.
pause
