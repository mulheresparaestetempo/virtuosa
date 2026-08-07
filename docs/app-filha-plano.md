# App Abba Virtuosa — Plataforma de Discipulado Feminino

> Documento de arquitetura e priorização. Consolida o briefing original
> ("Projeto App FILHA — Plataforma de Discipulado Feminino", nome de
> trabalho do projeto antes do rebranding para Abba Virtuosa), a estrutura
> expandida de 18 módulos definida como base oficial do projeto, e a
> discussão de refinamento (priorização, modelo de dados, decisões de
> privacidade e arquitetura da IA).

## Slogan
"Todos os dias, um encontro com o Pai."

## Missão
Conduzir mulheres a uma vida de intimidade com Deus, fortalecendo sua
caminhada espiritual por meio do discipulado, da Palavra, da oração, da
comunhão e do cuidado pastoral, até que elas também estejam preparadas para
discipular outras mulheres.

## Visão da plataforma
Construir o aplicativo cristão feminino mais completo do Brasil. O Abba
Virtuosa não é apenas um aplicativo de devocionais. É uma plataforma de
discipulado feminino, conectando mulheres, líderes, igrejas e ministérios em
torno de quatro pilares:

1. **Intimidade com Deus** — devocionais, oração, jejum e Bíblia
2. **Crescimento espiritual** — jornadas, cursos, diário e memoriais
3. **Comunhão** — discipulado, comunidade, acolhimento e culto no lar
4. **Cuidado pastoral** — acompanhamento por líderes, células e igrejas

## Ecossistema
Instagram → WhatsApp → App Abba Virtuosa → Igreja/Células.

O site Virtuosas (PIBAM Espraiado) atua como canal de entrada/ponte desse
ecossistema; o App Abba Virtuosa é o produto de retenção, formação e cuidado
contínuo.

## Identidade visual

**Slogan:** "Todos os dias, um encontro com o Pai."

O aplicativo deve transmitir paz. Cada tela deve fazer a usuária sentir que
entrou em seu Lugar Secreto. Toda a experiência deve ser elegante,
minimalista, sofisticada, feminina, cristã e premium — inspirada em
referências como Bible App, Abide, Glorify, Soulspace, Calm, Headspace e
Pinterest (flores, folhas, oliveiras, aquarela, luz dourada, muito espaço
branco).

**Princípios:** nada de gamificação competitiva — sem ranking, sem pontos,
sem competição. O crescimento é espiritual. No lugar de "conquistas", os
marcos chamam-se **Memoriais**: cada um representa algo que Deus fez.

**Paleta de cores**

| Uso | Cor | Hex |
|---|---|---|
| Fundo principal | Creme | `#F7F3EE` |
| Secundária | Rosé | `#EBC9C5` |
| Dourado | Dourado | `#C6A46A` |
| Oliva | Verde oliva | `#A6B38E` |
| Texto | Cinza-marrom escuro | `#3E3A36` |
| Fundo de cards | Branco | `#FFFFFF` |

Implementada em `app-filha/src/theme.ts`.

**Tipografia**
- Playfair Display — títulos de destaque
- Cormorant Garamond — versículos e citações (itálico, delicado)
- Poppins — botões e rótulos de interface
- Inter — corpo de texto e leitura longa

Implementada via `@expo-google-fonts/*` e carregada em `app-filha/App.tsx`;
tokens em `app-filha/src/theme.ts` (`fontes`).

**Estilo de tela:** bordas arredondadas, sombras suaves, cards grandes,
ícones minimalistas, espaçamento amplo, microinterações discretas. Cada
módulo idealmente tem um sticker exclusivo em aquarela (sem fundo, alta
resolução, nunca repetido) — pendente: este protótipo ainda usa emojis como
placeholder dos ícones de módulo, já que a produção de ilustrações originais
exige um banco de assets próprio (ilustrador ou ferramenta de geração de
imagem) que ainda não foi produzido para o projeto.

## Estrutura oficial — 18 módulos

