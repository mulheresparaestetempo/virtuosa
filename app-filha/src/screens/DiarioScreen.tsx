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

const CHAVE_ENTRADAS = 'diario_entradas';

type TipoEntrada = 'oracao' | 'resposta' | 'reflexao' | 'versiculo' | 'gratidao';

type Entrada = {
  id: string;
  tipo: TipoEntrada;
  texto: string;
  data: string;
};

const tipos: { valor: TipoEntrada; label: string; emoji: string }[] = [
  { valor: 'oracao', label: 'Oração', emoji: '🙏' },
  { valor: 'resposta', label: 'Resposta', emoji: '✅' },
  { valor: 'reflexao', label: 'Reflexão', emoji: '💭' },
  { valor: 'versiculo', label: 'Versículo', emoji: '📖' },
  { valor: 'gratidao', label: 'Gratidão', emoji: '🌸' },
];

const entradasIniciais: Entrada[] = [
  {
    id: '1',
    tipo: 'gratidao',
    texto: 'Obrigada, Pai, pela saúde da minha família esta semana.',
    data: '03 de agosto',
  },
  {
    id: '2',
    tipo: 'oracao',
    texto: 'Senhor, peço direção para a decisão sobre o novo trabalho.',
    data: '02 de agosto',
  },
  {
    id: '3',
    tipo: 'versiculo',
    texto: '"Tudo posso naquele que me fortalece." — Filipenses 4:13',
    data: '01 de agosto',
  },
];

function hojeFormatado() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
}

export default function DiarioScreen() {
  const [entradas, setEntradas] = useState<Entrada[]>(entradasIniciais);
  const [carregado, setCarregado] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoEntrada>('oracao');
  const [texto, setTexto] = useState('');

  useEffect(() => {
    carregar(CHAVE_ENTRADAS, entradasIniciais).then((salvas) => {
      setEntradas(salvas);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_ENTRADAS, entradas);
  }, [entradas, carregado]);

  function adicionarEntrada() {
    if (!texto.trim()) return;
    const nova: Entrada = {
      id: String(Date.now()),
      tipo: tipoSelecionado,
      texto: texto.trim(),
      data: hojeFormatado(),
    };
    setEntradas([nova, ...entradas]);
    setTexto('');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Diário Espiritual 📔</Text>

        <View style={styles.cardNovaEntrada}>
          <Text style={styles.novaEntradaLabel}>Nova entrada</Text>
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
            placeholder="Escreva o que está no seu coração..."
            placeholderTextColor={cores.cinzaClaro}
            value={texto}
            onChangeText={setTexto}
            multiline
          />
          <TouchableOpacity style={styles.botaoSalvar} onPress={adicionarEntrada}>
            <Text style={styles.botaoSalvarTexto}>Salvar no Diário</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoTitulo}>Registros recentes</Text>
        {entradas.map((entrada) => {
          const tipoInfo = tipos.find((t) => t.valor === entrada.tipo);
          return (
            <View key={entrada.id} style={styles.cardEntrada}>
              <View style={styles.cardEntradaCabecalho}>
                <Text style={styles.cardEntradaTipo}>
                  {tipoInfo ? `${tipoInfo.emoji} ${tipoInfo.label}` : entrada.tipo}
                </Text>
                <Text style={styles.cardEntradaData}>{entrada.data}</Text>
              </View>
              <Text style={styles.cardEntradaTexto}>{entrada.texto}</Text>
            </View>
          );
        })}
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
  cardNovaEntrada: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginBottom: 22,
  },
  novaEntradaLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 10,
  },
  tiposLinha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tipoChip: {
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tipoChipSelecionado: {
    backgroundColor: cores.ouro,
    borderColor: cores.ouro,
  },
  tipoChipTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.bordo,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    minHeight: 70,
    fontSize: 14,
    color: cores.cinzaTexto,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  botaoSalvar: {
    backgroundColor: cores.ouro,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoSalvarTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardEntrada: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
  },
  cardEntradaCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardEntradaTipo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.bordo,
  },
  cardEntradaData: {
    fontSize: 12,
    color: cores.cinzaClaro,
  },
  cardEntradaTexto: {
    fontSize: 14,
    color: cores.cinzaTexto,
    lineHeight: 20,
  },
});
