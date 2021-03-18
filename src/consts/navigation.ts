import { StackNavigationOptions } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Colors } from './theme';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.Main,
  },
  card: {
    backgroundColor: Colors.White,
  },
});

export const screenOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerStyle: styles.header,
  headerTitleAlign: 'center',
  headerTintColor: Colors.White,
  cardStyle: styles.card,
};
