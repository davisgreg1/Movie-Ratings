import axios from "axios";

// export const fetchUsers = (user) => {

//     return $.ajax({
//               url: '/api/users',
//               method: 'GET',
//               data: user
//            });
//   }

export const fetchSingleUser = user => {
  return axios.get(`/users/getSingleUser/${user.username}`);
};

// export const updateSingleUser = (user) => {
//    return axios
//       .post("/users/register", {
//         username: username,
//         firstname: firstname,
//         lastname: lastname,
//         password: password
//       })
// }