import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, raios } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_ORACOES = 'missoes_oracoes';

type Missao = {
  id: string;
  missionaria: string;
  local: string;
  projeto: string;
  motivoOracao: string;
};

const missoes: Missao[] = [
  {
    id: '1',
    missionaria: 'Fernanda Alves',
    local: 'Norte de Moçambique',
    projeto: 'Plantação de igrejas em vilarejos',
    motivoOracao: 'Por proteção nas viagens entre vilarejos e por novos discípulos.',
  },
  {
    id: '2',
    missionaria: 'Equipe Vale da Bênção',
    local: 'Interior do Amazonas',
    projeto: 'Tradução da Bíblia para língua local',
    motivoOracao: 'Por sabedoria na tradução e provisão financeira do projeto.',
  },
  {
    id: '3',
    missionaria: 'Campanha de Natal',
    local: 'Comunidades carentes da região',
    projeto: 'Entrega de cestas básicas e evangelismo',
    motivoOracao: 'Por voluntárias e por corações abertos ao evangelho.',
  },
];

export default function MissoesScreen() {
  const [oracoes, setOracoes] = useState<Record<string, number>>({});

  useEffect(() => {
    carregar<Record<string, number>>(CHAVE_ORACOES, {}).then(setOracoes);
  }, []);

  function orarPor(id: string) {
    const atualizado = { ...oracoes, [id]: (oracoes[id] ?? 0) + 1 };
    setOracoes(atualizado);
    salvar(CHAVE_ORACOES, atualizado);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {missoes.map((m) => (
          <View key={m.id} style={styles.card}>
            <Text style={styles.missionaria}>{m.missionaria}</Text>
            <Text style={styles.local}>📍 {m.local}</Text>
            <Text style={styles.projeto}>{m.projeto}</Text>
            <Text style={styles.motivo}>{m.motivoOracao}</Text>
            <TouchableOpacity style={styles.botaoOrar} onPress={() => orarPor(m.id)}>
              <Text style={styles.botaoOrarTexto}>🙏 Orando ({oracoes[m.id] ?? 0})</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
  },
  missionaria: { fontSize: 16, fontWeight: '700', color: cores.bordo, marginBottom: 4 },
  local: { fontSize: 12, color: cores.ouroEscuro, marginBottom: 6 },
  projeto: { fontSize: 14, fontWeight: '600', color: cores.cinzaTexto, marginBottom: 6 },
  motivo: { fontSize: 13, color: cores.cinzaTexto, lineHeight: 18, marginBottom: 10 },
  botaoOrar: {
    alignSelf: 'flex-start',
    backgroundColor: cores.cremeCard,
    borderRadius: raios.botao,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  botaoOrarTexto: { fontSize: 12, fontWeight: '600', color: cores.ouroEscuro },
});
