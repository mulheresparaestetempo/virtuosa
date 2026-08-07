import { useEffect, useMemo, useState } from 'react';
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

const CHAVE_FAVORITOS = 'biblioteca_favoritos';
const CHAVE_DOWNLOADS = 'biblioteca_downloads';

type Categoria = 'Devocionais' | 'Livros' | 'Cursos' | 'Podcasts' | 'Pregações' | 'PDF' | 'Vídeos';

type TipoConteudo = {
  valor: Categoria;
  label: string;
  emoji: string;
};

type Item = {
  id: string;
  categoria: Categoria;
  titulo: string;
  autor?: string;
  descricao: string;
  tamanho?: string;
};

const tipos: TipoConteudo[] = [
  { valor: 'Devocionais', label: 'Devocionais', emoji: '🕊️' },
  { valor: 'Livros', label: 'Livros', emoji: '📚' },
  { valor: 'Cursos', label: 'Cursos', emoji: '🎓' },
  { valor: 'Podcasts', label: 'Podcasts', emoji: '🎧' },
  { valor: 'Pregações', label: 'Pregações', emoji: '✝️' },
  { valor: 'PDF', label: 'PDF', emoji: '📄' },
  { valor: 'Vídeos', label: 'Vídeos', emoji: '📺' },
];

const itensIniciais: Item[] = [
  {
    id: '1',
    categoria: 'Devocionais',
    titulo: 'Descanso na Presença',
    autor: 'Abba Virtuosa',
    descricao: 'Um devocional diário para sua caminhada',
    tamanho: '8 min',
  },
  {
    id: '2',
    categoria: 'Devocionais',
    titulo: 'Identidade em Cristo',
    autor: 'Abba Virtuosa',
    descricao: 'Descubra quem você é em Jesus',
    tamanho: '10 min',
  },
  {
    id: '3',
    categoria: 'Livros',
    titulo: 'Jejum: Um Guia Prático',
    autor: 'Autora da Comunidade',
    descricao: 'Guia completo sobre o jejum espiritual',
    tamanho: '48 páginas',
  },
  {
    id: '4',
    categoria: 'Podcasts',
    titulo: 'Mulheres que Confiam',
    autor: 'Podcast Abba',
    descricao: 'Histórias de mulheres de fé',
    tamanho: '32 min',
  },
  {
    id: '5',
    categoria: 'Pregações',
    titulo: 'A Vida no Espírito',
    autor: 'Apóstola Ana',
    descricao: 'Pregação sobre o fruto do Espírito',
    tamanho: '45 min',
  },
  {
    id: '6',
    categoria: 'Cursos',
    titulo: 'Mulheres da Bíblia — Rute',
    autor: 'Escola Bíblica',
    descricao: 'Estudo profundo da vida de Rute',
    tamanho: '6 aulas',
  },
  {
    id: '7',
    categoria: 'PDF',
    titulo: 'Manual da Discipuladora',
    autor: 'Comunidade Abba',
    descricao: 'Guia para discipular outras mulheres',
    tamanho: '3.2 MB',
  },
  {
    id: '8',
    categoria: 'Vídeos',
    titulo: 'Conferência Abba Virtuosa 2025',
    autor: 'Equipe de Comunicação',
    descricao: 'Momentos inspiradores da conferência',
    tamanho: '2h 15min',
  },
];

