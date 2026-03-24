@echo off
setlocal enabledelayedexpansion

cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter\app"

echo Creating directories...
mkdir lib
mkdir api
mkdir api\newsletters
mkdir api\newsletters\[id]
mkdir write
mkdir newsletters
mkdir newsletters\[id]
mkdir components

echo.
echo Directories created. Listing structure:
tree /F

echo.
echo Done!
