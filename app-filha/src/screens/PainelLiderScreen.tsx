import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme';

const discipulas = [
  { nome: 'Camila', trilha: 'Identidade', progresso: 66, frequencia: 'Ativa', pedidosAbertos: 1, acolhimentosAbertos: 0 },
  { nome: 'Mariana', trilha: 'Vida de Oração', progresso: 40, frequencia: 'Ativa', pedidosAbertos: 2, acolhimentosAbertos: 1 },
  { nome: 'Juliana', trilha: 'Novo Começo', progresso: 25, frequencia: 'Inativa há 9 dias', pedidosAbertos: 0, acolhimentosAbertos: 0 },
  { nome: 'Beatriz', trilha: 'Jejum', progresso: 100, frequencia: 'Ativa', pedidosAbertos: 0, acolhimentosAbertos: 1 },
];

export default function PainelLiderScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.aviso}>
          Prévia com dados fictícios — o acompanhamento real de discípulas depende de uma conta
          por usuária e sincronização em nuvem, ainda não implementadas neste protótipo. O
          conteúdo do Diário nunca aparece aqui, só frequência e engajamento.
        </Text>

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
