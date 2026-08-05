import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

import LugarSecretoScreen from './src/screens/LugarSecretoScreen';
import BibliaScreen from './src/screens/BibliaScreen';
import DiarioScreen from './src/screens/DiarioScreen';
import JornadasScreen from './src/screens/JornadasScreen';
import MaisStack from './src/navigation/MaisStack';
import AutenticacaoScreen from './src/screens/AutenticacaoScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { firebaseConfigurado } from './src/firebase';
import { cores } from './src/theme';

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.bordo,
        tabBarInactiveTintColor: cores.cinzaClaro,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: cores.borda },
      }}
    >
      <Tab.Screen
        name="LugarSecreto"
        component={LugarSecretoScreen}
        options={{
          title: 'Lugar Secreto',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🕊️</Text>,
        }}
      />
      <Tab.Screen
        name="Biblia"
        component={BibliaScreen}
        options={{
          title: 'Bíblia',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📖</Text>,
        }}
      />
      <Tab.Screen
        name="Diario"
        component={DiarioScreen}
        options={{
          title: 'Diário',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📔</Text>,
        }}
      />
      <Tab.Screen
        name="Jornadas"
        component={JornadasScreen}
        options={{
          title: 'Jornadas',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🌱</Text>,
        }}
      />
      <Tab.Screen
        name="Mais"
        component={MaisStack}
        options={{
          title: 'Mais',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🌷</Text>,
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
