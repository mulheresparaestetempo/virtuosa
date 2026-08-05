# App FILHA

Protótipo do app FILHA (Plataforma de Discipulado Feminino), construído com
[Expo](https://expo.dev) + React Native — um único código-fonte que gera
apps instaláveis para **Android** e **iOS**.

Ver o plano completo do produto em [`../docs/app-filha-plano.md`](../docs/app-filha-plano.md).

## Status atual

Protótipo visual da tela **Lugar Secreto** (`App.tsx`), com dados fictícios,
para validar layout, paleta de cores e fluxo de interação antes de conectar
com dados reais e as demais telas dos 18 módulos.

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
