import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores } from '../theme';

const hoje = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const devocionalDoDia = {
  titulo: 'Descanso na Presença',
  versiculo: '"Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei." — Mateus 11:28',
  resumo:
    'Hoje o Pai te convida para um lugar secreto de descanso. Antes de correr para as tarefas do dia, pare, respire e entregue o seu cansaço a Ele.',
};

const secoes = [
  { emoji: '🎧', titulo: 'Áudio devocional', subtitulo: '8 min · narrado' },
  { emoji: '🙏', titulo: 'Oração guiada', subtitulo: '5 min · com a discipuladora Ana' },
  { emoji: '🌱', titulo: 'Desafio do dia', subtitulo: 'Escreva 3 motivos de gratidão' },
  { emoji: '💌', titulo: 'Cartinha do Pai', subtitulo: 'Uma palavra de amor para você' },
];

export default function LugarSecretoScreen() {
  const [musicaAtiva, setMusicaAtiva] = useState(false);
  const [orando, setOrando] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.saudacao}>Bem-vinda ao seu Lugar Secreto 🕊️</Text>
        <Text style={styles.data}>{hoje}</Text>

        <View style={styles.cardPrincipal}>
          <Text style={styles.tituloDevocional}>{devocionalDoDia.titulo}</Text>
          <Text style={styles.versiculo}>{devocionalDoDia.versiculo}</Text>
          <Text style={styles.resumo}>{devocionalDoDia.resumo}</Text>
          <TouchableOpacity style={styles.botaoPrimario}>
            <Text style={styles.botaoPrimarioTexto}>Ler devocional completo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grade}>
          {secoes.map((secao) => (
            <TouchableOpacity key={secao.titulo} style={styles.cardSecao}>
              <Text style={styles.cardEmoji}>{secao.emoji}</Text>
              <Text style={styles.cardTitulo}>{secao.titulo}</Text>
              <Text style={styles.cardSubtitulo}>{secao.subtitulo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.rodapeControles}>
          <TouchableOpacity
            style={[styles.controle, musicaAtiva && styles.controleAtivo]}
            onPress={() => setMusicaAtiva((v) => !v)}
          >
            <Text style={styles.controleEmoji}>🎵</Text>
            <Text style={styles.controleTexto}>
              {musicaAtiva ? 'Música ambiente ligada' : 'Música ambiente'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controle, orando && styles.controleAtivo]}
            onPress={() => setOrando((v) => !v)}
          >
            <Text style={styles.controleEmoji}>⏳</Text>
            <Text style={styles.controleTexto}>
              {orando ? 'Em tempo de oração...' : 'Iniciar tempo de oração'}
            </Text>
          </TouchableOpacity>
        </View>
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
  saudacao: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.bordo,
  },
  data: {
    fontSize: 14,
    color: cores.ouroEscuro,
    marginTop: 4,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  cardPrincipal: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  tituloDevocional: {
    fontSize: 20,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 8,
  },
  versiculo: {
    fontSize: 14,
    fontStyle: 'italic',
    color: cores.ouroEscuro,
    marginBottom: 12,
    lineHeight: 20,
  },
  resumo: {
    fontSize: 15,
    color: cores.cinzaTexto,
    lineHeight: 22,
    marginBottom: 16,
  },
  botaoPrimario: {
    backgroundColor: cores.ouro,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoPrimarioTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardSecao: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 2,
  },
  cardSubtitulo: {
    fontSize: 12,
    color: cores.cinzaClaro,
  },
  rodapeControles: {
    marginTop: 8,
    gap: 10,
  },
  controle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  controleAtivo: {
    backgroundColor: '#f3e3c7',
    borderColor: cores.rosa,
  },
  controleEmoji: {
    fontSize: 18,
    marginRight: 10,
  },
  controleTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.bordo,
  },
});
