import { useState } from 'react';
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

type Resultado = {
  versiculo: string;
  referencia: string;
  plano: string;
};

const baseDeConhecimento: { palavraChave: string[]; resultado: Resultado }[] = [
  {
    palavraChave: ['ansiedade', 'ansiosa', 'preocupada', 'aflita', 'medo'],
    resultado: {
      versiculo:
        'Não andeis ansiosos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplica, com ação de graças.',
      referencia: 'Filipenses 4:6',
      plano: 'Plano de leitura: Salmos',
    },
  },
  {
    palavraChave: ['cansada', 'cansaço', 'exausta', 'sobrecarregada', 'descanso'],
    resultado: {
      versiculo: 'Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.',
      referencia: 'Mateus 11:28',
      plano: 'Plano de leitura: Evangelhos',
    },
  },
  {
    palavraChave: ['gratidão', 'grata', 'obrigada', 'agradecer'],
    resultado: {
      versiculo: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.',
      referencia: '1 Tessalonicenses 5:18',
      plano: 'Plano de leitura: Temáticos — Gratidão',
    },
  },
  {
    palavraChave: ['força', 'fraqueza', 'fraca', 'desânimo', 'desanimada'],
    resultado: {
      versiculo: 'Tudo posso naquele que me fortalece.',
      referencia: 'Filipenses 4:13',
      plano: 'Plano de leitura: Bíblia em um ano',
    },
  },
  {
    palavraChave: ['decisão', 'direção', 'caminho', 'escolha', 'confusa'],
    resultado: {
      versiculo: 'Entrega o teu caminho ao Senhor; confia nele, e ele o fará.',
      referencia: 'Salmos 37:5',
      plano: 'Plano de leitura: Provérbios',
    },
  },
  {
    palavraChave: ['família', 'filhos', 'casamento', 'marido'],
    resultado: {
      versiculo: 'Eu e a minha casa serviremos ao Senhor.',
      referencia: 'Josué 24:15',
      plano: 'Jornada: Família',
    },
  },
];

export default function AssistenteBiblicaScreen() {
  const [pergunta, setPergunta] = useState('');
  const [resultados, setResultados] = useState<Resultado[] | null>(null);
  const [buscou, setBuscou] = useState(false);

  function buscar() {
    const termo = pergunta.trim().toLowerCase();
    setBuscou(true);
    if (!termo) {
      setResultados(null);
      return;
    }
    const encontrados = baseDeConhecimento
      .filter((item) => item.palavraChave.some((k) => termo.includes(k) || k.includes(termo)))
      .map((item) => item.resultado);
    setResultados(encontrados);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.aviso}>
          Busca por tema sobre a Bíblia e os materiais do ministério — respostas prontas, sem
          geração livre de texto. Uma versão conversacional (IA) está prevista para uma fase
          futura do app.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Como você está se sentindo hoje?"
          placeholderTextColor={cores.cinzaClaro}
          value={pergunta}
          onChangeText={setPergunta}
          onSubmitEditing={buscar}
        />
        <TouchableOpacity style={styles.botaoBuscar} onPress={buscar}>
          <Text style={styles.botaoBuscarTexto}>Buscar na Palavra</Text>
        </TouchableOpacity>

        <View style={styles.sugestoesLinha}>
          {['ansiedade', 'cansaço', 'gratidão', 'decisão'].map((s) => (
            <TouchableOpacity
              key={s}
              style={styles.sugestaoChip}
              onPress={() => {
                setPergunta(s);
                setBuscou(true);
                const encontrados = baseDeConhecimento
                  .filter((item) => item.palavraChave.includes(s))
                  .map((item) => item.resultado);
                setResultados(encontrados);
              }}
            >
              <Text style={styles.sugestaoChipTexto}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {buscou && resultados && resultados.length === 0 && (
          <Text style={styles.semResultado}>
            Ainda não tenho uma resposta baseada no material do ministério para "{pergunta}".
            Tente palavras como ansiedade, cansaço, gratidão, força, decisão ou família.
          </Text>
        )}

        {resultados?.map((r) => (
          <View key={r.referencia} style={styles.cardResultado}>
            <Text style={styles.versiculoTexto}>"{r.versiculo}"</Text>
            <Text style={styles.versiculoReferencia}>{r.referencia}</Text>
            <View style={styles.planoTag}>
              <Text style={styles.planoTagTexto}>{r.plano}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  aviso: { fontSize: 12, color: cores.cinzaClaro, marginBottom: 16, lineHeight: 17 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    color: cores.cinzaTexto,
    marginBottom: 10,
  },
  botaoBuscar: { backgroundColor: cores.ouro, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoBuscarTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  sugestoesLinha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14, marginBottom: 18 },
  sugestaoChip: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  sugestaoChipTexto: { fontSize: 12, color: cores.bordo, fontWeight: '600' },
  semResultado: { fontSize: 13, color: cores.cinzaClaro, lineHeight: 19, textAlign: 'center', marginTop: 10 },
  cardResultado: {
    backgroundColor: cores.cremeCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 16,
    marginBottom: 12,
  },
  versiculoTexto: { fontSize: 15, fontStyle: 'italic', color: cores.cinzaTexto, lineHeight: 21, marginBottom: 8 },
  versiculoReferencia: { fontSize: 13, fontWeight: '700', color: cores.ouroEscuro, marginBottom: 10 },
  planoTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  planoTagTexto: { fontSize: 11, fontWeight: '700', color: cores.rosa },
});
