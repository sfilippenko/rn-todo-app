import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { TodoItem } from '../../types/common';
import { Colors } from '../../consts/theme';
import Card from '../../components/Card';

interface Props {
  onTodoOpen: (value: number | null) => void;
  todo?: TodoItem;
  onDelete: (id: number) => void;
}

const Todo: React.FC<Props> = (props) => {
  const { onTodoOpen, todo, onDelete } = props;
  const [loading, setLoading] = React.useState(false);

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

  if (!todo) {
    return null;
  }

  const { title } = todo;

  return (
    <View>
      <Card style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Button disabled={loading} title="Редактировать" onPress={handleDeletePress} />
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
