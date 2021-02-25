import { createContext, Dispatch } from 'react';
import { TodoReducerState, defaultState } from './todoReducer';
import { Action } from '../../types/common';

export const TodoContextState = createContext<TodoReducerState>(defaultState);

export const TodoContextDispatch = createContext<Dispatch<Action>>(() => ({}));
