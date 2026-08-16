# Bible Package

Bible functionality for Abba Virtuosa.

## Features

- Verse search and retrieval
- Book of the Bible data
- Reading plans
- Thematic studies
- Random verse quotes

## Installation

```bash
flutter pub add bible
```

## Usage

```dart
import 'package:bible/bible.dart';

// Search for a verse
final verse = await verseRepository.getVerse('João 3:16');
```
