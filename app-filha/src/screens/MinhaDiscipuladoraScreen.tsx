import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';
import { doc, getDoc } from 'firebase/firestore';
import { db, firebaseConfigurado } from '../firebase';
import { useAuth } from '../context/AuthContext';

const CHAVE_METAS = 'discipuladora_metas';
const CHAVE_PEDIDOS = 'discipuladora_pedidos';
const CHAVE_JEJUNS = 'discipuladora_jejuns';

type Meta = { id: string; descricao: string; concluida: boolean };
type PedidoCompartilhado = { id: string; descricao: string; data: string };
type JejumCompartilhado = { id: string; tipo: string; data: string; status: 'em_andamento' | 'concluido' };
type DadosDiscipuladora = { nome?: string; email?: string; igreja?: string };

const metasVazias: Meta[] = [];
const pedidosVazios: PedidoCompartilhado[] = [];
const jejunsVazios: JejumCompartilhado[] = [];

export default function MinhaDiscipuladoraScreen() {
  const { perfil } = useAuth();
  const [metas, setMetas] = useState<Meta[]>(metasVazias);
  const [pedidos, setPedidos] = useState<PedidoCompartilhado[]>(pedidosVazios);
  const [jejuns, setJejuns] = useState<JejumCompartilhado[]>(jejunsVazios);
  const [discipuladora, setDiscipuladora] = useState<DadosDiscipuladora | null>(null);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    Promise.all([
      carregar(CHAVE_METAS, metasVazias),
      carregar(CHAVE_PEDIDOS, pedidosVazios),
      carregar(CHAVE_JEJUNS, jejunsVazios),
    ]).then(([salvasMetas, salvosPedidos, salvosJejuns]) => {
      setMetas(salvasMetas);
      setPedidos(salvosPedidos);
      setJejuns(salvosJejuns);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) {
      salvar(CHAVE_METAS, metas);
      salvar(CHAVE_PEDIDOS, pedidos);
      salvar(CHAVE_JEJUNS, jejuns);
    }
  }, [metas, pedidos, jejuns, carregado]);

  useEffect(() => {
    let ativo = true;
    async function carregarVinculo() {
      const id = perfil?.discipuladoraId;
      if (!firebaseConfigurado || !id) {
        if (ativo) setDiscipuladora(null);
        return;
      }
      const snap = await getDoc(doc(db, 'usuarias', id)).catch(() => null);
      if (ativo && snap?.exists()) setDiscipuladora(snap.data() as DadosDiscipuladora);
    }
    carregarVinculo();
    return () => { ativo = false; };
  }, [perfil?.discipuladoraId]);

  function alternarMeta(id: string) {
    setMetas((atuais) => atuais.map((m) => (m.id === id ? { ...m, concluida: !m.concluida } : m)));
  }

  const temVinculo = Boolean(perfil?.discipuladoraId && discipuladora);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>🤍</Text>
          <Text style={styles.titulo}>Minha Discipuladora</Text>
          <Text style={styles.subtitulo}>{temVinculo ? 'Sua caminhada de discipulado em um só lugar.' : 'Este espaço será preenchido quando sua discipuladora estiver vinculada à sua conta.'}</Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.label}>Vínculo de discipulado</Text>
          {temVinculo ? (
            <>
              <Text style={styles.info}>{discipuladora?.nome ?? 'Discipuladora vinculada'}</Text>
              {!!discipuladora?.igreja && <Text style={styles.ajuda}>{discipuladora.igreja}</Text>}
              {!!discipuladora?.email && <Text style={styles.ajuda}>{discipuladora.email}</Text>}
            </>
          ) : (
            <>
              <Text style={styles.info}>Ainda não há uma discipuladora vinculada.</Text>
              <Text style={styles.ajuda}>Quando a liderança realizar o vínculo, os dados e os encontros aparecerão aqui.</Text>
            </>
          )}
        </View>

        <Text style={styles.secaoTitulo}>Metas em acompanhamento</Text>
        {metas.length ? metas.map((meta) => (
          <TouchableOpacity key={meta.id} style={styles.cardMeta} onPress={() => alternarMeta(meta.id)}>
            <View style={[styles.caixa, meta.concluida && styles.caixaMarcada]}>{meta.concluida && <Text style={styles.check}>✓</Text>}</View>
            <Text style={[styles.metaTexto, meta.concluida && styles.metaConcluida]}>{meta.descricao}</Text>
          </TouchableOpacity>
        )) : <Empty text="Nenhuma meta foi compartilhada com você ainda." />}

        <Text style={styles.secaoTitulo}>Histórico de conversas</Text>
        <Empty text="Suas conversas aparecerão aqui quando houver registros compartilhados pela discipuladora." />

        <Text style={styles.secaoTitulo}>Pedidos compartilhados 🙏</Text>
        {pedidos.length ? pedidos.map((pedido) => (
          <View key={pedido.id} style={styles.card}><Text style={styles.texto}>{pedido.descricao}</Text><Text style={styles.data}>{pedido.data}</Text></View>
        )) : <Empty text="Nenhum pedido compartilhado no momento." />}

        <Text style={styles.secaoTitulo}>Jejuns compartilhados 🙏</Text>
        {jejuns.length ? jejuns.map((jejum) => (
          <View key={jejum.id} style={styles.card}><Text style={styles.texto}>{jejum.tipo}</Text><Text style={styles.data}>{jejum.data}</Text><Text style={styles.status}>{jejum.status === 'em_andamento' ? 'Em andamento' : 'Concluído'}</Text></View>
        )) : <Empty text="Nenhum jejum compartilhado no momento." />}
      </ScrollView>
    </SafeAreaView>
  );
}

