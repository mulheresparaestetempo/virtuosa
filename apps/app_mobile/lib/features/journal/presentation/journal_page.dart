import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';

class JournalPage extends StatefulWidget {
  const JournalPage({super.key});

  @override
  State<JournalPage> createState() => _JournalPageState();
}

class _JournalPageState extends State<JournalPage> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;

    await AppRuntime.spiritualRepository!.addJournal(text);

    if (!mounted) return;
    _controller.clear();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Reflexão salva no seu diário.')),
    );
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final entries = AppRuntime.spiritualRepository!.journals.reversed.toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Diário Espiritual')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'Como foi seu encontro com Abba?',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          const Text(
            'Este espaço é seu. Registre pensamentos, gratidão e reflexões.',
            style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _controller,
            minLines: 10,
            maxLines: 16,
            textCapitalization: TextCapitalization.sentences,
            decoration: const InputDecoration(
              labelText: 'Minha reflexão',
              alignLabelWithHint: true,
              hintText: 'Escreva aqui...',
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
              child: const Text('Guardar no diário'),
            ),
          ),
          if (entries.isNotEmpty) ...[
            const SizedBox(height: 30),
            const Text(
              'Minhas reflexões',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 12),
            ...entries.map(
              (entry) => Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Text(entry.text, style: const TextStyle(height: 1.5)),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
