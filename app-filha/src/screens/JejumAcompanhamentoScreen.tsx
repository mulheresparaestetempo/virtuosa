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

export default function JejumAcompanhamentoScreen() {
  const [tempoDecorrido, setTempoDecorrido] = useState({ horas: 12, minutos: 45 });
  const [diasConcluidos, setDiasConcluidos] = useState(3);
  const [diasRestantes, setDiasRestantes] = useState(4);
  const [reflexao, setReflexao] = useState('');
  const [registrado, setRegistrado] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoDecorrido((prev) => {
        if (prev.minutos < 59) {
          return { ...prev, minutos: prev.minutos + 1 };
        }
        if (prev.horas < 23) {
          return { horas: prev.horas + 1, minutos: 0 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  function registrarExperiencia() {
    if (!reflexao.trim()) return;
    setRegistrado(true);
    setTimeout(() => setRegistrado(false), 2000);
  }

  const percentualProgresso = (diasConcluidos / (diasConcluidos + diasRestantes)) * 100;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>🙏 Seu Jejum em Andamento</Text>

        {/* Cronômetro Elegante */}
        <View style={styles.cronometro}>
          <View style={styles.cronometroDisplay}>
            <Text style={styles.cronometroHoras}>{String(tempoDecorrido.horas).padStart(2, '0')}</Text>
            <Text style={styles.cronometroSeparador}>:</Text>
            <Text style={styles.cronometroMinutos}>
              {String(tempoDecorrido.minutos).padStart(2, '0')}
            </Text>
          </View>
          <Text style={styles.cronometroLabel}>Horas decorridas hoje</Text>
        </View>

        {/* Cards de Progresso */}
        <View style={styles.cardsProgresso}>
          <View style={styles.cardStat}>
            <Text style={styles.cardStatEmoji}>✓</Text>
            <Text style={styles.cardStatValor}>{diasConcluidos}</Text>
            <Text style={styles.cardStatLabel}>Dias Concluídos</Text>
          </View>

          <View style={styles.cardStat}>
            <Text style={styles.cardStatEmoji}>⏳</Text>
            <Text style={styles.cardStatValor}>{diasRestantes}</Text>
            <Text style={styles.cardStatLabel}>Dias Restantes</Text>
          </View>
        </View>

        {/* Barra de Progresso */}
        <View style={styles.barraContainer}>
          <View style={styles.barraFundo}>
            <View style={[styles.barraPreenchida, { width: `${percentualProgresso}%` }]} />
          </View>
          <Text style={styles.barraTexto}>{Math.round(percentualProgresso)}% concluído</Text>
        </View>

        {/* Versículo do Jejum */}
        <View style={styles.cardVersiculo}>
          <Text style={styles.versiculoTexto}>
            "Mas quando jejuarem, perfumem a cabeça e lavem o rosto, para não parecer aos homens que
            jejuam, mas ao vosso Pai, que está em secreto; e vosso Pai, que vê em secreto, vos há de
            recompensar."
          </Text>
          <Text style={styles.versiculoReferencia}>Mateus 6:17-18</Text>
        </View>

        {/* Campo de Reflexão */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>📝 Registrar Experiência</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Como você está se sentindo? O que Deus está falando? Quais desafios você está enfrentando?"
            placeholderTextColor={cores.cinzaClaro}
            value={reflexao}
            onChangeText={setReflexao}
            multiline
          />
          <TouchableOpacity
            style={[styles.botaoRegistrar, registrado && styles.botaoRegistrarSucesso]}
            onPress={registrarExperiencia}
          >
            <Text style={styles.botaoRegistrarTexto}>
              {registrado ? '✓ Registrado!' : 'Registrar Reflexão'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dicas */}
        <View style={styles.cardDicas}>
          <Text style={styles.dicasTitulo}>💡 Dicas para Manter-se Firme</Text>
          <View style={styles.dica}>
            <Text style={styles.dicaEmoji}>🙏</Text>
            <Text style={styles.dicaTexto}>Reserve tempo extra de oração</Text>
          </View>
          <View style={styles.dica}>
            <Text style={styles.dicaEmoji}>📖</Text>
            <Text style={styles.dicaTexto}>Leia a Palavra com propósito</Text>
          </View>
          <View style={styles.dica}>
            <Text style={styles.dicaEmoji}>💧</Text>
            <Text style={styles.dicaTexto}>Mantenha-se hidratada (se for jejum parcial)</Text>
          </View>
          <View style={styles.dica}>
            <Text style={styles.dicaEmoji}>📱</Text>
            <Text style={styles.dicaTexto}>Reduzir tempo nas redes sociais</Text>
          </View>
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
    marginBottom: 24,
  },
  cronometro: {
    backgroundColor: cores.dourado,
    borderRadius: raios.card,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
    ...sombra,
  },
  cronometroDisplay: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cronometroHoras: {
    fontSize: 64,
    fontFamily: fontes.tituloPrincipal,
    color: '#fff',
    fontWeight: 'bold',
  },
  cronometroSeparador: {
    fontSize: 48,
    color: '#fff',
    marginHorizontal: 8,
  },
  cronometroMinutos: {
    fontSize: 64,
    fontFamily: fontes.tituloPrincipal,
    color: '#fff',
    fontWeight: 'bold',
  },
  cronometroLabel: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardsProgresso: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  cardStat: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra,
  },
  cardStatEmoji: { fontSize: 24, marginBottom: 8 },
  cardStatValor: {
    fontSize: 28,
    fontFamily: fontes.tituloPrincipal,
    color: cores.dourado,
    marginBottom: 4,
  },
  cardStatLabel: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  barraContainer: {
    marginBottom: 24,
  },
  barraFundo: {
    height: 8,
    backgroundColor: cores.borda,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barraPreenchida: {
    height: '100%',
    backgroundColor: cores.dourado,
  },
  barraTexto: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textAlign: 'right',
  },
  cardVersiculo: {
    backgroundColor: cores.rosa,
    borderRadius: raios.card,
    padding: 20,
    marginBottom: 24,
  },
  versiculoTexto: {
    fontSize: 15,
    fontFamily: fontes.texto,
    color: cores.olivaEscuro,
    lineHeight: 24,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  versiculoReferencia: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.olivaEscuro,
    textAlign: 'right',
  },
  secao: {
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
  textarea: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  botaoRegistrar: {
    backgroundColor: cores.rosa,
    paddingVertical: 12,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoRegistrarSucesso: {
    backgroundColor: '#E8F5E9',
  },
  botaoRegistrarTexto: {
    color: cores.olivaEscuro,
    fontFamily: fontes.rotulo,
    fontSize: 14,
  },
  cardDicas: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  dicasTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginBottom: 12,
  },
  dica: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  dicaEmoji: { fontSize: 18 },
  dicaTexto: {
    flex: 1,
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
  },
});
