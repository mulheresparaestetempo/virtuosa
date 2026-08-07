import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/user_entity.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
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
    @Default([]) List<String> ministerio,
    @Default([]) List<String> dons,
    @Default(false) bool batizada,
    DateTime? dataBatismo,
    DateTime? dataConversao,
    String? biografia,
    @Default('iniciante') String nivelJornada,
    @Default({}) Map<String, dynamic> configuracoes,
    DateTime? ultimoLogin,
    required DateTime criadoEm,
    required DateTime atualizadoEm,
    @Default('ativo') String status,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);

  factory UserModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return UserModel.fromJson({
      ...data,
      'uid': doc.id,
    });
  }
}

extension UserModelToEntity on UserModel {
  UserEntity toEntity() {
    return UserEntity(
      uid: uid,
      nome: nome,
      email: email,
      telefone: telefone,
      fotoPerfil: fotoPerfil,
      dataNascimento: dataNascimento,
      cidade: cidade,
      estado: estado,
      pais: pais,
      igrejaId: igrejaId,
      liderId: liderId,
      discipuladoraId: discipuladoraId,
      ministerio: ministerio
          .map((m) => Ministerio.values.firstWhere(
                (e) => e.name == m,
                orElse: () => Ministerio.outro,
              ))
          .toList(),
      dons: dons,
      batizada: batizada,
      dataBatismo: dataBatismo,
      dataConversao: dataConversao,
      biografia: biografia,
      nivelJornada: NivelJornada.values.firstWhere(
        (e) => e.name == nivelJornada,
        orElse: () => NivelJornada.iniciante,
      ),
      configuracoes: configuracoes,
      ultimoLogin: ultimoLogin,
      criadoEm: criadoEm,
      atualizadoEm: atualizadoEm,
      status: UserStatus.values.firstWhere(
        (e) => e.name == status,
        orElse: () => UserStatus.ativo,
      ),
    );
  }
}

extension UserEntityToModel on UserEntity {
  Map<String, dynamic> toFirestore() {
    return {
      'uid': uid,
      'nome': nome,
      'email': email,
      'telefone': telefone,
      'fotoPerfil': fotoPerfil,
      'dataNascimento': dataNascimento,
      'cidade': cidade,
      'estado': estado,
      'pais': pais,
      'igrejaId': igrejaId,
      'liderId': liderId,
      'discipuladoraId': discipuladoraId,
      'ministerio': ministerio.map((m) => m.name).toList(),
      'dons': dons,
      'batizada': batizada,
      'dataBatismo': dataBatismo,
      'dataConversao': dataConversao,
      'biografia': biografia,
      'nivelJornada': nivelJornada.name,
      'configuracoes': configuracoes ?? {},
      'ultimoLogin': ultimoLogin,
      'criadoEm': criadoEm,
      'atualizadoEm': atualizadoEm,
      'status': status.name,
    };
  }
}
