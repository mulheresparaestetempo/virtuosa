import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';
import '../../../core/models/care_models.dart';

class FastingPage extends StatefulWidget {
  const FastingPage({super.key});

  @override
  State<FastingPage> createState() => _FastingPageState();
}

class _FastingPageState extends State<FastingPage> {
  final _purpose = TextEditingController();
  final _times = TextEditingController();
  final _verse = TextEditingController();
  DateTimeRange? _range;

  @override
  void dispose() {
    _purpose.dispose();
    _times.dispose();
    _verse.dispose();
    super.dispose();
  }

  Future<void> _pickRange() async {
    final now = DateTime.now();
    final result = await showDateRangePicker(
      context: context,
      firstDate: now,
      lastDate: now.add(const Duration(days: 365)),
      initialDateRange: DateTimeRange(
        start: now,
        end: now.add(const Duration(days: 1)),
      ),
    );
    if (result != null) setState(() => _range = result);
  }

  Future<void> _save() async {
    if (_range == null || _purpose.text.trim().isEmpty) return;

    final times = _times.text
        .split(',')
        .map((value) => value.trim())
        .where((value) => value.isNotEmpty)
        .toList();

    await AppRuntime.careRepository!.addFastingPlan(
      FastingPlan(
        id: DateTime.now().microsecondsSinceEpoch.toString(),
        title: 'Meu propósito',
        purpose: _purpose.text.trim(),
        startAt: _range!.start,
        endAt: _range!.end,
        proposedTimes: times,
        baseVerse: _verse.text.trim(),
      ),
    );

    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Seu propósito de jejum foi salvo.')),
    );
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final plans = AppRuntime.careRepository!.fastingPlans.reversed.toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Meu Jejum')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: FilhaColors.roseLight,
              borderRadius: BorderRadius.circular(32),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.local_fire_department_outlined,
                    color: FilhaColors.gold, size: 38),
                SizedBox(height: 20),
                Text(
                  'Acompanhe seu propósito',
                  style: TextStyle(fontSize: 27, fontWeight: FontWeight.w600),
                ),
                SizedBox(height: 8),
                Text(
                  'Registre o período, horários propostos, propósito e reflexões.',
                  style: TextStyle(
                    height: 1.5,
                    color: FilhaColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Card(
            child: ListTile(
              leading: const Icon(Icons.date_range_outlined,
                  color: FilhaColors.olive),
              title: const Text('Período'),
              subtitle: Text(
                _range == null
                    ? 'Escolher período'
                    : '${_range!.start.day}/${_range!.start.month} — ${_range!.end.day}/${_range!.end.month}',
              ),
              onTap: _pickRange,
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _purpose,
            minLines: 2,
            maxLines: 4,
            decoration: const InputDecoration(
              labelText: 'Propósito espiritual',
              alignLabelWithHint: true,
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _times,
            decoration: const InputDecoration(
              labelText: 'Horários propostos',
              hintText: 'Ex.: 07:00, 12:00, 20:00',
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _verse,
            decoration: const InputDecoration(
              labelText: 'Versículo base',
            ),
          ),
          const SizedBox(height: 18),
          SizedBox(
            height: 56,
            child: FilledButton(
              onPressed: _save,
              style: FilledButton.styleFrom(
                backgroundColor: FilhaColors.olive,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(22),
                ),
              ),
              child: const Text('Guardar propósito'),
            ),
          ),
          const SizedBox(height: 14),
          const Text(
            'O FILHA registra seu propósito e seus horários escolhidos; não prescreve restrições alimentares.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 12,
              color: FilhaColors.textSecondary,
              height: 1.4,
            ),
          ),
          if (plans.isNotEmpty) ...[
            const SizedBox(height: 28),
            const Text(
              'Meus propósitos',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 12),
            ...plans.map(
              (plan) => Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  leading: const Icon(
                    Icons.local_fire_department_outlined,
                    color: FilhaColors.gold,
                  ),
                  title: Text(plan.purpose),
                  subtitle: Text(
                    '${plan.proposedTimes.isEmpty ? 'Horários não definidos' : plan.proposedTimes.join(' • ')}'
                    '${plan.baseVerse.isEmpty ? '' : '
${plan.baseVerse}'}',
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
