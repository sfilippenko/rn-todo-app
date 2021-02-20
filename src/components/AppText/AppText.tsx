import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import useCalculatedStyles from '../../hooks/useCalculatedStyles';
import { isIos } from '../../consts/app';

const AppText: React.FC<TextProps> = (props) => {
  const { style: styleProp } = props;
  const calculatedStyles = useCalculatedStyles<TextStyle>(styles.default, styleProp);

  return <Text {...props} style={calculatedStyles} />;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: isIos ? 'Arial' : 'normal',
  },
});

export default AppText;
