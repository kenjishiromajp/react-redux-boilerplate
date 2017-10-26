// ------------------------------------
// Constants
// ------------------------------------
import { requestDelete, requestPost, requestPatch } from '../modules/api';

export const LIST_TODO = 'LIST_TODO';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// ------------------------------------
// Actions
// ------------------------------------

export function addTodo(todolistId, todo) {
  return (dispatch, getState) => requestPost(`todolists/${todolistId}/todos`, todo)
    .then((todo) => {
      dispatch({
        type: ADD_TODO,
        payload: todo,
      });
    });
}

export const updateTodo = (todoId, todo) => (dispatch, getState) => requestPatch(`todos/${todoId}`, todo)
  .then((_) => {
    dispatch({
      type: UPDATE_TODO,
      payload: {
        id: todoId,
        todo,
      },
    });
  });

export const deleteTodo = todoId => (dispatch, getState) => requestDelete(`todos/${todoId}`)
  .then((_) => {
    dispatch({
      type: DELETE_TODO,
      payload: todoId,
    });
  });


export const actions = {
  addTodo,
  updateTodo,
  deleteTodo,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIST_TODO]: (state, { payload }) => ({
    ...state,
    items: payload,
  }),
  [ADD_TODO]: (state, { payload }) => ({
    // TODO
  }),
  [UPDATE_TODO]: (state, { payload }) => ({
    ...state,
    items: {
      ...state.items,
      [payload.id]: {
        ...state.items[payload.id],
        ...payload,
      },
    },
  }),
  [DELETE_TODO]: (state, { payload }) => {
    const items = { ...state.items };
    delete items[payload];
    return {
      ...state,
      items,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  items: {},
};

export default function TodoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
