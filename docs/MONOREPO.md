# Monorepo Structure Guide

Professional monorepo structure for Abba Virtuosa using Melos for Flutter packages.

## Visão Geral

O projeto é organizado como um monorepo contendo:
- **3 aplicações** (Mobile, Leader Panel, Admin Panel)
- **6 pacotes compartilhados** (Design System, UI, Bible, AI, etc)
- **Backend** (Firebase e Cloud Functions)
- **Documentação** (PRD, UX, UI, Arquitetura, Banco de Dados)
- **Assets** (Illustrations, Stickers, Fonts, Icons, Audio)

## Estrutura de Diretórios

### `/apps` - Aplicações Principais

#### `apps/app_mobile/`
**Descrição:** Aplicação Flutter principal para usuárias

**Estrutura:**
```
app_mobile/
├── android/              # Código nativo Android
├── ios/                  # Código nativo iOS
├── web/                  # Build web
├── lib/
│   ├── main.dart
│   ├── features/         # Features por domínio
│   │   ├── auth/
│   │   ├── home/
│   │   ├── devotional/
│   │   ├── prayer/
│   │   ├── fasting/
│   │   ├── journal/
│   │   ├── community/
│   │   └── ...
│   ├── core/
│   │   ├── theme/
│   │   ├── router/
│   │   ├── services/
│   │   └── widgets/
│   └── config/
├── pubspec.yaml
└── test/
```

**Dependências:**
- `design_system` - Design tokens
- `ui_components` - UI components
- `shared` - Shared utilities
- `bible` - Bible functionality
- `ai` - AI integration

#### `apps/painel_lider/`
**Descrição:** Dashboard para líderes espirituais

**Funcionalidades:**
- Gerenciamento de discípulas
- Pedidos de oração
- Acompanhamento espiritual
- Mensagens e notificações
- Relatórios e metas
- Agendamento de cultos

**Stack:** Next.js + React + TypeScript

#### `apps/painel_admin/`
**Descrição:** Dashboard administrativo

**Funcionalidades:**
- Gerenciamento de usuárias
- Igrejas e líderes
- Cursos e devocionais
- Comunidade e biblioteca
- Analytics
- Configurações do sistema

**Stack:** Next.js + React + TypeScript

### `/packages` - Pacotes Compartilhados

#### `packages/design_system/`
**Descrição:** Design tokens e tema visual

**Conteúdo:**
```
design_system/
├── lib/
│   ├── colors.dart       # Paleta de cores
│   ├── typography.dart   # Tipografia
│   ├── spacing.dart      # Espaçamentos
│   ├── shadows.dart      # Sombras
│   ├── radius.dart       # Border radius
│   ├── theme.dart        # Material Theme
│   └── tokens.dart       # Design tokens centralizados
└── pubspec.yaml
```

**Exporta:**
- Paleta Bordo/Dourado/Rosé
- 4 Google Fonts
- Temas claro/escuro
- Componentes Material 3

#### `packages/ui_components/`
**Descrição:** Componentes reutilizáveis

**Componentes:**
- Buttons (Primary, Secondary, Glass)
- Cards (Verse, Prayer, Devotional, Journal, etc)
- Input fields
- Navigation widgets
- Modals e dialogs
- Animations

**Dependência:** `design_system`

#### `packages/stickers/`
**Descrição:** Sistema de stickers e badges

**Conteúdo:**
- Definição de stickers (structs)
- Repository para stickers
- UI components para exibição
- Sistema de desbloqueio

#### `packages/shared/`
**Descrição:** Utilitários compartilhados

**Conteúdo:**
```
shared/
├── lib/
│   ├── extensions/       # String, DateTime extensions
│   ├── utils/            # Validators, formatters
│   ├── constants/        # App constants
│   ├── models/           # Shared data models
│   ├── exceptions/       # Custom exceptions
│   └── helpers/          # Helper functions
```

#### `packages/bible/`
**Descrição:** Funcionalidades relacionadas à Bíblia

**Conteúdo:**
```
bible/
├── lib/
│   ├── models/
│   │   ├── verse.dart
│   │   ├── book.dart
│   │   └── reading_plan.dart
│   ├── repositories/
│   ├── datasources/
│   └── services/
```

**Funcionalidades:**
- Banco de dados bíblico
- Busca de versículos
- Planos de leitura
- Estudos temáticos

#### `packages/ai/`
**Descrição:** Integração com IA

**Conteúdo:**
```
ai/
├── lib/
│   ├── models/
│   │   ├── ai_request.dart
│   │   ├── ai_response.dart
│   │   └── bible_verse.dart
│   ├── services/
│   │   ├── claude_service.dart
│   │   ├── openai_service.dart
│   │   └── ai_coordinator.dart
│   └── repositories/
```

