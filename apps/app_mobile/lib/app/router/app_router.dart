import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../features/assistant/presentation/assistant_page.dart';
import '../../features/auth/presentation/login_page.dart';
import '../../features/auth/presentation/signup_page.dart';
import '../../features/community/presentation/community_page.dart';
import '../../features/devotional/presentation/devotional_page.dart';
import '../../features/discipleship/presentation/discipleship_page.dart';
import '../../features/fasting/presentation/fasting_page.dart';
import '../../features/gratitude/presentation/gratitude_page.dart';
import '../../features/home/presentation/home_page.dart';
import '../../features/house_worship/presentation/house_worship_page.dart';
import '../../features/hospitality/presentation/hospitality_page.dart';
import '../../features/journal/presentation/journal_page.dart';
import '../../features/journeys/presentation/journeys_page.dart';
import '../../features/library/presentation/library_page.dart';
import '../../features/memorials/presentation/memorials_page.dart';
import '../../features/onboarding/presentation/onboarding_page.dart';
import '../../features/prayer/presentation/prayer_page.dart';
import '../../features/profile/presentation/profile_page.dart';
import '../../features/secret_place/presentation/secret_place_page.dart';
import '../../features/splash/presentation/splash_page.dart';

final _authNotifier = _AuthNotifier();

class _AuthNotifier extends ChangeNotifier {
  _AuthNotifier() {
    FirebaseAuth.instance.authStateChanges().listen((_) => notifyListeners());
  }
}

final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  refreshListenable: _authNotifier,
  redirect: (context, state) {
    final loggedIn = FirebaseAuth.instance.currentUser != null;
    final loc = state.matchedLocation;
    final isPublic = loc == '/' || loc == '/onboarding' || loc == '/login' || loc == '/signup';

    if (!loggedIn && !isPublic) return '/login';
    if (loggedIn && isPublic) return '/home';
    return null;
  },
  routes: [
    GoRoute(path: '/', builder: (_, __) => const SplashPage()),
    GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingPage()),
    GoRoute(path: '/login', builder: (_, __) => const LoginPage()),
    GoRoute(path: '/signup', builder: (_, __) => const SignupPage()),
    GoRoute(path: '/home', builder: (_, __) => const HomePage()),
    GoRoute(path: '/secret-place', builder: (_, __) => const SecretPlacePage()),
    GoRoute(path: '/devotional', builder: (_, __) => const DevotionalPage()),
    GoRoute(path: '/prayer', builder: (_, __) => const PrayerPage()),
    GoRoute(path: '/fasting', builder: (_, __) => const FastingPage()),
    GoRoute(path: '/journal', builder: (_, __) => const JournalPage()),
    GoRoute(path: '/gratitude', builder: (_, __) => const GratitudePage()),
    GoRoute(path: '/memorials', builder: (_, __) => const MemorialsPage()),
    GoRoute(path: '/community', builder: (_, __) => const CommunityPage()),
    GoRoute(path: '/library', builder: (_, __) => const LibraryPage()),
    GoRoute(path: '/profile', builder: (_, __) => const ProfilePage()),
    GoRoute(path: '/hospitality', builder: (_, __) => const HospitalityPage()),
    GoRoute(path: '/house-worship', builder: (_, __) => const HouseWorshipPage()),
    GoRoute(path: '/discipleship', builder: (_, __) => const DiscipleshipPage()),
    GoRoute(path: '/journeys', builder: (_, __) => const JourneysPage()),
    GoRoute(path: '/assistant', builder: (_, __) => const AssistantPage()),
  ],
);
