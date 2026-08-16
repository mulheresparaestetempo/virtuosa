import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_ORACOES = 'minhas_oracoes';

type Oracao = { id: string; texto: string; };
type Oracoes = Record<string, Oracao[]>;

const categorias = [
  { chave: 'pedidos', emoji: '🙏', label: 'Pedidos' },
  { chave: 'respondidas', emoji: '✓', label: 'Respondidas' },
  { chave: 'familia', emoji: '👨‍👩‍👧‍👦', label: 'Família' },
  { chave: 'filhos', emoji: '👶', label: 'Filhos' },
  { chave: 'casamento', emoji: '💕', label: 'Casamento' },
  { chave: 'saude', emoji: '❤️', label: 'Saúde' },
  { chave: 'financas', emoji: '💰', label: 'Finanças' },
  { chave: 'igreja', emoji: '⛪', label: 'Igreja' },
  { chave: 'missoes', emoji: '🌍', label: 'Missões' },
  { chave: 'nacoes', emoji: '🌎', label: 'Nações' },
];

const oracoesIniciais: Oracoes = {
  pedidos: [{ id: '1', texto: 'Que Deus guie meus passos' }],
  respondidas: [{ id: '2', texto: 'Obtive o emprego que pedi' }],
  familia: [], filhos: [], casamento: [], saude: [], financas: [], igreja: [], missoes: [], nacoes: [],
};

