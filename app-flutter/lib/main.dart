import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'firebase_options.dart';
import 'core/router/app_router.dart';
import 'core/theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(
    const ProviderScope(
      child: FilhaApp(),
    ),
  );
}

class FilhaApp extends ConsumerWidget {
  const FilhaApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appRouter = ref.watch(appRouterProvider);
    final appTheme = ref.watch(appThemeProvider);

    return MaterialApp.router(
      title: 'FILHA - Abba Virtuosa',
      theme: appTheme.lightTheme,
      darkTheme: appTheme.darkTheme,
      themeMode: ThemeMode.light,
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
  }
}
