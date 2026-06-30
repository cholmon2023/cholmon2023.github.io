@echo off
cd /d %~dp0

echo ===== MERGE TEST TO MAIN =====

git checkout test
git add .
git commit -m "save test before merge"
git push origin test

git checkout main
git pull origin main

git merge test
git push origin main

git checkout test

echo ===== Done. Back to test branch. =====
pause