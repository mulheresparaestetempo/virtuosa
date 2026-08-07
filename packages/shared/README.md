# Shared

Shared utilities, helpers, and constants for Abba Virtuosa.

## Includes

- **Extensions** - Dart type extensions (String, DateTime, List, etc)
- **Utils** - Validators, formatters, converters
- **Constants** - Application constants
- **Errors** - Custom exception classes

## Installation

```bash
flutter pub add shared
```

## Usage

```dart
import 'package:shared/shared.dart';

// Use extensions
final formatted = DateTime.now().formattedDate;

// Use validators
final isValid = EmailValidator.validate('test@example.com');
```
