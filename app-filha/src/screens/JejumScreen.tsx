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
import { cores, fontes, raios, sombra } from '../theme';

type TipoJejum = 'parcial' | 'daniel' | 'personalizado';

const tipos: { valor: TipoJejum; label: string; descricao: string }[] = [
  { valor: 'parcial', label: 'Jejum Parcial', descricao: 'Sem alimentos sólidos, bebidas permitidas' },
  { valor: 'daniel', label: 'Jejum de Daniel', descricao: 'Alimentos naturais, sem processados' },
  { valor: 'personalizado', label: 'Personalizado', descricao: 'Crie seu próprio jejum' },
];

export default function JejumScreen() {
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoJejum>('parcial');
  const [objetivo, setObjetivo] = useState('');
  const [versiculo, setVersiculo] = useState('');
  const [dias, setDias] = useState('7');
  const [horaInicio, setHoraInicio] = useState('06:00');
  const [horaTermino, setHoraTermino] = useState('18:00');
  const [compartilhar, setCompartilhar] = useState(false);
  const [salvo, setSalvo] = useState(false);

  function iniciarJejum() {
    if (!objetivo.trim() || !dias.trim()) {
      return;
    }
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>🙏 Iniciar um Jejum</Text>
        <Text style={styles.subtitulo}>Tempo dedicado para buscar a Deus</Text>

        {/* Seleção de Tipo */}
        <Text style={styles.secaoTitulo}>Tipo de Jejum</Text>
        <View style={styles.tiposContainer}>
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo.valor}
              style={[
                styles.tipoCard,
                tipoSelecionado === tipo.valor && styles.tipoCardSelecionado,
              ]}
              onPress={() => setTipoSelecionado(tipo.valor)}
            >
              <Text style={styles.tipoLabel}>{tipo.label}</Text>
              <Text style={styles.tipoDescricao}>{tipo.descricao}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Propósito */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Objetivo do Jejum</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Buscar direção, cura, perseverança..."
            placeholderTextColor={cores.cinzaClaro}
            value={objetivo}
            onChangeText={setObjetivo}
            multiline
          />
        </View>

        {/* Versículo */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Versículo (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mateus 6:17-18"
            placeholderTextColor={cores.cinzaClaro}
            value={versiculo}
            onChangeText={setVersiculo}
          />
        </View>

        {/* Duração */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Duração</Text>
          <View style={styles.linhaInput}>
            <View style={styles.inputGrupo}>
              <Text style={styles.labelPequeno}>Dias</Text>
              <TextInput
                style={styles.inputPequeno}
                placeholder="7"
                placeholderTextColor={cores.cinzaClaro}
                value={dias}
                onChangeText={setDias}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>

        {/* Horários */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Horários Diários</Text>
          <View style={styles.linhaHorarios}>
            <View style={styles.horarioGrupo}>
              <Text style={styles.labelPequeno}>Início</Text>
              <TextInput
                style={styles.inputHorario}
                placeholder="06:00"
                placeholderTextColor={cores.cinzaClaro}
                value={horaInicio}
                onChangeText={setHoraInicio}
              />
            </View>
            <Text style={styles.separador}>até</Text>
            <View style={styles.horarioGrupo}>
              <Text style={styles.labelPequeno}>Término</Text>
              <TextInput
                style={styles.inputHorario}
                placeholder="18:00"
                placeholderTextColor={cores.cinzaClaro}
                value={horaTermino}
                onChangeText={setHoraTermino}
              />
            </View>
          </View>
        </View>

        {/* Compartilhar */}
        <TouchableOpacity
          style={styles.compartilharToggle}
          onPress={() => setCompartilhar(!compartilhar)}
        >
          <Text style={styles.compartilharEmoji}>{compartilhar ? '✓' : '○'}</Text>
          <Text style={styles.compartilharTexto}>
            Compartilhar com minha líder ou discipuladora
          </Text>
        </TouchableOpacity>

        {compartilhar && (
          <View style={styles.aviso}>
            <Text style={styles.avisoTexto}>
              ✓ Sua líder será notificada e poderá acompanhar seu jejum
            </Text>
          </View>
        )}

        {/* Botão Iniciar */}
        <TouchableOpacity style={styles.botaoIniciar} onPress={iniciarJejum}>
          <Text style={styles.botaoIniciarTexto}>
            {salvo ? '✓ Jejum iniciado!' : '🙏 Iniciar Jejum'}
          </Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.cardInfo}>
          <Text style={styles.infoTitulo}>💡 Dica Espiritual</Text>
          <Text style={styles.infoTexto}>
            O jejum não é para impressionar a Deus, mas para criar espaço para ouvi-Lo. Durante este
            tempo, use as horas que economizaria com comida para oração, leitura da Palavra e reflexão.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: {
    fontSize: 28,
    fontFamily: fontes.titulo,
    color: cores.bordo,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginBottom: 24,
  },
  secaoTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  tiposContainer: {
    gap: 12,
    marginBottom: 24,
  },
  tipoCard: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  tipoCardSelecionado: {
    backgroundColor: cores.rosa,
    borderColor: cores.rosa,
  },
  tipoLabel: {
    fontSize: 15,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    marginBottom: 4,
  },
  tipoDescricao: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  secao: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  linhaInput: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGrupo: {
    flex: 1,
  },
  labelPequeno: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginBottom: 6,
  },
  inputPequeno: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 10,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
  },
  linhaHorarios: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  horarioGrupo: {
    flex: 1,
  },
  inputHorario: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 10,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
  },
  separador: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginBottom: 8,
  },
  compartilharToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.botao,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    gap: 12,
  },
  compartilharEmoji: {
    fontSize: 18,
  },
  compartilharTexto: {
    flex: 1,
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.bordo,
  },
  aviso: {
    backgroundColor: '#E8F5E9',
    borderRadius: raios.campo,
    padding: 12,
    marginBottom: 20,
  },
  avisoTexto: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: '#2E7D32',
  },
  botaoIniciar: {
    backgroundColor: cores.dourado,
    paddingVertical: 14,
    borderRadius: raios.botao,
    alignItems: 'center',
    marginBottom: 24,
  },
  botaoIniciarTexto: {
    color: '#fff',
    fontFamily: fontes.rotulo,
    fontSize: 15,
  },
  cardInfo: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  infoTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginBottom: 8,
  },
  infoTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    lineHeight: 20,
  },
});
