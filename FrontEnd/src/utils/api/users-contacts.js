import { request } from '../../core';

export default {
  addFriend: async (friendUserID) => {
    await request(true).post(
      '/api/users-contacts',
      {},
      {
        params: { friendUserID },
      },
    );
  },
  getMyFriendList: async () => {
    const res = await request(true).get('/api/users-contacts');
    return res.data;
  },
};
