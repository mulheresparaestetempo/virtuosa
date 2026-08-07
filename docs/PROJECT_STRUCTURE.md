# Project Structure Guide

Explicação detalhada da estrutura do projeto Abba Virtuosa.

## Overview

Abba Virtuosa é um monorepo contendo múltiplas aplicações, pacotes compartilhados, backend, e documentação.

```
filha/
├── apps/                    # Aplicações principais
├── packages/                # Pacotes compartilhados
├── backend/                 # Backend e serverless
├── docs/                    # Documentação
├── assets/                  # Recursos compartilhados
├── .github/                 # GitHub workflows
├── melos.yaml               # Monorepo config
└── README.md
```

## Apps

### 1. app_mobile
**Aplicação Flutter para usuárias finais**

```
app_mobile/
├── android/                 # Código nativo Android (Kotlin)
├── ios/                     # Código nativo iOS (Swift)
├── web/                     # Web build
├── lib/
│   ├── main.dart           # Entry point
│   ├── features/           # Feature modules
│   │   ├── auth/           # Autenticação (login, signup)
│   │   ├── home/           # Home screen
│   │   ├── devotional/     # Vida devocional
│   │   ├── place/          # Seu lugar secreto
│   │   ├── prayer/         # Orações
│   │   ├── fasting/        # Jejum
│   │   ├── journal/        # Diário
│   │   ├── memorial/       # Memoriais
│   │   ├── community/      # Comunidade
│   │   ├── library/        # Biblioteca
│   │   ├── events/         # Eventos
│   │   ├── courses/        # Cursos
│   │   ├── ai/             # Assistente IA
│   │   └── profile/        # Perfil
│   ├── core/               # Compartilhado
│   │   ├── theme/          # Material Theme
│   │   ├── router/         # GoRouter
│   │   ├── services/       # Firebase, etc
│   │   ├── widgets/        # Global widgets
│   │   ├── extensions/     # Dart extensions
│   │   └── utils/          # Utilities
│   └── config/             # Configurações
├── test/                    # Testes unitários
├── pubspec.yaml
├── analysis_options.yaml
└── README.md
```

**Tech Stack:**
- Flutter 3.13+
- Riverpod (State Management)
- GoRouter (Navigation)
- Firebase (Backend)
- Dio (HTTP)
- GetIt (Service Locator)

**Dependências de Pacotes:**
- `design_system` - Design tokens
- `ui_components` - Componentes reutilizáveis
- `shared` - Utilitários
- `bible` - Dados bíblicos
- `stickers` - Sistema de stickers
- `ai` - Integração IA

### 2. painel_lider
**Dashboard para líderes espirituais**

```
painel_lider/
├── src/
│   ├── pages/             # Páginas Next.js
│   ├── components/        # Componentes React
│   ├── hooks/             # Hooks customizados
│   ├── utils/             # Utilitários
│   ├── lib/               # Biblioteca helpers
│   ├── styles/            # CSS/SCSS
│   └── types/             # TypeScript types
├── public/                # Assets estáticos
├── package.json
├── tsconfig.json
└── README.md
```

**Funcionalidades:**
- Minha agenda
- Minhas discípulas
- Pedidos de oração
- Acolhimento
- Cultos no lar
- Mensagens
- Relatórios e metas
- Envio de devocionais

**Tech Stack:**
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Firebase Admin SDK

### 3. painel_admin
**Dashboard administrativo**

