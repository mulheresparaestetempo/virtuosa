import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_DEVOCIONAL = 'devocional_do_dia';

const discipulas = [
  { nome: 'Camila', trilha: 'Identidade', progresso: 66, frequencia: 'Ativa', pedidosAbertos: 1, acolhimentosAbertos: 0 },
  { nome: 'Mariana', trilha: 'Vida de Oração', progresso: 40, frequencia: 'Ativa', pedidosAbertos: 2, acolhimentosAbertos: 1 },
  { nome: 'Juliana', trilha: 'Novo Começo', progresso: 25, frequencia: 'Inativa há 9 dias', pedidosAbertos: 0, acolhimentosAbertos: 0 },
  { nome: 'Beatriz', trilha: 'Jejum', progresso: 100, frequencia: 'Ativa', pedidosAbertos: 0, acolhimentosAbertos: 1 },
];

const devocionalVazio = { titulo: '', versiculo: '', resumo: '', louvorTitulo: '', louvorUrl: '' };

export default function PainelLiderScreen() {
  const [devocional, setDevocional] = useState(devocionalVazio);
  const [publicado, setPublicado] = useState(false);

  useEffect(() => {
    carregar(CHAVE_DEVOCIONAL, devocionalVazio).then(setDevocional);
  }, []);

  function campo(chave: keyof typeof devocionalVazio, valor: string) {
    setPublicado(false);
    setDevocional((atual) => ({ ...atual, [chave]: valor }));
  }

  async function publicarDevocional() {
    if (!devocional.titulo.trim() || !devocional.resumo.trim()) return;
    await salvar(CHAVE_DEVOCIONAL, devocional);
    setPublicado(true);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.aviso}>
          Prévia com dados fictícios — o acompanhamento real de discípulas depende de uma conta
          por usuária e sincronização em nuvem, ainda não implementadas neste protótipo. O
          conteúdo do Diário nunca aparece aqui, só frequência e engajamento.
        </Text>

        <View style={styles.cardDevocional}>
          <Text style={styles.secaoTitulo}>Enviar devocional do dia</Text>
          <TextInput
            style={styles.input}
            placeholder="Título do devocional"
            placeholderTextColor={cores.cinzaClaro}
            value={devocional.titulo}
            onChangeText={(v) => campo('titulo', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Versículo (com referência)"
            placeholderTextColor={cores.cinzaClaro}
            value={devocional.versiculo}
            onChangeText={(v) => campo('versiculo', v)}
          />
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            placeholder="Texto do devocional"
            placeholderTextColor={cores.cinzaClaro}
            value={devocional.resumo}
            onChangeText={(v) => campo('resumo', v)}
            multiline
          />
          <Text style={styles.subLabel}>Sugestão de louvor (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do louvor e cantora/banda"
            placeholderTextColor={cores.cinzaClaro}
            value={devocional.louvorTitulo}
            onChangeText={(v) => campo('louvorTitulo', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Link para ouvir (YouTube, Spotify...)"
            placeholderTextColor={cores.cinzaClaro}
            value={devocional.louvorUrl}
            onChangeText={(v) => campo('louvorUrl', v)}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.botaoPublicar} onPress={publicarDevocional}>
            <Text style={styles.botaoPublicarTexto}>
              {publicado ? 'Publicado! ✓' : 'Publicar no Lugar Secreto'}
            </Text>
          </TouchableOpacity>
        </View>

        {discipulas.map((d) => (
          <View key={d.nome} style={styles.card}>
            <View style={styles.cabecalho}>
              <Text style={styles.nome}>{d.nome}</Text>
              <View
                style={[
                  styles.badgeFrequencia,
                  d.frequencia !== 'Ativa' && styles.badgeFrequenciaAlerta,
                ]}
              >
                <Text style={styles.badgeFrequenciaTexto}>{d.frequencia}</Text>
              </View>
            </View>

            <Text style={styles.trilhaLabel}>Jornada atual: {d.trilha}</Text>
            <View style={styles.barraFundo}>
              <View style={[styles.barraPreenchida, { width: `${d.progresso}%` }]} />
            </View>

            <View style={styles.linhaStats}>
              <Text style={styles.stat}>🙏 {d.pedidosAbertos} pedido(s) aberto(s)</Text>
              <Text style={styles.stat}>🤝 {d.acolhimentosAbertos} acolhimento(s) aberto(s)</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  aviso: { fontSize: 12, color: cores.cinzaClaro, marginBottom: 18, lineHeight: 17 },
  cardDevocional: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 18,
    marginBottom: 22,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  subLabel: { fontSize: 13, fontWeight: '700', color: cores.bordo, marginTop: 4, marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    color: cores.cinzaTexto,
    marginBottom: 10,
  },
  inputMultilinha: { minHeight: 90, textAlignVertical: 'top' },
  botaoPublicar: { backgroundColor: cores.ouro, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoPublicarTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
  },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  nome: { fontSize: 16, fontWeight: '700', color: cores.bordo },
  badgeFrequencia: { backgroundColor: '#e7f2e9', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8 },
  badgeFrequenciaAlerta: { backgroundColor: '#fbe9e7' },
  badgeFrequenciaTexto: { fontSize: 11, fontWeight: '700', color: '#3f6b48' },
  trilhaLabel: { fontSize: 13, color: cores.cinzaTexto, marginBottom: 6 },
  barraFundo: { height: 6, borderRadius: 3, backgroundColor: cores.cremeCard, overflow: 'hidden', marginBottom: 10 },
  barraPreenchida: { height: 6, borderRadius: 3, backgroundColor: cores.ouro },
  linhaStats: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { fontSize: 12, color: cores.ouroEscuro },
});
