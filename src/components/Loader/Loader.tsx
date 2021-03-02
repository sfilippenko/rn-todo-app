import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Colors } from '../../consts/theme';

interface Props {
  centerScreen?: boolean;
}

const Loader: React.FC<Props> = (props) => {
  const { centerScreen } = props;
  return (
    <View style={[centerScreen && styles.wrapperCenterScreen]}>
      <ActivityIndicator size="large" color={Colors.Main} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperCenterScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
