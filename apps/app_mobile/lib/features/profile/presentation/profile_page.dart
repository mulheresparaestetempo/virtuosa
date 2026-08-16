import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/filha_theme.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

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
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Minha caminhada', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                        SizedBox(height: 5),
                        Text('Filha • Ministério Virtuosa', style: TextStyle(color: FilhaColors.textSecondary)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 18),
          _ProfileItem(
            icon: Icons.auto_awesome_outlined,
            title: 'Meus memoriais',
            subtitle: 'Momentos que marcaram minha jornada',
            onTap: () => context.push('/memorials'),
          ),
          _ProfileItem(
            icon: Icons.route_outlined,
            title: 'Minhas jornadas',
            subtitle: 'Conteúdos e caminhos em andamento',
            onTap: () => context.push('/journeys'),
          ),
          _ProfileItem(
            icon: Icons.favorite_border,
            title: 'Minha discipuladora',
            subtitle: 'Caminhe acompanhada',
            onTap: () => context.push('/discipleship'),
          ),
          _ProfileItem(
            icon: Icons.volunteer_activism_outlined,
            title: 'Acolhimento',
            subtitle: 'Solicite cuidado e acompanhamento',
            onTap: () => context.push('/hospitality'),
          ),
          _ProfileItem(
            icon: Icons.home_work_outlined,
            title: 'Culto no Lar',
            subtitle: 'Solicite uma visita para um encontro em casa',
            onTap: () => context.push('/house-worship'),
          ),
          const _ProfileItem(
            icon: Icons.notifications_none,
            title: 'Notificações',
            subtitle: 'Horários e preferências',
          ),
          const _ProfileItem(
            icon: Icons.lock_outline,
            title: 'Privacidade',
            subtitle: 'Controle dos seus dados',
          ),
          const _ProfileItem(
            icon: Icons.info_outline,
            title: 'Sobre o FILHA',
            subtitle: 'Daiane Feliciano • Ministério Virtuosa • pibam',
          ),
        ],
      ),
    );
  }
}

class _ProfileItem extends StatelessWidget {
  const _ProfileItem({
    required this.icon,
    required this.title,
    required this.subtitle,
    this.onTap,
  });

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
