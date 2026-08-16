# ⚡ QUICK START - Abba Virtuosa

**Comece em 5 minutos!**

---

## 🎯 Pré-requisito Único: Flutter SDK

Se ainda não tem Flutter:
- 🔗 https://flutter.dev/docs/get-started/install
- ⏱️ Leva ~10 minutos
- ✅ Depois volta aqui

---

## 🚀 Setup Automático (Recomendado)

### Mac/Linux
```bash
bash setup.sh
```

### Windows
```bash
setup.bat
```

**Pronto!** O script vai:
- ✓ Verificar pré-requisitos
- ✓ Ativar Melos
- ✓ Bootstrap monorepo
- ✓ Criar .env

---

## ▶️ Rodar Aplicações

### 📱 App Mobile (Flutter)
```bash
cd apps/app_mobile
flutter run
```

**Selecione o dispositivo** (emulador ou físico)

---

### 💼 Dashboard Líder (Web)
```bash
cd apps/painel_lider
npm install
npm run dev
```

🌐 Acessa: **http://localhost:3000**

---

### ⚙️ Dashboard Admin (Web)
```bash
cd apps/painel_admin
npm install
npm run dev
```

🌐 Acessa: **http://localhost:3001**

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| **SETUP_LOCAL.md** | Setup detalhado com troubleshooting |
| **README.md** | Visão geral do projeto |
| **MONOREPO_COMPLETE.md** | Estrutura completa |
| **docs/CONTRIBUTING.md** | Como contribuir |
| **melos.yaml** | Scripts Melos disponíveis |

---

## 🛠️ Comandos Úteis

### Validação
```bash
# Análise de código
melos analyze

# Formatar código
melos format

# Rodar testes
melos test

# Todos os checks
melos run check:all
```

### Build Release
```bash
# Mobile - APK
cd apps/app_mobile
flutter build apk --release

# Mobile - iOS (Mac)
flutter build ios --release

# Web
flutter build web --release
```

---

## 🆘 Problemas Comuns

### "Flutter command not found"
```bash
# Adicione ao PATH
export PATH="$PATH:[FLUTTER_PATH]/bin"
```

### "Gradle version error"
```bash
cd apps/app_mobile
flutter clean
flutter pub get
```

### "CocoaPods error" (iOS)
```bash
sudo gem install cocoapods
cd apps/app_mobile/ios
pod install
```

---

## 📱 Testar em Dispositivos

### Listar dispositivos
```bash
flutter devices
```

### Rodar em específico
```bash
flutter run -d <device-id>
```

### Plataformas
- `iphone` - iOS
- `android` - Android
- `web-chrome` - Web
- `windows` - Windows
- `macos` - macOS

---

## ✨ Próximos Passos

1. ✅ Rodar uma das aplicações
2. ✅ Testar navegação
3. ✅ Criar branch feature: `git checkout -b feature/sua-feature`
4. ✅ Fazer mudanças
5. ✅ Seguir `docs/CONTRIBUTING.md` para PR

---

## 🎉 Pronto!

Agora você tem:
- ✅ 3 aplicações prontas
- ✅ 6 pacotes compartilhados
- ✅ Backend Firebase configurado
- ✅ Documentação completa

**Happy coding!** 🚀
