import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cores, fontes } from '../theme';
import PerfilScreen from '../screens/PerfilScreen';
import MinhaCaminhadaScreen from '../screens/MinhaCaminhadaScreen';
import MemoriaisScreen from '../screens/MemoriaisScreen';
import MinhaDiscipuladoraScreen from '../screens/MinhaDiscipuladoraScreen';
import AcolhimentoScreen from '../screens/AcolhimentoScreen';
import AgendaScreen from '../screens/AgendaScreen';

export type PerfilStackParamList = {
  Perfil: undefined;
  MinhaCaminhada: undefined;
  Memoriais: undefined;
  MinhaDiscipuladora: undefined;
  Acolhimento: undefined;
  Agenda: undefined;
};

const Stack = createNativeStackNavigator<PerfilStackParamList>();

export default function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: cores.bordo, headerStyle: { backgroundColor: cores.creme }, headerTitleStyle: { fontFamily: fontes.titulo, fontSize: 19 }, headerShadowVisible: false }}>
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MinhaCaminhada" component={MinhaCaminhadaScreen} options={{ title: 'Minha Caminhada' }} />
      <Stack.Screen name="Memoriais" component={MemoriaisScreen} options={{ title: 'Memoriais' }} />
      <Stack.Screen name="MinhaDiscipuladora" component={MinhaDiscipuladoraScreen} options={{ title: 'Minha Discipuladora' }} />
      <Stack.Screen name="Acolhimento" component={AcolhimentoScreen} options={{ title: 'Acolhimento' }} />
      <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
    </Stack.Navigator>
  );
}
