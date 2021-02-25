import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Root from './src/Root';
import TodoState from './src/context/todo/TodoState';

const App: React.FC = () => {
  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <TodoState>
          <Root />
        </TodoState>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
};

export default App;
