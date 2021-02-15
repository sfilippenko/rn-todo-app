import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavBar from './src/Navbar';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <NavBar />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
