// ACTION VALUE
const ADD_POST = "ADD_POST"

// ACTION VALUE CREATOR
export const addPost = (postObj) => {
  return { type: ADD_POST, payload: postObj }
}

// INITIAL STATE
const initialState = [];

// REDUCER
export const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return state = [action.payload, ...state]
    default:
      return state;
  }
}

