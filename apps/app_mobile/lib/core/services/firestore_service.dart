import 'package:cloud_firestore/cloud_firestore.dart';

final _db = FirebaseFirestore.instance;

class Devocional {
  final String id;
  final String title;
  final String verse;
  final String verseReference;
  final String reflection;
  final String prayer;
  final int day;
  final DateTime publishedAt;

  const Devocional({
    required this.id,
    required this.title,
    required this.verse,
    required this.verseReference,
    required this.reflection,
    required this.prayer,
    required this.day,
    required this.publishedAt,
  });

  factory Devocional.fromDoc(DocumentSnapshot doc) {
    final d = doc.data() as Map<String, dynamic>;
    return Devocional(
      id: doc.id,
      title: d['title'] as String? ?? '',
      verse: d['verse'] as String? ?? '',
      verseReference: d['verseReference'] as String? ?? '',
      reflection: d['reflection'] as String? ?? '',
      prayer: d['prayer'] as String? ?? '',
      day: (d['day'] as num?)?.toInt() ?? 0,
      publishedAt: (d['publishedAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }
}

class Aviso {
  final String id;
  final String title;
  final String message;
  final String priority;
  final DateTime sentAt;

  const Aviso({
    required this.id,
    required this.title,
    required this.message,
    required this.priority,
    required this.sentAt,
  });

  factory Aviso.fromDoc(DocumentSnapshot doc) {
    final d = doc.data() as Map<String, dynamic>;
    return Aviso(
      id: doc.id,
      title: d['title'] as String? ?? '',
      message: d['message'] as String? ?? '',
      priority: d['priority'] as String? ?? 'média',
      sentAt: (d['sentAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }
}

class Recurso {
  final String id;
  final String title;
  final String description;
  final String url;
  final String type;
  final DateTime createdAt;

  const Recurso({
    required this.id,
    required this.title,
    required this.description,
    required this.url,
    required this.type,
    required this.createdAt,
  });

  factory Recurso.fromDoc(DocumentSnapshot doc) {
    final d = doc.data() as Map<String, dynamic>;
    return Recurso(
      id: doc.id,
      title: d['title'] as String? ?? '',
      description: d['description'] as String? ?? '',
      url: d['url'] as String? ?? '',
      type: d['type'] as String? ?? '',
      createdAt: (d['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }
}

class PdfDoc {
  final String id;
  final String name;
  final String url;
  final DateTime uploadedAt;

  const PdfDoc({
    required this.id,
    required this.name,
    required this.url,
    required this.uploadedAt,
  });

  factory PdfDoc.fromDoc(DocumentSnapshot doc) {
    final d = doc.data() as Map<String, dynamic>;
    return PdfDoc(
      id: doc.id,
      name: d['name'] as String? ?? '',
      url: d['url'] as String? ?? '',
      uploadedAt: (d['uploadedAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }
}

class FirestoreService {
  static Future<Devocional?> getLatestDevocional() async {
    final snap = await _db
        .collection('devotionals')
        .orderBy('publishedAt', descending: true)
        .limit(1)
        .get();
    if (snap.docs.isEmpty) return null;
    return Devocional.fromDoc(snap.docs.first);
  }

  static Future<List<Aviso>> getAvisos({int limit = 5}) async {
    final snap = await _db
        .collection('avisos')
        .orderBy('sentAt', descending: true)
        .limit(limit)
        .get();
    return snap.docs.map(Aviso.fromDoc).toList();
  }

  static Future<List<Recurso>> getRecursos(String type) async {
    final snap = await _db
        .collection('resources')
        .where('type', isEqualTo: type)
        .orderBy('createdAt', descending: true)
        .get();
    return snap.docs.map(Recurso.fromDoc).toList();
  }

  static Future<List<PdfDoc>> getPdfs() async {
    final snap = await _db
        .collection('pdfs')
        .orderBy('uploadedAt', descending: true)
        .get();
    return snap.docs.map(PdfDoc.fromDoc).toList();
  }
}
