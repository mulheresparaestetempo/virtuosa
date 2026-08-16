import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores, raios } from '../theme';
import { carregar, salvar } from '../storage';
import { trilhas } from '../data/trilhas';

const CHAVE_PROGRESSO = 'jornadas_progresso';

type Progresso = Record<string, number>;

export default function JornadasScreen() {
  const [progresso, setProgresso] = useState<Progresso>({});
  const [trilhaAberta, setTrilhaAberta] = useState<string | null>(null);

  useEffect(() => {
    carregar<Progresso>(CHAVE_PROGRESSO, {}).then(setProgresso);
  }, []);

  function alternarEtapa(trilhaId: string, etapa: number, totalEtapas: number) {
    const concluidas = progresso[trilhaId] ?? 0;
    const novoValor = etapa <= concluidas ? etapa - 1 : Math.min(etapa, totalEtapas);
    const atualizado = { ...progresso, [trilhaId]: novoValor };
    setProgresso(atualizado);
    salvar(CHAVE_PROGRESSO, atualizado);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Jornadas 🌱</Text>
        <Text style={styles.subtitulo}>
          Novo Começo → Identidade → Vida de Oração → Jejum → Santidade → Família →
          Serviço → Evangelismo → Liderança → Discipuladora
        </Text>

        {trilhas.map((trilha) => {
          const concluidas = progresso[trilha.id] ?? 0;
          const aberta = trilhaAberta === trilha.id;
          const percentual = Math.round((concluidas / trilha.etapas) * 100);

          return (
            <View key={trilha.id} style={styles.cardTrilha}>
              <TouchableOpacity
                style={styles.cardCabecalho}
                onPress={() => setTrilhaAberta(aberta ? null : trilha.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.trilhaNome}>{trilha.nome}</Text>
                  <Text style={styles.trilhaInfo}>
                    {concluidas}/{trilha.etapas} etapas concluídas
                  </Text>
                  <View style={styles.barraFundo}>
                    <View style={[styles.barraPreenchida, { width: `${percentual}%` }]} />
                  </View>
                </View>
                <Text style={styles.seta}>{aberta ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {aberta && (
                <View style={styles.etapasLinha}>
                  {Array.from({ length: trilha.etapas }, (_, i) => i + 1).map((etapa) => (
                    <TouchableOpacity
                      key={etapa}
                      style={[
                        styles.etapaCirculo,
                        etapa <= concluidas && styles.etapaCirculoConcluida,
                      ]}
                      onPress={() => alternarEtapa(trilha.id, etapa, trilha.etapas)}
                    >
                      <Text
                        style={[
                          styles.etapaTexto,
                          etapa <= concluidas && styles.etapaTextoConcluida,
                        ]}
                      >
                        {etapa <= concluidas ? '✓' : etapa}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cores.creme,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 12,
    color: cores.cinzaClaro,
    marginBottom: 18,
    lineHeight: 18,
  },
  cardTrilha: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  trilhaNome: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 4,
  },
  trilhaInfo: {
    fontSize: 12,
    color: cores.cinzaClaro,
    marginBottom: 8,
  },
  barraFundo: {
    height: 6,
    borderRadius: 3,
    backgroundColor: cores.cremeCard,
    overflow: 'hidden',
  },
  barraPreenchida: {
    height: 6,
    borderRadius: 3,
    backgroundColor: cores.ouro,
  },
  seta: {
    fontSize: 14,
    color: cores.ouroEscuro,
    marginLeft: 10,
  },
  etapasLinha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 16,
    paddingTop: 0,
  },
  etapaCirculo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.creme,
  },
  etapaCirculoConcluida: {
    backgroundColor: cores.ouro,
    borderColor: cores.ouro,
  },
  etapaTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
  },
  etapaTextoConcluida: {
    color: '#fff',
  },
});
