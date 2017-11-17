import { combineReducers } from 'redux';
import TodoListReducer from './TodoListReducer';
import TodoReducer from './TodoReducer';
import FlashMessage from './FlashMessageReducer';

export const makeRootReducer = asyncReducers => combineReducers({
  todolists: TodoListReducer,
  todos: TodoReducer,
  flashMessage: FlashMessage,
  ...asyncReducers,
});

export default makeRootReducer;
