import axios from "axios";

export const loginUser = (username, password) => {
  return axios.post("/users/login", {
    username: username,
    password: password
  });
};

// export const getUserFromToken = tokenFromStorage => {
//   axios({
//     method: 'get',
//     url: `/users/auth_token?token=${tokenFromStorage}`,
//     headers: {
//       'Authorization': `Bearer ${tokenFromStorage}`
//     }
//   }).then(((response)=> {
//   console.log("TCL: response", response)
//     return (
//       {type: "USER_FROM_TOKEN", payload: response.data.user}
//     )
//   }))
//   // return {type: "USER_FROM_TOKEN", payload: request}
// }

export const getUserFromToken = (tokenFromStorage)=> {
  return function action(dispatch) {
    // dispatch({ type: "USER_FROM_TOKEN_SUCCESS" })

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

export const resetToken = () => { //used for logout
  return {type: "RESET_TOKEN"};
}

// export const signupUser = user => {   return axios.post("/users/register", {
//    username: username,     firstname: firstname,     lastname: lastname,
// password: password   }); };