export default function OracaoScreen() {
  const [oracoes, setOracoes] = useState<Oracoes>(oracoesIniciais);
  const [carregado, setCarregado] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('pedidos');
  const [modalNova, setModalNova] = useState(false);
  const [texto, setTexto] = useState('');

  useEffect(() => {
    carregar<Oracoes>(CHAVE_ORACOES, oracoesIniciais).then((salvas) => {
      const normalizadas: Oracoes = {};
      Object.keys(oracoesIniciais).forEach((chave) => {
        normalizadas[chave] = (salvas?.[chave] ?? []).map((item: Oracao | string, idx: number) =>
          typeof item === 'string' ? { id: `${chave}-${idx}`, texto: item } : item
        );
      });
      setOracoes(normalizadas);
      setCarregado(true);
    });
  }, []);

  useEffect(() => { if (carregado) salvar(CHAVE_ORACOES, oracoes); }, [oracoes, carregado]);

  function adicionarOracao() {
    if (!texto.trim()) return;
    const nova = { id: String(Date.now()), texto: texto.trim() };
    setOracoes((atual) => ({ ...atual, [categoriaSelecionada]: [nova, ...(atual[categoriaSelecionada] ?? [])] }));
    setTexto('');
    setModalNova(false);
  }

  function marcarRespondida(id: string) {
    const atual = oracoes[categoriaSelecionada] ?? [];
    const encontrada = atual.find((o) => o.id === id);
    if (!encontrada || categoriaSelecionada === 'respondidas') return;
    setOracoes((estado) => ({
      ...estado,
      [categoriaSelecionada]: (estado[categoriaSelecionada] ?? []).filter((o) => o.id !== id),
      respondidas: [encontrada, ...(estado.respondidas ?? [])],
    }));
    setCategoriaSelecionada('respondidas');
  }

  function removerOracao(id: string) {
    Alert.alert('Remover oração', 'Deseja realmente remover este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => setOracoes((estado) => ({ ...estado, [categoriaSelecionada]: (estado[categoriaSelecionada] ?? []).filter((o) => o.id !== id) })) },
    ]);
  }

  const totalOracoes = Object.values(oracoes).reduce((acc, arr) => acc + arr.length, 0);
  const categoriaAtual = categorias.find((c) => c.chave === categoriaSelecionada);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>🙏 Minhas Orações</Text>
        <Text style={styles.infoTexto}>{totalOracoes} oração{totalOracoes !== 1 ? 's' : ''} no total</Text>

        <View style={styles.categoriasGrid}>
          {categorias.map((cat) => (
            <TouchableOpacity key={cat.chave} style={[styles.categoriaCard, categoriaSelecionada === cat.chave && styles.categoriaCardAtiva]} onPress={() => setCategoriaSelecionada(cat.chave)}>
              <Text style={styles.categoriaEmoji}>{cat.emoji}</Text>
              <Text style={styles.categoriaLabel}>{cat.label}</Text>
              <Text style={styles.categoriaBadge}>{oracoes[cat.chave]?.length ?? 0}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.secaoOracoes}>
          <Text style={styles.secaoTitulo}>{categoriaAtual?.emoji} {categoriaAtual?.label}</Text>
          {(oracoes[categoriaSelecionada] ?? []).length === 0 ? (
            <View style={styles.vazio}><Text style={styles.vazioTexto}>Nenhuma oração nesta categoria</Text></View>
          ) : (oracoes[categoriaSelecionada] ?? []).map((oracao) => (
            <View key={oracao.id} style={styles.cardOracao}>
              <Text style={styles.oracaoTexto}>{oracao.texto}</Text>
              <View style={styles.oracaoAcoes}>
                {categoriaSelecionada !== 'respondidas' && <TouchableOpacity style={styles.botaoMini} onPress={() => marcarRespondida(oracao.id)}><Text style={styles.botaoMiniTexto}>✓ Respondida</Text></TouchableOpacity>}
                <TouchableOpacity style={[styles.botaoMini, styles.botaoMiniRemover]} onPress={() => removerOracao(oracao.id)}><Text style={styles.botaoMiniTextoRemover}>✕ Remover</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoNovaOracao} onPress={() => setModalNova(true)}>
          <Text style={styles.botaoNovaOracaoTexto}>+ Nova Oração</Text>
        </TouchableOpacity>

        {modalNova && (
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Nova oração em {categoriaAtual?.label}</Text>
            <TextInput autoFocus value={texto} onChangeText={setTexto} placeholder="Escreva seu pedido de oração..." placeholderTextColor={cores.cinzaClaro} multiline style={styles.input} />
            <View style={styles.modalAcoes}>
              <TouchableOpacity style={styles.botaoCancelar} onPress={() => { setModalNova(false); setTexto(''); }}><Text style={styles.botaoCancelarTexto}>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.botaoSalvar} onPress={adicionarOracao}><Text style={styles.botaoSalvarTexto}>Salvar</Text></TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 28, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 8 },
  infoTexto: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaClaro, marginBottom: 20 },
  categoriasGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  categoriaCard: { flex: 1, minWidth: '30%', backgroundColor: '#fff', borderRadius: raios.card, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: cores.borda, ...sombra },
  categoriaCardAtiva: { backgroundColor: cores.rosa, borderColor: cores.rosa },
  categoriaEmoji: { fontSize: 22, marginBottom: 6 },
  categoriaLabel: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.bordo, textAlign: 'center' },
  categoriaBadge: { fontSize: 12, fontFamily: fontes.rotulo, color: cores.ouroEscuro, marginTop: 4 },
  secaoOracoes: { marginBottom: 24 },
  secaoTitulo: { fontSize: 16, fontFamily: fontes.rotulo, color: cores.bordo, marginBottom: 12 },
  cardOracao: { backgroundColor: '#fff', borderRadius: raios.card, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: cores.borda },
  oracaoTexto: { fontSize: 14, fontFamily: fontes.texto, color: cores.texto, lineHeight: 20, marginBottom: 10 },
  oracaoAcoes: { flexDirection: 'row', gap: 8 },
  botaoMini: { flex: 1, backgroundColor: cores.rosa, borderRadius: 12, paddingVertical: 7, alignItems: 'center' },
  botaoMiniTexto: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.olivaEscuro },
  botaoMiniRemover: { backgroundColor: '#fff', borderWidth: 1, borderColor: cores.erro },
  botaoMiniTextoRemover: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.erro },
  vazio: { backgroundColor: cores.cremeCard, borderRadius: raios.card, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: cores.bordaCard },
  vazioTexto: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaClaro },
  botaoNovaOracao: { backgroundColor: cores.dourado, paddingVertical: 14, borderRadius: raios.botao, alignItems: 'center' },
  botaoNovaOracaoTexto: { color: '#fff', fontFamily: fontes.rotulo, fontSize: 15 },
  modalCard: { backgroundColor: cores.cremeCard, borderRadius: raios.modal, padding: 18, marginTop: 18, borderWidth: 1, borderColor: cores.bordaCard },
  modalTitulo: { fontSize: 16, fontFamily: fontes.tituloSemiBold, color: cores.bordo, marginBottom: 12 },
  input: { backgroundColor: '#fff', borderRadius: raios.campo, borderWidth: 1, borderColor: cores.borda, padding: 12, minHeight: 90, fontFamily: fontes.texto, color: cores.texto, textAlignVertical: 'top', marginBottom: 12 },
  modalAcoes: { flexDirection: 'row', gap: 8 },
  botaoCancelar: { flex: 1, backgroundColor: '#fff', borderRadius: raios.botao, paddingVertical: 12, alignItems: 'center' },
  botaoCancelarTexto: { color: cores.olivaEscuro, fontFamily: fontes.rotulo },
  botaoSalvar: { flex: 1, backgroundColor: cores.dourado, borderRadius: raios.botao, paddingVertical: 12, alignItems: 'center' },
  botaoSalvarTexto: { color: '#fff', fontFamily: fontes.rotulo },
});