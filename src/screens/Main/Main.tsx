import React from 'react';
import { ListRenderItemInfo, Image, StyleSheet, Alert, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { TodoItem } from '../../types/common';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Loader from '../../components/Loader';
import usePortraitOrientation from '../../hooks/usePortraitOrientation';
import ListGrid from '../../components/ListGrid';
import { setTodos } from '../../context/todo/actions';
import { TodoContextDispatch, TodoContextState } from '../../context/todo/todoContext';

const Main: React.FC = () => {
  const { todos } = React.useContext(TodoContextState);
  const [loading, setLoading] = React.useState(false);
  const insets = useSafeAreaInsets();
  const dispatch = React.useContext(TodoContextDispatch);
  const isPortrait = usePortraitOrientation();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      try {
        const response = await axios.get(
          'https://rn-todo-app-f4c5d-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        );
        const data = response.data || {};

        dispatch(
          setTodos(
            Object.keys(data).map((id) => ({
              id,
              title: data[id].title,
            })),
          ),
        );
      } catch (e) {
        Alert.alert(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

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
    </View>
  );
};

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
