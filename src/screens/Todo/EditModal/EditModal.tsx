import React from 'react';
import { View, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { Colors } from '../../../consts/theme';
import { TodoItem } from '../../../types/common';

interface Props {
  visible: boolean;
  onClose: () => void;
  todo: TodoItem;
  onTodoChange: (todo: TodoItem) => void;
}

const EditModal: React.FC<Props> = (props) => {
  const { visible, onClose, todo, onTodoChange } = props;
  const [loading, setLoading] = React.useState(false);
  const { title, id } = todo;
  const [value, setValue] = React.useState(title);

  const trimmedValue = React.useMemo(() => {
    return value.trim();
  }, [value]);

  const handleSave = React.useCallback(async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    try {
      if (!trimmedValue) {
        throw new Error('Название дела не может быть пустым');
      }
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title: trimmedValue,
      });
      onTodoChange({
        ...todo,
        title: trimmedValue,
      });
      onClose();
    } catch (e) {
      Alert.alert(e.message);
      setLoading(false);
    }
  }, [onTodoChange, todo, onClose, id, trimmedValue]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.wrapper}>
        <TextInput style={styles.input} value={value} onChangeText={setValue} editable={!loading} />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="Отменить" onPress={onClose} color={Colors.Danger} disabled={loading} />
          </View>
          <View style={styles.button}>
            <Button title="Сохранить" onPress={handleSave} disabled={loading} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: -10,
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    padding: 10,
    borderBottomColor: Colors.Main,
    borderBottomWidth: 2,
  },
});

export default EditModal;
