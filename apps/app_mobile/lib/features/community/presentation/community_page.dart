import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';

class CommunityPage extends StatelessWidget {
  const CommunityPage({super.key});

  static const posts = [
    ('Mariana', 'Hoje quero agradecer a Abba por uma porta que se abriu. 🌸'),
    ('Ana', 'Deixando aqui um pedido de oração pela minha família.'),
    ('Juliana', 'Meu memorial de hoje é lembrar que eu não caminhei sozinha.'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Comunidade')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: FilhaColors.olive,
        foregroundColor: Colors.white,
        child: const Icon(Icons.add),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'Caminhamos juntas',
            style: TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          const Text(
            'Um espaço para testemunhos, pedidos de oração e palavras que edificam.',
            style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
          ),
          const SizedBox(height: 22),
          ...posts.map(
            (post) => Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const CircleAvatar(
                          backgroundColor: FilhaColors.roseLight,
                          child: Icon(Icons.person_outline, color: FilhaColors.olive),
                        ),
                        const SizedBox(width: 12),
                        Text(
                          post.$1,
                          style: const TextStyle(fontWeight: FontWeight.w700),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      post.$2,
                      style: const TextStyle(height: 1.5, fontSize: 15),
                    ),
                    const SizedBox(height: 12),
                    const Row(
                      children: [
                        Icon(Icons.favorite_border, size: 19),
                        SizedBox(width: 6),
                        Text('Edificar'),
                        SizedBox(width: 20),
                        Icon(Icons.chat_bubble_outline, size: 18),
                        SizedBox(width: 6),
                        Text('Comentar'),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
