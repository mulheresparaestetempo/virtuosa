@echo off
REM Script para rodar o app Abba Virtuosa (Windows)

title Abba Virtuosa - Iniciando...

echo.
echo ==========================================
echo  🚀 ABBA VIRTUOSA - INICIANDO
echo ==========================================
echo.

cd apps\painel_lider

echo 📦 Instalando dependências...
call npm install --legacy-peer-deps

echo.
echo 🔨 Fazendo build...
call npm run build

echo.
echo ✅ Servidor iniciando...
echo.
echo 🌐 Acesse: http://localhost:3000
echo.

call npm start

pause
