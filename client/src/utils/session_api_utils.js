import axios from "axios";

export const loginUser = (username, password) => {
  return axios.post("/users/login", {
    username: username,
    password: password
  });
};

export const getUserFromToken = (tokenFromStorage)=> {
  return function action(dispatch) {
    const request = axios({
      method: 'GET',
      url: `/users/auth_token?token=${tokenFromStorage}`,
      headers: []
    });
    
    return request.then(
      response => dispatch(tokenSuccess(response)),
      err => dispatch(tokenFailure(err))
    );
  }
}

export const tokenSuccess = (currentUser) => {
  const user = currentUser.data.user;
  return {type: "USER_FROM_TOKEN_SUCCESS", payload: user};
}

export const tokenFailure = (error) => {
  return {type: "USER_FROM_TOKEN_FAILURE", payload: error};
}
