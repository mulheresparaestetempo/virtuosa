# Architecture Documentation

System design, patterns, and technical architecture for Abba Virtuosa.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
├──────────────────────┬──────────────────────┬────────────────┤
│  Mobile App          │  Leader Dashboard    │  Admin Panel   │
│  (Flutter)           │  (Next.js)           │  (Next.js)     │
│  - iOS/Android       │  - React             │  - React       │
│  - Web               │  - TypeScript        │  - TypeScript  │
└──────────────────────┴──────────────────────┴────────────────┘
         │                      │                      │
         └──────────────────────┴──────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         │                             │
         ▼                             ▼
   ┌───────────────┐           ┌───────────────┐
   │  Firebase     │           │  Cloud        │
   │  Backend      │           │  Functions    │
   │  - Auth       │           │  - Scheduled  │
   │  - Firestore  │           │  - Triggers   │
   │  - Storage    │           │  - HTTP APIs  │
   │  - Messaging  │           │               │
   │  - Analytics  │           │               │
   └───────────────┘           └───────────────┘
         │                             │
         └─────────────────┬───────────┘
                           │
                    ┌──────▼──────┐
                    │   AI Layer  │
                    │ - Claude    │
                    │ - OpenAI    │
                    └─────────────┘
```

## Clean Architecture

All apps follow Clean Architecture with 3 main layers:

### 1. **Domain Layer** (Business Logic)
```
feature/domain/
├── entities/          # Pure business objects
├── repositories/      # Abstract contracts
└── usecases/         # Business logic
```

**Responsibilities:**
- Define business rules
- No dependencies on frameworks
- Framework-agnostic

### 2. **Data Layer** (Data Management)
```
feature/data/
├── models/           # API/DB models
├── datasources/      # Data sources (local/remote)
└── repositories_impl/ # Repository implementations
```

**Responsibilities:**
- Handle API calls
- Database operations
- Local storage
- Data transformation

### 3. **Presentation Layer** (UI)
```
feature/presentation/
├── screens/          # Full-screen widgets
├── widgets/          # Reusable components
├── providers/        # Riverpod providers (Flutter)
└── controllers/      # Business logic UI
```

**Responsibilities:**
- UI rendering
- User interaction handling
- State management

## State Management

### Flutter (Riverpod)
```dart
// Simple provider
final userProvider = FutureProvider<User>((ref) async {
  return await userRepository.getUser();
});

// State notifier for mutations
final userNotifierProvider = StateNotifierProvider<
  UserNotifier, 
  User?
>((ref) {
  return UserNotifier(userRepository);
});
```

### Web (Zustand/Context)
```typescript
// Zustand store
const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

## Dependency Injection

### Flutter
- GetIt for service locator
- Manual setup in main.dart
- Riverpod providers as dependencies

### Web
- React Context
- Dependency injection through providers
- Environment variables for config

## API Communication

### Flutter
```dart
// Use repositories instead of direct API calls
final prayer = await prayerRepository.createPrayer(prayerEntity);
```

### Web
```typescript
// Use custom hooks for API calls
const { data: users, isLoading } = useUsers();
```

## Database Schema

See `/docs/banco/` for:
- Firestore collections
- Document structure
- Indexes and queries
- Security rules

## Error Handling

### Custom Exceptions
```dart
// In shared package
abstract class AppException implements Exception {
  final String message;
  final String? code;
  AppException(this.message, {this.code});
}

class NetworkException extends AppException {
  NetworkException(String message) : super(message, code: 'NETWORK_ERROR');
}

class FirebaseException extends AppException {
  FirebaseException(String message) : super(message, code: 'FIREBASE_ERROR');
}
```

### Error Handling Pattern
```dart
// Repository
Future<Result<User>> getUser() async {
  try {
    final data = await datasource.getUser();
    return Result.success(data);
  } catch (e) {
    return Result.failure(AppException(e.toString()));
  }
}

// UI
final userAsync = ref.watch(userProvider);
userAsync.when(
  data: (user) => UserView(user: user),
  loading: () => LoadingWidget(),
  error: (error, stack) => ErrorView(error: error),
);
```

## Testing Architecture

### Unit Tests
- Pure functions and logic
- No external dependencies
- Test entities, usecases, utilities

### Widget Tests (Flutter)
- Individual widget rendering
- User interactions
- Widget state changes

### Integration Tests
- Full feature workflows
- Multiple widgets together
- Database integration

## Performance Optimization

### Mobile (Flutter)
- Lazy loading and pagination
- Image caching
- Efficient rebuilds (const constructors)
- Offline-first with Hive cache

### Web (Next.js)
- Code splitting per route
- Image optimization
- Server-side rendering
- Static generation where possible

### Backend (Cloud Functions)
- Cold start optimization
- Batch operations
- Caching strategies
- Efficient queries

## Security Architecture

### Authentication
- Firebase Auth with multiple providers
- Refresh token rotation
- Biometric support

### Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- Collection-level security rules

### Data Protection
- Encryption at rest (Firebase)
- HTTPS for all communications
- Sensitive data masked in logs
- PII handling compliance

---

For detailed patterns, see `clean_architecture/`, `design_patterns/`, and `api_design/`.
For implementation examples, see `apps/app_mobile/lib/` and `apps/painel_lider/`.
