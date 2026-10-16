@echo off
setlocal
echo ======================================================
echo 🚀 Push PingPark to GitHub
echo ======================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/your-username/PingPark.git): "

if "%REPO_URL%"=="" (
    echo Error: No URL entered.
    pause
    exit /b
)

echo.
echo Adding remote origin: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ======================================================
    echo 🎉 Successfully pushed to GitHub!
    echo Now you can connect this repo to Render.com!
    echo ======================================================
) else (
    echo.
    echo ❌ Push failed. Please check your GitHub repository URL and permissions.
)
pause
