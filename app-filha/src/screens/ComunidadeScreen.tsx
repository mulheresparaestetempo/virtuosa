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
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_POSTS = 'comunidade_posts';

type TipoPost = 'pedido_oracao' | 'testemunho' | 'evento' | 'desafio';
type FiltroFeed = 'todas' | 'minha_igreja' | 'amigas';

type Post = {
  id: string;
  tipo: TipoPost;
  autora: string;
  texto: string;
  data: string;
  curtidas: number;
  comentarios: number;
  curtidaPorMim: boolean;
  filtro: FiltroFeed;
};

const tipos: { valor: TipoPost; label: string; emoji: string }[] = [
  { valor: 'pedido_oracao', label: 'Pedido de oração', emoji: '🙏' },
  { valor: 'testemunho', label: 'Testemunho', emoji: '✨' },
  { valor: 'evento', label: 'Evento', emoji: '📅' },
  { valor: 'desafio', label: 'Desafio', emoji: '💪' },
];

const filtros: { valor: FiltroFeed; label: string }[] = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'minha_igreja', label: 'Minha Igreja' },
  { valor: 'amigas', label: 'Minhas Amigas' },
];

const UM_DIA_MS = 86400000;

const postsIniciais: Post[] = [
  {
    id: String(Date.now() - 1 * UM_DIA_MS),
    tipo: 'pedido_oracao',
    autora: 'Mariana',
    texto: 'Peço oração pela saúde da minha mãe, que está internada. Qualquer palavra é bem-vinda.',
    data: '04 de agosto',
    curtidas: 12,
    comentarios: 3,
    curtidaPorMim: false,
    filtro: 'minha_igreja',
  },
  {
    id: String(Date.now() - 2 * UM_DIA_MS),
    tipo: 'testemunho',
    autora: 'Camila',
    texto: 'Deus respondeu! Consegui o novo emprego que tanto orei. Sua fidelidade é incomparável!',
    data: '03 de agosto',
    curtidas: 28,
    comentarios: 7,
    curtidaPorMim: false,
    filtro: 'amigas',
  },
  {
    id: String(Date.now() - 3 * UM_DIA_MS),
    tipo: 'evento',
    autora: 'Líder Ana',
    texto: 'Convite: Culto de mulheres no próximo sábado às 19h na sala principal. Traga uma amiga!',
    data: '02 de agosto',
    curtidas: 15,
    comentarios: 5,
    curtidaPorMim: false,
    filtro: 'minha_igreja',
  },
  {
    id: String(Date.now() - 4 * UM_DIA_MS),
    tipo: 'desafio',
    autora: 'Comunidade',
    texto: '7 Dias de Gratidão: Compartilhe uma coisa que você é grata HOJE nos comentários!',
    data: '01 de agosto',
    curtidas: 34,
    comentarios: 12,
    curtidaPorMim: false,
    filtro: 'todas',
  },
];

function hojeFormatado() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
}

