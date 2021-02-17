import React from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TodoItem } from '../../types/common';
import Todo from './Todo';
import AddTodo from './AddTodo';

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
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <AddTodo onAdd={onAdd} />
      <FlatList<TodoItem>
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        data={todos}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
      />
    </>
  );
};

export default Main;
