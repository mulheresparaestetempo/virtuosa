import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import { ministerio } from '../data/ministerio';

export default function CabecalhoMinisterio() {
  return (
    <View style={styles.container}>
      <View style={styles.linhaTopo}>
        <Image source={ministerio.logo} style={styles.logo} />
        <View style={styles.textos}>
          <Text style={styles.nome}>{ministerio.nome}</Text>
          <Text style={styles.legenda}>Um lugar de cuidado, fé e comunidade</Text>
        </View>
      </View>

      <View style={styles.linhaLinks}>
        <TouchableOpacity
          style={[styles.botaoLink, styles.botaoWhatsapp]}
          onPress={() => Linking.openURL(ministerio.whatsapp)}
        >
          <Text style={styles.botaoLinkEmoji}>💬</Text>
          <Text style={styles.botaoLinkTexto}>Grupo do WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoLink, styles.botaoInstagram]}
          onPress={() => Linking.openURL(ministerio.instagram)}
        >
          <Text style={styles.botaoLinkEmoji}>📷</Text>
          <Text style={styles.botaoLinkTexto}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 22 },
  linhaTopo: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: cores.ouro,
    marginRight: 12,
  },
  textos: { flex: 1 },
  nome: { fontSize: 20, fontWeight: '700', color: cores.bordo },
  legenda: { fontSize: 12, color: cores.ouroEscuro, marginTop: 2 },
  linhaLinks: { flexDirection: 'row', gap: 10 },
  botaoLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    gap: 6,
  },
  botaoWhatsapp: { backgroundColor: '#25D366' },
  botaoInstagram: { backgroundColor: '#C13584' },
  botaoLinkEmoji: { fontSize: 15 },
  botaoLinkTexto: { color: '#fff', fontWeight: '700', fontSize: 12.5 },
});
