import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/filha_theme.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final PageController _controller = PageController();
  int _page = 0;

  final _items = const [
    (
      title: 'Você nunca caminha sozinha.',
      text: 'Um espaço para fortalecer sua caminhada com Abba.',
      icon: Icons.favorite_border,
    ),
    (
      title: 'Seu Lugar Secreto.',
      text: 'Reserve um momento para a Palavra, oração e reflexão.',
      icon: Icons.menu_book_outlined,
    ),
    (
      title: 'Discipulado transforma histórias.',
      text: 'Cresça na fé e caminhe ao lado de outras mulheres.',
      icon: Icons.groups_outlined,
    ),
    (
      title: 'Você será acolhida.',
      text: 'Encontre cuidado, oração e acompanhamento.',
      icon: Icons.spa_outlined,
    ),
  ];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _next() {
    if (_page == _items.length - 1) {
      context.go('/home');
      return;
    }
    _controller.nextPage(
      duration: const Duration(milliseconds: 350),
      curve: Curves.easeOutCubic,
    );
  }

  @override
  Widget build(BuildContext context) {
    final item = _items[_page];

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(28, 28, 28, 24),
          child: Column(
            children: [
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => context.go('/home'),
                  child: const Text('Pular'),
                ),
              ),
              Expanded(
                child: PageView.builder(
                  controller: _controller,
                  itemCount: _items.length,
                  onPageChanged: (value) => setState(() => _page = value),
                  itemBuilder: (_, index) {
                    final current = _items[index];
                    return Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 220,
                          height: 220,
                          decoration: const BoxDecoration(
                            color: FilhaColors.roseLight,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            current.icon,
                            size: 82,
                            color: FilhaColors.olive,
                          ),
                        ),
                        const SizedBox(height: 48),
                        Text(
                          current.title,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 31,
                            height: 1.15,
                            fontWeight: FontWeight.w600,
                            color: FilhaColors.text,
                          ),
                        ),
                        const SizedBox(height: 18),
                        Text(
                          current.text,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 16,
                            height: 1.6,
                            color: FilhaColors.textSecondary,
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  _items.length,
                  (index) => AnimatedContainer(
                    duration: const Duration(milliseconds: 250),
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: index == _page ? 24 : 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: index == _page
                          ? FilhaColors.gold
                          : FilhaColors.nude,
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: FilledButton(
                  onPressed: _next,
                  style: FilledButton.styleFrom(
                    backgroundColor: FilhaColors.olive,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(22),
                    ),
                  ),
                  child: Text(
                    _page == _items.length - 1 ? 'Começar' : 'Continuar',
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
