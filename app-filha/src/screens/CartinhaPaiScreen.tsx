import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';

const cartas = [
  {
    id: '1',
    data: 'Hoje',
    mensagem:
      '"Minha filha amada, hoje quero que você saiba que observo cada passo que dá. Vejo sua fidelidade, seu cansaço, sua entrega. Eu sou a razão pela qual seu coração bate. Descanse em meu amor perfeito, que não há condenação para aquelas que me buscam. Você é minha joia rara. Suas orações não caem no vazio — cada sussurro é uma música aos meus ouvidos. Confie. Descanse. Eu cuido de você."',
  },
  {
    id: '2',
    data: 'Ontem',
    mensagem:
      '"Filha, vejo as lágrimas que você versou escondido. Cada uma delas é preciosa para mim. Eu não desperdiço nem uma. Suas dificuldades não são punição — são o lugar onde minha graça resplandece mais brilhantemente. Continue andando, porque aquele que começou uma boa obra em você há de completá-la."',
  },
];

export default function CartinhaPaiScreen() {
  const [cartaSelecionada, setCartaSelecionada] = useState(cartas[0]);
  const [compartilhada, setCompartilhada] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>💌 Cartinha do Pai</Text>
        <Text style={styles.subtitulo}>Uma palavra de amor especial para você</Text>

        {/* Envelope */}
        <View style={styles.envelopeContainer}>
          <View style={styles.envelope}>
            <View style={styles.envelopeAberto}>
              <View style={styles.abaPrincipal} />
              <View style={styles.abaPrincipal} />
            </View>
            <Text style={styles.emojiEnvelope}>💌</Text>
          </View>
        </View>

        {/* Seleção de Cartas */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cartasScroll}
          contentContainerStyle={styles.cartasContent}
        >
          {cartas.map((carta) => (
            <TouchableOpacity
              key={carta.id}
              style={[
                styles.cartaPreview,
                cartaSelecionada.id === carta.id && styles.cartaPreviewAtiva,
              ]}
              onPress={() => setCartaSelecionada(carta)}
            >
              <Text style={styles.cartaData}>{carta.data}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Conteúdo da Carta */}
        <View style={styles.cartaConteudo}>
          <Text style={styles.cartaMensagem}>{cartaSelecionada.mensagem}</Text>
          <View style={styles.assinatura}>
            <Text style={styles.assinaturaTitulo}>Com amor,</Text>
            <Text style={styles.assinaturaNome}>Seu Pai 🕊️</Text>
          </View>
        </View>

        {/* Botões */}
        <View style={styles.botoes}>
          <TouchableOpacity style={styles.botaoSecundario}>
            <Text style={styles.botaoSecundarioTexto}>📌 Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoPrimario}
            onPress={() => setCompartilhada(!compartilhada)}
          >
            <Text style={styles.botaoPrimarioTexto}>
              {compartilhada ? '✓ Compartilhada' : '↗️ Compartilhar'}
            </Text>
          </TouchableOpacity>
        </View>

        {compartilhada && (
          <View style={styles.mensagemSucesso}>
            <Text style={styles.mensagemSucessoTexto}>
              ✓ Cartinha compartilhada com sua discipuladora
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  titulo: {
    fontSize: 28,
    fontFamily: fontes.titulo,
    color: cores.bordo,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginBottom: 24,
  },
  envelopeContainer: { alignItems: 'center', marginBottom: 30 },
  envelope: {
    width: 200,
    height: 140,
    backgroundColor: '#F5E5E4',
    borderRadius: raios.card,
    borderWidth: 2,
    borderColor: cores.bordaCard,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...sombra,
  },
  envelopeAberto: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  abaPrincipal: {
    flex: 1,
    backgroundColor: cores.rosa,
    borderBottomWidth: 2,
    borderBottomColor: cores.bordaCard,
  },
  emojiEnvelope: { fontSize: 60 },
  cartasScroll: { marginBottom: 20 },
  cartasContent: { paddingRight: 20 },
  cartaPreview: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cartaPreviewAtiva: {
    backgroundColor: cores.rosa,
    borderColor: cores.rosa,
  },
  cartaData: {
    fontFamily: fontes.rotulo,
    fontSize: 12,
    color: cores.bordo,
  },
  cartaConteudo: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra,
  },
  cartaMensagem: {
    fontSize: 16,
    fontFamily: fontes.texto,
    color: cores.texto,
    lineHeight: 26,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  assinatura: { alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: cores.borda, paddingTop: 16 },
  assinaturaTitulo: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  assinaturaNome: {
    fontSize: 16,
    fontFamily: fontes.titulo,
    color: cores.ouroEscuro,
    marginTop: 4,
  },
  botoes: { flexDirection: 'row', gap: 12 },
  botaoPrimario: {
    flex: 1,
    backgroundColor: cores.dourado,
    paddingVertical: 14,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoPrimarioTexto: {
    color: '#fff',
    fontFamily: fontes.rotulo,
    fontSize: 14,
  },
  botaoSecundario: {
    flex: 1,
    backgroundColor: cores.rosa,
    paddingVertical: 14,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoSecundarioTexto: {
    color: cores.olivaEscuro,
    fontFamily: fontes.rotulo,
    fontSize: 14,
  },
  mensagemSucesso: {
    marginTop: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: raios.campo,
    padding: 12,
  },
  mensagemSucessoTexto: {
    color: '#2E7D32',
    fontFamily: fontes.texto,
    fontSize: 13,
  },
});