```
painel_admin/
├── src/
│   ├── pages/
│   ├── components/
│   ├── dashboard/         # Dashboard components
│   ├── features/          # Feature modules
│   ├── hooks/
│   ├── utils/
│   ├── lib/
│   ├── styles/
│   └── types/
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

**Funcionalidades:**
- Gerenciamento de usuárias
- Igrejas e líderes
- Devocionais e courses
- Comunidade
- Biblioteca
- Analytics
- Configurações
- IA Assistant

**Tech Stack:**
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Chart.js (Analytics)
- Firebase Admin SDK

## Packages

### 1. design_system
**Design tokens e Material Theme**

```
design_system/
├── lib/
│   ├── colors.dart        # Paleta: Bordo/Dourado/Rosé
│   ├── typography.dart    # 4 Google Fonts
│   ├── spacing.dart       # Espaçamentos (8px scale)
│   ├── shadows.dart       # Sombras
│   ├── radius.dart        # Border radius (12px default)
│   ├── durations.dart     # Durações de animação
│   ├── theme_data.dart    # Material Theme
│   ├── extensions.dart    # Context extensions
│   └── tokens.dart        # Central export
├── pubspec.yaml
└── README.md
```

**Exports:**
- `AppColors` - Todas as cores
- `AppTextStyles` - Todos os estilos de texto
- `AppTheme` - Material Theme
- `AppSpacing` - Constantes de espaçamento

### 2. ui_components
**Componentes reutilizáveis**

```
ui_components/
├── lib/
│   ├── src/
│   │   ├── buttons/       # Primary, Secondary, Glass
│   │   ├── cards/         # Verse, Prayer, Devotional, etc
│   │   ├── inputs/        # TextField, etc
│   │   ├── navigation/    # Navigation widgets
│   │   ├── modals/        # Dialogs
│   │   ├── animations/    # Fade, Scale, Slide, etc
│   │   ├── indicators/    # Progress, Rating, etc
│   │   └── layouts/       # Common layouts
│   └── ui_components.dart # Export all
├── test/
├── pubspec.yaml
└── README.md
```

**Dependencies:**
- `design_system`

### 3. shared
**Utilitários compartilhados**

```
shared/
├── lib/
│   ├── extensions/
│   │   ├── string_x.dart
│   │   ├── datetime_x.dart
│   │   ├── list_x.dart
│   │   ├── num_x.dart
│   │   └── color_x.dart
│   ├── utils/
│   │   ├── validators.dart
│   │   ├── formatters.dart
│   │   ├── logger.dart
│   │   └── converters.dart
│   ├── constants/
│   │   ├── app_constants.dart
│   │   ├── api_constants.dart
│   │   └── time_constants.dart
│   ├── models/
│   │   ├── result.dart      # Success/Failure
│   │   └── page_data.dart   # Pagination
│   ├── exceptions/
│   │   ├── app_exception.dart
│   │   ├── network_exception.dart
│   │   └── firebase_exception.dart
│   ├── services/
│   │   ├── connectivity.dart
│   │   └── device_info.dart
│   └── shared.dart
├── test/
├── pubspec.yaml
└── README.md
```

**Exports:**
- Extensions para tipos Dart
- Validadores (email, password, etc)
- Formatadores (data, moeda, etc)
- Custom exceptions
- Constantes globais

### 4. bible
**Funcionalidades bíblicas**

```
bible/
├── lib/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── verse.dart
│   │   │   ├── book.dart
│   │   │   ├── chapter.dart
│   │   │   └── reading_plan.dart
│   │   └── repositories/
│   │       ├── verse_repository.dart
│   │       └── reading_plan_repository.dart
│   ├── data/
│   │   ├── models/
│   │   ├── datasources/
│   │   │   ├── local_datasource.dart
│   │   │   └── remote_datasource.dart
│   │   └── repositories_impl/
│   ├── presentation/
│   │   ├── providers/
│   │   ├── controllers/
│   │   └── widgets/
│   └── bible.dart
├── assets/
│   └── bible.db         # SQLite database
├── test/
├── pubspec.yaml
└── README.md
```

**Funcionalidades:**
- Busca de versículos
- Livros da Bíblia
- Planos de leitura
- Estudos temáticos
- Citações aleatórias

### 5. stickers
**Sistema de stickers e badges**

```
stickers/
├── lib/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── sticker.dart
│   │   └── repositories/
│   │       └── sticker_repository.dart
│   ├── data/
│   │   ├── models/
│   │   ├── datasources/
│   │   └── repositories_impl/
│   ├── presentation/
│   │   ├── providers/
│   │   ├── widgets/
│   │   │   ├── sticker_widget.dart
│   │   │   ├── sticker_grid.dart
│   │   │   └── sticker_showcase.dart
│   │   └── screens/
│   └── stickers.dart
├── assets/
│   └── stickers/        # PNG/SVG files
├── test/
├── pubspec.yaml
└── README.md
```

**Funcionalidades:**
- Definição de stickers
- Desbloqueio progressivo
- Showcase de achievements
- Compartilhamento

### 6. ai
**Integração com IA (Claude, OpenAI)**

```
ai/
├── lib/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── ai_message.dart
│   │   │   ├── ai_response.dart
│   │   │   └── conversation.dart
│   │   └── repositories/
│   │       └── ai_repository.dart
│   ├── data/
│   │   ├── models/
│   │   ├── datasources/
│   │   │   ├── claude_datasource.dart
│   │   │   ├── openai_datasource.dart
│   │   │   └── local_cache.dart
│   │   └── repositories_impl/
│   ├── services/
│   │   ├── prompt_manager.dart
│   │   ├── response_parser.dart
│   │   └── context_manager.dart
│   ├── presentation/
│   │   ├── providers/
│   │   ├── screens/
│   │   │   └── bible_assistant_screen.dart
│   │   └── widgets/
│   │       ├── message_bubble.dart
│   │       ├── typing_indicator.dart
│   │       └── response_card.dart
│   └── ai.dart
├── test/
├── pubspec.yaml
└── README.md
```

**Funcionalidades:**
- Claude API integration
- OpenAI API integration
- Bible Assistant (FILHA IA)
- Prompt engineering
- Response caching
- Conversation history

## Backend

### firebase/
Firebase configuration and rules
- Firestore security rules
- Storage rules
- Authentication setup

### functions/
Cloud Functions (TypeScript)

```
functions/
├── src/
│   ├── index.ts
│   ├── scheduled/
│   │   ├── daily_devotional.ts
│   │   ├── daily_verse.ts
│   │   ├── prayer_reminders.ts
│   │   ├── fasting_reminders.ts
│   │   └── daily_backup.ts
│   ├── triggers/
│   │   ├── user_created.ts
│   │   ├── user_deleted.ts
│   │   └── content_created.ts
│   ├── http/
│   │   ├── ask_bible_assistant.ts
│   │   ├── generate_report.ts
│   │   └── upload_handler.ts
│   ├── utils/
│   │   ├── email.ts
│   │   ├── notifications.ts
│   │   └── analytics.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
└── .env.example
```

**Functions:**
- Scheduled tasks (devotional, verse, reminders, backup)
- Event triggers (user lifecycle)
- Callable functions (AI, reports)
- HTTP triggers (uploads, webhooks)

## Docs

### prd/
Product Requirements
- Feature descriptions
- User stories
- Acceptance criteria

### ux/
UX Documentation
- User flows
- Wireframes
- Interaction patterns

### ui/
UI Specifications
- Component specs
- Design system
- Spacing rules

### arquitetura/
Architecture Docs
- System design
- Clean Architecture
- Feature structure

### banco/
Database Docs
- Firestore schema
- Collections
- Relationships
- Indexes
- Security rules

### prompts/
AI Prompts
- System prompts
- Example prompts
- Best practices

## Assets

### illustrations/
Illustrations for app
- Onboarding
- Empty states
- Feature graphics

### stickers/
Sticker images
- Achievement badges
- Reward stickers

### fonts/
Google Fonts
- PlayfairDisplay
- CormorantGaramond
- Poppins
- Inter

### icons/
Custom icons
- App specific icons
- Not in Material Icons

### audio/
Audio files
- Devotional audio
- Prayers
- Music

## GitHub

### .github/workflows/
CI/CD Workflows
- `analyze.yml` - Code analysis
- `test.yml` - Unit tests
- `build.yml` - Build app
- `deploy.yml` - Deploy backend

## Configuration Files

- `.gitignore` - Git ignore rules
- `.git Attributes` - Git attributes
- `melos.yaml` - Monorepo config
- `pubspec.yaml` (root) - Workspace pubspec
- `.env.example` - Environment variables template

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Dart files | snake_case | `primary_button.dart` |
| Directories | snake_case | `ui_components/` |
| Classes | PascalCase | `PrimaryButton` |
| Constants | camelCase | `maxRetries` |
| Enum values | camelCase | `emOração` |
| Files with export | package name | `ui_components.dart` |

## Size Guidelines

### App
- APK < 50MB
- IPA < 100MB
- Web < 500KB

### Packages
- design_system < 100KB
- ui_components < 500KB
- Each other < 300KB

### Functions
- Cold start < 1s
- Execution < 5s

---

**Última atualização:** Agosto 2024
