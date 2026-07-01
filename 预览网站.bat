@echo off
cd /d "%~dp0"
echo Starting Wang Lab website...
start http://localhost:5173
npx vitepress dev docs
pause
