import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../consts/theme';
import AppText from '../AppText';

const NavBar: React.FC = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.navbarContainer, { paddingTop: top }]}>
      <View style={styles.navbar}>
        <AppText style={styles.text}>Todo App</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: Colors.Main,
  },
  navbar: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Main,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default NavBar;
