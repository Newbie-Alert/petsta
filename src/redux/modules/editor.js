import { uuidv4 } from '@firebase/util';

// ACTION VALUE
const SET_TITLE = 'SET_TITLE';
const SET_CONTENT = 'SET_CONTENT';
const SET_EDIT_ID = 'SET_EDIT_ID'
const RESET_EDITOR = 'RESET_EDITOR';

// ACTION VALUE CREATOR
export const setTitle = (title) => ({
  type: SET_TITLE,
  payload: title,
});

export const setEditId = (id) => ({
  type: SET_EDIT_ID,
  payload: id,
});
export const setContent = (content) => ({
  type: SET_CONTENT,
  payload: content,
});

export const resetEditor = () => ({
  type: RESET_EDITOR,
});


// Initial STATE
const initialState = {
  editId: uuidv4(),
  editTitle: '',
  editorData: '',
  createdAt: new Date()
};

// REDUCER
export const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_ID:
      return { ...state, editId: action.payload, };
    case SET_TITLE:
      return { ...state, editTitle: action.payload };
    case SET_CONTENT:
      return { ...state, editorData: action.payload };
    case RESET_EDITOR:
      return initialState;
    default:
      return state;
  }
};

export default editorReducer;