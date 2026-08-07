import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';

type Local = {
  tipo: 'Igreja' | 'Célula' | 'Culto no lar' | 'Conferência';
  nome: string;
  endereco: string;
};

const locais: Local[] = [
  { tipo: 'Igreja', nome: 'PIBAM Espraiado', endereco: 'Bairro Espraiado, sede da igreja' },
  { tipo: 'Célula', nome: 'Célula Vinho Novo', endereco: 'Casa da Ana Paula — quintas, 20h' },
  { tipo: 'Célula', nome: 'Célula Águas Vivas', endereco: 'Casa da Mariana — terças, 19h30' },
  { tipo: 'Culto no lar', nome: 'Culto no lar da Beatriz', endereco: 'Confirmar endereço com a líder' },
  { tipo: 'Conferência', nome: 'Congresso Abba Virtuosa 2026', endereco: 'Centro de Convenções' },
];

function abrirNoMapa(endereco: string) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
  Linking.openURL(url);
}

export default function MapaScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.aviso}>
          Lista de locais neste protótipo — uma versão futura pode trazer um mapa interativo
          dentro do app.
        </Text>

        {locais.map((local) => (
          <View key={local.nome} style={styles.card}>
            <Text style={styles.tipo}>{local.tipo}</Text>
            <Text style={styles.nome}>{local.nome}</Text>
            <Text style={styles.endereco}>{local.endereco}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => abrirNoMapa(local.endereco)}>
              <Text style={styles.botaoTexto}>📍 Abrir no mapa</Text>
            </TouchableOpacity>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
  },
  tipo: { fontSize: 11, fontWeight: '700', color: cores.ouroEscuro, textTransform: 'uppercase', marginBottom: 4 },
  nome: { fontSize: 16, fontWeight: '700', color: cores.bordo, marginBottom: 4 },
  endereco: { fontSize: 13, color: cores.cinzaTexto, marginBottom: 10 },
  botao: {
    alignSelf: 'flex-start',
    backgroundColor: cores.cremeCard,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  botaoTexto: { fontSize: 13, fontWeight: '700', color: cores.ouroEscuro },
});
