import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar } from '../storage';
import { useAuth } from '../context/AuthContext';
import { firebaseConfigurado } from '../firebase';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PerfilStackParamList } from '../navigation/PerfilStack';

type Props = NativeStackScreenProps<PerfilStackParamList, 'Perfil'>;
const CHAVE_PERFIL = 'perfil_usuario';

type Perfil = {
  nome: string;
  emoji: string;
  igreja: string;
  lider: string;
  discipuladora: string;
  dataBatismo: string;
  dataConversao: string;
};

const perfilInicial: Perfil = {
  nome: 'Filha',
  emoji: '🌸',
  igreja: 'PIBAM Espraiado',
  lider: 'Não informado',
  discipuladora: 'Não informada',
  dataBatismo: 'Não informado',
  dataConversao: 'Não informado',
};

const itensComunidade: { titulo: string; chave: keyof Perfil; emoji: string }[] = [
  { titulo: 'Minha Igreja', chave: 'igreja', emoji: '⛪' },
  { titulo: 'Minha Líder', chave: 'lider', emoji: '👩🏻‍💼' },
  { titulo: 'Minha Discipuladora', chave: 'discipuladora', emoji: '👩🏻' },
];

const itensMenu: { titulo: string; rota: keyof PerfilStackParamList; emoji: string }[] = [
  { titulo: 'Minha Caminhada', rota: 'MinhaCaminhada', emoji: '✨' },
  { titulo: 'Memoriais', rota: 'Memoriais', emoji: '🌸' },
  { titulo: 'Minha Discipuladora', rota: 'MinhaDiscipuladora', emoji: '👩🏻' },
  { titulo: 'Acolhimento', rota: 'Acolhimento', emoji: '🤝' },
  { titulo: 'Agenda', rota: 'Agenda', emoji: '📅' },
];