Esta lista substitui/expande a versão inicial de 12 módulos e é a base
oficial do projeto: preserva a essência do documento original (devocional,
discipulado, comunidade, liderança e IA) e amplia o alcance para uma
plataforma completa de formação, acompanhamento e cuidado espiritual.

### 1. Lugar Secreto 🕊️ — tela principal
Devocional diário, versículo do dia, áudio devocional, oração guiada,
desafio do dia, cartinha do Pai, música ambiente, tempo de oração.

### 2. Vida Devocional 🙏
- **Oração** — diário de oração, pedidos, respostas, gratidão, histórico
- **Jejum** — criar propósito, tipo, horários, dias, cronômetro, diário do
  jejum, reflexões, respostas recebidas, compartilhar com discipuladora (opcional)
- **Plano de leitura** — Bíblia em um ano, Evangelhos, Mulheres da Bíblia,
  Salmos, Provérbios, temáticos

### 3. Bíblia 📖
Bíblia integrada, pesquisa, marcações, favoritos, anotações, comparação de
traduções (quando permitido por licenciamento).

### 4. Jornadas 🌱
Trilhas de crescimento: Novo Começo → Identidade → Vida de Oração → Jejum →
Santidade → Família → Serviço → Evangelismo → Liderança → Discipuladora.
Cada jornada tem vídeos, PDFs, áudios, exercícios, desafios e oração.

### 5. Memoriais 🌸
No lugar de "conquistas": primeiro devocional, primeiro jejum, primeira
oração registrada, primeira jornada, primeiro culto no lar, primeira visita
recebida, primeiro testemunho, um ano caminhando com Deus, tornou-se
discipuladora. Registrado como lembrança da fidelidade de Deus.

### 6. Diário Espiritual 📔
O que Deus falou, sonhos, promessas, revelações, reflexões, gratidão,
versículos.

### 7. Comunidade ❤️
Pedidos de oração, testemunhos, mensagens, compartilhar experiências,
desafios semanais.

### 8. Acolhimento 🤝
Solicitar: visita pastoral, visita de acolhimento, culto no lar, conversa
com líder, discipulado, oração presencial, visita hospitalar, conhecer uma
igreja, participar de uma célula. Cada pedido é acompanhado até sua conclusão.

### 9. Minha Discipuladora 👩🏻
Perfil, agenda, conversas, metas, acompanhamento, próximo encontro.

### 10. Minha Caminhada ✨
Linha do tempo espiritual: batismo, jornadas, jejuns, orações, memoriais,
testemunhos, eventos, cursos, visitas.

### 11. Biblioteca 🎧
Devocionais, podcasts, pregações, estudos, e-books, conferências, áudios.

### 12. Agenda 📅
Eventos, congressos, campanhas, conferências, jejuns coletivos, vigílias,
Santa Ceia.

### 13. Assistente Bíblica (IA) 🤖
Responde utilizando a Bíblia e os materiais do ministério. Explica
passagens, sugere planos de leitura, cria orações baseadas nas Escrituras,
ajuda em estudos bíblicos, responde dúvidas, encontra versículos por tema.

### 14. Painel da Líder 👩🏻‍💼
Acompanha: discípulas, jornadas, jejuns (quando compartilhados), pedidos de
oração, visitas, cultos no lar, acolhimentos, frequência, crescimento
espiritual.

### 15. Painel da Igreja ⛪
Gestão completa: igrejas, ministérios, líderes, células, eventos,
conteúdos, relatórios.

### 16. Mapa
Encontrar igrejas, células, cultos no lar, conferências.

### 17. Missões 🌍
Missionários, projetos, motivos de oração, campanhas missionárias.

### 18. Perfil da Filha 🌺
Igreja, líder, discipuladora, ministério, dons, batismo, conversão,
caminhada espiritual, memoriais.

## Princípio transversal
Todas as funcionalidades devem conversar entre si: um jejum registrado em
"Vida Devocional" gera um Memorial; um pedido de Acolhimento aparece no
Painel da Líder; concluir uma Jornada atualiza "Minha Caminhada"; um
testemunho na Comunidade pode virar Memorial. O dado é único por usuária —
os módulos são visualizações diferentes do mesmo histórico espiritual, não
sistemas isolados.

