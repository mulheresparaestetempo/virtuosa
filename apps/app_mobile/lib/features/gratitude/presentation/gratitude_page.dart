import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/app_runtime.dart';

class GratitudePage extends StatefulWidget {
  const GratitudePage({super.key});

  @override
  State<GratitudePage> createState() => _GratitudePageState();
}

class _GratitudePageState extends State<GratitudePage> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _add() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;

    await AppRuntime.spiritualRepository!.addGratitude(text);

    if (!mounted) return;
    _controller.clear();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final items = AppRuntime.spiritualRepository!.gratitude.reversed.toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Gratidão')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: FilhaColors.roseLight,
              borderRadius: BorderRadius.circular(32),
            ),
            child: Column(
              children: [
                const Icon(Icons.local_florist_outlined, size: 72, color: FilhaColors.gold),
                const SizedBox(height: 16),
                Text(
                  '${items.length} ${items.length == 1 ? 'flor' : 'flores'} no seu jardim',
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: _controller,
            decoration: InputDecoration(
              labelText: 'Hoje sou grata por...',
              suffixIcon: IconButton(onPressed: _add, icon: const Icon(Icons.add)),
            ),
            onSubmitted: (_) => _add(),
          ),
          const SizedBox(height: 20),
          ...items.map(
            (item) => Card(
              margin: const EdgeInsets.only(bottom: 10),
              child: ListTile(
                leading: const Icon(Icons.local_florist_outlined, color: FilhaColors.gold),
                title: Text(item.text),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
