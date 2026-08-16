# Database Documentation

Firestore database schema, collections, and relationships for Abba Virtuosa.

## Database Overview

- **Type:** NoSQL (Firestore)
- **Strategy:** Offline-first with automatic sync
- **Collections:** 23+ independent collections
- **Relationships:** Document ID references

## Collections

### User Management

#### `users` - User profiles
```
uid (string, docId)
  ├── nome (string)
  ├── email (string)
  ├── telefone (string)
  ├── fotoPerfil (string, URL)
  ├── dataNascimento (timestamp)
  ├── cidade (string)
  ├── estado (string)
  ├── pais (string)
  ├── igrejaId (reference → churches)
  ├── liderId (reference → users)
  ├── discipuladoraId (reference → users)
  ├── ministerio (enum: interceder, hospitalidade, etc)
  ├── dons (array<string>)
  ├── batizada (boolean)
  ├── dataBatismo (timestamp)
  ├── dataConversao (timestamp)
  ├── biografia (string)
  ├── nivelJornada (enum: iniciante, intermediaria, avancada)
  ├── role (enum: usuario, discipuladora, lider, pastora, administradora)
  ├── configuracoes (map)
  │   ├── notificacoes (boolean)
  │   ├── tema (enum: claro, escuro, sistema)
  │   └── idioma (enum: pt, en, es)
  ├── ultimoLogin (timestamp)
  ├── criadoEm (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: ativo, inativo, bloqueado)
```

#### `churches` - Church organizations
```
id (string, docId)
  ├── nome (string)
  ├── endereco (string)
  ├── cidade (string)
  ├── estado (string)
  ├── pais (string)
  ├── fonoechurch (string, URL)
  ├── pastoraPrincipalId (reference → users)
  ├── membros (array<userId>)
  ├── descricao (string)
  ├── criadoEm (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: ativa, inativa, suspensa)
```

### Spiritual Practices

#### `prayers` - Prayer requests
```
id (string, docId)
  ├── userId (reference → users)
  ├── titulo (string)
  ├── descricao (string)
  ├── categoria (enum: pessoal, familiar, trabalho, saude)
  ├── prioridade (enum: baixa, media, alta, urgente)
  ├── status (enum: aberta, respondida, encerrada)
  ├── curtidas (number)
  ├── comentarios (array<comment>)
  ├── criada_em (timestamp)
  ├── atualizadoEm (timestamp)
  └── respondidaEm (timestamp)
```

#### `devotionals` - Daily devotionals
```
id (string, docId)
  ├── titulo (string)
  ├── descricao (string)
  ├── conteudo (string)
  ├── autor (reference → users)
  ├── igrejaId (reference → churches)
  ├── versiculoPrincipal (string)
  ├── audio (string, URL)
  ├── dataDeDica (date)
  ├── criadoEm (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: rascunho, publicado, arquivado)
```

#### `fastings` - Fasting tracking
```
id (string, docId)
  ├── userId (reference → users)
  ├── titulo (string)
  ├── objetivo (string)
  ├── tipo (enum: alimentos, midia, redes_sociais, etc)
  ├── dataInicio (timestamp)
  ├── dataFim (timestamp)
  ├── notas (string)
  ├── status (enum: ativa, concluida, cancelada)
  ├── criada_em (timestamp)
  └── atualizadoEm (timestamp)
```

#### `journals` - Personal journals
```
id (string, docId)
  ├── userId (reference → users)
  ├── titulo (string)
  ├── conteudo (string)
  ├── tags (array<string>)
  ├── sentimento (enum: alegre, triste, neutro, grato, ansioso)
  ├── referencias (array<string>)
  ├── criada_em (timestamp)
  ├── atualizadoEm (timestamp)
  └── privacidade (enum: privada, compartilhada)
```

#### `memorials` - Memorial notes
```
id (string, docId)
  ├── userId (reference → users)
  ├── titulo (string)
  ├── descricao (string)
  ├── data (timestamp)
  ├── tipo (enum: aniversario, conversao, marco_espiritual)
  ├── criada_em (timestamp)
  └── atualizadoEm (timestamp)
```

### Community & Sharing

