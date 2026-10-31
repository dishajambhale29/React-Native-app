
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AppNavigator from './src/navigation/AppNavigator';
import { ShopProvider } from './src/context/ShopContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ShopProvider>
        <NavigationContainer>
          <StatusBar style="dark" />

          <AppNavigator />

        </NavigationContainer>
      </ShopProvider>
    </SafeAreaProvider>
  );
}
