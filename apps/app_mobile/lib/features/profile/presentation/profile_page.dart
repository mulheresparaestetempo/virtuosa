import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/services/auth_service.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  String get _name {
    final user = FirebaseAuth.instance.currentUser;
    return user?.displayName ?? user?.email?.split('@').first ?? 'Filha';
  }

  String get _email {
    return FirebaseAuth.instance.currentUser?.email ?? '';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Minha Caminhada')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Card(
            color: FilhaColors.roseLight,
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 34,
                    backgroundColor: FilhaColors.white,
                    child: Icon(Icons.person_outline, size: 34, color: FilhaColors.olive),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(_name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                        const SizedBox(height: 4),
                        if (_email.isNotEmpty)
                          Text(_email, style: const TextStyle(color: FilhaColors.textSecondary, fontSize: 13)),
                        const SizedBox(height: 4),
                        const Text('Filha • Ministério Virtuosa', style: TextStyle(color: FilhaColors.textSecondary, fontSize: 13)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 18),
          _ProfileItem(icon: Icons.auto_awesome_outlined, title: 'Meus memoriais', subtitle: 'Momentos que marcaram minha jornada', onTap: () => context.push('/memorials')),
          _ProfileItem(icon: Icons.route_outlined, title: 'Minhas jornadas', subtitle: 'Conteúdos e caminhos em andamento', onTap: () => context.push('/journeys')),
          _ProfileItem(icon: Icons.favorite_border, title: 'Minha discipuladora', subtitle: 'Caminhe acompanhada', onTap: () => context.push('/discipleship')),
          _ProfileItem(icon: Icons.volunteer_activism_outlined, title: 'Acolhimento', subtitle: 'Solicite cuidado e acompanhamento', onTap: () => context.push('/hospitality')),
          _ProfileItem(icon: Icons.home_work_outlined, title: 'Culto no Lar', subtitle: 'Solicite uma visita para um encontro em casa', onTap: () => context.push('/house-worship')),
          const _ProfileItem(icon: Icons.notifications_none, title: 'Notificações', subtitle: 'Horários e preferências'),
          const _ProfileItem(icon: Icons.info_outline, title: 'Sobre o FILHA', subtitle: 'Daiane Feliciano • Ministério Virtuosa'),
          const SizedBox(height: 10),
          Card(
            margin: EdgeInsets.zero,
            child: ListTile(
              onTap: () async {
                final confirm = await showDialog<bool>(
                  context: context,
                  builder: (ctx) => AlertDialog(
                    title: const Text('Sair da conta?'),
                    content: const Text('Você precisará entrar novamente para usar o app.'),
                    actions: [
                      TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancelar')),
                      TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Sair', style: TextStyle(color: Colors.red))),
                    ],
                  ),
                );
                if (confirm == true) {
                  await AuthService.signOut();
                  if (context.mounted) context.go('/login');
                }
              },
              leading: const Icon(Icons.logout, color: Color(0xFFC85A54)),
              title: const Text('Sair da conta', style: TextStyle(color: Color(0xFFC85A54), fontWeight: FontWeight.w600)),
            ),
          ),
        ],
      ),
    );
  }
}

class _ProfileItem extends StatelessWidget {
  const _ProfileItem({required this.icon, required this.title, required this.subtitle, this.onTap});
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) => Card(
        margin: const EdgeInsets.only(bottom: 10),
        child: ListTile(
          onTap: onTap,
          leading: Icon(icon, color: FilhaColors.olive),
          title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
          subtitle: Text(subtitle),
          trailing: const Icon(Icons.chevron_right),
        ),
      );
}
