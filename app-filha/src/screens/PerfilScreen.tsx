import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';
import { useAuth } from '../context/AuthContext';
import { firebaseConfigurado } from '../firebase';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PerfilStackParamList } from '../navigation/PerfilStack';

type Props = NativeStackScreenProps<PerfilStackParamList, 'Perfil'>;

const CHAVE_PERFIL = 'perfil_usuario';
const CHAVE_ESTATISTICAS = 'perfil_estatisticas';

type Perfil = {
  nome: string;
  emoji: string;
  igreja: string;
  lider: string;
  discipuladora: string;
  dataBatismo: string;
  dataConversao: string;
};

type Estatisticas = {
  diasDevocional: number;
  diasOracao: number;
  jejuns: number;
  memoriais: number;
  cursos: number;
  jornadas: number;
};

const perfilInicial: Perfil = {
  nome: 'Daiane Feliciano',
  emoji: '🌺',
  igreja: 'PIBAM Espraiado',
  lider: 'Mariana Silva',
  discipuladora: 'Ana Paula',
  dataBatismo: '10 de março de 2024',
  dataConversao: '02 de janeiro de 2023',
};

const estatisticasIniciais: Estatisticas = {
  diasDevocional: 145,
  diasOracao: 89,
  jejuns: 3,
  memoriais: 7,
  cursos: 2,
  jornadas: 5,
};

const itensComunidade: { titulo: string; chave: keyof Perfil; emoji: string }[] = [
  { titulo: 'Minha Igreja', chave: 'igreja', emoji: '⛪' },
  { titulo: 'Minha Líder', chave: 'lider', emoji: '👩🏻‍💼' },
  { titulo: 'Minha Discipuladora', chave: 'discipuladora', emoji: '👩🏻' },
];

const itensEstatisticas: {
  label: string;
  chave: keyof Estatisticas;
  emoji: string;
  unidade: string;
}[] = [
  { label: 'Devocional', chave: 'diasDevocional', emoji: '🕊️', unidade: 'dias' },
  { label: 'Oração', chave: 'diasOracao', emoji: '🤲', unidade: 'dias' },
  { label: 'Jejuns', chave: 'jejuns', emoji: '🙏', unidade: '' },
  { label: 'Memoriais', chave: 'memoriais', emoji: '🌸', unidade: '' },
  { label: 'Cursos', chave: 'cursos', emoji: '🎓', unidade: '' },
  { label: 'Jornadas', chave: 'jornadas', emoji: '🌱', unidade: '' },
];

const itensMenu: {
  titulo: string;
  rota: keyof PerfilStackParamList;
  emoji: string;
}[] = [
  { titulo: 'Minha Caminhada', rota: 'MinhaCaminhada', emoji: '✨' },
  { titulo: 'Memoriais', rota: 'Memoriais', emoji: '🌸' },
  { titulo: 'Minha Discipuladora', rota: 'MinhaDiscipuladora', emoji: '👩🏻' },
  { titulo: 'Acolhimento', rota: 'Acolhimento', emoji: '🤝' },
  { titulo: 'Agenda', rota: 'Agenda', emoji: '📅' },
  { titulo: 'Configurações', rota: 'Agenda', emoji: '⚙️' },
];