## Priorização em ondas

Com 18 módulos, lançar tudo de uma vez inviabiliza o projeto. A priorização
abaixo busca entregar o núcleo da experiência primeiro e adicionar gestão/IA
depois que há conteúdo e engajamento reais para sustentá-los.

### Onda 1 — Núcleo diário e identidade da usuária
- Lugar Secreto
- Vida Devocional (Oração + Plano de leitura; Jejum simples entra na Onda 2 com todos os campos)
- Bíblia integrada (leitura, pesquisa, marcações, favoritos)
- Diário Espiritual
- Biblioteca (conteúdo já produzido)
- Perfil da Filha (dados básicos: igreja, líder, batismo)

Entrega o slogan do produto e é testável com um grupo pequeno de mulheres da
igreja em semanas, não meses.

### Onda 2 — Discipulado e comunidade
- Jornadas (trilhas completas)
- Memoriais
- Jejum completo (propósito, cronômetro, diário do jejum, compartilhamento opcional)
- Comunidade (pedidos de oração, testemunhos)
- Acolhimento (fluxo de solicitação → acompanhamento até conclusão)
- Minha Discipuladora
- Minha Caminhada (linha do tempo, alimentada pelos módulos acima)
- Painel da Líder (mínimo: frequência/engajamento, acolhimentos, sem acesso ao conteúdo do Diário)
- Assistente Bíblica — versão de busca semântica (ver seção de IA)
- Agenda

### Onda 3 — Gestão e alcance
- Painel da Igreja (gestão de igrejas, ministérios, células, relatórios)
- Mapa (igrejas, células, cultos no lar)
- Missões
- Assistente Bíblica — versão conversacional com RAG (ver seção de IA)

## Decisões de produto em aberto

1. **Plataforma**: PWA vs. app nativo (ver comparação abaixo)
2. **Privacidade do Diário e do Jejum**: conteúdo de oração/jejum é sensível
   (dado de convicção religiosa, LGPD); compartilhamento com discipuladora/
   liderança deve ser opt-in explícito por entrada ou por padrão desligado,
   nunca acesso irrestrito
3. **Escopo do Painel da Líder vs. Painel da Igreja**: o primeiro acompanha
   pessoas (discípulas), o segundo acompanha estrutura (igrejas, células,
   ministérios) — evitar que um vire extensão do outro sem controle de
   permissão por papel (líder de célula ≠ gestor de igreja)
4. **Fluxo de Acolhimento**: quem recebe cada tipo de pedido (visita
   pastoral vs. visita de acolhimento vs. culto no lar) e qual é o SLA de
   resposta — sem isso o módulo vira uma caixa de pedidos sem dono
5. **Assistente Bíblica**: escopo da v1 (busca semântica) vs. v2 (RAG
   conversacional) e processo de curadoria pastoral
6. **Comparação de traduções bíblicas**: depende de licenciamento de cada
   versão — verificar direitos antes de incluir mais de uma tradução
7. **Relação com o repositório atual**: o site Virtuosas permanece como
   canal de entrada e o App Abba Virtuosa nasce como produto separado, ou
   tudo passa a ser a mesma plataforma com uma área nova

## PWA vs. App Nativo

| Critério | PWA | Nativo (React Native/Flutter) |
|---|---|---|
| Custo/velocidade de lançamento | Baixo — reaproveita HTML/CSS/JS já existente no repo | Alto — novo stack, novas lojas de app |
| Notificação diária | Boa no Android; limitada no iOS (Web Push só a partir do iOS 16.4, requer "adicionar à tela de início") | Nativa e confiável nas duas plataformas |
| Áudio offline | Possível via Service Worker + cache, mais frágil | Suporte nativo maduro |
| Distribuição | Link direto, encaixa no funil Instagram → WhatsApp → App | Requer loja, mais fricção de instalação |
| Descoberta/retenção | Sem ícone fixo na loja | Ícone na tela, reforça hábito diário |

