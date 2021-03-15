import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { Colors, IconSize } from '../../consts/theme';
import Card from '../../components/Card';
import EditModal from './EditModal';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import todo from '../../store/todo';
import { deleteTodoAsync } from '../../store/async';

const Todo: React.FC<StackScreenProps<any>> = observer((props) => {
  const { navigation, route } = props;
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const todoItem = todo.selectTodo(route.params?.id).get();

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDelete = React.useCallback(async () => {
    if (!todoItem) {
      return;
    }
    setLoading(true);
    try {
      await deleteTodoAsync(todoItem.id);
      handleBackPress();
    } catch (e) {
      setLoading(false);
    }
  }, [handleBackPress, todoItem]);

  const handleDeletePress = React.useCallback(() => {
    if (!todoItem) {
      return;
    }
    Alert.alert('Удалить задание', todoItem.title, [
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
  }, [handleDelete, todoItem]);

  const openModal = React.useCallback(() => {
    setModal(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setModal(false);
  }, []);

  if (!todoItem) {
    return null;
  }

  const { title } = todoItem;

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
      {modal && <EditModal visible={modal} onClose={closeModal} todo={todoItem} />}
    </View>
  );
});

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
