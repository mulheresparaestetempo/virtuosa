# App FILHA — Plataforma de Discipulado Feminino

> Documento de arquitetura e priorização, elaborado a partir do briefing original
> ("Projeto App FILHA — Plataforma de Discipulado Feminino") e da discussão de
> refinamento do plano.

## Slogan
"Todos os dias, um encontro com o Pai."

## Missão
Conduzir mulheres a uma vida de intimidade com Deus por meio de devocionais,
oração, discipulado e comunidade.

## Visão
Ser uma plataforma completa para ministérios femininos.

## Ecossistema
Instagram → WhatsApp → App FILHA → Igreja/Células.

O site Virtuosas (PIBAM Espraiado) atua como canal de entrada/ponte desse
ecossistema; o App FILHA é o produto de retenção e aprofundamento diário.

## Módulos do briefing original

- **Lugar Secreto** — tela inicial diária com devocional, áudio, oração, desafio e progresso
- **Biblioteca** — devocionais em PDF, áudio, texto e anotações
- **Jornada** — trilhas: Identidade, Desperta Filha, Vem Pra Perto Filha, Jejum, Cura, Família, Liderança
- **Memoriais** — marcos espirituais (em vez de "conquistas" gamificadas)
- **Diário** — registro de orações, respostas, reflexões e versículos
- **Jejum** — planos guiados e acompanhamento
- **Mapa** — localização de células e cultos no lar
- **Agenda** — eventos, conferências e calendário do ministério
- **Comunidade** — pedidos de oração, testemunhos e mensagens edificantes
- **Painel da Líder** — acompanhamento pastoral e engajamento
- **Assistente Bíblica** — IA baseada na Bíblia e materiais do ministério

Todos os 12 módulos juntos formam um produto completo, não um MVP. A seção
seguinte propõe uma priorização em ondas para viabilizar o lançamento.

## Priorização em ondas

### Onda 1 — Núcleo diário
- Lugar Secreto (devocional + áudio + oração do dia)
- Diário (orações e reflexões)
- Biblioteca (conteúdo já produzido em PDF/áudio)

Entrega o slogan do produto e é testável com um grupo pequeno de mulheres da
igreja em semanas, não meses.

### Onda 2 — Comunidade e acompanhamento
- Jornada (trilhas temáticas)
- Memoriais
- Comunidade (pedidos de oração/testemunhos)
- Painel da Líder (mínimo: frequência/engajamento, sem acesso ao conteúdo do Diário)
- Assistente Bíblica — versão de busca semântica (ver seção de IA)

### Onda 3 — Avançado
- Jejum guiado
- Mapa de células
- Agenda de eventos
- Assistente Bíblica — versão conversacional com RAG (ver seção de IA)

## Decisões de produto em aberto

1. **Plataforma**: PWA vs. app nativo (ver comparação abaixo)
2. **Privacidade do Diário**: conteúdo de oração é sensível (dado de convicção
   religiosa, LGPD); acesso da liderança deve ser opt-in explícito por entrada
   ou por padrão desligado, nunca acesso irrestrito
3. **Escopo do Painel da Líder**: acompanhar frequência/engajamento é diferente
   de acessar o conteúdo do Diário — linha ética que precisa ser traçada antes
   de construir a feature
4. **Assistente Bíblica**: escopo da v1 (busca semântica) vs. v2 (RAG
   conversacional) e processo de curadoria pastoral
5. **Relação com o repositório atual**: o site Virtuosas permanece como canal
   de entrada e o App FILHA nasce como produto separado, ou tudo passa a ser
   a mesma plataforma com uma área nova

## PWA vs. App Nativo

| Critério | PWA | Nativo (React Native/Flutter) |
|---|---|---|
| Custo/velocidade de lançamento | Baixo — reaproveita HTML/CSS/JS já existente no repo | Alto — novo stack, novas lojas de app |
| Notificação diária | Boa no Android; limitada no iOS (Web Push só a partir do iOS 16.4, requer "adicionar à tela de início") | Nativa e confiável nas duas plataformas |
| Áudio offline | Possível via Service Worker + cache, mais frágil | Suporte nativo maduro |
| Distribuição | Link direto, encaixa no funil Instagram → WhatsApp → App | Requer loja, mais fricção de instalação |
| Descoberta/retenção | Sem ícone fixo na loja | Ícone na tela, reforça hábito diário |

**Recomendação:** começar com PWA na Onda 1 (custo baixo, validação rápida) e
migrar para nativo quando notificação diária confiável e Painel da Líder se
tornarem críticos — normalmente já na Onda 2.

## Modelo de dados — rascunho (Diário e Jornada)

```
usuaria
  id, nome, celula_id (nullable), lider_id (nullable), criado_em

devocional
  id, dia (data), titulo, texto, audio_url, versiculo_base, trilha_id (nullable)

jornada (trilha)
  id, nome        // "Identidade", "Desperta Filha", "Jejum", "Cura", "Família", "Liderança"
  ordem, descricao

jornada_etapa
  id, jornada_id, ordem, devocional_id

diario_entrada
  id, usuaria_id, data, tipo (oracao | resposta | reflexao | versiculo)
  texto, criptografado (bool), visivel_para_lider (bool, default false)

memorial
  id, usuaria_id, data, titulo, descricao
  // marco espiritual — registro narrativo, não "badge" de gamificação

progresso
  usuaria_id, devocional_id, concluido_em
```

Ponto crítico: `diario_entrada.visivel_para_lider` deve ter padrão `false` e
ser controlado pela própria usuária, para que o "acompanhamento pastoral" não
vire vigilância do conteúdo pessoal.

## Arquitetura da Assistente Bíblica

**Opção A — Busca semântica (Onda 2, baixo risco)**
- Índice de embeddings sobre versículos + devocionais próprios do ministério
- Busca por tema/sentimento (ex.: "estou ansiosa" → versículos e devocionais relacionados)
- Sem geração livre de texto → zero risco de alucinação teológica

**Opção B — RAG conversacional (Onda 3)**
- Base vetorial restrita a: Bíblia (tradução definida pela igreja) + materiais
  autorais do ministério — nunca conhecimento geral de teologia do modelo
- Prompt de sistema limitando a assistente a citar apenas fontes recuperadas,
  com fallback do tipo "não tenho uma resposta baseada no material do
  ministério para isso"
- Requer curadoria pastoral revisando respostas antes do lançamento — maior
  risco reputacional do produto

**Recomendação:** nenhuma IA na Onda 1. Opção A na Onda 2 (resolve a maior
parte da necessidade prática sem risco). Opção B só após volume de conteúdo
curado e processo de revisão pastoral definido.
