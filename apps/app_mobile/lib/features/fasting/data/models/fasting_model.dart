import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/entities/fasting_entity.dart';

part 'fasting_model.freezed.dart';
part 'fasting_model.g.dart';

@freezed
class FastingModel with _$FastingModel {
  const factory FastingModel({
    required String id,
    required String userId,
    required String titulo,
    required String objetivo,
    String? versiculo,
    @Default('personalizado') String tipo,
    required DateTime inicio,
    required DateTime fim,
    DateTime? horarioInicio,
    DateTime? horarioFim,
    required int diasPlanejados,
    @Default(0) int diasConcluidos,
    @Default([]) List<String> reflexoes,
    @Default('planejado') String status,
    @Default(false) bool compartilhadoComLider,
    required DateTime criadoEm,
  }) = _FastingModel;

  factory FastingModel.fromJson(Map<String, dynamic> json) =>
      _$FastingModelFromJson(json);

  factory FastingModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return FastingModel.fromJson({
      ...data,
      'id': doc.id,
    });
  }
}

extension FastingModelToEntity on FastingModel {
  FastingEntity toEntity() {
    return FastingEntity(
      id: id,
      userId: userId,
      titulo: titulo,
      objetivo: objetivo,
      versiculo: versiculo,
      tipo: FastingType.values.firstWhere(
        (e) => e.name == tipo,
        orElse: () => FastingType.personalizado,
      ),
      inicio: inicio,
      fim: fim,
      horarioInicio: horarioInicio,
      horarioFim: horarioFim,
      diasPlanejados: diasPlanejados,
      diasConcluidos: diasConcluidos,
      reflexoes: reflexoes,
      status: FastingStatus.values.firstWhere(
        (e) => e.name == status,
        orElse: () => FastingStatus.planejado,
      ),
      compartilhadoComLider: compartilhadoComLider,
      criadoEm: criadoEm,
    );
  }
}

extension FastingEntityToModel on FastingEntity {
  Map<String, dynamic> toFirestore() {
    return {
      'id': id,
      'userId': userId,
      'titulo': titulo,
      'objetivo': objetivo,
      'versiculo': versiculo,
      'tipo': tipo.name,
      'inicio': inicio,
      'fim': fim,
      'horarioInicio': horarioInicio,
      'horarioFim': horarioFim,
      'diasPlanejados': diasPlanejados,
      'diasConcluidos': diasConcluidos,
      'reflexoes': reflexoes,
      'status': status.name,
      'compartilhadoComLider': compartilhadoComLider,
      'criadoEm': criadoEm,
    };
  }
}
