import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import { carregar, salvar } from '../storage';
import { useAuth } from '../context/AuthContext';
import { firebaseConfigurado } from '../firebase';

const CHAVE_PERFIL = 'perfil_filha';

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

export default function PerfilScreen() {
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
  cardAvatar: {
    backgroundColor: cores.cremeCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarEmoji: { fontSize: 40, marginBottom: 8 },
  avatarNome: { fontSize: 18, fontWeight: '700', color: cores.bordo },
  avatarInfo: { fontSize: 12, color: cores.ouroEscuro, marginTop: 2 },
  linhaCampo: { marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '700', color: cores.ouroEscuro, textTransform: 'uppercase', marginBottom: 4 },
  valor: { fontSize: 15, color: cores.cinzaTexto },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 10,
    fontSize: 14,
    color: cores.cinzaTexto,
  },
  botao: {
    backgroundColor: cores.ouro,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  contaEmail: { fontSize: 12, color: cores.cinzaClaro, textAlign: 'center', marginTop: 18 },
  botaoSair: { alignItems: 'center', marginTop: 10, paddingVertical: 10 },
  botaoSairTexto: { color: cores.rosa, fontWeight: '700', fontSize: 14 },
});
