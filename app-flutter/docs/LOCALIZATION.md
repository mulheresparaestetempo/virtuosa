# Localization (i18n) Guide

Complete guide to managing multi-language support in Abba Virtuosa Flutter.

## Overview

Abba Virtuosa supports three languages:
- **Portuguese (pt)** - Primary language
- **English (en)** - Secondary language
- **Spanish (es)** - Additional language

All translations are managed in a centralized location with support for dynamic parameter replacement.

## Localization System

### AppLocalizations
Main class managing all translations and localization logic.

**Location:** `lib/core/localization/app_localizations.dart`

### Supported Locales
```dart
const supportedLocales = [
  Locale('pt', 'BR'),  // Portuguese - Brazil
  Locale('en', 'US'),  // English - US
  Locale('es', 'ES'),  // Spanish - Spain
];
```

### Translation Structure
Translations are organized by feature area for maintainability:

```
Translation Keys by Category:
├── Auth
│   ├── auth_welcome_back
│   ├── auth_email
│   ├── auth_password
│   └── ... (15+ keys)
├── Home
│   ├── home_welcome
│   ├── home_welcome_back
│   └── ... (4+ keys)
├── Features
│   ├── feature_secret_place
│   ├── feature_my_prayers
│   └── ... (10+ keys)
├── Buttons
│   ├── btn_next
│   ├── btn_back
│   └── ... (10+ keys)
├── Common
│   ├── common_loading
│   ├── common_error
│   └── ... (10+ keys)
└── Domain-Specific
    ├── verse_of_day
    ├── prayer_request
    └── ... (10+ keys)
```

## Using Translations in Widgets

### Basic Usage with Locale
```dart
import '../../core/localization/app_localizations.dart';
import 'package:flutter/material.dart';

class MyScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context);
    
    return Scaffold(
      appBar: AppBar(
        title: Text(
          AppLocalizations.translate('common_settings', locale),
        ),
      ),
    );
  }
}
```

### Using Provider with Localization
```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MyScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = Localizations.localeOf(context);
    
    return Scaffold(
      body: Text(
        AppLocalizations.translate('home_welcome', locale),
      ),
    );
  }
}
```

### With Dynamic Parameters
```dart
String greeting = AppLocalizations.translate(
  'home_welcome',
  locale,
  params: {'name': 'Maria'},
);
// Result: 'Bem-vinda, Maria! ✨'
```

## Adding New Translations

### Step 1: Add Translation Key to All Languages

Edit `lib/core/localization/app_localizations.dart`:

```dart
const Map<String, Map<String, String>> localizations = {
  'pt': {
    // ... existing keys
    'my_new_key': 'Valor em português',
  },
  'en': {
    // ... existing keys
    'my_new_key': 'Value in English',
  },
  'es': {
    // ... existing keys
    'my_new_key': 'Valor en español',
  },
};
```

### Step 2: Use in Your Widget

```dart
Text(
  AppLocalizations.translate('my_new_key', locale),
)
```

## Working with Dynamic Content

### Simple Parameter Replacement
```dart
// Translation key
'home_welcome': 'Bem-vinda, {name}! ✨'

// Usage
AppLocalizations.translate(
  'home_welcome',
  locale,
  params: {'name': 'Maria'},
)
// Output: 'Bem-vinda, Maria! ✨'
```

### Multiple Parameters
```dart
// Translation key
'prayer_stats': 'Você fez {count} orações em {days} dias'

// Usage
AppLocalizations.translate(
  'prayer_stats',
  locale,
  params: {
    'count': '24',
    'days': '7',
  },
)
// Output: 'Você fez 24 orações em 7 dias'
```

### Named Person Pronouns
```dart
// Portuguese examples with gender-aware text
'welcome_brother': 'Bem-vindo, {name}! 🙏'
'welcome_sister': 'Bem-vinda, {name}! 🙏'

// Usage
final isSister = user.gender == 'F';
final key = isSister ? 'welcome_sister' : 'welcome_brother';
AppLocalizations.translate(key, locale, params: {'name': user.name})
```

## Language Switching

### Detecting Current Language
```dart
final locale = Localizations.localeOf(context);
final languageCode = locale.languageCode; // 'pt', 'en', 'es'
```

### Implementing Language Switcher
```dart
class LanguageSwitcher extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = Localizations.localeOf(context);
    
    return PopupMenuButton<Locale>(
      onSelected: (selectedLocale) {
        // Update app locale
        // This typically requires a locale provider
      },
      itemBuilder: (context) => [
        const PopupMenuItem(
          value: Locale('pt', 'BR'),
          child: Text('Português'),
        ),
        const PopupMenuItem(
          value: Locale('en', 'US'),
          child: Text('English'),
        ),
        const PopupMenuItem(
          value: Locale('es', 'ES'),
          child: Text('Español'),
        ),
      ],
      child: Text(
        AppLocalizations.translate('common_language', locale),
      ),
    );
  }
}
```

### With Riverpod Provider (Recommended)
```dart
// Provider to manage app locale
final localeProvider = StateProvider<Locale>((ref) {
  return const Locale('pt', 'BR');
});

// In MaterialApp
Consumer(
  builder: (context, ref, child) {
    final locale = ref.watch(localeProvider);
    return MaterialApp.router(
      locale: locale,
      supportedLocales: AppLocalizations.supportedLocales,
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      routerConfig: goRouter,
    );
  },
)
```

## Current Translations Inventory

