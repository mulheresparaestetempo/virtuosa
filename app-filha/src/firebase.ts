import { initializeApp, getApps } from 'firebase/app';
// Importado de '@firebase/auth' (não 'firebase/auth') porque só esse pacote expõe
// corretamente o build para React Native nesta versão do SDK.
import { initializeAuth, getAuth } from '@firebase/auth';
// getReactNativePersistence existe no build RN em tempo de execução, mas o .d.ts
// publicado por essa versão não o declara (o campo "types" do pacote vem antes da
// condição "react-native"), daí o supressor de tipo abaixo.
// @ts-expect-error — ver comentário acima
import { getReactNativePersistence } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cole aqui o objeto "firebaseConfig" que aparece no Firebase Console em:
// Configurações do projeto > Seus apps > app Web (ícone </>).
// Esses valores não são secretos — é seguro deixá-los no código do app.
const firebaseConfig = {
  apiKey: 'COLE_AQUI',
  authDomain: 'COLE_AQUI',
  projectId: 'COLE_AQUI',
  storageBucket: 'COLE_AQUI',
  messagingSenderId: 'COLE_AQUI',
  appId: 'COLE_AQUI',
};

export const firebaseConfigurado = firebaseConfig.apiKey !== 'COLE_AQUI';

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = firebaseConfigurado
  ? (() => {
      try {
        return initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
      } catch {
        return getAuth(app);
      }
    })()
  : getAuth(app);

export const db = getFirestore(app);
