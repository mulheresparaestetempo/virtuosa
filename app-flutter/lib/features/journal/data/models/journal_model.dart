import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/journal_entity.dart';

part 'journal_model.freezed.dart';
part 'journal_model.g.dart';

@freezed
class JournalModel with _$JournalModel {
  const factory JournalModel({
    required String id,
    required String userId,
    required String titulo,
    required String texto,
    String? audio,
    String? imagem,
    @Default('neutro') String humor,
    @Default([]) List<String> versiculos,
    String? gratidao,
    required DateTime data,
    DateTime? atualizadoEm,
  }) = _JournalModel;

  factory JournalModel.fromJson(Map<String, dynamic> json) =>
      _$JournalModelFromJson(json);

  factory JournalModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return JournalModel.fromJson({
      ...data,
      'id': doc.id,
    });
  }
}

extension JournalModelToEntity on JournalModel {
  JournalEntity toEntity() {
    return JournalEntity(
      id: id,
      userId: userId,
      titulo: titulo,
      texto: texto,
      audio: audio,
      imagem: imagem,
      humor: JournalMood.values.firstWhere(
        (e) => e.name == humor,
        orElse: () => JournalMood.neutro,
      ),
      versiculos: versiculos,
      gratidao: gratidao,
      data: data,
      atualizadoEm: atualizadoEm,
    );
  }
}

extension JournalEntityToModel on JournalEntity {
  Map<String, dynamic> toFirestore() {
    return {
      'id': id,
      'userId': userId,
      'titulo': titulo,
      'texto': texto,
      'audio': audio,
      'imagem': imagem,
      'humor': humor.name,
      'versiculos': versiculos,
      'gratidao': gratidao,
      'data': data,
      'atualizadoEm': atualizadoEm,
    };
  }
}
