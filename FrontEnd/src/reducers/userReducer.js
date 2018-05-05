import { GET_ALL_USERS, RECEIVE_SINGLE_USER } from "../actions/UserActions";
import merge from "lodash/merge";

const defaultState = {
  users: null,
  user: {}
};

const userReducer = (state = defaultState, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;

    case RECEIVE_SINGLE_USER:
      return merge({}, state, { user: action.payload });

    default:
      return state;
  }
};
export default userReducer;
