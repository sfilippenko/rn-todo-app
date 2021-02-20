import React from 'react';
import { View, FlatList, StyleSheet, FlatListProps, ListRenderItem, ViewStyle } from 'react-native';
import useCalculatedStyles from '../../hooks/useCalculatedStyles';

interface Props<Value> extends FlatListProps<Value> {
  gap: number;
}

function ListGrid<Value>(props: Props<Value>) {
  const { style: styleProp, gap, numColumns = 1, renderItem: renderItemProp, ...rest } = props;

  const renderItem: ListRenderItem<Value> = React.useCallback(
    (...params) => {
      return (
        <View style={{ padding: gap, width: `${100 / numColumns}%` }}>
          {renderItemProp?.(...params)}
        </View>
      );
    },
    [numColumns, gap, renderItemProp],
  );

  const listStyle = React.useMemo(() => {
    return { margin: -gap };
  }, [gap]);

  const calculatedListStyle = useCalculatedStyles<ViewStyle>(listStyle, styleProp);

  return (
    <View style={styles.listWrapper}>
      <FlatList
        key={numColumns}
        renderItem={renderItem}
        numColumns={numColumns}
        style={calculatedListStyle}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default ListGrid;
