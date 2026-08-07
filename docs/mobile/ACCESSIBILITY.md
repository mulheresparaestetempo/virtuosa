# Accessibility Features Guide

Complete guide to implementing and using accessibility features in Abba Virtuosa Flutter.

## Overview

Abba Virtuosa supports four core accessibility settings:
1. **Font Size Multiplier** (0.8x - 1.5x)
2. **High Contrast Mode** (toggle)
3. **Screen Reader Support** (toggle)
4. **Audio Descriptions** (toggle)

All settings are managed through Riverpod state management for app-wide consistency.

## Core Components

### AccessibilitySettings
Immutable data class containing all accessibility preferences.

```dart
final accessibility = AccessibilitySettings(
  fontSizeMultiplier: 1.0,        // Default
  highContrast: false,            // Default
  screenReaderEnabled: false,     // Default
  audioDescriptionEnabled: false, // Default
);
```

### AccessibilityNotifier
StateNotifier managing accessibility state with methods to update each setting.

### accessibilityProvider
Riverpod StateNotifierProvider exposing accessibility state globally.

```dart
final accessibility = ref.watch(accessibilityProvider);
```

## Using Accessibility in Widgets

### Reading Accessibility State
```dart
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    
    return Text(
      'Olá',
      style: TextStyle(
        fontSize: 16 * accessibility.fontSizeMultiplier,
      ),
    );
  }
}
```

### Updating Accessibility Settings
```dart
class AccessibilitySettingsScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    final notifier = ref.read(accessibilityProvider.notifier);
    
    return Column(
      children: [
        // Font Size Slider
        Slider(
          value: accessibility.fontSizeMultiplier,
          min: 0.8,
          max: 1.5,
          onChanged: (value) {
            notifier.setFontSizeMultiplier(value);
          },
        ),
        
        // High Contrast Toggle
        SwitchListTile(
          title: const Text('Alto Contraste'),
          value: accessibility.highContrast,
          onChanged: (_) => notifier.toggleHighContrast(),
        ),
        
        // Screen Reader Toggle
        SwitchListTile(
          title: const Text('Leitor de Tela'),
          value: accessibility.screenReaderEnabled,
          onChanged: (_) => notifier.toggleScreenReader(),
        ),
        
        // Audio Description Toggle
        SwitchListTile(
          title: const Text('Audiodescrição'),
          value: accessibility.audioDescriptionEnabled,
          onChanged: (_) => notifier.toggleAudioDescription(),
        ),
      ],
    );
  }
}
```

## Accessible Text Widgets

### AccessibleText
Automatically respects font size and high contrast settings.

```dart
AccessibleText(
  'Bem-vinda à Abba Virtuosa',
  style: AppTextStyles.heading2,
  textAlign: TextAlign.center,
)
```

**What it does:**
- Multiplies font size by `fontSizeMultiplier`
- Applies bold weight (FontWeight.w700) when `highContrast` is true
- Adds semantic label for screen readers when `screenReaderEnabled` is true

### AccessibleHeading
Semantic heading levels (1-6) that automatically scale based on preferences.

```dart
// Level 1 (largest)
AccessibleHeading(
  'Sua Caminhada Hoje',
  level: 1,
)

// Level 3 (medium)
AccessibleHeading(
  'Devocional',
  level: 3,
)

// Level 6 (smallest)
AccessibleHeading(
  'Última atualização',
  level: 6,
)
```

**Font sizes (before multiplier):**
- Level 1: 32.0
- Level 2: 28.0
- Level 3: 24.0
- Level 4: 20.0
- Level 5: 18.0
- Level 6: 16.0

### AccessibleButton
Button with built-in accessibility support.

```dart
AccessibleButton(
  label: 'Continuar',
  onPressed: () {},
  isEnabled: true,
)
```

## Implementing Accessibility in Custom Widgets

### Pattern 1: Respecting Font Size
```dart
class MyCustomWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    
    return Text(
      'Texto personalizado',
      style: TextStyle(
        fontSize: 14.0 * accessibility.fontSizeMultiplier,
      ),
    );
  }
}
```

### Pattern 2: High Contrast Support
```dart
class MyCard extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: accessibility.highContrast
              ? AppColors.textPrimary
              : AppColors.border,
          width: accessibility.highContrast ? 2.0 : 1.0,
        ),
      ),
      child: Text(
        'Card com contraste adaptativo',
        style: TextStyle(
          fontWeight: accessibility.highContrast
              ? FontWeight.w700
              : FontWeight.w600,
        ),
      ),
    );
  }
}
```

### Pattern 3: Screen Reader Support
```dart
class MyInteractiveWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    
    return Semantics(
      button: true,
      enabled: true,
      label: 'Compartilhar oração', // Screen reader label
      onTap: () => share(),
      child: GestureDetector(
        onTap: () => share(),
        child: Icon(Icons.share),
      ),
    );
  }
}
```

### Pattern 4: Audio Descriptions
```dart
class VideoCard extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    
    return Column(
      children: [
        // Video player UI
        VideoPlayer(...),
        
        if (accessibility.audioDescriptionEnabled)
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Container(
              color: AppColors.info.withOpacity(0.1),
              padding: const EdgeInsets.all(8),
              child: Row(
                children: [
                  const Icon(Icons.description, size: 16),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Audiodescrição: A pastora apresenta uma mensagem sobre fé...',
                      style: AppTextStyles.bodySmall,
                    ),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}
```

## Component Accessibility Matrix

