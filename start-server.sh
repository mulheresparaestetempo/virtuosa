#!/bin/bash

# Script para rodar o app localmente e expor publicamente

echo "🚀 Iniciando Abba Virtuosa Dashboard..."
echo ""

# Ir para o diretório da app
cd apps/painel_lider

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install --legacy-peer-deps
fi

# Build se necessário
if [ ! -d ".next" ]; then
    echo "🔨 Fazendo build..."
    npm run build
fi

# Iniciar o servidor
echo ""
echo "✅ Servidor iniciando..."
echo ""
npm start

# Ao parar, mostrar instruções
echo ""
echo "Para compartilhar o link com suas discipuladas:"
echo "Use ngrok: ngrok http 3000"
echo "Ou acesse localmente: http://localhost:3000"
