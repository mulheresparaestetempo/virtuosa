import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';

const versiculo = {
  texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
  referencia: 'João 3:16',
  explicacao:
    'Este é um dos versículos mais conhecidos da Bíblia. Ele resume toda a mensagem do Evangelho: o amor incondicional de Deus pela humanidade, demonstrado através do sacrifício de Jesus. Não é um amor condicional ou baseado em obras — é um amor que simplesmente existe porque Deus é amor.',
  aplicacao:
    'Hoje, lembre-se de que você é amada assim — completamente, sem condições. Não precisa fazer nada para ganhar este amor. Descanse nesta verdade e deixe que ela transforme como você se vê a si mesma.',
};

export default function VersiculoDiaScreen() {
  const [favoritado, setFavoritado] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Versículo do Dia</Text>

        {/* Ilustração em aquarela (placeholder) */}
        <View style={styles.ilustracao}>
          <Text style={styles.ilustracaoEmoji}>✨</Text>
          <Text style={styles.ilustracaoTexto}>Ilustração em aquarela</Text>
        </View>

        {/* Versículo Grande */}
        <View style={styles.cardVersiculo}>
          <Text style={styles.versiculoTexto}>{versiculo.texto}</Text>
          <Text style={styles.versiculoReferencia}>{versiculo.referencia}</Text>
        </View>

        {/* Explicação */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>📖 Explicação</Text>
          <Text style={styles.secaoTexto}>{versiculo.explicacao}</Text>
        </View>

        {/* Aplicação Prática */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>💭 Aplicação Prática</Text>
          <Text style={styles.secaoTexto}>{versiculo.aplicacao}</Text>
        </View>

        {/* Ações */}
        <View style={styles.acoes}>
          <TouchableOpacity
            style={[styles.botaoAcao, favoritado && styles.botaoAcaoAtivo]}
            onPress={() => setFavoritado(!favoritado)}
          >
            <Text style={styles.botaoAcaoEmoji}>{favoritado ? '❤️' : '🤍'}</Text>
            <Text style={styles.botaoAcaoTexto}>{favoritado ? 'Favoritado' : 'Favoritar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoAcao}>
            <Text style={styles.botaoAcaoEmoji}>🎧</Text>
            <Text style={styles.botaoAcaoTexto}>Ouvir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoAcao}>
            <Text style={styles.botaoAcaoEmoji}>↗️</Text>
            <Text style={styles.botaoAcaoTexto}>Compartilhar</Text>
          </TouchableOpacity>
        </View>

        {/* Reflexão */}
        <View style={styles.cardReflexao}>
          <Text style={styles.reflexaoTitulo}>✍️ Sua Reflexão</Text>
          <Text style={styles.reflexaoPlaceholder}>Toque para escrever como este versículo fala ao seu coração...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: {
    fontSize: 28,
    fontFamily: fontes.titulo,
    color: cores.bordo,
    marginBottom: 24,
  },
  ilustracao: {
    height: 200,
    backgroundColor: '#F5E5E4',
    borderRadius: raios.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  ilustracaoEmoji: { fontSize: 60, marginBottom: 8 },
  ilustracaoTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  cardVersiculo: {
    backgroundColor: cores.dourado,
    borderRadius: raios.card,
    padding: 24,
    marginBottom: 24,
    ...sombra,
  },
  versiculoTexto: {
    fontSize: 20,
    fontFamily: fontes.versiculo,
    color: '#fff',
    lineHeight: 32,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  versiculoReferencia: {
    fontSize: 14,
    fontFamily: fontes.rotulo,
    color: '#fff',
    textAlign: 'right',
  },
  secao: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  secaoTitulo: {
    fontSize: 14,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  secaoTexto: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    lineHeight: 22,
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  botaoAcao: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: raios.botao,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    gap: 6,
  },
  botaoAcaoAtivo: {
    backgroundColor: cores.rosa,
    borderColor: cores.rosa,
  },
  botaoAcaoEmoji: { fontSize: 20 },
  botaoAcaoTexto: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
  },
  cardReflexao: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 20,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    minHeight: 120,
    justifyContent: 'center',
  },
  reflexaoTitulo: {
    fontSize: 14,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginBottom: 12,
  },
  reflexaoPlaceholder: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    fontStyle: 'italic',
  },
});
