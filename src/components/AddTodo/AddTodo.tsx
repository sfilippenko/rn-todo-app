import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';

interface Props {
  addTodo: (title: string) => void;
}

const AddTodo: React.FC<Props> = (props) => {
  const { addTodo } = props;

  const [title, setTitle] = React.useState('');

  const handleTitleChange = React.useCallback((text: string) => {
    setTitle(text);
  }, []);

  const handlePress = React.useCallback(() => {
    addTodo(title);
    setTitle('');
  }, [addTodo, title]);

  return (
    <View style={styles.block}>
      <TextInput style={styles.input} onChangeText={handleTitleChange} value={title} />
      <Button title="Добавить" onPress={handlePress} />
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
