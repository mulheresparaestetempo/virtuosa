#!/bin/bash

# Script de Setup Automático - Abba Virtuosa
# Execute: bash setup.sh

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 SETUP ABBA VIRTUOSA                                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir com cor
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# 1. Verificar pré-requisitos
echo ""
echo "📋 Verificando pré-requisitos..."
echo ""

# Verificar Git
if ! command -v git &> /dev/null; then
    print_error "Git não está instalado"
    echo "   Instale em: https://git-scm.com/downloads"
    exit 1
fi
print_status "Git encontrado: $(git --version | awk '{print $3}')"

# Verificar Flutter
if ! command -v flutter &> /dev/null; then
    print_error "Flutter não está instalado"
    echo ""
    echo "   INSTRUÇÕES DE INSTALAÇÃO:"
    echo "   1. Acesse: https://flutter.dev/docs/get-started/install"
    echo "   2. Selecione seu sistema operacional"
    echo "   3. Siga os passos de instalação"
    echo "   4. Execute 'flutter doctor' para verificar"
    echo "   5. Execute este script novamente"
    exit 1
fi
print_status "Flutter encontrado: $(flutter --version | head -1)"

# Verificar Dart
if ! command -v dart &> /dev/null; then
    print_error "Dart não está instalado"
    echo "   Instale junto com Flutter: https://flutter.dev/docs/get-started/install"
    exit 1
fi
print_status "Dart encontrado: $(dart --version)"

# Verificar Node.js (opcional, para web panels)
if ! command -v node &> /dev/null; then
    print_info "Node.js não encontrado (necessário para web panels)"
    echo "   Instale em: https://nodejs.org/ (v18+)"
    SKIP_WEB=true
else
    print_status "Node.js encontrado: $(node --version)"
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    print_info "npm não encontrado (necessário para web panels)"
    SKIP_WEB=true
else
    print_status "npm encontrado: $(npm --version)"
fi

echo ""
echo "🔧 Executando Flutter doctor..."
flutter doctor || print_info "Algumas configurações podem não estar perfeitas"

# 2. Ativar Melos
echo ""
echo "📦 Ativando Melos..."
if ! command -v melos &> /dev/null; then
    print_info "Melos não está ativado, ativando agora..."
    dart pub global activate melos
fi
print_status "Melos ativado"

# 3. Bootstrap
echo ""
echo "🔗 Fazendo bootstrap do monorepo..."
melos bootstrap
print_status "Monorepo bootstrapped"

# 4. Verificar estrutura
echo ""
echo "📁 Verificando estrutura..."

CHECKS=(
    "apps/app_mobile:App Mobile"
    "apps/painel_lider:Dashboard Líder"
    "apps/painel_admin:Dashboard Admin"
    "packages/design_system:Design System"
    "packages/ui_components:UI Components"
    "packages/shared:Shared"
    "packages/bible:Bible"
    "packages/ai:AI"
)

for check in "${CHECKS[@]}"; do
    path="${check%%:*}"
    name="${check##*:}"
    if [ -d "$path" ]; then
        print_status "$name"
    else
        print_error "$name (não encontrado)"
    fi
done

# 5. Criar .env se não existir
echo ""
echo "⚙️  Configurando ambiente..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_status ".env criado (configure com suas credenciais)"
    fi
else
    print_status ".env já existe"
fi

# 6. Resumo
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✨ SETUP COMPLETO!                                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "🎯 Próximas etapas:"
echo ""
echo "1️⃣  RODAR APP MOBILE (Flutter):"
echo "   cd apps/app_mobile"
echo "   flutter run"
echo ""

if [ ! "$SKIP_WEB" = true ]; then
    echo "2️⃣  RODAR DASHBOARD LÍDER (Next.js):"
    echo "   cd apps/painel_lider"
    echo "   npm install"
    echo "   npm run dev"
    echo ""

    echo "3️⃣  RODAR DASHBOARD ADMIN (Next.js):"
    echo "   cd apps/painel_admin"
    echo "   npm install"
    echo "   npm run dev"
    echo ""
fi

echo "4️⃣  VERIFICAR ANÁLISE:"
echo "   melos run check:all"
echo ""

echo "📖 Para mais informações:"
echo "   - SETUP_LOCAL.md (guia completo)"
echo "   - docs/CONTRIBUTING.md (como contribuir)"
echo "   - MONOREPO_COMPLETE.md (visão geral)"
echo ""

echo "🚀 Happy coding!"
