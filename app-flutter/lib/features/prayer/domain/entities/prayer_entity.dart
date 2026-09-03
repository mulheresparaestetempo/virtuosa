import 'package:freezed_annotation/freezed_annotation.dart';

part 'prayer_entity.freezed.dart';

enum PrayerCategory {
  familia,
  casamento,
  filhos,
  saude,
  financeiro,
  igreja,
  missoes,
  pessoal,
  outro,
}

enum PrayerStatus {
  emOracao,
  respondida,
  arquivada,
}

@freezed
class PrayerEntity with _$PrayerEntity {
  const factory PrayerEntity({
    required String id,
    required String userId,
    required String titulo,
    required String descricao,
    @Default(PrayerCategory.pessoal) PrayerCategory categoria,
    @Default([]) List<String> tags,
    @Default(false) bool urgente,
    @Default(false) bool privado,
    @Default(false) bool compartilharComLider,
    @Default(PrayerStatus.emOracao) PrayerStatus status,
    DateTime? dataResposta,
    String? respostaDescricao,
    @Default(0) int curtidas,
    required DateTime dataCriacao,
    DateTime? atualizadoEm,
  }) = _PrayerEntity;
}
