@echo off

for /f "delims=" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i

if "%CURRENT_BRANCH%"=="main" (
    echo.
    echo Current branch is already main.
    echo.
    pause
    exit
)

git branch -M main

git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ERROR: PUSH FAILED
    echo.
    pause
    exit
)

echo.
echo SUCCESS
echo Local branch: main
echo Remote branch: main
echo.
pause