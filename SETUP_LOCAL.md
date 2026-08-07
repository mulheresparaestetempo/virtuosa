# 🚀 Guia de Setup Local - Abba Virtuosa

Complete este guia para rodar o app localmente em sua máquina.

## 📋 Pré-requisitos

### Windows/Mac/Linux

1. **Flutter SDK** (3.13+)
   - Download: https://flutter.dev/docs/get-started/install
   - Verificar instalação:
     ```bash
     flutter --version
     ```

2. **Dart SDK** (3.0+)
   - Incluído com Flutter
   - Verificar: `dart --version`

3. **Git**
   - Já deve estar instalado
   - Verificar: `git --version`

4. **Node.js** (18+)
   - Para web panels (painel_lider, painel_admin)
   - Download: https://nodejs.org/

### Para iOS (Mac apenas)

```bash
# Verificar Xcode
xcode-select --install

# Verificar CocoaPods
sudo gem install cocoapods
```

### Para Android

- Android Studio ou Android SDK
- JDK 11 ou superior
- Emulador Android ou dispositivo físico

---

## 🔧 Setup Inicial (1 vez apenas)

### 1. Clonar repositório

```bash
git clone https://github.com/mulheresparaestetempo/virtuosa.git
cd virtuosa
```

### 2. Ativar Melos

```bash
dart pub global activate melos
```

### 3. Bootstrap Monorepo

```bash
melos bootstrap
```

Isso vai:
- Instalar dependências de todos os pacotes
- Linkar pacotes locais
- Preparar estrutura

### 4. Configurar Firebase (Importante!)

```bash
# Fazer login no Firebase
firebase login

# Selecionar projeto
firebase use abba-virtuosa-app

# Opcional: emular localmente
firebase emulators:start
```

---

## 🎯 Opção 1: Executar App Mobile (Flutter)

### Start Rápido

```bash
cd apps/app_mobile
flutter run
```

### Rodar em Dispositivo Específico

```bash
# Listar dispositivos disponíveis
flutter devices

# Rodar em dispositivo específico
flutter run -d <device-id>
```

### Rodar em Plataforma Específica

```bash
# iOS (Mac apenas)
flutter run -d iphone

# Android
flutter run -d android

# Web
flutter run -d web

# Windows
flutter run -d windows

# macOS
flutter run -d macos
```

### Build Release

```bash
# Android APK
flutter build apk --release

# iOS (requer Mac)
flutter build ios --release

# Web
flutter build web --release
```

---

## 💼 Opção 2: Executar Dashboard Líder

### Start Rápido

```bash
cd apps/painel_lider
npm install
npm run dev
```

Acesso: http://localhost:3000

### Build

```bash
npm run build
npm run start
```

---

## ⚙️ Opção 3: Executar Dashboard Admin

### Start Rápido

```bash
cd apps/painel_admin
npm install
npm run dev
```

Acesso: http://localhost:3000 (mude porta se necessário)

### Build

```bash
npm run build
npm run start
```

---

## 🔍 Validar Instalação

Execute todos os checks:

```bash
# Da raiz do projeto
melos run check:all
```

Ou individuais:

```bash
# Análise de código
melos analyze

# Formatação
melos format

# Testes
melos test
```

---

## 🐛 Troubleshooting

### Erro: "Flutter command not found"

```bash
# Adicionar Flutter ao PATH (Mac/Linux)
export PATH="$PATH:[PATH_TO_FLUTTER]/bin"

# Ou no Windows, adicione ao PATH do sistema:
# C:\flutter\bin
```

### Erro: "Gradle version"

```bash
cd apps/app_mobile
flutter clean
flutter pub get
```

### Erro: "CocoaPods not found" (iOS)

```bash
sudo gem install cocoapods
cd apps/app_mobile/ios
pod install
```

### Erro: "Firebase not configured"

1. Criar projeto em Firebase Console
2. Adicionar configurações em `.env`
3. Fazer download de `google-services.json` (Android)
4. Fazer download de `GoogleService-Info.plist` (iOS)

---

## 📱 Dispositivos Recomendados

### Para Testar

**Android:**
- Emulador: Android 12+
- Dispositivo: Android 8+ com 4GB RAM

**iOS:**
- Emulador: iOS 14+ 
- Dispositivo: iPhone 8+ com iOS 14+

**Web:**
- Chrome/Firefox/Safari (últimas versões)
- Desktop resolution: 1024x768+

---

## 📚 Próximos Passos

1. ✅ Completar setup
2. ✅ Escolher app para rodar
3. ✅ Testar na sua plataforma
4. ✅ Seguir `docs/CONTRIBUTING.md` para desenvolver
5. ✅ Criar branch feature: `git checkout -b feature/sua-feature`

---

## 🆘 Suporte

- **Documentação:** `/docs/` diretório
- **Issues:** GitHub Issues
- **Perguntas:** Discussions

---

**Pronto para desenvolver!** 🚀
