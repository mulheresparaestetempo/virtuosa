import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/event_entity.dart';

part 'event_model.freezed.dart';
part 'event_model.g.dart';

@freezed
class EventModel with _$EventModel {
  const factory EventModel({
    required String id,
    required String titulo,
    required String descricao,
    String? local,
    double? latitude,
    double? longitude,
    required DateTime inicio,
    required DateTime fim,
    String? imagem,
    @Default('outro') String tipo,
    @Default(0) int participantes,
    String? organizadorId,
    String? organizadorNome,
    @Default([]) List<String> tags,
    required DateTime criadoEm,
  }) = _EventModel;

  factory EventModel.fromJson(Map<String, dynamic> json) =>
      _$EventModelFromJson(json);

  factory EventModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return EventModel.fromJson({
      ...data,
      'id': doc.id,
    });
  }
}

extension EventModelToEntity on EventModel {
  EventEntity toEntity() {
    return EventEntity(
      id: id,
      titulo: titulo,
      descricao: descricao,
      local: local,
      latitude: latitude,
      longitude: longitude,
      inicio: inicio,
      fim: fim,
      imagem: imagem,
      tipo: EventType.values.firstWhere(
        (e) => e.name == tipo,
        orElse: () => EventType.outro,
      ),
      participantes: participantes,
      organizadorId: organizadorId,
      organizadorNome: organizadorNome,
      tags: tags,
      criadoEm: criadoEm,
    );
  }
}

extension EventEntityToModel on EventEntity {
  Map<String, dynamic> toFirestore() {
    return {
      'id': id,
      'titulo': titulo,
      'descricao': descricao,
      'local': local,
      'latitude': latitude,
      'longitude': longitude,
      'inicio': inicio,
      'fim': fim,
      'imagem': imagem,
      'tipo': tipo.name,
      'participantes': participantes,
      'organizadorId': organizadorId,
      'organizadorNome': organizadorNome,
      'tags': tags,
      'criadoEm': criadoEm,
    };
  }
}
