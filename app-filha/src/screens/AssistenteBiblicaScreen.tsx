import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_HISTORICO = 'assistente_historico';

type Mensagem = {
  id: string;
  tipo: 'usuario' | 'assistente';
  texto: string;
  timestamp: string;
  fonte?: string;
};

type BaseConhecimento = {
  palavrasChave: string[];
  resposta: string;
  fonte: string;
  referencia?: string;
};

const baseDeConhecimento: BaseConhecimento[] = [
  {
    palavrasChave: ['ansiedade', 'ansiosa', 'preocupada', 'aflita', 'medo'],
    resposta:
      '"Não andeis ansiosos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplica, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus." (Filipenses 4:6-7)\n\nA Bíblia nos ensina que diante da ansiedade, devemos trazer tudo a Deus em oração. Recomendo o Plano de Leitura "Salmos de Conforto" para meditar diariamente.',
    fonte: 'Bíblia',
    referencia: 'Filipenses 4:6-7',
  },
  {
    palavrasChave: ['joão', 'joão 3', 'nascimento de novo', 'renascer'],
    resposta:
      'João 3 fala sobre o nascimento de novo através de Jesus. O versículo mais conhecido é João 3:16: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."\n\nEste capítulo apresenta o encontro de Jesus com Nicodemos, explicando o que significa nascer de novo espiritualmente.',
    fonte: 'Bíblia',
    referencia: 'João 3',
  },
  {
    palavrasChave: ['plano', 'leitura', 'plano de leitura', 'como ler a bíblia'],
    resposta:
      'Oferecemos vários Planos de Leitura Bíblica disponíveis em "Vida Devocional":\n\n📖 Bíblia em um ano\n📖 Salmos (30 dias)\n📖 Evangelhos (Mateus, Marcos, Lucas e João)\n📖 Cartas de Paulo\n📖 Provérbios (sabedoria diária)\n\nEscolha um que se encaixe em sua rotina e comece hoje!',
    fonte: 'Materiais do ministério',
  },
  {
    palavrasChave: ['oração', 'orar', 'faça uma oração', 'reze'],
    resposta:
      'Querida irmã,\n\nConvido você a orar comigo:\n\n"Senhor Jesus, venho a Ti com meu coração aberto. Obrigada por Teu amor infinito e por estar comigo em cada momento. Peço que guies meus passos, que acalmes meus medos e que me fortaleças para enfrentar os desafios deste dia. Coloco minha vida completamente nas Tuas mãos. Amém."\n\nVocê pode também registrar suas orações na seção "Minhas Orações" e acompanhar as respostas de Deus.',
    fonte: 'Materiais do ministério',
  },
  {
    palavrasChave: ['cansada', 'cansaço', 'exausta', 'sobrecarregada', 'descanso'],
    resposta:
      '"Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei. Tomai sobre vós o meu jugo, e aprendei de mim, porque sou manso e humilde de coração; e achareis descanso para a vossa alma." (Mateus 11:28-29)',
    fonte: 'Bíblia',
    referencia: 'Mateus 11:28-29',
  },
  {
    palavrasChave: ['gratidão', 'grata', 'obrigada', 'agradecer'],
    resposta:
      '"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco." (1 Tessalonicenses 5:18)\n\nO ministério Abba Virtuosa tem um espaço especial chamado "Gratidão" onde você pode cultivar a prática diária de registrar aquilo pelo qual é grata. Isso muda nossa perspectiva!',
    fonte: 'Bíblia + Materiais do ministério',
    referencia: '1 Tessalonicenses 5:18',
  },
  {
    palavrasChave: ['força', 'fraqueza', 'fraca', 'desânimo'],
    resposta:
      '"Tudo posso naquele que me fortalece." (Filipenses 4:13)\n\nSua fraqueza não é motivo de vergonha—é uma oportunidade para que o poder de Deus se manifeste. Quando reconhecemos nossas limitações, Ele nos fortalece. Recomendo meditar neste versículo diariamente.',
    fonte: 'Bíblia',
    referencia: 'Filipenses 4:13',
  },
  {
    palavrasChave: ['decisão', 'direção', 'caminho', 'escolha', 'confusa', 'confuso'],
    resposta:
      '"Entrega o teu caminho ao Senhor; confia nele, e ele o fará. Ele fará irromper a tua justiça como a luz, e o teu direito como o meio-dia." (Salmos 37:5-6)\n\nEm momentos de dúvida, busque orientação através da oração, consulte uma líder discipuladora ou explore nossos "Estudos Cadastrados" sobre sabedoria e direção divina.',
    fonte: 'Bíblia',
    referencia: 'Salmos 37:5-6',
  },
  {
    palavrasChave: ['família', 'filhos', 'casamento', 'marido', 'relacionamento'],
    resposta:
      '"Eu e a minha casa serviremos ao Senhor." (Josué 24:15)\n\nTemos recursos especiais no ministério para fortalecer a família:\n\n👨‍👩‍👧 Jornada: Família\n👨‍👩‍👧 Estudos sobre casamento e paternidade\n👨‍👩‍👧 Grupo de oração para famílias\n\nSua família é importante para Deus e para nós também!',
    fonte: 'Bíblia + Materiais do ministério',
    referencia: 'Josué 24:15',
  },
];

