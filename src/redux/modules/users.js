const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";
const EDIT_USER = "EDIT_USER";


export const add_user = (userInfo) => {
  return { type: ADD_USER, payload: userInfo }
}

export const edit_user = (userInfo) => {
  return { type: EDIT_USER, payload: userInfo }
}

export const remove_user = () => {
  return { type: REMOVE_USER }
}


const initialState = [];


export const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return state = [action.payload, ...state]
    case EDIT_USER:
      let copied = [...state];
      return state = copied;
    case REMOVE_USER:
      let copy = [...state]
      copy.pop()
      return copy
    default:
      return state
  }
}