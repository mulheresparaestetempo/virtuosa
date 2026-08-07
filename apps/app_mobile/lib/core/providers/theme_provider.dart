import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../theme/app_theme.dart';

enum ThemeMode { light, dark, auto }

final themeModeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.auto);

final appThemeProvider = Provider<AppTheme>((ref) {
  return AppTheme();
});

final themeMaterialProvider = Provider<ThemeData>((ref) {
  final appTheme = ref.watch(appThemeProvider);
  final themeMode = ref.watch(themeModeProvider);

  switch (themeMode) {
    case ThemeMode.light:
      return appTheme.lightTheme;
    case ThemeMode.dark:
      return appTheme.darkTheme;
    case ThemeMode.auto:
      return appTheme.lightTheme; // Será usado com MediaQuery para detectar preferência do sistema
  }
});
