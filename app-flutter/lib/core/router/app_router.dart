import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        name: 'home',
        builder: (context, state) {
          // TODO: Implementar HomeScreen
          return const Placeholder();
        },
      ),
      GoRoute(
        path: '/devotional',
        name: 'devotional',
        builder: (context, state) {
          // TODO: Implementar DevotionalScreen
          return const Placeholder();
        },
      ),
      GoRoute(
        path: '/prayer',
        name: 'prayer',
        builder: (context, state) {
          // TODO: Implementar PrayerScreen
          return const Placeholder();
        },
      ),
      GoRoute(
        path: '/profile',
        name: 'profile',
        builder: (context, state) {
          // TODO: Implementar ProfileScreen
          return const Placeholder();
        },
      ),
    ],
    errorBuilder: (context, state) {
      return Scaffold(
        appBar: AppBar(title: const Text('Erro')),
        body: Center(
          child: Text('Rota não encontrada: ${state.uri}'),
        ),
      );
    },
  );
});
