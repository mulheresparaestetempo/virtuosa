import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_POSTS = 'comunidade_posts';

type TipoPost = 'pedido_oracao' | 'testemunho';

type Post = {
  id: string;
  tipo: TipoPost;
  autora: string;
  texto: string;
  data: string;
  oracoes: number;
};

const tipos: { valor: TipoPost; label: string; emoji: string }[] = [
  { valor: 'pedido_oracao', label: 'Pedido de oração', emoji: '🙏' },
  { valor: 'testemunho', label: 'Testemunho', emoji: '✨' },
];

const postsIniciais: Post[] = [
  {
    id: '1',
    tipo: 'pedido_oracao',
    autora: 'Mariana',
    texto: 'Peço oração pela saúde da minha mãe, que está internada.',
    data: '04 de agosto',
    oracoes: 12,
  },
  {
    id: '2',
    tipo: 'testemunho',
    autora: 'Camila',
    texto: 'Deus respondeu! Consegui o novo emprego que tanto orei.',
    data: '02 de agosto',
    oracoes: 8,
  },
];

function hojeFormatado() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
}

export default function ComunidadeScreen() {
  const [posts, setPosts] = useState<Post[]>(postsIniciais);
  const [carregado, setCarregado] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoPost>('pedido_oracao');
  const [texto, setTexto] = useState('');

  useEffect(() => {
    carregar(CHAVE_POSTS, postsIniciais).then((salvos) => {
      setPosts(salvos);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_POSTS, posts);
  }, [posts, carregado]);

  function publicar() {
    if (!texto.trim()) return;
    const novo: Post = {
      id: String(Date.now()),
      tipo: tipoSelecionado,
      autora: 'Você',
      texto: texto.trim(),
      data: hojeFormatado(),
      oracoes: 0,
    };
    setPosts([novo, ...posts]);
    setTexto('');
  }

  function orarPor(id: string) {
    setPosts(posts.map((p) => (p.id === id ? { ...p, oracoes: p.oracoes + 1 } : p)));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardNovo}>
          <View style={styles.tiposLinha}>
            {tipos.map((t) => (
              <TouchableOpacity
                key={t.valor}
                style={[styles.tipoChip, tipoSelecionado === t.valor && styles.tipoChipSelecionado]}
                onPress={() => setTipoSelecionado(t.valor)}
              >
                <Text style={styles.tipoChipTexto}>
                  {t.emoji} {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Compartilhe com a comunidade..."
            placeholderTextColor={cores.cinzaClaro}
            value={texto}
            onChangeText={setTexto}
            multiline
          />
          <TouchableOpacity style={styles.botaoPublicar} onPress={publicar}>
            <Text style={styles.botaoPublicarTexto}>Publicar</Text>
          </TouchableOpacity>
        </View>

        {posts.map((post) => {
          const tipoInfo = tipos.find((t) => t.valor === post.tipo);
          return (
            <View key={post.id} style={styles.cardPost}>
              <View style={styles.cardCabecalho}>
                <Text style={styles.postTipo}>
                  {tipoInfo ? `${tipoInfo.emoji} ${tipoInfo.label}` : post.tipo}
                </Text>
                <Text style={styles.postData}>{post.data}</Text>
              </View>
              <Text style={styles.postAutora}>{post.autora}</Text>
              <Text style={styles.postTexto}>{post.texto}</Text>
              <TouchableOpacity style={styles.botaoOrar} onPress={() => orarPor(post.id)}>
                <Text style={styles.botaoOrarTexto}>🙏 Orando ({post.oracoes})</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  cardNovo: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginBottom: 20,
  },
  tiposLinha: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tipoChip: {
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tipoChipSelecionado: { backgroundColor: cores.rosa, borderColor: cores.rosa },
  tipoChipTexto: { fontSize: 12, fontWeight: '600', color: cores.bordo },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    minHeight: 60,
    fontSize: 14,
    color: cores.cinzaTexto,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  botaoPublicar: { backgroundColor: cores.rosa, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoPublicarTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  cardPost: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 12,
  },
  cardCabecalho: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  postTipo: { fontSize: 12, fontWeight: '700', color: cores.ouroEscuro },
  postData: { fontSize: 12, color: cores.cinzaClaro },
  postAutora: { fontSize: 13, fontWeight: '700', color: cores.bordo, marginBottom: 4 },
  postTexto: { fontSize: 14, color: cores.cinzaTexto, lineHeight: 20, marginBottom: 10 },
  botaoOrar: {
    alignSelf: 'flex-start',
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  botaoOrarTexto: { fontSize: 12, fontWeight: '600', color: cores.ouroEscuro },
});
