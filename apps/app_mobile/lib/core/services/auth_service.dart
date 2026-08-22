import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AuthService {
  static final _auth = FirebaseAuth.instance;
  static final _db = FirebaseFirestore.instance;

  static User? get currentUser => _auth.currentUser;
  static Stream<User?> get authState => _auth.authStateChanges();

  static Future<void> signIn(String email, String password) async {
    await _auth.signInWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
    await _updateLastAccess();
  }

  static Future<void> signUp(String name, String email, String password) async {
    final cred = await _auth.createUserWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
    await cred.user?.updateDisplayName(name.trim());
    await _db.collection('usuarias').doc(cred.user!.uid).set({
      'nome': name.trim(),
      'email': email.trim(),
      'papel': 'membro',
      'criadoEm': FieldValue.serverTimestamp(),
      'ultimoAcesso': FieldValue.serverTimestamp(),
    });
  }

  static Future<void> signOut() => _auth.signOut();

  static Future<void> _updateLastAccess() async {
    final uid = _auth.currentUser?.uid;
    if (uid == null) return;
    await _db.collection('usuarias').doc(uid).set(
      {'ultimoAcesso': FieldValue.serverTimestamp()},
      SetOptions(merge: true),
    );
  }
}
