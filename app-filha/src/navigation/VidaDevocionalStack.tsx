import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cores, fontes } from '../theme';

import VidaDevocionalScreen from '../screens/VidaDevocionalScreen';
import BibliaScreen from '../screens/BibliaScreen';
import DiarioScreen from '../screens/DiarioScreen';
import JornadasScreen from '../screens/JornadasScreen';
import AssistenteBiblicaScreen from '../screens/AssistenteBiblicaScreen';
import OracaoScreen from '../screens/OracaoScreen';
import GratidaoScreen from '../screens/GratidaoScreen';
import CartinhaPaiScreen from '../screens/CartinhaPaiScreen';
import VersiculoDiaScreen from '../screens/VersiculoDiaScreen';
import LugarSecretoDetailScreen from '../screens/LugarSecretoDetailScreen';

export type VidaDevocionalStackParamList = {
  VidaDevocionalHub: undefined;
  Biblia: undefined;
  Diario: undefined;
  Jornadas: undefined;
  AssistenteBiblica: undefined;
  Oracao: undefined;
  Gratidao: undefined;
  CartinhaPai: undefined;
  VersiculoDia: undefined;
  LugarSecretoDetail: undefined;
};

const Stack = createNativeStackNavigator<VidaDevocionalStackParamList>();

export default function VidaDevocionalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: cores.bordo,
        headerStyle: { backgroundColor: cores.creme },
        headerTitleStyle: { fontFamily: fontes.titulo, fontSize: 19 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="VidaDevocionalHub" component={VidaDevocionalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Biblia" component={BibliaScreen} options={{ title: 'Bíblia' }} />
      <Stack.Screen name="Diario" component={DiarioScreen} options={{ title: 'Diário' }} />
      <Stack.Screen name="Jornadas" component={JornadasScreen} options={{ title: 'Jornadas' }} />
      <Stack.Screen
        name="AssistenteBiblica"
        component={AssistenteBiblicaScreen}
        options={{ title: 'Assistente Bíblica' }}
      />
      <Stack.Screen name="Oracao" component={OracaoScreen} options={{ title: 'Minhas Orações' }} />
      <Stack.Screen name="Gratidao" component={GratidaoScreen} options={{ title: 'Gratidão' }} />
      <Stack.Screen name="CartinhaPai" component={CartinhaPaiScreen} options={{ title: 'Cartinha do Pai' }} />
      <Stack.Screen name="VersiculoDia" component={VersiculoDiaScreen} options={{ title: 'Versículo do Dia' }} />
      <Stack.Screen
        name="LugarSecretoDetail"
        component={LugarSecretoDetailScreen}
        options={{ title: 'Seu Lugar Secreto' }}
      />
    </Stack.Navigator>
  );
}
