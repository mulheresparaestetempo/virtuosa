# Abba Virtuosa Flutter Components Library

Complete guide to using the custom UI component library for Abba Virtuosa.

## Overview

The components library provides 13 custom widgets and 8 animation variants, all designed following the Abba Virtuosa Design System (ADL v1.0) with:
- Primary Color: Bordo (#C41E3A)
- Secondary Color: Dourado (#F0C674)
- Tertiary Color: Rosé (#D4A5A5)
- Typography: Poppins, Inter, PlayfairDisplay, CormorantGaramond
- Border Radius: 12px (consistent across components)
- Shadow Hierarchy: defaultShadow, elevatedShadow

## Buttons

### PrimaryButton
Primary action button with gradient background and shadow effect.

```dart
PrimaryButton(
  label: 'Salvar',
  onPressed: () {},
  isLoading: false,
  icon: Icon(Icons.check),
  width: double.infinity,
  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
)
```

**Props:**
- `label` (String, required): Button text
- `onPressed` (VoidCallback?): Tap callback
- `isLoading` (bool): Shows loading spinner instead of label
- `icon` (Widget?): Optional leading icon
- `width` (double?): Explicit button width
- `padding` (EdgeInsets): Internal padding

### SecondaryButton
Secondary action button with white background and border.

```dart
SecondaryButton(
  label: 'Cancelar',
  onPressed: () {},
  icon: Icon(Icons.close),
)
```

### GlassButton
Premium glassmorphism button with frosted glass effect.

```dart
GlassButton(
  label: 'Mais informações',
  onPressed: () {},
  icon: Icon(Icons.info),
)
```

## Cards

### VerseCard
Displays Bible verses with reference, text, and optional translation.

```dart
VerseCard(
  reference: 'Salmos 23:1',
  text: 'O Senhor é meu pastor e nada me faltará.',
  translation: 'English: The Lord is my shepherd...',
  isFavorite: false,
  onFavoriteTap: () {},
  onShareTap: () {},
  onTap: () {},
)
```

**Props:**
- `reference` (String): Bible book, chapter, verse
- `text` (String): Full verse text
- `translation` (String?): Optional translation
- `isFavorite` (bool): Favorite state
- `onFavoriteTap` (VoidCallback?): Favorite button callback
- `onShareTap` (VoidCallback?): Share button callback
- `onTap` (VoidCallback?): Card tap callback

### PrayerCard
Prayer request or prayer content card with likes and timestamps.

```dart
PrayerCard(
  title: 'Oração pela saúde',
  description: 'Peço oração pela minha filha...',
  author: 'Ana Silva',
  createdAt: 'Hoje',
  likes: 24,
  hasLiked: false,
  onLikeTap: () {},
  onTap: () {},
)
```

### DevotionalCard
Devotional content with read state indicator.

```dart
DevotionalCard(
  title: 'Como confiar em Deus',
  date: '7 de Agosto',
  preview: 'Quando enfrentamos dificuldades...',
  author: 'Pr. João',
  isRead: false,
  onTap: () {},
)
```

### JournalCard
Journal entry with mood indicator emoji and color.

```dart
JournalCard(
  title: 'Dia de Graças',
  date: '6 de Agosto',
  preview: 'Hoje tive um dia maravilhoso...',
  moodColor: Colors.amber,
  moodEmoji: '😊',
  onTap: () {},
  onEditTap: () {},
)
```

### MemorialCard
Memorial event (baptism, conversion, answered prayers).

```dart
MemorialCard(
  name: 'Batismo da Maria',
  date: '15 de Julho de 2024',
  type: 'Batismo',
  description: 'Dia especial de compromisso com Deus',
  onTap: () {},
)
```

### FastingCard
Active or completed fasting with duration and purpose.

```dart
FastingCard(
  title: 'Jejum de 21 dias',
  reason: 'Buscar direção profissional',
  startDate: '1 de Agosto',
  endDate: '21 de Agosto',
  daysRemaining: 10,
  isActive: true,
  onTap: () {},
)
```

### CourseCard
Course with progress bar and lesson count.

```dart
CourseCard(
  title: 'Introdução ao Discipulado',
  instructor: 'Pr. Carlos',
  image: '📚',
  progress: 65,
  lessons: 12,
  completedLessons: 8,
  onTap: () {},
)
```

### CommunityCard
Community post with author, content, and engagement metrics.

```dart
CommunityCard(
  author: 'Mariana Silva',
  authorImage: '👩',
  content: 'Deus respondeu minha oração!',
  timestamp: 'Hoje',
  likes: 24,
  comments: 5,
  hasLiked: false,
  onLikeTap: () {},
  onCommentTap: () {},
  onTap: () {},
)
```

### ChurchCard
Church information with pastor, address, and rating.

```dart
ChurchCard(
  name: 'Igreja Graça e Paz',
  pastor: 'Pr. Pedro',
  address: 'Rua das Flores, 123',
  serviceTime: 'Domingos às 19:00',
  rating: 5.0,
  onTap: () {},
)
```

### LeaderCard
Leader/staff profile with contact actions.

```dart
LeaderCard(
  name: 'Dra. Camila',
  role: 'Discipuladora',
  emoji: '👩‍🏫',
  phone: '(11) 98765-4321',
  bio: 'Serva dedicada ao crescimento espiritual',
  onCallTap: () {},
  onMessageTap: () {},
  onTap: () {},
)
```

### StickerCard
Achievement/badge sticker (unlocked or locked).

```dart
StickerCard(
  emoji: '⭐',
  title: 'Primeira Oração',
  description: 'Compartilhe sua primeira oração',
  isUnlocked: true,
  onTap: () {},
)
```

## Animations

All animation widgets support `duration` and `curve` parameters.

### FadeInAnimation
Opacity animation from transparent to opaque.

```dart
FadeInAnimation(
  duration: Duration(milliseconds: 600),
  curve: Curves.easeOut,
  child: MyWidget(),
)
```

### ScaleInAnimation
Scale animation from small to normal size with optional elastic bounce.

```dart
ScaleInAnimation(
  beginScale: 0.85,
  child: MyWidget(),
)
```

### SlideInAnimation
Slide animation from edge (left, right, top, bottom).

```dart
SlideInAnimation(
  direction: SlideDirection.fromLeft,
  child: MyWidget(),
)
```

### BounceAnimation
Elastic bounce-in effect using `Curves.elasticOut`.

```dart
BounceAnimation(
  duration: Duration(milliseconds: 800),
  child: MyWidget(),
)
```

### PulseAnimation
Continuous pulse/scale effect (repeating).

```dart
PulseAnimation(
  duration: Duration(milliseconds: 1500),
  child: MyWidget(),
)
```

### ShakeAnimation
Horizontal shake motion effect.

```dart
ShakeAnimation(
  duration: Duration(milliseconds: 500),
  child: MyWidget(),
)
```

### RotateAnimation
360° rotation animation (one-time or repeating).

```dart
RotateAnimation(
  duration: Duration(milliseconds: 1000),
  repeat: true,
  child: MyWidget(),
)
```

### FloatingAnimation
Continuous floating up/down motion.

```dart
FloatingAnimation(
  distance: 20.0,
  duration: Duration(milliseconds: 2000),
  child: MyWidget(),
)
```

### ParallaxAnimation
Scroll-based parallax effect for nested scrolling.

```dart
ParallaxAnimation(
  speed: 0.5,
  child: MyWidget(),
)
```

## Accessibility Widgets

### AccessibleText
Text widget that respects font size multiplier and high contrast mode.

```dart
AccessibleText(
  'Bem-vinda à Abba Virtuosa',
  style: AppTextStyles.heading2,
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
)
```

**Features:**
- Automatically scales based on user's font size preference (0.8x - 1.5x)
- Applies bold font weight in high contrast mode
- Adds screen reader labels when screen reader is enabled

### AccessibleHeading
Semantic heading widget (levels 1-6) with dynamic sizing.

```dart
AccessibleHeading(
  'Sua Caminhada Hoje',
  level: 3,
  textAlign: TextAlign.start,
)
```

### AccessibleButton
Accessible button with Semantics support.

```dart
AccessibleButton(
  label: 'Próximo',
  onPressed: () {},
  isEnabled: true,
)
```

## Usage Best Practices

### Combining Components with Animations
```dart
FadeInAnimation(
  duration: Duration(milliseconds: 400),
  child: VerseCard(
    reference: 'João 3:16',
    text: 'Porque Deus amou o mundo...',
  ),
)
```

### List of Cards with Staggered Animation
```dart
ListView.builder(
  itemCount: prayers.length,
  itemBuilder: (context, index) {
    return SlideInAnimation(
      duration: Duration(milliseconds: 300 + (index * 100)),
      child: PrayerCard(
        title: prayers[index].title,
        // ...
      ),
    );
  },
)
```

### Responsive Layout with Cards
```dart
Padding(
  padding: const EdgeInsets.all(24),
  child: SingleChildScrollView(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        VerseCard(...),
        const SizedBox(height: 24),
        CommunityCard(...),
        const SizedBox(height: 24),
        DevotionalCard(...),
      ],
    ),
  ),
)
```

### Accessibility Integration
```dart
Consumer(
  builder: (context, ref, child) {
    final accessibility = ref.watch(accessibilityProvider);
    return ListView(
      children: verses.map((verse) {
        return FadeInAnimation(
          child: AccessibleText(
            verse.reference,
            style: AppTextStyles.heading5,
          ),
        );
      }).toList(),
    );
  },
)
```

## Color Palette Reference

```dart
// Primary
AppColors.primary        // #C41E3A (Bordo)
AppColors.secondary      // #F0C674 (Dourado)
AppColors.tertiary       // #D4A5A5 (Rosé)

// Backgrounds
AppColors.background     // #FEF8F4 (Creme)
AppColors.surface        // #FFFFFF (Branco)
AppColors.surfaceVariant // #FAF6F1 (Creme claro)

// Text
AppColors.textPrimary    // #3D2817 (Bordo escuro)
AppColors.textSecondary  // #8B6F47 (Ouro escuro)
AppColors.textTertiary   // #C9B5A0 (Cinza claro)

// Status
AppColors.success        // #4CAF50
AppColors.warning        // #FFC107
AppColors.error          // #E53935
AppColors.info           // #2196F3

// Semantic
AppColors.received       // #FFF3E0 (Recebido)
AppColors.inProgress     // #E3F2FD (Em andamento)
AppColors.scheduled      // #F3E5F5 (Agendado)
AppColors.completed      // #E8F5E9 (Concluído)
```

## Localization Keys

All components use localization keys. Available translations:
- Portuguese (pt)
- English (en)
- Spanish (es)

Common keys:
- `btn_save`, `btn_cancel`, `btn_delete`, `btn_share`
- `common_loading`, `common_error`, `common_success`
- `verse_of_day`, `prayer_request`, `journal_entry`

## Theme Customization

Components inherit from `AppTextStyles` and `AppColors`. To customize:

1. Modify `lib/core/theme/app_colors.dart` for colors
2. Modify `lib/core/theme/app_text_styles.dart` for typography
3. All components automatically respect these changes

## Performance Considerations

- Cards use `SingleChildScrollView` for large lists; consider `ListView.builder`
- Animations automatically dispose controllers in `dispose()`
- Use `Consumer` wisely to avoid excessive rebuilds with accessibility changes
- For large lists with animations, stagger animation delays to reduce jank

---

**Last Updated:** August 2024
**Design System:** Abba Virtuosa ADL v1.0
