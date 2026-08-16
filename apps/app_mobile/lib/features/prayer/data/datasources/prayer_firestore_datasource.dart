import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../../core/data/datasources/firestore_datasource.dart';
import '../models/prayer_model.dart';

abstract class PrayerFirestoreDataSource {
  Future<PrayerModel?> getPrayerById(String prayerId);
  Future<List<PrayerModel>> getUserPrayers(String userId);
  Future<List<PrayerModel>> getUrgentPrayers(String userId);
  Future<void> createPrayer(PrayerModel prayer);
  Future<void> updatePrayer(String prayerId, Map<String, dynamic> data);
  Future<void> deletePrayer(String prayerId);
  Future<void> markPrayerAsAnswered(String prayerId, String response);
}

class PrayerFirestoreDataSourceImpl extends FirestoreDataSource
    implements PrayerFirestoreDataSource {
  static const String collectionName = 'prayers';

  PrayerFirestoreDataSourceImpl(FirebaseFirestore firestore)
      : super(firestore);

  @override
  Future<PrayerModel?> getPrayerById(String prayerId) async {
    try {
      final snapshot =
          await firestore.collection(collectionName).doc(prayerId).get();
      if (snapshot.exists) {
        return PrayerModel.fromFirestore(snapshot);
      }
      return null;
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<List<PrayerModel>> getUserPrayers(String userId) async {
    try {
      final snapshot = await firestore
          .collection(collectionName)
          .where('userId', isEqualTo: userId)
          .orderBy('dataCriacao', descending: true)
          .get();

      return snapshot.docs
          .map((doc) => PrayerModel.fromFirestore(doc))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<List<PrayerModel>> getUrgentPrayers(String userId) async {
    try {
      final snapshot = await firestore
          .collection(collectionName)
          .where('userId', isEqualTo: userId)
          .where('urgente', isEqualTo: true)
          .where('status', isEqualTo: 'emOracao')
          .orderBy('dataCriacao', descending: true)
          .get();

      return snapshot.docs
          .map((doc) => PrayerModel.fromFirestore(doc))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> createPrayer(PrayerModel prayer) async {
    try {
      await firestore.collection(collectionName).doc(prayer.id).set(
        prayer.toJson(),
      );
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> updatePrayer(String prayerId, Map<String, dynamic> data) async {
    try {
      await updateDocument(collectionName, prayerId, {
        ...data,
        'atualizadoEm': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> deletePrayer(String prayerId) async {
    try {
      await deleteDocument(collectionName, prayerId);
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> markPrayerAsAnswered(String prayerId, String response) async {
    try {
      await updatePrayer(prayerId, {
        'status': 'respondida',
        'dataResposta': FieldValue.serverTimestamp(),
        'respostaDescricao': response,
      });
    } catch (e) {
      rethrow;
    }
  }
}
