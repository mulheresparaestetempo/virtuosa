import 'package:freezed_annotation/freezed_annotation.dart';

part 'auth_entity.freezed.dart';

enum UserRole {
  usuario,
  discipuladora,
  lider,
  pastora,
  administradora,
  superAdministradora,
}

enum AuthProvider {
  email,
  google,
  apple,
  facebook,
  anonymous,
}

@freezed
class AuthEntity with _$AuthEntity {
  const factory AuthEntity({
    required String uid,
    required String email,
    String? displayName,
    String? photoUrl,
    @Default(false) bool emailVerified,
    @Default(false) bool biometryEnabled,
    @Default(AuthProvider.email) AuthProvider provider,
    @Default(UserRole.usuario) UserRole role,
    @Default(false) bool isAnonymous,
    required DateTime criadoEm,
    DateTime? ultimoLogin,
  }) = _AuthEntity;
}

@freezed
class AuthCredentials with _$AuthCredentials {
  const factory AuthCredentials({
    required String email,
    required String password,
  }) = _AuthCredentials;
}

@freezed
class SignUpCredentials with _$SignUpCredentials {
  const factory SignUpCredentials({
    required String email,
    required String password,
    required String confirmPassword,
    required String nome,
    @Default(true) bool acceptTerms,
  }) = _SignUpCredentials;
}
