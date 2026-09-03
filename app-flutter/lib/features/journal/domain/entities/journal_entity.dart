import 'package:freezed_annotation/freezed_annotation.dart';

part 'journal_entity.freezed.dart';

enum JournalMood {
  triste,
  ansioso,
  neutro,
  feliz,
  grato,
  inspirado,
}

@freezed
class JournalEntity with _$JournalEntity {
  const factory JournalEntity({
    required String id,
    required String userId,
    required String titulo,
    required String texto,
    String? audio,
    String? imagem,
    @Default(JournalMood.neutro) JournalMood humor,
    @Default([]) List<String> versiculos,
    String? gratidao,
    required DateTime data,
    DateTime? atualizadoEm,
  }) = _JournalEntity;
}
