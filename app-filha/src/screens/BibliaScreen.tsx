import { useMemo, useState } from 'react';
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

const versiculoDoDia = {
  texto: 'Entrega o teu caminho ao Senhor; confia nele, e ele o fará.',
  referencia: 'Salmos 37:5',
};

const livros = [
  { nome: 'Gênesis', testamento: 'Antigo Testamento', capitulos: 50 },
  { nome: 'Êxodo', testamento: 'Antigo Testamento', capitulos: 40 },
  { nome: 'Salmos', testamento: 'Antigo Testamento', capitulos: 150 },
  { nome: 'Provérbios', testamento: 'Antigo Testamento', capitulos: 31 },
  { nome: 'Isaías', testamento: 'Antigo Testamento', capitulos: 66 },
  { nome: 'Mateus', testamento: 'Novo Testamento', capitulos: 28 },
  { nome: 'João', testamento: 'Novo Testamento', capitulos: 21 },
  { nome: 'Romanos', testamento: 'Novo Testamento', capitulos: 16 },
  { nome: 'Efésios', testamento: 'Novo Testamento', capitulos: 6 },
  { nome: 'Tiago', testamento: 'Novo Testamento', capitulos: 5 },
];

export default function BibliaScreen() {
  const [busca, setBusca] = useState('');
  const [favoritado, setFavoritado] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState<string | null>(null);

  const livrosFiltrados = useMemo(
    () =>
      livros.filter((livro) =>
        livro.nome.toLowerCase().includes(busca.trim().toLowerCase())
      ),
    [busca]
  );

  const antigoTestamento = livrosFiltrados.filter((l) => l.testamento === 'Antigo Testamento');
  const novoTestamento = livrosFiltrados.filter((l) => l.testamento === 'Novo Testamento');

  const livro = livros.find((l) => l.nome === livroSelecionado);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Bíblia 📖</Text>

        <View style={styles.cardVersiculo}>
          <Text style={styles.versiculoTexto}>"{versiculoDoDia.texto}"</Text>
          <View style={styles.versiculoRodape}>
            <Text style={styles.versiculoReferencia}>{versiculoDoDia.referencia}</Text>
            <TouchableOpacity onPress={() => setFavoritado((v) => !v)}>
              <Text style={styles.estrela}>{favoritado ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.busca}
          placeholder="Pesquisar livro..."
          placeholderTextColor={cores.cinzaClaro}
          value={busca}
          onChangeText={setBusca}
        />

        {livro && (
          <View style={styles.cardLivroAberto}>
            <Text style={styles.livroAbertoTitulo}>{livro.nome}</Text>
            <Text style={styles.livroAbertoInfo}>{livro.capitulos} capítulos</Text>
            <View style={styles.capitulosLinha}>
              {Array.from({ length: Math.min(livro.capitulos, 8) }, (_, i) => i + 1).map((cap) => (
                <View key={cap} style={styles.capituloChip}>
                  <Text style={styles.capituloChipTexto}>{cap}</Text>
                </View>
              ))}
              {livro.capitulos > 8 && <Text style={styles.maisCapitulos}>+{livro.capitulos - 8}</Text>}
            </View>
          </View>
        )}

        {antigoTestamento.length > 0 && (
          <>
            <Text style={styles.secaoTitulo}>Antigo Testamento</Text>
            {antigoTestamento.map((l) => (
              <TouchableOpacity
                key={l.nome}
                style={[styles.linhaLivro, livroSelecionado === l.nome && styles.linhaLivroSelecionada]}
                onPress={() => setLivroSelecionado(l.nome === livroSelecionado ? null : l.nome)}
              >
                <Text style={styles.linhaLivroNome}>{l.nome}</Text>
                <Text style={styles.linhaLivroCapitulos}>{l.capitulos} cap.</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {novoTestamento.length > 0 && (
          <>
            <Text style={styles.secaoTitulo}>Novo Testamento</Text>
            {novoTestamento.map((l) => (
              <TouchableOpacity
                key={l.nome}
                style={[styles.linhaLivro, livroSelecionado === l.nome && styles.linhaLivroSelecionada]}
                onPress={() => setLivroSelecionado(l.nome === livroSelecionado ? null : l.nome)}
              >
                <Text style={styles.linhaLivroNome}>{l.nome}</Text>
                <Text style={styles.linhaLivroCapitulos}>{l.capitulos} cap.</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {livrosFiltrados.length === 0 && (
          <Text style={styles.semResultado}>Nenhum livro encontrado para "{busca}".</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cores.creme,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 16,
  },
  cardVersiculo: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginBottom: 16,
  },
  versiculoTexto: {
    fontSize: 16,
    fontStyle: 'italic',
    color: cores.cinzaTexto,
    lineHeight: 22,
    marginBottom: 10,
  },
  versiculoRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versiculoReferencia: {
    fontSize: 14,
    fontWeight: '700',
    color: cores.ouroEscuro,
  },
  estrela: {
    fontSize: 20,
  },
  busca: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: cores.cinzaTexto,
    marginBottom: 18,
  },
  cardLivroAberto: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.rosa,
    padding: 16,
    marginBottom: 18,
  },
  livroAbertoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: cores.bordo,
  },
  livroAbertoInfo: {
    fontSize: 13,
    color: cores.cinzaClaro,
    marginBottom: 10,
  },
  capitulosLinha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  capituloChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: cores.cremeCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capituloChipTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: cores.ouroEscuro,
  },
  maisCapitulos: {
    fontSize: 13,
    color: cores.cinzaClaro,
    marginLeft: 4,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 8,
  },
  linhaLivro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  linhaLivroSelecionada: {
    borderColor: cores.rosa,
    backgroundColor: '#fdf3f3',
  },
  linhaLivroNome: {
    fontSize: 15,
    fontWeight: '600',
    color: cores.bordo,
  },
  linhaLivroCapitulos: {
    fontSize: 12,
    color: cores.cinzaClaro,
  },
  semResultado: {
    textAlign: 'center',
    color: cores.cinzaClaro,
    marginTop: 20,
  },
});
