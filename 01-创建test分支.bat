@echo off
cd /d %~dp0

echo ===== CREATE TEST BRANCH =====

git checkout main
git pull origin main

git checkout -b test
git push -u origin test

echo ===== Done =====
pause