# 📊 Guia Completo — Painel Admin FILHA

> **Status**: ✅ Pronto para uso  
> **Versão**: 1.0.0  
> **Data**: 2026-08-16

---

## 🚀 Começar Rapidamente

### Acessar o Painel Admin

1. **Acesse**: https://virtuosa.vercel.app/admin
2. **Faça login** com sua conta de admin
3. **Gerencie conteúdo** nas 4 abas disponíveis

**Requisitos**:
- ✅ Conta criada no Firebase com papel `admin`
- ✅ Acesso a upload de arquivos (Firebase Storage)
- ✅ Conexão com internet

---

## 📱 4 Funções Principais

### 1. 📄 **PDFs** — Biblioteca de Recursos

**O que faz**: Upload e gerenciamento de arquivos PDF

**Como usar**:
1. Clique na aba "📄 PDFs"
2. Preencha:
   - **Título**: Nome do PDF (ex: "Guia de Jejum")
   - **Descrição**: Breve resumo
   - **Arquivo**: Selecione o PDF do seu computador
3. Clique "Salvar"
4. PDF aparece automaticamente no app FILHA (aba Biblioteca)

**Exemplo de conteúdo**:
- Guias de leitura bíblica
- Apostilas de estudos
- Manuais de grupos pequenos
- Documentos de oração

---

### 2. 📅 **Calendário** — Eventos e Datas Importantes

**O que faz**: Publicação de eventos, retiros, encontros

**Como usar**:
1. Clique na aba "📅 Calendário"
2. Preencha:
   - **Título**: Nome do evento (ex: "Retiro Anual")
   - **Descrição**: Detalhes do evento
   - **Data/Hora**: Quando o evento acontece
3. Clique "Salvar"
4. Evento aparece no calendário do app

**Exemplo de eventos**:
- Retiros e encontros
- Cultos e celebrações
- Treinamentos de líderes
- Grupos pequenos

---

### 3. ✦ **Devocional** — Meditações Diárias

**O que faz**: Publicar devocionais para o app FILHA

**Como usar**:
1. Clique na aba "✦ Devocional"
2. Preencha:
   - **Título**: Tema do devocional (ex: "Confiança em Deus")
   - **Descrição**: Resumo/introdução
   - **Conteúdo**: Texto completo do devocional
3. Clique "Salvar"
4. Devocional fica disponível na aba Devocional do app

**Estrutura sugerida**:
```
TÍTULO
Versículo-chave
Reflexão (3-4 parágrafos)
Oração
```

**Exemplo**:
```
Confiança em Deus

Salmos 37:4
"Agrada-te do Senhor, e ele te concederá os desejos do teu coração."

[conteúdo da meditação]

Oração: Pai, ensina-me a confiar em ti...
```

---

### 4. 📢 **Avisos** — Comunicados Importantes

**O que faz**: Enviar avisos/notificações para todas as usuárias

**Como usar**:
1. Clique na aba "📢 Avisos"
2. Preencha:
   - **Título**: Assunto do aviso
   - **Descrição**: Mensagem completa
3. Clique "Salvar"
4. Aviso aparece destacado no app FILHA

**Exemplos de avisos**:
- "Culto cancelado na próxima semana"
- "Novo grupo de oração aberto"
- "Atualização importante do app"
- "Mudança de horário do encontro"

---

## 🔐 Permissões de Acesso

| Papel | Pode Acessar |
|---|---|
| **Admin** | Painel Admin (4 abas) + Gerenciar Líderes |
| **Líder** | Página de Liderança (vincular discípulas) |
| **Membro** | Apenas o app FILHA |

**Como virar Admin**:
Peça para o admin master editar no Firestore:
```
Coleção: usuarias
Documento: seu_uid
Campo: papel = "admin"
```

---

## 📊 Dashboard Principal

**Acesse em**: https://virtuosa.vercel.app/dashboard

Mostra:
- ✅ Seu nome e papel
- ✅ Links rápidos para todas as áreas
- ✅ Status de conexão
- ✅ Acesso ao painel admin

---

## 💡 Dicas e Boas Práticas

### ✅ Fazendo certo:

**PDFs**
- Use nomes claros e objetivos
- Máximo 10MB por arquivo
- Sempre adicione descrição

**Eventos**
- Defina data e hora precisas
- Adicione link do local (se remoto)
- Lembre com antecedência (1 semana antes)

**Devocionais**
- Publique com consistência (ex: diariamente)
- Use linguagem simples e acessível
- Inclua sempre um versículo-chave

**Avisos**
- Use apenas para comunicados importantes
- Não envie spam
- Máximo 2-3 avisos por semana

### ❌ Evitando problemas:

- ❌ Não upload PDFs muito grandes (>10MB)
- ❌ Não publique conteúdo duplicado
- ❌ Não mude datas de eventos já publicados (exclua e recrie)
- ❌ Não use caracteres especiais em nomes de arquivo

---

## 🔧 Estrutura Técnica

**Banco de dados** (Firestore):
```
recursos/
  ├── id1: { tipo: "pdf", titulo: "...", url: "..." }
  ├── id2: { tipo: "calendario", data: "2026-09-15", ... }
  ├── id3: { tipo: "devocional", conteudo: "...", ... }
  └── id4: { tipo: "aviso", descricao: "...", ... }
```

**Storage** (Firebase Storage):
```
recursos/
  ├── pdfs/
  │   └── [arquivo].pdf
  ├── calendario/
  └── devocional/
```

---

## 🆘 Troubleshooting

### "Erro ao salvar"
- ✅ Verifique internet
- ✅ Confira se o arquivo não está corrompido
- ✅ Reduza o tamanho se for grande

### "Acesso restrito"
- ✅ Confirme seu papel é "admin" no Firestore
- ✅ Faça logout e login novamente

### "PDF não aparece no app"
- ✅ Aguarde 2-3 minutos para sincronizar
- ✅ Feche e reabra o app FILHA
- ✅ Verifique se o PDF foi salvo (procure na lista)

### "Evento desapareceu"
- ✅ Não foi excluído? Procure na lista
- ✅ Data passou? Recrie com data futura

---

## 📈 Estatísticas e Monitoramento

**Verifique em Firestore**:
1. Vá para Console Firebase
2. Selecione seu projeto
3. Firestore Database → Coleção "recursos"
4. Veja todos os conteúdos publicados

**Métricas úteis**:
- Total de PDFs: `db.collection('recursos').where('tipo', '==', 'pdf').get().size`
- Eventos próximos: Datas maiores que hoje
- Últimas atualizações: Ordenar por `atualizadoEm`

---

## 🚀 Próximas Melhorias (Roadmap)

- [ ] Editor visual para devocionais
- [ ] Agendamento automático de conteúdo
- [ ] Categorização de PDFs
- [ ] Análise de engajamento
- [ ] Notificações push integradas
- [ ] Tradução para múltiplos idiomas

---

## 📞 Suporte

- **Repositório**: https://github.com/mulheresparaestetempo/virtuosa
- **Issues/Bugs**: Abra uma issue no GitHub
- **Email**: daianefeliciano.df@gmail.com

---

**Desenvolvido com ❤️ para Mulheres Virtuosas**

Última atualização: 2026-08-16
