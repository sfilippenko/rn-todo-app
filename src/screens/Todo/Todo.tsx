import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { TodoItem } from '../../types/common';
import { Colors } from '../../consts/theme';
import Card from '../../components/Card';
import EditModal from './EditModal';
import AppText from '../../components/AppText';

interface Props {
  onTodoOpen: (value: number | null) => void;
  todo?: TodoItem;
  onDelete: (id: number) => void;
  onTodoChange: (todo: TodoItem) => void;
}

const Todo: React.FC<Props> = (props) => {
  const { onTodoOpen, todo, onDelete, onTodoChange } = props;
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const handleBackPress = React.useCallback(() => {
    onTodoOpen(null);
  }, [onTodoOpen]);

  const handleDelete = React.useCallback(async () => {
    if (!todo) {
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`);
      onDelete(todo.id);
      handleBackPress();
    } catch (e) {
      setLoading(false);
    }
  }, [handleBackPress, todo, onDelete]);

  const handleDeletePress = React.useCallback(() => {
    if (!todo) {
      return;
    }
    Alert.alert('Удалить задание', todo.title, [
      {
        text: 'Удалить',
        onPress: handleDelete,
        style: 'destructive',
      },
      {
        text: 'Отмена',
        style: 'cancel',
      },
    ]);
  }, [handleDelete, todo]);

  const openModal = React.useCallback(() => {
    setModal(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setModal(false);
  }, []);

  if (!todo) {
    return null;
  }

  const { title } = todo;

  return (
    <View>
      <Card style={styles.card}>
        <AppText style={styles.title}>{title}</AppText>
        <Button disabled={loading} title="Редактировать" onPress={openModal} />
      </Card>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button disabled={loading} onPress={handleBackPress} title="Назад" color={Colors.Gray} />
        </View>
        <View style={styles.button}>
          <Button
            disabled={loading}
            onPress={handleDeletePress}
            title="Удалить"
            color={Colors.Danger}
          />
        </View>
      </View>
      {modal && (
        <EditModal visible={modal} onClose={closeModal} todo={todo} onTodoChange={onTodoChange} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    flex: 1,
    marginRight: 4,
  },
  card: {
    marginBottom: 20,
  },
});

export default Todo;
