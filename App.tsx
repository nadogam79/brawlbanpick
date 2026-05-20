import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BanPickScreen from '@/screens/BanPickScreen';
import HomeScreen from '@/screens/HomeScreen';
import ResultScreen from '@/screens/ResultScreen';
import SimulatorScreen from '@/screens/SimulatorScreen';
import TierListScreen from '@/screens/TierListScreen';

export type RootStackParamList = {
  Home: undefined;
  BanPick: { mode: string };
  Result: { sessionId: string };
  Simulator: { mode: string };
  TierList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#1a1a2e' },
              headerTintColor: '#fff',
              contentStyle: { backgroundColor: '#16213e' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: '브롤 밴픽' }} />
            <Stack.Screen name="BanPick" component={BanPickScreen} options={{ title: '밴픽 진행' }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ title: '결과' }} />
            <Stack.Screen name="Simulator" component={SimulatorScreen} options={{ title: '드래프트 시뮬레이터' }} />
            <Stack.Screen name="TierList" component={TierListScreen} options={{ title: '티어리스트' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
