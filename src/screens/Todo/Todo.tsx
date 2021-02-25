import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { TodoItem } from '../../types/common';
import { Colors, IconSize } from '../../consts/theme';
import Card from '../../components/Card';
import EditModal from './EditModal';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { TodoContextDispatch } from '../../context/todo/todoContext';
import { deleteTodo, setTodoId } from '../../context/todo/actions';

interface Props {
  todo?: TodoItem;
}

const Todo: React.FC<Props> = (props) => {
  const { todo } = props;
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const dispatch = useContext(TodoContextDispatch);

  const handleBackPress = React.useCallback(() => {
    dispatch(setTodoId(null));
  }, [dispatch]);

  const handleDelete = React.useCallback(async () => {
    if (!todo) {
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`);
      dispatch(deleteTodo(todo.id));
      handleBackPress();
    } catch (e) {
      setLoading(false);
    }
  }, [handleBackPress, todo, dispatch]);

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
      {modal && <EditModal visible={modal} onClose={closeModal} todo={todo} />}
    </View>
  );
};

const buttonsGap = 10;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginHorizontal: -buttonsGap,
  },
  button: {
    flex: 1,
    paddingHorizontal: buttonsGap,
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
