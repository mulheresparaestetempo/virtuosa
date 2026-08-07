import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores, fontes, raios } from '../theme';
import { ministerio } from '../data/ministerio';
import { useAuth } from '../context/AuthContext';

export default function AutenticacaoScreen() {
  const { cadastrar, entrar, erro } = useAuth();
  const [modo, setModo] = useState<'entrar' | 'cadastrar'>('entrar');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [enviando, setEnviando] = useState(false);

  const valido =
    email.trim().length > 3 &&
    codigo.trim().length >= 6 &&
    (modo === 'entrar' || nome.trim().length > 0);

  async function confirmar() {
    if (!valido || enviando) return;
    setEnviando(true);
    try {
      if (modo === 'cadastrar') {
        await cadastrar(nome, email, codigo);
      } else {
        await entrar(email, codigo);
      }
    } catch {
      // erro já fica disponível via `erro` do contexto
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Image source={ministerio.logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.titulo}>{modo === 'entrar' ? 'Bem-vinda de volta' : 'Criar minha conta'}</Text>
          <Text style={styles.subtitulo}>
            {modo === 'entrar'
              ? 'Entre com seu e-mail e código de acesso.'
              : 'Leva menos de um minuto. Depois disso o celular lembra de você.'}
          </Text>

          <View style={styles.cartao}>
            {modo === 'cadastrar' && (
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor={cores.cinzaClaro}
                value={nome}
                onChangeText={setNome}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor={cores.cinzaClaro}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Código de acesso (6 números)"
              placeholderTextColor={cores.cinzaClaro}
              value={codigo}
              onChangeText={(v) => setCodigo(v.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={6}
            />

            {!!erro && <Text style={styles.erro}>{erro}</Text>}

            <TouchableOpacity
              style={[styles.botaoPrimario, !valido && styles.botaoDesabilitado]}
              onPress={confirmar}
              disabled={!valido || enviando}
            >
              {enviando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.botaoPrimarioTexto}>
                  {modo === 'entrar' ? 'Entrar' : 'Criar conta'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setModo(modo === 'entrar' ? 'cadastrar' : 'entrar')}>
            <Text style={styles.link}>
              {modo === 'entrar' ? 'Ainda não tenho conta — quero me cadastrar' : 'Já tenho conta — quero entrar'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { flexGrow: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 72, height: 72, marginBottom: 16 },
  titulo: { fontSize: 32, fontFamily: fontes.tituloPrincipal, color: cores.bordo, textAlign: 'center' },
  subtitulo: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 18,
  },
  cartao: {
    width: '100%',
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 22,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    fontSize: 15,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    marginBottom: 12,
  },
  erro: { color: cores.erro, fontFamily: fontes.texto, fontSize: 13, marginBottom: 12, textAlign: 'center' },
  botaoPrimario: {
    backgroundColor: cores.ouro,
    paddingVertical: 14,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoDesabilitado: { opacity: 0.5 },
  botaoPrimarioTexto: { color: '#fff', fontFamily: fontes.rotulo, fontSize: 15 },
  link: { color: cores.bordo, fontFamily: fontes.textoForte, fontSize: 13, marginTop: 20, textAlign: 'center' },
});
