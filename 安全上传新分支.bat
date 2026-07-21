@echo off

for /f "delims=" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i

set NEW_BRANCH=upload-%RANDOM%-%RANDOM%

echo Current branch: %CURRENT_BRANCH%
echo New branch: %NEW_BRANCH%
echo.

git checkout -b %NEW_BRANCH%
if errorlevel 1 goto ERROR

git add -A
if errorlevel 1 goto ERROR

git commit -m "Website update"
if errorlevel 1 goto ERROR

git push origin %NEW_BRANCH%
if errorlevel 1 goto ERROR

echo.
echo UPLOAD SUCCESS
echo Branch: %NEW_BRANCH%
echo.
pause
exit

:ERROR
echo.
echo ERROR: OPERATION FAILED
echo.
pause
exit