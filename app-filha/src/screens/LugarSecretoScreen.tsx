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
import { cores } from '../theme';
import { carregar, salvar } from '../storage';
import CabecalhoMinisterio from '../components/CabecalhoMinisterio';

const CHAVE_DEVOCIONAL = 'devocional_do_dia';
const CHAVE_GALERIA = 'galeria_fotos';

const hoje = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

type DevocionalDoDia = {
  titulo: string;
  versiculo: string;
  resumo: string;
  louvorTitulo: string;
  louvorUrl: string;
};

const devocionalPadrao: DevocionalDoDia = {
  titulo: 'Descanso na Presença',
  versiculo:
    '"Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei." — Mateus 11:28',
  resumo:
    'Hoje o Pai te convida para um lugar secreto de descanso. Antes de correr para as tarefas do dia, pare, respire e entregue o seu cansaço a Ele.',
  louvorTitulo: 'Descanso — Gabriela Rocha',
  louvorUrl: '',
};

type Foto = { id: string; url: string; legenda: string };

const secoes = [
  { emoji: '🎧', titulo: 'Áudio devocional', subtitulo: '8 min · narrado' },
  { emoji: '🙏', titulo: 'Oração guiada', subtitulo: '5 min · com a discipuladora Ana' },
  { emoji: '🌱', titulo: 'Desafio do dia', subtitulo: 'Escreva 3 motivos de gratidão' },
  { emoji: '💌', titulo: 'Cartinha do Pai', subtitulo: 'Uma palavra de amor para você' },
];

export default function LugarSecretoScreen() {
  const [musicaAtiva, setMusicaAtiva] = useState(false);
  const [orando, setOrando] = useState(false);
  const [devocional, setDevocional] = useState<DevocionalDoDia>(devocionalPadrao);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [mostrarFormFoto, setMostrarFormFoto] = useState(false);
  const [novaFotoUrl, setNovaFotoUrl] = useState('');
  const [novaFotoLegenda, setNovaFotoLegenda] = useState('');

  useEffect(() => {
    carregar(CHAVE_DEVOCIONAL, devocionalPadrao).then(setDevocional);
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

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <CabecalhoMinisterio />

        <Text style={styles.saudacao}>Bem-vinda ao seu Lugar Secreto 🕊️</Text>
        <Text style={styles.data}>{hoje}</Text>

        <View style={styles.cardPrincipal}>
          <Text style={styles.tituloDevocional}>{devocional.titulo}</Text>
          <Text style={styles.versiculo}>{devocional.versiculo}</Text>
          <Text style={styles.resumo}>{devocional.resumo}</Text>
          <TouchableOpacity style={styles.botaoPrimario}>
            <Text style={styles.botaoPrimarioTexto}>Ler devocional completo</Text>
          </TouchableOpacity>
        </View>

        {!!devocional.louvorTitulo && (
          <View style={styles.cardLouvor}>
            <Text style={styles.louvorEmoji}>🎶</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.louvorLabel}>Louvor de abertura</Text>
              <Text style={styles.louvorTitulo}>{devocional.louvorTitulo}</Text>
            </View>
            {!!devocional.louvorUrl && (
              <TouchableOpacity
                style={styles.botaoOuvir}
                onPress={() => Linking.openURL(devocional.louvorUrl)}
              >
                <Text style={styles.botaoOuvirTexto}>Ouvir</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

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
    padding: 20,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    ...sombra,
  },
  tituloDevocional: {
    fontSize: 20,
    fontWeight: '700',
    color: cores.bordo,
    marginBottom: 8,
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
