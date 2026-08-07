# AI Package

AI integration for Abba Virtuosa - Bible Assistant (FILHA IA).

## Features

- Claude API integration
- OpenAI integration
- Bible Assistant conversations
- Prompt engineering
- Response caching
- Conversation history

## Installation

```bash
flutter pub add ai
```

## Usage

```dart
import 'package:ai/ai.dart';

// Ask the Bible Assistant
final response = await aiRepository.askBibleAssistant(
  'O que a Bíblia diz sobre oração?',
);
```
