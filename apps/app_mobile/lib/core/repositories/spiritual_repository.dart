import '../models/spiritual_models.dart';
import '../storage/local_store.dart';

class SpiritualRepository {
  SpiritualRepository(this._store);

  static const prayersKey = 'filha.prayers';
  static const journalsKey = 'filha.journals';
  static const gratitudeKey = 'filha.gratitude';
  static const memorialsKey = 'filha.memorials';

  final LocalStore _store;

  List<PrayerEntry> get prayers => _store
      .readList(prayersKey)
      .map(PrayerEntry.fromJson)
      .toList(growable: false);

  List<JournalEntry> get journals => _store
      .readList(journalsKey)
      .map(JournalEntry.fromJson)
      .toList(growable: false);

  List<GratitudeEntry> get gratitude => _store
      .readList(gratitudeKey)
      .map(GratitudeEntry.fromJson)
      .toList(growable: false);

  List<MemorialEntry> get memorials => _store
      .readList(memorialsKey)
      .map(MemorialEntry.fromJson)
      .toList(growable: false);

  Future<void> addPrayer({
    required String text,
    required String category,
  }) async {
    final items = prayers
        .map((item) => item.toJson())
        .toList();
    items.add(
      PrayerEntry(
        id: _id(),
        text: text,
        category: category,
        createdAt: DateTime.now(),
      ).toJson(),
    );
    await _store.writeList(prayersKey, items);
  }

  Future<void> addJournal(String text) async {
    final items = journals.map((item) => item.toJson()).toList();
    items.add(
      JournalEntry(
        id: _id(),
        text: text,
        createdAt: DateTime.now(),
      ).toJson(),
    );
    await _store.writeList(journalsKey, items);
  }

  Future<void> addGratitude(String text) async {
    final items = gratitude.map((item) => item.toJson()).toList();
    items.add(
      GratitudeEntry(
        id: _id(),
        text: text,
        createdAt: DateTime.now(),
      ).toJson(),
    );
    await _store.writeList(gratitudeKey, items);
  }

  Future<void> addMemorial({
    required String title,
    required String description,
  }) async {
    final items = memorials.map((item) => item.toJson()).toList();
    items.add(
      MemorialEntry(
        id: _id(),
        title: title,
        description: description,
        createdAt: DateTime.now(),
      ).toJson(),
    );
    await _store.writeList(memorialsKey, items);
  }

  static String _id() => DateTime.now().microsecondsSinceEpoch.toString();
}
