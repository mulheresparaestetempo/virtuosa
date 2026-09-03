import 'package:freezed_annotation/freezed_annotation.dart';

part 'fasting_entity.freezed.dart';

enum FastingType {
  parcial,
  daniel,
  personalizado,
}

enum FastingStatus {
  planejado,
  ativo,
  concluido,
  cancelado,
}

@freezed
class FastingEntity with _$FastingEntity {
  const factory FastingEntity({
    required String id,
    required String userId,
    required String titulo,
    required String objetivo,
    String? versiculo,
    @Default(FastingType.personalizado) FastingType tipo,
    required DateTime inicio,
    required DateTime fim,
    DateTime? horarioInicio,
    DateTime? horarioFim,
    required int diasPlanejados,
    @Default(0) int diasConcluidos,
    @Default([]) List<String> reflexoes,
    @Default(FastingStatus.planejado) FastingStatus status,
    @Default(false) bool compartilhadoComLider,
    required DateTime criadoEm,
  }) = _FastingEntity;
}