export default function ComunidadeScreen() {
  const [posts, setPosts] = useState<Post[]>(postsIniciais);
  const [carregado, setCarregado] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoPost>('pedido_oracao');
  const [filtroSelecionado, setFiltroSelecionado] = useState<FiltroFeed>('todas');
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
      curtidas: 0,
      comentarios: 0,
      curtidaPorMim: false,
      filtro: 'minha_igreja',
    };
    setPosts([novo, ...posts]);
    setTexto('');
  }

  function curtir(id: string) {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            curtidas: p.curtidaPorMim ? p.curtidas - 1 : p.curtidas + 1,
            curtidaPorMim: !p.curtidaPorMim,
          };
        }
        return p;
      })
    );
  }

  function comentar(id: string) {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, comentarios: p.comentarios + 1 } : p))
    );
  }

  const postsExibidos = posts.filter((p) => {
    if (filtroSelecionado === 'todas') return true;
    return p.filtro === filtroSelecionado;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Comunidade ❤️</Text>

        {/* Filtro */}
        <View style={styles.filtrosContainer}>
          {filtros.map((filtro) => (
            <TouchableOpacity
              key={filtro.valor}
              style={[
                styles.filtroChip,
                filtroSelecionado === filtro.valor && styles.filtroChipAtivo,
              ]}
              onPress={() => setFiltroSelecionado(filtro.valor)}
            >
              <Text
                style={[
                  styles.filtroChipTexto,
                  filtroSelecionado === filtro.valor && styles.filtroChipTextoAtivo,
                ]}
              >
                {filtro.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card Novo Post */}
        <View style={styles.cardNovo}>
          <Text style={styles.cardNovoLabel}>Compartilhe com a comunidade</Text>
          <View style={styles.tiposLinha}>
            {tipos.map((t) => (
              <TouchableOpacity
                key={t.valor}
                style={[styles.tipoChip, tipoSelecionado === t.valor && styles.tipoChipSelecionado]}
                onPress={() => setTipoSelecionado(t.valor)}
              >
                <Text style={styles.tipoChipTexto}>
                  {t.emoji}
                </Text>
                <Text style={styles.tipoChipLabel}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="O que está em seu coração hoje?"
            placeholderTextColor={cores.cinzaClaro}
            value={texto}
            onChangeText={setTexto}
            multiline
          />
          <TouchableOpacity style={styles.botaoPublicar} onPress={publicar}>
            <Text style={styles.botaoPublicarTexto}>Publicar</Text>
          </TouchableOpacity>
        </View>

        {/* Feed */}
        {postsExibidos.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhum post neste filtro</Text>
          </View>
        ) : (
          postsExibidos.map((post) => {
            const tipoInfo = tipos.find((t) => t.valor === post.tipo);
            return (
              <View key={post.id} style={styles.cardPost}>
                {/* Cabeçalho */}
                <View style={styles.cardCabecalho}>
                  <View style={styles.autoraInfo}>
                    <View style={styles.avatar} />
                    <View>
                      <Text style={styles.postAutora}>{post.autora}</Text>
                      <Text style={styles.postData}>{post.data}</Text>
                    </View>
                  </View>
                  <Text style={styles.postTipo}>{tipoInfo?.emoji}</Text>
                </View>

                {/* Conteúdo */}
                <Text style={styles.postTexto}>{post.texto}</Text>

                {/* Ações */}
                <View style={styles.acoesContainer}>
                  <TouchableOpacity
                    style={styles.acao}
                    onPress={() => curtir(post.id)}
                  >
                    <Text style={styles.acaoEmoji}>{post.curtidaPorMim ? '❤️' : '🤍'}</Text>
                    <Text style={[styles.acaoTexto, post.curtidaPorMim && styles.acaoTextoAtivo]}>
                      {post.curtidas}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.acao}
                    onPress={() => comentar(post.id)}
                  >
                    <Text style={styles.acaoEmoji}>💬</Text>
                    <Text style={styles.acaoTexto}>{post.comentarios}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.acao}>
                    <Text style={styles.acaoEmoji}>↗️</Text>
                    <Text style={styles.acaoTexto}>Compartilhar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 26, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 16 },
  filtrosContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filtroChip: {
    backgroundColor: '#fff',
    borderRadius: raios.botao,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  filtroChipAtivo: {
    backgroundColor: cores.rosa,
    borderColor: cores.rosa,
  },
  filtroChipTexto: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
  },
  filtroChipTextoAtivo: {
    color: cores.olivaEscuro,
    fontWeight: '600',
  },
  cardNovo: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginBottom: 24,
    ...sombra,
  },
  cardNovoLabel: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  tiposLinha: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tipoChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: '#fff',
    borderRadius: raios.botao,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 4,
  },
  tipoChipSelecionado: {
    backgroundColor: cores.rosa,
    borderColor: cores.rosa,
  },
  tipoChipTexto: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipoChipLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: cores.bordo,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    minHeight: 80,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  botaoPublicar: {
    backgroundColor: cores.dourado,
    paddingVertical: 12,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoPublicarTexto: {
    color: '#fff',
    fontFamily: fontes.rotulo,
    fontWeight: '700',
    fontSize: 15,
  },
  vazio: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  vazioTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  cardPost: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
    ...sombra,
  },
  cardCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  autoraInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.rosa,
  },
  postAutora: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
  },
  postData: {
    fontSize: 11,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginTop: 2,
  },
  postTipo: {
    fontSize: 18,
  },
  postTexto: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    lineHeight: 20,
    marginBottom: 12,
  },
  acoesContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  acaoEmoji: {
    fontSize: 16,
  },
  acaoTexto: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  acaoTextoAtivo: {
    color: cores.rosa,
    fontWeight: '600',
  },
});
