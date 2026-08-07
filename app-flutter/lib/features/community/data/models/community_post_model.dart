import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/community_post_entity.dart';

part 'community_post_model.freezed.dart';
part 'community_post_model.g.dart';

@freezed
class CommunityPostModel with _$CommunityPostModel {
  const factory CommunityPostModel({
    required String id,
    required String autorId,
    required String autorNome,
    String? autorFoto,
    @Default('testemunho') String tipo,
    required String titulo,
    required String texto,
    String? imagem,
    String? video,
    @Default(0) int curtidas,
    @Default(0) int comentarios,
    @Default(0) int compartilhamentos,
    @Default(false) bool pinned,
    @Default([]) List<String> tags,
    required DateTime dataCriacao,
    DateTime? atualizadoEm,
  }) = _CommunityPostModel;

  factory CommunityPostModel.fromJson(Map<String, dynamic> json) =>
      _$CommunityPostModelFromJson(json);

  factory CommunityPostModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return CommunityPostModel.fromJson({
      ...data,
      'id': doc.id,
    });
  }
}

extension CommunityPostModelToEntity on CommunityPostModel {
  CommunityPostEntity toEntity() {
    return CommunityPostEntity(
      id: id,
      autorId: autorId,
      autorNome: autorNome,
      autorFoto: autorFoto,
      tipo: CommunityPostType.values.firstWhere(
        (e) => e.name == tipo,
        orElse: () => CommunityPostType.testemunho,
      ),
      titulo: titulo,
      texto: texto,
      imagem: imagem,
      video: video,
      curtidas: curtidas,
      comentarios: comentarios,
      compartilhamentos: compartilhamentos,
      pinned: pinned,
      tags: tags,
      dataCriacao: dataCriacao,
      atualizadoEm: atualizadoEm,
    );
  }
}

extension CommunityPostEntityToModel on CommunityPostEntity {
  Map<String, dynamic> toFirestore() {
    return {
      'id': id,
      'autorId': autorId,
      'autorNome': autorNome,
      'autorFoto': autorFoto,
      'tipo': tipo.name,
      'titulo': titulo,
      'texto': texto,
      'imagem': imagem,
      'video': video,
      'curtidas': curtidas,
      'comentarios': comentarios,
      'compartilhamentos': compartilhamentos,
      'pinned': pinned,
      'tags': tags,
      'dataCriacao': dataCriacao,
      'atualizadoEm': atualizadoEm,
    };
  }
}
