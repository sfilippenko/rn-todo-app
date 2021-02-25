import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { Colors, IconSize } from '../../../consts/theme';
import AppButton from '../../../components/AppButton';
import { TodoContextDispatch } from '../../../context/todo/todoContext';
import { addTodo } from '../../../context/todo/actions';

const AddTodo: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const dispatch = useContext(TodoContextDispatch);

  const trimmedTitle = React.useMemo(() => {
    return title.trim();
  }, [title]);

  const handlePress = React.useCallback(async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    try {
      if (!trimmedTitle) {
        throw new Error('Название дела не может быть пустым');
      }
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: trimmedTitle,
      });
      dispatch(addTodo(response.data));
      setTitle('');
    } catch (e) {
      Alert.alert(e.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, trimmedTitle]);

  return (
    <View style={styles.block}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
        editable={!loading}
        onChangeText={setTitle}
        value={title}
        placeholder="Введите название задания..."
      />
      <AppButton onPress={handlePress} disabled={loading}>
        <AntDesign name="pluscircleo" size={IconSize.MD} />
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    padding: 10,
    flex: 1,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: Colors.Main,
    marginRight: 10,
  },
});

export default AddTodo;
