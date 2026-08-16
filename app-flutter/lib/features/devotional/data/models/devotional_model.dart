import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/devotional_entity.dart';

part 'devotional_model.freezed.dart';
part 'devotional_model.g.dart';

@freezed
class DevotionalModel with _$DevotionalModel {
  const factory DevotionalModel({
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
    @Default('tema') String categoria,
    required DateTime publicadoEm,
  }) = _DevotionalModel;

  factory DevotionalModel.fromJson(Map<String, dynamic> json) =>
      _$DevotionalModelFromJson(json);

  factory DevotionalModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return DevotionalModel.fromJson({
      ...data,
      'id': doc.id,
    });
  }
}

extension DevotionalModelToEntity on DevotionalModel {
  DevotionalEntity toEntity() {
    return DevotionalEntity(
      id: id,
      titulo: titulo,
      subtitulo: subtitulo,
      versiculo: versiculo,
      referencia: referencia,
      texto: texto,
      audio: audio,
      video: video,
      imagem: imagem,
      autor: autor,
      tempoLeitura: tempoLeitura,
      categoria: DevotionalCategory.values.firstWhere(
        (e) => e.name == categoria,
        orElse: () => DevotionalCategory.tema,
      ),
      publicadoEm: publicadoEm,
    );
  }
}

extension DevotionalEntityToModel on DevotionalEntity {
  Map<String, dynamic> toFirestore() {
    return {
      'id': id,
      'titulo': titulo,
      'subtitulo': subtitulo,
      'versiculo': versiculo,
      'referencia': referencia,
      'texto': texto,
      'audio': audio,
      'video': video,
      'imagem': imagem,
      'autor': autor,
      'tempoLeitura': tempoLeitura,
      'categoria': categoria.name,
      'publicadoEm': publicadoEm,
    };
  }
}
