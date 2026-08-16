import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import '../models/ai_model.dart';

abstract class AIDataSource {
  Future<AIResponseModel> askBibleAssistant(String pergunta);
  Future<List<AIResponseModel>> getHistory(String userId);
  Future<void> clearHistory(String userId);
}

class AIDataSourceImpl implements AIDataSource {
  final FirebaseFirestore firestore;
  final Dio dio;
  final String apiKey;

  AIDataSourceImpl({
    required this.firestore,
    required this.dio,
    required this.apiKey,
  });

  static const String collection = 'ai_history';
  static const String claudeApiUrl = 'https://api.anthropic.com/v1/messages';

  @override
  Future<AIResponseModel> askBibleAssistant(String pergunta) async {
    try {
      final prompt = _buildBiblePrompt(pergunta);
      final response = await _callClaudeAPI(prompt);

      final versiculos = _extractVersiculos(response);

      return AIResponseModel(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        userId: '', // Set by the caller
        pergunta: pergunta,
        resposta: response,
        versiculos: versiculos,
        modelo: 'claude-3-sonnet',
        tokens: _estimateTokens(response),
        criadoEm: DateTime.now(),
      );
    } catch (e) {
      debugPrint('Error asking Bible assistant: $e');
      rethrow;
    }
  }

  @override
  Future<List<AIResponseModel>> getHistory(String userId) async {
    try {
      final snapshot = await firestore
          .collection(collection)
          .where('userId', isEqualTo: userId)
          .orderBy('criadoEm', descending: true)
          .limit(50)
          .get();

      return snapshot.docs
          .map((doc) => AIResponseModel.fromFirestore(doc))
          .toList();
    } catch (e) {
      debugPrint('Error getting AI history: $e');
      rethrow;
    }
  }

  @override
  Future<void> clearHistory(String userId) async {
    try {
      final snapshot = await firestore
          .collection(collection)
          .where('userId', isEqualTo: userId)
          .get();

      final batch = firestore.batch();
      for (final doc in snapshot.docs) {
        batch.delete(doc.reference);
      }
      await batch.commit();
    } catch (e) {
      debugPrint('Error clearing AI history: $e');
      rethrow;
    }
  }

  /// Call Claude API
  Future<String> _callClaudeAPI(String prompt) async {
    try {
      final response = await dio.post(
        claudeApiUrl,
        options: Options(
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
        ),
        data: {
          'model': 'claude-3-sonnet-20240229',
          'max_tokens': 1024,
          'messages': [
            {
              'role': 'user',
              'content': prompt,
            }
          ],
        },
      );

      if (response.statusCode == 200) {
        final content = response.data['content'] as List;
        if (content.isNotEmpty) {
          return content[0]['text'] ?? '';
        }
      }

      throw Exception('Failed to get response from Claude API');
    } catch (e) {
      debugPrint('Error calling Claude API: $e');
      rethrow;
    }
  }

  /// Build prompt for Bible assistant
  String _buildBiblePrompt(String pergunta) {
    return '''
Você é a FILHA IA, uma assistente dedicada a ajudar mulheres no estudo da Palavra de Deus.

Diretrizes importantes:
1. Sempre responda baseado na Bíblia, em materiais do ministério e cursos cadastrados
2. Nunca substitua a liderança espiritual
3. Nunca emita opiniões pessoais
4. Sempre inclua referências bíblicas relevantes
5. Incentive a oração, leitura bíblica e comunhão com os líderes quando apropriado

Pergunta: $pergunta

Por favor, responda de forma clara, bíblica e compassiva.
''';
  }

  /// Extract Bible verses from response
  List<String> _extractVersiculos(String text) {
    final regExp = RegExp(r'([\w\s]+\s\d+[:;]\d+)');
    final matches = regExp.allMatches(text);
    return matches.map((m) => m.group(0) ?? '').toList();
  }

  /// Estimate token count (rough estimation)
  int _estimateTokens(String text) {
    // Rough estimation: ~4 characters per token
    return (text.length / 4).ceil();
  }
}
