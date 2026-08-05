import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cores } from '../theme';

import MaisScreen from '../screens/MaisScreen';
import MemoriaisScreen from '../screens/MemoriaisScreen';
import ComunidadeScreen from '../screens/ComunidadeScreen';
import AcolhimentoScreen from '../screens/AcolhimentoScreen';
import MinhaDiscipuladoraScreen from '../screens/MinhaDiscipuladoraScreen';
import MinhaCaminhadaScreen from '../screens/MinhaCaminhadaScreen';
import BibliotecaScreen from '../screens/BibliotecaScreen';
import AgendaScreen from '../screens/AgendaScreen';
import AssistenteBiblicaScreen from '../screens/AssistenteBiblicaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PainelLiderScreen from '../screens/PainelLiderScreen';
import PainelIgrejaScreen from '../screens/PainelIgrejaScreen';
import MapaScreen from '../screens/MapaScreen';
import MissoesScreen from '../screens/MissoesScreen';

export type MaisStackParamList = {
  MaisHub: undefined;
  Memoriais: undefined;
  Comunidade: undefined;
  Acolhimento: undefined;
  MinhaDiscipuladora: undefined;
  MinhaCaminhada: undefined;
  Biblioteca: undefined;
  Agenda: undefined;
  AssistenteBiblica: undefined;
  Perfil: undefined;
  PainelLider: undefined;
  PainelIgreja: undefined;
  Mapa: undefined;
  Missoes: undefined;
};

const Stack = createNativeStackNavigator<MaisStackParamList>();

export default function MaisStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: cores.bordo,
        headerStyle: { backgroundColor: cores.creme },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="MaisHub" component={MaisScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Memoriais" component={MemoriaisScreen} options={{ title: 'Memoriais' }} />
      <Stack.Screen name="Comunidade" component={ComunidadeScreen} options={{ title: 'Comunidade' }} />
      <Stack.Screen name="Acolhimento" component={AcolhimentoScreen} options={{ title: 'Acolhimento' }} />
      <Stack.Screen
        name="MinhaDiscipuladora"
        component={MinhaDiscipuladoraScreen}
        options={{ title: 'Minha Discipuladora' }}
      />
      <Stack.Screen
        name="MinhaCaminhada"
        component={MinhaCaminhadaScreen}
        options={{ title: 'Minha Caminhada' }}
      />
      <Stack.Screen name="Biblioteca" component={BibliotecaScreen} options={{ title: 'Biblioteca' }} />
      <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
      <Stack.Screen
        name="AssistenteBiblica"
        component={AssistenteBiblicaScreen}
        options={{ title: 'Assistente Bíblica' }}
      />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil da Filha' }} />
      <Stack.Screen name="PainelLider" component={PainelLiderScreen} options={{ title: 'Painel da Líder' }} />
      <Stack.Screen name="PainelIgreja" component={PainelIgrejaScreen} options={{ title: 'Painel da Igreja' }} />
      <Stack.Screen name="Mapa" component={MapaScreen} options={{ title: 'Mapa' }} />
      <Stack.Screen name="Missoes" component={MissoesScreen} options={{ title: 'Missões' }} />
    </Stack.Navigator>
  );
}
