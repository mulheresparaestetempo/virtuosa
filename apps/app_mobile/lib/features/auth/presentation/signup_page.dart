import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/filha_theme.dart';
import '../../../core/services/auth_service.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _obscure = true;
  bool _loading = false;
  String? _error;

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _create() async {
    if (_name.text.trim().isEmpty || _email.text.trim().isEmpty || _password.text.isEmpty) return;
    if (_password.text.length < 6) {
      setState(() => _error = 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    setState(() { _loading = true; _error = null; });
    try {
      await AuthService.signUp(_name.text, _email.text, _password.text);
      if (mounted) context.go('/home');
    } on Exception catch (e) {
      setState(() { _error = _friendlyError(e.toString()); });
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  String _friendlyError(String raw) {
    if (raw.contains('email-already-in-use')) return 'Este e-mail já está cadastrado.';
    if (raw.contains('invalid-email')) return 'E-mail inválido.';
    if (raw.contains('weak-password')) return 'Senha muito fraca. Use pelo menos 6 caracteres.';
    if (raw.contains('network-request-failed')) return 'Sem conexão com a internet.';
    return 'Erro ao criar conta. Tente novamente.';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Criar conta')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(28, 24, 28, 32),
          children: [
            const Text('Sua jornada começa aqui.', style: TextStyle(fontSize: 30, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            const Text(
              'Crie sua conta e comece sua caminhada com Abba.',
              style: TextStyle(color: FilhaColors.textSecondary, height: 1.5),
            ),
            const SizedBox(height: 30),
            TextField(
              controller: _name,
              textCapitalization: TextCapitalization.words,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(labelText: 'Seu nome', prefixIcon: Icon(Icons.person_outline)),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(labelText: 'E-mail', prefixIcon: Icon(Icons.mail_outline)),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _password,
              obscureText: _obscure,
              textInputAction: TextInputAction.done,
              onSubmitted: (_) => _create(),
              decoration: InputDecoration(
                labelText: 'Senha (mín. 6 caracteres)',
                prefixIcon: const Icon(Icons.lock_outline),
                suffixIcon: IconButton(
                  onPressed: () => setState(() => _obscure = !_obscure),
                  icon: Icon(_obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined),
                ),
              ),
            ),
            if (_error != null) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: const Color(0xFFFFE8E8), borderRadius: BorderRadius.circular(14)),
                child: Text(_error!, style: const TextStyle(color: Color(0xFFC85A54))),
              ),
            ],
            const SizedBox(height: 24),
            SizedBox(
              height: 56,
              child: FilledButton(
                onPressed: _loading ? null : _create,
                style: FilledButton.styleFrom(
                  backgroundColor: FilhaColors.olive,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
                ),
                child: _loading
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                    : const Text('Criar conta'),
              ),
            ),
            const SizedBox(height: 12),
            Center(
              child: TextButton(
                onPressed: () => context.go('/login'),
                child: const Text('Já tenho conta — Entrar'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
