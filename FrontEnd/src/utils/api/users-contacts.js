import { axios } from '../../core';

export default {
  addFriend: async (friendUserID, accessToken) => {
    await axios.post(
      '/api/users-contacts',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { friendUserID },
      },
    );
  },
  getMyFriendList: async (accessToken) => {
    const res = await axios.get('/api/users-contacts', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  },
};
