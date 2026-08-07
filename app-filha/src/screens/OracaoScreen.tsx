import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_ORACOES = 'minhas_oracoes';

type Oracoes = {
  pedidos: string[];
  respondidas: string[];
  familia: string[];
  filhos: string[];
  casamento: string[];
  saude: string[];
  financas: string[];
  igreja: string[];
  missoes: string[];
  nacoes: string[];
};

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
  pedidos: ['Que Deus guie meus passos'],
  respondidas: ['Obtive o emprego que pedi'],
  familia: [],
  filhos: [],
  casamento: [],
  saude: [],
  financas: [],
  igreja: [],
  missoes: [],
  nacoes: [],
};

export default function OracaoScreen() {
  const [oracoes, setOracoes] = useState<Oracoes>(oracoesIniciais);
  const [carregado, setCarregado] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<keyof Oracoes>('pedidos');

  useEffect(() => {
    carregar<Oracoes>(CHAVE_ORACOES, oracoesIniciais).then((salvas) => {
      setOracoes(salvas);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_ORACOES, oracoes);
  }, [oracoes, carregado]);

  const totalOracoes = Object.values(oracoes).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>🙏 Minhas Orações</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.infoTexto}>
            {totalOracoes} oração{totalOracoes !== 1 ? 's' : ''} no total
          </Text>
        </View>

        {/* Grid de Categorias */}
        <View style={styles.categoriasGrid}>
          {categorias.map((cat) => {
            const total = oracoes[cat.chave as keyof Oracoes].length;
            return (
              <TouchableOpacity
                key={cat.chave}
                style={[
                  styles.categoriaCard,
                  categoriaSelecionada === cat.chave && styles.categoriaCardAtiva,
                ]}
                onPress={() => setCategoriaSelecionada(cat.chave as keyof Oracoes)}
              >
                <Text style={styles.categoriaEmoji}>{cat.emoji}</Text>
                <Text style={styles.categoriaLabel}>{cat.label}</Text>
                <Text style={styles.categoriaBadge}>{total}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Lista de Orações da Categoria Selecionada */}
        <View style={styles.secaoOracoes}>
          <Text style={styles.secaoTitulo}>
            {categorias.find((c) => c.chave === categoriaSelecionada)?.emoji}{' '}
            {categorias.find((c) => c.chave === categoriaSelecionada)?.label}
          </Text>

          {oracoes[categoriaSelecionada].length === 0 ? (
            <View style={styles.vazio}>
              <Text style={styles.vazioTexto}>Nenhuma oração nesta categoria</Text>
            </View>
          ) : (
            oracoes[categoriaSelecionada].map((oracao, idx) => (
              <View key={idx} style={styles.cardOracao}>
                <Text style={styles.oracaoTexto}>{oracao}</Text>
                <View style={styles.oracaoAcoes}>
                  <TouchableOpacity style={styles.botaoMini}>
                    <Text style={styles.botaoMiniTexto}>✓ Respondida</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.botaoMini, styles.botaoMiniRemover]}>
                    <Text style={styles.botaoMiniTextoRemover}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Botão Nova Oração */}
        <TouchableOpacity style={styles.botaoNovaOracao}>
          <Text style={styles.botaoNovaOracaoTexto}>+ Nova Oração</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: {
    fontSize: 28,
    fontFamily: fontes.titulo,
    color: cores.bordo,
    marginBottom: 8,
  },
  headerInfo: {
    marginBottom: 20,
  },
  infoTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  categoriasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  categoriaCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra,
  },
  categoriaCardAtiva: {
    backgroundColor: cores.rosa,
    borderColor: cores.rosa,
  },
  categoriaEmoji: { fontSize: 22, marginBottom: 6 },
  categoriaLabel: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    textAlign: 'center',
  },
  categoriaBadge: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginTop: 4,
  },
  secaoOracoes: {
    marginBottom: 24,
  },
  secaoTitulo: {
    fontSize: 16,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    marginBottom: 12,
  },
  cardOracao: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  oracaoTexto: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.texto,
    lineHeight: 20,
    marginBottom: 10,
  },
  oracaoAcoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoMini: {
    flex: 1,
    backgroundColor: cores.rosa,
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  botaoMiniTexto: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.olivaEscuro,
  },
  botaoMiniRemover: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: cores.erro,
  },
  botaoMiniTextoRemover: {
    fontSize: 14,
    fontFamily: fontes.rotulo,
    color: cores.erro,
  },
  vazio: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  vazioTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  botaoNovaOracao: {
    backgroundColor: cores.dourado,
    paddingVertical: 14,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoNovaOracaoTexto: {
    color: '#fff',
    fontFamily: fontes.rotulo,
    fontSize: 15,
  },
});
