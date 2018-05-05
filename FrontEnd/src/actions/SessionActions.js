import * as APIUtils from "../utils/session_api_utils";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const USER_STATUS = "USER_STATUS";

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

export const userStatus = user => {
  return {
    type: USER_STATUS,
    user
  };
};

export const signUp = user => dispatch => {
  return APIUtils.signupUser(user).then(
    user => {
      dispatch(receiveCurrentUser(user));
    },
    error => {
      console.log(("Sign-Up", error));
    }
  );
};

export const signIn = user => dispatch => {
  return APIUtils.loginUser(user).then(
    user => {
      dispatch(receiveCurrentUser(user));
    },
    error => {
      console.log(("Sign-In ", error));
    }
  );
};

export const signOut = () => dispatch => {
  return APIUtils.logoutUser().then(
    () => {
      dispatch(receiveCurrentUser(null));
    },
    error => {
      console.log(("Log-Out", error));
    }
  );
};
