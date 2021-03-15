import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import Root from './src/Root';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ActionSheetProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <Root />
        </SafeAreaProvider>
      </ActionSheetProvider>
    </NavigationContainer>
  );
};

export default App;
