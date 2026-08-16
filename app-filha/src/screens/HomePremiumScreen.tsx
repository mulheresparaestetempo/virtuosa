import { useMemo, useState } from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { ministerio } from '../data/ministerio';
import { diaDoPlano, planoPadrao } from '../data/devocional';
import LouvorAberturaPlayer from '../components/LouvorAberturaPlayer';

const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

export default function HomePremiumScreen() {
  const [gratidao, setGratidao] = useState(false);
  const [oracao, setOracao] = useState(false);
  const conteudo = useMemo(() => diaDoPlano(planoPadrao), []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topo}>
          <View>
            <Text style={styles.eyebrow}>FILHAS VIRTUOSAS</Text>
            <Text style={styles.saudacao}>Bom dia, filha. 🕊️</Text>
            <Text style={styles.data}>{hoje}</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>♡</Text></View>
        </View>

        <View style={styles.cardHero}>
          <Text style={styles.labelDourado}>PALAVRA PARA HOJE</Text>
          <Text style={styles.versiculo}>{conteudo.versiculo}</Text>
          <View style={styles.divisor} />
          <Text style={styles.heroTitulo}>{conteudo.titulo}</Text>
          <Text style={styles.heroTexto}>{conteudo.resumo}</Text>
          <TouchableOpacity style={styles.botaoDourado} activeOpacity={0.85}>
            <Text style={styles.botaoDouradoTexto}>Entrar no meu lugar secreto</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <LouvorAberturaPlayer />

        <Text style={styles.tituloSecao}>Hoje com Abba</Text>
        <View style={styles.grade}>
          <TouchableOpacity style={styles.miniCard} onPress={() => setOracao(!oracao)}>
            <Text style={styles.icone}>🙏</Text>
            <Text style={styles.miniTitulo}>Oração guiada</Text>
            <Text style={styles.miniTexto}>{oracao ? 'Seu momento começou.' : '5 minutos com Ele'}</Text>
            <Text style={styles.link}>{oracao ? 'Em oração' : 'Começar →'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.miniCard} onPress={() => setGratidao(!gratidao)}>
            <Text style={styles.icone}>🌱</Text>
            <Text style={styles.miniTitulo}>Desafio do dia</Text>
            <Text style={styles.miniTexto}>{gratidao ? '3 motivos registrados ✓' : 'Escreva 3 motivos de gratidão'}</Text>
            <Text style={styles.link}>{gratidao ? 'Concluído' : 'Fazer agora →'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartaCard}>
          <Text style={styles.cartaLabel}>💌 CARTINHA DE ABBA</Text>
          <Text style={styles.cartaTitulo}>“Filha, Eu estou aqui.”</Text>
          <Text style={styles.cartaTexto}>Você não precisa carregar tudo sozinha. Hoje, desacelere. Respire. Entregue a Mim aquilo que você não consegue resolver e permita que a Minha presença seja o seu descanso.</Text>
          <Text style={styles.assinatura}>Com amor, Abba 🤍</Text>
        </View>

        <View style={styles.progressoCard}>
          <View style={styles.progressoTopo}>
            <View>
              <Text style={styles.progressoLabel}>MINHA CAMINHADA</Text>
              <Text style={styles.progressoTitulo}>Um dia de cada vez.</Text>
            </View>
            <Text style={styles.diaNumero}>01</Text>
          </View>
          <View style={styles.barra}><View style={styles.barraAtiva} /></View>
          <Text style={styles.progressoTexto}>Continue cultivando sua intimidade com Deus.</Text>
        </View>

        <Text style={styles.tituloSecao}>Comunidade e cuidado</Text>
        <TouchableOpacity style={styles.listaCard} onPress={() => Linking.openURL(ministerio.whatsapp)}>
          <View style={styles.listaIcone}><Text>💬</Text></View>
          <View style={styles.listaCentro}><Text style={styles.listaTitulo}>Grupo das Filhas Virtuosas</Text><Text style={styles.listaTexto}>Caminhe acompanhada.</Text></View>
          <Text style={styles.seta}>›</Text>
        </TouchableOpacity>
        <View style={styles.dupla}>
          <TouchableOpacity style={styles.acaoPequena}><Text style={styles.acaoEmoji}>📖</Text><Text style={styles.acaoTitulo}>Biblioteca</Text><Text style={styles.acaoTexto}>Palavras para sua jornada</Text></TouchableOpacity>
          <TouchableOpacity style={styles.acaoPequena} onPress={() => Linking.openURL(ministerio.instagram)}><Text style={styles.acaoEmoji}>🌷</Text><Text style={styles.acaoTitulo}>Ministério</Text><Text style={styles.acaoTexto}>Vida em comunidade</Text></TouchableOpacity>
        </View>

        <Text style={styles.rodape}>Você é filha. Você é amada. Você não está sozinha. 🤍</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 48 },
  topo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  eyebrow: { fontSize: 10, letterSpacing: 1.8, color: cores.ouroEscuro, fontFamily: fontes.rotulo, marginBottom: 5 },
  saudacao: { fontSize: 31, lineHeight: 37, color: cores.bordo, fontFamily: fontes.tituloPrincipal },
  data: { marginTop: 4, fontSize: 13, color: cores.cinzaClaro, fontFamily: fontes.texto, textTransform: 'capitalize' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: cores.roseClaro, borderWidth: 1, borderColor: cores.bordaCard, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, color: cores.ouroEscuro },
  cardHero: { backgroundColor: cores.cremeCard, borderRadius: raios.card, padding: 24, borderWidth: 1, borderColor: cores.bordaCard, ...sombra, marginBottom: 24 },
  labelDourado: { fontSize: 10, letterSpacing: 1.3, color: cores.ouroEscuro, fontFamily: fontes.rotulo, marginBottom: 12 },
  versiculo: { fontSize: 18, lineHeight: 26, color: cores.ouroEscuro, fontFamily: fontes.versiculo },
  divisor: { width: 42, height: 1, backgroundColor: cores.dourado, marginVertical: 15 },
  heroTitulo: { fontSize: 25, color: cores.bordo, fontFamily: fontes.titulo, marginBottom: 8 },
  heroTexto: { fontSize: 14, lineHeight: 22, color: cores.cinzaTexto, fontFamily: fontes.texto, marginBottom: 18 },
  botaoDourado: { backgroundColor: cores.dourado, borderRadius: raios.botao, paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  botaoDouradoTexto: { color: '#fff', fontFamily: fontes.rotulo, fontSize: 14 },
  chevron: { color: '#fff', fontSize: 22, marginLeft: 7, lineHeight: 20 },
  tituloSecao: { fontSize: 20, color: cores.bordo, fontFamily: fontes.titulo, marginBottom: 12, marginTop: 2 },
  grade: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  miniCard: { flex: 1, minHeight: 154, backgroundColor: '#fff', borderRadius: raios.card, padding: 17, borderWidth: 1, borderColor: cores.borda, ...sombra },
  icone: { fontSize: 25, marginBottom: 12 },
  miniTitulo: { fontSize: 15, color: cores.bordo, fontFamily: fontes.textoForte, marginBottom: 5 },
  miniTexto: { fontSize: 12, lineHeight: 18, color: cores.cinzaClaro, fontFamily: fontes.texto, flex: 1 },
  link: { fontSize: 12, color: cores.ouroEscuro, fontFamily: fontes.rotulo, marginTop: 10 },
  cartaCard: { backgroundColor: '#fff', borderRadius: raios.card, padding: 22, borderWidth: 1, borderColor: cores.bordaCard, marginBottom: 24 },
  cartaLabel: { fontSize: 10, letterSpacing: 1.1, color: cores.ouroEscuro, fontFamily: fontes.rotulo, marginBottom: 10 },
  cartaTitulo: { fontSize: 22, color: cores.bordo, fontFamily: fontes.titulo, marginBottom: 9 },
  cartaTexto: { fontSize: 14, lineHeight: 22, color: cores.cinzaTexto, fontFamily: fontes.texto },
  assinatura: { marginTop: 15, fontSize: 13, color: cores.ouroEscuro, fontFamily: fontes.versiculo },
  progressoCard: { backgroundColor: cores.bordo, borderRadius: raios.card, padding: 22, marginBottom: 26 },
  progressoTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressoLabel: { fontSize: 10, letterSpacing: 1.2, color: cores.nude, fontFamily: fontes.rotulo },
  progressoTitulo: { fontSize: 20, color: '#fff', fontFamily: fontes.titulo, marginTop: 4 },
  diaNumero: { fontSize: 30, color: cores.dourado, fontFamily: fontes.tituloPrincipal },
  barra: { height: 5, backgroundColor: '#56504d', borderRadius: 4, marginTop: 18 },
  barraAtiva: { width: '8%', height: 5, borderRadius: 4, backgroundColor: cores.dourado },
  progressoTexto: { fontSize: 12, color: '#ddd', fontFamily: fontes.texto, marginTop: 10 },
  listaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: raios.card, padding: 16, borderWidth: 1, borderColor: cores.borda, marginBottom: 12, ...sombra },
  listaIcone: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#eaf2e3', alignItems: 'center', justifyContent: 'center' },
  listaCentro: { flex: 1, marginLeft: 12 },
  listaTitulo: { fontSize: 14, color: cores.bordo, fontFamily: fontes.textoForte },
  listaTexto: { fontSize: 12, color: cores.cinzaClaro, fontFamily: fontes.texto, marginTop: 2 },
  seta: { fontSize: 23, color: cores.ouroEscuro },
  dupla: { flexDirection: 'row', gap: 12 },
  acaoPequena: { flex: 1, backgroundColor: cores.roseClaro, borderRadius: raios.card, padding: 18, minHeight: 135 },
  acaoEmoji: { fontSize: 23, marginBottom: 12 },
  acaoTitulo: { fontSize: 15, color: cores.bordo, fontFamily: fontes.textoForte, marginBottom: 5 },
  acaoTexto: { fontSize: 12, lineHeight: 17, color: cores.cinzaClaro, fontFamily: fontes.texto },
  rodape: { textAlign: 'center', marginTop: 28, color: cores.ouroEscuro, fontFamily: fontes.versiculo, fontSize: 16, lineHeight: 23 },
});
