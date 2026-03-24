@echo off
setlocal enabledelayedexpansion
cd /d "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

REM Check if Python is available
where python >nul 2>&1
if %ERRORLEVEL% neq 0 (
    where python3 >nul 2>&1
    if !ERRORLEVEL! neq 0 (
        echo Python not found in PATH
        exit /b 1
    )
    python3 organize_structure.py
) else (
    python organize_structure.py
)
