import { StyleSheet, View, ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import React from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavBar from './components/Navbar';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { TodoItem } from './types/common';

const Root: React.FC = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=40');
        setTodos(response.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = React.useCallback((todo: TodoItem) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { ...todo, id: todo.id + Date.now() }];
    });
  }, []);

  const handleDelete = React.useCallback((id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((item) => item.id !== id);
    });
  }, []);

  const renderItem = React.useCallback(
    (info: ListRenderItemInfo<TodoItem>) => {
      return (
        <Todo data={info.item} isLast={info.index === todos.length - 1} onDelete={handleDelete} />
      );
    },
    [todos, handleDelete],
  );

  const keyExtractor = React.useCallback((item: TodoItem) => {
    return String(item.id);
  }, []);

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <AddTodo onAdd={handleAdd} />
            <FlatList<TodoItem>
              contentContainerStyle={{ paddingBottom: insets.bottom }}
              data={todos}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={keyExtractor}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1,
  },
});

export default Root;
