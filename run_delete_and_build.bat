@echo off
cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
node delete_files.js
echo.
echo Running npm build...
echo.
npm run build
