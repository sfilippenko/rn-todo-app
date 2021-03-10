import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import Root from './src/Root';
import TodoState from './src/context/todo/TodoState';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ActionSheetProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <TodoState>
            <Root />
          </TodoState>
        </SafeAreaProvider>
      </ActionSheetProvider>
    </NavigationContainer>
  );
};

export default App;
