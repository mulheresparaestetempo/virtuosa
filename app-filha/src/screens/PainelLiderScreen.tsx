import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import { carregar, salvar } from '../storage';
import { CHAVE_PLANO_DEVOCIONAL, planoPadrao, type DiaDevocional, type PlanoDevocional } from '../data/devocional';

const discipulas = [
  { nome: 'Camila', trilha: 'Identidade', progresso: 66, frequencia: 'Ativa', pedidosAbertos: 1, acolhimentosAbertos: 0 },
  { nome: 'Mariana', trilha: 'Vida de Oração', progresso: 40, frequencia: 'Ativa', pedidosAbertos: 2, acolhimentosAbertos: 1 },
  { nome: 'Juliana', trilha: 'Novo Começo', progresso: 25, frequencia: 'Inativa há 9 dias', pedidosAbertos: 0, acolhimentosAbertos: 0 },
  { nome: 'Beatriz', trilha: 'Jejum', progresso: 100, frequencia: 'Ativa', pedidosAbertos: 0, acolhimentosAbertos: 1 },
];

export default function PainelLiderScreen() {
  const [plano, setPlano] = useState<PlanoDevocional>(planoPadrao);
  const [carregado, setCarregado] = useState(false);
  const [novoDia, setNovoDia] = useState('');
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoVersiculo, setNovoVersiculo] = useState('');
  const [novoResumo, setNovoResumo] = useState('');
  const [novoAudioUrl, setNovoAudioUrl] = useState('');
  const [novoLouvorTitulo, setNovoLouvorTitulo] = useState('');
  const [novoLouvorUrl, setNovoLouvorUrl] = useState('');
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    carregar(CHAVE_PLANO_DEVOCIONAL, planoPadrao).then((p) => {
      setPlano(p);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_PLANO_DEVOCIONAL, plano);
  }, [plano, carregado]);

  function ajustarDiaAtual(delta: number) {
    setPlano((atual) => ({ ...atual, diaAtual: Math.min(31, Math.max(1, atual.diaAtual + delta)) }));
  }

  function salvarDiaNoPlano() {
    const dia = parseInt(novoDia, 10);
    if (!dia || dia < 1 || dia > 31 || !novoTitulo.trim() || !novoResumo.trim()) return;
    const entrada: DiaDevocional = {
      dia,
      titulo: novoTitulo.trim(),
      versiculo: novoVersiculo.trim(),
      resumo: novoResumo.trim(),
      audioUrl: novoAudioUrl.trim() || undefined,
      louvorTitulo: novoLouvorTitulo.trim() || undefined,
      louvorUrl: novoLouvorUrl.trim() || undefined,
    };
    setPlano((atual) => ({
      ...atual,
      dias: [...atual.dias.filter((d) => d.dia !== dia), entrada].sort((a, b) => a.dia - b.dia),
    }));
    setNovoDia('');
    setNovoTitulo('');
    setNovoVersiculo('');
    setNovoResumo('');
    setNovoAudioUrl('');
    setNovoLouvorTitulo('');
    setNovoLouvorUrl('');
    setSalvo(true);
  }

  function campoNovoDia(setter: (v: string) => void) {
    return (v: string) => {
      setSalvo(false);
      setter(v);
    };
  }

  function removerDia(dia: number) {
    setPlano((atual) => ({ ...atual, dias: atual.dias.filter((d) => d.dia !== dia) }));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.aviso}>
          Prévia com dados fictícios — o acompanhamento real de discípulas depende de uma conta
          por usuária e sincronização em nuvem, ainda não implementadas neste protótipo. O
          conteúdo do Diário nunca aparece aqui, só frequência e engajamento.
        </Text>

        <View style={styles.cardDevocional}>
          <Text style={styles.secaoTitulo}>Devocional do mês</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do devocional (ex.: Devocional de Agosto)"
            placeholderTextColor={cores.cinzaClaro}
            value={plano.nomeMes}
            onChangeText={(v) => setPlano((atual) => ({ ...atual, nomeMes: v }))}
          />

          <View style={styles.linhaDiaAtual}>
            <Text style={styles.diaAtualLabel}>Dia atual do devocional</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepperBotao} onPress={() => ajustarDiaAtual(-1)}>
                <Text style={styles.stepperBotaoTexto}>−</Text>
              </TouchableOpacity>
              <Text style={styles.stepperValor}>{plano.diaAtual}</Text>
              <TouchableOpacity style={styles.stepperBotao} onPress={() => ajustarDiaAtual(1)}>
                <Text style={styles.stepperBotaoTexto}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.subLabel}>Adicionar ou editar o conteúdo de um dia</Text>
          <TextInput
            style={styles.input}
            placeholder="Número do dia (ex.: 17)"
            placeholderTextColor={cores.cinzaClaro}
            value={novoDia}
            onChangeText={campoNovoDia(setNovoDia)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Título do devocional"
            placeholderTextColor={cores.cinzaClaro}
            value={novoTitulo}
            onChangeText={campoNovoDia(setNovoTitulo)}
          />
          <TextInput
            style={styles.input}
            placeholder="Versículo (com referência)"
            placeholderTextColor={cores.cinzaClaro}
            value={novoVersiculo}
            onChangeText={campoNovoDia(setNovoVersiculo)}
          />
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            placeholder="Texto do devocional"
            placeholderTextColor={cores.cinzaClaro}
            value={novoResumo}
            onChangeText={campoNovoDia(setNovoResumo)}
            multiline
          />
          <Text style={styles.subLabel}>Áudio do devocional de hoje</Text>
          <Text style={styles.ajudaTexto}>
            Cole aqui o link do áudio que você já envia no grupo do WhatsApp (suba o áudio no Google
            Drive, Dropbox ou similar, ative "qualquer pessoa com o link" e cole o link abaixo).
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Link do áudio (Google Drive, Dropbox...)"
            placeholderTextColor={cores.cinzaClaro}
            value={novoAudioUrl}
            onChangeText={campoNovoDia(setNovoAudioUrl)}
            autoCapitalize="none"
          />
          <Text style={styles.subLabel}>Sugestão de louvor (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do louvor e cantora/banda"
            placeholderTextColor={cores.cinzaClaro}
            value={novoLouvorTitulo}
            onChangeText={campoNovoDia(setNovoLouvorTitulo)}
          />
          <TextInput
            style={styles.input}
            placeholder="Link para ouvir (YouTube, Spotify...)"
            placeholderTextColor={cores.cinzaClaro}
            value={novoLouvorUrl}
            onChangeText={campoNovoDia(setNovoLouvorUrl)}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.botaoPublicar} onPress={salvarDiaNoPlano}>
            <Text style={styles.botaoPublicarTexto}>{salvo ? 'Salvo no plano! ✓' : 'Salvar dia no plano'}</Text>
          </TouchableOpacity>

          {plano.dias.length > 0 && (
            <View style={styles.listaDias}>
              <Text style={styles.subLabel}>Dias já cadastrados neste devocional</Text>
              {plano.dias.map((d) => (
                <View key={d.dia} style={styles.diaLinha}>
                  <Text style={styles.diaLinhaTexto} numberOfLines={1}>
                    Dia {d.dia} — {d.titulo}
                  </Text>
                  <TouchableOpacity onPress={() => removerDia(d.dia)}>
                    <Text style={styles.diaLinhaRemover}>remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {discipulas.map((d) => (
          <View key={d.nome} style={styles.card}>
            <View style={styles.cabecalho}>
              <Text style={styles.nome}>{d.nome}</Text>
              <View
                style={[
                  styles.badgeFrequencia,
                  d.frequencia !== 'Ativa' && styles.badgeFrequenciaAlerta,
                ]}
              >
                <Text style={styles.badgeFrequenciaTexto}>{d.frequencia}</Text>
              </View>
            </View>

            <Text style={styles.trilhaLabel}>Jornada atual: {d.trilha}</Text>
            <View style={styles.barraFundo}>
              <View style={[styles.barraPreenchida, { width: `${d.progresso}%` }]} />
            </View>

            <View style={styles.linhaStats}>
              <Text style={styles.stat}>🙏 {d.pedidosAbertos} pedido(s) aberto(s)</Text>
              <Text style={styles.stat}>🤝 {d.acolhimentosAbertos} acolhimento(s) aberto(s)</Text>
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
  aviso: { fontSize: 12, color: cores.cinzaClaro, marginBottom: 18, lineHeight: 17 },
  cardDevocional: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 18,
    marginBottom: 22,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  linhaDiaAtual: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  diaAtualLabel: { fontSize: 13, fontWeight: '700', color: cores.bordo },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  stepperBotao: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: cores.ouro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBotaoTexto: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 20 },
  stepperValor: { fontSize: 18, fontWeight: '700', color: cores.bordo, minWidth: 24, textAlign: 'center' },
  subLabel: { fontSize: 13, fontWeight: '700', color: cores.bordo, marginTop: 4, marginBottom: 8 },
  ajudaTexto: { fontSize: 12, color: cores.cinzaClaro, lineHeight: 16, marginBottom: 8, marginTop: -4 },
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
  inputMultilinha: { minHeight: 90, textAlignVertical: 'top' },
  botaoPublicar: { backgroundColor: cores.ouro, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoPublicarTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  listaDias: { marginTop: 16 },
  diaLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    gap: 8,
  },
  diaLinhaTexto: { flex: 1, fontSize: 13, color: cores.cinzaTexto },
  diaLinhaRemover: { fontSize: 12, fontWeight: '700', color: cores.rosa },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
  },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  nome: { fontSize: 16, fontWeight: '700', color: cores.bordo },
  badgeFrequencia: { backgroundColor: '#e7f2e9', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8 },
  badgeFrequenciaAlerta: { backgroundColor: '#fbe9e7' },
  badgeFrequenciaTexto: { fontSize: 11, fontWeight: '700', color: '#3f6b48' },
  trilhaLabel: { fontSize: 13, color: cores.cinzaTexto, marginBottom: 6 },
  barraFundo: { height: 6, borderRadius: 3, backgroundColor: cores.cremeCard, overflow: 'hidden', marginBottom: 10 },
  barraPreenchida: { height: 6, borderRadius: 3, backgroundColor: cores.ouro },
  linhaStats: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { fontSize: 12, color: cores.ouroEscuro },
});
