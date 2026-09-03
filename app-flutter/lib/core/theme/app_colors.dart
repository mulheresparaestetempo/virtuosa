import 'package:flutter/material.dart';

class AppColors {
  // Primary Colors
  static const Color primary = Color(0xFFC41E3A); // Bordo
  static const Color secondary = Color(0xFFF0C674); // Dourado
  static const Color tertiary = Color(0xFFD4A5A5); // Rosé

  // Neutral Colors
  static const Color background = Color(0xFFFEF8F4); // Creme
  static const Color surface = Color(0xFFFFFFFF); // Branco
  static const Color surfaceVariant = Color(0xFFFAF6F1); // Creme claro

  // Text Colors
  static const Color textPrimary = Color(0xFF3D2817); // Bordo escuro
  static const Color textSecondary = Color(0xFF8B6F47); // Ouro escuro
  static const Color textTertiary = Color(0xFFC9B5A0); // Cinza claro
  static const Color textMuted = Color(0xFFB0A0A0); // Cinza texto

  // Status Colors
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFFC107);
  static const Color error = Color(0xFFE53935);
  static const Color info = Color(0xFF2196F3);

  // Card & Border
  static const Color border = Color(0xFFE8D5C4);
  static const Color borderLight = Color(0xFFF0E6E0);

  // Semantic Colors
  static const Color received = Color(0xFFFFF3E0); // Recebido
  static const Color inProgress = Color(0xFFE3F2FD); // Em andamento
  static const Color scheduled = Color(0xFFF3E5F5); // Agendado
  static const Color completed = Color(0xFFE8F5E9); // Concluído

  // Shadow
  static const List<BoxShadow> defaultShadow = [
    BoxShadow(
      color: Color(0x1A000000),
      blurRadius: 4,
      offset: Offset(0, 2),
    ),
  ];

  static const List<BoxShadow> elevatedShadow = [
    BoxShadow(
      color: Color(0x26000000),
      blurRadius: 8,
      offset: Offset(0, 4),
    ),
  ];
}
