import React from 'react';
import { ListRenderItemInfo, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TodoItem } from '../../types/common';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Loader from '../../components/Loader';
import usePortraitOrientation from '../../hooks/usePortraitOrientation';
import ListGrid from '../../components/ListGrid';

interface Props {
  loading: boolean;
  todos: TodoItem[];
}

const Main: React.FC<Props> = (props) => {
  const { loading, todos } = props;
  const insets = useSafeAreaInsets();
  const isPortrait = usePortraitOrientation();

  const numColumns = React.useMemo(() => {
    return isPortrait ? 1 : 2;
  }, [isPortrait]);

  const renderItem = React.useCallback((info: ListRenderItemInfo<TodoItem>) => {
    return <Todo data={info.item} />;
  }, []);

  const keyExtractor = React.useCallback((item: TodoItem) => {
    return String(item.id);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AddTodo />
      {todos.length ? (
        <ListGrid<TodoItem>
          gap={8}
          numColumns={numColumns}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          data={todos}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../../assets/no-items.png')}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 100,
  },
});

export default Main;
