import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/filha_theme.dart';

class DevotionalPage extends StatelessWidget {
  const DevotionalPage({super.key});

  @override
  Widget build(BuildContext context) {
    final items = [
      ('Oração', Icons.favorite_border, '/prayer'),
      ('Jejum', Icons.local_fire_department_outlined, '/fasting'),
      ('Diário', Icons.edit_note_outlined, '/journal'),
      ('Gratidão', Icons.local_florist_outlined, '/gratitude'),
      ('Memoriais', Icons.auto_awesome_outlined, '/memorials'),
      ('Lugar Secreto', Icons.spa_outlined, '/secret-place'),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Vida Devocional')),
      body: GridView.builder(
        padding: const EdgeInsets.all(20),
        itemCount: items.length,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: .95,
        ),
        itemBuilder: (_, index) {
          final item = items[index];
          return InkWell(
            borderRadius: BorderRadius.circular(28),
            onTap: () => context.push(item.$3),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 62,
                      height: 62,
                      decoration: const BoxDecoration(
                        color: FilhaColors.roseLight,
                        shape: BoxShape.circle,
                      ),
                      child: Icon(item.$2, color: FilhaColors.olive, size: 30),
                    ),
                    const Spacer(),
                    Text(
                      item.$1,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 5),
                    const Text(
                      'Um momento com Abba.',
                      style: TextStyle(
                        fontSize: 12,
                        color: FilhaColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
