#!/bin/bash

# Script para rodar o app Abba Virtuosa (Mac/Linux)

echo ""
echo "=========================================="
echo "  🚀 ABBA VIRTUOSA - INICIANDO"
echo "=========================================="
echo ""

cd apps/painel_lider

echo "📦 Instalando dependências..."
npm install --legacy-peer-deps

echo ""
echo "🔨 Fazendo build..."
npm run build

echo ""
echo "✅ Servidor iniciando..."
echo ""
echo "🌐 Acesse: http://localhost:3000"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

npm start
