@echo off
cd /d c:\Users\seank\OneDrive\Desktop\linkus_newletter

echo Creating directories...
echo.

mkdir app\lib 2>nul && echo ✓ Created: lib || echo   Already exists: lib
mkdir app\api\newsletters\[id] 2>nul && echo ✓ Created: api\newsletters\[id] || echo   Already exists: api\newsletters\[id]
mkdir app\write 2>nul && echo ✓ Created: write || echo   Already exists: write
mkdir app\newsletters\[id] 2>nul && echo ✓ Created: newsletters\[id] || echo   Already exists: newsletters\[id]
mkdir app\components 2>nul && echo ✓ Created: components || echo   Already exists: components

echo.
echo Directory creation complete!
