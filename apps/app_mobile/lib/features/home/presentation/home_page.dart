import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/filha_theme.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Bom dia, Filha 🌸', style: TextStyle(fontSize: 23, fontWeight: FontWeight.w600)),
            SizedBox(height: 3),
            Text('Seu momento com Abba começa aqui.', style: TextStyle(fontSize: 13, color: FilhaColors.textSecondary)),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () => context.push('/profile'),
            icon: const CircleAvatar(
              backgroundColor: FilhaColors.roseLight,
              child: Icon(Icons.person_outline, color: FilhaColors.olive),
            ),
          ),
          const SizedBox(width: 10),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 12, 20, 32),
        children: [
          const _VerseCard(),
          const SizedBox(height: 18),
          _SectionTitle(
            title: 'Seu Lugar Secreto',
            action: 'Entrar',
            onPressed: () => context.push('/secret-place'),
          ),
          const SizedBox(height: 10),
          _SecretPlaceCard(onTap: () => context.push('/secret-place')),
          const SizedBox(height: 22),
          const _SectionTitle(title: 'Hoje'),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(child: _QuickCard(icon: Icons.favorite_border, title: 'Oração', subtitle: 'Meu momento', onTap: () => context.push('/prayer'))),
              const SizedBox(width: 12),
              Expanded(child: _QuickCard(icon: Icons.local_fire_department_outlined, title: 'Jejum', subtitle: 'Acompanhar', onTap: () => context.push('/fasting'))),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(child: _QuickCard(icon: Icons.edit_note_outlined, title: 'Diário', subtitle: 'Minha reflexão', onTap: () => context.push('/journal'))),
              const SizedBox(width: 12),
              Expanded(child: _QuickCard(icon: Icons.local_florist_outlined, title: 'Memoriais', subtitle: 'Minha caminhada', onTap: () => context.push('/memorials'))),
            ],
          ),
          const SizedBox(height: 22),
          InkWell(
            onTap: () => context.push('/devotional'),
            borderRadius: BorderRadius.circular(28),
            child: const _DailyLetterCard(),
          ),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: 0,
        onDestinationSelected: (index) {
          switch (index) {
            case 1:
              context.push('/devotional');
            case 2:
              context.push('/community');
            case 3:
              context.push('/library');
            case 4:
              context.push('/profile');
          }
        },
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Início'),
          NavigationDestination(icon: Icon(Icons.spa_outlined), selectedIcon: Icon(Icons.spa), label: 'Devocional'),
          NavigationDestination(icon: Icon(Icons.groups_outlined), selectedIcon: Icon(Icons.groups), label: 'Comunidade'),
          NavigationDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: 'Biblioteca'),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Caminhada'),
        ],
      ),
    );
  }
}

class _VerseCard extends StatelessWidget {
  const _VerseCard();

  @override
  Widget build(BuildContext context) => Card(
        color: FilhaColors.roseLight,
        child: const Padding(
          padding: EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('VERSÍCULO DO DIA', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1.5, color: FilhaColors.olive)),
              SizedBox(height: 14),
              Text('Um momento para guardar a Palavra no coração.', style: TextStyle(fontSize: 22, height: 1.35, fontWeight: FontWeight.w600)),
              SizedBox(height: 12),
              Text('Referência bíblica será exibida aqui.', style: TextStyle(color: FilhaColors.textSecondary)),
            ],
          ),
        ),
      );
}

class _SecretPlaceCard extends StatelessWidget {
  const _SecretPlaceCard({required this.onTap});
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Card(
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(28),
          child: const Padding(
            padding: EdgeInsets.all(22),
            child: Row(
              children: [
                _IconBubble(icon: Icons.spa_outlined),
                SizedBox(width: 18),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Comece seu devocional', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
                      SizedBox(height: 6),
                      Text('Palavra, oração e reflexão.', style: TextStyle(color: FilhaColors.textSecondary)),
                    ],
                  ),
                ),
                Icon(Icons.arrow_forward_ios_rounded, size: 16, color: FilhaColors.olive),
              ],
            ),
          ),
        ),
      );
}

class _IconBubble extends StatelessWidget {
  const _IconBubble({required this.icon});
  final IconData icon;

  @override
  Widget build(BuildContext context) => Container(
        width: 72,
        height: 72,
        decoration: const BoxDecoration(color: FilhaColors.roseLight, shape: BoxShape.circle),
        child: Icon(icon, size: 34, color: FilhaColors.gold),
      );
}

class _QuickCard extends StatelessWidget {
  const _QuickCard({required this.icon, required this.title, required this.subtitle, required this.onTap});
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(28),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(icon, color: FilhaColors.olive, size: 28),
                const SizedBox(height: 24),
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
                const SizedBox(height: 4),
                Text(subtitle, style: const TextStyle(fontSize: 12, color: FilhaColors.textSecondary)),
              ],
            ),
          ),
        ),
      );
}

class _DailyLetterCard extends StatelessWidget {
  const _DailyLetterCard();

  @override
  Widget build(BuildContext context) => Card(
        color: FilhaColors.ivory,
        child: Container(
          decoration: BoxDecoration(borderRadius: BorderRadius.circular(28), border: Border.all(color: FilhaColors.nude)),
          padding: const EdgeInsets.all(22),
          child: const Row(
            children: [
              Icon(Icons.mail_outline, size: 34, color: FilhaColors.gold),
              SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Carta de Abba', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
                    SizedBox(height: 5),
                    Text('Uma reflexão para você hoje.', style: TextStyle(color: FilhaColors.textSecondary)),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({required this.title, this.action, this.onPressed});
  final String title;
  final String? action;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) => Row(
        children: [
          Expanded(child: Text(title, style: const TextStyle(fontSize: 21, fontWeight: FontWeight.w700))),
          if (action != null) TextButton(onPressed: onPressed, child: Text(action!)),
        ],
      );
}
