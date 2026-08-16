# Database Architecture Guide

Firestore database schema and data access patterns for Abba Virtuosa.

## Overview

**Database:** Firebase Firestore
**Architecture:** NoSQL with independent collections and subcollections
**Relationships:** By document ID references
**Offline:** Offline-First with automatic sync

## Collections

### 1. users
Represents each registered woman.

**Fields:**
```
uid                 (String, PK)
nome                (String, required)
email               (String, required, unique)
telefone            (String)
fotoPerfil          (String, URL)
dataNascimento      (DateTime)
cidade              (String)
estado              (String)
pais                (String)
igrejaId            (String, FK to churches)
liderId             (String, FK to leaders)
discipuladoraId     (String, FK to leaders)
ministerio          (List<String>) [adoracao, ensino, misericordia, evangelismo, lideranca, hospitalidade]
dons                (List<String>)
batizada            (Boolean, default: false)
dataBatismo         (DateTime)
dataConversao       (DateTime)
biografia           (String)
nivelJornada        (String) [iniciante, intermediario, avancado, mestre]
configuracoes       (Map<String, dynamic>)
ultimoLogin         (DateTime)
criadoEm            (DateTime, required)
atualizadoEm        (DateTime, required)
status              (String) [ativo, inativo, bloqueado]
```

**Indexes:**
- `igrejaId + atualizadoEm`
- `email` (unique)
- `status`

### 2. churches
Church/congregation information.

**Fields:**
```
id                  (String, PK)
nome                (String, required)
pastor              (String)
pastora             (String)
telefone            (String)
email               (String)
endereco            (String)
cidade              (String)
estado              (String)
pais                (String)
latitude            (Double)
longitude           (Double)
logo                (String, URL)
descricao           (String)
horariosCulto       (List<String>)
redesSociais        (Map<String, String>)
ativo               (Boolean)
```

### 3. leaders
Leadership positions and roles.

**Fields:**
```
id                  (String, PK)
userId              (String, FK to users, required)
igrejaId            (String, FK to churches)
tipo                (String) [Líder, Pastora, Discipuladora, Coordenadora]
ministerios         (List<String>)
discipulas          (List<String>, FK to users)
ativo               (Boolean)
```

**Indexes:**
- `userId`
- `igrejaId + tipo`

### 4. devotionals
Daily devotional content.

**Fields:**
```
id                  (String, PK)
titulo              (String, required)
subtitulo           (String)
versiculo           (String, required)
referencia          (String, required)
texto               (String, required)
audio               (String, URL)
video               (String, URL)
imagem              (String, URL)
autor               (String, required)
tempoLeitura        (Integer, minutes)
categoria           (String) [manha, tarde, noite, tema, versiculo, reflexao]
publicadoEm         (DateTime, required)
```

**Indexes:**
- `categoria + publicadoEm` (descending)

### 5. prayers
Prayer requests from users.

**Fields:**
```
id                  (String, PK)
userId              (String, FK to users, required)
titulo              (String, required)
descricao           (String, required)
categoria           (String) [familia, casamento, filhos, saude, financeiro, igreja, missoes, pessoal]
tags                (List<String>)
urgente             (Boolean)
privado             (Boolean)
compartilharComLider (Boolean)
status              (String) [emOracao, respondida, arquivada]
dataResposta        (DateTime)
respostaDescricao   (String)
curtidas            (Integer)
dataCriacao         (DateTime, required)
atualizadoEm        (DateTime)
```

**Indexes:**
- `userId + status + dataCriacao`
- `userId + urgente + status`

### 6. fastings
Fasting records and tracking.

**Fields:**
```
id                  (String, PK)
userId              (String, FK to users, required)
titulo              (String, required)
objetivo            (String, required)
versiculo           (String)
tipo                (String) [parcial, daniel, personalizado]
inicio              (DateTime, required)
fim                 (DateTime, required)
horarioInicio       (DateTime)
horarioFim          (DateTime)
diasPlanejados      (Integer, required)
diasConcluidos      (Integer)
reflexoes           (List<String>)
status              (String) [planejado, ativo, concluido, cancelado]
compartilhadoComLider (Boolean)
criadoEm            (DateTime, required)
```

**Indexes:**
- `userId + status + inicio`

### 7. journals
Personal spiritual journal entries.

**Fields:**
```
id                  (String, PK)
userId              (String, FK to users, required)
titulo              (String, required)
texto               (String, required)
audio               (String, URL)
imagem              (String, URL)
humor               (String) [triste, ansioso, neutro, feliz, grato, inspirado]
versiculos          (List<String>)
gratidao            (String)
data                (DateTime, required)
atualizadoEm        (DateTime)
```

**Indexes:**
- `userId + data` (descending)

### 8. memorials
Milestone/memorial events.

