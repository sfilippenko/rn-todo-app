import { computed, makeAutoObservable } from 'mobx';
import { TodoItem } from '../../types/common';

class Todo {
  public todos: TodoItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setTodos = (todos: TodoItem[]) => {
    this.todos = todos;
  };

  public deleteTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  public addTodo = (todo: TodoItem) => {
    this.todos.unshift(todo);
  };

  public changeTodo = (todo: TodoItem) => {
    this.todos = this.todos.map((item) => {
      if (item.id === todo.id) {
        return todo;
      }
      return item;
    });
  };

  public selectTodo = (id: string) => {
    return computed(() => {
      return this.todos.find((todo) => todo.id === id);
    });
  };
}

export default new Todo();
