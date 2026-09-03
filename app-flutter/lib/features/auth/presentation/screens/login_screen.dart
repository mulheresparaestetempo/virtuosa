import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  late TextEditingController _emailController;
  late TextEditingController _passwordController;
  bool _obscurePassword = true;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    setState(() => _isLoading = true);

    try {
      // TODO: Implementar login com Firebase
      // await ref.read(authProvider.notifier).login(
      //   email: _emailController.text,
      //   password: _passwordController.text,
      // );

      // Simular delay
      await Future.delayed(const Duration(seconds: 2));

      if (mounted) {
        context.go('/home');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro: $e')),
        );
      }
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Text(
              'Bem-vinda de volta',
              style: AppTextStyles.heading2,
            ),
            const SizedBox(height: 8),
            Text(
              'Acesse sua conta para continuar',
              style: AppTextStyles.body.copyWith(
                color: AppColors.textTertiary,
              ),
            ),
            const SizedBox(height: 32),

            // Email Field
            Text(
              'E-mail',
              style: AppTextStyles.labelMedium,
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _emailController,
              decoration: InputDecoration(
                hintText: 'seu@email.com',
                prefixIcon: const Icon(Icons.email_outlined),
              ),
              keyboardType: TextInputType.emailAddress,
              enabled: !_isLoading,
            ),
            const SizedBox(height: 20),

            // Password Field
            Text(
              'Senha',
              style: AppTextStyles.labelMedium,
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                hintText: '••••••••',
                prefixIcon: const Icon(Icons.lock_outlined),
                suffixIcon: IconButton(
                  icon: Icon(
                    _obscurePassword
                        ? Icons.visibility_off_outlined
                        : Icons.visibility_outlined,
                  ),
                  onPressed: () {
                    setState(() => _obscurePassword = !_obscurePassword);
                  },
                ),
              ),
              obscureText: _obscurePassword,
              enabled: !_isLoading,
            ),
            const SizedBox(height: 12),

            // Esqueceu Senha
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () {
                  // TODO: Implementar forgot password
                },
                child: Text(
                  'Esqueceu a senha?',
                  style: AppTextStyles.labelMedium.copyWith(
                    color: AppColors.primary,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Login Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _handleLogin,
                child: _isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor:
                              AlwaysStoppedAnimation<Color>(Colors.white),
                        ),
                      )
                    : const Text('Entrar'),
              ),
            ),
            const SizedBox(height: 20),

            // Biometria (se disponível)
            Center(
              child: TextButton.icon(
                onPressed: _isLoading ? null : () {
                  // TODO: Implementar biometria
                },
                icon: const Icon(Icons.fingerprint),
                label: const Text('Usar biometria'),
              ),
            ),
            const SizedBox(height: 32),

            // Divisor
            Row(
              children: [
                Expanded(
                  child: Container(
                    height: 1,
                    color: AppColors.border,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Text(
                    'ou',
                    style: AppTextStyles.body.copyWith(
                      color: AppColors.textTertiary,
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    height: 1,
                    color: AppColors.border,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Social Logins
            _buildSocialButton(
              label: 'Continuar com Google',
              icon: '🔍',
              onPressed: _isLoading ? null : () {
                // TODO: Implementar Google login
              },
            ),
            const SizedBox(height: 12),
            _buildSocialButton(
              label: 'Continuar com Apple',
              icon: '🍎',
              onPressed: _isLoading ? null : () {
                // TODO: Implementar Apple login
              },
            ),
            const SizedBox(height: 32),

            // Cadastro
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Não tem uma conta? ',
                  style: AppTextStyles.body,
                ),
                GestureDetector(
                  onTap: _isLoading ? null : () => context.go('/signup'),
                  child: Text(
                    'Cadastre-se',
                    style: AppTextStyles.labelMedium.copyWith(
                      color: AppColors.primary,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSocialButton({
    required String label,
    required String icon,
    required VoidCallback? onPressed,
  }) {
    return OutlinedButton(
      onPressed: onPressed,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(icon, style: const TextStyle(fontSize: 18)),
          const SizedBox(width: 12),
          Text(label),
        ],
      ),
    );
  }
}
