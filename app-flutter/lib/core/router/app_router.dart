import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/screens/splash_screen.dart';
import '../../features/auth/presentation/screens/onboarding_screen.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/signup_screen.dart';
import '../../features/home/presentation/screens/home_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    debugLogDiagnostics: true,
    routes: [
      // ========================================================================
      // AUTH ROUTES
      // ========================================================================
      GoRoute(
        path: '/',
        name: 'splash',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        name: 'onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        name: 'signup',
        builder: (context, state) => const SignupScreen(),
      ),

      // ========================================================================
      // HOME ROUTES
      // ========================================================================
      GoRoute(
        path: '/home',
        name: 'home',
        builder: (context, state) => const HomeScreen(),
      ),

      // ========================================================================
      // TODO: DEVOTIONAL ROUTES
      // ========================================================================
      GoRoute(
        path: '/devotional',
        name: 'devotional',
        builder: (context, state) {
          return const Placeholder();
        },
      ),

      // ========================================================================
      // TODO: PRAYER ROUTES
      // ========================================================================
      GoRoute(
        path: '/prayer',
        name: 'prayer',
        builder: (context, state) {
          return const Placeholder();
        },
      ),

      // ========================================================================
      // TODO: FASTING ROUTES
      // ========================================================================
      GoRoute(
        path: '/fasting',
        name: 'fasting',
        builder: (context, state) {
          return const Placeholder();
        },
      ),

      // ========================================================================
      // TODO: COMMUNITY ROUTES
      // ========================================================================
      GoRoute(
        path: '/community',
        name: 'community',
        builder: (context, state) {
          return const Placeholder();
        },
      ),

      // ========================================================================
      // TODO: LIBRARY ROUTES
      // ========================================================================
      GoRoute(
        path: '/library',
        name: 'library',
        builder: (context, state) {
          return const Placeholder();
        },
      ),

      // ========================================================================
      // TODO: BIBLE ROUTES
      // ========================================================================
      GoRoute(
        path: '/bible',
        name: 'bible',
        builder: (context, state) {
          return const Placeholder();
        },
      ),

      // ========================================================================
      // TODO: PROFILE ROUTES
      // ========================================================================
      GoRoute(
        path: '/profile',
        name: 'profile',
        builder: (context, state) {
          return const Placeholder();
        },
      ),
    ],
    errorBuilder: (context, state) {
      return Scaffold(
        appBar: AppBar(title: const Text('Erro')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('Rota não encontrada'),
              const SizedBox(height: 16),
              Text(state.uri.toString()),
            ],
          ),
        ),
      );
    },
  );
});
