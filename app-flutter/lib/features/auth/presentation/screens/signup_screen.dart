import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';

class SignupScreen extends ConsumerStatefulWidget {
  const SignupScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends ConsumerState<SignupScreen> {
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _passwordController;
  late TextEditingController _confirmPasswordController;
  bool _obscurePassword = true;
  bool _obscureConfirm = true;
  bool _agreedToTerms = false;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    _confirmPasswordController = TextEditingController();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  bool _validateForm() {
    if (_nameController.text.isEmpty) {
      _showError('Por favor, insira seu nome');
      return false;
    }
    if (_emailController.text.isEmpty ||
        !_emailController.text.contains('@')) {
      _showError('Por favor, insira um e-mail válido');
      return false;
    }
    if (_passwordController.text.isEmpty ||
        _passwordController.text.length < 6) {
      _showError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (_passwordController.text != _confirmPasswordController.text) {
      _showError('Senhas não conferem');
      return false;
    }
    if (!_agreedToTerms) {
      _showError('Por favor, aceite os termos e condições');
      return false;
    }
    return true;
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  Future<void> _handleSignup() async {
    if (!_validateForm()) return;

    setState(() => _isLoading = true);

    try {
      // TODO: Implementar signup com Firebase
      // await ref.read(authProvider.notifier).signup(
      //   name: _nameController.text,
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
        _showError('Erro ao criar conta: $e');
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
              'Crie sua conta',
              style: AppTextStyles.heading2,
            ),
            const SizedBox(height: 8),
            Text(
              'Junte-se à comunidade Abba Virtuosa',
              style: AppTextStyles.body.copyWith(
                color: AppColors.textTertiary,
              ),
            ),
            const SizedBox(height: 32),

            // Name Field
            _buildField(
              label: 'Nome completo',
              hint: 'Seu nome',
              controller: _nameController,
              icon: Icons.person_outlined,
            ),
            const SizedBox(height: 20),

            // Email Field
            _buildField(
              label: 'E-mail',
              hint: 'seu@email.com',
              controller: _emailController,
              icon: Icons.email_outlined,
              keyboardType: TextInputType.emailAddress,
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
            const SizedBox(height: 20),

            // Confirm Password Field
            Text(
              'Confirmar senha',
              style: AppTextStyles.labelMedium,
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _confirmPasswordController,
              decoration: InputDecoration(
                hintText: '••••••••',
                prefixIcon: const Icon(Icons.lock_outlined),
                suffixIcon: IconButton(
                  icon: Icon(
                    _obscureConfirm
                        ? Icons.visibility_off_outlined
                        : Icons.visibility_outlined,
                  ),
                  onPressed: () {
                    setState(() => _obscureConfirm = !_obscureConfirm);
                  },
                ),
              ),
              obscureText: _obscureConfirm,
              enabled: !_isLoading,
            ),
            const SizedBox(height: 20),

            // Terms Checkbox
            CheckboxListTile(
              value: _agreedToTerms,
              onChanged: _isLoading
                  ? null
                  : (value) {
                      setState(() => _agreedToTerms = value ?? false);
                    },
              title: RichText(
                text: TextSpan(
                  style: AppTextStyles.body,
                  children: [
                    const TextSpan(text: 'Eu aceito os '),
                    TextSpan(
                      text: 'Termos de Serviço',
                      style: AppTextStyles.body.copyWith(
                        color: AppColors.primary,
                      ),
                    ),
                    const TextSpan(text: ' e '),
                    TextSpan(
                      text: 'Política de Privacidade',
                      style: AppTextStyles.body.copyWith(
                        color: AppColors.primary,
                      ),
                    ),
                  ],
                ),
              ),
              controlAffinity: ListTileControlAffinity.leading,
              dense: true,
            ),
            const SizedBox(height: 24),

            // Signup Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _handleSignup,
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
                    : const Text('Criar conta'),
              ),
            ),
            const SizedBox(height: 32),

            // Login
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Já tem uma conta? ',
                  style: AppTextStyles.body,
                ),
                GestureDetector(
                  onTap: _isLoading ? null : () => context.go('/login'),
                  child: Text(
                    'Entrar',
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

  Widget _buildField({
    required String label,
    required String hint,
    required TextEditingController controller,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: AppTextStyles.labelMedium),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          decoration: InputDecoration(
            hintText: hint,
            prefixIcon: Icon(icon),
          ),
          keyboardType: keyboardType,
          enabled: !_isLoading,
        ),
      ],
    );
  }
}
