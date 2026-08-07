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
import { cores, raios } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_MEMORIAIS = 'memoriais';

type Memorial = {
  id: string; // Number(id) é o timestamp de criação — reaproveitado pela linha do tempo em Minha Caminhada
  titulo: string;
  descricao: string;
  data: string;
};

const sugestoes = [
  'Primeiro devocional',
  'Primeiro jejum',
  'Primeira oração registrada',
  'Primeira jornada concluída',
  'Primeiro culto no lar',
  'Primeira visita recebida',
  'Primeiro testemunho',
  'Um ano caminhando com Deus',
  'Tornou-se discipuladora',
];

const UM_DIA_MS = 86400000;

const memoriaisIniciais: Memorial[] = [
  {
    id: String(Date.now() - 21 * UM_DIA_MS),
    titulo: 'Primeiro devocional',
    descricao: 'Comecei minha caminhada diária no Lugar Secreto.',
    data: '15 de julho',
  },
];

function hojeFormatado() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
}

export default function MemoriaisScreen() {
  const [memoriais, setMemoriais] = useState<Memorial[]>(memoriaisIniciais);
  const [carregado, setCarregado] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    carregar(CHAVE_MEMORIAIS, memoriaisIniciais).then((salvos) => {
      setMemoriais(salvos);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_MEMORIAIS, memoriais);
  }, [memoriais, carregado]);

  function registrarMemorial(tituloEscolhido?: string) {
    const t = (tituloEscolhido ?? titulo).trim();
    if (!t) return;
    const novo: Memorial = {
      id: String(Date.now()),
      titulo: t,
      descricao: descricao.trim(),
      data: hojeFormatado(),
    };
    setMemoriais([novo, ...memoriais]);
    setTitulo('');
    setDescricao('');
  }

  const sugestoesDisponiveis = sugestoes.filter(
    (s) => !memoriais.some((m) => m.titulo === s)
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitulo}>
          Lembranças da fidelidade de Deus na sua caminhada — não conquistas, marcos.
        </Text>

        {sugestoesDisponiveis.length > 0 && (
          <View style={styles.sugestoesLinha}>
            {sugestoesDisponiveis.slice(0, 4).map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.sugestaoChip}
                onPress={() => registrarMemorial(s)}
              >
                <Text style={styles.sugestaoChipTexto}>+ {s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.cardNovo}>
          <Text style={styles.novoLabel}>Registrar um novo marco</Text>
          <TextInput
            style={styles.input}
            placeholder="Título (ex: Primeira visita recebida)"
            placeholderTextColor={cores.cinzaClaro}
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            placeholder="O que aconteceu?"
            placeholderTextColor={cores.cinzaClaro}
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
          <TouchableOpacity style={styles.botaoSalvar} onPress={() => registrarMemorial()}>
            <Text style={styles.botaoSalvarTexto}>Guardar memorial</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoTitulo}>Sua linha de memoriais</Text>
        {memoriais.map((memorial) => (
          <View key={memorial.id} style={styles.cardMemorial}>
            <Text style={styles.marcador}>🌸</Text>
            <View style={{ flex: 1 }}>
              <View style={styles.cardCabecalho}>
                <Text style={styles.memorialTitulo}>{memorial.titulo}</Text>
                <Text style={styles.memorialData}>{memorial.data}</Text>
              </View>
              {!!memorial.descricao && (
                <Text style={styles.memorialDescricao}>{memorial.descricao}</Text>
              )}
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
  subtitulo: { fontSize: 13, color: cores.cinzaClaro, marginBottom: 16, lineHeight: 18 },
  sugestoesLinha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  sugestaoChip: {
    borderWidth: 1,
    borderColor: cores.olivaEscuro,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  sugestaoChipTexto: { fontSize: 12, fontWeight: '600', color: cores.olivaEscuro },
  cardNovo: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginBottom: 22,
  },
  novoLabel: { fontSize: 14, fontWeight: '700', color: cores.bordo, marginBottom: 10 },
  input: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    color: cores.cinzaTexto,
    marginBottom: 10,
  },
  inputMultilinha: { minHeight: 60, textAlignVertical: 'top' },
  botaoSalvar: { backgroundColor: cores.ouro, paddingVertical: 12, borderRadius: raios.botao, alignItems: 'center' },
  botaoSalvarTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardMemorial: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  marcador: { fontSize: 20 },
  cardCabecalho: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  memorialTitulo: { fontSize: 15, fontWeight: '700', color: cores.bordo, flexShrink: 1, marginRight: 8 },
  memorialData: { fontSize: 12, color: cores.cinzaClaro },
  memorialDescricao: { fontSize: 13, color: cores.cinzaTexto, lineHeight: 18 },
});
