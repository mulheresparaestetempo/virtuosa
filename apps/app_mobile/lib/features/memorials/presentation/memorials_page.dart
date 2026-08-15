import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';

class MemorialsPage extends StatefulWidget {
  const MemorialsPage({super.key});

  @override
  State<MemorialsPage> createState() => _MemorialsPageState();
}

class _MemorialsPageState extends State<MemorialsPage> {
  Future<void> _createMemorial() async {
    final controller = TextEditingController();

    await showDialog<void>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Novo memorial'),
        content: TextField(
          controller: controller,
          autofocus: true,
          decoration: const InputDecoration(
            labelText: 'O que você quer guardar?',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () async {
              final title = controller.text.trim();
              if (title.isEmpty) return;
              await AppRuntime.spiritualRepository!.addMemorial(
                title: title,
                description: 'Um momento guardado na caminhada com Abba.',
              );
              if (dialogContext.mounted) Navigator.pop(dialogContext);
              if (mounted) setState(() {});
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );

    controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final items = AppRuntime.spiritualRepository!.memorials.reversed.toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Memoriais')),
      floatingActionButton: FloatingActionButton(
        onPressed: _createMemorial,
        backgroundColor: FilhaColors.olive,
        foregroundColor: Colors.white,
        child: const Icon(Icons.add),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'Minha caminhada',
            style: TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          const Text(
            'Guarde lembranças daquilo que marcou sua jornada. Memoriais são pessoais, não são competição.',
            style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
          ),
          const SizedBox(height: 24),
          if (items.isEmpty)
            const Card(
              child: Padding(
                padding: EdgeInsets.all(22),
                child: Text(
                  'Ainda não há memoriais. Quando um momento marcar sua caminhada, você poderá guardá-lo aqui.',
                  style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
                ),
              ),
            ),
          ...items.map(
            (item) => Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                leading: const CircleAvatar(
                  backgroundColor: FilhaColors.roseLight,
                  child: Icon(Icons.local_florist_outlined, color: FilhaColors.gold),
                ),
                title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.w700)),
                subtitle: Text(item.description),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
