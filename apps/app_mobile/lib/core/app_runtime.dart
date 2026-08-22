import 'package:firebase_core/firebase_core.dart';
import '../firebase_options.dart';
import 'repositories/care_repository.dart';
import 'repositories/spiritual_repository.dart';
import 'storage/local_store.dart';

class AppRuntime {
  AppRuntime._();

  static SpiritualRepository? spiritualRepository;
  static CareRepository? careRepository;

  static Future<void> initialize() async {
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
    final store = await LocalStore.create();
    spiritualRepository = SpiritualRepository(store);
    careRepository = CareRepository(store);
  }
}
