# FILHA - Aplicativo Espiritual para Mulheres Cristãs

Versão Flutter com arquitetura limpa, DDD e MVVM.

## 📋 Requisitos

- **Flutter**: 3.35+
- **Dart**: 3.0+
- **Android SDK**: Android 5.0 (API 21) ou superior
- **iOS**: iOS 11.0 ou superior

## 🚀 Setup Local

### 1. Clonar e instalar dependências

```bash
cd app-flutter
flutter pub get
```

### 2. Gerar código (Freezed, JsonSerializable, etc)

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### 3. Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um projeto ou use um existente
3. Adicione os aplicativos Android e iOS
4. Execute:

```bash
flutterfire configure
```

Isso atualizará automaticamente `lib/firebase_options.dart`.

### 4. Executar a aplicação

```bash
# Para Android
flutter run -d android

# Para iOS
flutter run -d ios

# Para Web
flutter run -d chrome
```

## 📁 Estrutura do Projeto

```
lib/
├── core/                      # Código compartilhado
│   ├── config/               # Configurações (constants, env, etc)
│   ├── theme/                # Design System (cores, tipografia)
│   ├── router/               # GoRouter configuration
│   ├── services/             # Serviços de aplicação
│   ├── network/              # Cliente HTTP e configuração
│   ├── storage/              # Local storage (Hive, Drift)
│   ├── analytics/            # Firebase Analytics
│   ├── notifications/        # Push notifications
│   ├── extensions/           # Extensões de Dart
│   ├── helpers/              # Funções auxiliares
│   ├── errors/               # Tratamento de erros
│   ├── widgets/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── animations/       # Animações
│   │   └── shared/           # Widgets compartilhados
│
├── data/                      # Camada de dados
│   ├── datasources/          # Acesso a dados (API, Local)
│   ├── models/               # DTOs (json_serializable)
│   └── repositories/         # Implementação dos repositórios
│
├── domain/                    # Camada de negócios (Pure Dart)
│   ├── entities/             # Modelos de domínio
│   ├── repositories/         # Interfaces dos repositórios
│   └── usecases/             # Casos de uso
│
├── presentation/             # Camada de apresentação
│   ├── screens/              # Telas principais
│   ├── controllers/          # Riverpod Controllers
│   ├── providers/            # Riverpod Providers
│   └── widgets/              # Widgets específicos de features
│
└── features/                 # Features específicas (Feature First)
    ├── auth/
    │   ├── data/
    │   ├── domain/
    │   └── presentation/
    │
    ├── home/
    │   ├── data/
    │   ├── domain/
    │   └── presentation/
    │
    ├── devotional/
    │   ├── data/
    │   ├── domain/
    │   └── presentation/
    │
    ├── prayer/
    ├── fasting/
    ├── journal/
    ├── memorials/
    ├── community/
    ├── leader/
    ├── church/
    ├── events/
    ├── courses/
    ├── library/
    ├── ai/
    ├── profile/
    ├── settings/
    ├── notifications/
    ├── discipleship/
    ├── hospitality/
    ├── cell_groups/
    ├── missions/
    └── bible/
```

## 🏗️ Arquitetura

### Princípios

- **Feature First**: Cada feature é independente e modular
- **Clean Architecture**: Separação clara de responsabilidades
- **DDD**: Domain-Driven Design para lógica de negócios
- **SOLID**: Princípios SOLID aplicados
- **MVVM**: Model-View-ViewModel com Riverpod

### Fluxo de Dados

```
Presentation (UI) 
    ↓
Controllers/Providers (Riverpod)
    ↓
Domain (Usecases)
    ↓
Data (Repositories)
    ↓
Datasources (API/Local)
```

## 🛠️ Stack Tecnológico

### UI & Design
- **Material Design 3**
- **Google Fonts** (PlayfairDisplay, CormorantGaramond, Poppins, Inter)

### State Management
- **Riverpod** (Provider, StateNotifier, AsyncValue)

### Routing
- **GoRouter** (Routing declarativo e type-safe)

### Backend & Database
- **Firebase Core**
- **Cloud Firestore** (Database em tempo real)
- **Firebase Auth** (Autenticação)
- **Firebase Storage** (Armazenamento de arquivos)
- **Firebase Messaging** (Push notifications)
- **Firebase Analytics**
- **Firebase Crashlytics**
- **Cloud Functions** (Lógica backend)

### Local Storage
- **Hive** (Cache local rápido)
- **Drift** (SQLite type-safe)
- **SharedPreferences** (Preferências simples)

### Network & Serialization
- **Dio** (HTTP client com interceptadores)
- **Freezed** (Imutabilidade, copyWith, fromJson)
- **JsonSerializable** (Serialização de JSON)

### Integrações
- **Google Maps** (Mapas e localização)
- **Geolocator** (GPS)
- **Geocoding** (Endereço ↔ Coordenadas)
- **OpenAI API** (Assistente com IA)

### Utils
- **Get_it** (Service Locator/DI)
- **Intl** (Internacionalização)
- **Logger** (Logging estruturado)

## 📦 Dependências Principais

Veja `pubspec.yaml` para lista completa e versões.

## 🎨 Design System

### Cores (Abba Virtuosa ADL v1.0)
- **Primária**: #C41E3A (Bordo)
- **Secundária**: #F0C674 (Dourado)
- **Terciária**: #D4A5A5 (Rosé)
- **Background**: #FEF8F4 (Creme)

### Tipografia
- **Headings**: PlayfairDisplay (elegant, serif)
- **Subtítulos**: CormorantGaramond (classic, serif)
- **Body**: Poppins (modern, sans-serif)
- **Labels**: Inter (clean, sans-serif)

## 🔑 Configurações Importantes

### Firebase Configuration
Atualize `lib/firebase_options.dart` com suas credenciais do Firebase após executar `flutterfire configure`.

### Environment Variables
Crie `.env` na raiz do projeto:

```env
FIREBASE_PROJECT_ID=seu-projeto-id
OPENAI_API_KEY=sua-chave-openai
```

## 🧪 Testes

```bash
# Executar testes unitários
flutter test

# Executar testes com coverage
flutter test --coverage
```

## 📱 Build para Produção

### Android

```bash
flutter build apk --release
# ou
flutter build appbundle --release
```

### iOS

```bash
flutter build ios --release
```

### Web

```bash
flutter build web --release
```

## 📚 Documentação Adicional

- [Flutter Documentation](https://flutter.dev/docs)
- [Riverpod Guide](https://riverpod.dev)
- [GoRouter Documentation](https://pub.dev/packages/go_router)
- [Firebase Flutter](https://firebase.flutter.dev)
- [Clean Architecture](https://resocoder.com/clean-code-tdd)

## 👥 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/sua-feature`
2. Commit suas mudanças: `git commit -am 'Add nova feature'`
3. Push para a branch: `git push origin feature/sua-feature`
4. Abra um Pull Request

## 📄 Licença

Projeto privado da comunidade Abba Virtuosa.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

---

**Status**: Em desenvolvimento 🚀
