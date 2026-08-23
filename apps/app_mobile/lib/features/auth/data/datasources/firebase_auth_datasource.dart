import 'package:firebase_auth/firebase_auth.dart' as fb;
import 'package:flutter/foundation.dart';
import '../models/auth_model.dart';

abstract class FirebaseAuthDataSource {
  Future<AuthModel> loginWithEmail(String email, String password);
  Future<AuthModel> signUpWithEmail(String email, String password, String name);
  Future<AuthModel?> getCurrentUser();
  Future<void> logout();
  Future<void> resetPassword(String email);
  Future<void> updateProfile(String displayName, String? photoUrl);
  Future<void> verifyEmail();
}

class FirebaseAuthDataSourceImpl implements FirebaseAuthDataSource {
  final fb.FirebaseAuth firebaseAuth;

  FirebaseAuthDataSourceImpl({required this.firebaseAuth});

  @override
  Future<AuthModel> loginWithEmail(String email, String password) async {
    try {
      final result = await firebaseAuth.signInWithEmailAndPassword(email: email, password: password);
      final user = result.user;
      if (user == null) throw Exception('Login failed');
      return AuthModel.fromFirebaseUser(user, provider: 'email');
    } on fb.FirebaseAuthException catch (e) {
      debugPrint('Firebase Auth Error: ${e.code}');
      throw _handleAuthException(e);
    }
  }

  @override
  Future<AuthModel> signUpWithEmail(String email, String password, String name) async {
    try {
      final result = await firebaseAuth.createUserWithEmailAndPassword(email: email, password: password);
      final user = result.user;
      if (user == null) throw Exception('Sign up failed');
      await user.updateDisplayName(name);
      await user.reload();
      return AuthModel.fromFirebaseUser(firebaseAuth.currentUser!, provider: 'email');
    } on fb.FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  @override
  Future<AuthModel?> getCurrentUser() async {
    final user = firebaseAuth.currentUser;
    if (user == null) return null;
    return AuthModel.fromFirebaseUser(user);
  }

  @override
  Future<void> logout() async => firebaseAuth.signOut();

  @override
  Future<void> resetPassword(String email) async {
    try {
      await firebaseAuth.sendPasswordResetEmail(email: email);
    } on fb.FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  @override
  Future<void> updateProfile(String displayName, String? photoUrl) async {
    final user = firebaseAuth.currentUser;
    if (user == null) throw Exception('User not authenticated');
    await user.updateDisplayName(displayName);
    if (photoUrl != null) await user.updatePhotoURL(photoUrl);
    await user.reload();
  }

  @override
  Future<void> verifyEmail() async {
    final user = firebaseAuth.currentUser;
    if (user == null) throw Exception('User not authenticated');
    await user.sendEmailVerification();
  }

  Exception _handleAuthException(fb.FirebaseAuthException e) {
    switch (e.code) {
      case 'user-not-found':
        return Exception('Email não cadastrado');
      case 'wrong-password':
        return Exception('Senha incorreta');
      case 'email-already-in-use':
        return Exception('Email já cadastrado');
      case 'weak-password':
        return Exception('Senha fraca (mínimo 6 caracteres)');
      case 'invalid-email':
        return Exception('Email inválido');
      case 'user-disabled':
        return Exception('Usuário desativado');
      default:
        return Exception('Erro de autenticação: ${e.message}');
    }
  }
}
