import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, raios } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_METAS = 'discipuladora_metas';

type Meta = {
  id: string;
  descricao: string;
  concluida: boolean;
};

const discipuladora = {
  nome: 'Ana Paula',
  emoji: '👩🏻',
  funcao: 'Discipuladora da célula Vinho Novo',
  proximoEncontro: 'Quinta-feira, 20h — Videochamada',
};

const metasIniciais: Meta[] = [
  { id: '1', descricao: 'Concluir a trilha Identidade', concluida: false },
  { id: '2', descricao: 'Ler o livro de Salmos em 30 dias', concluida: false },
  { id: '3', descricao: 'Compartilhar um testemunho na comunidade', concluida: true },
];

const conversas = [
  { id: '1', data: '29 de julho', resumo: 'Conversamos sobre perdão e conclui que preciso orar mais por isso.' },
  { id: '2', data: '15 de julho', resumo: 'Ana orou comigo sobre a decisão do novo trabalho.' },
];

export default function MinhaDiscipuladoraScreen() {
  const [metas, setMetas] = useState<Meta[]>(metasIniciais);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    carregar(CHAVE_METAS, metasIniciais).then((salvas) => {
      setMetas(salvas);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_METAS, metas);
  }, [metas, carregado]);

  function alternarMeta(id: string) {
    setMetas(metas.map((m) => (m.id === id ? { ...m, concluida: !m.concluida } : m)));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardPerfil}>
          <Text style={styles.perfilEmoji}>{discipuladora.emoji}</Text>
          <Text style={styles.perfilNome}>{discipuladora.nome}</Text>
          <Text style={styles.perfilFuncao}>{discipuladora.funcao}</Text>
        </View>

        <View style={styles.cardEncontro}>
          <Text style={styles.encontroLabel}>Próximo encontro</Text>
          <Text style={styles.encontroValor}>{discipuladora.proximoEncontro}</Text>
        </View>

        <Text style={styles.secaoTitulo}>Metas em acompanhamento</Text>
        {metas.map((meta) => (
          <TouchableOpacity
            key={meta.id}
            style={styles.cardMeta}
            onPress={() => alternarMeta(meta.id)}
          >
            <View style={[styles.caixa, meta.concluida && styles.caixaMarcada]}>
              {meta.concluida && <Text style={styles.caixaCheck}>✓</Text>}
            </View>
            <Text style={[styles.metaTexto, meta.concluida && styles.metaTextoConcluida]}>
              {meta.descricao}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.secaoTitulo}>Conversas recentes</Text>
        {conversas.map((c) => (
          <View key={c.id} style={styles.cardConversa}>
            <Text style={styles.conversaData}>{c.data}</Text>
            <Text style={styles.conversaResumo}>{c.resumo}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  cardPerfil: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 20,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    alignItems: 'center',
    marginBottom: 16,
  },
  perfilEmoji: { fontSize: 40, marginBottom: 8 },
  perfilNome: { fontSize: 18, fontWeight: '700', color: cores.bordo },
  perfilFuncao: { fontSize: 13, color: cores.ouroEscuro, marginTop: 2 },
  cardEncontro: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.rosa,
    padding: 16,
    marginBottom: 20,
  },
  encontroLabel: { fontSize: 12, fontWeight: '700', color: cores.olivaEscuro, marginBottom: 4 },
  encontroValor: { fontSize: 15, fontWeight: '600', color: cores.bordo },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    marginBottom: 8,
    gap: 10,
  },
  caixa: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: cores.ouro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaMarcada: { backgroundColor: cores.ouro },
  caixaCheck: { color: '#fff', fontSize: 13, fontWeight: '700' },
  metaTexto: { fontSize: 14, color: cores.cinzaTexto, flex: 1 },
  metaTextoConcluida: { textDecorationLine: 'line-through', color: cores.cinzaClaro },
  cardConversa: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    marginBottom: 8,
  },
  conversaData: { fontSize: 12, color: cores.cinzaClaro, marginBottom: 4 },
  conversaResumo: { fontSize: 14, color: cores.cinzaTexto, lineHeight: 19 },
});
