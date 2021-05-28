import { axios } from '../../core';

export default {
  login: (postData) => axios.post('/api/auth/login', postData), //here should be /user/login (when we get token)
  register: (postData) => axios.post('/api/auth/signup', postData), //here should be /user/login (when we get token)
  getMe: () =>
    axios.get('/api/users/me', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }), //here should be /user/me (when we get data by using token)
  logout: async (accessToken) => {
    await axios.delete('/api/auth', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
  },
  refresh: async (fingerprint, accessToken) => {
    const res = await axios.post(
      '/api/auth/refresh',
      { fingerprint },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  },
};