**Funcionalidades:**
- Claude API integration
- OpenAI integration
- Bible assistant
- Prompt management
- Response processing

### `/backend` - Backend e Cloud Functions

#### `backend/firebase/`
**Descrição:** Configurações Firebase

**Conteúdo:**
- Firestore security rules
- Storage rules
- Firebase config

#### `backend/functions/`
**Descrição:** Cloud Functions

**Conteúdo:**
```
functions/
├── src/
│   ├── index.ts
│   ├── scheduled/        # Scheduled functions
│   ├── triggers/         # Event triggers
│   ├── http/             # HTTP callable functions
│   └── utils/            # Helpers
├── package.json
└── tsconfig.json
```

### `/docs` - Documentação

#### `docs/prd/`
Product Requirements Documents
- Product overview
- Features breakdown
- User stories
- Acceptance criteria

#### `docs/ux/`
UX Documentation
- User flows
- Wireframes
- Interaction patterns
- Accessibility guidelines

#### `docs/ui/`
UI Specifications
- Design system documentation
- Component specifications
- Style guide
- Spacing and sizing

#### `docs/arquitetura/`
Architecture Documentation
- System architecture
- Clean Architecture pattern
- Feature structure
- Dependency injection

#### `docs/banco/`
Database Documentation
- Firestore schema
- Collections description
- Relationships
- Indexes
- Security rules

#### `docs/prompts/`
AI Prompts Documentation
- System prompts
- Example prompts
- Prompt engineering guidelines
- Response formats

### `/assets` - Recursos

#### `assets/illustrations/`
Ilustrações e gráficos

#### `assets/stickers/`
Stickers e badges

#### `assets/fonts/`
Google Fonts (já inclusos no `design_system`)

#### `assets/icons/`
Ícones customizados

#### `assets/audio/`
Áudio e música

## Dependências Entre Pacotes

```
app_mobile
├── design_system (core design tokens)
├── ui_components (reusable UI)
├── shared (utilities)
├── bible (Bible data & search)
├── stickers (achievement system)
└── ai (Bible assistant)

painel_lider & painel_admin
└── Próprias dependências Next.js

design_system
└── Standalone (sem dependências)

ui_components
└── design_system

shared
└── Standalone

bible
├── shared
└── design_system (optional)

ai
├── shared
└── bible

stickers
└── shared
```

## Workflows Melos

### Bootstrap (Setup Inicial)
```bash
melos bootstrap
```
- Resolve todas as dependências
- Cria links simbólicos entre pacotes
- Ativa overrides do pubspec

### Analisar Código
```bash
melos analyze
```
Executa `flutter analyze` em todos os pacotes

### Formatar Código
```bash
melos format
```
Executa `dart format` em todos os pacotes

### Rodar Testes
```bash
melos test
```
Executa testes em todos os pacotes

### Executar App Mobile
```bash
melos run app:mobile:dev
```

### Build para Release
```bash
melos run app:mobile:release
```

### Atualizar Dependências
```bash
melos pub:upgrade
```

### Verificação Completa
```bash
melos run check:all
```
- Analisa código
- Formata
- Roda testes
- Valida build

## Convenções

### Naming
- **Pacotes:** Snake case (`design_system`, `ui_components`)
- **Classes:** PascalCase (`PrimaryButton`, `DevotionalCard`)
- **Arquivos:** Snake case (`primary_button.dart`)
- **Diretórios:** Snake case (`ui_components`, `features`)

### Imports
Usar imports relativos para mesma feature:
```dart
import 'package:shared/shared.dart';  // Pacotes
import '../../../core/theme/app_colors.dart';  // Relativo
```

### Estrutura de Features
```
feature_name/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── data/
│   ├── models/
│   ├── datasources/
│   └── repositories_impl/
└── presentation/
    ├── screens/
    ├── widgets/
    ├── controllers/
    └── providers/
```

## Publicação de Pacotes

### Preparação
```bash
# 1. Atualizar versão no pubspec.yaml
# 2. Atualizar CHANGELOG.md
# 3. Commit e push
git commit -m "Release package v1.0.0"
git push
```

### Publicação
```bash
cd packages/design_system
flutter pub publish
```

## CI/CD

GitHub Actions workflows em `.github/workflows/`:
- `analyze.yml` - Análise de código
- `test.yml` - Testes automáticos
- `build.yml` - Build do app mobile
- `deploy.yml` - Deploy do backend

## Troubleshooting

### Dependência não encontrada
```bash
melos clean
melos bootstrap
```

### Conflitos de versão
```bash
melos pub:upgrade
```

### Build falhando
```bash
cd apps/app_mobile
flutter clean
flutter pub get
flutter build ios
```

---

**Última atualização:** Agosto 2024
**Mantido por:** Abba Virtuosa Dev Team
