import { StackNavigationOptions } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Colors } from './theme';
import { APP_PADDING_HORIZONTAL, APP_PADDING_TOP } from './app';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.Main,
  },
  card: {
    backgroundColor: Colors.White,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingTop: APP_PADDING_TOP,
  },
});

export const screenOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerStyle: styles.header,
  headerTitleAlign: 'center',
  headerTintColor: Colors.White,
  cardStyle: styles.card,
};