export default function PerfilScreen({ navigation }: Props) {
  const { usuario, sair } = useAuth();
  const [perfil, setPerfil] = useState<Perfil>(perfilInicial);
  const [estatisticas, setEstatisticas] = useState<Estatisticas>(estatisticasIniciais);

  useEffect(() => {
    Promise.all([
      carregar(CHAVE_PERFIL, perfilInicial),
      carregar(CHAVE_ESTATISTICAS, estatisticasIniciais),
    ]).then(([perfilSalvo, estSalva]) => {
      setPerfil(perfilSalvo);
      setEstatisticas(estSalva);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header com Foto e Nome */}
        <View style={styles.headerCard}>
          <Text style={styles.fotoemoji}>{perfil.emoji}</Text>
          <Text style={styles.nome}>{perfil.nome}</Text>
          <Text style={styles.membraSince}>
            Membro desde {perfil.dataConversao}
          </Text>
        </View>

        {/* Comunidade */}
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

        {/* Datas Importantes */}
        <Text style={styles.secaoTitulo}>Seu Caminho em Cristo</Text>
        <View style={styles.cardsDataContainer}>
          <View style={[styles.cardData, { backgroundColor: '#FFE5F0' }]}>
            <Text style={styles.cardDataEmoji}>✝️</Text>
            <Text style={styles.cardDataLabel}>Conversão</Text>
            <Text style={styles.cardDataValor}>{perfil.dataConversao}</Text>
          </View>
          <View style={[styles.cardData, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.cardDataEmoji}>🕊️</Text>
            <Text style={styles.cardDataLabel}>Batismo</Text>
            <Text style={styles.cardDataValor}>{perfil.dataBatismo}</Text>
          </View>
        </View>

        {/* Estatísticas */}
        <Text style={styles.secaoTitulo}>Sua Caminhada em Números</Text>
        <View style={styles.estatisticasGrid}>
          {itensEstatisticas.map((item) => (
            <View key={item.chave} style={styles.cardEstatistica}>
              <Text style={styles.estatisticaEmoji}>{item.emoji}</Text>
              <Text style={styles.estatisticaNumero}>
                {estatisticas[item.chave]}
              </Text>
              <Text style={styles.estatisticaLabel}>{item.label}</Text>
              {item.unidade && (
                <Text style={styles.estatisticaUnidade}>{item.unidade}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Menu */}
        <Text style={styles.secaoTitulo}>Menu Rápido</Text>
        {itensMenu.map((item) => (
          <TouchableOpacity
            key={item.titulo}
            style={styles.cardMenu}
            onPress={() => navigation.navigate(item.rota)}
          >
            <Text style={styles.cardMenuEmoji}>{item.emoji}</Text>
            <Text style={styles.cardMenuTitulo}>{item.titulo}</Text>
            <Text style={styles.seta}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Autenticação */}
        {firebaseConfigurado && usuario && (
          <>
            <View style={styles.secaoAutenticacao}>
              <Text style={styles.emailLabel}>Conta autenticada</Text>
              <Text style={styles.email}>{usuario.email}</Text>
              <TouchableOpacity style={styles.botaoSair} onPress={() => sair()}>
                <Text style={styles.botaoSairTexto}>Sair da conta</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  headerCard: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    ...sombra,
  },
  fotoemoji: { fontSize: 60, marginBottom: 12 },
  nome: {
    fontSize: 22,
    fontFamily: fontes.titulo,
    color: cores.bordo,
    marginBottom: 8,
  },
  membraSince: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.ouroEscuro,
  },
  secaoTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 16,
  },
  cardComunidade: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    ...sombra,
  },
  cardComunidadeEmoji: { fontSize: 20 },
  cardComunidadeLabel: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardComunidadeValor: {
    fontSize: 14,
    fontFamily: fontes.textoForte,
    color: cores.bordo,
  },
  cardsDataContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  cardData: {
    flex: 1,
    borderRadius: raios.card,
    padding: 14,
    alignItems: 'center',
    ...sombra,
  },
  cardDataEmoji: { fontSize: 24, marginBottom: 6 },
  cardDataLabel: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardDataValor: {
    fontSize: 12,
    fontFamily: fontes.textoForte,
    color: cores.bordo,
    textAlign: 'center',
  },
  estatisticasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  cardEstatistica: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    alignItems: 'center',
    ...sombra,
  },
  estatisticaEmoji: { fontSize: 24, marginBottom: 6 },
  estatisticaNumero: {
    fontSize: 20,
    fontFamily: fontes.tituloPrincipal,
    color: cores.dourado,
    marginBottom: 2,
  },
  estatisticaLabel: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    textAlign: 'center',
  },
  estatisticaUnidade: {
    fontSize: 9,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginTop: 2,
  },
  cardMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    ...sombra,
  },
  cardMenuEmoji: { fontSize: 20 },
  cardMenuTitulo: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontes.textoForte,
    color: cores.bordo,
  },
  seta: { fontSize: 20, color: cores.ouroEscuro },
  secaoAutenticacao: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  emailLabel: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    marginBottom: 12,
  },
  botaoSair: {
    paddingVertical: 8,
  },
  botaoSairTexto: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.erro,
    fontWeight: '600',
  },
});
