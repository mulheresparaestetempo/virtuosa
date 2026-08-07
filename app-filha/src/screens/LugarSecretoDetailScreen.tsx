import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';

export default function LugarSecretoDetailScreen() {
  const [devocionalFinalizado, setDevocionalFinalizado] = useState(false);
  const [mostrarFlores, setMostrarFlores] = useState(false);
  const [reflexao, setReflexao] = useState('');

  function finalizarDevocional() {
    setDevocionalFinalizado(true);
    setMostrarFlores(true);
    setTimeout(() => setMostrarFlores(false), 3000);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Grande Ilustração */}
        <View style={styles.ilustracaoContainer}>
          <View style={styles.ilustracao}>
            <Text style={styles.ilustracaoTexto}>Ilustração em aquarela:</Text>
            <Text style={styles.ilustracaoEmoji}>👩‍🦰</Text>
            <Text style={styles.ilustracaoDescricao}>Jesus sentado ao lado de uma mulher lendo a Bíblia</Text>
          </View>
        </View>

        <Text style={styles.titulo}>Seu Lugar Secreto</Text>
        <Text style={styles.subtitulo}>Um espaço só para você e Deus</Text>

        {/* Cards de Ações */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>📖</Text>
            <Text style={styles.actionLabel}>Devocional</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🙏</Text>
            <Text style={styles.actionLabel}>Oração</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🎧</Text>
            <Text style={styles.actionLabel}>Áudio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>💭</Text>
            <Text style={styles.actionLabel}>Reflexão</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>✝️</Text>
            <Text style={styles.actionLabel}>Versículo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>✍️</Text>
            <Text style={styles.actionLabel}>Escrever</Text>
          </TouchableOpacity>
        </View>

        {/* Espaço para Escrever */}
        <View style={styles.cardEscrever}>
          <Text style={styles.cardLabel}>Espaço para escrever</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Compartilhe seus pensamentos, orações ou o que Deus disse ao seu coração..."
            placeholderTextColor={cores.cinzaClaro}
            value={reflexao}
            onChangeText={setReflexao}
            multiline
          />
        </View>

        {/* Versículo do Lugar Secreto */}
        <View style={styles.cardVersiculo}>
          <Text style={styles.versiculoTexto}>
            "Mas tu, quando orares, entra em teu quarto, e, fechada a porta, ora a teu Pai que está em secreto;
            e teu Pai, que vê em secreto, te recompensará."
          </Text>
          <Text style={styles.versiculoReferencia}>Mateus 6:6</Text>
        </View>

        {/* Botão Finalizar */}
        {!devocionalFinalizado && (
          <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarDevocional}>
            <Text style={styles.botaoFinalizarTexto}>Finalizar Devocional</Text>
          </TouchableOpacity>
        )}

        {/* Mensagem ao Finalizar */}
        {devocionalFinalizado && (
          <View style={styles.mensagemSucesso}>
            <Text style={styles.mensagemSucessoTexto}>✓ Devocional finalizado!</Text>
            <Text style={styles.mensagemSucessoSubtexto}>
              "Que Deus fortaleça sua caminhada hoje."
            </Text>
          </View>
        )}

        {/* Flores Animadas */}
        {mostrarFlores && (
          <View style={styles.floresAnimacao}>
            {[...Array(8)].map((_, i) => (
              <Text key={i} style={[styles.florAnimada, { left: `${i * 12}%` }]}>
                🌸
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  ilustracaoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ilustracao: {
    width: '100%',
    height: 280,
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    justifyContent: 'center',
    alignItems: 'center',
    ...sombra,
  },
  ilustracaoTexto: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginBottom: 12,
  },
  ilustracaoEmoji: { fontSize: 80, marginBottom: 12 },
  ilustracaoDescricao: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
  },
  titulo: {
    fontSize: 28,
    fontFamily: fontes.titulo,
    color: cores.bordo,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra,
  },
  actionEmoji: { fontSize: 24, marginBottom: 6 },
  actionLabel: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    textAlign: 'center',
  },
  cardEscrever: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    marginBottom: 12,
  },
  textarea: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  cardVersiculo: {
    backgroundColor: cores.dourado,
    borderRadius: raios.card,
    padding: 20,
    marginBottom: 24,
    ...sombra,
  },
  versiculoTexto: {
    fontSize: 16,
    fontFamily: fontes.versiculo,
    color: '#fff',
    lineHeight: 26,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  versiculoReferencia: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: '#fff',
    textAlign: 'right',
  },
  botaoFinalizar: {
    backgroundColor: cores.rosa,
    paddingVertical: 14,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoFinalizarTexto: {
    color: cores.olivaEscuro,
    fontFamily: fontes.rotulo,
    fontSize: 15,
  },
  mensagemSucesso: {
    backgroundColor: '#E8F5E9',
    borderRadius: raios.card,
    padding: 20,
    alignItems: 'center',
  },
  mensagemSucessoTexto: {
    fontSize: 16,
    fontFamily: fontes.rotulo,
    color: '#2E7D32',
    marginBottom: 8,
  },
  mensagemSucessoSubtexto: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: '#2E7D32',
    fontStyle: 'italic',
  },
  floresAnimacao: {
    marginTop: 20,
    height: 60,
    position: 'relative',
  },
  florAnimada: {
    position: 'absolute',
    fontSize: 28,
    top: 0,
  },
});
