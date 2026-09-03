import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_entity.freezed.dart';

enum Ministerio {
  adoracao,
  ensino,
  misericordia,
  evangelismo,
  lideranca,
  hospitalidade,
  outro,
}

enum NivelJornada {
  iniciante,
  intermediario,
  avancado,
  mestre,
}

enum UserStatus {
  ativo,
  inativo,
  bloqueado,
}

@freezed
class UserEntity with _$UserEntity {
  const factory UserEntity({
    required String uid,
    required String nome,
    required String email,
    String? telefone,
    String? fotoPerfil,
    DateTime? dataNascimento,
    String? cidade,
    String? estado,
    String? pais,
    String? igrejaId,
    String? liderId,
    String? discipuladoraId,
    @Default([]) List<Ministerio> ministerio,
    @Default([]) List<String> dons,
    @Default(false) bool batizada,
    DateTime? dataBatismo,
    DateTime? dataConversao,
    String? biografia,
    @Default(NivelJornada.iniciante) NivelJornada nivelJornada,
    Map<String, dynamic>? configuracoes,
    DateTime? ultimoLogin,
    required DateTime criadoEm,
    required DateTime atualizadoEm,
    @Default(UserStatus.ativo) UserStatus status,
  }) = _UserEntity;
}
