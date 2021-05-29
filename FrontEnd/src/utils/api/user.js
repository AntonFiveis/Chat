import { request } from '../../core';
import axios from 'axios';
export default {
  login: (postData) => request().post('/api/auth/login', postData), //here should be /user/login (when we get token)
  register: (postData) => request().post('/api/auth/signup', postData), //here should be /user/login (when we get token)
  getMe: () => request(true).get('/api/users/me'), //here should be /user/me (when we get data by using token)
  logout: async () => {
    await request(true).delete('/api/auth');
  },
  refresh: async (fingerprint) => {
    const res = await axios.post('/api/auth/refresh', { fingerprint });
    return res.data;
  },
};
