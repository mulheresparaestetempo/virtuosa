import 'package:flutter_test/flutter_test.dart';
import 'package:filha/app/app.dart';

void main() {
  testWidgets('FILHA inicia com a identidade visual', (tester) async {
    await tester.pumpWidget(const FilhaApp());

    expect(find.text('FILHA'), findsOneWidget);
  });

  testWidgets('Home apresenta Lugar Secreto', (tester) async {
    await tester.pumpWidget(const FilhaApp());
    await tester.pumpAndSettle(const Duration(seconds: 2));

    expect(find.text('Seu Lugar Secreto'), findsOneWidget);
    expect(find.text('Carta de Abba'), findsOneWidget);
  });
}
