import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavBar from './src/components/Navbar';
import AddTodo from './src/components/AddTodo';
import Todo from './src/components/Todo';
import { TodoItem } from './src/types/common';

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const addTodo = React.useCallback((title) => {
    setTodos((prevTodos) => {
      const newTodo: TodoItem = {
        id: Date.now(),
        title,
      };
      return [...prevTodos, newTodo];
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <NavBar />
        <View style={styles.content}>
          <AddTodo addTodo={addTodo} />
          <View>
            {todos.map((todo) => {
              return <Todo key={todo.id} data={todo} />;
            })}
          </View>
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
