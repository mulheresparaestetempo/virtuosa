// Abba Virtuosa Design Language (ADL) v1.0 — baseado no documento de design
// system da usuária (originalmente "FILHA Design Language / FDL").
// Conceito: paz, elegância, delicadeza, intimidade, acolhimento, luxo
// discreto, espiritualidade. Cada tela deve parecer uma página de um diário
// espiritual — nunca aparência corporativa, nunca excesso de cor.

export const cores = {
  // fundo
  creme: '#FAF8F5', // marfim
  cremeCard: '#F5E5E4', // rosé claro — fundo de cards em destaque
  branco: '#FFFFFF',
  nude: '#DCC4B2',

  // acentos
  dourado: '#C8A46A', // dourado fosco
  ouro: '#C8A46A',
  douradoEscuro: '#96793F',
  ouroEscuro: '#96793F',

  oliva: '#A6B48D', // oliva claro
  olivaEscuro: '#7E8C6F',
  roseClaro: '#F5E5E4',
  rosa: '#E8C8C6', // rosé médio

  // texto
  bordo: '#2E2E2E', // texto principal (mantido como nome de token por compatibilidade)
  texto: '#2E2E2E',
  cinzaTexto: '#2E2E2E',
  cinzaClaro: '#787878', // texto secundário

  // linhas
  borda: '#ECECEC',
  bordaCard: '#DCC4B2', // nude — contorno sutil de cards em destaque

  // estado
  erro: '#D85B5B',
  sucesso: '#6AA874',
};

// Sombras muito suaves: blur alto, opacidade baixa. Nunca usar sombras pesadas.
export const sombra = {
  shadowColor: '#2E2E2E',
  shadowOpacity: 0.06,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 6 },
  elevation: 2,
};

// Border radius do design system.
export const raios = {
  card: 32,
  botao: 24,
  campo: 20,
  modal: 36,
  bottomSheet: 40,
};

// Escala de espaçamento do design system.
export const espacamento = {
  e4: 4,
  e8: 8,
  e12: 12,
  e16: 16,
  e20: 20,
  e24: 24,
  e32: 32,
  e40: 40,
  e48: 48,
  e64: 64,
  e80: 80,
  e96: 96,
};

// Título Principal: Cormorant Garamond Bold. Título/Subtítulo: Playfair
// Display. Texto: Poppins. Descrição/Legenda: Inter. "Versículo" é uma
// extensão do sistema (itálico delicado) para citações bíblicas.
export const fontes = {
  tituloPrincipal: 'CormorantGaramond_700Bold',
  titulo: 'PlayfairDisplay_700Bold',
  subtitulo: 'PlayfairDisplay_600SemiBold',
  tituloSemiBold: 'PlayfairDisplay_600SemiBold',
  versiculo: 'CormorantGaramond_600SemiBold_Italic',
  corpo: 'Poppins_400Regular',
  rotulo: 'Poppins_600SemiBold',
  rotuloMedio: 'Poppins_500Medium',
  texto: 'Inter_400Regular',
  textoForte: 'Inter_600SemiBold',
  legenda: 'Inter_400Regular',
};

export const fontTamanhos = {
  tituloPrincipal: 42,
  titulo: 32,
  subtitulo: 24,
  corpo: 16,
  descricao: 14,
  legenda: 12,
};

// Variantes de botão do design system.
export const botoes = {
  primario: { backgroundColor: cores.dourado, borderRadius: raios.botao },
  primarioTexto: { color: cores.branco, fontFamily: fontes.rotulo },
  secundario: { backgroundColor: cores.rosa, borderRadius: raios.botao },
  secundarioTexto: { color: cores.olivaEscuro, fontFamily: fontes.rotulo },
  terciario: {
    backgroundColor: cores.branco,
    borderRadius: raios.botao,
    borderWidth: 1.5,
    borderColor: cores.olivaEscuro,
  },
  terciarioTexto: { color: cores.olivaEscuro, fontFamily: fontes.rotulo },
};
