import axios from "axios";

export const loginUser = (username, password) => {
  return axios.post("/users/login", {
    username: username,
    password: password
  });
};

export const logoutUser = () => {
  return axios.get(`/users/logout`);
};

export const signupUser = user => {
  return axios.post("/users/register", {
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: password
  });
};
