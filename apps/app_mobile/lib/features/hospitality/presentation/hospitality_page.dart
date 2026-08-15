import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';
import '../../../core/models/care_models.dart';

class HospitalityPage extends StatefulWidget {
  const HospitalityPage({super.key});

  @override
  State<HospitalityPage> createState() => _HospitalityPageState();
}

class _HospitalityPageState extends State<HospitalityPage> {
  CareRequestType? _selected;
  final _note = TextEditingController();

  static const options = [
    (CareRequestType.hospitalityVisit, 'Visita de acolhimento', Icons.favorite_border),
    (CareRequestType.leaderConversation, 'Conversa com uma líder', Icons.groups_outlined),
    (CareRequestType.inPersonPrayer, 'Pedido de oração presencial', Icons.volunteer_activism_outlined),
    (CareRequestType.churchConnection, 'Conhecer uma igreja', Icons.church_outlined),
    (CareRequestType.cellConnection, 'Conhecer uma célula', Icons.home_work_outlined),
    (CareRequestType.discipleship, 'Acompanhamento de discipulado', Icons.handshake_outlined),
  ];

  @override
  void dispose() {
    _note.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final selected = _selected;
    if (selected == null) return;

    await AppRuntime.careRepository!.addRequest(
      type: selected,
      note: _note.text.trim(),
    );

    if (!mounted) return;
    _note.clear();
    setState(() => _selected = null);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Sua solicitação foi registrada com cuidado.')),
    );
  }

  String _label(CareRequestType type) {
    return switch (type) {
      CareRequestType.hospitalityVisit => 'Visita de acolhimento',
      CareRequestType.leaderConversation => 'Conversa com uma líder',
      CareRequestType.inPersonPrayer => 'Pedido de oração presencial',
      CareRequestType.churchConnection => 'Conhecer uma igreja',
      CareRequestType.cellConnection => 'Conhecer uma célula',
      CareRequestType.discipleship => 'Acompanhamento de discipulado',
      CareRequestType.houseWorship => 'Culto no Lar',
    };
  }

  @override
  Widget build(BuildContext context) {
    final requests = AppRuntime.careRepository!.requests.reversed.toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Acolhimento')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'Você não precisa caminhar sozinha.',
            style: TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          const Text(
            'Conte como podemos caminhar com você. Sua solicitação será tratada com cuidado e privacidade.',
            style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
          ),
          const SizedBox(height: 22),
          ...options.map(
            (option) => Card(
              margin: const EdgeInsets.only(bottom: 10),
              child: RadioListTile<CareRequestType>(
                value: option.$1,
                groupValue: _selected,
                onChanged: (value) => setState(() => _selected = value),
                secondary: Icon(option.$3, color: FilhaColors.olive),
                title: Text(
                  option.$2,
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _note,
            minLines: 4,
            maxLines: 7,
            decoration: const InputDecoration(
              labelText: 'Conte um pouco mais',
              alignLabelWithHint: true,
              hintText: 'Compartilhe somente o que se sentir confortável.',
            ),
          ),
          const SizedBox(height: 18),
          SizedBox(
            height: 56,
            child: FilledButton(
              onPressed: _submit,
              style: FilledButton.styleFrom(
                backgroundColor: FilhaColors.olive,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(22),
                ),
              ),
              child: const Text('Solicitar acolhimento'),
            ),
          ),
          if (requests.isNotEmpty) ...[
            const SizedBox(height: 28),
            const Text(
              'Minhas solicitações',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 12),
            ...requests.map(
              (request) => Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  leading: const Icon(Icons.favorite_border, color: FilhaColors.gold),
                  title: Text(_label(request.type)),
                  subtitle: Text(request.status.name),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
