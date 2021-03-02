import { TodoItem } from '../../types/common';
import { createAction } from '../../utils/app';

export const setTodos = createAction<TodoItem[]>('SET_TODOS');
export const deleteTodo = createAction<string>('DELETE_TODO');
export const changeTodo = createAction<TodoItem>('CHANGE_TODO');
export const addTodo = createAction<TodoItem>('ADD_TODO');
export const setTodoId = createAction<string>('SET_TODO_ID');
