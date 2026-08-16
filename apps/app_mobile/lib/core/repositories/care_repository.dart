import '../models/care_models.dart';
import '../storage/local_store.dart';

class CareRepository {
  CareRepository(this._store);

  static const requestsKey = 'filha.care_requests';
  static const fastingKey = 'filha.fasting_plans';
  static const journeysKey = 'filha.journey_progress';

  final LocalStore _store;

  List<CareRequest> get requests => _store
      .readList(requestsKey)
      .map(CareRequest.fromJson)
      .toList(growable: false);

  List<FastingPlan> get fastingPlans => _store
      .readList(fastingKey)
      .map(FastingPlan.fromJson)
      .toList(growable: false);

  List<JourneyProgress> get journeys => _store
      .readList(journeysKey)
      .map(JourneyProgress.fromJson)
      .toList(growable: false);

  Future<void> addRequest({
    required CareRequestType type,
    DateTime? preferredDate,
    String note = '',
  }) async {
    final items = requests.map((item) => item.toJson()).toList();
    items.add(
      CareRequest(
        id: _id(),
        type: type,
        status: RequestStatus.pending,
        createdAt: DateTime.now(),
        preferredDate: preferredDate,
        note: note,
      ).toJson(),
    );
    await _store.writeList(requestsKey, items);
  }

  Future<void> addFastingPlan(FastingPlan plan) async {
    final items = fastingPlans.map((item) => item.toJson()).toList();
    items.add(plan.toJson());
    await _store.writeList(fastingKey, items);
  }

  Future<void> saveJourney(JourneyProgress progress) async {
    final items = journeys.map((item) => item.toJson()).toList();
    final index = items.indexWhere((item) => item['id'] == progress.id);
    if (index == -1) {
      items.add(progress.toJson());
    } else {
      items[index] = progress.toJson();
    }
    await _store.writeList(journeysKey, items);
  }

  static String _id() => DateTime.now().microsecondsSinceEpoch.toString();
}