**Fields:**
```
id                  (String, PK)
userId              (String, FK to users, required)
tipo                (String) [Primeiro Devocional, Primeiro Jejum, Primeiro Testemunho, Batismo, Um Ano com Deus]
titulo              (String, required)
descricao           (String)
versiculo           (String)
imagem              (String, URL)
data                (DateTime, required)
```

### 9. community_posts
Community feed posts and testimonies.

**Fields:**
```
id                  (String, PK)
autorId             (String, FK to users, required)
autorNome           (String, required)
autorFoto           (String, URL)
tipo                (String) [testemunho, pedido, devocional, evento, noticia, duvida]
titulo              (String, required)
texto               (String, required)
imagem              (String, URL)
video               (String, URL)
curtidas            (Integer)
comentarios         (Integer)
compartilhamentos   (Integer)
pinned              (Boolean)
tags                (List<String>)
dataCriacao         (DateTime, required)
atualizadoEm        (DateTime)
```

**Indexes:**
- `tipo + dataCriacao` (descending)
- `pinned + dataCriacao`
- `autorId + dataCriacao`

**Subcollections:**
- `comments` - Comment threads on posts

### 10. library
Educational resources (books, courses, PDFs, etc).

**Fields:**
```
id                  (String, PK)
titulo              (String, required)
tipo                (String) [Livro, Curso, Podcast, Pregacao, PDF, Video, Audio]
descricao           (String)
thumbnail           (String, URL)
arquivo             (String, URL)
autor               (String)
categoria           (String)
avaliacoes          (Double)
favoritos           (Integer)
```

### 11. events
Church events and gatherings.

**Fields:**
```
id                  (String, PK)
titulo              (String, required)
descricao           (String, required)
local               (String)
latitude            (Double)
longitude           (Double)
inicio              (DateTime, required)
fim                 (DateTime, required)
imagem              (String, URL)
tipo                (String) [congresso, culto, conferencia, retiro, vigilia, jejumColetivo, reuniao, ministerio]
participantes       (Integer)
organizadorId       (String, FK to users)
organizadorNome     (String)
tags                (List<String>)
criadoEm            (DateTime, required)
```

**Indexes:**
- `tipo + inicio` (descending)
- `organizadorId + inicio`

### 12. ai_history
Chat history with AI Bible assistant.

**Fields:**
```
id                  (String, PK)
userId              (String, FK to users, required)
pergunta            (String, required)
resposta            (String, required)
versiculos          (List<String>)
modelo              (String)
tokens              (Integer)
criadoEm            (DateTime, required)
```

### 13. notifications
Push notifications and in-app messages.

**Fields:**
```
id                  (String, PK)
userId              (String, FK to users, required)
titulo              (String, required)
mensagem            (String, required)
tipo                (String) [Devocional, Evento, Jejum, Oracao, Comunidade, Lembrete]
lida                (Boolean)
data                (DateTime, required)
dataLeitura         (DateTime)
```

### 14. daily_letters
Daily inspirational letters/messages.

**Fields:**
```
id                  (String, PK)
titulo              (String, required)
mensagem            (String, required)
versiculo           (String)
imagem              (String, URL)
audio               (String, URL)
data                (DateTime, required)
```

### 15. reading_plans
Bible reading plans.

**Fields:**
```
id                  (String, PK)
titulo              (String, required)
descricao           (String)
dias                (Integer)
categoria           (String)
imagem              (String, URL)
```

### 16. journeys
Spiritual journey programs/courses.

**Fields:**
```
id                  (String, PK)
titulo              (String, required)
descricao           (String)
imagem              (String, URL)
ordem               (Integer)
modulos             (List<String>)
duracao             (String)
```

### 17. courses
Educational courses.

**Fields:**
```
id                  (String, PK)
titulo              (String, required)
descricao           (String)
instrutor           (String)
imagem              (String, URL)
videos              (List<String>, URLs)
pdfs                (List<String>, URLs)
exercicios          (List<String>)
certificado         (Boolean)
```

## Relationships

```
users (1) -- (N) prayers
users (1) -- (N) fastings
users (1) -- (N) journals
users (1) -- (N) memorials
users (1) -- (N) community_posts

users (1) -- (1) churches (via igrejaId)
users (1) -- (1) leaders (via discipuladoraId, liderId)

leaders (1) -- (N) users (via discipulas)

community_posts (1) -- (N) comments (subcollection)
```

## Data Access Patterns

### Creating User-Specific Data
```dart
// Create prayer for user
Future<void> createUserPrayer(String userId, PrayerEntity prayer) async {
  final model = prayer.toModel();
  await prayerDataSource.createPrayer(model.copyWith(userId: userId));
}
```

### Fetching User's Items
```dart
// Get all prayers for a user
Future<List<PrayerEntity>> getUserPrayers(String userId) async {
  final models = await prayerDataSource.getUserPrayers(userId);
  return models.map((m) => m.toEntity()).toList();
}

// Get urgent prayers
Future<List<PrayerEntity>> getUrgentPrayers(String userId) async {
  final models = await prayerDataSource.getUrgentPrayers(userId);
  return models.map((m) => m.toEntity()).toList();
}
```