| Component | Font Size | High Contrast | Screen Reader | Audio Desc |
|-----------|-----------|---|---|---|
| AccessibleText | ✅ | ✅ | ✅ | N/A |
| AccessibleHeading | ✅ | ✅ | ✅ | N/A |
| VerseCard | ✅ | ✅ | ✅ | - |
| PrayerCard | ✅ | ✅ | ✅ | - |
| DevotionalCard | ✅ | ✅ | ✅ | ✅* |
| CommunityCard | ✅ | ✅ | ✅ | - |
| PrimaryButton | ✅ | ✅ | ✅ | N/A |

\* Developer should implement when audio content is available

## Accessibility Settings Screen Template

```dart
class AccessibilitySettingsScreen extends ConsumerWidget {
  const AccessibilitySettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    final notifier = ref.read(accessibilityProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Acessibilidade'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Font Size
            Text(
              'Tamanho da Fonte',
              style: AppTextStyles.heading5,
            ),
            const SizedBox(height: 16),
            Slider(
              value: accessibility.fontSizeMultiplier,
              min: 0.8,
              max: 1.5,
              divisions: 7,
              onChanged: (value) {
                notifier.setFontSizeMultiplier(value);
              },
            ),
            Center(
              child: Text(
                '${(accessibility.fontSizeMultiplier * 100).toStringAsFixed(0)}%',
                style: AppTextStyles.bodySmall,
              ),
            ),
            const SizedBox(height: 32),

            // High Contrast
            Text(
              'Modo de Contraste',
              style: AppTextStyles.heading5,
            ),
            const SizedBox(height: 16),
            SwitchListTile(
              title: const Text('Alto Contraste'),
              subtitle: const Text('Aumenta o contraste de cores para melhor legibilidade'),
              value: accessibility.highContrast,
              onChanged: (_) => notifier.toggleHighContrast(),
              contentPadding: EdgeInsets.zero,
            ),
            const SizedBox(height: 32),

            // Screen Reader
            Text(
              'Leitor de Tela',
              style: AppTextStyles.heading5,
            ),
            const SizedBox(height: 16),
            SwitchListTile(
              title: const Text('Ativar Leitor de Tela'),
              subtitle: const Text('Otimiza a app para usuários com deficiência visual'),
              value: accessibility.screenReaderEnabled,
              onChanged: (_) => notifier.toggleScreenReader(),
              contentPadding: EdgeInsets.zero,
            ),
            const SizedBox(height: 32),

            // Audio Description
            Text(
              'Audiodescrição',
              style: AppTextStyles.heading5,
            ),
            const SizedBox(height: 16),
            SwitchListTile(
              title: const Text('Audiodescrição'),
              subtitle: const Text('Fornece descrições de áudio para conteúdo visual'),
              value: accessibility.audioDescriptionEnabled,
              onChanged: (_) => notifier.toggleAudioDescription(),
              contentPadding: EdgeInsets.zero,
            ),
          ],
        ),
      ),
    );
  }
}
```

## Best Practices

### 1. Always Use Semantic Widgets
```dart
// ✅ Good
Semantics(
  button: true,
  enabled: true,
  label: 'Compartilhar',
  onTap: () => share(),
  child: GestureDetector(...),
)

// ❌ Avoid
GestureDetector(
  onTap: () => share(),
  child: Icon(Icons.share),
)
```

### 2. Provide Text Descriptions for Icons
```dart
// ✅ Good
Semantics(
  label: 'Curtir oração',
  child: IconButton(
    icon: const Icon(Icons.favorite),
    onPressed: () {},
  ),
)

// ❌ Avoid
IconButton(
  icon: const Icon(Icons.favorite),
  onPressed: () {},
)
```

### 3. Test with Different Font Sizes
Always test layouts with:
- 80% (0.8x) - Smallest
- 100% (1.0x) - Default
- 150% (1.5x) - Largest

### 4. Use High Contrast for Visual Testing
Enable high contrast mode to ensure:
- Text is bold and clear
- Color contrasts are sufficient
- Interactive elements are clearly distinguishable

### 5. Implement Audio Descriptions for Media
When using video or audio content:
```dart
if (accessibility.audioDescriptionEnabled) {
  // Show description or play audio description track
}
```

### 6. Test with Screen Readers
Use Flutter's screen reader support to verify:
- All interactive elements have labels
- Semantic structure is correct
- Navigation flow makes sense

## Testing Accessibility

### Unit Tests
```dart
test('Font size multiplier is applied correctly', () {
  final settings = AccessibilitySettings(fontSizeMultiplier: 1.2);
  expect(settings.fontSizeMultiplier, 1.2);
});

test('Font size is clamped between 0.8 and 1.5', () {
  final notifier = AccessibilityNotifier();
  notifier.setFontSizeMultiplier(2.0);
  expect(notifier.state.fontSizeMultiplier, 1.5);
});
```

### Widget Tests
```dart
testWidgets('AccessibleText respects font size multiplier', (WidgetTester tester) async {
  await tester.pumpWidget(
    ProviderContainer(
      child: MaterialApp(
        home: Scaffold(
          body: Consumer(
            builder: (context, ref, child) {
              ref.read(accessibilityProvider.notifier)
                  .setFontSizeMultiplier(1.2);
              return AccessibleText('Test');
            },
          ),
        ),
      ),
    ),
  );
  
  // Verify text size was multiplied
});
```

## Common Issues & Solutions

### Issue: Font sizes not updating
**Solution:** Wrap widget with `Consumer` and watch `accessibilityProvider`

### Issue: High contrast not applying everywhere
**Solution:** Update custom widgets to check `accessibility.highContrast`

### Issue: Screen reader labels not working
**Solution:** Wrap widgets with `Semantics` widget and provide `label` parameter

### Issue: Layout broken at large font sizes (1.5x)
**Solution:** Test at 1.5x during development, use responsive layouts with `Flexible`/`Expanded`

---

**Last Updated:** August 2024
**Design System:** Abba Virtuosa ADL v1.0
