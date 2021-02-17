import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<Props> = (props) => {
  const { children, style } = props;
  return <View style={[styles.default, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default Card;
