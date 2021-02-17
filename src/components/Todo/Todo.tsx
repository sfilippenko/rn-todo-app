import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TodoItem } from '../../types/common';

interface Props {
  data: TodoItem;
}

const Todo: React.FC<Props> = (props) => {
  const { data } = props;
  const { title } = data;
  return (
    <View style={styles.todo}>
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
  },
});

export default Todo;
