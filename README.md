# Abba Virtuosa - Monorepo

Plataforma espiritual para mulheres com aplicativos móveis, painéis de gestão, e assistente IA.

## Estrutura do Projeto

```
filha/
├── apps/                          # Aplicações principais
│   ├── app_mobile/               # Flutter app para usuárias
│   ├── painel_lider/             # Dashboard para líderes
│   └── painel_admin/             # Dashboard administrativo
│
├── packages/                      # Pacotes compartilhados
│   ├── design_system/            # Design tokens e tema
│   ├── ui_components/            # Componentes reutilizáveis
│   ├── stickers/                 # Sistema de stickers/badges
│   ├── shared/                   # Utilitários compartilhados
│   ├── bible/                    # Funcionalidades bíblicas
│   └── ai/                       # Integração com IA
│
├── backend/                       # Backend e Cloud Functions
│   ├── firebase/                 # Configurações Firebase
│   └── functions/                # Cloud Functions (TypeScript)
│
├── docs/                          # Documentação
│   ├── prd/                      # Product Requirements
│   ├── ux/                       # UX Documentation
│   ├── ui/                       # UI Specifications
│   ├── arquitetura/              # Architecture Docs
│   ├── banco/                    # Database Docs
│   └── prompts/                  # AI Prompts
│
├── assets/                        # Recursos compartilhados
│   ├── illustrations/            # Ilustrações
│   ├── stickers/                 # Stickers/Badges
│   ├── fonts/                    # Fontes (Google Fonts)
│   ├── icons/                    # Ícones
│   └── audio/                    # Áudio/Música
│
└── .github/                       # GitHub workflows e configs
```

## Tecnologias

### Frontend
- **Flutter** - App mobile multiplataforma
- **Next.js/React** - Painéis web (líder e admin)
- **Riverpod** - State management
- **GoRouter** - Navegação

### Backend
- **Firebase** - Autenticação, Database, Storage, Messaging
- **Cloud Functions** - Serverless backend logic
- **Node.js/TypeScript** - Runtime

### IA
- **Claude API** - Bible Assistant
- **OpenAI** - Futuro suporte

### Monorepo
- **Melos** - Gerenciador de monorepo Flutter
- **npm/yarn** - Workspace monorepo web

## Desenvolvimento

### Setup Inicial

```bash
# Clone o repositório
git clone https://github.com/mulheresparaestetempo/virtuosa.git
cd virtuosa

# Install Melos (monorepo manager)
dart pub global activate melos

# Bootstrap do monorepo
melos bootstrap
```

### Executar Apps

#### App Mobile
```bash
cd apps/app_mobile
flutter run -d <device-id>
```

#### Painel Líder
```bash
cd apps/painel_lider
npm run dev
```

#### Painel Admin
```bash
cd apps/painel_admin
npm run dev
```

### Packages

#### Design System
```bash
cd packages/design_system
flutter pub get
```

#### UI Components
```bash
cd packages/ui_components
flutter pub get
```

#### Bible Package
```bash
cd packages/bible
flutter pub get
```

#### AI Package
```bash
cd packages/ai
flutter pub get
```

## Estrutura de Branches

- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release branches

## Fase de Desenvolvimento

### Fase 1 (Concluída)
- ✅ Identidade visual
- ✅ Design System v1.0
- ✅ Mockups e Protótipo

### Fase 2 (Em Progresso)
- ✅ Flutter project setup
- ✅ Firebase integration
- ✅ Autenticação
- ✅ Home screen
- 🔄 UI Components
- 🔄 Features (Devocional, Lugar Secreto)

### Fase 3 (Planejada)
- Jejum
- Diário
- Memoriais
- Biblioteca
- Comunidade

### Fase 4 (Planejada)
- Painel Líder
- Painel Igreja
- Eventos
- Mapa
- Culto no Lar

### Fase 5 (Planejada)
- Assistente Bíblica IA
- Pesquisa Bíblica
- Recomendações

### Fase 6 (Planejada)
- Publicação
- Android
- iOS
- Web

## Contribuindo

Veja [CONTRIBUTING.md](docs/CONTRIBUTING.md) para guidelines de contribuição.

## Licença

Proprietary - Abba Virtuosa Ministry

## Contato

- Email: info@abba-virtuosa.app
- Website: https://abba-virtuosa.app
