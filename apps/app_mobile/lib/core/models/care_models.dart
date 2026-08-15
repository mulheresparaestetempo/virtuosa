enum CareRequestType {
  hospitalityVisit,
  leaderConversation,
  inPersonPrayer,
  churchConnection,
  cellConnection,
  discipleship,
  houseWorship,
}

enum RequestStatus { pending, scheduled, completed, cancelled }

class CareRequest {
  const CareRequest({
    required this.id,
    required this.type,
    required this.status,
    required this.createdAt,
    this.preferredDate,
    this.note = '',
  });

  final String id;
  final CareRequestType type;
  final RequestStatus status;
  final DateTime createdAt;
  final DateTime? preferredDate;
  final String note;

  Map<String, dynamic> toJson() => {
        'id': id,
        'type': type.name,
        'status': status.name,
        'createdAt': createdAt.toIso8601String(),
        'preferredDate': preferredDate?.toIso8601String(),
        'note': note,
      };

  factory CareRequest.fromJson(Map<String, dynamic> json) => CareRequest(
        id: json['id'] as String,
        type: CareRequestType.values.byName(json['type'] as String),
        status: RequestStatus.values.byName(json['status'] as String),
        createdAt: DateTime.parse(json['createdAt'] as String),
        preferredDate: json['preferredDate'] == null
            ? null
            : DateTime.parse(json['preferredDate'] as String),
        note: (json['note'] as String?) ?? '',
      );
}

class FastingPlan {
  const FastingPlan({
    required this.id,
    required this.title,
    required this.purpose,
    required this.startAt,
    required this.endAt,
    required this.proposedTimes,
    this.baseVerse = '',
    this.reflection = '',
  });

  final String id;
  final String title;
  final String purpose;
  final DateTime startAt;
  final DateTime endAt;
  final List<String> proposedTimes;
  final String baseVerse;
  final String reflection;

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'purpose': purpose,
        'startAt': startAt.toIso8601String(),
        'endAt': endAt.toIso8601String(),
        'proposedTimes': proposedTimes,
        'baseVerse': baseVerse,
        'reflection': reflection,
      };

  factory FastingPlan.fromJson(Map<String, dynamic> json) => FastingPlan(
        id: json['id'] as String,
        title: json['title'] as String,
        purpose: json['purpose'] as String,
        startAt: DateTime.parse(json['startAt'] as String),
        endAt: DateTime.parse(json['endAt'] as String),
        proposedTimes: List<String>.from(json['proposedTimes'] as List),
        baseVerse: (json['baseVerse'] as String?) ?? '',
        reflection: (json['reflection'] as String?) ?? '',
      );
}

class JourneyProgress {
  const JourneyProgress({
    required this.id,
    required this.title,
    required this.completedSteps,
    required this.totalSteps,
  });

  final String id;
  final String title;
  final int completedSteps;
  final int totalSteps;

  double get progress =>
      totalSteps == 0 ? 0 : completedSteps.clamp(0, totalSteps) / totalSteps;

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'completedSteps': completedSteps,
        'totalSteps': totalSteps,
      };

  factory JourneyProgress.fromJson(Map<String, dynamic> json) =>
      JourneyProgress(
        id: json['id'] as String,
        title: json['title'] as String,
        completedSteps: json['completedSteps'] as int,
        totalSteps: json['totalSteps'] as int,
      );
}
