import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MaisStackParamList } from '../navigation/MaisStack';

type Props = NativeStackScreenProps<MaisStackParamList, 'MaisHub'>;

const itensDisponiveis: { rota: keyof MaisStackParamList; titulo: string; emoji: string; descricao: string }[] = [
  { rota: 'MinhaCaminhada', titulo: 'Minha Caminhada', emoji: '✨', descricao: 'Sua linha do tempo espiritual' },
  { rota: 'Memoriais', titulo: 'Memoriais', emoji: '🌸', descricao: 'Marcos da sua caminhada com Deus' },
  { rota: 'MinhaDiscipuladora', titulo: 'Minha Discipuladora', emoji: '👩🏻', descricao: 'Metas, conversas e próximo encontro' },
  { rota: 'Comunidade', titulo: 'Comunidade', emoji: '❤️', descricao: 'Pedidos de oração e testemunhos' },
  { rota: 'Acolhimento', titulo: 'Acolhimento', emoji: '🤝', descricao: 'Solicite visitas e cuidado pastoral' },
  { rota: 'Biblioteca', titulo: 'Biblioteca', emoji: '🎧', descricao: 'Devocionais, podcasts, estudos e mais' },
  { rota: 'Agenda', titulo: 'Agenda', emoji: '📅', descricao: 'Eventos, jejuns coletivos e Santa Ceia' },
];

const itensEmBreve = [
  { titulo: 'Assistente Bíblica', emoji: '🤖' },
  { titulo: 'Painel da Líder', emoji: '👩🏻‍💼' },
  { titulo: 'Painel da Igreja', emoji: '⛪' },
  { titulo: 'Mapa', emoji: '🗺️' },
  { titulo: 'Missões', emoji: '🌍' },
  { titulo: 'Perfil da Filha', emoji: '🌺' },
];

export default function MaisScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Mais 🌷</Text>

        {itensDisponiveis.map((item) => (
          <TouchableOpacity
            key={item.rota}
            style={styles.cardItem}
            onPress={() => navigation.navigate(item.rota)}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardDescricao}>{item.descricao}</Text>
            </View>
            <Text style={styles.seta}>›</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.secaoTitulo}>Em breve</Text>
        <View style={styles.gradeEmBreve}>
          {itensEmBreve.map((item) => (
            <View key={item.titulo} style={styles.cardEmBreve}>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <Text style={styles.cardEmBreveTitulo}>{item.titulo}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: '700', color: cores.bordo, marginBottom: 16 },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  cardEmoji: { fontSize: 24 },
  cardTitulo: { fontSize: 15, fontWeight: '700', color: cores.bordo },
  cardDescricao: { fontSize: 12, color: cores.cinzaClaro, marginTop: 2 },
  seta: { fontSize: 22, color: cores.ouroEscuro },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 10,
  },
  gradeEmBreve: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cardEmBreve: {
    width: '48%',
    backgroundColor: '#fdfaf0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    borderStyle: 'dashed',
    padding: 14,
    marginBottom: 12,
    opacity: 0.7,
  },
  cardEmBreveTitulo: { fontSize: 13, fontWeight: '600', color: cores.cinzaTexto, marginTop: 6 },
});
