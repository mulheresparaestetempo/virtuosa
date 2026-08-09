import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { cores, fontes, raios, sombra } from '../theme';
import type { VidaDevocionalStackParamList } from '../navigation/VidaDevocionalStack';
import { diaDoPlano, planoPadrao } from '../data/devocional';

type Props = NativeStackScreenProps<VidaDevocionalStackParamList, 'VidaDevocionalHub'>;

const itens: { rota: keyof VidaDevocionalStackParamList; titulo: string; emoji: string; descricao: string }[] = [
  { rota: 'LugarSecretoDetail', titulo: 'Seu Lugar Secreto', emoji: '🕊️', descricao: 'Entre, desacelere e permaneça com Deus.' },
  { rota: 'VersiculoDia', titulo: 'Versículo do Dia', emoji: '✦', descricao: 'Uma Palavra para levar com você.' },
  { rota: 'CartinhaPai', titulo: 'Cartinha de Abba', emoji: '♡', descricao: 'Uma mensagem de amor e cuidado.' },
  { rota: 'Oracao', titulo: 'Minhas Orações', emoji: '🤍', descricao: 'Pedidos, respostas e momentos de oração.' },
  { rota: 'Gratidao', titulo: 'Gratidão', emoji: '🌷', descricao: 'Registre aquilo pelo que seu coração agradece.' },
  { rota: 'Diario', titulo: 'Diário Espiritual', emoji: '✎', descricao: 'Guarde o que Deus falou ao seu coração.' },
  { rota: 'Jornadas', titulo: 'Jornadas', emoji: '🌱', descricao: 'Caminhos de crescimento espiritual.' },
  { rota: 'Biblia', titulo: 'Bíblia', emoji: '▤', descricao: 'Leia, pesquise, marque e favorite.' },
  { rota: 'Jejum', titulo: 'Jejum', emoji: '🙏', descricao: 'Separe um tempo intencional para buscar a Deus.' },
  { rota: 'AssistenteBiblica', titulo: 'Assistente Bíblica', emoji: '⌕', descricao: 'Encontre temas e referências na Palavra.' },
];

export default function VidaDevocionalScreen({ navigation }: Props) {
  const devocional = diaDoPlano(planoPadrao);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>VIDA DEVOCIONAL</Text>
        <Text style={styles.titulo}>Um encontro com Abba.</Text>
        <Text style={styles.subtitulo}>Um espaço para parar, ouvir, conversar e permanecer.</Text>

        <View style={styles.destaque}>
          <View style={styles.pill}><Text style={styles.pillText}>DEVOCIONAL DE HOJE · DIA {devocional.dia}</Text></View>
          <Text style={styles.destaqueTitulo}>{devocional.titulo}</Text>
          <Text style={styles.versiculo}>{devocional.versiculo}</Text>
          <Text style={styles.resumo}>{devocional.resumo}</Text>
          <TouchableOpacity style={styles.botao} activeOpacity={0.86} onPress={() => navigation.navigate('LugarSecretoDetail')}>
            <Text style={styles.botaoTexto}>Começar meu devocional</Text>
            <Text style={styles.botaoSeta}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitulo}>Minha vida com Deus</Text>
          <Text style={styles.sectionDescricao}>Escolha o que seu coração precisa hoje.</Text>
        </View>

        {itens.map((item) => (
          <TouchableOpacity key={item.rota} style={styles.card} activeOpacity={0.86} onPress={() => navigation.navigate(item.rota)}>
            <View style={styles.icone}><Text style={styles.iconeTexto}>{item.emoji}</Text></View>
            <View style={styles.cardTexto}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardDescricao}>{item.descricao}</Text>
            </View>
            <Text style={styles.seta}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.rodape}>
          <Text style={styles.rodapeTitulo}>“Permaneça. Deus também está aqui.”</Text>
          <Text style={styles.rodapeTexto}>Todos os dias, um encontro com Abba.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 44 },
  eyebrow: { fontSize: 10, letterSpacing: 2, fontFamily: fontes.rotuloMedio, color: cores.ouroEscuro, marginBottom: 7 },
  titulo: { fontSize: 30, lineHeight: 36, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 5 },
  subtitulo: { fontSize: 13, lineHeight: 20, fontFamily: fontes.texto, color: cores.cinzaClaro, marginBottom: 22, maxWidth: 340 },
  destaque: { backgroundColor: cores.cremeCard, borderRadius: 24, borderWidth: 1, borderColor: cores.bordaCard, padding: 20, marginBottom: 26, ...sombra },
  pill: { alignSelf: 'flex-start', backgroundColor: cores.roseClaro, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 6, marginBottom: 14 },
  pillText: { fontSize: 9, letterSpacing: 1, fontFamily: fontes.rotuloMedio, color: cores.bordo },
  destaqueTitulo: { fontSize: 24, lineHeight: 30, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 10 },
  versiculo: { fontSize: 15, lineHeight: 23, fontFamily: fontes.versiculo, fontStyle: 'italic', color: cores.olivaEscuro, marginBottom: 12 },
  resumo: { fontSize: 13, lineHeight: 20, fontFamily: fontes.texto, color: cores.cinzaTexto, marginBottom: 18 },
  botao: { minHeight: 48, borderRadius: raios.botao, backgroundColor: cores.bordo, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  botaoTexto: { color: '#fff', fontFamily: fontes.rotuloMedio, fontSize: 13 },
  botaoSeta: { color: cores.dourado, fontSize: 18 },
  sectionHeader: { marginBottom: 13 },
  sectionTitulo: { fontSize: 20, fontFamily: fontes.titulo, color: cores.bordo },
  sectionDescricao: { fontSize: 12, fontFamily: fontes.texto, color: cores.cinzaClaro, marginTop: 3 },
  card: { minHeight: 76, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 13, marginBottom: 10, ...sombra },
  icone: { width: 48, height: 48, borderRadius: 24, backgroundColor: cores.creme, alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  iconeTexto: { fontSize: 21, color: cores.bordo },
  cardTexto: { flex: 1 },
  cardTitulo: { fontSize: 14, fontFamily: fontes.textoForte, color: cores.bordo, marginBottom: 3 },
  cardDescricao: { fontSize: 11.5, lineHeight: 17, fontFamily: fontes.texto, color: cores.cinzaClaro },
  seta: { fontSize: 24, color: cores.ouroEscuro, marginLeft: 8 },
  rodape: { alignItems: 'center', paddingTop: 20 },
  rodapeTitulo: { fontSize: 15, fontFamily: fontes.versiculo, fontStyle: 'italic', color: cores.bordo, textAlign: 'center' },
  rodapeTexto: { fontSize: 10, fontFamily: fontes.rotulo, color: cores.cinzaClaro, marginTop: 6 },
});
