import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../theme';
import { carregar, salvar } from '../storage';

const CHAVE_CONFIRMACOES = 'agenda_confirmacoes';

type Evento = {
  id: string;
  titulo: string;
  tipo: string;
  data: string;
  local: string;
};

const eventos: Evento[] = [
  { id: '1', titulo: 'Vigília de oração', tipo: 'Vigília', data: '08 de agosto, 22h', local: 'Igreja sede' },
  { id: '2', titulo: 'Jejum coletivo das mulheres', tipo: 'Jejum coletivo', data: '11 a 13 de agosto', local: 'Cada uma em sua casa' },
  { id: '3', titulo: 'Santa Ceia', tipo: 'Santa Ceia', data: '17 de agosto, 19h', local: 'Igreja sede' },
  { id: '4', titulo: 'Congresso FILHA 2026', tipo: 'Congresso', data: '05 a 07 de setembro', local: 'Centro de Convenções' },
  { id: '5', titulo: 'Campanha de oração pelas famílias', tipo: 'Campanha', data: '01 a 30 de setembro', local: 'Todas as células' },
];

export default function AgendaScreen() {
  const [confirmados, setConfirmados] = useState<string[]>([]);

  useEffect(() => {
    carregar<string[]>(CHAVE_CONFIRMACOES, []).then(setConfirmados);
  }, []);

  function alternarConfirmacao(id: string) {
    const atualizados = confirmados.includes(id)
      ? confirmados.filter((c) => c !== id)
      : [...confirmados, id];
    setConfirmados(atualizados);
    salvar(CHAVE_CONFIRMACOES, atualizados);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {eventos.map((evento) => {
          const confirmada = confirmados.includes(evento.id);
          return (
            <View key={evento.id} style={styles.cardEvento}>
              <Text style={styles.tipo}>{evento.tipo}</Text>
              <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
              <Text style={styles.eventoInfo}>🗓️ {evento.data}</Text>
              <Text style={styles.eventoInfo}>📍 {evento.local}</Text>
              <TouchableOpacity
                style={[styles.botaoConfirmar, confirmada && styles.botaoConfirmado]}
                onPress={() => alternarConfirmacao(evento.id)}
              >
                <Text style={[styles.botaoTexto, confirmada && styles.botaoTextoConfirmado]}>
                  {confirmada ? '✓ Presença confirmada' : 'Confirmar presença'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.creme },
  container: { padding: 20, paddingBottom: 40 },
  cardEvento: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
  },
  tipo: {
    fontSize: 11,
    fontWeight: '700',
    color: cores.ouroEscuro,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  eventoTitulo: { fontSize: 16, fontWeight: '700', color: cores.bordo, marginBottom: 6 },
  eventoInfo: { fontSize: 13, color: cores.cinzaTexto, marginBottom: 2 },
  botaoConfirmar: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: cores.ouro,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
  },
  botaoConfirmado: { backgroundColor: cores.ouro },
  botaoTexto: { fontSize: 13, fontWeight: '700', color: cores.ouro },
  botaoTextoConfirmado: { color: '#fff' },
});
