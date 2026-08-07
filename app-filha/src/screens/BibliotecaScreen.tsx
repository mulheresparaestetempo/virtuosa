import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_FAVORITOS = 'biblioteca_favoritos';

type Categoria = 'Devocionais' | 'Podcasts' | 'Pregações' | 'Estudos' | 'E-books' | 'Conferências' | 'Áudios';

type Item = {
  id: string;
  categoria: Categoria;
  titulo: string;
  duracao: string;
};

const categorias: Categoria[] = [
  'Devocionais',
  'Podcasts',
  'Pregações',
  'Estudos',
  'E-books',
  'Conferências',
  'Áudios',
];

const itens: Item[] = [
  { id: '1', categoria: 'Devocionais', titulo: 'Descanso na Presença', duracao: '8 min' },
  { id: '2', categoria: 'Devocionais', titulo: 'Identidade em Cristo', duracao: '10 min' },
  { id: '3', categoria: 'Podcasts', titulo: 'Mulheres que confiam', duracao: '32 min' },
  { id: '4', categoria: 'Pregações', titulo: 'A vida no Espírito', duracao: '45 min' },
  { id: '5', categoria: 'Estudos', titulo: 'Mulheres da Bíblia — Rute', duracao: '6 aulas' },
  { id: '6', categoria: 'E-books', titulo: 'Jejum: um guia prático', duracao: '48 páginas' },
  { id: '7', categoria: 'Conferências', titulo: 'Conferência Abba Virtuosa 2025', duracao: '3 dias' },
  { id: '8', categoria: 'Áudios', titulo: 'Música ambiente — Adoração', duracao: '52 min' },
];

export default function BibliotecaScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria | 'Todas'>('Todas');
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    carregar<string[]>(CHAVE_FAVORITOS, []).then(setFavoritos);
  }, []);

  function alternarFavorito(id: string) {
    const atualizados = favoritos.includes(id)
      ? favoritos.filter((f) => f !== id)
      : [...favoritos, id];
    setFavoritos(atualizados);
    salvar(CHAVE_FAVORITOS, atualizados);
  }

  const itensFiltrados = useMemo(
    () => (categoriaAtiva === 'Todas' ? itens : itens.filter((i) => i.categoria === categoriaAtiva)),
    [categoriaAtiva]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.tituloAba}>Biblioteca 🎧</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsLinha}>
          <TouchableOpacity
            style={[styles.chip, categoriaAtiva === 'Todas' && styles.chipAtivo]}
            onPress={() => setCategoriaAtiva('Todas')}
          >
            <Text style={[styles.chipTexto, categoriaAtiva === 'Todas' && styles.chipTextoAtivo]}>
              Todas
            </Text>
          </TouchableOpacity>
          {categorias.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.chip, categoriaAtiva === c && styles.chipAtivo]}
              onPress={() => setCategoriaAtiva(c)}
            >
              <Text style={[styles.chipTexto, categoriaAtiva === c && styles.chipTextoAtivo]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {itensFiltrados.map((item) => (
          <View key={item.id} style={styles.cardItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemCategoria}>{item.categoria}</Text>
              <Text style={styles.itemTitulo}>{item.titulo}</Text>
              <Text style={styles.itemDuracao}>{item.duracao}</Text>
            </View>
            <TouchableOpacity onPress={() => alternarFavorito(item.id)}>
              <Text style={styles.estrela}>{favoritos.includes(item.id) ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  tituloAba: { fontSize: 26, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 16 },
  chipsLinha: { marginBottom: 16 },
  chip: {
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  chipAtivo: { backgroundColor: cores.ouro, borderColor: cores.ouro },
  chipTexto: { fontSize: 12, fontWeight: '600', color: cores.bordo },
  chipTextoAtivo: { color: '#fff' },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
  },
  itemCategoria: {
    fontSize: 11,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  itemTitulo: { fontSize: 15, fontWeight: '700', color: cores.bordo },
  itemDuracao: { fontSize: 12, color: cores.cinzaClaro, marginTop: 2 },
  estrela: { fontSize: 20, marginLeft: 10 },
});