#### `communityPosts` - Community forum posts
```
id (string, docId)
  ├── userId (reference → users)
  ├── comunidadeId (reference → communities)
  ├── titulo (string)
  ├── conteudo (string)
  ├── media (array<string, URLs>)
  ├── curtidas (array<userId>)
  ├── comentarios (number)
  ├── criada_em (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: visivel, oculto, deletado)
```

#### `communities` - Interest groups
```
id (string, docId)
  ├── nome (string)
  ├── descricao (string)
  ├── foto (string, URL)
  ├── moderadores (array<userId>)
  ├── membros (array<userId>)
  ├── criadoEm (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: ativa, inativa, privada)
```

### Content & Learning

#### `library` - Resource library
```
id (string, docId)
  ├── titulo (string)
  ├── descricao (string)
  ├── tipo (enum: livro, video, audio, artigo)
  ├── url (string)
  ├── autor (string)
  ├── tags (array<string>)
  ├── favoritos (array<userId>)
  ├── criadoEm (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: publicado, rascunho)
```

#### `courses` - Learning courses
```
id (string, docId)
  ├── titulo (string)
  ├── descricao (string)
  ├── instrutor (reference → users)
  ├── duracao (number, dias)
  ├── modulos (array<module_id>)
  ├── criada_em (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: ativa, inativa)
```

### Events & Scheduling

#### `events` - Church events
```
id (string, docId)
  ├── titulo (string)
  ├── descricao (string)
  ├── igrejaId (reference → churches)
  ├── organizador (reference → users)
  ├── dataHora (timestamp)
  ├── local (string)
  ├── participantes (array<userId>)
  ├── capacidade (number)
  ├── tipo (enum: culto, palestra, retiro, etc)
  ├── criada_em (timestamp)
  ├── atualizadoEm (timestamp)
  └── status (enum: planejado, em_andamento, concluido)
```

### System

#### `notifications` - Push notifications
```
id (string, docId)
  ├── userId (reference → users)
  ├── titulo (string)
  ├── mensagem (string)
  ├── tipo (enum: 10 types)
  ├── dados (map)
  ├── lida (boolean)
  ├── criadoEm (timestamp)
  └── leidaEm (timestamp)
```

#### `analytics` - Usage analytics
```
id (string, docId)
  ├── userId (reference → users)
  ├── evento (string)
  ├── dados (map)
  ├── timestamp (timestamp)
  └── sessao (string)
```

## Indexes

See `firestore.indexes.json` for composite indexes:
- User queries (church + status)
- Prayer queries (user + status)
- Devotional queries (church + date)
- Community posts (community + date)

## Security Rules

See `/backend/firebase/firestore.rules` for:
- Authentication checks
- Role-based access control
- Document-level permissions
- Collection-level rules

## Query Patterns

### Common Queries

```dart
// Get user's prayers
prayers = await db
  .collection('prayers')
  .where('userId', isEqualTo: userId)
  .orderBy('criadoEm', descending: true)
  .limit(20)
  .get();

// Get today's devotional
devotional = await db
  .collection('devotionals')
  .where('dataDeDica', isEqualTo: today)
  .limit(1)
  .get();

// Get community posts
posts = await db
  .collection('communityPosts')
  .where('comunidadeId', isEqualTo: communityId)
  .orderBy('criadoEm', descending: true)
  .paginate(page: 1, size: 10);
```

## Data Relationships

```
User
  ├─→ churches (one-to-many via igrejaId)
  ├─→ prayers (one-to-many via userId)
  ├─→ devotionals (one-to-many as autor)
  ├─→ journals (one-to-many via userId)
  ├─→ communities (many-to-many via membros)
  └─→ leader (one-to-one via liderId reference)

Church
  ├─→ users (one-to-many)
  ├─→ devotionals (one-to-many)
  └─→ events (one-to-many)

Community
  ├─→ posts (one-to-many)
  └─→ members (many via array)
```

## Backup & Recovery

- Automatic daily backups
- Point-in-time recovery (30 days)
- Export/import scripts available
- Manual backup before major changes

---

For implementation examples, see:
- `/apps/app_mobile/lib/features/*/domain/entities/`
- `/apps/app_mobile/lib/features/*/data/models/`
- `/packages/bible/lib/domain/entities/`
