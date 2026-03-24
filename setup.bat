@echo off
REM Create all necessary directories
echo Creating directory structure...

mkdir app\api\newsletters\[id]
mkdir app\newsletter\[id]
mkdir app\write
mkdir components
mkdir lib

echo.
echo Directory structure created successfully!
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Copy the files from the code provided to their respective directories
echo 3. Run: npm run dev
echo.
pause
