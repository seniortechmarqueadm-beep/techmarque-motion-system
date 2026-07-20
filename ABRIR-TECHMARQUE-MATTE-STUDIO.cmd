@echo off
setlocal
cd /d "%~dp0"
call pnpm studio -- --force-new --webpack-poll 1000
