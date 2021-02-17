import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Root from './src/Root';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Root />
    </SafeAreaProvider>
  );
};

export default App;
