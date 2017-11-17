// ------------------------------------
// Constants
// ------------------------------------
import {normalize} from 'normalizr';
import {requestDelete, requestGet, requestPost, requestPatch} from '../modules/api';
import {todolistEntity} from '../modules/entities';
import {DELETE_TODO, LIST_TODO} from './TodoReducer';

export const LIST_TODOLIST = 'LIST_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
export const UPDATE_TODOLIST = 'UPDATE_TODOLIST';
export const DELETE_TODOLIST = 'DELETE_TODOLIST';

export const UPDATE_TODO = 'DELETE_TODO';

// ------------------------------------
// Actions
// ------------------------------------
export function listTodoList() {
  return (dispatch, getState) => requestGet('todolists')
    .then((todolists) => {
      const entities = normalize(todolists, [todolistEntity]).entities;
      dispatch({
        type: LIST_TODOLIST,
        payload: entities.todolists,
      });
      dispatch({
        type: LIST_TODO,
        payload: entities.todos,
      });
    });
}

export function addTodoList(todolist) {
  return (dispatch, getState) => requestPost('todolists', todolist)
    .then(todolist => {
      dispatch({
        type: ADD_TODOLIST,
        payload: todolist,
      });
    });
}

export const updateTodoList = (todolistId, todolist) => (dispatch, getState) => requestPatch(`todolists/${todolistId}`, todolist)
  .then(todolist => {
    dispatch({
      type: UPDATE_TODOLIST,
      payload: todolist,
    });
  });

export const deleteTodoList = todolistId => (dispatch, getState) => requestDelete(`todolists/${todolistId}`)
  .then(todolist => {
    dispatch({
      type: DELETE_TODOLIST,
      payload: todolistId,
    });
  });


export const actions = {
  listTodoList,
  addTodoList,
  updateTodoList,
  deleteTodoList,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIST_TODOLIST]: (state, {payload}) => ({
    ...state,
    items: payload,
  }),
  [ADD_TODOLIST]: (state, {payload}) => {
    const newState = Object.assign(state, {});
    newState[payload.id] = payload;
    return newState;
  },
  [UPDATE_TODOLIST]: (state, {payload}) => {
    const newState = Object.assign(state, {});
    newState[payload.id] = payload;
    return newState;
  },
  [DELETE_TODOLIST]: (state, {payload}) => {
    const newState = Object.assign(state, {});
    delete newState[payload.id];
    return newState;
  },
  [DELETE_TODO]: (state, {payload}) => {
    const newState = {...state};
    for (const key in newState.items) {
      newState.items[key].todos = newState.items[key].todos.filter(todoId => payload !== todoId);
    }
    return newState;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  items: {},
  updatedAt: null,
};

export default function TodoListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
