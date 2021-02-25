import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TodoItem } from '../../../types/common';
import AppText from '../../../components/AppText';
import { TodoContextDispatch } from '../../../context/todo/todoContext';
import { deleteTodo, setTodoId } from '../../../context/todo/actions';

interface Props {
  data: TodoItem;
}

const activeOpacity = 0.3;

const Todo: React.FC<Props> = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [loading, setLoading] = React.useState(false);
  const dispatch = React.useContext(TodoContextDispatch);
  const { data } = props;
  const { title, id } = data;

  const handleDelete = React.useCallback(async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      dispatch(deleteTodo(id));
    } catch (e) {
      setLoading(false);
    }
  }, [dispatch, id]);

  const handleLongPress = React.useCallback(() => {
    showActionSheetWithOptions(
      {
        options: ['Удалить', 'Отмена'],
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0: {
            handleDelete();
            break;
          }
          default: {
            break;
          }
        }
      },
    );
  }, [handleDelete, showActionSheetWithOptions]);

  const handlePress = React.useCallback(() => {
    dispatch(setTodoId(id));
  }, [id, dispatch]);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[styles.todo, loading && styles.todoLoading]}
      disabled={loading}>
      <AppText>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    flex: 1,
  },
  todoLoading: {
    opacity: activeOpacity,
  },
});

export default React.memo(Todo);
