import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class LocalStore {
  LocalStore._(this._preferences);

  final SharedPreferences _preferences;

  static Future<LocalStore> create() async {
    return LocalStore._(await SharedPreferences.getInstance());
  }

  List<Map<String, dynamic>> readList(String key) {
    final raw = _preferences.getString(key);
    if (raw == null || raw.isEmpty) return const [];

    try {
      final decoded = jsonDecode(raw);
      if (decoded is! List) return const [];
      return decoded
          .whereType<Map>()
          .map((item) => Map<String, dynamic>.from(item))
          .toList();
    } on FormatException {
      return const [];
    }
  }

  Future<bool> writeList(String key, List<Map<String, dynamic>> value) {
    return _preferences.setString(key, jsonEncode(value));
  }

  Future<bool> remove(String key) => _preferences.remove(key);
}
