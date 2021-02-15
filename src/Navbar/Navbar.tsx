import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NavBar: React.FC = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.navbarContainer, { paddingTop: top }]}>
      <View style={styles.navbar}>
        <Text style={styles.text}>ToDo App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: '#3949ab',
  },
  navbar: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3949ab',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default NavBar;
