import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cores, fontes, raios } from '../theme';
import { carregar } from '../storage';
import { trilhas } from '../data/trilhas';

type Evento = {
  id: string;
  timestamp: number;
  emoji: string;
  titulo: string;
  descricao?: string;
};

type Memorial = { id: string; titulo: string; descricao: string; data?: string };
type Post = { id: string; tipo: string; autora: string; texto: string };
type Pedido = { id: string; tipo: string };

export default function MinhaCaminhadaScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [trilhasConcluidas, setTrilhasConcluidas] = useState(0);
  const [totalDiario, setTotalDiario] = useState(0);
  const [totalOracoes, setTotalOracoes] = useState(0);
  const [totalGratidoes, setTotalGratidoes] = useState(0);

  useEffect(() => {
    async function montar() {
      const [memoriais, posts, pedidos, progresso, diario, oracoes, gratidoes] = await Promise.all([
        carregar<Memorial[]>('memoriais', []),
        carregar<Post[]>('comunidade_posts', []),
        carregar<Pedido[]>('acolhimento_pedidos', []),
        carregar<Record<string, number>>('jornadas_progresso', {}),
        carregar<unknown[]>('diario_entradas', []),
        carregar<unknown[]>('oracoes', []),
        carregar<unknown[]>('gratidoes', []),
      ]);

      const memoriaisEventos: Evento[] = memoriais.map((m) => ({
        id: `memorial-${m.id}`,
        timestamp: Number(m.id) || Date.now(),
        emoji: '🌸',
        titulo: m.titulo,
        descricao: m.descricao,
      }));

      const testemunhos: Evento[] = posts
        .filter((p) => p.tipo === 'testemunho' && p.autora === 'Você')
        .map((p) => ({
          id: `testemunho-${p.id}`,
          timestamp: Number(p.id) || Date.now(),
          emoji: '✨',
          titulo: 'Testemunho compartilhado',
          descricao: p.texto,
        }));

      const acolhimentos: Evento[] = pedidos.map((p) => ({
        id: `acolhimento-${p.id}`,
        timestamp: Number(p.id) || Date.now(),
        emoji: '🤍',
        titulo: `Acolhimento: ${p.tipo}`,
      }));

      const concluidas = trilhas.filter((t) => (progresso[t.id] ?? 0) >= t.etapas).length;
      setTrilhasConcluidas(concluidas);
      setTotalDiario(diario.length);
      setTotalOracoes(oracoes.length);
      setTotalGratidoes(gratidoes.length);
      setEventos([...memoriaisEventos, ...testemunhos, ...acolhimentos].sort((a, b) => b.timestamp - a.timestamp));
    }
    montar();
  }, []);

  const passosRegistrados = useMemo(
    () => totalDiario + totalOracoes + totalGratidoes + eventos.length,
    [totalDiario, totalOracoes, totalGratidoes, eventos.length]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>MINHA CAMINHADA</Text>
          <Text style={styles.titulo}>Veja o que Deus já fez.</Text>
          <Text style={styles.subtitulo}>
            Este espaço reúne pequenos passos, registros e marcos da sua jornada com Abba.
          </Text>
        </View>

        <View style={styles.destaque}>
          <Text style={styles.destaqueNumero}>{passosRegistrados}</Text>
          <View style={styles.destaqueTextoWrap}>
            <Text style={styles.destaqueTitulo}>passos registrados</Text>
            <Text style={styles.destaqueTexto}>Cada registro conta uma história de cuidado, presença e perseverança.</Text>
          </View>
        </View>

        <View style={styles.grade}>
          <Stat numero={trilhasConcluidas} label="Jornadas concluídas" />
          <Stat numero={totalDiario} label="Registros no Diário" />
          <Stat numero={totalOracoes} label="Orações registradas" />
          <Stat numero={totalGratidoes} label="Gratidões" />
        </View>

        <Text style={styles.secaoTitulo}>Linha do tempo</Text>
        {eventos.map((evento) => (
          <View key={evento.id} style={styles.cardEvento}>
            <View style={styles.icone}><Text style={styles.eventoEmoji}>{evento.emoji}</Text></View>
            <View style={styles.eventoCorpo}>
              <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
              {!!evento.descricao && <Text style={styles.eventoDescricao}>{evento.descricao}</Text>}
            </View>
          </View>
        ))}

        {eventos.length === 0 && (
          <View style={styles.vazio}>
            <Text style={styles.vazioIcone}>🌱</Text>
            <Text style={styles.vazioTitulo}>Sua história está começando.</Text>
            <Text style={styles.vazioTexto}>Registre um memorial, escreva no Diário ou compartilhe um testemunho. Sua caminhada vai aparecer aqui.</Text>
          </View>
        )}

        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>“Até aqui nos ajudou o Senhor.”</Text>
          <Text style={styles.rodapeRef}>1 Samuel 7:12</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ numero, label }: { numero: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statNumero}>{numero}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 50 },
  hero: { marginBottom: 18 },
  kicker: { fontSize: 10, letterSpacing: 2, fontFamily: fontes.rotulo, color: cores.douradoEscuro, marginBottom: 6 },
  titulo: { fontSize: 30, lineHeight: 36, fontFamily: fontes.tituloPrincipal, color: cores.texto },
  subtitulo: { marginTop: 8, fontSize: 14, lineHeight: 21, fontFamily: fontes.texto, color: cores.cinzaClaro },
  destaque: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.rosaMuitoClaro, borderRadius: raios.card, borderWidth: 1, borderColor: cores.nude, padding: 18, marginBottom: 14 },
  destaqueNumero: { fontSize: 38, fontFamily: fontes.tituloPrincipal, color: cores.bordo, marginRight: 14 },
  destaqueTextoWrap: { flex: 1 },
  destaqueTitulo: { fontSize: 13, fontFamily: fontes.rotulo, color: cores.texto },
  destaqueTexto: { marginTop: 3, fontSize: 12, lineHeight: 18, fontFamily: fontes.texto, color: cores.cinzaClaro },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  stat: { width: '48%', minHeight: 88, backgroundColor: cores.branco, borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 13, justifyContent: 'center' },
  statNumero: { fontSize: 22, fontFamily: fontes.tituloPrincipal, color: cores.bordo },
  statLabel: { marginTop: 3, fontSize: 11, lineHeight: 15, fontFamily: fontes.texto, color: cores.cinzaClaro },
  secaoTitulo: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.douradoEscuro, letterSpacing: 1.3, textTransform: 'uppercase', marginBottom: 10 },
  cardEvento: { flexDirection: 'row', backgroundColor: cores.branco, borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 14, marginBottom: 10 },
  icone: { width: 38, height: 38, borderRadius: 19, backgroundColor: cores.creme, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  eventoEmoji: { fontSize: 18 },
  eventoCorpo: { flex: 1, justifyContent: 'center' },
  eventoTitulo: { fontSize: 14, fontFamily: fontes.rotulo, color: cores.bordo, marginBottom: 3 },
  eventoDescricao: { fontSize: 13, lineHeight: 18, fontFamily: fontes.texto, color: cores.cinzaTexto },
  vazio: { backgroundColor: cores.cremeCard, borderRadius: raios.card, borderWidth: 1, borderColor: cores.bordaCard, padding: 28, alignItems: 'center' },
  vazioIcone: { fontSize: 38, marginBottom: 8 },
  vazioTitulo: { fontSize: 16, fontFamily: fontes.rotulo, color: cores.bordo, marginBottom: 6 },
  vazioTexto: { fontSize: 13, lineHeight: 19, fontFamily: fontes.texto, color: cores.cinzaClaro, textAlign: 'center' },
  rodape: { marginTop: 28, alignItems: 'center' },
  rodapeTexto: { fontSize: 17, fontFamily: fontes.versiculo, color: cores.texto, textAlign: 'center' },
  rodapeRef: { marginTop: 5, fontSize: 11, fontFamily: fontes.rotulo, color: cores.douradoEscuro },
});
