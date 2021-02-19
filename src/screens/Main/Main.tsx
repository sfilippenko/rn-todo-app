import React from 'react';
import { FlatList, ListRenderItemInfo, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TodoItem } from '../../types/common';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Loader from '../../components/Loader';

interface Props {
  loading: boolean;
  todos: TodoItem[];
  onAdd: (todo: TodoItem) => void;
  onDelete: (id: number) => void;
  onTodoOpen: (value: number | null) => void;
}

const Main: React.FC<Props> = (props) => {
  const { loading, todos, onDelete, onAdd, onTodoOpen } = props;
  const insets = useSafeAreaInsets();

  const renderItem = React.useCallback(
    (info: ListRenderItemInfo<TodoItem>) => {
      return (
        <Todo
          onTodoOpen={onTodoOpen}
          data={info.item}
          isLast={info.index === todos.length - 1}
          onDelete={onDelete}
        />
      );
    },
    [todos, onDelete, onTodoOpen],
  );

  const keyExtractor = React.useCallback((item: TodoItem) => {
    return String(item.id);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AddTodo onAdd={onAdd} />
      {todos.length ? (
        <FlatList<TodoItem>
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          data={todos}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../../assets/no-items.png')}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 100,
  },
});

export default Main;
