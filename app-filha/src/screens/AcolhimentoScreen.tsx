import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores, raios } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_PEDIDOS = 'acolhimento_pedidos';

type StatusPedido = 'aberto' | 'em_andamento' | 'concluido';

type Pedido = {
  id: string; // Number(id) é o timestamp de criação — reaproveitado pela linha do tempo em Minha Caminhada
  tipo: string;
  data: string;
  status: StatusPedido;
};

const tiposDisponiveis = [
  { tipo: 'Visita pastoral', emoji: '⛪' },
  { tipo: 'Visita de acolhimento', emoji: '🤝' },
  { tipo: 'Culto no lar', emoji: '🏠' },
  { tipo: 'Conversa com líder', emoji: '💬' },
  { tipo: 'Discipulado', emoji: '📖' },
  { tipo: 'Oração presencial', emoji: '🙏' },
  { tipo: 'Visita hospitalar', emoji: '🏥' },
  { tipo: 'Conhecer uma igreja', emoji: '🌟' },
  { tipo: 'Participar de uma célula', emoji: '👥' },
];

const statusInfo: Record<StatusPedido, { label: string; cor: string }> = {
  aberto: { label: 'Aberto', cor: cores.ouroEscuro },
  em_andamento: { label: 'Em andamento', cor: cores.rosa },
  concluido: { label: 'Concluído', cor: '#4a7c59' },
};

function hojeFormatado() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
}

export default function AcolhimentoScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    carregar<Pedido[]>(CHAVE_PEDIDOS, []).then((salvos) => {
      setPedidos(salvos);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_PEDIDOS, pedidos);
  }, [pedidos, carregado]);

  function solicitar(tipo: string) {
    const novo: Pedido = {
      id: String(Date.now()),
      tipo,
      data: hojeFormatado(),
      status: 'aberto',
    };
    setPedidos([novo, ...pedidos]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitulo}>
          Solicite um cuidado — cada pedido é acompanhado pela liderança até a conclusão.
        </Text>

        <View style={styles.grade}>
          {tiposDisponiveis.map((item) => (
            <TouchableOpacity
              key={item.tipo}
              style={styles.cardTipo}
              onPress={() => solicitar(item.tipo)}
            >
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <Text style={styles.cardTexto}>{item.tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>Meus pedidos</Text>
        {pedidos.length === 0 && (
          <Text style={styles.semPedidos}>
            Nenhum pedido ainda. Toque em uma opção acima para solicitar.
          </Text>
        )}
        {pedidos.map((pedido) => (
          <View key={pedido.id} style={styles.cardPedido}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pedidoTipo}>{pedido.tipo}</Text>
              <Text style={styles.pedidoData}>{pedido.data}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: statusInfo[pedido.status].cor }]}>
              <Text style={styles.badgeTexto}>{statusInfo[pedido.status].label}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  subtitulo: { fontSize: 13, color: cores.cinzaClaro, marginBottom: 18, lineHeight: 18 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 22 },
  cardTipo: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: 'flex-start',
  },
  cardEmoji: { fontSize: 22, marginBottom: 6 },
  cardTexto: { fontSize: 13, fontWeight: '700', color: cores.bordo },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  semPedidos: { fontSize: 13, color: cores.cinzaClaro },
  cardPedido: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
  },
  pedidoTipo: { fontSize: 14, fontWeight: '700', color: cores.bordo },
  pedidoData: { fontSize: 12, color: cores.cinzaClaro, marginTop: 2 },
  badge: { borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10 },
  badgeTexto: { fontSize: 11, fontWeight: '700', color: '#fff' },
});
