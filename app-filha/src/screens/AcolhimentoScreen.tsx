import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cores, fontes, raios, sombra } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_ACOLHIMENTO = 'acolhimento_pedidos';

type TipoAcolhimento =
  | 'visita'
  | 'culto_lar'
  | 'conversa_lider'
  | 'oracao'
  | 'visita_hospitalar'
  | 'conhecer_igreja'
  | 'celula';

type StatusAcolhimento = 'recebido' | 'em_andamento' | 'agendado' | 'concluido';

type PedidoAcolhimento = {
  id: string;
  tipo: TipoAcolhimento;
  data: string;
  status: StatusAcolhimento;
  detalhes?: string;
};

const tipos: { valor: TipoAcolhimento; label: string; emoji: string; descricao: string }[] = [
  { valor: 'visita', label: 'Solicitar visita', emoji: '🤝', descricao: 'Uma visita amiga' },
  { valor: 'culto_lar', label: 'Culto no Lar', emoji: '🏠', descricao: 'Igreja em sua casa' },
  { valor: 'conversa_lider', label: 'Conversa com líder', emoji: '💬', descricao: 'Diálogo orientado' },
  { valor: 'oracao', label: 'Pedido de oração', emoji: '🙏', descricao: 'Oração especial' },
  { valor: 'visita_hospitalar', label: 'Visita hospitalar', emoji: '❤️', descricao: 'Apoio no hospital' },
  { valor: 'conhecer_igreja', label: 'Conhecer a igreja', emoji: '⛪', descricao: 'Primeira visita' },
  { valor: 'celula', label: 'Participar de célula', emoji: '👯', descricao: 'Grupo de comunhão' },
];

const statuses: { valor: StatusAcolhimento; label: string; cor: string; emoji: string }[] = [
  { valor: 'recebido', label: 'Recebido', cor: '#FFF3E0', emoji: '📨' },
  { valor: 'em_andamento', label: 'Em andamento', cor: '#E3F2FD', emoji: '⏳' },
  { valor: 'agendado', label: 'Agendado', cor: '#F3E5F5', emoji: '📅' },
  { valor: 'concluido', label: 'Concluído', cor: '#E8F5E9', emoji: '✓' },
];

const pedidosIniciais: PedidoAcolhimento[] = [
  {
    id: '1',
    tipo: 'visita',
    data: '04 de agosto',
    status: 'agendado',
    detalhes: 'Visita agendada para próximo sábado às 15h',
  },
  {
    id: '2',
    tipo: 'oracao',
    data: '02 de agosto',
    status: 'concluido',
    detalhes: 'Comunidade em oração por você',
  },
];

function hojeFormatado() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
}

