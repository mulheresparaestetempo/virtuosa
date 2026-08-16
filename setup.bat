@echo off
REM Script de Setup Automático - Abba Virtuosa (Windows)
REM Execute: setup.bat

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  🚀 SETUP ABBA VIRTUOSA (Windows)                         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar Git
echo 📋 Verificando pré-requisitos...
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Git não está instalado
    echo   Instale em: https://git-scm.com/downloads
    pause
    exit /b 1
)
for /f "tokens=3" %%i in ('git --version') do echo ✓ Git encontrado: %%i
echo.

REM Verificar Flutter
flutter --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Flutter não está instalado
    echo.
    echo INSTRUÇÕES DE INSTALAÇÃO:
    echo 1. Acesse: https://flutter.dev/docs/get-started/install
    echo 2. Baixe o Flutter SDK for Windows
    echo 3. Extraia em um local seguro (ex: C:\flutter)
    echo 4. Adicione ao PATH do sistema
    echo 5. Abra novo prompt de comando
    echo 6. Execute: flutter doctor
    echo 7. Execute este script novamente
    echo.
    pause
    exit /b 1
)
for /f "tokens=1" %%i in ('flutter --version') do echo ✓ Flutter encontrado: %%i
echo.

REM Verificar Dart
dart --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Dart não está instalado
    echo   Instale junto com Flutter
    pause
    exit /b 1
)
echo ✓ Dart encontrado
echo.

REM Verificar Node.js (opcional)
node --version >nul 2>&1
if errorlevel 1 (
    echo ℹ Node.js não encontrado (necessário para web panels)
    echo   Instale em: https://nodejs.org/ ^(v18+^)
    set SKIP_WEB=1
) else (
    for /f "tokens=1" %%i in ('node --version') do echo ✓ Node.js encontrado: %%i
)
echo.

REM Executar Flutter doctor
echo 🔧 Executando Flutter doctor...
echo.
call flutter doctor
echo.

REM Ativar Melos
echo 📦 Ativando Melos...
where melos >nul 2>&1
if errorlevel 1 (
    echo ℹ Ativando Melos...
    call dart pub global activate melos
)
echo ✓ Melos ativado
echo.

REM Bootstrap
echo 🔗 Fazendo bootstrap do monorepo...
call melos bootstrap
if errorlevel 1 (
    echo ✗ Erro ao fazer bootstrap
    pause
    exit /b 1
)
echo ✓ Monorepo bootstrapped
echo.

REM Verificar estrutura
echo 📁 Verificando estrutura...
echo.

if exist "apps\app_mobile" (
    echo ✓ App Mobile
) else (
    echo ✗ App Mobile (não encontrado)
)

if exist "apps\painel_lider" (
    echo ✓ Dashboard Líder
) else (
    echo ✗ Dashboard Líder (não encontrado)
)

if exist "apps\painel_admin" (
    echo ✓ Dashboard Admin
) else (
    echo ✗ Dashboard Admin (não encontrado)
)

if exist "packages\design_system" (
    echo ✓ Design System
) else (
    echo ✗ Design System (não encontrado)
)

if exist "packages\ui_components" (
    echo ✓ UI Components
) else (
    echo ✗ UI Components (não encontrado)
)

if exist "packages\shared" (
    echo ✓ Shared
) else (
    echo ✗ Shared (não encontrado)
)

if exist "packages\bible" (
    echo ✓ Bible
) else (
    echo ✗ Bible (não encontrado)
)

if exist "packages\ai" (
    echo ✓ AI
) else (
    echo ✗ AI (não encontrado)
)

echo.

REM Criar .env se não existir
echo ⚙️  Configurando ambiente...
if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo ✓ .env criado (configure com suas credenciais)
    )
) else (
    echo ✓ .env já existe
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  ✨ SETUP COMPLETO!                                        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo 🎯 Próximas etapas:
echo.
echo 1️⃣  RODAR APP MOBILE (Flutter):
echo    cd apps\app_mobile
echo    flutter run
echo.

if NOT "%SKIP_WEB%"=="1" (
    echo 2️⃣  RODAR DASHBOARD LÍDER (Next.js):
    echo    cd apps\painel_lider
    echo    npm install
    echo    npm run dev
    echo.

    echo 3️⃣  RODAR DASHBOARD ADMIN (Next.js):
    echo    cd apps\painel_admin
    echo    npm install
    echo    npm run dev
    echo.
)

echo 4️⃣  VERIFICAR ANÁLISE:
echo    melos run check:all
echo.

echo 📖 Para mais informações:
echo    - SETUP_LOCAL.md (guia completo)
echo    - docs\CONTRIBUTING.md (como contribuir)
echo    - MONOREPO_COMPLETE.md (visão geral)
echo.

echo 🚀 Happy coding!
echo.

pause
