import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TodoItem } from '../../types/common';

interface Props {
  onTodoOpen: (value: number | null) => void;
  todo?: TodoItem;
}

const Todo: React.FC<Props> = (props) => {
  const { onTodoOpen, todo } = props;

  const handleBackPress = React.useCallback(() => {
    onTodoOpen(null);
  }, [onTodoOpen]);

  if (!todo) {
    return null;
  }

  const { title } = todo;

  return (
    <View>
      <Text>{title}</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button onPress={handleBackPress} title="Назад" color="#757575" />
        </View>
        <View style={styles.button}>
          <Button onPress={handleBackPress} title="Удалить" color="#e53935" />
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
});

export default Todo;
