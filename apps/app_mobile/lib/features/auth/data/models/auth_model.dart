import 'package:firebase_auth/firebase_auth.dart' as fb;
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/auth_entity.dart';

part 'auth_model.freezed.dart';
part 'auth_model.g.dart';

@freezed
class AuthModel with _$AuthModel {
  const factory AuthModel({
    required String uid,
    required String email,
    String? displayName,
    String? photoUrl,
    @Default(false) bool emailVerified,
    @Default(false) bool biometryEnabled,
    @Default('email') String provider,
    @Default('usuario') String role,
    @Default(false) bool isAnonymous,
    required DateTime criadoEm,
    DateTime? ultimoLogin,
  }) = _AuthModel;

  factory AuthModel.fromJson(Map<String, dynamic> json) =>
      _$AuthModelFromJson(json);

  factory AuthModel.fromFirebaseUser(
    fb.User user, {
    String provider = 'email',
  }) {
    return AuthModel(
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
      provider: provider,
      isAnonymous: user.isAnonymous,
      criadoEm: user.metadata.creationTime ?? DateTime.now(),
      ultimoLogin: user.metadata.lastSignInTime,
    );
  }
}

extension AuthModelToEntity on AuthModel {
  AuthEntity toEntity() {
    return AuthEntity(
      uid: uid,
      email: email,
      displayName: displayName,
      photoUrl: photoUrl,
      emailVerified: emailVerified,
      biometryEnabled: biometryEnabled,
      provider: AuthProvider.values.firstWhere(
        (e) => e.name == provider,
        orElse: () => AuthProvider.email,
      ),
      role: UserRole.values.firstWhere(
        (e) => e.name == role,
        orElse: () => UserRole.usuario,
      ),
      isAnonymous: isAnonymous,
      criadoEm: criadoEm,
      ultimoLogin: ultimoLogin,
    );
  }
}

extension AuthEntityToModel on AuthEntity {
  Map<String, dynamic> toJson() {
    return {
      'uid': uid,
      'email': email,
      'displayName': displayName,
      'photoUrl': photoUrl,
      'emailVerified': emailVerified,
      'biometryEnabled': biometryEnabled,
      'provider': provider.name,
      'role': role.name,
      'isAnonymous': isAnonymous,
      'criadoEm': criadoEm,
      'ultimoLogin': ultimoLogin,
    };
  }
}
