import 'package:firebase_auth/firebase_auth.dart' as fb;
import 'package:google_sign_in/google_sign_in.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';
import 'package:flutter/foundation.dart';
import '../models/auth_model.dart';

abstract class FirebaseAuthDataSource {
  Future<AuthModel> loginWithEmail(String email, String password);
  Future<AuthModel> signUpWithEmail(String email, String password, String name);
  Future<AuthModel> loginWithGoogle();
  Future<AuthModel> loginWithApple();
  Future<AuthModel?> getCurrentUser();
  Future<void> logout();
  Future<void> resetPassword(String email);
  Future<void> updateProfile(String displayName, String? photoUrl);
  Future<void> enableBiometry();
  Future<void> disableBiometry();
  Future<void> linkBiometry(String email, String password);
  Future<void> verifyEmail();
  Future<bool> isBiometryAvailable();
}

class FirebaseAuthDataSourceImpl implements FirebaseAuthDataSource {
  final fb.FirebaseAuth firebaseAuth;
  final GoogleSignIn googleSignIn;

  FirebaseAuthDataSourceImpl({
    required this.firebaseAuth,
    required this.googleSignIn,
  });

  @override
  Future<AuthModel> loginWithEmail(String email, String password) async {
    try {
      final result = await firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      final user = result.user;
      if (user == null) throw Exception('Login failed');

      return AuthModel.fromFirebaseUser(
        user,
        provider: 'email',
      );
    } on fb.FirebaseAuthException catch (e) {
      debugPrint('Firebase Auth Error: ${e.code}');
      throw _handleAuthException(e);
    } catch (e) {
      debugPrint('Login error: $e');
      rethrow;
    }
  }

  @override
  Future<AuthModel> signUpWithEmail(
    String email,
    String password,
    String name,
  ) async {
    try {
      final result = await firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      final user = result.user;
      if (user == null) throw Exception('Sign up failed');

      // Update display name
      await user.updateDisplayName(name);
      await user.reload();

      return AuthModel.fromFirebaseUser(
        firebaseAuth.currentUser!,
        provider: 'email',
      );
    } on fb.FirebaseAuthException catch (e) {
      debugPrint('Firebase Auth Error: ${e.code}');
      throw _handleAuthException(e);
    } catch (e) {
      debugPrint('Sign up error: $e');
      rethrow;
    }
  }

  @override
  Future<AuthModel> loginWithGoogle() async {
    try {
      final googleUser = await googleSignIn.signIn();
      if (googleUser == null) throw Exception('Google sign in cancelled');

      final googleAuth = await googleUser.authentication;
      final credential = fb.GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final result = await firebaseAuth.signInWithCredential(credential);
      final user = result.user;

      if (user == null) throw Exception('Google login failed');

      return AuthModel.fromFirebaseUser(
        user,
        provider: 'google',
      );
    } catch (e) {
      debugPrint('Google login error: $e');
      rethrow;
    }
  }

  @override
  Future<AuthModel> loginWithApple() async {
    try {
      final result = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDSignInScopes.email,
          AppleIDSignInScopes.fullName,
        ],
      );

      final oauthCredential = fb.OAuthProvider('apple.com').credential(
        idToken: result.identityToken,
        accessToken: result.authorizationCode,
      );

      final authResult = await firebaseAuth.signInWithCredential(oauthCredential);
      final user = authResult.user;

      if (user == null) throw Exception('Apple login failed');

      return AuthModel.fromFirebaseUser(
        user,
        provider: 'apple',
      );
    } catch (e) {
      debugPrint('Apple login error: $e');
      rethrow;
    }
  }

  @override
  Future<AuthModel?> getCurrentUser() async {
    try {
      final user = firebaseAuth.currentUser;
      if (user == null) return null;

      return AuthModel.fromFirebaseUser(user);
    } catch (e) {
      debugPrint('Get current user error: $e');
      return null;
    }
  }

  @override
  Future<void> logout() async {
    try {
      await Future.wait([
        firebaseAuth.signOut(),
        googleSignIn.signOut(),
      ]);
    } catch (e) {
      debugPrint('Logout error: $e');
      rethrow;
    }
  }

  @override
  Future<void> resetPassword(String email) async {
    try {
      await firebaseAuth.sendPasswordResetEmail(email: email);
    } on fb.FirebaseAuthException catch (e) {
      debugPrint('Firebase Auth Error: ${e.code}');
      throw _handleAuthException(e);
    } catch (e) {
      debugPrint('Reset password error: $e');
      rethrow;
    }
  }

  @override
  Future<void> updateProfile(String displayName, String? photoUrl) async {
    try {
      final user = firebaseAuth.currentUser;
      if (user == null) throw Exception('User not authenticated');

      await user.updateDisplayName(displayName);
      if (photoUrl != null) {
        await user.updatePhotoURL(photoUrl);
      }
      await user.reload();
    } catch (e) {
      debugPrint('Update profile error: $e');
      rethrow;
    }
  }

  @override
  Future<void> enableBiometry() async {
    // This would be implemented with local_auth package
    // Storing preference in secure storage
    try {
      debugPrint('Biometry enabled');
    } catch (e) {
      debugPrint('Enable biometry error: $e');
      rethrow;
    }
  }

  @override
  Future<void> disableBiometry() async {
    try {
      debugPrint('Biometry disabled');
    } catch (e) {
      debugPrint('Disable biometry error: $e');
      rethrow;
    }
  }

  @override
  Future<void> linkBiometry(String email, String password) async {
    // This would save credentials securely for biometric unlock
    try {
      debugPrint('Biometry linked for $email');
    } catch (e) {
      debugPrint('Link biometry error: $e');
      rethrow;
    }
  }

  @override
  Future<void> verifyEmail() async {
    try {
      final user = firebaseAuth.currentUser;
      if (user == null) throw Exception('User not authenticated');

      await user.sendEmailVerification();
    } catch (e) {
      debugPrint('Verify email error: $e');
      rethrow;
    }
  }

  @override
  Future<bool> isBiometryAvailable() async {
    try {
      // This would use local_auth to check device capabilities
      return true;
    } catch (e) {
      debugPrint('Check biometry error: $e');
      return false;
    }
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
