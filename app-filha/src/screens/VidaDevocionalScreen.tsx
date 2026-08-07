import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { VidaDevocionalStackParamList } from '../navigation/VidaDevocionalStack';

type Props = NativeStackScreenProps<VidaDevocionalStackParamList, 'VidaDevocionalHub'>;

const itens: { rota: keyof VidaDevocionalStackParamList; titulo: string; emoji: string; descricao: string }[] = [
  { rota: 'LugarSecretoDetail', titulo: 'Seu Lugar Secreto', emoji: '🕊️', descricao: 'Espaço de meditação e reflexão' },
  { rota: 'VersiculoDia', titulo: 'Versículo do Dia', emoji: '✝️', descricao: 'Reflexão e aplicação prática' },
  { rota: 'CartinhaPai', titulo: 'Cartinha do Pai', emoji: '💌', descricao: 'Uma palavra de amor especial' },
  { rota: 'Jejum', titulo: 'Iniciar um Jejum', emoji: '🙏', descricao: 'Tempo dedicado para buscar a Deus' },
  { rota: 'JejumAcompanhamento', titulo: 'Seu Jejum em Andamento', emoji: '⏳', descricao: 'Cronômetro e progresso' },
  { rota: 'Oracao', titulo: 'Minhas Orações', emoji: '🤲', descricao: 'Pedidos, categorias e respostas' },
  { rota: 'Gratidao', titulo: 'Gratidão', emoji: '🌸', descricao: 'Cultive flores de gratidão' },
  { rota: 'Biblia', titulo: 'Bíblia', emoji: '📖', descricao: 'Leitura, pesquisa, marcações e favoritos' },
  { rota: 'Diario', titulo: 'Diário Espiritual', emoji: '📔', descricao: 'O que Deus falou, sonhos e insights' },
  { rota: 'Jornadas', titulo: 'Jornadas', emoji: '🌱', descricao: 'Trilhas de crescimento espiritual' },
  { rota: 'AssistenteBiblica', titulo: 'Assistente Bíblica', emoji: '🤖', descricao: 'Busca por tema na Palavra' },
];

export default function VidaDevocionalScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Vida Devocional 🙏</Text>
        <Text style={styles.subtitulo}>Oração, Palavra e crescimento — no seu tempo com Deus.</Text>

        {itens.map((item) => (
          <TouchableOpacity
            key={item.rota}
            style={styles.card}
            activeOpacity={0.85}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 26, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 4 },
  subtitulo: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaClaro, marginBottom: 18 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    ...sombra,
  },
  cardEmoji: { fontSize: 24 },
  cardTitulo: { fontSize: 15, fontFamily: fontes.textoForte, color: cores.bordo },
  cardDescricao: { fontSize: 12, fontFamily: fontes.texto, color: cores.cinzaClaro, marginTop: 2 },
  seta: { fontSize: 22, color: cores.ouroEscuro },
});
