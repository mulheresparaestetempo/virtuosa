import 'package:flutter/material.dart';
import 'router/app_router.dart';
import 'theme/filha_theme.dart';

class FilhaApp extends StatelessWidget {
  const FilhaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'FILHA',
      debugShowCheckedModeBanner: false,
      theme: FilhaTheme.light,
      routerConfig: appRouter,
    );
  }
}
