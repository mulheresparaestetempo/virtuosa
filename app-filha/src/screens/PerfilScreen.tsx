import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';
import { useAuth } from '../context/AuthContext';
import { firebaseConfigurado } from '../firebase';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PerfilStackParamList } from '../navigation/PerfilStack';

type Props = NativeStackScreenProps<PerfilStackParamList, 'Perfil'>;

const CHAVE_PERFIL = 'perfil_filha';

const itensHub: { rota: keyof PerfilStackParamList; titulo: string; emoji: string; descricao: string }[] = [
  { rota: 'MinhaCaminhada', titulo: 'Minha Caminhada', emoji: '✨', descricao: 'Sua linha do tempo espiritual' },
  { rota: 'Memoriais', titulo: 'Memoriais', emoji: '🌸', descricao: 'Marcos da sua caminhada com Deus' },
  { rota: 'MinhaDiscipuladora', titulo: 'Minha Discipuladora', emoji: '👩🏻', descricao: 'Metas, conversas e próximo encontro' },
  { rota: 'Acolhimento', titulo: 'Acolhimento', emoji: '🤝', descricao: 'Solicite visitas e cuidado pastoral' },
  { rota: 'Agenda', titulo: 'Agenda', emoji: '📅', descricao: 'Eventos, jejuns coletivos e Santa Ceia' },
  { rota: 'Mapa', titulo: 'Mapa', emoji: '🗺️', descricao: 'Igrejas, células e cultos no lar' },
  { rota: 'Missoes', titulo: 'Missões', emoji: '🌍', descricao: 'Missionários, projetos e motivos de oração' },
  { rota: 'PainelLider', titulo: 'Painel da Líder', emoji: '👩🏻‍💼', descricao: 'Acompanhamento pastoral (prévia)' },
  { rota: 'PainelIgreja', titulo: 'Painel da Igreja', emoji: '⛪', descricao: 'Células, ministérios e relatórios' },
];

type Perfil = {
  nome: string;
  igreja: string;
  lider: string;
  discipuladora: string;
  ministerio: string;
  dons: string;
  dataBatismo: string;
  dataConversao: string;
};

const perfilInicial: Perfil = {
  nome: 'Daiane',
  igreja: 'PIBAM Espraiado',
  lider: 'Mariana',
  discipuladora: 'Ana Paula',
  ministerio: 'Ministério de Mulheres',
  dons: 'Hospitalidade, Ensino',
  dataBatismo: '10/03/2024',
  dataConversao: '02/01/2023',
};

const campos: { chave: keyof Perfil; label: string }[] = [
  { chave: 'nome', label: 'Nome' },
  { chave: 'igreja', label: 'Igreja' },
  { chave: 'lider', label: 'Líder' },
  { chave: 'discipuladora', label: 'Discipuladora' },
  { chave: 'ministerio', label: 'Ministério' },
  { chave: 'dons', label: 'Dons' },
  { chave: 'dataBatismo', label: 'Data de batismo' },
  { chave: 'dataConversao', label: 'Data de conversão' },
];

export default function PerfilScreen({ navigation }: Props) {
  const { usuario, sair } = useAuth();
  const [perfil, setPerfil] = useState<Perfil>(perfilInicial);
  const [editando, setEditando] = useState(false);
  const [totalMemoriais, setTotalMemoriais] = useState(0);

  useEffect(() => {
    carregar(CHAVE_PERFIL, perfilInicial).then(setPerfil);
    carregar<{ id: string }[]>('memoriais', []).then((m) => setTotalMemoriais(m.length));
  }, []);

  function salvarPerfil() {
    salvar(CHAVE_PERFIL, perfil);
    setEditando(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.tituloAba}>Perfil</Text>

        <View style={styles.cardAvatar}>
          <Text style={styles.avatarEmoji}>🌺</Text>
          <Text style={styles.avatarNome}>{perfil.nome}</Text>
          <Text style={styles.avatarInfo}>{totalMemoriais} memoriais guardados</Text>
        </View>

        {campos.map((campo) => (
          <View key={campo.chave} style={styles.linhaCampo}>
            <Text style={styles.label}>{campo.label}</Text>
            {editando ? (
              <TextInput
                style={styles.input}
                value={perfil[campo.chave]}
                onChangeText={(texto) => setPerfil({ ...perfil, [campo.chave]: texto })}
              />
            ) : (
              <Text style={styles.valor}>{perfil[campo.chave]}</Text>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.botao}
          onPress={() => (editando ? salvarPerfil() : setEditando(true))}
        >
          <Text style={styles.botaoTexto}>{editando ? 'Salvar alterações' : 'Editar perfil'}</Text>
        </TouchableOpacity>

        <Text style={styles.secaoTitulo}>Sua caminhada</Text>
        {itensHub.map((item) => (
          <TouchableOpacity
            key={item.rota}
            style={styles.cardHub}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.rota)}
          >
            <Text style={styles.cardHubEmoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardHubTitulo}>{item.titulo}</Text>
              <Text style={styles.cardHubDescricao}>{item.descricao}</Text>
            </View>
            <Text style={styles.seta}>›</Text>
          </TouchableOpacity>
        ))}

        {firebaseConfigurado && usuario && (
          <>
            <Text style={styles.contaEmail}>Conta: {usuario.email}</Text>
            <TouchableOpacity style={styles.botaoSair} onPress={() => sair()}>
              <Text style={styles.botaoSairTexto}>Sair da conta</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  tituloAba: { fontSize: 26, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 16 },
  cardAvatar: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 20,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarEmoji: { fontSize: 40, marginBottom: 8 },
  avatarNome: { fontSize: 18, fontFamily: fontes.subtitulo, color: cores.bordo },
  avatarInfo: { fontSize: 12, fontFamily: fontes.texto, color: cores.ouroEscuro, marginTop: 2 },
  linhaCampo: { marginBottom: 12 },
  label: {
    fontSize: 11,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  valor: { fontSize: 15, fontFamily: fontes.texto, color: cores.cinzaTexto },
  input: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 10,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
  },
  botao: {
    backgroundColor: cores.ouro,
    paddingVertical: 12,
    borderRadius: raios.botao,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: { color: '#fff', fontFamily: fontes.rotulo, fontSize: 15 },
  secaoTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 10,
  },
  cardHub: {
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
  cardHubEmoji: { fontSize: 22 },
  cardHubTitulo: { fontSize: 14, fontFamily: fontes.textoForte, color: cores.bordo },
  cardHubDescricao: { fontSize: 12, fontFamily: fontes.texto, color: cores.cinzaClaro, marginTop: 2 },
  seta: { fontSize: 22, color: cores.ouroEscuro },
  contaEmail: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
    marginTop: 18,
  },
  botaoSair: { alignItems: 'center', marginTop: 10, paddingVertical: 10 },
  botaoSairTexto: { color: cores.erro, fontFamily: fontes.rotulo, fontSize: 14 },
});
