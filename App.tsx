import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Root from './src/Root';

const App: React.FC = () => {
  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Root />
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
};

export default App;
