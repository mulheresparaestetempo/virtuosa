import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';

class DiscipleshipPage extends StatelessWidget {
  const DiscipleshipPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Minha Discipuladora')),
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
                        Text(
                          'Sua caminhada acompanhada',
                          style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
                        ),
                        SizedBox(height: 6),
                        Text(
                          'Sua discipuladora aparecerá aqui quando o vínculo estiver registrado.',
                          style: TextStyle(color: FilhaColors.textSecondary, height: 1.4),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 18),
          const _Item(
            icon: Icons.calendar_month_outlined,
            title: 'Próximo encontro',
            subtitle: 'Nenhum encontro agendado',
          ),
          const _Item(
            icon: Icons.chat_bubble_outline,
            title: 'Mensagens',
            subtitle: 'Converse com sua discipuladora',
          ),
          const _Item(
            icon: Icons.favorite_border,
            title: 'Pedidos compartilhados',
            subtitle: 'Pedidos que você escolheu compartilhar',
          ),
          const _Item(
            icon: Icons.local_fire_department_outlined,
            title: 'Jejum compartilhado',
            subtitle: 'Acompanhamento espiritual',
          ),
        ],
      ),
    );
  }
}

class _Item extends StatelessWidget {
  const _Item({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) => Card(
        margin: const EdgeInsets.only(bottom: 10),
        child: ListTile(
          leading: Icon(icon, color: FilhaColors.olive),
          title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
          subtitle: Text(subtitle),
          trailing: const Icon(Icons.chevron_right),
        ),
      );
}
