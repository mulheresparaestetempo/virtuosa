import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/ai/faith_assistant.dart';

class AssistantPage extends StatefulWidget {
  const AssistantPage({super.key});

  @override
  State<AssistantPage> createState() => _AssistantPageState();
}

class _AssistantPageState extends State<AssistantPage> {
  final _controller = TextEditingController();
  final _assistant = const FaithAssistant();
  final List<(bool, String)> _messages = [
    (
      false,
      'Olá, Filha 🌸 Sou sua Assistente Bíblica. Posso ajudar com estudos, perguntas e reflexões.',
    ),
  ];
  bool _loading = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final text = _controller.text.trim();
    if (text.isEmpty || _loading) return;

    setState(() {
      _messages.add((true, text));
      _controller.clear();
      _loading = true;
    });

    final answer = await _assistant.answer(text);

    if (!mounted) return;
    setState(() {
      _messages.add((false, answer));
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Assistente Bíblica')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(20),
              itemCount: _messages.length,
              itemBuilder: (_, index) {
                final message = _messages[index];
                return Align(
                  alignment: message.$1
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Container(
                    constraints: const BoxConstraints(maxWidth: 320),
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: message.$1
                          ? FilhaColors.olive
                          : FilhaColors.roseLight,
                      borderRadius: BorderRadius.circular(22),
                    ),
                    child: Text(
                      message.$2,
                      style: TextStyle(
                        color: message.$1
                            ? Colors.white
                            : FilhaColors.text,
                        height: 1.45,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      minLines: 1,
                      maxLines: 4,
                      textCapitalization: TextCapitalization.sentences,
                      decoration: const InputDecoration(
                        hintText: 'Pergunte algo...',
                      ),
                      onSubmitted: (_) => _send(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton.filled(
                    onPressed: _loading ? null : _send,
                    icon: const Icon(Icons.arrow_upward),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
