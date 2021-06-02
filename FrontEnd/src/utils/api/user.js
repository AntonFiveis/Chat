import { request } from '../../core';
import axios from 'axios';
export default {
  login: (postData) => request().post('/api/auth/login', postData),
  register: (postData) => request().post('/api/auth/signup', postData),
  getMe: () => request(true).get('/api/users/me'),
  findUsersByEmail: (value) =>
    request(true).get('/api/users/email', { params: { email: value } }),
  logout: async () => {
    await request(true).delete('/api/auth');
  },
  refresh: async (fingerprint) => {
    const res = await axios.post('/api/auth/refresh', { fingerprint });
    return res.data;
  },
};
