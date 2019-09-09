import axios from 'axios';
import {loginUser, getUserFromToken, tokenSuccess, tokenFailure, resetToken} from '../utils/session_api_utils';
import customHistory from '../history';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const LOG_OUT = "LOG_OUT";
export const USER_FROM_TOKEN = 'USER_FROM_TOKEN';
export const USER_FROM_TOKEN_SUCCESS = 'USER_FROM_TOKEN_SUCCESS';
export const USER_FROM_TOKEN_FAILURE = 'USER_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

export const login = (username, password) => {
  return dispatch => {
    dispatch(request({username}));
    loginUser(username, password).then(user => {
      sessionStorage.setItem('jwtToken', user.data.user.data.token);
      dispatch(success(user))
      customHistory.push(`/users/${username}`);
    }, error => {
      dispatch(failure(error.toString()));
    });
  };
  function request(userName) {
    return {type: LOG_IN_REQUEST, payload: userName}
  }
  function success(user) {
    const theUser = user.data.user;
    return {type: LOG_IN_SUCCESS, payload: theUser}
  }
  function failure(error) {
    return {type: LOG_IN_FAILURE, errorMsg: error}
  }
}

export const logOutUser = () => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  return dispatch => {
    axios({method: 'GET', url: "/users/logout"}).then(data => {
      dispatch(success(data.data.body))
      if (jwtToken) {
        sessionStorage.removeItem('jwtToken')
      }
      customHistory.push(`/`);
    }, error => {
      dispatch(failure(error.toString()));
    });

    function success(data) {
      return {type: LOG_OUT_SUCCESS, errorMsg: data}
    }
    function failure(error) {
      return {type: LOG_OUT_FAILURE, errorMsg: error}
    }
  }
}

export const meFromTokenSuccess = (tokenFromStorage) => {
  return dispatch => {
    dispatch(getUserFromToken(tokenFromStorage));
  }
}

export const meFromTokenFailure = (error) => {
  return dispatch => {
    dispatch(tokenFailure(error));
    customHistory.push(`/login`);
  }
}