export default function AcolhimentoScreen() {
  const [pedidos, setPedidos] = useState<PedidoAcolhimento[]>(pedidosIniciais);
  const [carregado, setCarregado] = useState(false);
  const [expandido, setExpandido] = useState<string | null>(null);

  useEffect(() => {
    carregar(CHAVE_ACOLHIMENTO, pedidosIniciais).then((salvos) => {
      setPedidos(salvos);
      setCarregado(true);
    });
  }, []);

  useEffect(() => {
    if (carregado) salvar(CHAVE_ACOLHIMENTO, pedidos);
  }, [pedidos, carregado]);

  function solicitarAcolhimento(tipo: TipoAcolhimento) {
    const novo: PedidoAcolhimento = {
      id: String(Date.now()),
      tipo,
      data: hojeFormatado(),
      status: 'recebido',
    };
    setPedidos([novo, ...pedidos]);
  }

  const contarPorStatus = (status: StatusAcolhimento) => {
    return pedidos.filter((p) => p.status === status).length;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>🤝 Acolhimento</Text>
        <Text style={styles.subtitulo}>Você não está sozinha — estamos aqui para cuidar de você</Text>

        {/* Ilustração */}
        <View style={styles.ilustracao}>
          <Text style={styles.ilustracaoTexto}>Ilustração em aquarela:</Text>
          <Text style={styles.ilustracaoEmoji}>🤝</Text>
          <Text style={styles.ilustracaoDescricao}>Jesus abraçando uma mulher</Text>
        </View>

        {/* Cards de Acolhimento */}
        <Text style={styles.secaoTitulo}>Solicitar Acolhimento</Text>
        <View style={styles.cardsGrid}>
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo.valor}
              style={styles.cardSolicitacao}
              onPress={() => solicitarAcolhimento(tipo.valor)}
            >
              <Text style={styles.cardEmoji}>{tipo.emoji}</Text>
              <Text style={styles.cardLabel}>{tipo.label}</Text>
              <Text style={styles.cardDescricao}>{tipo.descricao}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resumo de Status */}
        <View style={styles.resumoStatus}>
          {statuses.map((status) => (
            <View key={status.valor} style={[styles.statusBadge, { backgroundColor: status.cor }]}>
              <Text style={styles.statusEmoji}>{status.emoji}</Text>
              <View>
                <Text style={styles.statusLabel}>{status.label}</Text>
                <Text style={styles.statusCount}>{contarPorStatus(status.valor)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Meus Pedidos */}
        <Text style={styles.secaoTitulo}>Meus Pedidos de Acolhimento</Text>

        {pedidos.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>
              Você ainda não solicitou nenhum acolhimento. Clique em um card acima para começar.
            </Text>
          </View>
        ) : (
          pedidos.map((pedido) => {
            const tipoInfo = tipos.find((t) => t.valor === pedido.tipo);
            const statusInfo = statuses.find((s) => s.valor === pedido.status);

            return (
              <TouchableOpacity
                key={pedido.id}
                style={styles.cardPedido}
                onPress={() => setExpandido(expandido === pedido.id ? null : pedido.id)}
              >
                <View style={styles.pedidoCabecalho}>
                  <View style={styles.pedidoTipo}>
                    <Text style={styles.pedidoEmoji}>{tipoInfo?.emoji}</Text>
                    <View>
                      <Text style={styles.pedidoLabel}>{tipoInfo?.label}</Text>
                      <Text style={styles.pedidoData}>{pedido.data}</Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.statusTag,
                      { backgroundColor: statusInfo?.cor },
                    ]}
                  >
                    <Text style={styles.statusTagEmoji}>{statusInfo?.emoji}</Text>
                    <Text style={styles.statusTagTexto}>{statusInfo?.label}</Text>
                  </View>
                </View>

                {expandido === pedido.id && pedido.detalhes && (
                  <View style={styles.pedidoDetalhes}>
                    <Text style={styles.pedidoDetalhesTexto}>{pedido.detalhes}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })
        )}

        {/* Mensagem de Apoio */}
        <View style={styles.cardApoio}>
          <Text style={styles.apoioTitulo}>💝 Você é importante para nós</Text>
          <Text style={styles.apoioTexto}>
            Cada pedido de acolhimento é recebido com cuidado e amor. Nossa equipe está dedicada a
            apoiá-lo em cada etapa. Você nunca está sozinha em sua jornada.
          </Text>
        </View>
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
  ilustracao: {
    height: 220,
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: cores.bordaCard,
    ...sombra,
  },
  ilustracaoTexto: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginBottom: 8,
  },
  ilustracaoEmoji: { fontSize: 80, marginBottom: 8 },
  ilustracaoDescricao: {
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
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  cardSolicitacao: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: raios.card,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra,
  },
  cardEmoji: { fontSize: 28, marginBottom: 8 },
  cardLabel: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescricao: {
    fontSize: 10,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
  },
  resumoStatus: {
    gap: 8,
    marginBottom: 28,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: raios.card,
    padding: 12,
    gap: 12,
  },
  statusEmoji: { fontSize: 20 },
  statusLabel: {
    fontSize: 12,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
  },
  statusCount: {
    fontSize: 18,
    fontFamily: fontes.tituloPrincipal,
    color: cores.dourado,
    marginTop: 2,
  },
  vazio: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.bordaCard,
    marginBottom: 20,
  },
  vazioTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    textAlign: 'center',
    lineHeight: 18,
  },
  cardPedido: {
    backgroundColor: '#fff',
    borderRadius: raios.card,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
    ...sombra,
  },
  pedidoCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  pedidoTipo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pedidoEmoji: { fontSize: 24 },
  pedidoLabel: {
    fontSize: 13,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
  },
  pedidoData: {
    fontSize: 11,
    fontFamily: fontes.texto,
    color: cores.cinzaClaro,
    marginTop: 2,
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: raios.botao,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 4,
  },
  statusTagEmoji: { fontSize: 14 },
  statusTagTexto: {
    fontSize: 10,
    fontFamily: fontes.rotulo,
    color: cores.bordo,
  },
  pedidoDetalhes: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  pedidoDetalhesTexto: {
    fontSize: 12,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    lineHeight: 18,
  },
  cardApoio: {
    backgroundColor: cores.cremeCard,
    borderRadius: raios.card,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.bordaCard,
  },
  apoioTitulo: {
    fontSize: 14,
    fontFamily: fontes.rotulo,
    color: cores.ouroEscuro,
    marginBottom: 8,
  },
  apoioTexto: {
    fontSize: 13,
    fontFamily: fontes.texto,
    color: cores.cinzaTexto,
    lineHeight: 20,
  },
});
