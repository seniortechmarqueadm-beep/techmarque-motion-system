@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "NODE_DIR=C:\Users\allan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "REMOTION_CMD=%PROJECT_DIR%node_modules\.bin\remotion.CMD"

cd /d "%PROJECT_DIR%"

if not exist "%REMOTION_CMD%" (
  echo Nao encontrei o Remotion local em:
  echo %REMOTION_CMD%
  echo.
  echo Tente reinstalar as dependencias ou rode:
  echo npm install
  pause
  exit /b 1
)

set "PATH=%NODE_DIR%;%PATH%"

echo Abrindo TechmarqueMatteOpportunity no Remotion Studio...
echo URL esperada: http://localhost:3000
echo.

call "%REMOTION_CMD%" studio src/index.ts --force-new --webpack-poll 1000 --port 3000

if errorlevel 1 (
  echo.
  echo O Remotion Studio encerrou com erro.
  pause
)
