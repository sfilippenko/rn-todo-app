import axios from 'axios';
import { Alert } from 'react-native';
import todo from './todo';
import { TodoItem } from '../../types/common';

export const getTodosAsync = async () => {
  try {
    await new Promise((res) => setTimeout(res, 500));
    const response = await axios.get(
      'https://rn-todo-app-f4c5d-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
    );
    const data = response.data || {};
    const mappedData = Object.keys(data)
      .map((id) => ({
        id,
        title: data[id].title,
        createdAt: data[id].createdAt,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    todo.setTodos(mappedData);
    return Promise.resolve(mappedData);
  } catch (e) {
    Alert.alert(e.message);
    return Promise.reject(e);
  }
};

export const deleteTodoAsync = async (id: string) => {
  try {
    await new Promise((res) => setTimeout(res, 500));
    await axios.delete(
      `https://rn-todo-app-f4c5d-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
    );
    todo.deleteTodo(id);
    return Promise.resolve(id);
  } catch (e) {
    Alert.alert(e.message);
    return Promise.reject(e);
  }
};

export const addTodoAsync = async (title: string) => {
  try {
    if (!title) {
      throw new Error('Название дела не может быть пустым');
    }
    const createdAt = Date.now();
    const response = await axios.post(
      'https://rn-todo-app-f4c5d-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      {
        title,
        createdAt,
      },
    );
    const newTodo = { title, createdAt, id: response.data.name };
    todo.addTodo(newTodo);
    return Promise.resolve(newTodo);
  } catch (e) {
    Alert.alert(e.message);
    return Promise.reject(e);
  }
};

export const editTodoAsync = async (todoItem: TodoItem) => {
  const { title, id } = todoItem;
  try {
    if (!title) {
      throw new Error('Название дела не может быть пустым');
    }
    await axios.put(
      `https://rn-todo-app-f4c5d-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
      {
        title,
      },
    );
    todo.changeTodo(todoItem);
    return Promise.resolve(todoItem);
  } catch (e) {
    Alert.alert(e.message);
    return Promise.reject(e);
  }
};
