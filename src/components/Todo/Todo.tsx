import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TodoItem } from '../../types/common';

interface Props {
  data: TodoItem;
  isLast?: boolean;
}

const Todo: React.FC<Props> = (props) => {
  const { data, isLast } = props;
  const { title } = data;
  return (
    <View style={[styles.todo, isLast && styles.todoLast]}>
      <Text>{title}</Text>
    </View>
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
});

export default React.memo(Todo);
