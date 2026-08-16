# Firebase & Backend Architecture

Complete guide to Firebase services and backend integration in Abba Virtuosa.

## Architecture Overview

```
Flutter App
    ↓
Firebase Auth (Authentication)
    ↓
Cloud Functions (Backend Logic)
    ↓
Firestore (Database)
    ↓
Firebase Storage (Files)
    ↓
Firebase Messaging (Push Notifications)
    ↓
Firebase Analytics & Crashlytics (Monitoring)
    ↓
Remote Config (Feature Flags & Configuration)
```

## 1. Firebase Authentication

### Supported Methods

```dart
// Email & Password
await firebaseAuth.signInWithEmailAndPassword(
  email: email,
  password: password,
);

// Google
await googleSignIn.signIn();

// Apple
await SignInWithApple.getAppleIDCredential();

// Biometry (FaceID / TouchID)
await localAuth.authenticate();
```

### User Roles & Permissions

```dart
enum UserRole {
  usuario,           // Regular user
  discipuladora,     // Disciple leader
  lider,             // Church leader
  pastora,           // Pastor
  administradora,    // Administrator
  superAdministradora, // Super admin
}
```

### Role Permissions

| Role | Permissions |
|------|-------------|
| **usuario** | Read devotional, community, library; Create prayer, journal, fasting |
| **discipuladora** | User permissions + manage disciples + send messages/devotionals |
| **lider** | Disciple permissions + manage events, courses, disciples |
| **pastora** | Leader permissions + manage church, financial reports |
| **administradora** | All read/write + system management |
| **superAdministradora** | Full system access |

### Implementation

```dart
class FirebaseAuthDataSourceImpl implements FirebaseAuthDataSource {
  Future<AuthModel> loginWithEmail(String email, String password) async {
    final result = await firebaseAuth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
    return AuthModel.fromFirebaseUser(result.user!);
  }

  Future<AuthModel> loginWithGoogle() async {
    final googleUser = await googleSignIn.signIn();
    final googleAuth = await googleUser!.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    return AuthModel.fromFirebaseUser(
      (await firebaseAuth.signInWithCredential(credential)).user!
    );
  }

  Future<void> enableBiometry() async {
    // Biometric authentication after first login
  }
}
```

## 2. Cloud Functions

Automated backend tasks running on Firebase Cloud Functions (TypeScript/Node.js).

### Scheduled Functions

#### Daily Devotional (06:00 AM)
```typescript
export const createDailyDevotional = functions
  .pubsub.schedule('every day 06:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async () => {
    // Create devotional
    // Send notifications to all users
    // Log analytics
  });
```

#### Verse of Day (07:00 AM)
```typescript
export const createDailyVerse = functions
  .pubsub.schedule('every day 07:00')
  .onRun(async () => {
    // Create random Bible verse
    // Store in Firestore
  });
```

#### Prayer Reminders (10:00 AM)
```typescript
export const sendPrayerReminders = functions
  .pubsub.schedule('every day 10:00')
  .onRun(async () => {
    // Get active users
    // Send notifications
  });
```

#### Fasting Reminders (07:30 AM)
```typescript
export const sendFastingReminders = functions
  .pubsub.schedule('every day 07:30')
  .onRun(async () => {
    // Get active fastings
    // Send reminders
  });
```

#### Daily Backup (02:00 AM)
```typescript
export const dailyBackup = functions
  .pubsub.schedule('every day 02:00')
  .onRun(async () => {
    // Backup all collections
    // Store backup metadata
  });
```

### Trigger Functions

#### Welcome Email (User Creation)
```typescript
export const onUserCreated = functions
  .auth.user()
  .onCreate(async (user) => {
    // Send welcome email
    // Create user profile
    // Set initial preferences
  });
```

#### Bible Assistant (Callable)
```typescript
export const askBibleAssistant = functions
  .https.onCall(async (data, context) => {
    const { pergunta } = data;
    // Call Claude API
    // Extract Bible verses
    // Save to history
    // Return response
  });
```

#### Generate Reports (Callable)
```typescript
export const generateReport = functions
  .https.onCall(async (data, context) => {
    const { type } = data;
    // Generate report based on type
    // Return aggregated data
  });
```

## 3. Firebase Messaging (Push Notifications)

### Implementation

