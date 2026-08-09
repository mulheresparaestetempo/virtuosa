import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { diaDoPlano, planoPadrao } from '../data/devocional';

export default function LugarSecretoDetailScreen() {
  const [finalizado, setFinalizado] = useState(false);
  const [reflexao, setReflexao] = useState('');
  const devocional = diaDoPlano(planoPadrao);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.capa}>
          <Text style={styles.capaMarca}>FILHA · LUGAR SECRETO</Text>
          <Text style={styles.capaTitulo}>{devocional.titulo}</Text>
          <Text style={styles.capaSubtitulo}>Um momento para desacelerar e permanecer na presença de Deus.</Text>
          <View style={styles.capaLinha} />
          <Text style={styles.capaReferencia}>{devocional.versiculo}</Text>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>HOJE</Text>
          <Text style={styles.titulo}>Descanse antes de continuar.</Text>
          <Text style={styles.texto}>{devocional.resumo}</Text>
        </View>

        <View style={styles.cardLeitura}>
          <Text style={styles.cardLabel}>UMA PAUSA COM DEUS</Text>
          <Text style={styles.leitura}>
            Feche os olhos por alguns segundos. Respire com calma. Não tente resolver tudo agora. Apenas reconheça que Deus está presente e entregue a Ele aquilo que pesa no seu coração.
          </Text>
          <Text style={styles.leituraDestaque}>Você não precisa carregar tudo sozinha.</Text>
        </View>

        <View style={styles.acoes}>
          <View style={styles.acao}><Text style={styles.acaoIcone}>✦</Text><Text style={styles.acaoTitulo}>Palavra</Text><Text style={styles.acaoTexto}>Leia novamente o versículo.</Text></View>
          <View style={styles.acao}><Text style={styles.acaoIcone}>♡</Text><Text style={styles.acaoTitulo}>Oração</Text><Text style={styles.acaoTexto}>Converse com Abba.</Text></View>
          <View style={styles.acao}><Text style={styles.acaoIcone}>✎</Text><Text style={styles.acaoTitulo}>Reflexão</Text><Text style={styles.acaoTexto}>Escreva o que sentiu.</Text></View>
        </View>

        <View style={styles.escrever}>
          <Text style={styles.cardLabel}>O QUE DEUS FALOU AO SEU CORAÇÃO?</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Escreva livremente. Este é o seu espaço..."
            placeholderTextColor={cores.cinzaClaro}
            value={reflexao}
            onChangeText={setReflexao}
            multiline
          />
        </View>

        <View style={styles.versiculoCard}>
          <Text style={styles.versiculo}>“Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.”</Text>
          <Text style={styles.referencia}>Mateus 11:28</Text>
        </View>

        {!finalizado ? (
          <TouchableOpacity style={styles.botao} activeOpacity={0.86} onPress={() => setFinalizado(true)}>
            <Text style={styles.botaoTexto}>Concluir meu momento com Deus</Text>
            <Text style={styles.botaoSeta}>→</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.sucesso}>
            <Text style={styles.sucessoIcone}>♡</Text>
            <Text style={styles.sucessoTitulo}>Seu momento foi concluído.</Text>
            <Text style={styles.sucessoTexto}>Guarde no coração aquilo que Deus ministrou a você hoje.</Text>
          </View>
        )}

        <Text style={styles.rodape}>Todos os dias, um encontro com Abba.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 46 },
  capa: { backgroundColor: cores.bordo, borderRadius: 26, padding: 24, marginBottom: 24, ...sombra },
  capaMarca: { fontSize: 9, letterSpacing: 2, fontFamily: fontes.rotuloMedio, color: cores.dourado, marginBottom: 28 },
  capaTitulo: { fontSize: 31, lineHeight: 38, fontFamily: fontes.titulo, color: '#fff', marginBottom: 9 },
  capaSubtitulo: { fontSize: 13, lineHeight: 20, fontFamily: fontes.texto, color: '#F7EEE8' },
  capaLinha: { height: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 20 },
  capaReferencia: { fontSize: 13, lineHeight: 20, fontFamily: fontes.versiculo, fontStyle: 'italic', color: '#F5DDB5' },
  intro: { marginBottom: 20 },
  eyebrow: { fontSize: 10, letterSpacing: 2, fontFamily: fontes.rotuloMedio, color: cores.ouroEscuro, marginBottom: 7 },
  titulo: { fontSize: 24, lineHeight: 30, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 8 },
  texto: { fontSize: 14, lineHeight: 22, fontFamily: fontes.texto, color: cores.cinzaTexto },
  cardLeitura: { backgroundColor: cores.cremeCard, borderRadius: raios.card, borderWidth: 1, borderColor: cores.bordaCard, padding: 20, marginBottom: 14 },
  cardLabel: { fontSize: 9, letterSpacing: 1.5, fontFamily: fontes.rotuloMedio, color: cores.ouroEscuro, marginBottom: 11 },
  leitura: { fontSize: 14, lineHeight: 22, fontFamily: fontes.texto, color: cores.cinzaTexto, marginBottom: 13 },
  leituraDestaque: { fontSize: 15, lineHeight: 22, fontFamily: fontes.versiculo, fontStyle: 'italic', color: cores.bordo },
  acoes: { flexDirection: 'row', gap: 9, marginBottom: 16 },
  acao: { flex: 1, minHeight: 112, backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 12, ...sombra },
  acaoIcone: { fontSize: 19, color: cores.ouroEscuro, marginBottom: 6 },
  acaoTitulo: { fontSize: 12, fontFamily: fontes.textoForte, color: cores.bordo, marginBottom: 4 },
  acaoTexto: { fontSize: 10.5, lineHeight: 15, fontFamily: fontes.texto, color: cores.cinzaClaro },
  escrever: { backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 18, marginBottom: 15 },
  textarea: { minHeight: 125, borderRadius: raios.campo, borderWidth: 1, borderColor: cores.bordaCard, backgroundColor: cores.creme, padding: 13, fontSize: 13, lineHeight: 20, fontFamily: fontes.texto, color: cores.cinzaTexto, textAlignVertical: 'top' },
  versiculoCard: { backgroundColor: cores.rosa, borderRadius: raios.card, padding: 20, marginBottom: 18 },
  versiculo: { fontSize: 17, lineHeight: 26, fontFamily: fontes.versiculo, fontStyle: 'italic', color: cores.olivaEscuro, marginBottom: 10 },
  referencia: { fontSize: 11, fontFamily: fontes.rotuloMedio, color: cores.olivaEscuro },
  botao: { minHeight: 50, backgroundColor: cores.bordo, borderRadius: raios.botao, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: 16 },
  botaoTexto: { color: '#fff', fontSize: 13, fontFamily: fontes.rotuloMedio },
  botaoSeta: { color: cores.dourado, fontSize: 18 },
  sucesso: { backgroundColor: cores.cremeCard, borderRadius: raios.card, borderWidth: 1, borderColor: cores.bordaCard, padding: 22, alignItems: 'center' },
  sucessoIcone: { fontSize: 25, color: cores.ouroEscuro, marginBottom: 7 },
  sucessoTitulo: { fontSize: 16, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 6 },
  sucessoTexto: { fontSize: 12, lineHeight: 18, textAlign: 'center', fontFamily: fontes.texto, color: cores.cinzaTexto },
  rodape: { textAlign: 'center', marginTop: 22, fontSize: 10, fontFamily: fontes.rotulo, color: cores.cinzaClaro },
});