export default function PerfilScreen({ navigation }: Props) {
  const { usuario, sair } = useAuth();
  const [perfil, setPerfil] = useState<Perfil>(perfilInicial);
  const [memoriais, setMemoriais] = useState(0);
  const [diario, setDiario] = useState(0);
  const [oracoes, setOracoes] = useState(0);

  useEffect(() => {
    Promise.all([
      carregar(CHAVE_PERFIL, perfilInicial),
      carregar<unknown[]>('memoriais', []),
      carregar<unknown[]>('diario_entradas', []),
      carregar<unknown[]>('minhas_oracoes', []),
    ]).then(([perfilSalvo, memoriaisSalvos, diarioSalvo, oracoesSalvas]) => {
      setPerfil(perfilSalvo);
      setMemoriais(memoriaisSalvos.length);
      setDiario(diarioSalvo.length);
      setOracoes(oracoesSalvas.length);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.fotoemoji}>{perfil.emoji}</Text>
          <Text style={styles.nome}>{perfil.nome}</Text>
          <Text style={styles.membraSince}>Sua caminhada com Abba</Text>
        </View>

        <Text style={styles.secaoTitulo}>Sua Comunidade</Text>
        {itensComunidade.map((item) => (
          <View key={item.chave} style={styles.cardComunidade}>
            <Text style={styles.cardComunidadeEmoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardComunidadeLabel}>{item.titulo}</Text>
              <Text style={styles.cardComunidadeValor}>{perfil[item.chave]}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.secaoTitulo}>Seus registros</Text>
        <View style={styles.estatisticasGrid}>
          <View style={styles.cardEstatistica}><Text style={styles.estatisticaEmoji}>🌸</Text><Text style={styles.estatisticaNumero}>{memoriais}</Text><Text style={styles.estatisticaLabel}>Memoriais</Text></View>
          <View style={styles.cardEstatistica}><Text style={styles.estatisticaEmoji}>📖</Text><Text style={styles.estatisticaNumero}>{diario}</Text><Text style={styles.estatisticaLabel}>Diário</Text></View>
          <View style={styles.cardEstatistica}><Text style={styles.estatisticaEmoji}>🤲</Text><Text style={styles.estatisticaNumero}>{oracoes}</Text><Text style={styles.estatisticaLabel}>Orações</Text></View>
        </View>

        <Text style={styles.secaoTitulo}>Seu Caminho em Cristo</Text>
        <View style={styles.cardsDataContainer}>
          <View style={[styles.cardData, { backgroundColor: '#FFE5F0' }]}><Text style={styles.cardDataEmoji}>✝️</Text><Text style={styles.cardDataLabel}>Conversão</Text><Text style={styles.cardDataValor}>{perfil.dataConversao}</Text></View>
          <View style={[styles.cardData, { backgroundColor: '#E8F5E9' }]}><Text style={styles.cardDataEmoji}>🕊️</Text><Text style={styles.cardDataLabel}>Batismo</Text><Text style={styles.cardDataValor}>{perfil.dataBatismo}</Text></View>
        </View>

        <Text style={styles.secaoTitulo}>Menu Rápido</Text>
        {itensMenu.map((item) => (
          <TouchableOpacity key={item.titulo} style={styles.cardMenu} onPress={() => navigation.navigate(item.rota)}>
            <Text style={styles.cardMenuEmoji}>{item.emoji}</Text><Text style={styles.cardMenuTitulo}>{item.titulo}</Text><Text style={styles.seta}>›</Text>
          </TouchableOpacity>
        ))}

        {firebaseConfigurado && usuario && (
          <View style={styles.secaoAutenticacao}>
            <Text style={styles.emailLabel}>Conta autenticada</Text>
            <Text style={styles.email}>{usuario.email}</Text>
            <TouchableOpacity style={styles.botaoSair} onPress={() => sair()}><Text style={styles.botaoSairTexto}>Sair da conta</Text></TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  headerCard: { backgroundColor: cores.cremeCard, borderRadius: raios.card, borderWidth: 1, borderColor: cores.bordaCard, padding: 24, alignItems: 'center', marginBottom: 24, ...sombra },
  fotoemoji: { fontSize: 60, marginBottom: 12 },
  nome: { fontSize: 22, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 8 },
  membraSince: { fontSize: 12, fontFamily: fontes.texto, color: cores.ouroEscuro },
  secaoTitulo: { fontSize: 13, fontFamily: fontes.rotulo, color: cores.ouroEscuro, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginTop: 16 },
  cardComunidade: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 14, marginBottom: 10, gap: 12, ...sombra },
  cardComunidadeEmoji: { fontSize: 20 }, cardComunidadeLabel: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.ouroEscuro, textTransform: 'uppercase', marginBottom: 2 }, cardComunidadeValor: { fontSize: 14, fontFamily: fontes.textoForte, color: cores.bordo },
  cardsDataContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  cardData: { flex: 1, borderRadius: raios.card, padding: 14, alignItems: 'center', ...sombra }, cardDataEmoji: { fontSize: 24, marginBottom: 6 }, cardDataLabel: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.bordo, textTransform: 'uppercase', marginBottom: 4 }, cardDataValor: { fontSize: 12, fontFamily: fontes.textoForte, color: cores.bordo, textAlign: 'center' },
  estatisticasGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }, cardEstatistica: { width: '31%', minWidth: 90, backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 12, alignItems: 'center', ...sombra }, estatisticaEmoji: { fontSize: 22, marginBottom: 6 }, estatisticaNumero: { fontSize: 20, fontFamily: fontes.tituloPrincipal, color: cores.dourado, marginBottom: 2 }, estatisticaLabel: { fontSize: 10, fontFamily: fontes.rotulo, color: cores.bordo, textAlign: 'center' },
  cardMenu: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 14, marginBottom: 10, gap: 12, ...sombra }, cardMenuEmoji: { fontSize: 20 }, cardMenuTitulo: { flex: 1, fontSize: 14, fontFamily: fontes.textoForte, color: cores.bordo }, seta: { fontSize: 20, color: cores.ouroEscuro },
  secaoAutenticacao: { backgroundColor: cores.cremeCard, borderRadius: raios.card, borderWidth: 1, borderColor: cores.bordaCard, padding: 16, marginTop: 20, alignItems: 'center' }, emailLabel: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.ouroEscuro, textTransform: 'uppercase', marginBottom: 4 }, email: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaTexto, marginBottom: 12 }, botaoSair: { paddingVertical: 8 }, botaoSairTexto: { fontSize: 13, fontFamily: fontes.rotulo, color: cores.erro, fontWeight: '600' },
});
