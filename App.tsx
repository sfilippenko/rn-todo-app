import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import NavBar from './src/components/Navbar';
import AddTodo from './src/components/AddTodo';
import Todo from './src/components/Todo';
import { TodoItem } from './src/types/common';

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3');
        setTodos(response.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addTodo = React.useCallback((todo: TodoItem) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { ...todo, id: todo.id + Date.now() }];
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <NavBar />
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <AddTodo addTodo={addTodo} />
              <View>
                {todos.map((todo) => {
                  return <Todo key={todo.id} data={todo} />;
                })}
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default App;
