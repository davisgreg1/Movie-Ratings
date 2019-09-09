import axios from 'axios';

export const getAllUserBlogs = async () => {
  console.log('got hrererererere')
    const request = await axios({
      method: 'GET',
      url: "/users/all_blogs"
    });
    return request;
  }
