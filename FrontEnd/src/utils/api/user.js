import { axios } from '../../core';

export default {
  login: (postData) => axios.post('/login', postData), //here should be /user/login (when we get token)
  register: (postData) => axios.post('/register', postData), //here should be /user/login (when we get token)
  getMe: () => axios.get('/me'), //here should be /user/me (when we get data by using token)
};
