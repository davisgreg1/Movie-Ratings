import {loginUser, getUserFromToken, tokenSuccess, tokenFailure, resetToken} from '../utils/session_api_utils';
import customHistory from '../history';

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
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
      // dispatch(alertActions.error(error.toString()));
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

// export const userFromToken = (tokenFromStorage) => {
//   return dispatch => {
//     dispatch(getUserFromToken(tokenFromStorage));
//   }
// }



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
//used for logout
export const resetUserToken = () => {
  return dispatch => {
    dispatch(resetToken());
  }
}
