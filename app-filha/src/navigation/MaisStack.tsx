import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cores } from '../theme';

import MaisScreen from '../screens/MaisScreen';
import MemoriaisScreen from '../screens/MemoriaisScreen';
import ComunidadeScreen from '../screens/ComunidadeScreen';
import AcolhimentoScreen from '../screens/AcolhimentoScreen';

export type MaisStackParamList = {
  MaisHub: undefined;
  Memoriais: undefined;
  Comunidade: undefined;
  Acolhimento: undefined;
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
    </Stack.Navigator>
  );
}
