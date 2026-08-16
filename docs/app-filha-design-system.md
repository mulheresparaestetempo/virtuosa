# Abba Virtuosa Design Language (ADL) — v1.0

> Documento de design system. Consolida o briefing original enviado pela
> líder do ministério ("FILHA Design Language / FDL v1.0"), renomeado junto
> com o rebranding do produto para **Abba Virtuosa**. Implementado em
> `app-filha/src/theme.ts`.

## Conceito

O aplicativo deve transmitir:

- Paz
- Elegância
- Delicadeza
- Intimidade
- Acolhimento
- Luxo discreto
- Espiritualidade

Cada tela deve parecer uma página de um diário espiritual.

**Nunca** utilizar aparência corporativa. **Nunca** utilizar excesso de
cores. Tudo deve ser leve.

## Paleta principal

| Nome | Hex | Token em `theme.ts` |
|---|---|---|
| Marfim (fundo principal) | `#FAF8F5` | `cores.creme` |
| Branco | `#FFFFFF` | `cores.branco` |
| Rosé Claro | `#F5E5E4` | `cores.cremeCard` / `cores.roseClaro` |
| Rosé Médio | `#E8C8C6` | `cores.rosa` |
| Nude | `#DCC4B2` | `cores.nude` / `cores.bordaCard` |
| Dourado Fosco | `#C8A46A` | `cores.dourado` / `cores.ouro` |
| Oliva Claro | `#A6B48D` | `cores.oliva` |
| Oliva Escuro | `#7E8C6F` | `cores.olivaEscuro` |
| Texto Principal | `#2E2E2E` | `cores.texto` / `cores.bordo` |
| Texto Secundário | `#787878` | `cores.cinzaClaro` |
| Linha | `#ECECEC` | `cores.borda` |
| Erro | `#D85B5B` | `cores.erro` |
| Sucesso | `#6AA874` | `cores.sucesso` |

## Border radius

| Elemento | Valor | Token |
|---|---|---|
| Cards | 32 | `raios.card` |
| Botões | 24 | `raios.botao` |
| Campos | 20 | `raios.campo` |
| Modal | 36 | `raios.modal` |
| Bottom Sheet | 40 | `raios.bottomSheet` |

Exceções conscientes: chips/tags (pílulas pequenas de categoria/filtro) e
avatares/ícones circulares mantêm seu próprio raio (metade da
largura/altura) para continuarem perfeitamente redondos — não seguem a
escala de "card".

## Sombras

Muito suaves: blur alto, opacidade baixa. Nunca sombras pesadas.
Implementado em `sombra` (`theme.ts`): `shadowOpacity: 0.06`,
`shadowRadius: 16`, offset `{ 0, 6 }`.

## Tipografia

| Nível | Fonte | Tamanho | Token |
|---|---|---|---|
| Título Principal | Cormorant Garamond Bold | 42 | `fontes.tituloPrincipal` |
| Título | Playfair Display | 32 | `fontes.titulo` |
| Subtítulo | Playfair Display | 24 | `fontes.subtitulo` |
| Texto | Poppins | 16 | `fontes.corpo` |
| Descrição | Inter | 14 | `fontes.texto` |
| Legenda | Inter | 12 | `fontes.legenda` |

Extensão do sistema (não estava no briefing original, mas coerente com o
conceito de "diário espiritual"): **Versículo** — Cormorant Garamond
Semi-Bold itálico (`fontes.versiculo`), usado em citações bíblicas.

Nota de implementação: os tamanhos de 42/32/24 são usados literalmente nos
títulos de topo de tela (ex.: saudação do Lugar Secreto, título da tela de
login). Em contextos menores — títulos dentro de cards, cabeçalhos de
navegação — usamos a mesma família tipográfica em tamanhos proporcionalmente
menores, para não estourar o layout.

## Espaçamento

Escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
(`espacamento.e4` … `espacamento.e96` em `theme.ts`).

## Ícones

Outlined, minimalistas, arredondados, traço fino. **Pendente**: o protótipo
ainda usa emojis como placeholder — a produção de um set de ícones outline
próprio ainda não foi feita.

## Botões

| Variante | Estilo | Token |
|---|---|---|
| Primário | Fundo dourado, texto branco | `botoes.primario` / `botoes.primarioTexto` |
| Secundário | Fundo rosé, texto oliva escuro | `botoes.secundario` / `botoes.secundarioTexto` |
| Terciário | Fundo branco, borda oliva escuro | `botoes.terciario` / `botoes.terciarioTexto` |
| Botão espiritual | Gradiente dourado + brilho suave | Implementado com `expo-linear-gradient` no botão "Ler devocional completo" do Lugar Secreto |

## Campos

Placeholder cinza, bordas arredondadas (`raios.campo`), ícone à esquerda
(quando aplicável), label superior.

## Cards

Grandes, com muito espaço interno. Estrutura de referência: ilustração
superior → título → descrição → botão.

## Navegação

O briefing original propõe uma Bottom Navigation de 5 itens: **Home, Vida
Devocional, Comunidade, Biblioteca, Perfil**. Isso é diferente da estrutura
de navegação atual do protótipo (Lugar Secreto, Bíblia, Diário, Jornadas,
Mais — com 13 telas adicionais dentro de "Mais", incluindo Comunidade,
Biblioteca e Perfil da Filha). Reestruturar a navegação para bater
exatamente com essas 5 abas é uma decisão de produto em aberto — ver
conversa com a liderança antes de implementar, pois afeta onde vivem todas
as outras 13 telas hoje agrupadas em "Mais".

## Stickers

Todos em aquarela, PNG transparente, 4K, nunca repetir ilustrações — um
sticker exclusivo por módulo. **Pendente**: exige produção de arte original
(ilustrador ou ferramenta de geração de imagem) ainda não disponível para o
projeto. O protótipo usa emojis como placeholder desses ícones.
