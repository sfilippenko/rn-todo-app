import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { TodoItem } from '../../types/common';
import { Colors, IconSize } from '../../consts/theme';
import Card from '../../components/Card';
import EditModal from './EditModal';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';

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
        <AppButton disabled={loading} onPress={openModal}>
          <FontAwesome name="edit" size={IconSize.MD} />
        </AppButton>
      </Card>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton disabled={loading} onPress={handleBackPress} color={Colors.Gray}>
            <AntDesign name="back" size={IconSize.MD} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton disabled={loading} onPress={handleDeletePress} color={Colors.Danger}>
            <FontAwesome name="remove" size={IconSize.MD} />
          </AppButton>
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
