import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_GRATIDOES = 'gratidoes';

type Gratidao = {
  id: string;
  texto: string;
  data: string;
};

export default function GratidaoScreen() {
  const [gratidoes, setGratidoes] = useState<Gratidao[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [novaGratidao, setNovaGratidao] = useState('');

  useEffect(() => {
    carregar<Gratidao[]>(CHAVE_GRATIDOES, []).then((salvas) => {
      setGratidoes(salvas);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_GRATIDOES, gratidoes);
  }, [gratidoes, carregado]);

  function adicionarGratidao() {
    if (!novaGratidao.trim()) return;
    const novo: Gratidao = {
      id: String(Date.now()),
      texto: novaGratidao.trim(),
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }),
    };
    setGratidoes([novo, ...gratidoes]);
    setNovaGratidao('');
  }

  const flores = gratidoes.slice(0, 12);
  const progressoAnual = Math.round((flores.length / 365) * 100);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>🌸 Gratidão</Text>
        <Text style={styles.subtitulo}>Cada gratidão é uma flor que enfeita seu vaso</Text>

        {/* Vaso com Flores */}
        <View style={styles.vasoContainer}>
          <View style={styles.vasoPrincipal}>
            {/* Haste do vaso */}
            <View style={styles.vasoParte1} />
            <View style={styles.vasoParte2} />
            <View style={styles.vasoParte3} />

            {/* Flores - em um padrão circular */}
            <View style={styles.floresContainer}>
              {flores.map((_, i) => {
                const angulo = (i / Math.max(flores.length, 1)) * 360;
                const radianos = (angulo * Math.PI) / 180;
                const x = Math.cos(radianos) * 50;
                const y = Math.sin(radianos) * 60;

                return (
                  <View
                    key={i}
                    style={[
                      styles.florIndividual,
                      {
                        transform: [{ translateX: x }, { translateY: -y }],
                      },
                    ]}
                  >
                    <Text style={styles.florEmoji}>🌸</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Info do progresso */}
          <View style={styles.infoProgresso}>
            <Text style={styles.floresCount}>{flores.length} flores</Text>
            <View style={styles.barraProgresso}>
              <View
                style={[
                  styles.barraPreenchida,
                  { width: `${Math.min(progressoAnual, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.textoProgresso}>{progressoAnual}% do ano com gratidão registrada</Text>
          </View>
        </View>

        {/* Entrada Nova Gratidão */}
        <View style={styles.cardNova}>
          <Text style={styles.cardNovaLabel}>Adicionar Gratidão</Text>
          <TextInput
            style={styles.input}
            placeholder="Pelo que você é grata hoje?"
            placeholderTextColor={cores.cinzaClaro}
            value={novaGratidao}
            onChangeText={setNovaGratidao}
            multiline
            maxLength={200}
          />
          <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarGratidao}>
            <Text style={styles.botaoAdicionarTexto}>🌸 Adicionar Flor</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Gratidões */}
        {gratidoes.length > 0 && (
          <View>
            <Text style={styles.secaoTitulo}>Seu jardim de gratidões</Text>
            {gratidoes.map((gratidao) => (
              <View key={gratidao.id} style={styles.cardGratidao}>
                <Text style={styles.gratidaoEmoji}>🌸</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.gratidaoTexto}>{gratidao.texto}</Text>
                  <Text style={styles.gratidaoData}>{gratidao.data}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {gratidoes.length === 0 && (
          <View style={styles.cardVazio}>
            <Text style={styles.cardVazioEmoji}>🌱</Text>
            <Text style={styles.cardVazioTexto}>Comece a plantar sementes de gratidão</Text>
            <Text style={styles.cardVazioSubtexto}>
              Cada dia, escreva pelo que você é grata. Ao fim do ano, seu vaso estará florido.
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
  vasoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  vasoPrincipal: {
    width: 200,
    height: 240,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    marginBottom: 20,
  },
  vasoParte1: {
    position: 'absolute',
    bottom: 0,
    width: 140,
    height: 80,
    backgroundColor: cores.rosa,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    borderWidth: 2,
    borderColor: cores.bordaCard,
    opacity: 0.9,
  },
  vasoParte2: {
    position: 'absolute',
    bottom: 30,
    width: 120,
    height: 20,
    backgroundColor: cores.rosa,
    borderRadius: 10,
    opacity: 0.8,
  },
  vasoParte3: {
    position: 'absolute',
    bottom: 50,
    width: 100,
    height: 15,
    backgroundColor: cores.rosa,
    borderRadius: 8,
    opacity: 0.7,
  },
  floresContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  florIndividual: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  florEmoji: { fontSize: 24 },
  infoProgresso: {
    width: 240,
    alignItems: 'center',
  },
  floresCount: {
    fontSize: 18,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    marginBottom: 8,
  },
  barraProgresso: {
    width: '100%',
    height: 8,
    backgroundColor: cores.borda,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barraPreenchida: {
    height: '100%',
    backgroundColor: cores.rosa,
  },
  textoProgresso: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  cardNova: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  cardNovaLabel: {
    fontSize: 14,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  botaoAdicionar: {
    backgroundColor: cores.rosa,
    paddingVertical: 12,
    borderRadius: raios.botao,
    alignItems: 'center',
  },
  botaoAdicionarTexto: {
    color: cores.olivaEscuro,
    fontFamily: fontes.rotulo,
    fontSize: 14,
  },
  secaoTitulo: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  cardGratidao: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    gap: 12,
    alignItems: 'flex-start',
  },
  gratidaoEmoji: { fontSize: 18, marginTop: 2 },
  gratidaoTexto: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.texto,
    lineHeight: 20,
    marginBottom: 4,
  },
  gratidaoData: {
    fontSize: 11,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
  },
  cardVazio: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  cardVazioEmoji: { fontSize: 48, marginBottom: 12 },
  cardVazioTexto: {
    fontSize: 16,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    marginBottom: 8,
  },
  cardVazioSubtexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
    lineHeight: 18,
  },
});
