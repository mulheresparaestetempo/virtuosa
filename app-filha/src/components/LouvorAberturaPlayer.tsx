import { useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import { ministerio } from '../data/ministerio';

export default function LouvorAberturaPlayer() {
  const player = useAudioPlayer(ministerio.louvorAbertura.audio);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    player.play();
  }, [player]);

  function alternar() {
    if (status.playing) {
      player.pause();
    } else {
      if (status.didJustFinish) player.seekTo(0);
      player.play();
    }
  }

  return (
    <TouchableOpacity style={styles.card} onPress={alternar} activeOpacity={0.85}>
      <View style={styles.iconeCirculo}>
        <Text style={styles.iconeTexto}>{status.playing ? '⏸' : '🎧'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.titulo}>Ouça o devocional de hoje</Text>
        <Text style={styles.subtitulo}>
          {status.playing ? 'Tocando agora...' : ministerio.louvorAbertura.titulo}
        </Text>
      </View>
      <Text style={styles.seta}>›</Text>
    </TouchableOpacity>
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
    gap: 12,
    shadowColor: '#3a2a1a',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconeCirculo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: cores.bordo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeTexto: { fontSize: 20 },
  titulo: { fontSize: 15, fontWeight: '700', color: cores.bordo },
  subtitulo: { fontSize: 12, color: cores.cinzaClaro, marginTop: 2 },
  seta: { fontSize: 22, color: cores.ouroEscuro },
});
