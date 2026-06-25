@echo off
cd /d %~dp0

echo ===== RESTORE LOCAL FROM MAIN =====

git fetch origin
git checkout main
git reset --hard origin/main
git clean -fd

echo ===== Restored from GitHub main =====
pause