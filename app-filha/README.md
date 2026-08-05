# App FILHA

Protótipo do app FILHA (Plataforma de Discipulado Feminino), construído com
[Expo](https://expo.dev) + React Native — um único código-fonte que gera
apps instaláveis para **Android** e **iOS**.

Ver o plano completo do produto em [`../docs/app-filha-plano.md`](../docs/app-filha-plano.md).

## Status atual

Protótipo funcional com os 18 módulos do plano, navegação por abas + hub
"Mais", dados fictícios e persistência local (`AsyncStorage`) — sem backend
ainda. Todas as telas foram testadas rodando o app de verdade (não só
compiladas).

- **Abas principais**: Lugar Secreto, Bíblia, Diário, Jornadas, Mais
- **Dentro de "Mais"**: Minha Caminhada, Memoriais, Minha Discipuladora,
  Comunidade, Acolhimento, Biblioteca, Agenda, Assistente Bíblica, Painel da
  Líder, Painel da Igreja, Mapa, Missões, Perfil da Filha

Duas limitações conscientes deste protótipo, documentadas no próprio app:
- **Assistente Bíblica** é busca por palavra-chave local (Opção A do plano),
  não uma IA conversacional — isso exige um backend com RAG (ver
  `../docs/app-filha-plano.md`).
- **Painel da Líder** e **Painel da Igreja** mostram dados fictícios — o
  acompanhamento real de outras usuárias depende de contas por usuária e
  sincronização em nuvem, que este protótipo (só armazenamento local) não
  tem.

### Próximos passos para sair do protótipo

1. Backend com autenticação (uma conta por usuária) e banco de dados —
   ver o modelo de dados em `../docs/app-filha-plano.md`
2. Migrar a persistência de `AsyncStorage` local para o backend
3. RAG real para a Assistente Bíblica
4. Notificações push para o devocional diário

## Rodando em desenvolvimento

## Rodando em desenvolvimento

```bash
cd app-filha
npm install
npm run web       # abre no navegador (mais rápido para iterar em layout)
npm run android   # abre no Android (emulador ou Expo Go)
npm run ios       # abre no iOS (requer macOS, ou Expo Go num iPhone)
```

Para testar no celular sem instalar nada ainda: instale o app **Expo Go**
(Android/iOS) e escaneie o QR code exibido pelo `npm start`.

## Gerando o app instalável (.apk / .aab / .ipa)

Quando o app estiver pronto para sair do modo "Expo Go" e virar um instalável
de verdade, use o [EAS Build](https://docs.expo.dev/build/introduction/) (serviço
gratuito da Expo para builds na nuvem, sem precisar de Mac para iOS):

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android   # gera .apk (teste) ou .aab (Google Play)
eas build --platform ios       # gera .ipa (requer conta Apple Developer)
```

- **Android**: o `.apk` gerado já pode ser instalado direto no celular
  (fora da Play Store) para testes com o time; o `.aab` é o formato exigido
  para publicar na Google Play.
- **iOS**: para instalar fora da App Store é necessário TestFlight (ainda
  exige conta Apple Developer, US$ 99/ano) — não existe equivalente ao
  ".apk direto" no iOS.

## Identificadores do app

`app.json` já define `bundleIdentifier` (iOS) e `package` (Android) como
`com.pibamespraiado.appfilha` — **placeholder**, ajustar para o identificador
definitivo antes de publicar nas lojas (não pode ser alterado depois do
primeiro envio).
