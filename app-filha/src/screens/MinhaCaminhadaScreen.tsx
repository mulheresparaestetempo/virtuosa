import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme';
import { carregar } from '../storage';
import { trilhas } from '../data/trilhas';

type EventoLinhaDoTempo = {
  id: string;
  timestamp: number;
  emoji: string;
  titulo: string;
  descricao?: string;
};

const DATA_BATISMO = new Date('2024-03-10').getTime();

export default function MinhaCaminhadaScreen() {
  const [eventos, setEventos] = useState<EventoLinhaDoTempo[]>([]);
  const [trilhasConcluidas, setTrilhasConcluidas] = useState<string[]>([]);
  const [totalDiario, setTotalDiario] = useState(0);

  useEffect(() => {
    async function montarLinhaDoTempo() {
      const memoriais = await carregar<{ id: string; titulo: string; descricao: string }[]>(
        'memoriais',
        []
      );
      const posts = await carregar<{ id: string; tipo: string; autora: string; texto: string }[]>(
        'comunidade_posts',
        []
      );
      const pedidos = await carregar<{ id: string; tipo: string }[]>('acolhimento_pedidos', []);
      const progresso = await carregar<Record<string, number>>('jornadas_progresso', {});
      const diario = await carregar<unknown[]>('diario_entradas', []);

      const eventosMemoriais: EventoLinhaDoTempo[] = memoriais.map((m) => ({
        id: `memorial-${m.id}`,
        timestamp: Number(m.id),
        emoji: '🌸',
        titulo: m.titulo,
        descricao: m.descricao,
      }));

      const eventosTestemunhos: EventoLinhaDoTempo[] = posts
        .filter((p) => p.tipo === 'testemunho' && p.autora === 'Você')
        .map((p) => ({
          id: `testemunho-${p.id}`,
          timestamp: Number(p.id),
          emoji: '✨',
          titulo: 'Testemunho compartilhado',
          descricao: p.texto,
        }));

      const eventosAcolhimento: EventoLinhaDoTempo[] = pedidos.map((p) => ({
        id: `acolhimento-${p.id}`,
        timestamp: Number(p.id),
        emoji: '🤝',
        titulo: `Solicitou: ${p.tipo}`,
      }));

      const concluidas = trilhas.filter((t) => (progresso[t.id] ?? 0) >= t.etapas).map((t) => t.id);

      setTrilhasConcluidas(concluidas);
      setTotalDiario(diario.length);
      setEventos(
        [...eventosMemoriais, ...eventosTestemunhos, ...eventosAcolhimento].sort(
          (a, b) => b.timestamp - a.timestamp
        )
      );
    }

    montarLinhaDoTempo();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitulo}>
          Sua linha do tempo espiritual, reunindo o que já foi registrado nos outros módulos.
        </Text>

        <View style={styles.grade}>
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{trilhasConcluidas.length}</Text>
            <Text style={styles.statLabel}>Jornadas concluídas</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{totalDiario}</Text>
            <Text style={styles.statLabel}>Registros no Diário</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{eventos.length}</Text>
            <Text style={styles.statLabel}>Marcos na linha do tempo</Text>
          </View>
        </View>

        <Text style={styles.secaoTitulo}>Linha do tempo</Text>

        {eventos.map((evento) => (
          <View key={evento.id} style={styles.cardEvento}>
            <Text style={styles.eventoEmoji}>{evento.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
              {!!evento.descricao && <Text style={styles.eventoDescricao}>{evento.descricao}</Text>}
            </View>
          </View>
        ))}

        <View style={styles.cardEvento}>
          <Text style={styles.eventoEmoji}>💧</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.eventoTitulo}>Batismo</Text>
            <Text style={styles.eventoDescricao}>
              {new Date(DATA_BATISMO).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {eventos.length === 0 && (
          <Text style={styles.vazio}>
            Sua linha do tempo vai se preenchendo conforme você registra memoriais, testemunhos e
            pedidos de acolhimento pelo app.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  subtitulo: { fontSize: 13, color: cores.cinzaClaro, marginBottom: 18, lineHeight: 18 },
  grade: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  stat: {
    flex: 1,
    backgroundColor: cores.cremeCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 14,
    alignItems: 'center',
  },
  statNumero: { fontSize: 22, fontWeight: '700', color: cores.bordo },
  statLabel: { fontSize: 11, color: cores.ouroEscuro, textAlign: 'center', marginTop: 4 },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardEvento: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  eventoEmoji: { fontSize: 20 },
  eventoTitulo: { fontSize: 14, fontWeight: '700', color: cores.bordo, marginBottom: 2 },
  eventoDescricao: { fontSize: 13, color: cores.cinzaTexto, lineHeight: 18 },
  vazio: { fontSize: 13, color: cores.cinzaClaro, textAlign: 'center', marginTop: 10 },
});
