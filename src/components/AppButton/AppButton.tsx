import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import AppText from '../AppText';
import { Colors } from '../../consts/theme';
import useCalculatedStyles from '../../hooks/useCalculatedStyles';

interface Props extends TouchableOpacityProps {
  color?: Colors;
}

const AppButton: React.FC<Props> = (props) => {
  const { children, disabled, color = Colors.Main, style: styleProp, ...rest } = props;

  const defaultStyles = React.useMemo(() => {
    return [styles.button, disabled && styles.buttonDisabled, { backgroundColor: color }];
  }, [disabled, color]);

  const calculatedStyles = useCalculatedStyles<TextStyle>(defaultStyles, styleProp);
  return (
    <TouchableOpacity style={calculatedStyles} disabled={disabled} {...rest}>
      <AppText style={styles.text}>{children}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    height: 36,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.2,
  },
  text: {
    color: Colors.White,
  },
});

export default AppButton;
