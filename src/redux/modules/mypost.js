// Action Type
const ON_CHANGE_EDIT_CONTENT = 'ON_CHANGE_EDIT_CONTENT';

// Action Creator

export const onEditContent = (payload) => {
  return {
    type: ON_CHANGE_EDIT_CONTENT,
    payload
  };
};

const initialState = {
  onChangeEditContent: ''
};

export const mypost = (state = initialState, action) => {
  switch (action.type) {
    case ON_CHANGE_EDIT_CONTENT:
      return {
        ...state,
        onChangeEditContent: action.payload
      };

    default:
      return state;
      break;
  }
};
