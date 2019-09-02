import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  USER_FROM_TOKEN,
  USER_FROM_TOKEN_SUCCESS,
  USER_FROM_TOKEN_FAILURE,
  RESET_TOKEN
} from "../actions/SessionActions";

const defaultState = {
  user: {},
  userAuthenticated: false,
  loggingIn: false,
  errorMsg: ''
};

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        user: action.payload,
        loggingIn: true,
        errorMsg: ''
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userAuthenticated: true,
        loggingIn: false,
        errorMsg: 'Sucess'
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        user: {},
        userAuthenticated: false,
        loggingIn: false,
        errorMsg: action.errorMsg
      }

    case USER_FROM_TOKEN:
      return {
        ...state,
        user: action.payload,
        userAuthenticated: true,
        loggingIn: false,
        errorMsg: ''
      }

    case USER_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userAuthenticated: true,
        loggingIn: false,
        errorMsg: 'Sucess'
      };

    case USER_FROM_TOKEN_FAILURE:
      return {
        ...state,
        user: {},
        userAuthenticated: false,
        loggingIn: false,
        errorMsg: action.errorMsg
      }
    case RESET_TOKEN:
      return {
        ...state,
        user: {},
        userAuthenticated: false,
        loggingIn: false,
        errorMsg: ''
      }

    default:
      return state;
  }
};
export default sessionReducer;