const perguntasRapidas = [
  'O que a Bíblia fala sobre ansiedade?',
  'Explique João 3.',
  'Monte um plano de leitura.',
  'Faça uma oração.',
];

function buscarResposta(pergunta: string): Mensagem {
  const termo = pergunta.toLowerCase();
  const encontrado = baseDeConhecimento.find((item) =>
    item.palavrasChave.some((k) => termo.includes(k) || k.includes(termo))
  );

  if (encontrado) {
    return {
      id: String(Date.now()),
      tipo: 'assistente',
      texto: encontrado.resposta,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      fonte: encontrado.fonte,
    };
  }

  return {
    id: String(Date.now()),
    tipo: 'assistente',
    texto: 'Desculpe, não tenho uma resposta baseada na Bíblia e nos materiais do ministério para essa pergunta. Tente perguntar sobre: ansiedade, força, decisão, família, cansaço, ou peça uma oração. 🙏',
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    fonte: 'Assistente',
  };
}

export default function AssistenteBiblicaScreen() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [inputText, setInputText] = useState('');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    carregar<Mensagem[]>(CHAVE_HISTORICO, []).then((salvos) => {
      setMensagens(salvos);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) {
      salvar(CHAVE_HISTORICO, mensagens);
    }
  }, [mensagens, carregado]);

  function enviarMensagem(texto: string) {
    if (!texto.trim()) return;

    const novaMensagemUsuario: Mensagem = {
      id: String(Date.now()),
      tipo: 'usuario',
      texto: texto.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    const respostaAssistente = buscarResposta(texto);

    setMensagens([...mensagens, novaMensagemUsuario, respostaAssistente]);
    setInputText('');
  }

  function limparHistorico() {
    setMensagens([]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {mensagens.length === 0 ? (
          <>
            <View style={styles.tituloContainer}>
              <Text style={styles.tituloEmoji}>✨</Text>
              <Text style={styles.titulo}>Assistente Bíblica</Text>
              <Text style={styles.subtitulo}>
                Faça perguntas baseadas na Bíblia e nos materiais do ministério
              </Text>
            </View>

            <Text style={styles.secaoTitulo}>Perguntas rápidas</Text>
            {perguntasRapidas.map((pergunta) => (
              <TouchableOpacity
                key={pergunta}
                style={styles.perguntaRapidaCard}
                onPress={() => enviarMensagem(pergunta)}
              >
                <Text style={styles.perguntaRapidaEmoji}>✨</Text>
                <Text style={styles.perguntaRapidaTexto}>{pergunta}</Text>
                <Text style={styles.seta}>›</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.avisoCard}>
              <Text style={styles.avisoTitulo}>📖 Como funciono</Text>
              <Text style={styles.avisoTexto}>
                Respondo apenas com base em:
                {'\n'}• Bíblia Sagrada
                {'\n'}• Materiais do ministério
                {'\n'}• Estudos cadastrados
                {'\n\n'}Nunca invento doutrina. Se sua pergunta está além de meu conhecimento, sou honesta em dizer isso.
              </Text>
            </View>
          </>
        ) : (
          <>
            {mensagens.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.mensagemContainer,
                  msg.tipo === 'usuario' ? styles.mensagemUsuario : styles.mensagemAssistente,
                ]}
              >
                <View
                  style={[
                    styles.mensagemBubble,
                    msg.tipo === 'usuario'
                      ? styles.mensagemBubbleUsuario
                      : styles.mensagemBubbleAssistente,
                  ]}
                >
                  <Text
                    style={[
                      styles.mensagemTexto,
                      msg.tipo === 'usuario'
                        ? styles.mensagemTextoUsuario
                        : styles.mensagemTextoAssistente,
                    ]}
                  >
                    {msg.texto}
                  </Text>
                  {msg.fonte && (
                    <Text style={styles.mensagemFonte}>{msg.fonte}</Text>
                  )}
                  <Text
                    style={[
                      styles.mensagemTimestamp,
                      msg.tipo === 'usuario'
                        ? styles.mensagemTimestampUsuario
                        : styles.mensagemTimestampAssistente,
                    ]}
                  >
                    {msg.timestamp}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Faça uma pergunta..."
          placeholderTextColor={cores.cinzaClaro}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={styles.botaoEnviar}
          onPress={() => enviarMensagem(inputText)}
        >
          <Text style={styles.botaoEnviarEmoji}>↑</Text>
        </TouchableOpacity>
      </View>

      {mensagens.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparHistorico}>
          <Text style={styles.botaoLimparTexto}>Limpar conversa</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 16, paddingBottom: 140 },
  tituloContainer: { alignItems: 'center', marginBottom: 24 },
  tituloEmoji: { fontSize: 48, marginBottom: 8 },
  titulo: { fontSize: 24, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 8 },
  subtitulo: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
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
  perguntaRapidaCard: {
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
  perguntaRapidaEmoji: { fontSize: 18 },
  perguntaRapidaTexto: {
    flex: 1,
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    lineHeight: 18,
  },
  seta: { fontSize: 20, color: cores.ouroEscuro },
  avisoCard: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 16,
    marginTop: 20,
  },
  avisoTitulo: {
    fontSize: 13,
    fontFamily: fontes.textoForte,
    color: cores.bordo,
    marginBottom: 8,
  },
  avisoTexto: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    lineHeight: 18,
  },
  mensagemContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  mensagemUsuario: { justifyContent: 'flex-end' },
  mensagemAssistente: { justifyContent: 'flex-start' },
  mensagemBubble: {
    maxWidth: '85%',
    borderRadius: raios.card,
    padding: 12,
    ...sombra,
  },
  mensagemBubbleUsuario: {
    backgroundColor: cores.dourado,
  },
  mensagemBubbleAssistente: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: cores.borda,
  },
  mensagemTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    lineHeight: 18,
  },
  mensagemTextoUsuario: {
    color: '#fff',
  },
  mensagemTextoAssistente: {
    color: cores.cinzaTexto,
  },
  mensagemFonte: {
    fontSize: 10,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginTop: 8,
    fontWeight: '600',
  },
  mensagemTimestamp: {
    fontSize: 10,
    marginTop: 6,
  },
  mensagemTimestampUsuario: {
    color: 'rgba(255,255,255,0.7)',
  },
  mensagemTimestampAssistente: {
    color: cores.cinzaClaro,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: raios.campo,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    maxHeight: 80,
  },
  botaoEnviar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.dourado,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombra,
  },
  botaoEnviarEmoji: { fontSize: 20, fontWeight: '700', color: '#fff' },
  botaoLimpar: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  botaoLimparTexto: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.cinzaClaro,
  },
});
