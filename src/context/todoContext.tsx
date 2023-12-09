import React, { createContext,  useReducer } from 'react';
import { TodoState, Action, Todo } from '../types/typeList';
import { TodoProps, TodoProviderProps } from '../interfaces/interfaceList';




const TodoContext = createContext<TodoProps | undefined>(undefined);

const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        todos: action.payload as Todo[],
      };
    case 'ADD_TODO':
      return {
        todos: [action.payload as Todo, ...state.todos],
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== Number((action.payload as Todo).id)),
      };
    case 'UNSET_TODOS':
      return {
        todos: [],
      };
    default:
      return state;
  }
};

const initialState: TodoState = { todos: [] };

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = () => {
  const context = React.useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return {
    todos:context.state.todos,
    dispatch:context.dispatch
  };
};
