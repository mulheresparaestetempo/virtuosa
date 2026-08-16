import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../accessibility/accessibility_provider.dart';

class AccessibleText extends ConsumerWidget {
  final String text;
  final TextStyle? style;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;

  const AccessibleText(
    this.text, {
    Key? key,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);

    TextStyle finalStyle = style ?? const TextStyle();
    finalStyle = finalStyle.copyWith(
      fontSize: (finalStyle.fontSize ?? 14) * accessibility.fontSizeMultiplier,
    );

    if (accessibility.highContrast) {
      finalStyle = finalStyle.copyWith(
        fontWeight: FontWeight.w700,
      );
    }

    return Text(
      text,
      style: finalStyle,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
      semanticsLabel: accessibility.screenReaderEnabled ? text : null,
    );
  }
}

class AccessibleHeading extends ConsumerWidget {
  final String text;
  final int level; // 1-6, where 1 is largest
  final TextAlign? textAlign;
  final int? maxLines;

  const AccessibleHeading(
    this.text, {
    Key? key,
    this.level = 2,
    this.textAlign,
    this.maxLines,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);
    final theme = Theme.of(context);

    final baseFontSize = switch (level) {
      1 => 32.0,
      2 => 28.0,
      3 => 24.0,
      4 => 20.0,
      5 => 18.0,
      _ => 16.0,
    };

    final fontSize = baseFontSize * accessibility.fontSizeMultiplier;
    final fontWeight = accessibility.highContrast ? FontWeight.w800 : FontWeight.w700;
    final color = accessibility.highContrast
        ? theme.textTheme.headlineSmall?.color?.withOpacity(1.0)
        : theme.textTheme.headlineSmall?.color;

    return Text(
      text,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
      ),
      textAlign: textAlign,
      maxLines: maxLines,
      semanticsLabel: accessibility.screenReaderEnabled ? text : null,
    );
  }
}

class AccessibleButton extends ConsumerWidget {
  final String label;
  final VoidCallback onPressed;
  final bool isEnabled;

  const AccessibleButton({
    Key? key,
    required this.label,
    required this.onPressed,
    this.isEnabled = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final accessibility = ref.watch(accessibilityProvider);

    return Semantics(
      enabled: isEnabled,
      onTap: onPressed,
      label: label,
      button: true,
      child: GestureDetector(
        onTap: isEnabled ? onPressed : null,
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: 24 * accessibility.fontSizeMultiplier,
            vertical: 12 * accessibility.fontSizeMultiplier,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: isEnabled ? Theme.of(context).primaryColor : Colors.grey,
          ),
          child: AccessibleText(
            label,
            style: TextStyle(
              color: Colors.white,
              fontWeight: accessibility.highContrast ? FontWeight.w800 : FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}
