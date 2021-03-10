import { Action, TodoItem } from '../../types/common';
import * as actions from './actions';

export interface TodoReducerState {
  todos: TodoItem[];
}

export const defaultState: TodoReducerState = {
  todos: [],
};

export default (state: TodoReducerState, action: Action): TodoReducerState => {
  return {
    [actions.setTodos.toString()]: (
      state: TodoReducerState,
      { payload }: ReturnType<typeof actions.setTodos>,
    ) => {
      return {
        ...state,
        todos: payload,
      };
    },
    [actions.deleteTodo.toString()]: (
      state: TodoReducerState,
      { payload }: ReturnType<typeof actions.deleteTodo>,
    ) => {
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== payload),
      };
    },
    [actions.changeTodo.toString()]: (
      state: TodoReducerState,
      { payload }: ReturnType<typeof actions.changeTodo>,
    ) => {
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        }),
      };
    },
    [actions.addTodo.toString()]: (
      state: TodoReducerState,
      { payload }: ReturnType<typeof actions.addTodo>,
    ) => {
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    },
  }[action.type](state, action);
};
