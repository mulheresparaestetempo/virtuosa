import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';
import '../../../core/models/care_models.dart';

class HouseWorshipPage extends StatefulWidget {
  const HouseWorshipPage({super.key});

  @override
  State<HouseWorshipPage> createState() => _HouseWorshipPageState();
}

class _HouseWorshipPageState extends State<HouseWorshipPage> {
  DateTime? _date;
  final _note = TextEditingController();

  @override
  void dispose() {
    _note.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final now = DateTime.now();
    final result = await showDatePicker(
      context: context,
      firstDate: now,
      lastDate: now.add(const Duration(days: 180)),
      initialDate: now,
    );
    if (result != null) setState(() => _date = result);
  }

  Future<void> _submit() async {
    if (_date == null) return;

    await AppRuntime.careRepository!.addRequest(
      type: CareRequestType.houseWorship,
      preferredDate: _date,
      note: _note.text.trim(),
    );

    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Solicitação de culto no lar registrada.')),
    );
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final requests = AppRuntime.careRepository!.requests
        .where((item) => item.type == CareRequestType.houseWorship)
        .toList()
        .reversed
        .toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Culto no Lar')),
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
                Icon(Icons.home_work_outlined, size: 40, color: FilhaColors.gold),
                SizedBox(height: 18),
                Text(
                  'Um encontro de fé dentro de casa.',
                  style: TextStyle(fontSize: 27, fontWeight: FontWeight.w600),
                ),
                SizedBox(height: 8),
                Text(
                  'Solicite um culto no lar e aguarde o acompanhamento da liderança.',
                  style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Card(
            child: ListTile(
              leading: const Icon(Icons.calendar_today_outlined, color: FilhaColors.olive),
              title: const Text('Dia preferido'),
              subtitle: Text(
                _date == null
                    ? 'Escolher uma data'
                    : '${_date!.day.toString().padLeft(2, '0')}/${_date!.month.toString().padLeft(2, '0')}/${_date!.year}',
              ),
              trailing: const Icon(Icons.chevron_right),
              onTap: _pickDate,
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _note,
            minLines: 3,
            maxLines: 6,
            decoration: const InputDecoration(
              labelText: 'Observações',
              alignLabelWithHint: true,
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
              child: const Text('Solicitar culto no lar'),
            ),
          ),
          if (requests.isNotEmpty) ...[
            const SizedBox(height: 28),
            const Text(
              'Solicitações anteriores',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 12),
            ...requests.map(
              (request) => Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  leading: const Icon(Icons.home_work_outlined, color: FilhaColors.gold),
                  title: Text(
                    request.preferredDate == null
                        ? 'Data não definida'
                        : '${request.preferredDate!.day}/${request.preferredDate!.month}/${request.preferredDate!.year}',
                  ),
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
