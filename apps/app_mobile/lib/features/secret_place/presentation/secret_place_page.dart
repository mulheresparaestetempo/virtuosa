import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/services/firestore_service.dart';

class SecretPlacePage extends StatefulWidget {
  const SecretPlacePage({super.key});

  @override
  State<SecretPlacePage> createState() => _SecretPlacePageState();
}

class _SecretPlacePageState extends State<SecretPlacePage> {
  Devocional? _devocional;
  bool _loading = true;
  bool _completed = false;

  @override
  void initState() {
    super.initState();
    FirestoreService.getLatestDevocional().then((dev) {
      if (mounted) setState(() { _devocional = dev; _loading = false; });
    }).catchError((_) {
      if (mounted) setState(() => _loading = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Lugar Secreto')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _devocional == null
              ? _buildEmpty()
              : _buildContent(),
    );
  }

  Widget _buildEmpty() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.spa_outlined, size: 64, color: FilhaColors.gold),
            const SizedBox(height: 24),
            const Text(
              'Nenhum devocional publicado',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 12),
            const Text(
              'A líder ainda não publicou o devocional de hoje. Volte mais tarde.',
              textAlign: TextAlign.center,
              style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
            ),
            const SizedBox(height: 24),
            OutlinedButton(onPressed: () => context.pop(), child: const Text('Voltar')),
          ],
        ),
      ),
    );
  }

  Widget _buildContent() {
    final dev = _devocional!;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 40),
      children: [
        Container(
          height: 180,
          decoration: BoxDecoration(color: FilhaColors.roseLight, borderRadius: BorderRadius.circular(36)),
          child: const Center(child: Icon(Icons.spa_outlined, size: 72, color: FilhaColors.gold)),
        ),
        const SizedBox(height: 24),
        Text(dev.title, style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w600)),
        const SizedBox(height: 20),
        _Section(icon: Icons.menu_book_outlined, title: 'Versículo', content: '"${dev.verse}"', sub: dev.verseReference),
        const SizedBox(height: 14),
        _Section(icon: Icons.lightbulb_outline, title: 'Reflexão', content: dev.reflection),
        const SizedBox(height: 14),
        _Section(icon: Icons.favorite_border, title: 'Oração', content: dev.prayer),
        const SizedBox(height: 28),
        SizedBox(
          height: 56,
          child: FilledButton.icon(
            onPressed: () => setState(() => _completed = true),
            icon: Icon(_completed ? Icons.check : Icons.favorite_border),
            label: Text(_completed ? 'Momento concluído ✓' : 'Finalizar meu momento'),
            style: FilledButton.styleFrom(
              backgroundColor: FilhaColors.olive,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
            ),
          ),
        ),
        if (_completed) ...[
          const SizedBox(height: 16),
          Card(
            color: FilhaColors.roseLight,
            child: const Padding(
              padding: EdgeInsets.all(20),
              child: Text(
                'Que a Palavra permaneça em seu coração e que Abba fortaleça seus passos.',
                style: TextStyle(height: 1.5, fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({required this.icon, required this.title, required this.content, this.sub});
  final IconData icon;
  final String title;
  final String content;
  final String? sub;

  @override
  Widget build(BuildContext context) => Card(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(icon, color: FilhaColors.gold, size: 22),
                  const SizedBox(width: 10),
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
                ],
              ),
              const SizedBox(height: 12),
              Text(content, style: const TextStyle(height: 1.6, fontSize: 15)),
              if (sub != null) ...[
                const SizedBox(height: 8),
                Text(sub!, style: const TextStyle(color: FilhaColors.textSecondary, fontWeight: FontWeight.w500)),
              ],
            ],
          ),
        ),
      );
}
