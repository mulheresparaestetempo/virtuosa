import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../../app/theme/filha_theme.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    Future<void>.delayed(const Duration(milliseconds: 1800), () {
      if (!mounted) return;
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        context.go('/home');
      } else {
        context.go('/onboarding');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 92,
                height: 92,
                decoration: BoxDecoration(
                  color: FilhaColors.roseLight,
                  shape: BoxShape.circle,
                  border: Border.all(color: FilhaColors.nude),
                ),
                child: const Icon(Icons.local_florist_outlined, size: 42, color: FilhaColors.gold),
              ),
              const SizedBox(height: 28),
              const Text(
                'FILHA',
                style: TextStyle(fontSize: 38, fontWeight: FontWeight.w700, letterSpacing: 5, color: FilhaColors.text),
              ),
              const SizedBox(height: 12),
              const Text(
                'Todos os dias,\num encontro com Abba.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 17, height: 1.5, color: FilhaColors.textSecondary),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
