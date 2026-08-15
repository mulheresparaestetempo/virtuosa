import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/filha_theme.dart';

class SecretPlacePage extends StatefulWidget {
  const SecretPlacePage({super.key});

  @override
  State<SecretPlacePage> createState() => _SecretPlacePageState();
}

class _SecretPlacePageState extends State<SecretPlacePage> {
  bool _completed = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Lugar Secreto')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
        children: [
          Container(
            height: 250,
            decoration: BoxDecoration(
              color: FilhaColors.roseLight,
              borderRadius: BorderRadius.circular(36),
            ),
            child: const Center(
              child: Icon(
                Icons.spa_outlined,
                size: 96,
                color: FilhaColors.gold,
              ),
            ),
          ),
          const SizedBox(height: 26),
          const Text(
            'Seu Lugar Secreto',
            style: TextStyle(
              fontSize: 34,
              fontWeight: FontWeight.w600,
              color: FilhaColors.text,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Separe alguns minutos para estar com Abba.',
            style: TextStyle(
              fontSize: 16,
              color: FilhaColors.textSecondary,
            ),
          ),
          const SizedBox(height: 26),
          const _SectionCard(
            icon: Icons.menu_book_outlined,
            title: 'Palavra',
            text: 'Leia o devocional de hoje e reserve um momento para refletir.',
          ),
          const SizedBox(height: 12),
          const _SectionCard(
            icon: Icons.favorite_border,
            title: 'Oração',
            text: 'Apresente a Abba aquilo que está em seu coração.',
          ),
          const SizedBox(height: 12),
          const _SectionCard(
            icon: Icons.edit_note_outlined,
            title: 'Reflexão',
            text: 'Registre uma frase, aprendizado ou oração no seu diário.',
          ),
          const SizedBox(height: 26),
          SizedBox(
            height: 56,
            child: FilledButton.icon(
              onPressed: () => setState(() => _completed = true),
              icon: Icon(_completed ? Icons.check : Icons.favorite_border),
              label: Text(
                _completed ? 'Momento concluído' : 'Finalizar meu momento',
              ),
              style: FilledButton.styleFrom(
                backgroundColor: FilhaColors.olive,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(22),
                ),
              ),
            ),
          ),
          if (_completed) ...[
            const SizedBox(height: 16),
            const _CompletionCard(),
          ],
        ],
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  const _SectionCard({
    required this.icon,
    required this.title,
    required this.text,
  });

  final IconData icon;
  final String title;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: FilhaColors.gold, size: 30),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 6),
                  Text(
                    text,
                    style: const TextStyle(
                      height: 1.45,
                      color: FilhaColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CompletionCard extends StatelessWidget {
  const _CompletionCard();

  @override
  Widget build(BuildContext context) {
    return Card(
      color: FilhaColors.roseLight,
      child: const Padding(
        padding: EdgeInsets.all(20),
        child: Text(
          'Que a Palavra permaneça em seu coração e que Abba fortaleça seus passos.',
          style: TextStyle(
            height: 1.5,
            fontWeight: FontWeight.w600,
            color: FilhaColors.text,
          ),
        ),
      ),
    );
  }
}
