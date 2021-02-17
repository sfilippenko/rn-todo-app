import { StyleSheet, View } from 'react-native';
import React from 'react';
import axios from 'axios';
import NavBar from './components/Navbar';
import { TodoItem } from './types/common';
import Main from './screens/Main';
import Todo from './screens/Todo';

const Root: React.FC = () => {
  const [todoId, setTodoId] = React.useState<number | null>(2);
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [loading, setLoading] = React.useState(false);

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

  const renderContent = () => {
    if (todoId !== null) {
      return (
        <Todo
          onDelete={handleDelete}
          onTodoOpen={setTodoId}
          todo={todos.find((item) => item.id === todoId)}
        />
      );
    }
    return (
      <Main
        onTodoOpen={setTodoId}
        onAdd={handleAdd}
        onDelete={handleDelete}
        todos={todos}
        loading={loading}
      />
    );
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content}>{renderContent()}</View>
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
