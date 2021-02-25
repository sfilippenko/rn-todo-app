import React, { useContext } from 'react';
import { View, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Colors } from '../../../consts/theme';
import { TodoItem } from '../../../types/common';
import AppButton from '../../../components/AppButton';
import { TodoContextDispatch } from '../../../context/todo/todoContext';
import { changeTodo } from '../../../context/todo/actions';

interface Props {
  visible: boolean;
  onClose: () => void;
  todo: TodoItem;
}

const EditModal: React.FC<Props> = (props) => {
  const { visible, onClose, todo } = props;
  const [loading, setLoading] = React.useState(false);
  const { title, id } = todo;
  const [value, setValue] = React.useState(title);
  const dispatch = useContext(TodoContextDispatch);

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
      dispatch(
        changeTodo({
          ...todo,
          title: trimmedValue,
        }),
      );
      onClose();
    } catch (e) {
      Alert.alert(e.message);
      setLoading(false);
    }
  }, [dispatch, todo, onClose, id, trimmedValue]);

  return (
    <Modal
      supportedOrientations={['landscape', 'portrait']}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.wrapper}>
        <TextInput style={styles.input} value={value} onChangeText={setValue} editable={!loading} />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <AppButton onPress={onClose} color={Colors.Danger} disabled={loading}>
              Отменить
            </AppButton>
          </View>
          <View style={styles.button}>
            <AppButton onPress={handleSave} disabled={loading}>
              Сохранить
            </AppButton>
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
