import { useEffect, useState } from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { cores } from '../theme';
import { carregar, salvar } from '../storage';
import CabecalhoMinisterio from '../components/CabecalhoMinisterio';
import LouvorAberturaPlayer from '../components/LouvorAberturaPlayer';
import { CHAVE_PLANO_DEVOCIONAL, diaDoPlano, planoPadrao, type PlanoDevocional } from '../data/devocional';
import { db, firebaseConfigurado } from '../firebase';
import { useAuth } from '../context/AuthContext';

const CHAVE_GALERIA = 'galeria_fotos';
const CHAVE_PEDIDOS_ACOLHIMENTO = 'acolhimento_pedidos';

type Foto = { id: string; url: string; legenda: string };
type PedidoAcolhimento = { id: string; tipo: string; data: string; status: 'aberto' };

const hoje = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

function hojeCurto() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
}

const secoes = [
  { emoji: '🙏', titulo: 'Oração guiada', subtitulo: '5 min · com a discipuladora Ana' },
  { emoji: '🌱', titulo: 'Desafio do dia', subtitulo: 'Escreva 3 motivos de gratidão' },
  { emoji: '💌', titulo: 'Cartinha do Pai', subtitulo: 'Uma palavra de amor para você' },
];

export default function LugarSecretoScreen() {
  const { usuario } = useAuth();
  const [musicaAtiva, setMusicaAtiva] = useState(false);
  const [orando, setOrando] = useState(false);
  const [plano, setPlano] = useState<PlanoDevocional>(planoPadrao);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [mostrarFormFoto, setMostrarFormFoto] = useState(false);
  const [novaFotoUrl, setNovaFotoUrl] = useState('');
  const [novaFotoLegenda, setNovaFotoLegenda] = useState('');
  const [cultoSolicitado, setCultoSolicitado] = useState(false);
  const [acolhimentoSolicitado, setAcolhimentoSolicitado] = useState(false);

  const conteudoDia = diaDoPlano(plano);

  useEffect(() => {
    if (!firebaseConfigurado || !usuario) return;
    updateDoc(doc(db, 'usuarias', usuario.uid), { ultimoDiaDevocionalLido: plano.diaAtual }).catch(() => {});
  }, [usuario, plano.diaAtual]);

  useEffect(() => {
    carregar(CHAVE_PLANO_DEVOCIONAL, planoPadrao).then(setPlano);
    carregar<Foto[]>(CHAVE_GALERIA, []).then((salvas) => {
      setFotos(salvas);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_GALERIA, fotos);
  }, [fotos, carregado]);

  function adicionarFoto() {
    if (!novaFotoUrl.trim()) return;
    setFotos([
      { id: String(Date.now()), url: novaFotoUrl.trim(), legenda: novaFotoLegenda.trim() },
      ...fotos,
    ]);
    setNovaFotoUrl('');
    setNovaFotoLegenda('');
    setMostrarFormFoto(false);
  }

  async function solicitar(tipo: string, marcarFeito: (v: boolean) => void) {
    const pedidos = await carregar<PedidoAcolhimento[]>(CHAVE_PEDIDOS_ACOLHIMENTO, []);
    const novo: PedidoAcolhimento = { id: String(Date.now()), tipo, data: hojeCurto(), status: 'aberto' };
    await salvar(CHAVE_PEDIDOS_ACOLHIMENTO, [novo, ...pedidos]);
    marcarFeito(true);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <CabecalhoMinisterio />

        <Text style={styles.saudacao}>Bem-vinda ao seu Lugar Secreto 🕊️</Text>
        <Text style={styles.data}>{hoje}</Text>

        <View style={styles.cardPrincipal}>
          <View style={styles.badgeDia}>
            <Text style={styles.badgeDiaTexto}>Dia {plano.diaAtual}</Text>
          </View>
          <Text style={styles.nomeMes}>{plano.nomeMes}</Text>
          <Text style={styles.tituloDevocional}>{conteudoDia.titulo}</Text>
          <Text style={styles.versiculo}>{conteudoDia.versiculo}</Text>
          <Text style={styles.resumo}>{conteudoDia.resumo}</Text>
          <TouchableOpacity style={styles.botaoPrimario}>
            <Text style={styles.botaoPrimarioTexto}>Ler devocional completo</Text>
          </TouchableOpacity>
        </View>

        {!!conteudoDia.louvorTitulo && (
          <View style={styles.cardLouvor}>
            <Text style={styles.louvorEmoji}>🎶</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.louvorLabel}>Sugestão de louvor da líder</Text>
              <Text style={styles.louvorTitulo}>{conteudoDia.louvorTitulo}</Text>
            </View>
            {!!conteudoDia.louvorUrl && (
              <TouchableOpacity
                style={styles.botaoOuvir}
                onPress={() => Linking.openURL(conteudoDia.louvorUrl!)}
              >
                <Text style={styles.botaoOuvirTexto}>Ouvir</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text style={[styles.secaoTitulo, styles.secaoAcoesTitulo]}>Ações rápidas</Text>
        <View style={styles.acoesLista}>
          {conteudoDia.audioUrl ? (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => Linking.openURL(conteudoDia.audioUrl!)}
            >
              <View style={[styles.iconeCirculo, { backgroundColor: cores.bordo }]}>
                <Text style={styles.iconeTexto}>🎧</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tituloAcao}>Ouça o devocional de hoje</Text>
                <Text style={styles.subtituloAcao}>Áudio enviado pela líder</Text>
              </View>
              <Text style={styles.seta}>›</Text>
            </TouchableOpacity>
          ) : (
            <LouvorAberturaPlayer />
          )}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => solicitar('Culto no lar', setCultoSolicitado)}
          >
            <View style={[styles.iconeCirculo, { backgroundColor: cores.ouro }]}>
              <Text style={styles.iconeTexto}>🏠</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tituloAcao}>Agende um culto no seu lar</Text>
              <Text style={styles.subtituloAcao}>
                {cultoSolicitado ? 'Pedido enviado — a líder foi avisada ✓' : 'Receba a igreja em sua casa'}
              </Text>
            </View>
            <Text style={styles.seta}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => solicitar('Visita de acolhimento', setAcolhimentoSolicitado)}
          >
            <View style={[styles.iconeCirculo, { backgroundColor: cores.rosa }]}>
              <Text style={styles.iconeTexto}>🤝</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tituloAcao}>Agende uma visita de acolhimento</Text>
              <Text style={styles.subtituloAcao}>
                {acolhimentoSolicitado ? 'Pedido enviado — a líder foi avisada ✓' : 'Peça cuidado e oração presencial'}
              </Text>
            </View>
            <Text style={styles.seta}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grade}>
          {secoes.map((secao) => (
            <TouchableOpacity key={secao.titulo} style={styles.cardSecao}>
              <Text style={styles.cardEmoji}>{secao.emoji}</Text>
              <Text style={styles.cardTitulo}>{secao.titulo}</Text>
              <Text style={styles.cardSubtitulo}>{secao.subtitulo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.secaoGaleriaCabecalho}>
          <Text style={styles.secaoTitulo}>Galeria de fotos</Text>
          <TouchableOpacity onPress={() => setMostrarFormFoto((v) => !v)}>
            <Text style={styles.linkAdicionar}>{mostrarFormFoto ? 'Cancelar' : '+ Adicionar'}</Text>
          </TouchableOpacity>
        </View>

        {mostrarFormFoto && (
          <View style={styles.formFoto}>
            <TextInput
              style={styles.input}
              placeholder="Link da foto (ex.: https://...)"
              placeholderTextColor={cores.cinzaClaro}
              value={novaFotoUrl}
              onChangeText={setNovaFotoUrl}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Legenda (opcional)"
              placeholderTextColor={cores.cinzaClaro}
              value={novaFotoLegenda}
              onChangeText={setNovaFotoLegenda}
            />
            <TouchableOpacity style={styles.botaoSalvarFoto} onPress={adicionarFoto}>
              <Text style={styles.botaoSalvarFotoTexto}>Adicionar à galeria</Text>
            </TouchableOpacity>
          </View>
        )}

        {fotos.length === 0 ? (
          <Text style={styles.semFotos}>
            Nenhuma foto ainda. Toque em "+ Adicionar" para compartilhar um registro do ministério.
          </Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galeria}>
            {fotos.map((foto) => (
              <View key={foto.id} style={styles.fotoCard}>
                <Image source={{ uri: foto.url }} style={styles.foto} />
                {!!foto.legenda && (
                  <Text style={styles.fotoLegenda} numberOfLines={2}>
                    {foto.legenda}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.rodapeControles}>
          <TouchableOpacity
            style={[styles.controle, musicaAtiva && styles.controleAtivo]}
            onPress={() => setMusicaAtiva((v) => !v)}
          >
            <Text style={styles.controleEmoji}>🎵</Text>
            <Text style={styles.controleTexto}>
              {musicaAtiva ? 'Música ambiente ligada' : 'Música ambiente'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controle, orando && styles.controleAtivo]}
            onPress={() => setOrando((v) => !v)}
          >
            <Text style={styles.controleEmoji}>⏳</Text>
            <Text style={styles.controleTexto}>
              {orando ? 'Em tempo de oração...' : 'Iniciar tempo de oração'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const sombra = {
  shadowColor: '#3a2a1a',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cores.creme,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  saudacao: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.bordo,
  },
  data: {
    fontSize: 14,
    color: cores.ouroEscuro,
    marginTop: 4,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  cardPrincipal: {
    backgroundColor: cores.cremeCard,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    ...sombra,
  },
  badgeDia: {
    alignSelf: 'flex-start',
    backgroundColor: cores.bordo,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  badgeDiaTexto: { color: '#fff', fontWeight: '700', fontSize: 13 },
  nomeMes: {
    fontSize: 11,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  tituloDevocional: {
    fontSize: 23,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 10,
  },
  versiculo: {
    fontSize: 14,
    fontStyle: 'italic',
    color: cores.ouroEscuro,
    marginBottom: 12,
    lineHeight: 20,
  },
  resumo: {
    fontSize: 15,
    color: cores.cinzaTexto,
    lineHeight: 22,
    marginBottom: 16,
  },
  botaoPrimario: {
    backgroundColor: cores.ouro,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoPrimarioTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  cardLouvor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginTop: 14,
    gap: 12,
    ...sombra,
  },
  louvorEmoji: { fontSize: 26 },
  louvorLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  louvorTitulo: { fontSize: 15, fontWeight: '700', color: cores.bordo, marginTop: 2 },
  botaoOuvir: {
    backgroundColor: cores.bordo,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  botaoOuvirTexto: { color: '#fff', fontWeight: '700', fontSize: 12.5 },
  secaoAcoesTitulo: { marginTop: 24, marginBottom: 10 },
  acoesLista: { gap: 12, marginBottom: 6 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    gap: 12,
    ...sombra,
  },
  iconeCirculo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeTexto: { fontSize: 20 },
  tituloAcao: { fontSize: 15, fontWeight: '700', color: cores.bordo },
  subtituloAcao: { fontSize: 12, color: cores.cinzaClaro, marginTop: 2 },
  seta: { fontSize: 22, color: cores.ouroEscuro },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardSecao: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 2,
  },
  cardSubtitulo: {
    fontSize: 12,
    color: cores.cinzaClaro,
  },
  secaoGaleriaCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  linkAdicionar: { fontSize: 13, fontWeight: '700', color: cores.rosa },
  formFoto: {
    backgroundColor: cores.cremeCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    padding: 14,
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 12,
    fontSize: 14,
    color: cores.cinzaTexto,
    marginBottom: 10,
  },
  botaoSalvarFoto: { backgroundColor: cores.rosa, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  botaoSalvarFotoTexto: { color: '#fff', fontWeight: '700', fontSize: 14 },
  semFotos: { fontSize: 13, color: cores.cinzaClaro, marginBottom: 8 },
  galeria: { marginBottom: 4 },
  fotoCard: { width: 120, marginRight: 12 },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 14,
    backgroundColor: cores.cremeCard,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  fotoLegenda: { fontSize: 11, color: cores.cinzaTexto, marginTop: 4 },
  rodapeControles: {
    marginTop: 22,
    gap: 10,
  },
  controle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  controleAtivo: {
    backgroundColor: '#f3e3c7',
    borderColor: cores.rosa,
  },
  controleEmoji: {
    fontSize: 18,
    marginRight: 10,
  },
  controleTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.bordo,
  },
});
