import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';
import { TodoItem } from '../../types/common';

interface Props {
  addTodo: (todo: TodoItem) => void;
}

const AddTodo: React.FC<Props> = (props) => {
  const { addTodo } = props;
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const handleTitleChange = React.useCallback((text: string) => {
    setTitle(text);
  }, []);

  const handlePress = React.useCallback(async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
      });
      addTodo(response.data);
      setTitle('');
    } finally {
      setLoading(false);
    }
  }, [addTodo, title]);

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        editable={!loading}
        onChangeText={handleTitleChange}
        value={title}
      />
      <Button title="Добавить" onPress={handlePress} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    flex: 1,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: '#3949ab',
    marginRight: 10,
  },
});

export default AddTodo;
