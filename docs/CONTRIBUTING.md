# Contributing Guide

Guia para contribuir ao projeto Abba Virtuosa.

## Começando

### Prerequisites
- Flutter 3.13+
- Dart 3.0+
- Node.js 18+
- Git
- Firebase CLI

### Setup Inicial

```bash
# 1. Clone o repositório
git clone https://github.com/mulheresparaestetempo/virtuosa.git
cd virtuosa

# 2. Install Melos globally
dart pub global activate melos

# 3. Bootstrap monorepo
melos bootstrap

# 4. Abra em seu editor favorito
code .
```

## Git Workflow

### Branches

**Main branches:**
- `main` - Production ready (stable releases)
- `develop` - Development (next release)

**Supporting branches:**
- `feature/name` - Nova funcionalidade
- `bugfix/name` - Correção de bug
- `hotfix/name` - Correção crítica para produção
- `docs/name` - Documentação
- `chore/name` - Tarefas de manutenção

### Branch Naming

```bash
# Feature
git checkout -b feature/add-prayer-sharing

# Bug fix
git checkout -b bugfix/fix-notification-crash

# Documentation
git checkout -b docs/update-architecture

# Chore
git checkout -b chore/update-dependencies
```

### Commit Messages

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - Nova funcionalidade
- `fix` - Correção de bug
- `docs` - Documentação
- `style` - Formatação, lint
- `refactor` - Refatoração sem mudar funcionalidade
- `perf` - Performance improvement
- `test` - Testes
- `chore` - Build, dependencies

**Exemplos:**

```bash
git commit -m "feat(prayer): add prayer sharing to community"

git commit -m "fix(auth): fix biometry login crash on iOS"

git commit -m "docs(readme): update setup instructions"

git commit -m "refactor(home): extract widgets into separate files"
```

### Pull Request Process

1. **Create branch from `develop`**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature
   ```

2. **Make changes**
   ```bash
   # Edit files
   git add .
   git commit -m "feat(scope): description"
   ```

3. **Keep in sync**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

4. **Push and create PR**
   ```bash
   git push -u origin feature/your-feature
   ```

5. **PR Checklist**
   - [ ] Código formatado (`melos format`)
   - [ ] Análise passou (`melos analyze`)
   - [ ] Testes adicionados/passam (`melos test`)
   - [ ] Documentação atualizada
   - [ ] Sem conflitos com `develop`
   - [ ] Title segue Conventional Commits
   - [ ] Description clara do que foi feito

## Development Workflow

### Code Style

**Dart Format:**
```bash
melos format
```

**Lint:**
```bash
melos lint
```

**Analyze:**
```bash
melos analyze
```

### Testing

**Run tests:**
```bash
melos test
```

**Run tests with coverage:**
```bash
melos run test:coverage
```

**Write tests:**
```dart
void main() {
  group('PrayerRepository', () {
    test('should create prayer', () async {
      // Arrange
      final prayer = PrayerEntity(...);
      
      // Act
      final result = await repository.createPrayer(prayer);
      
      // Assert
      expect(result, isNotNull);
    });
  });
}
```

### Feature Development

**Estrutura para nova feature:**

1. **Create feature directory**
   ```bash
   mkdir -p apps/app_mobile/lib/features/my_feature
   ```

2. **Create folders**
   ```
   my_feature/
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
       ├── providers/
       └── controllers/
   ```

3. **Implement in order:**
   - Domain layer (entities, repositories contracts)
   - Data layer (models, datasources)
   - Presentation layer (screens, widgets)

### Adding a Package

**Create new shared package:**

```bash
mkdir -p packages/my_package
cd packages/my_package

# Create pubspec.yaml
cat > pubspec.yaml << 'EOF'
name: my_package
description: Description
version: 0.1.0

environment:
  sdk: '>=3.0.0 <4.0.0'
  flutter: '>=3.13.0'

dependencies:
  flutter:
    sdk: flutter
  design_system:
    path: ../design_system

dev_dependencies:
  flutter_test:
    sdk: flutter
EOF

# Create lib directory
mkdir -p lib
touch lib/my_package.dart
```

**Link to app:**
Edit `apps/app_mobile/pubspec.yaml`:
```yaml
dependencies:
  my_package:
    path: ../../packages/my_package
```

**Bootstrap:**
```bash
melos bootstrap
```

## Documentation

### Code Documentation

```dart
/// Calcula o número de dias faltantes para o fim do jejum.
///
/// Retorna um [Duration] representando o tempo restante.
/// Retorna null se o jejum já terminou.
///
/// Exemplo:
/// ```dart
/// final fasting = FastingEntity(...);
/// final remaining = fasting.getRemainingDays();
/// ```
Duration? getRemainingDays() {
  // Implementation
}
```

### README Files

Cada pacote e app deve ter `README.md`:

```markdown
# Package Name

Description

## Installation

```bash
flutter pub add package_name
```

## Usage

Example code

## API Reference

Main classes and methods
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #123

## Testing
How to test these changes

## Screenshots (if applicable)
Before/after screenshots

## Checklist
- [ ] Code formatted
- [ ] Tests added
- [ ] Documentation updated
- [ ] No breaking changes
```

## Performance Guidelines

### Mobile App
- Bundle size < 50MB (APK release)
- First load < 3 seconds
- Frame rate 60 FPS
- Memory usage < 150MB (average)

### Web Panels
- First Contentful Paint < 2s
- Lighthouse score > 90
- Bundle size < 500KB (gzipped)

### Backend
- API response time < 500ms (p99)
- Database query < 100ms
- Cloud Function execution < 1s

## Security Guidelines

- [ ] Never commit secrets/keys
- [ ] Use environment variables
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Use HTTPS only
- [ ] Follow OWASP guidelines
- [ ] Regular security audits

## Accessibility

- [ ] Semantic widgets
- [ ] Color contrast ratio > 4.5:1
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Text resizable

## Internationalization

All strings must be translatable:

```dart
// ✅ Good
Text(
  AppLocalizations.translate('prayer_title', locale),
)

// ❌ Bad
Text('Prayer Request')
```

## Localization

- Portuguese (pt)
- English (en)
- Spanish (es)

Add to `app_localizations.dart`:
```dart
const Map<String, Map<String, String>> localizations = {
  'pt': {
    'new_key': 'Valor português',
  },
  'en': {
    'new_key': 'English value',
  },
  'es': {
    'new_key': 'Valor español',
  },
};
```

## Performance Tips

### Flutter
- Use `const` constructors
- Implement `shouldRebuild()` in providers
- Lazy load images
- Use `ListView.builder()` for lists
- Profile with DevTools

### Dart
- Use final variables
- Avoid expensive operations in build()
- Cache expensive computations
- Use correct collection types

## Reporting Issues

**Use GitHub Issues template:**

```markdown
## Descrição
O que aconteceu?

## Passos para Reproduzir
1. Abrir app
2. Ir para...
3. Clicar em...

## Comportamento Esperado
O que deveria acontecer?

## Comportamento Atual
O que aconteceu?

## Screenshots/Videos
Se aplicável

## Ambiente
- Device: iPhone 14
- OS: iOS 17.0
- App Version: 1.0.0
```

## Community

- **Discussions:** GitHub Discussions
- **Issues:** GitHub Issues
- **Email:** dev@abba-virtuosa.app

## Code of Conduct

Veja [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)

## License

Proprietary - Abba Virtuosa Ministry

---

Obrigada por contribuir! 🙏
