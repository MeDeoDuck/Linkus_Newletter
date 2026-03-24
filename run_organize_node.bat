@echo off
setlocal enabledelayedexpansion
cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

REM Check if Node.js is available
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Node.js not found in PATH
    echo Trying to find Node...
    if exist "C:\Program Files\nodejs\node.exe" (
        "C:\Program Files\nodejs\node.exe" organize_structure.js
    ) else if exist "C:\Program Files (x86)\nodejs\node.exe" (
        "C:\Program Files (x86)\nodejs\node.exe" organize_structure.js
    ) else (
        echo Node.js installation not found
        exit /b 1
    )
) else (
    node organize_structure.js
)
