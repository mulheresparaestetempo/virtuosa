import { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  CormorantGaramond_600SemiBold_Italic,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

import LugarSecretoScreen from './src/screens/LugarSecretoScreen';
import ComunidadeScreen from './src/screens/ComunidadeScreen';
import BibliotecaScreen from './src/screens/BibliotecaScreen';
import VidaDevocionalStack from './src/navigation/VidaDevocionalStack';
import PerfilStack from './src/navigation/PerfilStack';
import AutenticacaoScreen from './src/screens/AutenticacaoScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { firebaseConfigurado } from './src/firebase';
import { cores, fontes } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.bordo,
        tabBarInactiveTintColor: cores.cinzaClaro,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: cores.borda },
        tabBarLabelStyle: { fontFamily: fontes.rotuloMedio, fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={LugarSecretoScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🕊️</Text>,
        }}
      />
      <Tab.Screen
        name="VidaDevocional"
        component={VidaDevocionalStack}
        options={{
          title: 'Vida Devocional',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🙏</Text>,
        }}
      />
      <Tab.Screen
        name="Comunidade"
        component={ComunidadeScreen}
        options={{
          title: 'Comunidade',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>❤️</Text>,
        }}
      />
      <Tab.Screen
        name="Biblioteca"
        component={BibliotecaScreen}
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🎧</Text>,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🌺</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

function Portao() {
  const { carregando, usuario } = useAuth();

  if (carregando) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: cores.creme, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={cores.bordo} />
      </SafeAreaView>
    );
  }

  return usuario ? <AppTabs /> : <AutenticacaoScreen />;
}

export default function App() {
  const [fontesCarregadas] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    CormorantGaramond_600SemiBold_Italic,
    CormorantGaramond_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const aoRenderizarLayout = useCallback(async () => {
    if (fontesCarregadas) await SplashScreen.hideAsync();
  }, [fontesCarregadas]);

  useEffect(() => {
    aoRenderizarLayout();
  }, [aoRenderizarLayout]);

  if (!fontesCarregadas) return null;

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {firebaseConfigurado ? (
        <AuthProvider>
          <Portao />
        </AuthProvider>
      ) : (
        <AppTabs />
      )}
    </NavigationContainer>
  );
}
