import { useMemo } from 'react';
import { StyleProp } from 'react-native';

export default <Style>(style: StyleProp<Style>, styleProp: StyleProp<Style>) => {
  return useMemo(() => {
    const styleArr: StyleProp<Style> = [];
    [style, styleProp].forEach((item) => {
      if (item) {
        if (Array.isArray(item)) {
          styleArr.push(...item);
        } else {
          styleArr.push(item);
        }
      }
    });
    return styleArr;
  }, [style, styleProp]);
};
