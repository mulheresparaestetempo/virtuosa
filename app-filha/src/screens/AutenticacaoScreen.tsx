import { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, espacamento, sombra } from '../theme';
import { ministerio } from '../data/ministerio';
import { useAuth } from '../context/AuthContext';

export default function AutenticacaoScreen() {
  const { cadastrar, entrar, erro } = useAuth();
  const [modo, setModo] = useState<'entrar' | 'cadastrar'>('entrar');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const entrarMode = modo === 'entrar';

  const valido = email.trim().length > 3 && senha.trim().length >= 6 && (entrarMode || nome.trim().length > 0);

  async function confirmar() {
    if (!valido || enviando) return;
    setEnviando(true);
    try {
      if (entrarMode) await entrar(email, senha);
      else await cadastrar(nome, email, senha);
    } catch {
      // A mensagem humana já fica disponível no contexto de autenticação.
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.auroraRose} />
          <View style={styles.auroraOliva} />

          <View style={styles.brandBlock}>
            <View style={styles.logoFrame}>
              <Image source={ministerio.logo} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.nomeMarca}>FILHA</Text>
            <Text style={styles.slogan}>Todos os dias, um encontro com Abba.</Text>
          </View>

          <View style={styles.introBlock}>
            <Text style={styles.kicker}>MINISTÉRIO VIRTUOSA</Text>
            <Text style={styles.titulo}>{entrarMode ? 'Bem-vinda, Filha.' : 'Comece sua caminhada.'}</Text>
            <Text style={styles.subtitulo}>
              {entrarMode
                ? 'Um lugar para respirar, ouvir a Palavra e continuar sua caminhada com Abba.'
                : 'Crie seu espaço pessoal de oração, Palavra e discipulado.'}
            </Text>
          </View>

          <View style={styles.cartao}>
            {!entrarMode && (
              <View style={styles.campoGrupo}>
                <Text style={styles.rotulo}>Seu nome</Text>
                <TextInput style={styles.input} placeholder="Como podemos chamar você?" placeholderTextColor={cores.cinzaClaro} value={nome} onChangeText={setNome} autoCapitalize="words" returnKeyType="next" />
              </View>
            )}

            <View style={styles.campoGrupo}>
              <Text style={styles.rotulo}>E-mail</Text>
              <TextInput style={styles.input} placeholder="seuemail@exemplo.com" placeholderTextColor={cores.cinzaClaro} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" returnKeyType="next" />
            </View>

            <View style={styles.campoGrupo}>
              <Text style={styles.rotulo}>Senha</Text>
              <View style={styles.senhaWrap}>
                <TextInput style={styles.inputSenha} placeholder="Mínimo de 6 caracteres" placeholderTextColor={cores.cinzaClaro} value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha} autoComplete={entrarMode ? 'password' : 'new-password'} returnKeyType="done" onSubmitEditing={confirmar} />
                <TouchableOpacity onPress={() => setMostrarSenha((valor) => !valor)} accessibilityRole="button" accessibilityLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} style={styles.olho}>
                  <Text style={styles.olhoTexto}>{mostrarSenha ? 'Ocultar' : 'Ver'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {!!erro && <Text style={styles.erro}>{erro}</Text>}

            <TouchableOpacity style={[styles.botaoPrimario, !valido && styles.botaoDesabilitado]} onPress={confirmar} disabled={!valido || enviando} activeOpacity={0.88} accessibilityRole="button">
              {enviando ? <ActivityIndicator color={cores.branco} /> : <Text style={styles.botaoPrimarioTexto}>{entrarMode ? 'Entrar na minha jornada' : 'Criar minha conta'}</Text>}
            </TouchableOpacity>

            {entrarMode && (
              <TouchableOpacity style={styles.esqueci} activeOpacity={0.7}>
                <Text style={styles.esqueciTexto}>Esqueci minha senha</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divisor}><View style={styles.linha} /><Text style={styles.ou}>ou</Text><View style={styles.linha} /></View>

          <TouchableOpacity onPress={() => setModo(entrarMode ? 'cadastrar' : 'entrar')} style={styles.botaoSecundario} activeOpacity={0.84}>
            <Text style={styles.botaoSecundarioTexto}>{entrarMode ? 'Ainda não sou cadastrada' : 'Já tenho uma conta'}</Text>
          </TouchableOpacity>

          <Text style={styles.rodape}>Mulheres para este tempo.{'\n'}Filhas de Abba para a eternidade.</Text>
          <Text style={styles.credito}>Ministério Virtuosa • pibam • Maricá, RJ</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  flex: { flex: 1 },
  container: { flexGrow: 1, paddingHorizontal: espacamento.e24, paddingTop: espacamento.e32, paddingBottom: espacamento.e48, alignItems: 'center', position: 'relative' },
  auroraRose: { position: 'absolute', width: 190, height: 190, borderRadius: 100, backgroundColor: cores.roseClaro, opacity: 0.42, top: -70, right: -80 },
  auroraOliva: { position: 'absolute', width: 150, height: 150, borderRadius: 90, backgroundColor: cores.oliva, opacity: 0.12, top: 230, left: -100 },
  brandBlock: { alignItems: 'center', marginBottom: espacamento.e24 },
  logoFrame: { width: 88, height: 88, borderRadius: 44, backgroundColor: cores.branco, borderWidth: 1, borderColor: cores.nude, alignItems: 'center', justifyContent: 'center', ...sombra },
  logo: { width: 62, height: 62 },
  nomeMarca: { marginTop: 12, fontSize: 30, letterSpacing: 5, fontFamily: fontes.tituloPrincipal, color: cores.douradoEscuro },
  slogan: { marginTop: 2, fontSize: 14, fontFamily: fontes.versiculo, color: cores.olivaEscuro, textAlign: 'center' },
  introBlock: { width: '100%', alignItems: 'center', marginBottom: espacamento.e24 },
  kicker: { fontSize: 10, letterSpacing: 2, fontFamily: fontes.rotulo, color: cores.douradoEscuro, marginBottom: 6 },
  titulo: { fontSize: 38, lineHeight: 44, fontFamily: fontes.tituloPrincipal, color: cores.texto, textAlign: 'center' },
  subtitulo: { maxWidth: 420, marginTop: 8, fontSize: 14, lineHeight: 21, fontFamily: fontes.texto, color: cores.cinzaClaro, textAlign: 'center' },
  cartao: { width: '100%', maxWidth: 520, backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: espacamento.e24, ...sombra },
  campoGrupo: { marginBottom: 14 },
  rotulo: { marginBottom: 7, marginLeft: 3, fontSize: 12, fontFamily: fontes.rotuloMedio, color: cores.texto },
  input: { backgroundColor: cores.creme, borderRadius: raios.campo, borderWidth: 1, borderColor: cores.borda, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, fontFamily: fontes.texto, color: cores.texto },
  senhaWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.creme, borderRadius: raios.campo, borderWidth: 1, borderColor: cores.borda },
  inputSenha: { flex: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, fontFamily: fontes.texto, color: cores.texto },
  olho: { paddingHorizontal: 14, paddingVertical: 10 },
  olhoTexto: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.douradoEscuro },
  erro: { color: cores.erro, fontFamily: fontes.texto, fontSize: 12, lineHeight: 18, marginBottom: 12, textAlign: 'center' },
  botaoPrimario: { backgroundColor: cores.dourado, minHeight: 54, paddingHorizontal: 18, borderRadius: raios.botao, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  botaoDesabilitado: { opacity: 0.48 },
  botaoPrimarioTexto: { color: cores.branco, fontFamily: fontes.rotulo, fontSize: 14 },
  esqueci: { alignItems: 'center', paddingTop: 15 },
  esqueciTexto: { color: cores.olivaEscuro, fontFamily: fontes.rotuloMedio, fontSize: 12 },
  divisor: { width: '100%', maxWidth: 520, flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  linha: { flex: 1, height: 1, backgroundColor: cores.borda },
  ou: { marginHorizontal: 12, color: cores.cinzaClaro, fontFamily: fontes.texto, fontSize: 11 },
  botaoSecundario: { width: '100%', maxWidth: 520, minHeight: 52, borderRadius: raios.botao, borderWidth: 1, borderColor: cores.olivaEscuro, backgroundColor: 'rgba(255,255,255,0.55)', alignItems: 'center', justifyContent: 'center' },
  botaoSecundarioTexto: { color: cores.olivaEscuro, fontFamily: fontes.rotulo, fontSize: 13 },
  rodape: { marginTop: 30, fontSize: 14, lineHeight: 20, fontFamily: fontes.versiculo, color: cores.texto, textAlign: 'center' },
  credito: { marginTop: 8, fontSize: 10, fontFamily: fontes.texto, color: cores.cinzaClaro, textAlign: 'center' },
});
