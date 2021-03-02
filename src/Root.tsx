import { Alert, StyleSheet, View } from 'react-native';
import React from 'react';
import axios from 'axios';
import NavBar from './components/Navbar';
import Main from './screens/Main';
import Todo from './screens/Todo';
import { Colors } from './consts/theme';
import { TodoContextDispatch, TodoContextState } from './context/todo/todoContext';
import { setTodos } from './context/todo/actions';

const Root: React.FC = () => {
  const { todos, todoId } = React.useContext(TodoContextState);
  const dispatch = React.useContext(TodoContextDispatch);
  const [loading, setLoading] = React.useState(false);

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

  const renderContent = () => {
    if (todoId) {
      return <Todo todo={todos.find((item) => item.id === todoId)} />;
    }
    return <Main todos={todos} loading={loading} />;
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
    backgroundColor: Colors.White,
  },
});

export default Root;
