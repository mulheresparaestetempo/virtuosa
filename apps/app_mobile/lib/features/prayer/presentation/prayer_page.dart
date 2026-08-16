import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';

class PrayerPage extends StatefulWidget {
  const PrayerPage({super.key});

  @override
  State<PrayerPage> createState() => _PrayerPageState();
}

class _PrayerPageState extends State<PrayerPage> {
  final _controller = TextEditingController();
  String _category = 'Outros';

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;

    await AppRuntime.spiritualRepository!.addPrayer(
      text: text,
      category: _category,
    );

    if (!mounted) return;
    _controller.clear();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Sua oração foi registrada.')),
    );
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final prayers = AppRuntime.spiritualRepository!.prayers.reversed.toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Minha Oração')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'O que está em seu coração?',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          const Text(
            'Registre seu pedido e volte aqui para lembrar da fidelidade de Abba.',
            style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
          ),
          const SizedBox(height: 24),
          DropdownButtonFormField<String>(
            value: _category,
            decoration: const InputDecoration(labelText: 'Categoria'),
            items: const [
              'Família',
              'Filhos',
              'Saúde',
              'Igreja',
              'Missões',
              'Outros',
            ].map((item) => DropdownMenuItem(value: item, child: Text(item))).toList(),
            onChanged: (value) {
              if (value != null) setState(() => _category = value);
            },
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _controller,
            minLines: 7,
            maxLines: 12,
            textCapitalization: TextCapitalization.sentences,
            decoration: const InputDecoration(
              labelText: 'Seu pedido',
              alignLabelWithHint: true,
              hintText: 'Escreva sua oração ou pedido...',
            ),
          ),
          const SizedBox(height: 20),
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
              child: const Text('Guardar oração'),
            ),
          ),
          if (prayers.isNotEmpty) ...[
            const SizedBox(height: 30),
            const Text(
              'Minhas orações',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 12),
            ...prayers.map(
              (prayer) => Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  leading: const Icon(Icons.favorite_border, color: FilhaColors.gold),
                  title: Text(prayer.text),
                  subtitle: Text(prayer.category),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