export default function BibliotecaScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria | 'Todas'>('Todas');
  const [searchText, setSearchText] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<string[]>([]);
  const [abaSelecionada, setAbaSelecionada] = useState<'Todos' | 'Favoritos' | 'Downloads'>('Todos');

  useEffect(() => {
    Promise.all([
      carregar<string[]>(CHAVE_FAVORITOS, []),
      carregar<string[]>(CHAVE_DOWNLOADS, []),
    ]).then(([salvosFavoritos, salvosDownloads]) => {
      setFavoritos(salvosFavoritos);
      setDownloads(salvosDownloads);
    });
  }, []);

  useEffect(() => {
    salvar(CHAVE_FAVORITOS, favoritos);
  }, [favoritos]);

  useEffect(() => {
    salvar(CHAVE_DOWNLOADS, downloads);
  }, [downloads]);

  function alternarFavorito(id: string) {
    setFavoritos(
      favoritos.includes(id) ? favoritos.filter((f) => f !== id) : [...favoritos, id]
    );
  }

  function alternarDownload(id: string) {
    setDownloads(
      downloads.includes(id) ? downloads.filter((d) => d !== id) : [...downloads, id]
    );
  }

  const itensFiltrados = useMemo(() => {
    let resultado = itensIniciais;

    if (abaSelecionada === 'Favoritos') {
      resultado = resultado.filter((i) => favoritos.includes(i.id));
    } else if (abaSelecionada === 'Downloads') {
      resultado = resultado.filter((i) => downloads.includes(i.id));
    }

    if (categoriaAtiva !== 'Todas') {
      resultado = resultado.filter((i) => i.categoria === categoriaAtiva);
    }

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      resultado = resultado.filter(
        (i) =>
          i.titulo.toLowerCase().includes(searchLower) ||
          i.autor?.toLowerCase().includes(searchLower) ||
          i.descricao.toLowerCase().includes(searchLower)
      );
    }

    return resultado;
  }, [categoriaAtiva, searchText, abaSelecionada, favoritos, downloads]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Biblioteca 📚</Text>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar por título ou autor..."
            placeholderTextColor={cores.cinzaClaro}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Abas */}
        <View style={styles.abasContainer}>
          {(['Todos', 'Favoritos', 'Downloads'] as const).map((aba) => (
            <TouchableOpacity
              key={aba}
              style={[styles.abaChip, abaSelecionada === aba && styles.abaChipAtivo]}
              onPress={() => setAbaSelecionada(aba)}
            >
              <Text
                style={[
                  styles.abaChipTexto,
                  abaSelecionada === aba && styles.abaChipTextoAtivo,
                ]}
              >
                {aba === 'Todos' ? 'Todos' : aba === 'Favoritos' ? '⭐ Favoritos' : '⬇️ Downloads'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categorias */}
        <Text style={styles.secaoTitulo}>Categorias</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriasLinha}
        >
          <TouchableOpacity
            style={[styles.categoriaChip, categoriaAtiva === 'Todas' && styles.categoriaChipAtivo]}
            onPress={() => setCategoriaAtiva('Todas')}
          >
            <Text style={styles.categoriaChipEmoji}>📖</Text>
            <Text
              style={[
                styles.categoriaChipTexto,
                categoriaAtiva === 'Todas' && styles.categoriaChipTextoAtivo,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo.valor}
              style={[
                styles.categoriaChip,
                categoriaAtiva === tipo.valor && styles.categoriaChipAtivo,
              ]}
              onPress={() => setCategoriaAtiva(tipo.valor)}
            >
              <Text style={styles.categoriaChipEmoji}>{tipo.emoji}</Text>
              <Text
                style={[
                  styles.categoriaChipTexto,
                  categoriaAtiva === tipo.valor && styles.categoriaChipTextoAtivo,
                ]}
              >
                {tipo.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Resultados */}
        {itensFiltrados.length > 0 ? (
          <>
            <Text style={styles.secaoTitulo}>
              {abaSelecionada === 'Todos'
                ? 'Conteúdo disponível'
                : abaSelecionada === 'Favoritos'
                  ? 'Seus favoritos'
                  : 'Seus downloads'}
            </Text>
            {itensFiltrados.map((item) => {
              const tipoInfo = tipos.find((t) => t.valor === item.categoria);
              return (
                <View key={item.id} style={styles.cardItem}>
                  <Text style={styles.cardEmoji}>{tipoInfo?.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemTitulo}>{item.titulo}</Text>
                    {item.autor && <Text style={styles.itemAutor}>{item.autor}</Text>}
                    <Text style={styles.itemDescricao}>{item.descricao}</Text>
                    {item.tamanho && <Text style={styles.itemTamanho}>{item.tamanho}</Text>}
                  </View>
                  <View style={styles.acoesItem}>
                    <TouchableOpacity
                      onPress={() => alternarFavorito(item.id)}
                      style={styles.acaoItemBotao}
                    >
                      <Text style={styles.acaoItemEmoji}>
                        {favoritos.includes(item.id) ? '⭐' : '☆'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => alternarDownload(item.id)}
                      style={styles.acaoItemBotao}
                    >
                      <Text style={styles.acaoItemEmoji}>
                        {downloads.includes(item.id) ? '✓' : '⬇️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </>
        ) : (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhum resultado encontrado</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: {
    fontSize: 26,
    fontFamily: fontes.titulo,
    color: cores.bordo,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 12,
    marginBottom: 16,
    ...sombra,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
  },
  abasContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  abaChip: {
    backgroundColor: '#fff',
    borderRadius: raios.botao,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  abaChipAtivo: {
    backgroundColor: cores.rosa,
    borderColor: cores.rosa,
  },
  abaChipTexto: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    fontWeight: '600',
  },
  abaChipTextoAtivo: {
    color: cores.olivaEscuro,
  },
  secaoTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 16,
  },
  categoriasLinha: {
    marginBottom: 20,
  },
  categoriaChip: {
    backgroundColor: '#fff',
    borderRadius: raios.botao,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  categoriaChipAtivo: {
    backgroundColor: cores.dourado,
    borderColor: cores.dourado,
  },
  categoriaChipEmoji: { fontSize: 16 },
  categoriaChipTexto: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    fontWeight: '600',
  },
  categoriaChipTextoAtivo: {
    color: '#fff',
  },
  cardItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 12,
    gap: 12,
    alignItems: 'flex-start',
    ...sombra,
  },
  cardEmoji: { fontSize: 24, marginTop: 2 },
  itemTitulo: {
    fontSize: 14,
    fontFamily: fontes.textoForte,
    color: cores.bordo,
    marginBottom: 4,
  },
  itemAutor: {
    fontSize: 11,
    fontFamily: fontes.texto,
    color: cores.ouroEscuro,
    marginBottom: 4,
  },
  itemDescricao: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    marginBottom: 6,
    lineHeight: 16,
  },
  itemTamanho: {
    fontSize: 11,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  acoesItem: {
    gap: 8,
  },
  acaoItemBotao: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.botao,
    backgroundColor: cores.cremeCard,
  },
  acaoItemEmoji: { fontSize: 16 },
  vazio: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginTop: 20,
  },
  vazioTexto: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
  },
});
