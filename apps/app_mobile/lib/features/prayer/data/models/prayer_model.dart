import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/prayer_entity.dart';

part 'prayer_model.freezed.dart';
part 'prayer_model.g.dart';

@freezed
class PrayerModel with _$PrayerModel {
  const factory PrayerModel({
    required String id,
    required String userId,
    required String titulo,
    required String descricao,
    @Default('pessoal') String categoria,
    @Default([]) List<String> tags,
    @Default(false) bool urgente,
    @Default(false) bool privado,
    @Default(false) bool compartilharComLider,
    @Default('emOracao') String status,
    DateTime? dataResposta,
    String? respostaDescricao,
    @Default(0) int curtidas,
    required DateTime dataCriacao,
    DateTime? atualizadoEm,
  }) = _PrayerModel;

  factory PrayerModel.fromJson(Map<String, dynamic> json) =>
      _$PrayerModelFromJson(json);

  factory PrayerModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return PrayerModel.fromJson({
      ...data,
      'id': doc.id,
    });
  }
}

extension PrayerModelToEntity on PrayerModel {
  PrayerEntity toEntity() {
    return PrayerEntity(
      id: id,
      userId: userId,
      titulo: titulo,
      descricao: descricao,
      categoria: PrayerCategory.values.firstWhere(
        (e) => e.name == categoria,
        orElse: () => PrayerCategory.pessoal,
      ),
      tags: tags,
      urgente: urgente,
      privado: privado,
      compartilharComLider: compartilharComLider,
      status: PrayerStatus.values.firstWhere(
        (e) => e.name == status,
        orElse: () => PrayerStatus.emOracao,
      ),
      dataResposta: dataResposta,
      respostaDescricao: respostaDescricao,
      curtidas: curtidas,
      dataCriacao: dataCriacao,
      atualizadoEm: atualizadoEm,
    );
  }
}

extension PrayerEntityToModel on PrayerEntity {
  Map<String, dynamic> toFirestore() {
    return {
      'id': id,
      'userId': userId,
      'titulo': titulo,
      'descricao': descricao,
      'categoria': categoria.name,
      'tags': tags,
      'urgente': urgente,
      'privado': privado,
      'compartilharComLider': compartilharComLider,
      'status': status.name,
      'dataResposta': dataResposta,
      'respostaDescricao': respostaDescricao,
      'curtidas': curtidas,
      'dataCriacao': dataCriacao,
      'atualizadoEm': atualizadoEm,
    };
  }
}