**Recomendação:** começar com PWA na Onda 1 (custo baixo, validação rápida) e
migrar para nativo quando notificação diária confiável, Painel da Líder e
Painel da Igreja se tornarem críticos — normalmente já na Onda 2/3.

## Modelo de dados — rascunho

```
usuaria (Perfil da Filha)
  id, nome, igreja_id, celula_id (nullable), lider_id (nullable),
  discipuladora_id (nullable), ministerio, dons, data_batismo,
  data_conversao, criado_em

igreja
  id, nome, endereco, criado_em

celula
  id, igreja_id, lider_id, endereco, dia_horario

discipuladora_relacao
  id, usuaria_id, discipuladora_id, meta, proximo_encontro, status

devocional
  id, dia (data), titulo, texto, audio_url, versiculo_base, trilha_id (nullable)

jornada (trilha)
  id, nome        // "Novo Começo", "Identidade", "Vida de Oração", "Jejum",
                  // "Santidade", "Família", "Serviço", "Evangelismo",
                  // "Liderança", "Discipuladora"
  ordem, descricao

jornada_etapa
  id, jornada_id, ordem, devocional_id, video_url, pdf_url, exercicio

plano_leitura
  id, nome, dias_total   // Bíblia em um ano, Evangelhos, Mulheres da Bíblia, Salmos...

diario_entrada
  id, usuaria_id, data, tipo (oracao | resposta | reflexao | versiculo | sonho | promessa)
  texto, criptografado (bool), visivel_para_discipuladora (bool, default false)

jejum
  id, usuaria_id, proposito, tipo, data_inicio, dias, horarios,
  compartilhado_com_discipuladora (bool, default false)

jejum_registro
  id, jejum_id, data, reflexao, resposta_recebida

memorial
  id, usuaria_id, data, tipo, titulo, descricao
  // marco espiritual — registro narrativo, não "badge" de gamificação

acolhimento_pedido
  id, usuaria_id, tipo (visita_pastoral | visita_acolhimento | culto_no_lar |
  conversa_lider | discipulado | oracao_presencial | visita_hospitalar |
  conhecer_igreja | participar_celula)
  responsavel_id (nullable), status (aberto | em_andamento | concluido), criado_em

comunidade_post
  id, usuaria_id, tipo (pedido_oracao | testemunho | mensagem), texto, criado_em

progresso
  usuaria_id, devocional_id | jornada_etapa_id, concluido_em
```

Pontos críticos de privacidade:
- `diario_entrada.visivel_para_discipuladora` e
  `jejum.compartilhado_com_discipuladora` devem ter padrão `false` e ser
  controlados pela própria usuária, para que o cuidado pastoral não vire
  vigilância do conteúdo pessoal.
- `acolhimento_pedido` precisa de dono (`responsavel_id`) desde o primeiro
  registro — sem isso, pedidos de visita/acolhimento se perdem.

## Arquitetura da Assistente Bíblica

**Opção A — Busca semântica (Onda 2, baixo risco)**
- Índice de embeddings sobre versículos + devocionais próprios do ministério
- Busca por tema/sentimento (ex.: "estou ansiosa" → versículos e devocionais relacionados)
- Sugestão de planos de leitura por tema
- Sem geração livre de texto → zero risco de alucinação teológica

**Opção B — RAG conversacional (Onda 3)**
- Base vetorial restrita a: Bíblia (tradução definida pela igreja) + materiais
  autorais do ministério — nunca conhecimento geral de teologia do modelo
- Prompt de sistema limitando a assistente a citar apenas fontes recuperadas,
  com fallback do tipo "não tenho uma resposta baseada no material do
  ministério para isso"
- Pode gerar orações baseadas nas Escrituras e apoiar estudos bíblicos, mas
  sempre ancorada nas fontes recuperadas
- Requer curadoria pastoral revisando respostas antes do lançamento — maior
  risco reputacional do produto

**Recomendação:** nenhuma IA na Onda 1. Opção A na Onda 2 (resolve a maior
parte da necessidade prática sem risco). Opção B só após volume de conteúdo
curado e processo de revisão pastoral definido.
