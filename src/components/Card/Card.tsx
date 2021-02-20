import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../consts/theme';

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
    shadowColor: Colors.Black,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 8,
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
});

export default Card;
