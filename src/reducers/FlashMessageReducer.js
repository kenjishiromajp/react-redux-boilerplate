// ------------------------------------
// Constants
// ------------------------------------

export const SHOW_MESSAGE = 'SHOW_MESSAGE';

// ------------------------------------
// Actions
// ------------------------------------
export const showMessage = message => dispatch => {
  dispatch({
    type: SHOW_MESSAGE,
    payload: message,
  });
};


export const actions = {
  showMessage,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_MESSAGE]: (state, { payload }) => ({
    ...state,
    items: payload,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  message: null,
};

export default function FlashMessage(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
