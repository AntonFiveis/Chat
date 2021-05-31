import { request } from '../../core';

export default {
  addFriend: async (friendUserEmail) => {
    await request(true).post(
      '/api/users-contacts',
      {},
      {
        params: { friendUserEmail },
      },
    );
  },
  getMyFriendList: async () => {
    const res = await request(true).get('/api/users-contacts');
    return res.data;
  },
};
