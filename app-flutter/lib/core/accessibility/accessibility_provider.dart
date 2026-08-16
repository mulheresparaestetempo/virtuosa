import 'package:flutter_riverpod/flutter_riverpod.dart';

class AccessibilitySettings {
  final double fontSizeMultiplier; // 0.8 a 1.5
  final bool highContrast;
  final bool screenReaderEnabled;
  final bool audioDescriptionEnabled;

  AccessibilitySettings({
    this.fontSizeMultiplier = 1.0,
    this.highContrast = false,
    this.screenReaderEnabled = false,
    this.audioDescriptionEnabled = false,
  });

  AccessibilitySettings copyWith({
    double? fontSizeMultiplier,
    bool? highContrast,
    bool? screenReaderEnabled,
    bool? audioDescriptionEnabled,
  }) {
    return AccessibilitySettings(
      fontSizeMultiplier: fontSizeMultiplier ?? this.fontSizeMultiplier,
      highContrast: highContrast ?? this.highContrast,
      screenReaderEnabled: screenReaderEnabled ?? this.screenReaderEnabled,
      audioDescriptionEnabled: audioDescriptionEnabled ?? this.audioDescriptionEnabled,
    );
  }
}

class AccessibilityNotifier extends StateNotifier<AccessibilitySettings> {
  AccessibilityNotifier() : super(AccessibilitySettings());

  void setFontSizeMultiplier(double multiplier) {
    state = state.copyWith(fontSizeMultiplier: multiplier.clamp(0.8, 1.5));
  }

  void toggleHighContrast() {
    state = state.copyWith(highContrast: !state.highContrast);
  }

  void toggleScreenReader() {
    state = state.copyWith(screenReaderEnabled: !state.screenReaderEnabled);
  }

  void toggleAudioDescription() {
    state = state.copyWith(audioDescriptionEnabled: !state.audioDescriptionEnabled);
  }
}

final accessibilityProvider = StateNotifierProvider<AccessibilityNotifier, AccessibilitySettings>(
  (ref) => AccessibilityNotifier(),
);
