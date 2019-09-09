import axios from 'axios';
import {getAllUserBlogs} from '../utils/posts_api_utils';
export const GET_ALL_BLOGS_SUCCESS = "GET_ALL_BLOGS_SUCCESS";
export const GET_ALL_BLOGS_FAILURE = "GET_ALL_BLOGS_FAILURE";

export const getUserBlogs = () => {
  return dispatch => {
    axios({
      method: 'GET',
      url: "/users/all_blogs"
    }).then(blogs => {
      dispatch(success(blogs.data.body))
    }, error => {
      dispatch(failure(error.toString()));
    });
  
    function success(blogs) {
      return {type: GET_ALL_BLOGS_SUCCESS, payload: blogs}
    }
    function failure(error) {
      return {type: GET_ALL_BLOGS_FAILURE, errorMsg: error}
    }
  }
}
