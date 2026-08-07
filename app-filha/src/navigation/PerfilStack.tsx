import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cores, fontes } from '../theme';

import PerfilScreen from '../screens/PerfilScreen';
import MinhaCaminhadaScreen from '../screens/MinhaCaminhadaScreen';
import MemoriaisScreen from '../screens/MemoriaisScreen';
import MinhaDiscipuladoraScreen from '../screens/MinhaDiscipuladoraScreen';
import AcolhimentoScreen from '../screens/AcolhimentoScreen';
import AgendaScreen from '../screens/AgendaScreen';
import PainelLiderScreen from '../screens/PainelLiderScreen';
import PainelIgrejaScreen from '../screens/PainelIgrejaScreen';
import MapaScreen from '../screens/MapaScreen';
import MissoesScreen from '../screens/MissoesScreen';

export type PerfilStackParamList = {
  Perfil: undefined;
  MinhaCaminhada: undefined;
  Memoriais: undefined;
  MinhaDiscipuladora: undefined;
  Acolhimento: undefined;
  Agenda: undefined;
  PainelLider: undefined;
  PainelIgreja: undefined;
  Mapa: undefined;
  Missoes: undefined;
};

const Stack = createNativeStackNavigator<PerfilStackParamList>();

export default function PerfilStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: cores.bordo,
        headerStyle: { backgroundColor: cores.creme },
        headerTitleStyle: { fontFamily: fontes.titulo, fontSize: 19 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MinhaCaminhada" component={MinhaCaminhadaScreen} options={{ title: 'Minha Caminhada' }} />
      <Stack.Screen name="Memoriais" component={MemoriaisScreen} options={{ title: 'Memoriais' }} />
      <Stack.Screen
        name="MinhaDiscipuladora"
        component={MinhaDiscipuladoraScreen}
        options={{ title: 'Minha Discipuladora' }}
      />
      <Stack.Screen name="Acolhimento" component={AcolhimentoScreen} options={{ title: 'Acolhimento' }} />
      <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
      <Stack.Screen name="PainelLider" component={PainelLiderScreen} options={{ title: 'Painel da Líder' }} />
      <Stack.Screen name="PainelIgreja" component={PainelIgrejaScreen} options={{ title: 'Painel da Igreja' }} />
      <Stack.Screen name="Mapa" component={MapaScreen} options={{ title: 'Mapa' }} />
      <Stack.Screen name="Missoes" component={MissoesScreen} options={{ title: 'Missões' }} />
    </Stack.Navigator>
  );
}
