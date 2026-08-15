import 'package:flutter/material.dart';
import 'app/app.dart';
import 'core/app_runtime.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AppRuntime.initialize();
  runApp(const FilhaApp());
}
