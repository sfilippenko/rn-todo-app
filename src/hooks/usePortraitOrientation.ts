import { useWindowDimensions } from 'react-native';

export default (): boolean => {
  const { height, width } = useWindowDimensions();
  return height > width;
};
