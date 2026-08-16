import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';

class OnboardingPage {
  final String emoji;
  final String titulo;
  final String descricao;

  OnboardingPage({
    required this.emoji,
    required this.titulo,
    required this.descricao,
  });
}

final onboardingPages = [
  OnboardingPage(
    emoji: '🙏',
    titulo: 'Bem-vinda ao FILHA',
    descricao: 'Um espaço seguro para sua caminhada espiritual com Deus',
  ),
  OnboardingPage(
    emoji: '🕊️',
    titulo: 'Seu Lugar Secreto',
    descricao: 'Tempo diário de devoção, oração e comunhão com o Pai',
  ),
  OnboardingPage(
    emoji: '❤️',
    titulo: 'Comunidade de Mulheres',
    descricao: 'Compartilhe, ore e cresça junto com outras mulheres de fé',
  ),
  OnboardingPage(
    emoji: '✨',
    titulo: 'Transformação em Cristo',
    descricao: 'Ferramentas para sua jornada de discipulado e amadurecimento',
  ),
];

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  late PageController _pageController;
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Pages
          PageView.builder(
            controller: _pageController,
            onPageChanged: (index) {
              setState(() => _currentPage = index);
            },
            itemCount: onboardingPages.length,
            itemBuilder: (context, index) {
              final page = onboardingPages[index];
              return _buildPage(page);
            },
          ),
          // Dots + Botões
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppColors.surface,
                border: Border(
                  top: BorderSide(color: AppColors.border, width: 1),
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Dots
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      onboardingPages.length,
                      (index) => Container(
                        width: _currentPage == index ? 32 : 8,
                        height: 8,
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        decoration: BoxDecoration(
                          color: _currentPage == index
                              ? AppColors.primary
                              : AppColors.border,
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Botões
                  Row(
                    children: [
                      if (_currentPage > 0)
                        Expanded(
                          child: OutlinedButton(
                            onPressed: () {
                              _pageController.previousPage(
                                duration: const Duration(milliseconds: 300),
                                curve: Curves.easeInOut,
                              );
                            },
                            child: const Text('Voltar'),
                          ),
                        ),
                      if (_currentPage > 0) const SizedBox(width: 12),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            if (_currentPage < onboardingPages.length - 1) {
                              _pageController.nextPage(
                                duration: const Duration(milliseconds: 300),
                                curve: Curves.easeInOut,
                              );
                            } else {
                              context.go('/login');
                            }
                          },
                          child: Text(
                            _currentPage == onboardingPages.length - 1
                                ? 'Começar'
                                : 'Próximo',
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPage(OnboardingPage page) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          page.emoji,
          style: const TextStyle(fontSize: 80),
        ),
        const SizedBox(height: 32),
        Text(
          page.titulo,
          style: AppTextStyles.heading1,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Text(
            page.descricao,
            style: AppTextStyles.body,
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );
  }
}
