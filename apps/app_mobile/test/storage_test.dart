import 'package:flutter_test/flutter_test.dart';

void main() {
  test('spiritual storage keys remain stable', () {
    const keys = [
      'filha.prayers',
      'filha.journals',
      'filha.gratitude',
      'filha.memorials',
    ];

    expect(keys.toSet().length, keys.length);
  });
}
