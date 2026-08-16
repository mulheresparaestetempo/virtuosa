# 🎛️ Painel Admin - Documentação Completa

## 📍 Localização
- **Web**: `apps/painel_lider/`
- **Build**: Next.js 14.2.0 com React 18.3.0
- **Deploy**: Vercel (buildCommand: `cd apps/painel_lider && npm ci && npm run build`)

---

## 🔐 Autenticação

### Login
- URL: `https://virtuosa.vercel.app/login`
- Email e senha (Firebase Authentication)
- Criar conta: alterne para "Registre-se" na página de login
- Proteção de rota: páginas `/admin/*` redirecionam para login se não autenticado

### Estrutura de Auth
```
lib/services/auth-service.ts    → Login, Registro, Logout
lib/context/auth-context.tsx    → Context React para autenticação
app/admin/layout.tsx            → Protetor de rota
app/layout.tsx                  → AuthProvider wrapper
```

---

## 📦 Módulos do Painel Admin

### 1️⃣ **PDFs** (`/admin/pdf-manager`)
**Funcionalidade**: Gerenciar biblioteca de recursos (guias, apostilas, documentos)

- ✅ Upload de arquivos PDF
- ✅ Armazenamento no Firebase Storage
- ✅ Lista de documentos com data e tamanho
- ✅ Download direto do PDF
- ✅ Exclusão de documentos

**Dados salvos**: Firestore (`collection: pdfs`)
```
{
  id: string,
  name: string,
  url: string,
  size: number,
  uploadedAt: Date,
  uploadedBy: string
}
```

**Serviço**: `lib/services/pdf-service.ts`
- `uploadPDF(file, name, userId)`
- `getPDFs()`
- `deletePDF(id, storagePath)`

---

### 2️⃣ **Calendário** (`/admin/calendar`)
**Funcionalidade**: Publicar eventos (retiros, cultos, encontros)

- ✅ Criar evento com data/hora
- ✅ 4 tipos: Retiro, Culto, Encontro, Outro
- ✅ Descrição opcional
- ✅ Ordenação automática por data
- ✅ Exclusão de eventos

**Dados salvos**: Firestore (`collection: events`)
```
{
  id: string,
  title: string,
  date: string (YYYY-MM-DD),
  time: string (HH:mm),
  description: string,
  type: 'retiro' | 'culto' | 'encontro' | 'outro',
  createdAt: Date,
  createdBy: string
}
```

**Serviço**: `lib/services/calendar-service.ts`
- `createEvent(event, userId)`
- `getEvents()`
- `deleteEvent(eventId)`

---

### 3️⃣ **Devocionais** (`/admin/devocional`)
**Funcionalidade**: Publicar meditações diárias

- ✅ Data de publicação
- ✅ Título da meditação
- ✅ Versículo(s) bíblico(s)
- ✅ Reflexão completa
- ✅ Oração de encerramento
- ✅ Histórico de devocionais

**Dados salvos**: Firestore (`collection: devotionals`)
```
{
  id: string,
  date: string (YYYY-MM-DD),
  title: string,
  versicles: string,
  reflection: string,
  prayer: string,
  publishedAt: Date,
  publishedBy: string
}
```

**Serviço**: `lib/services/devocional-service.ts`
- `publishDevocional(devocional, userId)`
- `getDevotionals()`
- `deleteDevocional(devId)`

---

### 4️⃣ **Avisos** (`/admin/avisos`)
**Funcionalidade**: Enviar notificações para usuárias

- ✅ Título e mensagem
- ✅ 3 níveis de prioridade: Baixa, Média, Alta
- ✅ Histórico de avisos enviados
- ✅ Contador de destinatárias
- ✅ Exclusão de avisos

**Dados salvos**: Firestore (`collection: avisos`)
```
{
  id: string,
  title: string,
  message: string,
  priority: 'baixa' | 'média' | 'alta',
  sentAt: Date,
  sentBy: string,
  recipientCount: number
}
```

**Serviço**: `lib/services/avisos-service.ts`
- `sendAviso(aviso, userId, recipientCount)`
- `getAvisos()`
- `deleteAviso(avisoId)`

---

## 🔗 Integração com App FILHA

### Consumir dados do Painel Admin
O app mobile (app-filha) consome dados do Firestore usando:

**Arquivo**: `app-filha/src/services/firestore-service.ts`

```typescript
// Buscar PDFs para Biblioteca
const pdfs = await getBibliotecaPDFs();

// Buscar eventos próximos
const eventos = await getProximosEventos();

// Buscar devocional do dia
const devocional = await getDevocionalAtual();

// Buscar últimos avisos
const avisos = await getUltimosAvisos();
```

### Fluxo de Dados
```
Painel Admin (Web)
    ↓
Firebase Firestore
    ↓
App FILHA (Mobile)
```

---

## 🗄️ Estrutura Firebase

### Collections
- **pdfs** - Documentos PDF da biblioteca
- **events** - Eventos do calendário
- **devotionals** - Devocionais publicados
- **avisos** - Avisos/notificações enviadas

### Storage
- **pdfs/** - Arquivos PDF armazenados

### Credenciais
Usando o mesmo projeto Firebase que o app-filha:
```
projectId: app-filha-af1f9
authDomain: app-filha-af1f9.firebaseapp.com
storageBucket: app-filha-af1f9.firebasestorage.app
```

---

## 🚀 URLs de Acesso

### Produção (Vercel)
- **Dashboard**: https://virtuosa.vercel.app
- **Login**: https://virtuosa.vercel.app/login
- **Admin Hub**: https://virtuosa.vercel.app/admin
- **PDFs**: https://virtuosa.vercel.app/admin/pdf-manager
- **Calendário**: https://virtuosa.vercel.app/admin/calendar
- **Devocionais**: https://virtuosa.vercel.app/admin/devocional
- **Avisos**: https://virtuosa.vercel.app/admin/avisos

---

## 🎨 Design

- **Tema**: Abba Virtuosa Design System v1.0
- **Cores**: Rosé, Dourado, Bege
- **Tipografia**: Caveat, Cormorant Garamond, Poppins, Inter
- **Componentes**: Cards, Formulários, Tabelas com validação

---

## 📋 Checklist de Funcionalidades

### ✅ Implementado
- [x] 4 módulos completos (PDFs, Calendário, Devocionais, Avisos)
- [x] Integração com Firebase (Auth, Firestore, Storage)
- [x] Autenticação com email/senha
- [x] Proteção de rota para usuários autenticados
- [x] Upload de arquivos PDF
- [x] Gerenciamento de eventos
- [x] Publicação de devocionais
- [x] Envio de avisos com prioridade
- [x] Interface responsiva
- [x] Tratamento de erros
- [x] Feedback de carregamento
- [x] Histórico de operações

### 🔄 Próximos Passos
- [ ] Notificações push quando devocionais são publicados
- [ ] Dashboard com métricas (usuários ativos, engajamento)
- [ ] Gerenciamento de usuários
- [ ] Relatórios de atividade
- [ ] Integração com Google Drive/Dropbox para PDFs
- [ ] Agendamento automático de avisos

---

## 📞 Suporte

Para integração com o app mobile, consulte:
- `GUIA-FILHA-APP.md` - Documentação do app mobile
- `docs/app-filha-design-system.md` - Design system

