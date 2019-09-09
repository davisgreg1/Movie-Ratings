import {
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_FAILURE
} from '../actions/PostsActions.js';

const defaultState = {
  posts: [],
  errorMsg: ''
};

const postsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        errorMsg: ''
      }

    case GET_ALL_BLOGS_FAILURE:
      return {
        ...state,
        posts: [],
        errorMsg: action.errorMsg
      }

    default:
      return state;
  }
};

export default postsReducer;
