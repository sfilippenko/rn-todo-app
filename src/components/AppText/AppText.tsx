import React from 'react';
import { Text, StyleSheet, TextProps, StyleProp, TextStyle } from 'react-native';

const AppText: React.FC<TextProps> = (props) => {
  const { style: styleProp } = props;
  const calculatedStyles: StyleProp<TextStyle> = [styles.default];

  if (styleProp) {
    if (Array.isArray(styleProp)) {
      calculatedStyles.push(...styleProp);
    } else {
      calculatedStyles.push(styleProp);
    }
  }

  return <Text {...props} style={calculatedStyles} />;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'normal',
  },
});

export default AppText;
