import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart' show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) return web;
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      default:
        return web;
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDhTQRP7HdwaDruyAP_rRZRoSnC6O1Gttg',
    appId: '1:557958037513:web:e2e4f96045453ed87138d8',
    messagingSenderId: '557958037513',
    projectId: 'app-filha-af1f9',
    authDomain: 'app-filha-af1f9.firebaseapp.com',
    storageBucket: 'app-filha-af1f9.firebasestorage.app',
  );

  // Para Android/iOS em produção: registre o app no Firebase Console
  // e substitua o appId pelo valor correto de google-services.json / GoogleService-Info.plist
  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDhTQRP7HdwaDruyAP_rRZRoSnC6O1Gttg',
    appId: '1:557958037513:android:app_filha',
    messagingSenderId: '557958037513',
    projectId: 'app-filha-af1f9',
    storageBucket: 'app-filha-af1f9.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDhTQRP7HdwaDruyAP_rRZRoSnC6O1Gttg',
    appId: '1:557958037513:ios:app_filha',
    messagingSenderId: '557958037513',
    projectId: 'app-filha-af1f9',
    storageBucket: 'app-filha-af1f9.firebasestorage.app',
    iosBundleId: 'com.mulheresparaestetempo.filha',
  );
}