```dart
class FirebaseMessagingService {
  Future<void> initialize() async {
    // Request permissions
    await firebaseMessaging.requestPermission();

    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((message) {
      _handleForegroundMessage(message);
    });

    // Handle background messages
    FirebaseMessaging.onBackgroundMessage(_handleBackgroundMessage);

    // Subscribe to topics
    await subscribeToRoleTopics(userRole);
  }

  Future<void> subscribeToRoleTopics(String role) async {
    await subscribeToTopic('all_users');
    if (role == 'lider') {
      await subscribeToTopic('liders');
    }
  }
}
```

### Notification Topics

```dart
final notificationTopics = {
  'devotional': 'devocional_disponivel',
  'prayer_time': 'hora_oracao',
  'fasting_time': 'hora_jejum',
  'event': 'novo_evento',
  'congress': 'congresso',
  'leader_message': 'mensagem_lider',
  'prayer_answered': 'oracao_respondida',
  'new_course': 'novo_curso',
  'new_testimony': 'novo_testemunho',
  'new_journey': 'nova_jornada',
};
```

### Notification Types

1. **Devocional disponível** - Daily devotional reminder
2. **Hora da Oração** - Prayer time reminder
3. **Hora do Jejum** - Fasting time reminder
4. **Evento** - New event notification
5. **Congresso** - Congress/conference announcement
6. **Mensagem da Líder** - Message from leader
7. **Pedido respondido** - Prayer answered
8. **Novo Curso** - New course available
9. **Novo Testemunho** - New testimony shared
10. **Nova Jornada** - New journey started

## 4. Remote Config (Feature Flags & Configuration)

### Feature Flags

```dart
class RemoteConfigService {
  bool isFeatureEnabled(String featureName) {
    return remoteConfig.getBool('feature_$featureName');
  }
}

// Usage
if (remoteConfig.isFeatureEnabled('biometry')) {
  // Show biometry login option
}
```

### Available Features

- `feature_biometry` - Biometric authentication
- `feature_community` - Community feed
- `feature_ai_assistant` - AI Bible assistant
- `feature_events` - Event management
- `feature_leader_panel` - Leader dashboard
- `feature_admin_panel` - Admin dashboard
- `feature_premium` - Premium features
- `feature_offline_sync` - Offline synchronization
- `feature_audio` - Audio content
- `feature_video` - Video content

### Configuration Types

```dart
// Theme colors
getStringConfig('theme_primary_color')
getStringConfig('theme_secondary_color')
getStringConfig('theme_tertiary_color')

// Version management
getStringConfig('app_version')
getStringConfig('app_minimum_version')
getStringConfig('app_latest_version')

// Maintenance
getBoolConfig('maintenance_enabled')
getStringConfig('maintenance_message')

// Promotions
getBoolConfig('promotion_active')
getStringConfig('promotion_title')
getDoubleConfig('promotion_discount')

// Events
getBoolConfig('event_active')
getStringConfig('event_title')
getStringConfig('event_date')
```

## 5. Firebase Storage

### Folder Structure

```
/profile
  ├── {userId}
  │   ├── avatar.jpg
  │   └── cover.jpg

/devotionals
  ├── {devotionalId}
  │   ├── image.jpg
  │   └── document.pdf

/audio
  ├── devotional/
  ├── prayer/
  └── testimonies/

/videos
  ├── courses/
  ├── testimonies/
  └── events/

/pdfs
  ├── courses/
  ├── bible_studies/
  └── materials/

/courses
  ├── {courseId}
  │   ├── image.jpg
  │   ├── videos/
  │   └── materials/

/churches
  ├── {churchId}
  │   ├── logo.png
  │   └── cover.jpg

/events
  ├── {eventId}
  │   └── image.jpg

/testimonies
  ├── {testimonyId}
  │   ├── image.jpg
  │   └── video.mp4

/stickers
  ├── achievement/
  ├── badges/
  └── rewards/

/backgrounds
  ├── light/
  └── dark/

/illustrations
  ├── devotional/
  ├── onboarding/
  └── empty_states/
```

### Upload Implementation

```dart
Future<String> uploadUserAvatar(String userId, File image) async {
  final ref = FirebaseStorage.instance
      .ref()
      .child('profile/$userId/avatar.jpg');

  await ref.putFile(image);
  return await ref.getDownloadURL();
}

Future<String> uploadDevotionalImage(String devotionalId, File image) async {
  final ref = FirebaseStorage.instance
      .ref()
      .child('devotionals/$devotionalId/image.jpg');

  await ref.putFile(image);
  return await ref.getDownloadURL();
}
```

## 6. Firebase Analytics

### Custom Events

