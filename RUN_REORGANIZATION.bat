@echo off
REM ==============================================================================
REM Next.js App Router Reorganization Script - Batch Wrapper
REM ==============================================================================

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ======================================================================
echo NEXT.JS APP ROUTER FILE REORGANIZATION
echo ======================================================================
echo.

REM Try Python script first
echo Attempting to run Python reorganization script...
echo.

if exist "do-reorganize.py" (
    python do-reorganize.py
    if errorlevel 0 (
        echo.
        echo Python script completed successfully!
        goto :end
    )
)

REM Try manual Python script
echo.
echo Attempting to run manual Python reorganization script...
echo.

if exist "manual_reorganize.py" (
    python manual_reorganize.py
    if errorlevel 0 (
        echo.
        echo Manual Python script completed successfully!
        goto :end
    )
)

REM Try Node.js script as fallback
echo.
echo Attempting to run Node.js reorganization script...
echo.

if exist "reorganize-app-router.js" (
    node reorganize-app-router.js
    if errorlevel 0 (
        echo.
        echo Node.js script completed successfully!
        goto :end
    )
)

echo.
echo ERROR: No reorganization script could be executed!
echo Please ensure:
echo   - Python is installed and in PATH, OR
echo   - Node.js is installed and in PATH
echo.

:end
echo.
echo ======================================================================
echo Reorganization process completed.
echo.
echo Next steps:
echo   1. Verify files are in correct locations
echo   2. Run: npm run build
echo   3. Check for any TypeScript errors
echo   4. Run: npm run dev (to test locally)
echo ======================================================================
echo.
pause
