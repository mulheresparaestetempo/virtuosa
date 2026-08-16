import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';
import '../../../core/models/care_models.dart';

class JourneysPage extends StatefulWidget {
  const JourneysPage({super.key});

  @override
  State<JourneysPage> createState() => _JourneysPageState();
}

class _JourneysPageState extends State<JourneysPage> {
  static const journeys = [
    ('identidade', 'Identidade', 'Reconheça quem você é em Cristo.', Icons.auto_awesome_outlined, 5),
    ('desperta', 'Desperta Filha', 'Uma jornada de despertar espiritual.', Icons.wb_sunny_outlined, 7),
    ('perto', 'Vem Pra Perto Filha', 'Passos de intimidade com Abba.', Icons.spa_outlined, 7),
    ('cura', 'Cura', 'Conteúdos de cuidado e acompanhamento.', Icons.healing_outlined, 6),
    ('familia', 'Família', 'Fé, relacionamento e vida no lar.', Icons.home_outlined, 6),
    ('lideranca', 'Liderança', 'Prepare-se para cuidar de outras mulheres.', Icons.groups_outlined, 8),
  ];

  Future<void> _toggleStep(
    String id,
    String title,
    int total,
    int current,
  ) async {
    final next = current >= total ? 0 : current + 1;
    await AppRuntime.careRepository!.saveJourney(
      JourneyProgress(
        id: id,
        title: title,
        completedSteps: next,
        totalSteps: total,
      ),
    );
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final saved = {
      for (final item in AppRuntime.careRepository!.journeys) item.id: item,
    };

    return Scaffold(
      appBar: AppBar(title: const Text('Jornadas')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'Caminhos para crescer',
            style: TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          const Text(
            'Escolha uma jornada e caminhe no seu ritmo.',
            style: TextStyle(color: FilhaColors.textSecondary),
          ),
          const SizedBox(height: 22),
          ...journeys.map((journey) {
            final progress = saved[journey.$1];
            final completed = progress?.completedSteps ?? 0;
            final total = journey.$5;
            return Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 56,
                          height: 56,
                          decoration: const BoxDecoration(
                            color: FilhaColors.roseLight,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(journey.$4, color: FilhaColors.olive),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                journey.$2,
                                style: const TextStyle(fontWeight: FontWeight.w700),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                journey.$3,
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: FilhaColors.textSecondary,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Text('$completed/$total'),
                      ],
                    ),
                    const SizedBox(height: 14),
                    LinearProgressIndicator(
                      value: completed / total,
                      minHeight: 7,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    const SizedBox(height: 12),
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        onPressed: () => _toggleStep(
                          journey.$1,
                          journey.$2,
                          total,
                          completed,
                        ),
                        child: Text(
                          completed >= total ? 'Recomeçar' : 'Concluir próximo passo',
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ],
      ),
    );
  }
}
