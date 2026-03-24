@echo off
cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
echo Starting build...
call npm run build
echo Build completed with exit code: %ERRORLEVEL%
