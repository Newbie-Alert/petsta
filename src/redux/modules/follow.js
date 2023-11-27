// Action Type
const MY_FOLLOW_LIST = 'MY_FOLLOW_LIST';

// Action Creator

export const myFollowList = (payload) => {
  return {
    type: MY_FOLLOW_LIST,
    payload
  };
};

const initialState = {
  followList: []
};

export const follow = (state = initialState, action) => {
  switch (action.type) {
    case MY_FOLLOW_LIST:
      return {
        ...state,
        followList: action.payload
      };

    default:
      return state;
      break;
  }
};
