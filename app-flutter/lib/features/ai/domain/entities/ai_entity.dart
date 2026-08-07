import 'package:freezed_annotation/freezed_annotation.dart';

part 'ai_entity.freezed.dart';

@freezed
class AIQuery with _$AIQuery {
  const factory AIQuery({
    required String pergunta,
    @Default('claude') String modelo,
    @Default([]) List<String> contextVersiculos,
  }) = _AIQuery;
}

@freezed
class AIResponse with _$AIResponse {
  const factory AIResponse({
    required String id,
    required String userId,
    required String pergunta,
    required String resposta,
    @Default([]) List<String> versiculos,
    @Default('claude') String modelo,
    @Default(0) int tokens,
    required DateTime criadoEm,
  }) = _AIResponse;
}

@freezed
class BibleVerse with _$BibleVerse {
  const factory BibleVerse({
    required String referencia,
    required String texto,
    String? explanacao,
  }) = _BibleVerse;
}

@freezed
class ReadingPlan with _$ReadingPlan {
  const factory ReadingPlan({
    required String titulo,
    required String descricao,
    required int dias,
    @Default([]) List<String> versiculos,
    @Default([]) List<String> temasDiarios,
  }) = _ReadingPlan;
}
