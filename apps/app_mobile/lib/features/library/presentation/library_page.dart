import 'package:flutter/material.dart';
import '../../../app/theme/filha_theme.dart';

class LibraryPage extends StatelessWidget {
  const LibraryPage({super.key});

  static const items = [
    ('Devocionais', Icons.auto_stories_outlined),
    ('Jornadas', Icons.route_outlined),
    ('Estudos', Icons.menu_book_outlined),
    ('Áudios', Icons.headphones_outlined),
    ('Vídeos', Icons.play_circle_outline),
    ('PDFs', Icons.picture_as_pdf_outlined),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Biblioteca')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Buscar na biblioteca...',
              prefixIcon: const Icon(Icons.search),
              suffixIcon: IconButton(
                onPressed: () {},
                icon: const Icon(Icons.tune),
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Explore',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 14),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: items.length,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.15,
            ),
            itemBuilder: (_, index) {
              final item = items[index];
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(item.$2, size: 30, color: FilhaColors.olive),
                      const Spacer(),
                      Text(
                        item.$1,
                        style: const TextStyle(fontWeight: FontWeight.w700),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