function Empty({ text }: { text: string }) {
  return <View style={styles.empty}><Text style={styles.emptyText}>{text}</Text></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  hero: { alignItems: 'center', backgroundColor: cores.cremeCard, borderRadius: raios.card, borderWidth: 1, borderColor: cores.bordaCard, padding: 24, marginBottom: 16, ...sombra },
  emoji: { fontSize: 42, marginBottom: 10 },
  titulo: { fontSize: 22, fontFamily: fontes.titulo, color: cores.bordo, marginBottom: 8 },
  subtitulo: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaTexto, textAlign: 'center', lineHeight: 19 },
  cardInfo: { backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 16, marginBottom: 18, ...sombra },
  label: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.ouroEscuro, textTransform: 'uppercase', marginBottom: 6 },
  info: { fontSize: 15, fontFamily: fontes.textoForte, color: cores.bordo, marginBottom: 6 },
  ajuda: { fontSize: 12, fontFamily: fontes.texto, color: cores.cinzaClaro, lineHeight: 18 },
  secaoTitulo: { fontSize: 13, fontFamily: fontes.rotulo, color: cores.ouroEscuro, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginTop: 16 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 12, marginBottom: 8, gap: 10, ...sombra },
  caixa: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: cores.ouro, alignItems: 'center', justifyContent: 'center' },
  caixaMarcada: { backgroundColor: cores.ouro }, check: { color: '#fff', fontSize: 13, fontWeight: '700' },
  metaTexto: { fontSize: 14, fontFamily: fontes.texto, color: cores.cinzaTexto, flex: 1 },
  metaConcluida: { textDecorationLine: 'line-through', color: cores.cinzaClaro },
  card: { backgroundColor: '#fff', borderRadius: raios.card, borderWidth: 1, borderColor: cores.borda, padding: 14, marginBottom: 8, ...sombra },
  texto: { fontSize: 14, fontFamily: fontes.texto, color: cores.cinzaTexto, lineHeight: 19 },
  data: { fontSize: 11, fontFamily: fontes.texto, color: cores.cinzaClaro, marginTop: 5 },
  status: { fontSize: 11, fontFamily: fontes.rotulo, color: cores.olivaEscuro, marginTop: 6 },
  empty: { backgroundColor: cores.cremeCard, borderRadius: raios.card, borderWidth: 1, borderColor: cores.bordaCard, padding: 20, alignItems: 'center', marginBottom: 12 },
  emptyText: { fontSize: 13, fontFamily: fontes.texto, color: cores.cinzaClaro, textAlign: 'center', lineHeight: 19 },
});
