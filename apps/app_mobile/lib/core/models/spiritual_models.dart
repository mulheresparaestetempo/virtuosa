class PrayerEntry {
  const PrayerEntry({
    required this.id,
    required this.text,
    required this.category,
    required this.createdAt,
  });

  final String id;
  final String text;
  final String category;
  final DateTime createdAt;

  Map<String, dynamic> toJson() => {
        'id': id,
        'text': text,
        'category': category,
        'createdAt': createdAt.toIso8601String(),
      };

  factory PrayerEntry.fromJson(Map<String, dynamic> json) => PrayerEntry(
        id: json['id'] as String,
        text: json['text'] as String,
        category: json['category'] as String,
        createdAt: DateTime.parse(json['createdAt'] as String),
      );
}

class JournalEntry {
  const JournalEntry({
    required this.id,
    required this.text,
    required this.createdAt,
  });

  final String id;
  final String text;
  final DateTime createdAt;

  Map<String, dynamic> toJson() => {
        'id': id,
        'text': text,
        'createdAt': createdAt.toIso8601String(),
      };

  factory JournalEntry.fromJson(Map<String, dynamic> json) => JournalEntry(
        id: json['id'] as String,
        text: json['text'] as String,
        createdAt: DateTime.parse(json['createdAt'] as String),
      );
}

class GratitudeEntry {
  const GratitudeEntry({
    required this.id,
    required this.text,
    required this.createdAt,
  });

  final String id;
  final String text;
  final DateTime createdAt;

  Map<String, dynamic> toJson() => {
        'id': id,
        'text': text,
        'createdAt': createdAt.toIso8601String(),
      };

  factory GratitudeEntry.fromJson(Map<String, dynamic> json) => GratitudeEntry(
        id: json['id'] as String,
        text: json['text'] as String,
        createdAt: DateTime.parse(json['createdAt'] as String),
      );
}

class MemorialEntry {
  const MemorialEntry({
    required this.id,
    required this.title,
    required this.description,
    required this.createdAt,
  });

  final String id;
  final String title;
  final String description;
  final DateTime createdAt;

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
        'createdAt': createdAt.toIso8601String(),
      };

  factory MemorialEntry.fromJson(Map<String, dynamic> json) => MemorialEntry(
        id: json['id'] as String,
        title: json['title'] as String,
        description: json['description'] as String,
        createdAt: DateTime.parse(json['createdAt'] as String),
      );
}
