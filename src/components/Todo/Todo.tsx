import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TodoItem } from '../../types/common';

interface Props {
  data: TodoItem;
  isLast?: boolean;
  onDelete: (id: number) => void;
}

const Todo: React.FC<Props> = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [loading, setLoading] = React.useState(false);
  const { data, isLast, onDelete } = props;
  const { title, id } = data;

  const handleDelete = React.useCallback(async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      onDelete(id);
    } catch (e) {
      setLoading(false);
    }
  }, [id, onDelete]);

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

  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      style={[styles.todo, isLast && styles.todoLast, loading && styles.todoLoading]}
      disabled={loading}>
      <Text>{title}</Text>
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
    marginBottom: 8,
  },
  todoLast: {
    marginBottom: 0,
  },
  todoLoading: {
    opacity: 0.3,
  },
});

export default React.memo(Todo);
