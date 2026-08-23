import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/services/firestore_service.dart';

class LibraryPage extends StatefulWidget {
  const LibraryPage({super.key});

  @override
  State<LibraryPage> createState() => _LibraryPageState();
}

class _LibraryPageState extends State<LibraryPage> with SingleTickerProviderStateMixin {
  late TabController _tabs;

  List<PdfDoc> _pdfs = [];
  List<Recurso> _audios = [];
  List<Recurso> _podcasts = [];
  List<Recurso> _livros = [];
  List<Recurso> _indicacoes = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 5, vsync: this);
    _load();
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    try {
      final results = await Future.wait([
        FirestoreService.getPdfs(),
        FirestoreService.getRecursos('audio'),
        FirestoreService.getRecursos('podcast'),
        FirestoreService.getRecursos('livro'),
        FirestoreService.getRecursos('indicacao'),
      ]);
      if (mounted) {
        setState(() {
          _pdfs = results[0] as List<PdfDoc>;
          _audios = results[1] as List<Recurso>;
          _podcasts = results[2] as List<Recurso>;
          _livros = results[3] as List<Recurso>;
          _indicacoes = results[4] as List<Recurso>;
          _loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() { _error = 'Erro ao carregar biblioteca.'; _loading = false; });
    }
  }

  Future<void> _open(String url) async {
    final uri = Uri.tryParse(url);
    if (uri == null) return;
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Biblioteca'),
        bottom: TabBar(
          controller: _tabs,
          isScrollable: true,
          tabs: const [
            Tab(text: 'PDFs'),
            Tab(text: 'Áudios'),
            Tab(text: 'Podcasts'),
            Tab(text: 'Livros'),
            Tab(text: 'Links'),
          ],
        ),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(_error!, style: const TextStyle(color: FilhaColors.textSecondary)),
                    const SizedBox(height: 16),
                    OutlinedButton(onPressed: _load, child: const Text('Tentar novamente')),
                  ],
                ))
              : TabBarView(
                  controller: _tabs,
                  children: [
                    _PdfList(items: _pdfs, onOpen: _open),
                    _RecursoList(items: _audios, icon: Icons.headphones_outlined, emptyText: 'Nenhum áudio publicado ainda.', onOpen: _open),
                    _RecursoList(items: _podcasts, icon: Icons.mic_outlined, emptyText: 'Nenhum podcast publicado ainda.', onOpen: _open),
                    _RecursoList(items: _livros, icon: Icons.auto_stories_outlined, emptyText: 'Nenhuma indicação de livro ainda.', onOpen: _open),
                    _RecursoList(items: _indicacoes, icon: Icons.link_outlined, emptyText: 'Nenhum link publicado ainda.', onOpen: _open),
                  ],
                ),
    );
  }
}

class _PdfList extends StatelessWidget {
  const _PdfList({required this.items, required this.onOpen});
  final List<PdfDoc> items;
  final void Function(String) onOpen;

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) {
      return const _Empty(icon: Icons.picture_as_pdf_outlined, text: 'Nenhum PDF publicado ainda.');
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: items.length,
      itemBuilder: (_, i) {
        final item = items[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 10),
          child: ListTile(
            leading: const Icon(Icons.picture_as_pdf_outlined, color: FilhaColors.gold),
            title: Text(item.name, style: const TextStyle(fontWeight: FontWeight.w600)),
            trailing: IconButton(
              icon: const Icon(Icons.open_in_new, color: FilhaColors.olive),
              onPressed: () => onOpen(item.url),
            ),
            onTap: () => onOpen(item.url),
          ),
        );
      },
    );
  }
}

class _RecursoList extends StatelessWidget {
  const _RecursoList({required this.items, required this.icon, required this.emptyText, required this.onOpen});
  final List<Recurso> items;
  final IconData icon;
  final String emptyText;
  final void Function(String) onOpen;

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) {
      return _Empty(icon: icon, text: emptyText);
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: items.length,
      itemBuilder: (_, i) {
        final item = items[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 10),
          child: ListTile(
            leading: Icon(icon, color: FilhaColors.gold),
            title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.w600)),
            subtitle: item.description.isNotEmpty ? Text(item.description) : null,
            trailing: IconButton(
              icon: const Icon(Icons.open_in_new, color: FilhaColors.olive),
              onPressed: () => onOpen(item.url),
            ),
            onTap: () => onOpen(item.url),
          ),
        );
      },
    );
  }
}

class _Empty extends StatelessWidget {
  const _Empty({required this.icon, required this.text});
  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) => Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 54, color: FilhaColors.nude),
            const SizedBox(height: 16),
            Text(text, textAlign: TextAlign.center, style: const TextStyle(color: FilhaColors.textSecondary)),
          ],
        ),
      );
}
