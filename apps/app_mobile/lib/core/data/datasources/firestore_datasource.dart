import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';

abstract class FirestoreDataSource {
  final FirebaseFirestore firestore;

  FirestoreDataSource(this.firestore);

  /// Generic method to get a document
  Future<DocumentSnapshot<T>> getDocument<T>(
    String collection,
    String docId,
    T Function(DocumentSnapshot) fromJson,
  ) async {
    try {
      return await firestore.collection(collection).doc(docId).get() as DocumentSnapshot<T>;
    } catch (e) {
      debugPrint('Error getting document: $e');
      rethrow;
    }
  }

  /// Generic method to get multiple documents
  Future<List<T>> getCollection<T>(
    String collection,
    T Function(DocumentSnapshot) fromJson, {
    Query<Map<String, dynamic>>? Function(CollectionReference<Map<String, dynamic>>)?
        queryBuilder,
    int limit = 100,
  }) async {
    try {
      Query<Map<String, dynamic>> query =
          firestore.collection(collection);

      if (queryBuilder != null) {
        query = queryBuilder(
          firestore.collection(collection)
              as CollectionReference<Map<String, dynamic>>,
        ) as Query<Map<String, dynamic>>;
      }

      query = query.limit(limit);
      final snapshot = await query.get();
      return snapshot.docs.map((doc) => fromJson(doc)).toList();
    } catch (e) {
      debugPrint('Error getting collection: $e');
      rethrow;
    }
  }

  /// Generic method to add a document
  Future<DocumentReference> addDocument(
    String collection,
    Map<String, dynamic> data,
  ) async {
    try {
      return await firestore.collection(collection).add(data);
    } catch (e) {
      debugPrint('Error adding document: $e');
      rethrow;
    }
  }

  /// Generic method to update a document
  Future<void> updateDocument(
    String collection,
    String docId,
    Map<String, dynamic> data,
  ) async {
    try {
      await firestore.collection(collection).doc(docId).update(data);
    } catch (e) {
      debugPrint('Error updating document: $e');
      rethrow;
    }
  }

  /// Generic method to delete a document
  Future<void> deleteDocument(String collection, String docId) async {
    try {
      await firestore.collection(collection).doc(docId).delete();
    } catch (e) {
      debugPrint('Error deleting document: $e');
      rethrow;
    }
  }

  /// Generic method to set a document (create or overwrite)
  Future<void> setDocument(
    String collection,
    String docId,
    Map<String, dynamic> data, {
    bool merge = false,
  }) async {
    try {
      await firestore.collection(collection).doc(docId).set(data, SetOptions(merge: merge));
    } catch (e) {
      debugPrint('Error setting document: $e');
      rethrow;
    }
  }

  /// Generic method to batch write documents
  Future<void> batchWrite(
    List<MapEntry<String, Map<String, dynamic>>> operations,
  ) async {
    try {
      final batch = firestore.batch();
      for (final op in operations) {
        batch.set(firestore.collection(op.key).doc(), op.value);
      }
      await batch.commit();
    } catch (e) {
      debugPrint('Error batch writing: $e');
      rethrow;
    }
  }
}
