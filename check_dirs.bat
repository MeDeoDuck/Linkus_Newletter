@echo off
REM Create necessary directories
echo Creating directories...
if not exist "app\lib" mkdir "app\lib"
if not exist "app\api\newsletters\[id]" mkdir "app\api\newsletters\[id]"
if not exist "app\write" mkdir "app\write"
if not exist "app\newsletters\[id]" mkdir "app\newsletters\[id]"
if not exist "app\components" mkdir "app\components"

echo Directories created. Current state:
dir /s /b app\ | find ".ts" | find ".tsx"
