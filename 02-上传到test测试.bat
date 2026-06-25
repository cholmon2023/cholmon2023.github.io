@echo off
cd /d %~dp0

echo ===== PUSH TO TEST =====

git checkout test
git add .
git commit -m "test update"
git push origin test

echo ===== Done =====
pause