```dart
Future<void> logDevotionalRead(String devotionalId) async {
  await analytics.logEvent(
    name: 'devotional_read',
    parameters: {
      'devotional_id': devotionalId,
      'timestamp': DateTime.now().toIso8601String(),
    },
  );
}

Future<void> logPrayerCreated(String category) async {
  await analytics.logEvent(
    name: 'prayer_created',
    parameters: {
      'category': category,
    },
  );
}

Future<void> logCourseStarted(String courseId) async {
  await analytics.logEvent(
    name: 'course_started',
    parameters: {
      'course_id': courseId,
    },
  );
}
```

### User Properties

```dart
Future<void> setUserProperties(UserEntity user) async {
  await analytics.setUserProperty(
    name: 'role',
    value: user.role.name,
  );
  await analytics.setUserProperty(
    name: 'church',
    value: user.igrejaId ?? 'none',
  );
  await analytics.setUserProperty(
    name: 'journey_level',
    value: user.nivelJornada.name,
  );
}
```

## 7. Firebase Crashlytics

### Error Tracking

```dart
Future<void> recordError(dynamic exception, StackTrace stackTrace) async {
  await FirebaseCrashlytics.instance.recordError(
    exception,
    stackTrace,
  );
}

Future<void> setCustomKey(String key, dynamic value) async {
  await FirebaseCrashlytics.instance.setCustomKey(key, value);
}
```

## 8. AI Bible Assistant (FILHA IA)

### Implementation

```dart
class AIDataSourceImpl implements AIDataSource {
  Future<AIResponseModel> askBibleAssistant(String pergunta) async {
    final prompt = _buildBiblePrompt(pergunta);
    final response = await _callClaudeAPI(prompt);
    final versiculos = _extractVersiculos(response);

    return AIResponseModel(
      pergunta: pergunta,
      resposta: response,
      versiculos: versiculos,
      modelo: 'claude-3-sonnet',
    );
  }

  String _buildBiblePrompt(String pergunta) {
    return '''
Você é a FILHA IA, assistente dedicada a ajudar mulheres no estudo da Palavra.

Diretrizes:
1. Sempre baseie na Bíblia e materiais do ministério
2. Nunca substitua liderança espiritual
3. Nunca emita opiniões pessoais
4. Sempre inclua referências bíblicas
5. Incentive oração e comunhão com líderes

Pergunta: $pergunta
''';
  }
}
```

### Allowed Functions

- Responder dúvidas sobre Bíblia
- Explicar versículos e livros
- Criar planos de leitura
- Gerar orações personalizadas
- Sugerir jejuns baseado em temas
- Encontrar referências bíblicas
- Criar estudos temáticos
- Resumir livros da Bíblia

### Limitations

- ✗ Não inventa doutrinas
- ✗ Não responde como se fosse Deus
- ✗ Não dá aconselhamento pastoral definitivo
- ✓ Sempre incentiva oração e comunhão

## Security Best Practices

### Firestore Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users - private
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId;
      allow delete: if false;
    }

    // Public content
    match /devotionals/{docId} {
      allow read: if true;
      allow write: if false;
    }

    match /community_posts/{docId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if resource.data.autorId == request.auth.uid;
      allow delete: if resource.data.autorId == request.auth.uid;
    }
  }
}
```

### Storage Security Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profiles
    match /profile/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }

    // Public devotional content
    match /devotionals/{docId}/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }

    // User uploads
    match /user_content/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId;
    }
  }
}
```

## Development Checklist

- [ ] Firebase project created and configured
- [ ] Authentication methods enabled (Email, Google, Apple)
- [ ] Firestore security rules deployed
- [ ] Storage security rules deployed
- [ ] Cloud Functions deployed
- [ ] Firebase Messaging configured
- [ ] Remote Config values set
- [ ] Analytics events implemented
- [ ] Crashlytics integrated
- [ ] AI assistant API key configured
- [ ] Email service configured
- [ ] Push notifications tested

## Environment Variables

```bash
# Firebase Config
FIREBASE_PROJECT_ID=abba-virtuosa
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=abba-virtuosa.firebaseapp.com

# AI Assistant
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Email Service
FIREBASE_EMAIL=noreply@abba-virtuosa.app
FIREBASE_EMAIL_PASSWORD=app-password

# Cloud Functions
FUNCTIONS_REGION=south-america-east1
```

---

**Last Updated:** August 2024
**Firebase SDK:** 9.x+ (Flutter)
**Node.js:** 18+
**Cloud Functions:** TypeScript
