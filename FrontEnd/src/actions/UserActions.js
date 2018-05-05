import * as APIUtils from '../utils/users_api_utils';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';

export const fetchAllUsers = (params) => (dispatch) => {
  // action creator
  return APIUtils.getAllUsers()
  .then((users)=>{
      dispatch => {
       dispatch({
         type: GET_ALL_USERS,
         payload: users
       });
     }
  })
}

export const fetchSingleUser = (params) => (dispatch) => {
  // action creator
  return APIUtils.fetchSingleUser()
  .then((user)=> {
      dispatch => {
       dispatch({
         type: RECEIVE_SINGLE_USER,
         payload: user
       });
     }
  })
}

export const editSingleUser = (params) => (dispatch) => {

    return APIUtils.updateSingleUser(params)
                  .then((user) => {
                    dispatch(receiveSingleUser(user));
                  });
  }

// export function createAccount(email, password) {
//   return dispatch => APIUtils.createUserWithEmailAndPassword(email, password);
// }

