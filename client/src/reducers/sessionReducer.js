import { RECEIVE_CURRENT_USER, GET_USER  } from '../actions/SessionActions';

const defaultState = {
    loggedIn: false,
    currentUser: {}
}

const sessionReducer = (state = defaultState, action)=> {
    let newState;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = Object.assign({}, state, {currentUser: action.user});
      return newState;
    case USER_STATUS:
      newState = Object.assign({}, state, {loggedIn: action.user});
      return newState;
    case RECEIVE_CURRENT_USER:
      return 
    default:
      return state;
  }
}

export default sessionReducer;