import 'package:flutter/material.dart';

abstract final class FilhaColors {
  static const ivory = Color(0xFFFAF8F5);
  static const white = Color(0xFFFFFFFF);
  static const roseLight = Color(0xFFF5E5E4);
  static const rose = Color(0xFFE8C8C6);
  static const nude = Color(0xFFDCC4B2);
  static const gold = Color(0xFFC8A46A);
  static const oliveLight = Color(0xFFA6B48D);
  static const olive = Color(0xFF7E8C6F);
  static const text = Color(0xFF2E2E2E);
  static const textSecondary = Color(0xFF787878);
  static const border = Color(0xFFECECEC);
}

abstract final class FilhaTheme {
  static ThemeData get light {
    final scheme = ColorScheme.fromSeed(
      seedColor: FilhaColors.gold,
      brightness: Brightness.light,
    ).copyWith(
      primary: FilhaColors.olive,
      secondary: FilhaColors.gold,
      surface: FilhaColors.white,
      onSurface: FilhaColors.text,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: FilhaColors.ivory,
      appBarTheme: const AppBarTheme(
        backgroundColor: FilhaColors.ivory,
        foregroundColor: FilhaColors.text,
        elevation: 0,
        centerTitle: false,
      ),
      cardTheme: CardThemeData(
        color: FilhaColors.white,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(28),
          side: const BorderSide(color: FilhaColors.border),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: FilhaColors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: const BorderSide(color: FilhaColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: const BorderSide(color: FilhaColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: const BorderSide(color: FilhaColors.olive),
        ),
      ),
    );
  }
}
