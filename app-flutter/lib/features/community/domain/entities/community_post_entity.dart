import 'package:freezed_annotation/freezed_annotation.dart';

part 'community_post_entity.freezed.dart';

enum CommunityPostType {
  testemunho,
  pedido,
  devocional,
  evento,
  noticia,
  duvida,
}

@freezed
class CommunityPostEntity with _$CommunityPostEntity {
  const factory CommunityPostEntity({
    required String id,
    required String autorId,
    required String autorNome,
    String? autorFoto,
    @Default(CommunityPostType.testemunho) CommunityPostType tipo,
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
  }) = _CommunityPostEntity;
}
