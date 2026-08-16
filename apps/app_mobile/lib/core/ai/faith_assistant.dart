class FaithAssistant {
  const FaithAssistant();

  Future<String> answer(String question) async {
    final normalized = question.trim().toLowerCase();

    if (normalized.isEmpty) {
      return 'Escreva sua pergunta para começarmos.';
    }

    if (normalized.contains('oração') || normalized.contains('orar')) {
      return 'Você pode começar falando com Abba com sinceridade. O FILHA também pode guardar sua oração no espaço de oração pessoal.';
    }

    if (normalized.contains('jejum')) {
      return 'O jejum pode ser acompanhado no FILHA como uma prática espiritual definida por você. Para questões de saúde ou alimentação, converse com um responsável e um profissional adequado.';
    }

    if (normalized.contains('bíblia') ||
        normalized.contains('versículo') ||
        normalized.contains('palavra')) {
      return 'Posso ajudar a organizar um estudo bíblico, explicar contexto e sugerir perguntas para reflexão. Para citar um texto específico, diga o livro, capítulo e versículo.';
    }

    return 'Posso ajudar com estudo bíblico, perguntas para reflexão, oração e organização da sua caminhada. Tente fazer uma pergunta mais específica.';
  }
}
