import 'package:freezed_annotation/freezed_annotation.dart';

part 'devotional_entity.freezed.dart';

enum DevotionalCategory {
  manha,
  tarde,
  noite,
  tema,
  versiculo,
  reflexao,
}

@freezed
class DevotionalEntity with _$DevotionalEntity {
  const factory DevotionalEntity({
    required String id,
    required String titulo,
    String? subtitulo,
    required String versiculo,
    required String referencia,
    required String texto,
    String? audio,
    String? video,
    String? imagem,
    required String autor,
    @Default(5) int tempoLeitura,
    @Default(DevotionalCategory.tema) DevotionalCategory categoria,
    required DateTime publicadoEm,
  }) = _DevotionalEntity;
}
