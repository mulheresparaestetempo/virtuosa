import 'package:freezed_annotation/freezed_annotation.dart';

part 'event_entity.freezed.dart';

enum EventType {
  congresso,
  culto,
  conferencia,
  retiro,
  vigilia,
  jejumColetivo,
  reuniao,
  ministerio,
  outro,
}

@freezed
class EventEntity with _$EventEntity {
  const factory EventEntity({
    required String id,
    required String titulo,
    required String descricao,
    String? local,
    double? latitude,
    double? longitude,
    required DateTime inicio,
    required DateTime fim,
    String? imagem,
    @Default(EventType.outro) EventType tipo,
    @Default(0) int participantes,
    String? organizadorId,
    String? organizadorNome,
    @Default([]) List<String> tags,
    required DateTime criadoEm,
  }) = _EventEntity;
}