### Portuguese (pt)
**Auth (15 keys):**
auth_welcome_back, auth_welcome_back_desc, auth_email, auth_password, auth_confirm_password, auth_login, auth_signup, auth_forgot_password, auth_no_account, auth_have_account, auth_agree_terms, auth_biometry, auth_google, auth_apple

**Home (4 keys):**
home_welcome, home_welcome_back, home_your_journey, home_community_highlights

**Features (10 keys):**
feature_secret_place, feature_my_prayers, feature_community, feature_library, feature_profile, feature_devotional, feature_journal, feature_fasting, feature_bible, feature_courses

**Buttons (10 keys):**
btn_next, btn_back, btn_start, btn_save, btn_cancel, btn_delete, btn_edit, btn_share, btn_like, btn_comment

**Common (8 keys):**
common_loading, common_error, common_success, common_no_results, common_try_again, common_settings, common_language, common_accessibility

**Domain-Specific (10 keys):**
verse_of_day, read_more, prayer_request, my_prayers, prayer_shared, journal_entry, edit_entry, community_highlights, community_posts, active_fasting, days_remaining, course_progress, lessons

### English (en) & Spanish (es)
Complete translations for all 67 keys across both languages.

## Translation Quality Checklist

When adding or updating translations:

- [ ] Translation is accurate and native to the language
- [ ] Parameter placeholders use correct syntax: `{paramName}`
- [ ] Same key is translated consistently across all languages
- [ ] No hardcoded text in UI (uses translation key instead)
- [ ] Feminine/masculine variations handled if needed
- [ ] Punctuation and capitalization match style guide
- [ ] Character encoding is UTF-8 (supports accents, special chars)
- [ ] Line length consideration for UI layout

## Supported Characters

All translations support:
- Accented Latin characters: á, é, í, ó, ú, ã, õ, ç, ñ, etc.
- Emoji and special symbols: 🙏, ✨, ❤️, etc.
- Right-to-left languages: Ready for RTL expansion (not yet implemented)

## Common Translation Patterns

### Navigation/Actions
```dart
'btn_next': 'Próximo'        // Portuguese
'btn_next': 'Next'           // English
'btn_next': 'Siguiente'      // Spanish
```

### Status Messages
```dart
'common_loading': 'Carregando...'
'common_error': 'Erro'
'common_success': 'Sucesso!'
```

### Feature Names
```dart
'feature_devotional': 'Vida Devocional'     // pt
'feature_devotional': 'Devotional Life'     // en
'feature_devotional': 'Vida Devocional'     // es
```

### Greetings with Parameters
```dart
'home_welcome': 'Bem-vinda, {name}! ✨'    // pt
'home_welcome': 'Welcome, {name}! ✨'      // en
'home_welcome': '¡Bienvenida, {name}! ✨'  // es
```

## Testing Translations

### Unit Test Example
```dart
test('translate returns correct Portuguese text', () {
  final text = AppLocalizations.translate(
    'auth_login',
    const Locale('pt', 'BR'),
  );
  expect(text, 'Entrar');
});

test('translate with parameters replaces placeholders', () {
  final text = AppLocalizations.translate(
    'home_welcome',
    const Locale('pt', 'BR'),
    params: {'name': 'Maria'},
  );
  expect(text, 'Bem-vinda, Maria! ✨');
});

test('translate falls back to Portuguese for missing language', () {
  final text = AppLocalizations.translate(
    'auth_login',
    const Locale('fr', 'FR'), // French (not supported)
  );
  expect(text, 'Entrar'); // Falls back to Portuguese
});
```

### Widget Test Example
```dart
testWidgets('Settings screen shows language name in current locale',
    (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      locale: const Locale('en', 'US'),
      home: Scaffold(
        body: Text(
          AppLocalizations.translate(
            'common_language',
            const Locale('en', 'US'),
          ),
        ),
      ),
    ),
  );

  expect(find.text('Language'), findsOneWidget);
});
```

## Fallback Behavior

```dart
// Translation logic in AppLocalizations.translate():
String text = localizations[languageCode]?[key]          // Try requested lang
              ?? localizations['pt']![key]                // Fall back to Portuguese
              ?? key;                                     // Fall back to key itself
```

**Priority:**
1. Requested language (en, es, etc.)
2. Portuguese (pt) - always has complete translations
3. Key name itself - if translation is missing

## Performance Considerations

- Translations are loaded at app startup
- No lazy loading - all translations kept in memory
- For very large translation sets (1000+ keys), consider:
  - Splitting into multiple files by feature
  - Using a server-based translation service
  - Implementing lazy loading via providers

## Future Enhancements

- [ ] Support for pluralization (1 oração vs 2 orações)
- [ ] Support for date/time formatting by locale
- [ ] Support for number formatting (1.000,00 vs 1,000.00)
- [ ] Support for RTL languages (Arabic, Hebrew)
- [ ] Server-based translation management
- [ ] Translation keys validation tooling

## Useful Resources

- [Flutter Internationalization](https://flutter.dev/docs/development/accessibility-and-localization/internationalization)
- [Locale class documentation](https://api.flutter.dev/flutter/dart-ui/Locale-class.html)
- [Unicode Standard - Language Identifiers](https://unicode.org/reports/tr35/)

---

**Last Updated:** August 2024
**Total Keys:** 67 (PT), 67 (EN), 67 (ES)
**Design System:** Abba Virtuosa ADL v1.0
