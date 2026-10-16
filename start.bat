@echo off
title PingPark - Smart Parking QR Platform

echo ===================================================================
echo             PINGPARK - SMART QR PARKING PLATFORM
echo ===================================================================
echo [1/3] Checking environment...

cd /d "%~dp0"

:: Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found on your system PATH!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [2/3] Checking network ports...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do taskkill /f /pid %%a >nul 2>nul


echo [3/3] Starting PingPark Server...
echo.
echo ===================================================================
echo   Web App is live at: http://localhost:5000
echo   Launching default browser in 2 seconds...
echo ===================================================================
echo.

:: Launch browser after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5000"

:: Start the server
cd /d "%~dp0server"
node server.js

pause