### Community Content
```dart
// Get feed (all community posts)
Future<List<CommunityPostEntity>> getCommunityFeed() async {
  final models = await communityDataSource.getCommunityPosts(limit: 50);
  return models.map((m) => m.toEntity()).toList();
}

// Get posts by type
Future<List<CommunityPostEntity>> getTestimonies() async {
  final models = await communityDataSource.getPostsByType('testemunho');
  return models.map((m) => m.toEntity()).toList();
}
```

## Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users - only read own, write only own
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId;
      allow delete: if false;
    }

    // Prayers - user can read own, write own
    match /prayers/{prayerId} {
      allow read: if resource.data.userId == request.auth.uid 
                     || resource.data.compartilharComLider == true;
      allow create: if request.auth.uid != null;
      allow update: if resource.data.userId == request.auth.uid;
      allow delete: if resource.data.userId == request.auth.uid;
    }

    // Community Posts - read all, write own
    match /community_posts/{postId} {
      allow read: if true;
      allow create: if request.auth.uid != null;
      allow update: if resource.data.autorId == request.auth.uid;
      allow delete: if resource.data.autorId == request.auth.uid;

      // Comments subcollection
      match /comments/{commentId} {
        allow read: if true;
        allow create: if request.auth.uid != null;
        allow update: if resource.data.userId == request.auth.uid;
        allow delete: if resource.data.userId == request.auth.uid;
      }
    }

    // Public collections - read all
    match /devotionals/{docId} {
      allow read: if true;
      allow write: if false;
    }

    match /churches/{docId} {
      allow read: if true;
      allow write: if false;
    }

    match /daily_letters/{docId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Best Practices

### 1. Always Include Timestamps
```dart
final now = DateTime.now();
final data = {
  ...prayer.toFirestore(),
  'criadoEm': now,
  'atualizadoEm': now,
};
```

### 2. Use Enum Names for Strings
Store enum values as strings using `.name`:
```dart
'status': status.name,  // ✅ Good
'status': 'emOracao',   // ✗ Avoid hardcoding
```

### 3. Batch Operations for Related Updates
```dart
Future<void> markPrayerAsAnswered(String prayerId, String response) async {
  final batch = firestore.batch();
  
  batch.update(
    firestore.collection('prayers').doc(prayerId),
    {
      'status': 'respondida',
      'dataResposta': FieldValue.serverTimestamp(),
      'respostaDescricao': response,
    },
  );
  
  await batch.commit();
}
```

### 4. Pagination for Large Collections
```dart
Future<List<CommunityPostEntity>> getCommunityFeedPaged({
  int limit = 20,
  DocumentSnapshot? lastDoc,
}) async {
  Query<Map<String, dynamic>> query = firestore
      .collection('community_posts')
      .orderBy('dataCriacao', descending: true)
      .limit(limit + 1);

  if (lastDoc != null) {
    query = query.startAfterDocument(lastDoc);
  }

  final snapshot = await query.get();
  return snapshot.docs
      .map((doc) => CommunityPostModel.fromFirestore(doc).toEntity())
      .toList();
}
```

### 5. Use Transactions for Consistency
```dart
Future<void> userFollowLeader(String userId, String leaderId) async {
  await firestore.runTransaction((transaction) async {
    final userRef = firestore.collection('users').doc(userId);
    final leaderRef = firestore.collection('leaders').doc(leaderId);

    final userDoc = await transaction.get(userRef);
    final leaderDoc = await transaction.get(leaderRef);

    transaction.update(userRef, {
      'liderId': leaderId,
    });

    final discipulas = List<String>.from(leaderDoc['discipulas'] ?? []);
    discipulas.add(userId);
    transaction.update(leaderRef, {
      'discipulas': discipulas,
    });
  });
}
```

## Offline Support

With Hive local storage:

```dart
// Save to local cache when data is fetched
Future<List<PrayerEntity>> getUserPrayers(String userId) async {
  try {
    // Fetch from Firestore
    final models = await prayerDataSource.getUserPrayers(userId);
    final entities = models.map((m) => m.toEntity()).toList();

    // Cache locally
    await localDataSource.cachePrayers(userId, entities);

    return entities;
  } on Exception {
    // Return cached data if offline
    return localDataSource.getCachedPrayers(userId);
  }
}
```

## Performance Optimization

### Indexes
All recommended indexes are listed in collection sections. Create these in Firestore Console.

### Read Cost Optimization
- Use field filters instead of document iteration
- Implement pagination for large result sets
- Cache frequently-accessed data locally

### Query Limits
- Default limit: 100 documents
- Max recommend: 1000 documents
- Use pagination for larger datasets

---

**Last Updated:** August 2024
**Database:** Firebase Firestore
**Version:** 1.0
