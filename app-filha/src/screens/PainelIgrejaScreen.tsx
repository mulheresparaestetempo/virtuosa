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

const CHAVE_CELULAS = 'painel_igreja_celulas';

type Celula = {
  id: string;
  nome: string;
  lider: string;
  diaHorario: string;
};

const celulasIniciais: Celula[] = [
  { id: '1', nome: 'Vinho Novo', lider: 'Ana Paula', diaHorario: 'Quintas, 20h' },
  { id: '2', nome: 'Águas Vivas', lider: 'Mariana', diaHorario: 'Terças, 19h30' },
];

const resumo = [
  { label: 'Ministérios', valor: 4 },
  { label: 'Líderes', valor: 12 },
  { label: 'Eventos no mês', valor: 5 },
];

export default function PainelIgrejaScreen() {
  const [celulas, setCelulas] = useState<Celula[]>(celulasIniciais);
  const [carregado, setCarregado] = useState(false);
  const [nome, setNome] = useState('');
  const [lider, setLider] = useState('');
  const [diaHorario, setDiaHorario] = useState('');

  useEffect(() => {
    carregar(CHAVE_CELULAS, celulasIniciais).then((salvas) => {
      setCelulas(salvas);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_CELULAS, celulas);
  }, [celulas, carregado]);

  function adicionarCelula() {
    if (!nome.trim() || !lider.trim()) return;
    setCelulas([
      ...celulas,
      { id: String(Date.now()), nome: nome.trim(), lider: lider.trim(), diaHorario: diaHorario.trim() },
    ]);
    setNome('');
    setLider('');
    setDiaHorario('');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.aviso}>
          Prévia de gestão — número de igrejas fixo neste protótipo (1: PIBAM Espraiado);
          relatórios completos dependem de um backend com dados reais de todas as usuárias.
        </Text>

        <View style={styles.grade}>
          {resumo.map((r) => (
            <View key={r.label} style={styles.stat}>
              <Text style={styles.statNumero}>{r.valor}</Text>
              <Text style={styles.statLabel}>{r.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>Células</Text>
        {celulas.map((c) => (
          <View key={c.id} style={styles.cardCelula}>
            <Text style={styles.celulaNome}>{c.nome}</Text>
            <Text style={styles.celulaInfo}>Líder: {c.lider}</Text>
            {!!c.diaHorario && <Text style={styles.celulaInfo}>{c.diaHorario}</Text>}
          </View>
        ))}

        <View style={styles.cardNova}>
          <Text style={styles.novaLabel}>Adicionar célula</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da célula"
            placeholderTextColor={cores.cinzaClaro}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Líder responsável"
            placeholderTextColor={cores.cinzaClaro}
            value={lider}
            onChangeText={setLider}
          />
          <TextInput
            style={styles.input}
            placeholder="Dia e horário (opcional)"
            placeholderTextColor={cores.cinzaClaro}
            value={diaHorario}
            onChangeText={setDiaHorario}
          />
          <TouchableOpacity style={styles.botaoSalvar} onPress={adicionarCelula}>
            <Text style={styles.botaoSalvarTexto}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  aviso: { fontSize: 12, color: cores.cinzaClaro, marginBottom: 16, lineHeight: 17 },
  grade: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  stat: {
    flex: 1,
    backgroundColor: cores.cremeCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 14,
    alignItems: 'center',
  },
  statNumero: { fontSize: 22, fontWeight: '700', color: cores.bordo },
  statLabel: { fontSize: 11, color: cores.ouroEscuro, textAlign: 'center', marginTop: 4 },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardCelula: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
  },
  celulaNome: { fontSize: 15, fontWeight: '700', color: cores.bordo, marginBottom: 2 },
  celulaInfo: { fontSize: 13, color: cores.cinzaTexto },
  cardNova: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginTop: 8,
  },
  novaLabel: { fontSize: 14, fontWeight: '700', color: cores.bordo, marginBottom: 10 },
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
  botaoSalvar: { backgroundColor: cores.ouro, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoSalvarTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
