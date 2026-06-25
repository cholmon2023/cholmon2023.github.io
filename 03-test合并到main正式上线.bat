@echo off
cd /d %~dp0

echo ===== MERGE TEST TO MAIN =====

git checkout main
git pull origin main

git merge test
git push origin main

echo ===== Done =====
pause