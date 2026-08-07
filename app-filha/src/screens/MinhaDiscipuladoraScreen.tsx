import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_METAS = 'discipuladora_metas';
const CHAVE_PEDIDOS = 'discipuladora_pedidos';
const CHAVE_JEJUNS = 'discipuladora_jejuns';

type Meta = {
  id: string;
  descricao: string;
  concluida: boolean;
};

type PedidoCompartilhado = {
  id: string;
  descricao: string;
  data: string;
};

type JejumCompartilhado = {
  id: string;
  tipo: string;
  data: string;
  status: 'em_andamento' | 'concluido';
};

const discipuladora = {
  nome: 'Ana Paula',
  emoji: '👩🏻',
  funcao: 'Discipuladora da célula Vinho Novo',
  telefone: '(11) 99999-9999',
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

const pedidosIniciais: PedidoCompartilhado[] = [
  { id: '1', descricao: 'Oração pela saúde da filha da Ana', data: '03 de agosto' },
  { id: '2', descricao: 'Oração pela decisão de emprego', data: '01 de agosto' },
];

const jejunsIniciais: JejumCompartilhado[] = [
  { id: '1', tipo: 'Jejum Daniel - 21 dias', data: 'Iniciado em 01 de agosto', status: 'em_andamento' },
];

export default function MinhaDiscipuladoraScreen() {
  const [metas, setMetas] = useState<Meta[]>(metasIniciais);
  const [pedidos, setPedidos] = useState<PedidoCompartilhado[]>(pedidosIniciais);
  const [jejuns, setJejuns] = useState<JejumCompartilhado[]>(jejunsIniciais);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    Promise.all([
      carregar(CHAVE_METAS, metasIniciais),
      carregar(CHAVE_PEDIDOS, pedidosIniciais),
      carregar(CHAVE_JEJUNS, jejunsIniciais),
    ]).then(([salvasMetas, salvosPedidos, salvosJejuns]) => {
      setMetas(salvasMetas);
      setPedidos(salvosPedidos);
      setJejuns(salvosJejuns);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) {
      salvar(CHAVE_METAS, metas);
      salvar(CHAVE_PEDIDOS, pedidos);
      salvar(CHAVE_JEJUNS, jejuns);
    }
  }, [metas, pedidos, jejuns, carregado]);

  function alternarMeta(id: string) {
    setMetas(metas.map((m) => (m.id === id ? { ...m, concluida: !m.concluida } : m)));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Card Perfil */}
        <View style={styles.cardPerfil}>
          <Text style={styles.perfilEmoji}>{discipuladora.emoji}</Text>
          <Text style={styles.perfilNome}>{discipuladora.nome}</Text>
          <Text style={styles.perfilFuncao}>{discipuladora.funcao}</Text>
          <Text style={styles.perfilTelefone}>{discipuladora.telefone}</Text>

          {/* Botões de Ação */}
          <View style={styles.acoesContainer}>
            <TouchableOpacity style={styles.botaoAcao}>
              <Text style={styles.botaoAcaoEmoji}>💬</Text>
              <Text style={styles.botaoAcaoTexto}>Mensagem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao}>
              <Text style={styles.botaoAcaoEmoji}>📅</Text>
              <Text style={styles.botaoAcaoTexto}>Agenda</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Próximo Encontro */}
        <View style={styles.cardEncontro}>
          <Text style={styles.encontroLabel}>Próximo encontro</Text>
          <Text style={styles.encontroValor}>{discipuladora.proximoEncontro}</Text>
        </View>

        {/* Metas */}
        <Text style={styles.secaoTitulo}>Metas em acompanhamento</Text>
        {metas.length > 0 ? (
          metas.map((meta) => (
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
          ))
        ) : (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhuma meta em acompanhamento</Text>
          </View>
        )}

        {/* Histórico */}
        <Text style={styles.secaoTitulo}>Histórico de conversas</Text>
        {conversas.length > 0 ? (
          conversas.map((c) => (
            <View key={c.id} style={styles.cardConversa}>
              <Text style={styles.conversaData}>{c.data}</Text>
              <Text style={styles.conversaResumo}>{c.resumo}</Text>
            </View>
          ))
        ) : (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhuma conversa registrada</Text>
          </View>
        )}

        {/* Pedidos Compartilhados */}
        <Text style={styles.secaoTitulo}>Pedidos compartilhados 🙏</Text>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.cardPedido}>
              <View style={styles.pedidoCabecalho}>
                <Text style={styles.pedidoTexto}>{pedido.descricao}</Text>
                <Text style={styles.pedidoData}>{pedido.data}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhum pedido compartilhado</Text>
          </View>
        )}

        {/* Jejuns Compartilhados */}
        <Text style={styles.secaoTitulo}>Jejuns compartilhados 🙏</Text>
        {jejuns.length > 0 ? (
          jejuns.map((jejum) => (
            <View key={jejum.id} style={styles.cardJejum}>
              <View style={styles.jejumCabecalho}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.jejumTipo}>{jejum.tipo}</Text>
                  <Text style={styles.jejumData}>{jejum.data}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    jejum.status === 'em_andamento' ? styles.statusAndamento : styles.statusConcluido,
                  ]}
                >
                  <Text style={styles.statusTexto}>{jejum.status === 'em_andamento' ? '⏳' : '✓'}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhum jejum compartilhado</Text>
          </View>
        )}
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
    ...sombra,
  },
  perfilEmoji: { fontSize: 50, marginBottom: 12 },
  perfilNome: { fontSize: 20, fontFamily: fontes.textoForte, color: cores.bordo, marginBottom: 2 },
  perfilFuncao: { fontSize: 12, fontFamily: fontes.texto, color: cores.ouroEscuro, marginBottom: 8 },
  perfilTelefone: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaClaro },
  acoesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    width: '100%',
  },
  botaoAcao: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: raios.botao,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
  },
  botaoAcaoEmoji: { fontSize: 18 },
  botaoAcaoTexto: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.bordo, fontWeight: '600' },
  cardEncontro: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.rosa,
    padding: 16,
    marginBottom: 20,
    ...sombra,
  },
  encontroLabel: { fontSize: 12, fontFamily: fontes.rotulo, color: cores.olivaEscuro, marginBottom: 4 },
  encontroValor: { fontSize: 15, fontFamily: fontes.textoForte, color: cores.bordo },
  secaoTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 18,
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
    ...sombra,
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
  metaTexto: { fontSize: 14, fontFamily: fontes.texto, color: cores.cinzaTexto, flex: 1 },
  metaTextoConcluida: { textDecorationLine: 'line-through', color: cores.cinzaClaro },
  cardConversa: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    marginBottom: 8,
    ...sombra,
  },
  conversaData: { fontSize: 12, fontFamily: fontes.texto, color: cores.cinzaClaro, marginBottom: 4 },
  conversaResumo: { fontSize: 14, fontFamily: fontes.texto, color: cores.cinzaTexto, lineHeight: 19 },
  vazio: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginBottom: 12,
  },
  vazioTexto: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaClaro, textAlign: 'center' },
  cardPedido: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    marginBottom: 8,
    ...sombra,
  },
  pedidoCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  pedidoTexto: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaTexto, flex: 1, lineHeight: 18 },
  pedidoData: { fontSize: 11, fontFamily: fontes.texto, color: cores.cinzaClaro, minWidth: 70 },
  cardJejum: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    marginBottom: 8,
    ...sombra,
  },
  jejumCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  jejumTipo: { fontSize: 13, fontFamily: fontes.rotulo, color: cores.bordo, fontWeight: '600' },
  jejumData: { fontSize: 11, fontFamily: fontes.texto, color: cores.cinzaClaro, marginTop: 4 },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: raios.botao,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusAndamento: { backgroundColor: '#E3F2FD' },
  statusConcluido: { backgroundColor: '#E8F5E9' },
  statusTexto: { fontSize: 14, fontWeight: '600' },
});
