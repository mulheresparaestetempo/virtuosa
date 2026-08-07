import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../../core/data/datasources/firestore_datasource.dart';
import '../models/user_model.dart';

abstract class UserFirestoreDataSource {
  Future<UserModel?> getUserById(String uid);
  Future<void> createUser(String uid, UserModel user);
  Future<void> updateUser(String uid, Map<String, dynamic> data);
  Future<UserModel?> getUserByEmail(String email);
  Future<List<UserModel>> getUsersByChurch(String churchId);
}

class UserFirestoreDataSourceImpl extends FirestoreDataSource
    implements UserFirestoreDataSource {
  static const String collectionName = 'users';

  UserFirestoreDataSourceImpl(FirebaseFirestore firestore)
      : super(firestore);

  @override
  Future<UserModel?> getUserById(String uid) async {
    try {
      final snapshot = await firestore.collection(collectionName).doc(uid).get();
      if (snapshot.exists) {
        return UserModel.fromFirestore(snapshot);
      }
      return null;
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> createUser(String uid, UserModel user) async {
    try {
      await firestore.collection(collectionName).doc(uid).set({
        ...user.toJson(),
        'uid': uid,
      });
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<void> updateUser(String uid, Map<String, dynamic> data) async {
    try {
      await updateDocument(collectionName, uid, {
        ...data,
        'atualizadoEm': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<UserModel?> getUserByEmail(String email) async {
    try {
      final snapshot = await firestore
          .collection(collectionName)
          .where('email', isEqualTo: email)
          .limit(1)
          .get();

      if (snapshot.docs.isNotEmpty) {
        return UserModel.fromFirestore(snapshot.docs.first);
      }
      return null;
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<List<UserModel>> getUsersByChurch(String churchId) async {
    try {
      final snapshot = await firestore
          .collection(collectionName)
          .where('igrejaId', isEqualTo: churchId)
          .get();

      return snapshot.docs
          .map((doc) => UserModel.fromFirestore(doc))
          .toList();
    } catch (e) {
      rethrow;
    }
  }
}
