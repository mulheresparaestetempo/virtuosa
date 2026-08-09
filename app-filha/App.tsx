import { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { CormorantGaramond_600SemiBold_Italic, CormorantGaramond_700Bold } from '@expo-google-fonts/cormorant-garamond';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

import HomePremiumScreen from './src/screens/HomePremiumScreen';
import ComunidadeScreen from './src/screens/ComunidadeScreen';
import BibliotecaScreen from './src/screens/BibliotecaScreen';
import VidaDevocionalStack from './src/navigation/VidaDevocionalStack';
import PerfilStack from './src/navigation/PerfilStack';
import AutenticacaoScreen from './src/screens/AutenticacaoScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { firebaseConfigurado } from './src/firebase';
import { cores, fontes, raios } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});
const Tab = createBottomTabNavigator();

function IconeNavegacao({ simbolo, color, focused }: { simbolo: string; color: string; focused: boolean }) {
  return <View style={{ minWidth: 38, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? cores.roseClaro : 'transparent' }}><Text style={{ fontSize: focused ? 19 : 18, lineHeight: 21, color, fontFamily: fontes.rotulo }}>{simbolo}</Text></View>;
}

function AppTabs() {
  return <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: cores.douradoEscuro, tabBarInactiveTintColor: cores.cinzaClaro, tabBarStyle: { backgroundColor: 'rgba(255,255,255,0.98)', borderTopColor: cores.borda, borderTopWidth: 1, height: 72, paddingTop: 7, paddingBottom: 7, elevation: 0, shadowOpacity: 0 }, tabBarLabelStyle: { fontFamily: fontes.rotuloMedio, fontSize: 9.5, marginTop: 1 }, tabBarItemStyle: { borderRadius: raios.botao, marginHorizontal: 2 } }}>
    <Tab.Screen name="Home" component={HomePremiumScreen} options={{ title: 'Início', tabBarIcon: ({ color, focused }) => <IconeNavegacao simbolo="⌂" color={color} focused={focused} /> }} />
    <Tab.Screen name="VidaDevocional" component={VidaDevocionalStack} options={{ title: 'Devocional', tabBarIcon: ({ color, focused }) => <IconeNavegacao simbolo="✦" color={color} focused={focused} /> }} />
    <Tab.Screen name="Comunidade" component={ComunidadeScreen} options={{ title: 'Comunidade', tabBarIcon: ({ color, focused }) => <IconeNavegacao simbolo="♡" color={color} focused={focused} /> }} />
    <Tab.Screen name="Biblioteca" component={BibliotecaScreen} options={{ title: 'Biblioteca', tabBarIcon: ({ color, focused }) => <IconeNavegacao simbolo="▤" color={color} focused={focused} /> }} />
    <Tab.Screen name="Perfil" component={PerfilStack} options={{ title: 'Minha caminhada', tabBarIcon: ({ color, focused }) => <IconeNavegacao simbolo="◌" color={color} focused={focused} /> }} />
  </Tab.Navigator>;
}

function Portao() {
  const { carregando, usuario } = useAuth();
  if (carregando) return <SafeAreaView style={{ flex: 1, backgroundColor: cores.creme, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={cores.douradoEscuro} /></SafeAreaView>;
  return usuario ? <AppTabs /> : <AutenticacaoScreen />;
}

export default function App() {
  const [fontesCarregadas] = useFonts({ PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold, CormorantGaramond_600SemiBold_Italic, CormorantGaramond_700Bold, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Inter_400Regular, Inter_600SemiBold });
  const aoRenderizarLayout = useCallback(async () => { await SplashScreen.hideAsync().catch(() => {}); }, []);
  useEffect(() => { aoRenderizarLayout(); }, [aoRenderizarLayout]);
  void fontesCarregadas;
  return <NavigationContainer><StatusBar style="dark" />{firebaseConfigurado ? <AuthProvider><Portao /></AuthProvider> : <AppTabs />}</NavigationContainer>;
}
