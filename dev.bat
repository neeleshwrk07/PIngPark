@echo off
title ParkPing - Full Dev Mode (Server + Vite Client)
cd /d "%~dp0"

echo ===================================================================
echo     Starting ParkPing in Hot-Reload Development Mode
echo ===================================================================

:: Start backend in separate window
echo Starting Backend API on port 5000...
start "ParkPing Backend API" cmd /c "cd /d %~dp0server && node server.js"

:: Wait 2 seconds for backend
timeout /t 2 /nobreak >nul

:: Launch browser to Vite dev port 5173
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5173"

:: Start frontend Vite dev server in this window
echo Starting Frontend Vite Dev Server on port 5173...
cd /d "%~dp0client"
npm run dev
