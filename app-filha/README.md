# Abba Virtuosa

Protótipo do app Abba Virtuosa (Plataforma de Discipulado Feminino), construído com
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

O build real roda no [EAS Build](https://docs.expo.dev/build/introduction/)
(serviço gratuito da Expo, builds na nuvem, sem precisar de Mac para iOS).
Duas formas de disparar:

### Opção A — pelo GitHub Actions (recomendado, não precisa de computador próprio)

Já existe o workflow `.github/workflows/build-android.yml` pronto neste
repositório. Passo a passo:

1. **Criar uma conta grátis em [expo.dev](https://expo.dev)** (se ainda não tiver).
2. **Gerar um token de acesso**: no site da Expo, vá em
   *Account settings → Access tokens → Create token*. Copie o token gerado.
3. **Adicionar o token como secret no GitHub**: no repositório, vá em
   *Settings → Secrets and variables → Actions → New repository secret*.
   - Nome: `EXPO_TOKEN`
   - Valor: cole o token copiado no passo anterior
4. **Rodar o workflow**: na aba *Actions* do GitHub, escolha
   "Build App FILHA (Android APK)" → *Run workflow*.
5. Aguarde ~10–15 min. O log da Action mostra o link de download do `.apk`
   ao final (o comando espera o build terminar antes de encerrar). Esse link
   também fica disponível no painel da Expo, em *Builds*.
6. Baixe o `.apk` e envie diretamente para as discipulas (por WhatsApp, por
   exemplo) — no Android, basta abrir o arquivo para instalar (o celular vai
   pedir para permitir "instalar de fontes desconhecidas" na primeira vez).

Esse fluxo não depende de máquina própria: quem tiver acesso ao repositório
no GitHub consegue gerar um novo `.apk` a qualquer momento, direto pelo
navegador.

### Opção B — direto do seu computador

```bash
cd app-filha
npm install -g eas-cli
eas login
eas build --platform android --profile preview   # gera o .apk
eas build --platform ios                          # gera .ipa (requer conta Apple Developer)
```

- **Android**: o `.apk` do profile `preview` (ver `eas.json`) já pode ser
  instalado direto no celular (fora da Play Store); para publicar na Google
  Play, use o profile `production` (gera `.aab`).
- **iOS**: para instalar fora da App Store é necessário TestFlight (ainda
  exige conta Apple Developer, US$ 99/ano) — não existe equivalente ao
  ".apk direto" no iOS.

## Identificadores do app

`app.json` já define `bundleIdentifier` (iOS) e `package` (Android) como
`com.pibamespraiado.appfilha` — **placeholder**, ajustar para o identificador
definitivo antes de publicar nas lojas (não pode ser alterado depois do
primeiro envio).
