import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/widgets/exports.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        elevation: 0,
        title: const Text('Home'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Greeting
            Text(
              'Bem-vinda, Maria! ✨',
              style: AppTextStyles.heading2,
            ),
            const SizedBox(height: 8),
            Text(
              'Que bom te ver novamente',
              style: AppTextStyles.body.copyWith(
                color: AppColors.textTertiary,
              ),
            ),
            const SizedBox(height: 32),

            // Quick Stats
            _buildStatsRow(),
            const SizedBox(height: 32),

            // Featured Sections
            Text(
              'Sua Caminhada Hoje',
              style: AppTextStyles.heading3,
            ),
            const SizedBox(height: 16),
            _buildFeatureCard(
              emoji: '🕊️',
              titulo: 'Seu Lugar Secreto',
              descricao: 'Tempo de oração e devoção',
              onTap: () {
                // TODO: Navegar para Lugar Secreto
              },
            ),
            const SizedBox(height: 12),
            _buildFeatureCard(
              emoji: '🙏',
              titulo: 'Minhas Orações',
              descricao: 'Compartilhe seus pedidos',
              onTap: () {
                // TODO: Navegar para Orações
              },
            ),
            const SizedBox(height: 12),
            _buildFeatureCard(
              emoji: '❤️',
              titulo: 'Comunidade',
              descricao: 'Veja o que compartilham',
              onTap: () {
                // TODO: Navegar para Comunidade
              },
            ),
            const SizedBox(height: 32),

            // Verso do Dia
            Text(
              'Verso do Dia',
              style: AppTextStyles.heading3,
            ),
            const SizedBox(height: 16),
            FadeInAnimation(
              child: VerseCard(
                reference: 'Salmos 23:1',
                text: 'O Senhor é meu pastor e nada me faltará.',
                translation: 'English: The Lord is my shepherd, and I lack nothing.',
                isFavorite: false,
                onFavoriteTap: () {},
                onShareTap: () {},
              ),
            ),
            const SizedBox(height: 32),

            // Community Highlights
            Text(
              'Destaques da Comunidade',
              style: AppTextStyles.heading3,
            ),
            const SizedBox(height: 16),
            SlideInAnimation(
              direction: SlideDirection.fromLeft,
              child: CommunityCard(
                author: 'Mariana Silva',
                authorImage: '👩',
                content: 'Deus respondeu minha oração! Ele é fiel em tudo!',
                timestamp: 'Hoje',
                likes: 24,
                comments: 5,
                hasLiked: false,
                onLikeTap: () {},
              ),
            ),
            const SizedBox(height: 12),
            SlideInAnimation(
              direction: SlideDirection.fromRight,
              child: CommunityCard(
                author: 'Ana Paula',
                authorImage: '👵',
                content: 'Peço oração pela saúde de minha filha. Obrigada!',
                timestamp: 'Ontem',
                likes: 18,
                comments: 8,
                hasLiked: false,
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.menu_book), label: 'Devocional'),
          BottomNavigationBarItem(icon: Icon(Icons.people), label: 'Comunidade'),
          BottomNavigationBarItem(icon: Icon(Icons.library_books), label: 'Biblioteca'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Perfil'),
        ],
      ),
    );
  }

  Widget _buildStatsRow() {
    return Row(
      children: [
        Expanded(
          child: _buildStatCard(
            label: 'Devocional',
            value: '145',
            emoji: '🕊️',
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _buildStatCard(
            label: 'Orações',
            value: '89',
            emoji: '🤲',
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _buildStatCard(
            label: 'Jejuns',
            value: '3',
            emoji: '🙏',
          ),
        ),
      ],
    );
  }

  Widget _buildStatCard({
    required String label,
    required String value,
    required String emoji,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border.all(color: AppColors.border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(emoji, style: const TextStyle(fontSize: 24)),
          const SizedBox(height: 8),
          Text(
            value,
            style: AppTextStyles.heading4,
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: AppTextStyles.labelSmall,
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureCard({
    required String emoji,
    required String titulo,
    required String descricao,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          border: Border.all(color: AppColors.border),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Text(emoji, style: const TextStyle(fontSize: 28)),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(titulo, style: AppTextStyles.heading5),
                  const SizedBox(height: 4),
                  Text(
                    descricao,
                    style: AppTextStyles.bodySmall.copyWith(
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward, color: AppColors.textTertiary),
          ],
        ),
      ),
    );
  }

  Widget _buildCommunityCard({
    required String emoji,
    required String autor,
    required String texto,
    required String data,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border.all(color: AppColors.border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                autor,
                style: AppTextStyles.heading6,
              ),
              Text(
                emoji,
                style: const TextStyle(fontSize: 18),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            texto,
            style: AppTextStyles.body,
          ),
          const SizedBox(height: 8),
          Text(
            data,
            style: AppTextStyles.labelSmall.copyWith(
              color: AppColors.textTertiary,
            ),
          ),
        ],
      ),
    );
  }
}
