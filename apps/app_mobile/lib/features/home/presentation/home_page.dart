import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/services/auth_service.dart';
import '../../../core/services/firestore_service.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Devocional? _devocional;
  List<Aviso> _avisos = [];
  bool _loadingDev = true;
  bool _loadingAvisos = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final dev = await FirestoreService.getLatestDevocional();
      if (mounted) setState(() { _devocional = dev; _loadingDev = false; });
    } catch (_) {
      if (mounted) setState(() => _loadingDev = false);
    }
    try {
      final avisos = await FirestoreService.getAvisos(limit: 3);
      if (mounted) setState(() { _avisos = avisos; _loadingAvisos = false; });
    } catch (_) {
      if (mounted) setState(() => _loadingAvisos = false);
    }
  }

  String get _greeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  String get _userName {
    final user = FirebaseAuth.instance.currentUser;
    final displayName = user?.displayName ?? '';
    if (displayName.isNotEmpty) return displayName.split(' ').first;
    return 'Filha';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('$_greeting, $_userName 🌸', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w600)),
            const SizedBox(height: 3),
            const Text('Seu momento com Abba começa aqui.', style: TextStyle(fontSize: 13, color: FilhaColors.textSecondary)),
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
      body: RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 32),
          children: [
            _buildDevocionalCard(),
            if (_avisos.isNotEmpty) ...[
              const SizedBox(height: 22),
              _SectionTitle(title: 'Avisos', action: 'Ver todos', onPressed: () {}),
              const SizedBox(height: 10),
              ..._avisos.map((a) => _AvisoCard(aviso: a)),
            ],
            const SizedBox(height: 22),
            _SectionTitle(title: 'Seu Lugar Secreto', action: 'Entrar', onPressed: () => context.push('/secret-place')),
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
          ],
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: 0,
        onDestinationSelected: (index) {
          switch (index) {
            case 1: context.push('/devotional');
            case 2: context.push('/community');
            case 3: context.push('/library');
            case 4: context.push('/profile');
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

  Widget _buildDevocionalCard() {
    if (_loadingDev) {
      return Card(
        color: FilhaColors.roseLight,
        child: const Padding(
          padding: EdgeInsets.all(24),
          child: Center(child: CircularProgressIndicator()),
        ),
      );
    }
    if (_devocional == null) {
      return Card(
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
              Text('Nenhum devocional publicado ainda.', style: TextStyle(color: FilhaColors.textSecondary)),
            ],
          ),
        ),
      );
    }
    return InkWell(
      onTap: () => context.push('/secret-place'),
      borderRadius: BorderRadius.circular(28),
      child: Card(
        color: FilhaColors.roseLight,
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('DEVOCIONAL DO DIA', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1.5, color: FilhaColors.olive)),
              const SizedBox(height: 14),
              Text(_devocional!.verse, style: const TextStyle(fontSize: 20, height: 1.4, fontWeight: FontWeight.w600)),
              const SizedBox(height: 8),
              Text(_devocional!.verseReference, style: const TextStyle(color: FilhaColors.textSecondary, fontWeight: FontWeight.w500)),
              const SizedBox(height: 12),
              Text(_devocional!.title, style: const TextStyle(color: FilhaColors.textSecondary)),
            ],
          ),
        ),
      ),
    );
  }
}

class _AvisoCard extends StatelessWidget {
  const _AvisoCard({required this.aviso});
  final Aviso aviso;

  Color get _bg {
    switch (aviso.priority) {
      case 'alta': return const Color(0xFFFFE8E8);
      case 'baixa': return const Color(0xFFF0F4E8);
      default: return const Color(0xFFFFF8E8);
    }
  }

  Color get _text {
    switch (aviso.priority) {
      case 'alta': return const Color(0xFFC85A54);
      case 'baixa': return const Color(0xFF7A9C3B);
      default: return const Color(0xFFD4A574);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      color: _bg,
      margin: const EdgeInsets.only(bottom: 10),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(aviso.title, style: TextStyle(fontWeight: FontWeight.w700, color: _text)),
            const SizedBox(height: 6),
            Text(aviso.message, style: const TextStyle(height: 1.4, color: FilhaColors.text)),
          ],
        ),
      ),
    );
  }
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
