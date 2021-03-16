import React from 'react';
import { ListRenderItemInfo, Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { TodoItem } from '../../types/common';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Loader from '../../components/Loader';
import usePortraitOrientation from '../../hooks/usePortraitOrientation';
import ListGrid from '../../components/ListGrid';
import todo from '../../store/todo/todo';
import { getTodosAsync } from '../../store/todo/async';

const Main: React.FC = observer(() => {
  const [loading, setLoading] = React.useState(false);
  const insets = useSafeAreaInsets();
  const isPortrait = usePortraitOrientation();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await getTodosAsync();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
    <View style={styles.container}>
      <AddTodo />
      {todo.todos.length ? (
        <ListGrid<TodoItem>
          gap={8}
          numColumns={numColumns}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          data={todo.todos}
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
