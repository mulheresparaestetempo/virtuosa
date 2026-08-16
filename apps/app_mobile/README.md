# FILHA — MVP completo

> Mulheres para este tempo. Filhas de Abba para a eternidade.

> Todos os dias, um encontro com Abba.

## Criadora

Daiane Feliciano

## Ministério

Ministério Virtuosa

## Igreja

Primeira Igreja Batista em Maricá

## Identificação

pibam

## Escopo concluído

- Splash e onboarding
- Login visual
- Home / Lugar Secreto
- Vida devocional
- Oração persistente
- Diário persistente
- Gratidão persistente
- Memoriais pessoais
- Acompanhamento de jejum com período, horários propostos, propósito e versículo
- Acolhimento
- Culto no Lar
- Minha Discipuladora
- Jornadas com progresso
- Comunidade
- Biblioteca
- Minha Caminhada
- Assistente Bíblica inicial
- Navegação principal
- Arquitetura repository/local storage
- Preparação para sincronização em nuvem

## Executar

```bash
flutter pub get
flutter run
```

## Testar

```bash
flutter test
```

## Firebase — etapa de produção

A integração em nuvem deve ser feita somente depois de criar/configurar o projeto Firebase da igreja/ministério.

Com Firebase CLI e FlutterFire CLI instalados:

```bash
firebase login
dart pub global activate flutterfire_cli
flutterfire configure
flutter pub add firebase_core
flutter pub add firebase_auth
flutter pub add cloud_firestore
```

Depois, inicialize o Firebase no ponto de entrada e substitua a implementação local do repository pela implementação Firestore.

O `flutterfire configure` gera `firebase_options.dart`; não coloque credenciais privadas ou chaves de servidor no repositório.

Ative no Console do Firebase apenas os provedores de autenticação necessários. Para o primeiro lançamento, e-mail/senha é suficiente; Google pode ser habilitado depois.

## Modelo de dados Firestore

```text
users/{uid}
  displayName
  email
  role
  churchId
  createdAt

users/{uid}/prayers/{id}
users/{uid}/journals/{id}
users/{uid}/gratitude/{id}
users/{uid}/memorials/{id}
users/{uid}/fastingPlans/{id}
users/{uid}/journeys/{journeyId}

careRequests/{id}
  uid
  type
  status
  preferredDate
  note
  createdAt

houseWorshipRequests/{id}
  uid
  preferredDate
  status
  note
  createdAt

discipleships/{id}
  discipleUid
  leaderUid
  status
  createdAt

content/{id}
  type
  title
  body
  published
  createdAt
```

## Regras de negócio

1. Memoriais são pessoais e não têm ranking.
2. Selos representam marcos pessoais, não competição.
3. O jejum registra o propósito escolhido pela mulher; o app não prescreve restrições alimentares.
4. Pedidos de acolhimento são privados por padrão.
5. A discipuladora só recebe dados explicitamente compartilhados ou necessários para o cuidado autorizado.
6. Dados pessoais devem ficar vinculados ao UID autenticado.
7. Conteúdo público deve ser separado dos dados privados.
8. A IA não deve se apresentar como autoridade pastoral, médica ou psicológica.
9. Solicitações de acolhimento devem ter status e histórico para evitar perda de acompanhamento.
10. O app deve continuar funcional offline para registros pessoais quando possível.

## Checklist de lançamento

- [ ] Criar projeto Firebase
- [ ] Configurar Android/iOS/Web
- [ ] Executar `flutterfire configure`
- [ ] Ativar Authentication
- [ ] Criar Firestore
- [ ] Publicar Security Rules
- [ ] Implementar repository Firestore
- [ ] Configurar notificações
- [ ] Configurar política de privacidade
- [ ] Testar fluxos de acolhimento
- [ ] Testar permissões de líder/discípula
- [ ] Testar recuperação de senha
- [ ] Testar backup/sincronização
- [ ] Testar Android
- [ ] Testar iOS
- [ ] Gerar versão de produção

## Observação

A parte que depende de uma conta/projeto externo não pode ser ativada automaticamente neste ambiente: Firebase, credenciais, publicação nas lojas e configurações de notificações precisam ser vinculados pela responsável pelo projeto.

A base do aplicativo, entretanto, está organizada para receber essas integrações sem reconstruir a interface.
