import React from 'react';
import { TodoContextState, TodoContextDispatch } from './todoContext';
import todoReducer, { defaultState } from './todoReducer';

const TodoState: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(todoReducer, defaultState);
  return (
    <TodoContextState.Provider value={state}>
      <TodoContextDispatch.Provider value={dispatch}>{children}</TodoContextDispatch.Provider>
    </TodoContextState.Provider>
  );
};

export default TodoState;
