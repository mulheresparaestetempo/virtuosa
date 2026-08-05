export type DiaDevocional = {
  dia: number;
  titulo: string;
  versiculo: string;
  resumo: string;
  audioUrl?: string;
  louvorTitulo?: string;
  louvorUrl?: string;
};

export type PlanoDevocional = {
  nomeMes: string;
  diaAtual: number;
  dias: DiaDevocional[];
};

export const CHAVE_PLANO_DEVOCIONAL = 'plano_devocional_mes';

const hojeDia = new Date().getDate();

export const planoPadrao: PlanoDevocional = {
  nomeMes: 'Devocional do mês',
  diaAtual: hojeDia,
  dias: [
    {
      dia: hojeDia,
      titulo: 'Descanso na Presença',
      versiculo:
        '"Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei." — Mateus 11:28',
      resumo:
        'Hoje o Pai te convida para um lugar secreto de descanso. Antes de correr para as tarefas do dia, pare, respire e entregue o seu cansaço a Ele.',
    },
  ],
};

export function diaDoPlano(plano: PlanoDevocional): DiaDevocional {
  return plano.dias.find((d) => d.dia === plano.diaAtual) ?? plano.dias[0] ?? planoPadrao.dias[0];
}
