import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import { ministerio } from '../data/ministerio';

function formatarTempo(segundos: number) {
  const total = Math.max(0, Math.floor(segundos));
  const min = Math.floor(total / 60);
  const seg = total % 60;
  return `${min}:${seg.toString().padStart(2, '0')}`;
}

export default function LouvorAberturaPlayer() {
  const player = useAudioPlayer(ministerio.louvorAbertura.audio);
  const status = useAudioPlayerStatus(player);

  function alternar() {
    if (status.playing) {
      player.pause();
    } else {
      if (status.didJustFinish) player.seekTo(0);
      player.play();
    }
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.botaoPlay} onPress={alternar}>
        <Text style={styles.botaoPlayTexto}>{status.playing ? '⏸' : '▶'}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>Louvor de abertura</Text>
        <Text style={styles.titulo}>{ministerio.louvorAbertura.titulo}</Text>
      </View>
      <Text style={styles.tempo}>
        {formatarTempo(status.currentTime)} / {formatarTempo(status.duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 22,
    gap: 12,
    shadowColor: '#3a2a1a',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  botaoPlay: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: cores.bordo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPlayTexto: { color: '#fff', fontSize: 16 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titulo: { fontSize: 15, fontWeight: '700', color: cores.bordo, marginTop: 2 },
  tempo: { fontSize: 12, color: cores.cinzaClaro },
});
