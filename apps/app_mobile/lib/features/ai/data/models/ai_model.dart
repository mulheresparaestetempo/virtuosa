import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/ai_entity.dart';

part 'ai_model.freezed.dart';
part 'ai_model.g.dart';

@freezed
class AIResponseModel with _$AIResponseModel {
  const factory AIResponseModel({
    required String id,
    required String userId,
    required String pergunta,
    required String resposta,
    @Default([]) List<String> versiculos,
    @Default('claude') String modelo,
    @Default(0) int tokens,
    required DateTime criadoEm,
  }) = _AIResponseModel;

  factory AIResponseModel.fromJson(Map<String, dynamic> json) =>
      _$AIResponseModelFromJson(json);

  factory AIResponseModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return AIResponseModel.fromJson({
      ...data,
      'id': doc.id,
      'criadoEm': (data['criadoEm'] as Timestamp?)?.toDate() ?? DateTime.now(),
    });
  }
}

extension AIResponseModelToEntity on AIResponseModel {
  AIResponse toEntity() {
    return AIResponse(
      id: id,
      userId: userId,
      pergunta: pergunta,
      resposta: resposta,
      versiculos: versiculos,
      modelo: modelo,
      tokens: tokens,
      criadoEm: criadoEm,
    );
  }
}

extension AIResponseEntityToModel on AIResponse {
  Map<String, dynamic> toFirestore() {
    return {
      'id': id,
      'userId': userId,
      'pergunta': pergunta,
      'resposta': resposta,
      'versiculos': versiculos,
      'modelo': modelo,
      'tokens': tokens,
      'criadoEm': criadoEm,
    };
  }
}

@freezed
class BibleVerseModel with _$BibleVerseModel {
  const factory BibleVerseModel({
    required String referencia,
    required String texto,
    String? explanacao,
  }) = _BibleVerseModel;

  factory BibleVerseModel.fromJson(Map<String, dynamic> json) =>
      _$BibleVerseModelFromJson(json);
}

extension BibleVerseModelToEntity on BibleVerseModel {
  BibleVerse toEntity() {
    return BibleVerse(
      referencia: referencia,
      texto: texto,
      explanacao: explanacao,
    );
  }
}

@freezed
class ReadingPlanModel with _$ReadingPlanModel {
  const factory ReadingPlanModel({
    required String titulo,
    required String descricao,
    required int dias,
    @Default([]) List<String> versiculos,
    @Default([]) List<String> temasDiarios,
  }) = _ReadingPlanModel;

  factory ReadingPlanModel.fromJson(Map<String, dynamic> json) =>
      _$ReadingPlanModelFromJson(json);
}

extension ReadingPlanModelToEntity on ReadingPlanModel {
  ReadingPlan toEntity() {
    return ReadingPlan(
      titulo: titulo,
      descricao: descricao,
      dias: dias,
      versiculos: versiculos,
      temasDiarios: temasDiarios,
    );
  }
}
